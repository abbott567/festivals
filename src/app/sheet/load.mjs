import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { format } from 'date-fns'
import events from '../data/2025-events.mjs'

async function loadSheet () {
  const serviceAccountAuth = new JWT({
    email: process.env.G_CLIENT_EMAIL,
    key: process.env.G_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: process.env.G_SCOPES.split(',')
  })

  const doc = new GoogleSpreadsheet(process.env.G_SHEET_ID, serviceAccountAuth)
  await doc.loadInfo()
  const vendors = doc.sheetsById[process.env.G_SHEET_VENDORS]
  const stalls = doc.sheetsById[process.env.G_SHEET_STALLS]

  return {
    doc,
    vendors,
    stalls
  }
}

async function addNewRow (sheet, req) {
  const data = req.session.data
  const now = new Date()
  const timestamp = format(now, 'yyyy-MM-dd@HH:mm')
  let isVendor = false
  let isStall = false

  const breakdowns = {}
  for (const entry of events.all) {
    const eventKey = `event${entry.id}`
    breakdowns[eventKey] = {}
    breakdowns[eventKey].heading = `${entry.date.prettyShort.toUpperCase()}\n${entry.address.city}`
    breakdowns[eventKey].data = 'not attending'
  }

  let estimatedCost = 0
  let depositAmount = 0

  for (const event of data.eventsAttending) {
    // Dynamically link
    const eventKey = `event${event.id}`
    breakdowns[eventKey].data = ''
    estimatedCost += event.estimatedCost
    // Loop requested items
    for (const item of event.requestedItems) {
      if (item.type === 'vendor') isVendor = true
      if (item.type === 'stall') isStall = true
      breakdowns[eventKey].data += `${item.name} = £${item.cost}\n`
    }
    if (isVendor) depositAmount += 100
    if (isStall) depositAmount += 50
  }
  const outstandingAmount = estimatedCost - depositAmount

  const newRow = {
    'CUSTOMER DETAILS:\nExhibitor name': data.business['exhibitor-name'],
    'CUSTOMER DETAILS:\nType of product': data.business['type-of-products'],
    'CONTACT DETAILS:\nName': data.owner.name,
    'CONTACT DETAILS:\nPhone': data.owner.phone,
    'CONTACT DETAILS:\nEmail': data.owner.email,
    'CONTACT DETAILS:\nAddress': data.owner.address,
    'CONTACT DETAILS:\nTimestamp': timestamp,
    'ESTIMATED COST:\nTotal': estimatedCost,
    'DEPOSIT:\nAmount': depositAmount,
    'OUTSTANDING BALANCE:\nAmount': outstandingAmount
  }

  for (const entry of Object.values(breakdowns)) {
    newRow[entry.heading] = entry.data
  }
  if (isVendor) await sheet.vendors.addRow(newRow)
  else await sheet.stalls.addRow(newRow)
  return true
}

async function updateSheet (req) {
  const sheet = await loadSheet()
  const rowWritten = await addNewRow(sheet, req)
  if (rowWritten) {
    req.session.success = true
    return 'success'
  } else {
    console.error('Could not write to Google Sheet')
    const errors = [{
      id: 'email-failed',
      message: 'Your email didn\'t send. Try again or call us on 0771111111',
      hint: 'Try again or call us on 0741111111'
    }]
    return errors
  }
}

export default updateSheet
