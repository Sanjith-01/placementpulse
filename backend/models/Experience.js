const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  roundNumber: { type: Number, required: true },
  roundName: { type: String, required: true },
  questionsAsked: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' }
});

const experienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true, index: true },
  jobRole: { type: String, required: true },
  authorName: { type: String, required: true },
  authorRollNo: { type: String, required: true },
  authorBatch: { type: String, required: true },
  verdict: { type: String, enum: ['Selected', 'Rejected', 'Waitlisted'], required: true },
  dsaTopicsAsked: [{ type: String }],
  rounds: [roundSchema],
  overallTips: { type: String, required: true },
  isVerifiedByStaff: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);