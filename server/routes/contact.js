const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const smtpConfig = {
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: 'noreply@automatik.us',
    pass: 'Automatik2point0'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

// contact email
router.post('/contact', (req, res) => {
  // get contact data
  let data = req.body;

  // Internal response
  let textContentMsg = `
    New contact form inquiry from ${data.name} (${data.email}):

    ${data.message}
  `;

  let htmlContentMsg = `
    <div style="font-size:14px; margin:30px auto 60px; width:640px;">
      <span>
      New contact form inquiry from ${data.name} (<a href="mailto:${data.email}">${data.email}</a>):<br><br>

      ${data.message.split('\n').join('<br>')}
      </span>
    </div>
  `;

  let mailOptionsMsg = {
    from: '"No Reply" <noreply@automatik.us>', // sender address
    to: 'jsweet@automatik.us', // list of receivers
    replyTo: data.email, // list of replyTo's
    subject: 'Contact Form Inquiry from ' + data.name, // Subject line
    text: textContentMsg, // plaintext body
    html: htmlContentMsg // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptionsMsg, (error, info) => {
    if (error) {
      return res.status(500).send(error);
      // return console.log(error);
    } else {
      return res.status(250).send(info);
      // return console.log('Message sent: ', info.response);
    }
  });
});

module.exports = router;
