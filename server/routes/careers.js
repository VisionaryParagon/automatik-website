const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// email config
const smtpConfig = {
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: 'noreply@automatik.us',
    pass: 'Automatik2point0'
  }
};
const transporter = nodemailer.createTransport(smtpConfig);

// career models
const careers = require('../models/careers');
const careerInquiries = require('../models/career-inquiries');

// create new position
router.post('/new', function (req, res) {
  careers.create(req.body, function (err, position) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(position);
  });
});

// get all positions
router.get('/positions', function (req, res) {
  careers.find({}, function (err, inquiries) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(inquiries);
  });
});

// get one position
router.get('/positions/:id', function (req, res) {
  careers.findById(req.params.id, function (err, position) {
    const notFound = {
      message: 'Position not in system'
    }
    if (err) return res.status(500).send(err);
    if (!position) return res.status(404).send(notFound);
    return res.status(200).send(position);
  });
});

// delete position
router.delete('/positions/:id', function (req, res) {
  careers.findByIdAndRemove(req.params.id, function (err, position) {
    const deleted = {
      message: 'Position deleted'
    }
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update one position
router.put('/positions/:id', function (req, res) {
  careers.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, position) {
    if (err) return res.status(500).send(err);
    res.status(200).send(position);
  });
});

// inquiry email
router.post('/inquire', function (req, res) {
  // get contact data
  const data = req.body;
  const start_date = new Date(data.start_date).toLocaleDateString('en-US');
  let textContentMsg, htmlContentMsg;

  // Internal response
  if (data.position === 'General Career Inquiry') {
    textContentMsg = `
      New career inquiry from ${data.first_name} ${data.last_name} (${data.email}):

      Position: ${data.position}
      Specialty: ${data.specialty}
      Start Date: ${start_date}
      Employment Status: ${data.status}
      Why I'm Awesome:
      ${data.awesome}
    `;

    htmlContentMsg = `
      <div style="font-size:14px; margin:30px auto 60px; width:640px;">
        <span>
        New career inquiry from <strong>${data.first_name} ${data.last_name}</strong> (<a href="mailto:${data.email}">${data.email}</a>):<br><br>

        <strong>Position:</strong> ${data.position}<br>
        <strong>Specialty:</strong> ${data.specialty}<br>
        <strong>Start Date:</strong> ${start_date}<br>
        <strong>Employment Status:</strong> ${data.status}<br>
        <strong>Why I'm Awesome:</strong><br>
        ${data.awesome}
        </span>
      </div>
    `;
  } else {
    textContentMsg = `
      New career inquiry from ${data.first_name} ${data.last_name} (${data.email}):

      Position: ${data.position}
      Start Date: ${start_date}
      Employment Status: ${data.status}
      Why I'm Awesome:
      ${data.awesome}
    `;

    htmlContentMsg = `
      <div style="font-size:14px; margin:30px auto 60px; width:640px;">
        <span>
        New career inquiry from <strong>${data.first_name} ${data.last_name}</strong> (<a href="mailto:${data.email}">${data.email}</a>):<br><br>

        <strong>Position:</strong> ${data.position}<br>
        <strong>Start Date:</strong> ${start_date}<br>
        <strong>Employment Status:</strong> ${data.status}<br>
        <strong>Why I'm Awesome:</strong><br>
        ${data.awesome}
        </span>
      </div>
    `;
  }

  const mailOptionsMsg = {
    from: '"No Reply" <noreply@automatik.us>', // sender address
    to: 'amikina@automatik.us', // list of receivers
    bcc: 'sdickens@automatik.us', // list of receivers
    replyTo: data.email, // list of replyTo's
    subject: 'Career Form Inquiry', // Subject line
    text: textContentMsg, // plaintext body
    html: htmlContentMsg // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptionsMsg, function (error, info) {
    if (error) {
      return res.status(500).send(error);
      // return console.log(error);
    } else {
      return res.status(200).send(info);
      // return console.log('Message sent: ', info.response);
    }
  });
});

module.exports = router;
