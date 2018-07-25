const express = require('express');
const router = express.Router();

// team models
const projects = require('../models/projects');

// validate project
router.post('/valid-project', function (req, res) {
  projects.find({ path: req.body.slug }, function (err, data) {
    const prj = {
      isValid: true,
      data: data
    }
    if (err) return res.status(500).send(err);
    if (!data.length) return res.status(200).send(prj);
    prj.isValid = false;
    return res.status(200).send(prj);
  });
});

// create new project
router.post('/new-project', function (req, res) {
  projects.create(req.body, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all projects
router.get('/projects', function (req, res) {
  projects.find({}, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one project
router.get('/projects/:id', function (req, res) {
  projects.findById(req.params.id, function (err, data) {
    const notFound = {
      message: 'Project not in system'
    }
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send(notFound);
    return res.status(200).send(data);
  });
});

// update one project
router.put('/projects/:id', function (req, res) {
  projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// delete project
router.delete('/projects/:id', function (req, res) {
  projects.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
