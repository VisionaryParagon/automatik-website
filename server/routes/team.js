const express = require('express');
const router = express.Router();

// team models
const departments = require('../models/departments');
const team = require('../models/team');

// create new department
router.post('/new-dept', function (req, res) {
  departments.create(req.body, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all departments
router.get('/depts', function (req, res) {
  departments.find({}, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one department
router.get('/depts/:id', function (req, res) {
  departments.findById(req.params.id, function (err, data) {
    const notFound = {
      message: 'Department not in system'
    }
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send(notFound);
    return res.status(200).send(data);
  });
});

// update one department
router.put('/depts/:id', function (req, res) {
  departments.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// update department ranks
router.put('/deptsrank', function (req, res) {
  const success = {
    message: 'Success!'
  };
  req.body.forEach(dept => {
    departments.findByIdAndUpdate(dept._id, dept, {
      new: true
    }, function (err, data) {
      if (err) return res.status(500).send(err);
    });
  });
  return res.status(200).send(success);
});

// delete department
router.delete('/depts/:id', function (req, res) {
  departments.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// create new teammate
router.post('/new-teammate', function (req, res) {
  team.create(req.body, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get all teammates
router.get('/teammates', function (req, res) {
  team.find({}, function (err, data) {
    if (err) return res.status(500).send(err);
    return res.status(200).send(data);
  });
});

// get one teammate
router.get('/teammates/:id', function (req, res) {
  team.findById(req.params.id, function (err, data) {
    const notFound = {
      message: 'Teammate not in system'
    }
    if (err) return res.status(500).send(err);
    if (!data) return res.status(404).send(notFound);
    return res.status(200).send(data);
  });
});

// update one teammate
router.put('/teammates/:id', function (req, res) {
  team.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

// delete teammate
router.delete('/teammates/:id', function (req, res) {
  team.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) return res.status(500).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
