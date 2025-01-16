'use-strict'

import nodemailer from 'nodemailer'
import nunjucks from 'nunjucks'

async function attemptEmail (recipients, text, html) {
  try {
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
      from: `"${process.env.EMAIL_FROM}" <${process.env.FESTIVAL_EMAIL}>`,
      to: recipients,
      subject: `${process.env.EMAIL_SUBJECT}`,
      text,
      html
    }
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions)
    console.log(`Email sent successfully! Message ID: ${info.messageId}`)
    return true
  } catch (error) {
    console.error(`Email sending failed: ${error.message}`, error.stack)
    return false
  }
}

async function sendEmail (req) {
  const data = req.session.data
  const text = nunjucks.render('emails/template-text.njk', { data })
  const html = nunjucks.render('emails/template-html.njk', { data })
  const customerEmail = data.owner.email
  const festivalEmail = process.env.FESTIVAL_EMAIL
  const recipients = `${customerEmail}, ${festivalEmail}`

  const emailed = await attemptEmail(recipients, text, html)
  if (emailed) {
    req.session.success = true
    return 'success'
  } else {
    const errors = [{
      id: 'email-failed',
      message: 'Your email didn\'t send. Try again or call us on 0771111111',
      hint: 'Try again or call us on 0741111111'
    }]
    return errors
  }
}

export default sendEmail
