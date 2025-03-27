const express = require('express');
const cors = require('cors');
const path = require('path');
const jobsRouter = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/jobs', jobsRouter);

app.get('/', (req, res) => {
  res.send('Job Portal API is running...');
});

module.exports = app;
