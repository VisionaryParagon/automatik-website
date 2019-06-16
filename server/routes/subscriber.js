const express = require('express');
const router = express.Router();
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

// subscriber model
const subscribers = require('../models/subscriber');

// create new subscriber
router.post('/new', (req, res) => {
  subscribers.findOneAndUpdate({ email_address: req.body.email_address }, req.body, {
    new: true,
    upsert: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all subscribers
router.get('/subs', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  subscribers.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one subscriber
router.get('/subs/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  subscribers.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Subscriber not in system' });
    return res.status(200).send(data);
  });
});

// update one subscriber
router.put('/subs/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  subscribers.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete subscriber
router.delete('/subs/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  subscribers.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// subscription confirmation email
router.post('/subscribe', (req, res) => {
  // get contact data
  let data = req.body;

  // External response
  let textContentMsg = `
    Hello ${data.name}!

    Thank you for subscribing to the automätik email newsletter! Keep an eye out for upcoming news, content, and events.

    We look forward to eradicating boring training with you!
  `;

  let htmlContentMsg = `
    <div style="font-size:14px; margin:30px auto 60px; width:640px;">
      <span>
        Hello ${data.name}!<br><br>
        Thank you for subscribing to the automätik email newsletter! Keep an eye out for upcoming news, content, and events.<br><br>
        We look forward to <strong>eradicating boring training</strong> with you!
      </span>
    </div>
  `;

  let mailOptionsMsg = {
    from: '"No Reply" <noreply@automatik.us>', // sender address
    to: data.email_address, // list of receivers
    // replyTo: data.email_address, // list of replyTo's
    subject: 'Welcome to The automätik Newsletter!', // Subject line
    text: textContentMsg, // plaintext body
    html: htmlContentMsg // html body
  };

  // send external mail with defined transport object
  transporter.sendMail(mailOptionsMsg, (error, info) => {
    if (error) {
      return res.status(500).send(error);
      // return console.log(error);
    } else {
      return res.status(250).send(info);
      // return console.log('Message sent: ', info.response);
    }
  });

  // Internal response
  let textContentMsgInt = `
    New 5 Secrets to De-borifying Your Next Event subscription:

    Name: ${data.name}
    Email: ${data.email_address}
  `;

  let htmlContentMsgInt = `
    <div style="font-size:14px; margin:30px auto 60px; width:640px;">
      <span>
        New 5 Secrets to De-borifying Your Next Event subscription:<br><br>
        Name: ${data.name}<br>
        Email: ${data.email_address}
      </span>
    </div>
  `;

  let mailOptionsMsgInt = {
    from: '"Website Subscription Form" <noreply@automatik.us>', // sender address
    to: '"Johnny Sweet" <jsweet@automatik.us>', // list of receivers
    replyTo: data.email_address, // list of replyTo's
    subject: 'New Email Subscription!', // Subject line
    text: textContentMsgInt, // plaintext body
    html: htmlContentMsgInt // html body
  };

  // send external mail with defined transport object
  transporter.sendMail(mailOptionsMsgInt, (error, info) => {
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
