const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const Experience = require('../models/Experience');
const Question = require('../models/Question');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'kct_secret_key_2026';

// 1. Register User
router.post('/auth/register', async (req, res) => {
  try {
    const { name, rollNumber, email, password, role, batch, cgpa } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, rollNumber, email, password: hashedPassword, role, batch, cgpa
    });
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Login User
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, rollNumber: user.rollNumber },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, user: { name: user.name, role: user.role, rollNumber: user.rollNumber, cgpa: user.cgpa } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get All Experiences (Junior, Senior, Staff)
router.get('/experiences', async (req, res) => {
  try {
    const { company, topic } = req.query;
    const filter = {};
    if (company) filter.companyName = new RegExp(company, 'i');
    if (topic) filter.dsaTopicsAsked = { $in: [new RegExp(topic, 'i')] };

    const experiences = await Experience.find(filter).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Post Experience (Senior & Staff Only)
router.post('/experiences', verifyToken, authorizeRoles('senior', 'staff'), async (req, res) => {
  try {
    const exp = await Experience.create({
      ...req.body,
      authorName: req.user.name,
      authorRollNo: req.user.rollNumber
    });
    res.status(201).json(exp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Verify Experience (Staff Only)
router.patch('/experiences/:id/verify', verifyToken, authorizeRoles('staff'), async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(
      req.params.id,
      { isVerifiedByStaff: true },
      { new: true }
    );
    res.json(exp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 6. Get & Post Companies
router.get('/companies', async (req, res) => {
  const companies = await Company.find().sort({ driveDate: 1 });
  res.json(companies);
});

router.post('/companies', verifyToken, authorizeRoles('staff'), async (req, res) => {
  try {
    const company = await Company.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 7. Get All Student Queries
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Post a New Query (Any Authenticated Student / Junior)
router.post('/questions', verifyToken, async (req, res) => {
  try {
    const { title, body, companyTag } = req.body;
    const question = await Question.create({
      title,
      body,
      companyTag: companyTag || 'General',
      askedByName: req.user.name,
      askedByRollNo: req.user.rollNumber
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 9. Answer a Query (Strictly Senior & Staff Only)
router.post('/questions/:id/answer', verifyToken, authorizeRoles('senior', 'staff'), async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Query not found' });

    question.answers.push({
      answerBody: req.body.answerBody,
      responderName: req.user.name,
      responderRollNo: req.user.rollNumber,
      responderRole: req.user.role
    });
    question.status = 'Answered';
    await question.save();

    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;