const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../config/db');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extName) return cb(null, true);
    return cb(new Error('Only PDF, DOC, or DOCX files are allowed!'));
  }
});

// Fetch all job listings
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Apply for a job
router.post('/apply', upload.single('resume'), async (req, res) => {
  const { name, email, jobId } = req.body;
  const resumePath = req.file ? req.file.path : null;

  if (!name || !email || !jobId || !resumePath) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await pool.query('INSERT INTO applications (name, email, job_id, resume) VALUES (?, ?, ?, ?)', 
      [name, email, jobId, resumePath]);

    res.json({ message: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;