const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  answerBody: { type: String, required: true },
  responderName: { type: String, required: true },
  responderRollNo: { type: String, required: true },
  responderRole: { type: String, enum: ['senior', 'staff'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  companyTag: { type: String, default: 'General' }, // e.g., "Rolls-Royce Data Labs", "Zoho"
  askedByName: { type: String, required: true },
  askedByRollNo: { type: String, required: true },
  askedByBatch: { type: String, default: '2024–2028' },
  status: { type: String, enum: ['Open', 'Answered'], default: 'Open' },
  answers: [answerSchema]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);