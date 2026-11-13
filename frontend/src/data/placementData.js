export const PLATFORM_STATS = [
  { label: 'Verified Interview Logs', value: '420+', delta: '+38 this semester' },
  { label: 'Recruiting Partners Tracked', value: '64', delta: '2024–2028 cycle' },
  { label: '1st & 2nd Year Active Readers', value: '1,850', delta: '92% weekly retention' },
  { label: 'Staff-Verified Accuracy', value: '99.4%', delta: 'Placement Cell audited' },
];

export const EXPERIENCES_DATA = [
  {
    id: 'EXP-1042',
    company: 'Rolls-Royce Data Labs',
    role: 'Full-Stack & Data Engineering Intern',
    author: 'Aravind S',
    rollNo: '23BIT042',
    batch: '2023–2027',
    department: 'IT',
    verdict: 'Selected',
    verified: true,
    date: '2026-11-04',
    stipendOrCtc: '₹45,000 / mo + PPO',
    minCgpa: 8.0,
    difficulty: 'Hard',
    topics: ['Binary Trees', 'Linked Lists', 'REST APIs', 'SQL Indexing'],
    rounds: [
      { name: 'Round 1: Online Assessment', duration: '90 mins', summary: '2 medium Java DSA problems (Linked List cycle detection, sliding window) + 15 DBMS & OS MCQs.' },
      { name: 'Round 2: Technical Deep-Dive', duration: '60 mins', summary: 'Live coding Lowest Common Ancestor in a Binary Tree, followed by Node.js/Express RBAC middleware architecture.' },
      { name: 'Round 3: Techno-Managerial', duration: '35 mins', summary: 'Discussion on deployment trade-offs, database normalization, and team collaboration.' },
    ],
    takeaway: 'Be ready to defend every architectural choice on your resume. Expect follow-up questions on time complexity and API authentication.'
  },
  {
    id: 'EXP-1041',
    company: 'Zoho Corporation',
    role: 'Member Technical Staff (MTS)',
    author: 'Priya Dharshini K',
    rollNo: '23BIT089',
    batch: '2023–2027',
    department: 'IT',
    verdict: 'Selected',
    verified: true,
    date: '2026-10-28',
    stipendOrCtc: '8.4 LPA',
    minCgpa: 7.0,
    difficulty: 'Hard',
    topics: ['Dynamic Arrays', 'Two Pointers', 'OOP Design', 'Java'],
    rounds: [
      { name: 'Round 1: Code Tracing', duration: '75 mins', summary: '25 output-prediction problems in C and Java covering recursion, pointers, and matrix traversal.' },
      { name: 'Round 2: DSA Problem Solving', duration: '120 mins', summary: '5 console coding problems solved without external library shortcuts.' },
      { name: 'Round 3: Low-Level Design', duration: '150 mins', summary: 'Build an in-memory Role-Based Access Control & Ticket Allocation engine in Java.' },
    ],
    takeaway: 'Practice writing clean, modular Java classes without relying on built-in utilities for sorting or string parsing.'
  },
  {
    id: 'EXP-1039',
    company: 'Bosch Global Software',
    role: 'Embedded & Cloud Software Engineer',
    author: 'Karthikeyan R',
    rollNo: '23BEC019',
    batch: '2023–2027',
    department: 'ECE',
    verdict: 'Selected',
    verified: true,
    date: '2026-10-19',
    stipendOrCtc: '7.2 LPA',
    minCgpa: 7.5,
    difficulty: 'Medium',
    topics: ['C++', 'Operating Systems', 'Computer Networks', 'Arrays'],
    rounds: [
      { name: 'Round 1: Aptitude & Core', duration: '60 mins', summary: 'Quantitative aptitude, C++ memory management, and TCP/IP fundamentals.' },
      { name: 'Round 2: Technical Interview', duration: '45 mins', summary: 'Multithreading concepts, mutex locks, and string manipulation coding.' },
    ],
    takeaway: 'Revise OS synchronization primitives and pointers thoroughly before the technical panel.'
  },
  {
    id: 'EXP-1036',
    company: 'TCS Digital',
    role: 'Systems Engineer (Digital Cadre)',
    author: 'Meenakshi V',
    rollNo: '23BCS114',
    batch: '2023–2027',
    department: 'CSE',
    verdict: 'Selected',
    verified: true,
    date: '2026-10-11',
    stipendOrCtc: '7.0 LPA',
    minCgpa: 7.0,
    difficulty: 'Medium',
    topics: ['Dynamic Programming', 'SQL Joins', 'Python'],
    rounds: [
      { name: 'Round 1: NQT Advanced Coding', duration: '90 mins', summary: '2 medium coding problems (1D DP and greedy interval scheduling).' },
      { name: 'Round 2: Technical + MR', duration: '40 mins', summary: 'SQL complex joins, Python data structures, and project walkthrough.' },
    ],
    takeaway: 'Focus on edge cases and input constraints during the NQT coding section to clear the Digital cutoff.'
  },
  {
    id: 'EXP-1032',
    company: 'Cognizant GenC Next',
    role: 'Full-Stack Developer Trainee',
    author: 'Deepak M',
    rollNo: '23BIT064',
    batch: '2023–2027',
    department: 'IT',
    verdict: 'Waitlisted',
    verified: false,
    date: '2026-09-29',
    stipendOrCtc: '6.75 LPA',
    minCgpa: 6.5,
    difficulty: 'Easy',
    topics: ['Java Collections', 'HTML/CSS/JS', 'DBMS'],
    rounds: [
      { name: 'Round 1: Skill-Based Assessment', duration: '100 mins', summary: '2 Java coding questions + 2 SQL query tasks + 1 front-end debugging question.' },
      { name: 'Round 2: Technical Interview', duration: '35 mins', summary: 'HashMap internal working in Java and REST API status codes.' },
    ],
    takeaway: 'Know how HashMap handles collisions in Java 8+ and be comfortable writing multi-table SQL queries.'
  },
  {
    id: 'EXP-1028',
    company: 'Thoughtworks',
    role: 'Application Developer',
    author: 'Sruthi N',
    rollNo: '23BCS051',
    batch: '2023–2027',
    department: 'CSE',
    verdict: 'Selected',
    verified: true,
    date: '2026-09-18',
    stipendOrCtc: '11.1 LPA',
    minCgpa: 7.5,
    difficulty: 'Hard',
    topics: ['Clean Code', 'TDD', 'OOP Design', 'Refactoring'],
    rounds: [
      { name: 'Round 1: Pair Programming', duration: '90 mins', summary: 'Paired with a Thoughtworks engineer to extend an existing codebase using Test-Driven Development.' },
      { name: 'Round 2: Technical & Leadership', duration: '60 mins', summary: 'Code refactoring, SOLID principles, and social impact discussion.' },
    ],
    takeaway: 'Communicate your thought process aloud while coding; pair programming evaluates collaboration as much as syntax.'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'How is KCT PlacementPulse different from GeeksforGeeks or Glassdoor?',
    a: 'Global sites lack campus-specific hiring context. PlacementPulse tracks exact KCT campus drives, department eligibility cutoffs, round structures, and Placement Cell-verified experiences from your immediate seniors.'
  },
  {
    q: 'Who can publish interview experiences and drive schedules?',
    a: '1st and 2nd year students have read-and-bookmark access. Verified 3rd/4th year seniors and alumni can submit structured round breakdowns, while Placement Cell staff publish official drive calendars and audit submissions.'
  },
  {
    q: 'How are senior submissions verified for accuracy?',
    a: 'Every submission is tied to a verified institutional roll number (e.g., 23BIT042) and reviewed by Placement Cell coordinators before receiving the Verified badge.'
  },
  {
    q: 'Can 1st-year students check eligibility for upcoming companies?',
    a: 'Yes. Each company module displays historical CGPA cutoffs, eligible branches, and required technical skills so 1st and 2nd years can plan their coursework and DSA preparation early.'
  }
];

export const TIMELINE_MILESTONES = [
  { date: 'Aug 2026', title: 'Problem Discovery at KCT', desc: 'Surveyed 240+ first- and second-year IT & CSE students; identified a 78% gap in awareness of campus recruitment patterns.' },
  { date: 'Sep 2026', title: 'RBAC Schema & Core Architecture', desc: 'Designed a 3-tier Role-Based Access Control model separating Junior readers, Senior contributors, and Placement Staff moderators.' },
  { date: 'Oct 2026', title: 'Pilot Launch with IT Department', desc: 'Onboarded final-year placed seniors to document round-by-round experiences for Zoho, Rolls-Royce, and Bosch.' },
  { date: 'Nov 2026', title: 'Campus-Wide Analytics & Search', desc: 'Released topic-level DSA frequency tracking, CGPA eligibility filtering, and verified staff drive announcements.' }
];

export const INITIAL_QUESTIONS = [
  {
    id: 'Q-204',
    title: 'How much DSA is needed before applying for 6-month internships like Rolls-Royce Data Labs?',
    body: 'I am currently in my 2nd year practicing Java DSA (arrays, linked lists, and binary trees). Do interviewers expect dynamic programming and graphs for internship drives, or do they focus more on trees, SQL, and full-stack projects?',
    companyTag: 'Rolls-Royce Data Labs',
    askedByName: 'Sanjith M',
    askedByRollNo: '24BIT105',
    askedByBatch: '2024–2028',
    status: 'Answered',
    createdAt: '2 hours ago',
    answers: [
      {
        id: 'A-11',
        answerBody: 'For 6-month data and full-stack internships, medium-level Binary Trees, Linked Lists, HashMaps, and SQL joins cover 80% of the coding round. Make sure you can explain your backend architecture (like Express middleware and MongoDB schemas) in depth during the technical round.',
        responderName: 'Aravind S',
        responderRollNo: '23BIT042',
        responderRole: 'senior',
        createdAt: '1 hour ago'
      }
    ]
  },
  {
    id: 'Q-203',
    title: 'Are Java Collections allowed in Zoho Round 2 and Round 3?',
    body: 'Seniors mentioned Zoho restricts built-in shortcuts in coding rounds. Does that mean we cannot use ArrayList or HashMap in Java, or is it only sorting/parsing utilities?',
    companyTag: 'Zoho Corporation',
    askedByName: 'Harini P',
    askedByRollNo: '25BIT031',
    askedByBatch: '2025–2029',
    status: 'Open',
    createdAt: '5 hours ago',
    answers: []
  }
];