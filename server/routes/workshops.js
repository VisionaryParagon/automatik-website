const express = require('express');
const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_KEY); // Stripe Prod Key
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY); // Stripe Test Key
const nodemailer = require('nodemailer');

// email config
const smtpConfig = {
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: process.env.NORPLY_EML,
    pass: process.env.NORPLY_PWD
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

const moment = require('moment');

// workshop models
const workshops = require('../models/workshops');
const workshopEvents = require('../models/workshops');
const workshopRegistrants = require('../models/workshops');

/*~~~ Workshops ~~~*/
// create new workshop
router.post('/workshops/create', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshops.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all workshops
router.get('/workshops', (req, res) => {
  workshops.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one workshop
router.get('/workshops/:id', (req, res) => {
  workshops.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Workshop not in system' });
    return res.status(200).send(data);
  });
});

// update one workshop
router.put('/workshops/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshops.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete workshop
router.delete('/workshops/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshops.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

/*~~~ Workshop Events ~~~*/
// create new workshop event
router.post('/workshop-events/create', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopEvents.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all workshop events
router.get('/workshop-events', (req, res) => {
  workshopEvents.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one workshop event
router.get('/workshop-events/:id', (req, res) => {
  workshopEvents.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Workshop Event not in system' });
    return res.status(200).send(data);
  });
});

// update one workshop event
router.put('/workshop-events/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopEvents.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete workshop event
router.delete('/workshop-events/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopEvents.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

/*~~~ Workshop Registrants ~~~*/
// create new workshop registrant
router.post('/workshop-registrants/create', (req, res) => {
  workshopRegistrants.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all workshop registrants
router.get('/workshop-registrants', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopRegistrants.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one workshop registrant
router.get('/workshop-registrants/:id', (req, res) => {
  workshopRegistrants.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Registrant not in system' });
    return res.status(200).send(data);
  });
});

// update one workshop registrant
router.put('/workshop-registrants/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopRegistrants.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete workshop registrant
router.delete('/workshop-registrants/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopRegistrants.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

/*~~~ Payment Processing ~~~*/
router.post('/workshop-payments/charge', (req, res) => {
  const token = req.body.token;
  const registrant = req.body.registrant;

  stripe.charges.create({
    amount: registrant.price * 100,
    currency: 'usd',
    source: token.id,
    description: `Charge to ${registrant.first_name} ${registrant.last_name} for ${registrant.workshop}`
  }, (err, charge) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(charge);
  });
});

/*~~~ Emails ~~~*/
// confirmation email
router.post('/workshops/confirmation', (req, res) => {
  // get registrant data
  const data = req.body;
  const workshopDate = moment(data.workshop_date).format('dddd, MMMM D, YYYY');

  // External response
  let textContentMsg = `
    Hello ${data.first_name},
    
    You have successfully registered for ${data.workshop} on ${workshopDate}!

    automätik
  `;

  let htmlContentMsg = `
    <div style="font-size:14px; margin:30px auto 60px; width:640px;">
      <span>
        Hello ${data.first_name},<br><br>
        You have successfully registered for <strong>${data.workshop}</strong> on <strong>${workshopDate}</strong>!<br><br>
        <strong>auto</strong>mätik
      </span>
    </div>
  `;

  let mailOptionsMsg = {
    from: '"No Reply" <noreply@automatik.us>', // sender address
    to: data.email, // list of receivers
    // replyTo: data.email, // list of replyTo's
    subject: 'Registration Confirmed for ' + data.workshop, // Subject line
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
