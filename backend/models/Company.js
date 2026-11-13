const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  roleOffered: { type: String, required: true },
  packageLPA: { type: String, required: true },
  driveDate: { type: Date, required: true },
  minCgpa: { type: Number, required: true, default: 7.0 },
  eligibleDepartments: [{ type: String }],
  roundStructure: [{ type: String }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);