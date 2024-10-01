import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [String],
  experience: [{ company: String, role: String, duration: String }],
  education: [{ institution: String, degree: String, year: String }],
  resume: { type: String }, // URL or path to resume file
  // applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }]
});

export default mongoose.model('ApplicantUser', applicantSchema);