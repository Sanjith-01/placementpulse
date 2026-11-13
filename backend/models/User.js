const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, unique: true, uppercase: true }, // e.g., 24BIT105
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['junior', 'senior', 'staff'], 
    default: 'junior',
    required: true 
  },
  department: { type: String, default: 'Information Technology' },
  batch: { type: String, required: true }, // e.g., "2024-2028"
  cgpa: { type: Number, min: 0, max: 10, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);