const express = require('express');
const router = express.Router();

// team models
const departments = require('../models/departments');
const team = require('../models/team');

// create new department
router.post('/new-dept', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  departments.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all departments
router.get('/depts', (req, res) => {
  departments.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one department
router.get('/depts/:id', (req, res) => {
  departments.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Department not in system' });
    return res.status(200).send(data);
  });
});

// update one department
router.put('/depts/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  departments.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// update department ranks
router.put('/deptsrank', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  req.body.forEach(dept => {
    departments.findByIdAndUpdate(dept._id, dept, {
      new: true
    }, (err, data) => {
      if (err) return res.status(500).send(err);
    });
  });
  return res.status(200).send({ message: 'Success!' });
});

// delete department
router.delete('/depts/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  departments.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// create new teammate
router.post('/new-teammate', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  team.create(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all teammates
router.get('/teammates', (req, res) => {
  team.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one teammate
router.get('/teammates/:id', (req, res) => {
  team.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send({ message: 'Teammate not in system' });
    return res.status(200).send(data);
  });
});

// update one teammate
router.put('/teammates/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  team.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// delete teammate
router.delete('/teammates/:id', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send({ message: 'User is not authenticated' });
  team.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
