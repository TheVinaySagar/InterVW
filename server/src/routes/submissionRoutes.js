import { Router } from 'express';
const submissionRoutes = Router();
import SubmissionController from '../controllers/submissionController.js';
import auth from '../middleware/auth.js';
// Create submission
submissionRoutes.post('/', auth, SubmissionController.createSubmission);

// Get all submissions with pagination
submissionRoutes.get('/', SubmissionController.getAllSubmissions);

// Get specific submission
submissionRoutes.get('/user', auth, SubmissionController.getUserSubmissions);

// Update submission
submissionRoutes.put('/:id', auth, SubmissionController.updateSubmission);

// Delete submission
submissionRoutes.delete('/:id', auth, SubmissionController.deleteSubmission);

export default submissionRoutes;
