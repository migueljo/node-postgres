const nodemailer = require('nodemailer')

const { config } = require("../config/config");

module.exports = async  function sendEmail(email, { subject, body }) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // not secure is port 587
    secure: true,
    auth: {
      user: config.senderEmail,
      pass: config.senderEmailPassword,
    }
  });
  // send mail with defined transport object
  const result = await transporter.sendMail({
    from: config.senderEmail,
    to: email,
    subject,
    text: body.text,
    html: body.html,
  });

  return result
}
