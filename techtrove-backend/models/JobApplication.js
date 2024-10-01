import mongoose from'mongoose';
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'ApplicantUser', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  dateApplied: { type: Date, default: Date.now }
});

export default mongoose.model('Application', ApplicationSchema);
