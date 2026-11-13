require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Company = require('./models/Company');
const Experience = require('./models/Experience');
const Question = require('./models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kct_placement_portal';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Experience.deleteMany({}),
      Question.deleteMany({})
    ]);

    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = await User.insertMany([
      {
        name: 'Sanjith M',
        rollNumber: '24BIT105',
        email: 'sanjith.24bit@kct.ac.in',
        password: hashedPassword,
        role: 'junior',
        department: 'Information Technology',
        batch: '2024-2028',
        cgpa: 8.135
      },
      {
        name: 'Aravind S',
        rollNumber: '23BIT042',
        email: 'aravind.23bit@kct.ac.in',
        password: hashedPassword,
        role: 'senior',
        department: 'Information Technology',
        batch: '2023-2027',
        cgpa: 8.72
      },
      {
        name: 'Dr. R. Subramanian',
        rollNumber: 'KCT-STAFF-01',
        email: 'placement@kct.ac.in',
        password: hashedPassword,
        role: 'staff',
        department: 'Placement Cell',
        batch: 'Faculty',
        cgpa: 10.0
      }
    ]);

    await Company.insertMany([
      {
        name: 'Rolls-Royce Data Labs',
        roleOffered: 'Full-Stack & Data Engineering Intern (6 Months)',
        packageLPA: '45,000 / month Stipend + PPO',
        driveDate: new Date('2026-11-28'),
        minCgpa: 8.0,
        eligibleDepartments: ['IT', 'CSE', 'AI&DS'],
        roundStructure: ['Online Coding + SQL', 'Technical Architecture & DSA', 'Techno-Managerial HR'],
        postedBy: users[2]._id
      },
      {
        name: 'Zoho Corporation',
        roleOffered: 'Member Technical Staff (MTS)',
        packageLPA: '8.4 LPA',
        driveDate: new Date('2026-12-05'),
        minCgpa: 7.0,
        eligibleDepartments: ['IT', 'CSE', 'ECE', 'EEE'],
        roundStructure: ['C/Java Aptitude', 'Level 2 DSA Coding', 'System Design (LLD)', 'Technical + HR'],
        postedBy: users[2]._id
      }
    ]);

    await Experience.insertMany([
      {
        companyName: 'Rolls-Royce Data Labs',
        jobRole: 'Full-Stack & Data Engineering Intern',
        authorName: 'Aravind S',
        authorRollNo: '23BIT042',
        authorBatch: '2023-2027',
        verdict: 'Selected',
        dsaTopicsAsked: ['Binary Trees', 'Linked Lists', 'REST APIs', 'SQL Indexing'],
        rounds: [
          {
            roundNumber: 1,
            roundName: 'Online Assessment',
            questionsAsked: '2 medium Java DSA questions (Linked List cycle detection, sliding window) + 15 DBMS & OS MCQs.',
            difficulty: 'Medium'
          },
          {
            roundNumber: 2,
            roundName: 'Technical Interview',
            questionsAsked: 'Lowest Common Ancestor in a Binary Tree + Node.js RBAC middleware design.',
            difficulty: 'Hard'
          }
        ],
        overallTips: 'Focus on Java Collections, Binary Trees, and be ready to defend your backend schema and auth middleware.',
        isVerifiedByStaff: true
      }
    ]);

    await Question.create({
      title: 'How much DSA is needed before applying for 6-month internships like Rolls-Royce Data Labs?',
      body: 'Do interviewers expect dynamic programming and graphs for internship drives, or do they focus more on trees, SQL, and full-stack projects?',
      companyTag: 'Rolls-Royce Data Labs',
      askedByName: 'Sanjith M',
      askedByRollNo: '24BIT105',
      askedByBatch: '2024-2028',
      status: 'Answered',
      answers: [
        {
          answerBody: 'Medium-level Binary Trees, Linked Lists, HashMaps, and SQL joins cover 80% of the coding round. Make sure you can explain your backend architecture in depth.',
          responderName: 'Aravind S',
          responderRollNo: '23BIT042',
          responderRole: 'senior'
        }
      ]
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();