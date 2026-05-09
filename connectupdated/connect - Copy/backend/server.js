const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/agriconnect')
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log(err));

// Schema
const jobSchema = new mongoose.Schema({
  name: String,
  phone: String,
  title: String,
  wage: String,
  location: String,
  status: { type: String, default: 'Open' }
});

const Job = mongoose.model('Job', jobSchema);

// GET jobs
app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// POST job
app.post('/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json({ message: 'Job posted successfully' });
});


// start server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));