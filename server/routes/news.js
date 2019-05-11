const express = require('express');
const router = express.Router();
const urlMetadata = require('url-metadata');

// news models
const news = require('../models/news');

// get news article data
router.post('/articles/get-data', (req, res) => {
  urlMetadata(req.body.url)
    .then(
      data => {
        return res.status(200).send(data);
      },
      err => {
        return res.status(500).send(err);
      }
    );
});

// create new article
router.post('/articles/new', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  news.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all articles
router.get('/articles', (req, res) => {
  news.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one article
router.get('/articles/:id', (req, res) => {
  news.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Article not in system' });
    return res.status(200).send(data);
  });
});

// update one article
router.put('/articles/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  news.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// delete article
router.delete('/articles/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  news.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

module.exports = router;
