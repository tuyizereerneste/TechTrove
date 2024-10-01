import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

export default mongoose.model('CompanyUser', CompanySchema);