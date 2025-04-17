import express from 'express';
import { createJob, getJobs } from '../controllers/jobContollers.js';
import upload from '../uploadHandler/uploadHandler.js';
import { uploadLogo } from '../controllers/jobContollers.js';

const router = express.Router();

router.post('/jobs', createJob);
router.get('/jobs', getJobs);
router.post('/upload', upload.single('logo'), uploadLogo);

export default router;
