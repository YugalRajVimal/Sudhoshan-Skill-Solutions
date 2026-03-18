// COURSE INDEX STRUCTURED DATA

// Course Table Summary
export const COURSE_INDEX = [
  {
    no: "01",
    name: "Digital Literacy & Internet Essentials",
    category: "Foundation",
    duration: "2 Weeks",
    fee: "₹ 99"
  },
  {
    no: "02",
    name: "Basic Computer Operations",
    category: "Foundation",
    duration: "2 Weeks",
    fee: "₹ 99"
  },
  {
    no: "03",
    name: "Job Readiness & Workplace Skills Training",
    category: "Employability",
    duration: "2 Weeks",
    fee: "₹ 149"
  },
  {
    no: "04",
    name: "GST & Accounting Fundamentals",
    category: "Finance & Commerce",
    duration: "3 Weeks",
    fee: "₹ 199"
  },
  {
    no: "05",
    name: "MS Excel & Data Entry Professional Skills",
    category: "Computer Skills",
    duration: "3 Weeks",
    fee: "₹ 199"
  },
  {
    no: "06",
    name: "Resume Writing & LinkedIn Profile Building",
    category: "Employability",
    duration: "2 Weeks",
    fee: "₹ 99"
  },
  {
    no: "07",
    name: "Interview Preparation & Communication Skills",
    category: "Employability",
    duration: "2 Weeks",
    fee: "₹ 149"
  },
  {
    no: "08",
    name: "Retail Sales & Customer Handling Training",
    category: "Sales & Marketing",
    duration: "2 Weeks",
    fee: "₹ 149"
  },
  {
    no: "09",
    name: "Customer Support Executive Training",
    category: "BPO / Customer Service",
    duration: "3 Weeks",
    fee: "₹ 199"
  },
  {
    no: "10",
    name: "Office Administration & Front Office Management",
    category: "Administration",
    duration: "3 Weeks",
    fee: "₹ 199"
  }
];

// Important General Course Info
export const COURSE_NOTES = [
  "Certificate of Completion awarded for each course upon successful assessment.",
  "All classes conducted live via Zoom. Recordings available for enrolled students."
];

// COURSE DETAILS (full raw text structure)
export const COURSES_DETAILS = [
  {
    id: "01",
    slug: "digital-literacy-internet-essentials",
    title: "Digital Literacy & Internet Essentials",
    category: "FOUNDATION",
    tagline: "Your first step into the digital world",
    duration: "2 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 99",
    certificate: "Yes — On Completion",
    about: `This beginner-friendly course teaches essential digital skills needed in today's job market. Students learn to use the internet safely, handle emails, use digital tools, and understand online safety practices. Ideal for freshers and first-time job seekers with little or no digital exposure.`,
    whoIsThisFor: "School / college students, housewives, rural youth, first-time job seekers",
    whatAchieve: "Confidently use smartphones, internet, email, and digital apps for work",
    curriculum: [
      "What is the Internet — How it works",
      "Using a Browser — Google Search, YouTube, Maps",
      "Email Basics — Creating, sending, and managing email",
      "Online Safety — Passwords, scams, privacy settings",
      "Digital Payments — UPI, banking apps, wallets",
      "Useful Apps for Work — WhatsApp, Google Drive, Zoom",
      "Online Government Services — DigiLocker, UMANG, eDistrict",
      "Practical Session — Live tasks and Q&A"
    ]
  },
  {
    id: "02",
    slug: "basic-computer-operations",
    title: "Basic Computer Operations",
    category: "FOUNDATION",
    tagline: "Learn computers from scratch — no prior knowledge needed",
    duration: "2 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 99",
    certificate: "Yes — On Completion",
    about: `A structured introduction to computers designed for complete beginners. This course covers hardware, operating systems, typing, file management, and essential software tools. Perfect for candidates who want to enter office jobs, data entry, or administrative roles.`,
    whoIsThisFor: "Beginners with no computer background, job seekers targeting office roles",
    whatAchieve: "Operate a computer confidently, manage files, type efficiently, and use basic software",
    curriculum: [
      "Introduction to Computers — Parts and functions",
      "Operating System Basics — Windows navigation",
      "Keyboard & Mouse Skills — Shortcuts and speed typing",
      "File Management — Creating, saving, copying, organizing folders",
      "Notepad & WordPad — Basic text editing",
      "Introduction to MS Word — Typing and formatting documents",
      "Introduction to MS Excel — Basic spreadsheet usage",
      "Printing, Scanning & USB usage",
      "Practical Test & Certification Session"
    ]
  },
  {
    id: "03",
    slug: "job-readiness-workplace-skills-training",
    title: "Job Readiness & Workplace Skills Training",
    category: "EMPLOYABILITY",
    tagline: "Get job-ready before your first interview",
    duration: "2 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 149",
    certificate: "Yes — On Completion",
    about: `This practical training prepares candidates for the real-world workplace. It covers professional behavior, communication etiquette, time management, and workplace dos and don'ts. Candidates learn how to present themselves professionally, handle workplace situations, and develop a positive work attitude that employers look for.`,
    whoIsThisFor: "Freshers, recent graduates, candidates preparing for their first job",
    whatAchieve: "Walk into any workplace with confidence, professionalism, and the right mindset",
    curriculum: [
      "What Employers Really Look For",
      "Professional Communication — Speaking and listening skills",
      "Email & Messaging Etiquette at Work",
      "Time Management & Punctuality",
      "Teamwork & Workplace Behaviour",
      "Dressing for Work — Grooming and presentation",
      "Understanding an Offer Letter & Joining Formalities",
      "Handling Challenges at Work — Pressure, feedback, conflict",
      "Career Growth Mindset — First 90 days on the job",
      "Practical Role-Play & Assessment"
    ]
  },
  {
    id: "04",
    slug: "gst-accounting-fundamentals",
    title: "GST & Accounting Fundamentals",
    category: "FINANCE & COMMERCE",
    tagline: "Understand GST and accounting basics for real work",
    duration: "3 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 199",
    certificate: "Yes — On Completion",
    about: `This course provides a beginner-level understanding of Goods and Services Tax (GST) and basic accounting principles. Designed for commerce students, shop owners, and office assistants, the course covers GST concepts, invoice creation, simple bookkeeping, and how accounts are maintained in small businesses. No prior CA or accounting degree required.`,
    whoIsThisFor: "Commerce students, shop owners, office assistants, accounts trainees",
    whatAchieve: "Understand GST slabs, file basic returns, maintain simple accounts, and create invoices",
    curriculum: [
      "Introduction to Accounting — Basic concepts and terms",
      "Types of Accounts — Assets, liabilities, income, expense",
      "What is GST — History, concept, and importance",
      "GST Structure — CGST, SGST, IGST explained",
      "GST Slabs & Exemptions — What falls where",
      "GST Registration — Who needs it and how",
      "Creating GST Invoices — Format and details",
      "GSTR-1 & GSTR-3B Overview — Basic filing concept",
      "Simple Bookkeeping — Cash book, ledger basics",
      "Tally Overview — Introduction to Tally Prime interface",
      "Practical Assignment — Invoice creation & basic entries"
    ]
  },
  {
    id: "05",
    slug: "ms-excel-data-entry-professional-skills",
    title: "MS Excel & Data Entry Professional Skills",
    category: "COMPUTER SKILLS",
    tagline: "Master Excel and become a data entry professional",
    duration: "3 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 199",
    certificate: "Yes — On Completion",
    about: `One of the most in-demand office skills today, this course takes candidates from zero to job-ready in Excel and data entry. Students learn to work with spreadsheets, create reports, use formulas, and handle real data entry tasks efficiently. This course directly improves hiring chances for office assistant, MIS executive, and back-office roles.`,
    whoIsThisFor: "Job seekers targeting office/back-office roles, MIS, data processing positions",
    whatAchieve: "Handle real-world Excel tasks, data entry work, and basic MIS reporting independently",
    curriculum: [
      "Excel Interface — Ribbon, cells, rows, columns",
      "Data Entry Best Practices — Speed, accuracy, shortcuts",
      "Formatting & Cell Styling",
      "Essential Formulas — SUM, AVERAGE, COUNT, IF, VLOOKUP",
      "Sorting, Filtering & Find-Replace",
      "Working with Multiple Sheets",
      "Basic Charts & Graphs",
      "Data Validation & Drop-down Lists",
      "Freeze Panes, Print Setup & Page Layout",
      "Creating MIS Reports — Practical templates",
      "Speed Typing Practice — Numeric and alphanumeric",
      "Final Practical Test — Live data entry assignment"
    ]
  },
  {
    id: "06",
    slug: "resume-writing-linkedin-profile-building",
    title: "Resume Writing & LinkedIn Profile Building",
    category: "EMPLOYABILITY",
    tagline: "Build a resume that gets you shortlisted",
    duration: "2 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 99",
    certificate: "Yes — On Completion",
    about: `A strong resume is the first step to getting hired. This course teaches candidates how to write a professional, ATS-friendly resume from scratch, structure it for different job roles, and build an impactful LinkedIn profile. Students get personalized feedback on their resume drafts and learn what recruiters actually look for.`,
    whoIsThisFor: "Freshers, job changers, candidates with no idea how to write a resume",
    whatAchieve: "A ready-to-submit professional resume and a complete LinkedIn profile",
    curriculum: [
      "Why Your Resume Matters — Recruiter's perspective",
      "Types of Resumes — Fresher, experienced, functional",
      "Resume Structure — What to include and what to avoid",
      "Writing a Strong Objective / Summary Statement",
      "Listing Education, Skills & Certifications",
      "Action Verbs & Power Words for Resumes",
      "ATS-Friendly Formatting — How companies screen resumes",
      "Common Resume Mistakes to Avoid",
      "Creating Your LinkedIn Profile — Step by step",
      "LinkedIn Tips — Connections, keywords, job applications",
      "Peer Review Session — Feedback on your resume draft"
    ]
  },
  {
    id: "07",
    slug: "interview-preparation-communication-skills",
    title: "Interview Preparation & Communication Skills",
    category: "EMPLOYABILITY",
    tagline: "Walk into interviews with confidence and clarity",
    duration: "2 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 149",
    certificate: "Yes — On Completion",
    about: `This course prepares candidates for every stage of the interview process — from the first phone call to the final HR round. It covers how to answer common interview questions, how to introduce yourself confidently, handle pressure questions, negotiate salary, and follow up after interviews. Live mock interview sessions are included.`,
    whoIsThisFor: "Freshers and experienced candidates preparing for job interviews",
    whatAchieve: "Clear interviews with confidence, handle any question, and make a strong impression",
    curriculum: [
      "Understanding the Interview Process — Rounds and types",
      "Tell Me About Yourself — Structuring a strong self-introduction",
      "Common HR Questions & Model Answers",
      "Behavioural Questions — STAR method explained",
      "Technical Round Preparation Tips",
      "Body Language, Eye Contact & Posture",
      "How to Handle Pressure & Stress Questions",
      "Salary Negotiation — What to say and what not to say",
      "Telephonic & Video Interview Etiquette",
      "Questions to Ask the Interviewer",
      "Post-Interview Follow-Up — Email etiquette",
      "Mock Interview Session — Live practice with feedback"
    ]
  },
  {
    id: "08",
    slug: "retail-sales-customer-handling-training",
    title: "Retail Sales & Customer Handling Training",
    category: "SALES & MARKETING",
    tagline: "Sell better, serve better, earn better",
    duration: "2 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 149",
    certificate: "Yes — On Completion",
    about: `Retail is one of India's largest employment sectors. This course trains candidates for sales assistant, floor executive, and retail associate roles. It covers the basics of selling, handling customers, managing objections, achieving targets, and providing excellent in-store or phone-based service. Suitable for candidates targeting retail chains, showrooms, and FMCG companies.`,
    whoIsThisFor: "Candidates targeting retail, showrooms, FMCG sales, or customer-facing roles",
    whatAchieve: "Confidently handle customers, pitch products, manage objections, and achieve sales targets",
    curriculum: [
      "Introduction to Retail — Industry overview and career scope",
      "Understanding the Customer — Types and buying behaviour",
      "Sales Basics — AIDA model and selling techniques",
      "Greeting & Approach — First impression in retail",
      "Product Knowledge & Demonstration",
      "Handling Objections — Common situations and responses",
      "Upselling & Cross-Selling Techniques",
      "Billing, Returns & Basic POS Operations",
      "Customer Complaint Handling",
      "Achieving Daily & Monthly Sales Targets",
      "Role-Play Session — Live customer interaction practice"
    ]
  },
  {
    id: "09",
    slug: "customer-support-executive-training",
    title: "Customer Support Executive Training",
    category: "BPO / CUSTOMER SERVICE",
    tagline: "Build a career in customer support — one of India's fastest-growing sectors",
    duration: "3 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 199",
    certificate: "Yes — On Completion",
    about: `Customer support is a high-demand, entry-level career with strong growth potential. This course prepares candidates for inbound and outbound call centre, BPO, and customer service roles. It covers communication skills, call handling, complaint resolution, CRM basics, and email/chat support. Voice modulation and accent practice sessions are included.`,
    whoIsThisFor: "Candidates targeting BPO, call centre, helpdesk, or customer service roles",
    whatAchieve: "Handle customer calls, emails, and chats professionally and resolve issues efficiently",
    curriculum: [
      "Customer Service Industry — Overview and career paths",
      "Inbound vs Outbound Calling — Differences and roles",
      "Effective Communication Skills for Support",
      "Voice Modulation, Tone & Clarity",
      "Call Handling Etiquette — Opening, holding, transferring, closing",
      "Active Listening & Empathy in Customer Service",
      "Handling Difficult Customers & Escalations",
      "Email Support Writing — Professional templates",
      "Chat Support Basics — Speed and accuracy",
      "Introduction to CRM Tools — Concepts and basic usage",
      "SLA, KPIs & Performance Metrics in BPO",
      "Mock Call Sessions — Recorded practice with feedback"
    ]
  },
  {
    id: "10",
    slug: "office-administration-front-office-management",
    title: "Office Administration & Front Office Management",
    category: "ADMINISTRATION",
    tagline: "Be the backbone of any office — professional, organized, and reliable",
    duration: "3 Weeks",
    mode: "Online / Zoom",
    fee: "₹ 199",
    certificate: "Yes — On Completion",
    about: `This comprehensive course prepares candidates for office assistant, receptionist, front office executive, and administrative support roles. Students learn office management basics, professional communication, document handling, scheduling, and front desk operations. The course combines soft skills and computer skills to make candidates work-ready for any corporate or government office environment.`,
    whoIsThisFor: "Candidates targeting receptionist, admin assistant, front office, or back-office roles",
    whatAchieve: "Manage office operations, handle correspondence, schedule tasks, and support management professionally",
    curriculum: [
      "Introduction to Office Administration — Roles and responsibilities",
      "Front Desk Operations — Visitor management and reception",
      "Professional Telephone Handling",
      "Office Communication — Internal and external correspondence",
      "Document Management — Filing, records, and archiving",
      "Scheduling & Calendar Management",
      "MS Word for Office Work — Letters, memos, reports",
      "MS Excel for Office Work — Attendance, petty cash, MIS",
      "Email Management & Professional Writing",
      "Office Supplies & Asset Management Basics",
      "Confidentiality & Professional Ethics at Work",
      "Practical Assessment — Office scenario simulation"
    ]
  }
];