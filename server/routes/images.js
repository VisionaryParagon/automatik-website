const express = require('express');
const router = express.Router();

// team models
const images = require('../models/images');

// validate image
router.post('/valid-image', function (req, res) {
  images.find({ path: req.body.path }, function (err, data) {
    const img = {
      isValid: true,
      data: data
    }
    if (err) return res.status(500).send(err);
    if (!data.length) return res.status(200).send(img);
    img.isValid = false;
    return res.status(200).send(img);
  });
});

// create new image
router.post('/new-image', function (req, res) {
  images.create(req.body, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all images
router.get('/images', function (req, res) {
  images.find({}, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one image
router.get('/images/:id', function (req, res) {
  images.findById(req.params.id, function (err, data) {
    const notFound = {
      message: 'Image not in system'
    }
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send(notFound);
    return res.status(200).send(data);
  });
});

// update one image
router.put('/images/:id', function (req, res) {
  images.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// delete image
router.delete('/images/:id', function (req, res) {
  images.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
