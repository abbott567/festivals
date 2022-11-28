'use-strict'

import nodemailer from 'nodemailer'

function sendEmail (recipients, text, html) {
// create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASSWORD
    },
    ignoreTLS: true
  })

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"${process.env.FESTIVAL_NAME}" <${process.env.FESTIVAL_EMAIL}>`,
    to: recipients,
    subject: 'New booking',
    text,
    html
  }
  // send mail with defined transport object
  const tryToMail = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        resolve(false)
      } else {
        console.log('Message %s sent: %s', info.messageId, info.response)
        resolve(true)
      }
    })
  })
  return tryToMail
}

export default sendEmail
