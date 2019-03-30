const express = require('express');
const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_KEY); // Stripe Prod Key
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY); // Stripe Test Key

// workshop models
const workshops = require('../models/workshops');
const workshopEvents = require('../models/workshops');
const workshopRegistrants = require('../models/workshops');

/*~~~ Workshops ~~~*/
// create new workshop
router.post('/workshops/new', (req, res) => {
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
router.post('/workshop-events/new', (req, res) => {
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
router.post('/workshop-registrants/new', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  workshopRegistrants.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all workshop registrants
router.get('/workshop-registrants', (req, res) => {
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
router.post('/workshop-payments/create', (req, res) => {
  const token = req.body.token;
  const registrant = req.body.registrant;

  stripe.charges.create({
    amount: registrant.price,
    currency: 'usd',
    source: token,
    description: `Charge to ${registrant.first_name} ${registrant.last_name} for ${registrant.workshop}`
  }, (err, charge) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(charge);
  });
});

module.exports = router;
