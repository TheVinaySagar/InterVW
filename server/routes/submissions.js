const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Submission = require('../models/submission');
const auth = require('../middleware/auth');

// Create submission
router.post('/', auth, async (req, res) => {
  try {
    const { name, company, country, questions } = req.body;
    if (!name || !company || !country || !questions || !Array.isArray(questions)) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const submission = new Submission({
      ...req.body,
      userId: req.user._id
    });

    await submission.save();
    res.status(201).send(submission);
  } catch (error) {
    res.status(400).send({ error: 'Invalid submission data' });
  }
});

// Get all submissions with pagination
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const submissions = await Submission.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await Submission.countDocuments();

    res.send({
      submissions,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).send({ error: 'Server error fetching submissions' });
  }
});

// Get specific submission
router.get('/user', auth, async (req, res) => {
  try {
    const submission = await Submission.find({ userId: req.user._id }).sort({ createdAt: -1 });
    if (!submission) {
      return res.status(404).send({ error: 'Submission not found' });
    }
    res.send(submission);
  } catch (error) {
    res.status(500).send({ error: 'Server error fetching submission' });
  }
});

// Update submission
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, company, country, questions } = req.body;

    // Find submission and check if user owns it
    const submission = await Submission.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!submission) {
      return res.status(404).send({ error: 'Submission not found or unauthorized' });
    }

    // Update submission
    submission.name = name || submission.name;
    submission.company = company || submission.company;
    submission.country = country || submission.country;
    submission.questions = questions || submission.questions;

    await submission.save();
    res.send(submission);
  } catch (error) {
    res.status(500).send({ error: 'Server error updating submission' });
  }
});

// Delete submission
router.delete('/:id', auth, async (req, res) => {
  try {
    const submission = await Submission.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!submission) {
      return res.status(404).send({ error: 'Submission not found' });
    }
    res.send(submission);
  } catch (error) {
    res.status(500).send({ error: 'Error deleting submission' });
  }
});

module.exports = router;
