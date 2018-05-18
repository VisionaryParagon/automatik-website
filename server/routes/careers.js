const express = require('express');
const router = express.Router();

// inventory model
const careers = require('../models/careers');

// create new inquiry
router.post('/inquiries', function (req, res) {
  inventory.create(req.body, function (err, inquiry) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(inquiry);
  });
});

// get all inquiries
router.get('/inquiries', function (req, res) {
  inventory.find({}, function (err, inquiries) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(inquiries);
  });
});

// get one inquiry
router.get('/inquiries/:id', function (req, res) {
  inventory.findById(req.params.id, function (err, inquiry) {
    const notFound = {
      message: 'Item not in system'
    }
    if (err) return res.status(500).send(err);
    if (!inquiry) return res.status(404).send(notFound);
    return res.status(200).send(inquiry);
  });
});

// delete inquiry
router.delete('/inquiries/:id', function (req, res) {
  inventory.findByIdAndRemove(req.params.id, function (err, inquiry) {
    const deleted = {
      message: 'Item deleted'
    }
    if (err) return res.status(500).send(err);
    res.status(200).send(deleted);
  });
});

// update one inquiry
router.put('/inquiries/:id', function (req, res) {
  inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, inquiry) {
    if (err) return res.status(500).send(err);
    res.status(200).send(inquiry);
  });
});

module.exports = router;
