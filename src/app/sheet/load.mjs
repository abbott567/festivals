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
  }

  const newRow = {
    'CUSTOMER DETAILS:\nExhibitor name': data.business['exhibitor-name'],
    'CUSTOMER DETAILS:\nType of product': data.business['type-of-products'],
    'CONTACT DETAILS:\nName': data.owner.name,
    'CONTACT DETAILS:\nPhone': data.owner.phone,
    'CONTACT DETAILS:\nEmail': data.owner.email,
    'CONTACT DETAILS:\nAddress': data.owner.address,
    'CONTACT DETAILS:\nTimestamp': timestamp,
    'ESTIMATED COST:\nTotal': estimatedCost
  }
  for (const entry of Object.values(breakdowns)) {
    newRow[entry.heading] = entry.data
  }

  // Insert row and get rowIndex
  let addedRow
  if (isVendor) addedRow = await sheet.vendors.addRow(newRow)
  else addedRow = await sheet.stalls.addRow(newRow)

  const rows = await (isVendor ? sheet.vendors.getRows() : sheet.stalls.getRows())
  const rowIndex = rows.length + 1

  // Force the estimated cost to be a number again after row insertion
  addedRow.set('ESTIMATED COST:\nTotal', estimatedCost)
  addedRow.set('OUTSTANDING BALANCE:\nAmount', `=I${rowIndex}-J${rowIndex}`)

  let depositFormula = ''
  if (isVendor) depositFormula += `=IF(P${rowIndex}<>"not attending", 100, 0) + IF(Q${rowIndex}<>"not attending", 100, 0) + IF(R${rowIndex}<>"not attending", 100, 0) + IF(S${rowIndex}<>"not attending", 100, 0) + IF(T${rowIndex}<>"not attending", 100, 0)`
  if (isStall) depositFormula += `+IF(P${rowIndex}<>"not attending", 50, 0) + IF(Q${rowIndex}<>"not attending", 50, 0) + IF(R${rowIndex}<>"not attending", 50, 0) + IF(S${rowIndex}<>"not attending", 50, 0) + IF(T${rowIndex}<>"not attending", 50, 0)`
  addedRow.set('DEPOSIT:\nAmount', depositFormula)

  await addedRow.save()
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
