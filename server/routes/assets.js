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

// asset models
const assets = require('../models/assets');

// validate asset
router.post('/assets/valid', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  assets.find({ path: req.body.path }, (err, data) => {
    const ast = {
      isValid: true,
      data: data
    };
    if (err) return res.status(500).send(err);
    if (!data.length) return res.status(200).send(ast);
    ast.isValid = false;
    return res.status(200).send(ast);
  });
});

// create new asset
router.post('/assets/new', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  assets.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all assets
router.get('/assets', (req, res) => {
  assets.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one asset
router.get('/assets/:id', (req, res) => {
  assets.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Asset not in system' });
    return res.status(200).send(data);
  });
});

// update one asset
router.put('/assets/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  assets.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete asset
router.delete('/assets/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  assets.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({ message: 'Asset deleted' });
  });
});

// S3 routes
// upload image
router.post('/images/upload', upload.single('file'), (req, res) => {
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

// delete image
router.post('/images/delete', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  const params = {
    Bucket: 'assets.automatik.com',
    Key: 'images/' + req.body.path.split('/').pop()
  };

  s3.deleteObject(params, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// upload video
router.post('/videos/upload', upload.single('file'), (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  const params = {
    ACL: 'public-read',
    Body: req.file.buffer,
    Bucket: 'assets.automatik.com',
    Key: 'videos/' + req.file.originalname
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete video
router.post('/videos/delete', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  const vidParams = {
    Bucket: 'assets.automatik.com',
    Key: 'videos/' + req.body.path.split('/').pop()
  };
  const imgParams = {
    Bucket: 'assets.automatik.com',
    Key: 'images/' + req.body.poster.split('/').pop()
  };

  s3.deleteObject(vidParams, (vidErr, vidData) => {
    if (vidErr) return res.status(500).send(vidErr);

    s3.deleteObject(imgParams, (imgErr, imgData) => {
      if (imgErr) return res.status(500).send(imgErr);
      const data = {
        video: vidData,
        poster: imgData
      };
      return res.status(200).send(data);
    });
  });
});

// upload file
router.post('/files/upload', upload.single('file'), (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  const params = {
    ACL: 'public-read',
    Body: req.file.buffer,
    Bucket: 'assets.automatik.com',
    Key: 'files/' + req.file.originalname
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete file
router.post('/files/delete', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  const params = {
    Bucket: 'assets.automatik.com',
    Key: 'files/' + req.body.path.split('/').pop()
  };

  s3.deleteObject(params, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

module.exports = router;
