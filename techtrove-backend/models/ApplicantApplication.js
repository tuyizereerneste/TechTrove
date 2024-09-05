const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantApplicationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String, required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  dateApplied: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApplicantApplication', ApplicantApplicationSchema);