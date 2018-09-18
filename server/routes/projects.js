const express = require('express');
const router = express.Router();

// team models
const projects = require('../models/projects');

// validate project
router.post('/valid-project', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  projects.find({ path: req.body.slug }, (err, data) => {
    const prj = {
      isValid: true,
      data: data
    };
    if (err) return res.status(500).send(err);
    if (!data.length) return res.status(200).send(prj);
    prj.isValid = false;
    return res.status(200).send(prj);
  });
});

// create new project
router.post('/new-project', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  projects.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all projects
router.get('/projects', (req, res) => {
  projects.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one project
router.get('/projects/:id', (req, res) => {
  projects.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Project not in system' });
    return res.status(200).send(data);
  });
});

// update one project
router.put('/projects/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// delete project
router.delete('/projects/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  projects.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
