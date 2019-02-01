const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const aws = require('aws-sdk');
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.AWS_REGION
});

// team models
const images = require('../models/images');

// validate image
router.post('/valid-image', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  images.find({ path: req.body.path }, (err, data) => {
    const img = {
      isValid: true,
      data: data
    };
    if (err) return res.status(500).send(err);
    if (!data.length) return res.status(200).send(img);
    img.isValid = false;
    return res.status(200).send(img);
  });
});

// upload new image
router.post('/upload-image', upload.single('file'), (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  const params = {
    ACL: 'public-read',
    Body: req.file.buffer,
    Bucket: 'assets.automatik.com',
    Key: 'images/' + req.file.originalname
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// create new image
router.post('/new-image', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  images.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all images
router.get('/images', (req, res) => {
  images.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one image
router.get('/images/:id', (req, res) => {
  images.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Image not in system' });
    return res.status(200).send(data);
  });
});

// update one image
router.put('/images/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  images.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// delete image
router.delete('/images/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  images.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Image not in system' });

    const params = {
      Bucket: 'assets.automatik.com',
      Key: 'images/' + data.path.split('/').pop()
    };

    s3.deleteObject(params, (err, data) => {
      if (err) return res.status(500).send(err);

      images.findByIdAndRemove(req.params.id, (dberr, dbdata) => {
        if (dberr) return res.status(500).send(dberr);
        res.status(200).send(dbdata);
      });
    });
  });
});

module.exports = router;
