const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/trovedb";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

const authApplicant = require('./routes/authApplicant');
app.use('/api/authApplicant', authApplicant);

const applicantProfileRoutes = require('./routes/applicantProfile');
app.use('/api/applicant', applicantProfileRoutes);

const jobApplicationRoutes = require('./routes/jobApplications');
app.use('/api/jobApplications', jobApplicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});