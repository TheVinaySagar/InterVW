import express from 'express';
import Submission from '../models/Submission.js';

const router = express.Router();

class SubmissionController {
    static async createSubmission(req, res) {
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
    }

    static async getAllSubmissions(req, res) {
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
    }

    static async getUserSubmissions(req, res) {
        try {
            const submission = await Submission.find({ userId: req.user._id }).sort({ createdAt: -1 });
            if (!submission) {
                return res.status(404).send({ error: 'Submission not found' });
            }
            res.send(submission);
        } catch (error) {
            res.status(500).send({ error: 'Server error fetching submission' });
        }
    }

    static async updateSubmission(req, res) {
        try {
            const { name, company, country, questions } = req.body;
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
    }

    static async deleteSubmission(req, res) {
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
    }
}

export default SubmissionController;
