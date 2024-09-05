const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String],
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyUser' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ApplicantUser' }],
  anonymousApplicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ApplicantApplication' }]
});

module.exports = mongoose.model('Job', JobSchema);
