/**
 * XML Course Loader & DOMParser Utility
 * Retrieves and parses /data/courses.xml with fallback
 */

import { Course } from '../types/index.ts';

export const FALLBACK_COURSES: Course[] = [
  {
    code: 'IT101',
    name: 'B.Tech Information Technology',
    department: 'Engineering & Technology',
    category: 'Undergraduate Engineering',
    duration: '4 Years',
    fee: 85000,
    feeFormatted: '₹85,000 / year',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (Min. 60% marks)',
    description: 'Comprehensive 4-year engineering curriculum focusing on enterprise software architecture, operating systems, cloud networks, database engineering, and modern full-stack development.',
    seats: 120,
    rating: 4.9,
    icon: 'Cpu',
    badge: 'Most Popular',
    syllabus: [
      'Data Structures & Algorithms in C++/Java',
      'Database Management Systems (RDBMS & NoSQL)',
      'Computer Networks & Network Security',
      'Cloud Infrastructure & Containerization',
      'Full-Stack Web Engineering & REST APIs',
      'Final Year Industry Capstone Project',
    ],
    careerOpportunities: 'Software Development Engineer, Cloud Engineer, Systems Analyst, Backend Architect',
  },
  {
    code: 'BC102',
    name: 'Bachelor of Computer Applications',
    department: 'Computer Applications',
    category: 'Undergraduate Computing',
    duration: '3 Years',
    fee: 60000,
    feeFormatted: '₹60,000 / year',
    eligibility: '10+2 in any stream with Mathematics or Computer Science (Min. 50% marks)',
    description: 'Industry-oriented 3-year undergraduate degree empowering students with practical programming skills, web applications, mobile computing, and database management.',
    seats: 90,
    rating: 4.8,
    icon: 'Code',
    badge: 'Fast Track Career',
    syllabus: [
      'Foundations of Programming with Python & C',
      'Object-Oriented Programming with Java',
      'Web Application Development (HTML5, CSS3, JS)',
      'Relational Database Design with MySQL',
      'Mobile Application Development',
      'Software Testing & Quality Assurance',
    ],
    careerOpportunities: 'Web Developer, Junior Software Developer, Database Administrator, App Developer',
  },
  {
    code: 'CS103',
    name: 'B.Sc Computer Science',
    department: 'Science & Computing',
    category: 'Undergraduate Science',
    duration: '3 Years',
    fee: 50000,
    feeFormatted: '₹50,000 / year',
    eligibility: '10+2 with Mathematics / Computer Science (Min. 50% marks)',
    description: 'Rigorous academic degree focusing on theoretical foundations of computing, algorithmic analysis, mathematics for computation, and system programming.',
    seats: 80,
    rating: 4.7,
    icon: 'Binary',
    badge: 'Affordable & Foundational',
    syllabus: [
      'Discrete Mathematics & Graph Theory',
      'Design & Analysis of Algorithms',
      'Computer System Architecture & Assembly',
      'Linux System Administration & Shell Scripting',
      'Numerical Methods & Statistical Computing',
      'Independent Research Seminar',
    ],
    careerOpportunities: 'Research Assistant, Data Analyst, Algorithm Engineer, Systems Programmer',
  },
  {
    code: 'MC104',
    name: 'Master of Computer Applications',
    department: 'Postgraduate Computing',
    category: 'Postgraduate Masters',
    duration: '2 Years',
    fee: 75000,
    feeFormatted: '₹75,000 / year',
    eligibility: 'BCA / B.Sc Computer Science / B.Tech or any Graduate with Mathematics (Min. 55% marks)',
    description: 'Advanced postgraduate degree designed to prepare tech specialists for high-level software engineering, microservices, big data processing, and IT project leadership.',
    seats: 60,
    rating: 4.9,
    icon: 'Layers',
    badge: 'High Placement Rate',
    syllabus: [
      'Advanced Algorithms & High-Performance Computing',
      'Distributed Systems & Microservices Architecture',
      'Enterprise Java / Node.js Backend Frameworks',
      'Information Security & Cryptography',
      'Artificial Intelligence & Neural Networks',
      'Six-Month Corporate Internship & Dissertation',
    ],
    careerOpportunities: 'Senior Software Engineer, Technical Lead, Solution Architect, Product Engineer',
  },
  {
    code: 'AI105',
    name: 'B.Tech Artificial Intelligence & Data Science',
    department: 'Engineering & Technology',
    category: 'Undergraduate Engineering',
    duration: '4 Years',
    fee: 95000,
    feeFormatted: '₹95,000 / year',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (Min. 65% aggregate)',
    description: 'Specialized engineering degree covering machine learning, deep neural networks, computer vision, natural language processing, and big data engineering pipelines.',
    seats: 60,
    rating: 5.0,
    icon: 'Brain',
    badge: 'Next-Gen Tech',
    syllabus: [
      'Linear Algebra, Calculus & Probability for AI',
      'Supervised & Unsupervised Machine Learning',
      'Deep Learning with PyTorch & TensorFlow',
      'Computer Vision & Generative Models',
      'Natural Language Processing & LLMs',
      'Big Data Engineering (Spark, Hadoop, Kafka)',
    ],
    careerOpportunities: 'AI Engineer, Machine Learning Specialist, Data Scientist, MLOps Engineer',
  },
  {
    code: 'CY106',
    name: 'M.Sc Cybersecurity & Digital Forensics',
    department: 'Postgraduate Computing',
    category: 'Postgraduate Masters',
    duration: '2 Years',
    fee: 70000,
    feeFormatted: '₹70,000 / year',
    eligibility: 'B.Tech / B.Sc in CS / IT / Electronics with min. 55% marks',
    description: 'In-depth program in ethical hacking, network defense, security auditing, digital incident response, and cyber governance compliance.',
    seats: 45,
    rating: 4.8,
    icon: 'ShieldCheck',
    badge: 'High Demand',
    syllabus: [
      'Network Security & Cryptographic Protocols',
      'Ethical Hacking & Penetration Testing',
      'Digital Forensics & Malware Analysis',
      'Security Operations Center (SOC) Management',
      'Cloud Security & Zero Trust Architecture',
      'Cyber Laws & ISO 27001 Compliance',
    ],
    careerOpportunities: 'Cybersecurity Analyst, Penetration Tester, Incident Responder, Information Security Officer',
  },
  {
    code: 'DS107',
    name: 'Professional Diploma in Full Stack Web',
    department: 'Vocational & Professional',
    category: 'Diploma & Certification',
    duration: '1 Year',
    fee: 40000,
    feeFormatted: '₹40,000 total',
    eligibility: 'Any 10+2 or Diploma holder with basic computer familiarity',
    description: 'Intensive 1-year career accelerator covering modern front-end engineering, backend server architecture, SQL/NoSQL databases, and collaborative Git workflows.',
    seats: 50,
    rating: 4.9,
    icon: 'Globe',
    badge: 'Job Ready',
    syllabus: [
      'HTML5 Semantic Markup, Modern CSS3 & Tailwind',
      'Modern JavaScript (ES6+), React & TypeScript',
      'Node.js, Express & PHP 8 Backend Services',
      'SQL Schema Design, Queries & Data Security',
      'CI/CD Deployment & Cloud Hosting',
      'Portfolio Building & Mock Technical Interviews',
    ],
    careerOpportunities: 'Frontend Developer, Junior Full-Stack Engineer, UI Developer, Webmaster',
  },
  {
    code: 'MB108',
    name: 'MBA in Information Technology Management',
    department: 'Management Studies',
    category: 'Postgraduate Masters',
    duration: '2 Years',
    fee: 120000,
    feeFormatted: '₹1,20,000 / year',
    eligibility: 'Graduation in any discipline with minimum 50% marks',
    description: 'Blends technology leadership with strategic business administration, IT governance, project lifecycle management, and enterprise technology procurement.',
    seats: 60,
    rating: 4.8,
    icon: 'Briefcase',
    badge: 'Executive Track',
    syllabus: [
      'Strategic Management & Tech Economics',
      'IT Project Management & Agile Methodologies',
      'Enterprise Resource Planning (ERP) Systems',
      'Data Analytics for Business Decision Making',
      'Digital Transformation & Innovation Leadership',
      'Corporate IT Internship & Strategic Thesis',
    ],
    careerOpportunities: 'IT Project Manager, Technology Consultant, Product Manager, Business Systems Analyst',
  },
];

/**
 * Fetch and parse XML dynamically
 */
export async function loadCoursesFromXML(): Promise<Course[]> {
  try {
    const res = await fetch('/data/courses.xml');
    if (!res.ok) {
      return FALLBACK_COURSES;
    }
    const xmlText = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const courseNodes = xmlDoc.getElementsByTagName('course');
    if (!courseNodes || courseNodes.length === 0) {
      return FALLBACK_COURSES;
    }

    const parsed: Course[] = [];
    for (let i = 0; i < courseNodes.length; i++) {
      const node = courseNodes[i];
      const getVal = (tag: string, fallback = ''): string => {
        const el = node.getElementsByTagName(tag)[0];
        return el?.textContent?.trim() || fallback;
      };

      const syllabusNodes = node.getElementsByTagName('topic');
      const syllabus: string[] = [];
      for (let j = 0; j < syllabusNodes.length; j++) {
        if (syllabusNodes[j].textContent) {
          syllabus.push(syllabusNodes[j].textContent!.trim());
        }
      }

      parsed.push({
        code: getVal('code', `CRS-${i}`),
        name: getVal('name', 'Course Title'),
        department: getVal('department', 'General'),
        category: getVal('category', 'General'),
        duration: getVal('duration', '3 Years'),
        fee: parseInt(getVal('fee', '50000'), 10) || 50000,
        feeFormatted: getVal('feeFormatted', '₹50,000'),
        eligibility: getVal('eligibility', '10+2 or equivalent'),
        description: getVal('description', 'Comprehensive academic curriculum.'),
        seats: parseInt(getVal('seats', '60'), 10) || 60,
        rating: parseFloat(getVal('rating', '4.8')) || 4.8,
        icon: getVal('icon', 'BookOpen'),
        badge: getVal('badge') || undefined,
        syllabus: syllabus.length > 0 ? syllabus : ['Core Foundations', 'Advanced Topics', 'Capstone Project'],
        careerOpportunities: getVal('careerOpportunities', 'Technology & Systems Specialist'),
      });
    }

    return parsed;
  } catch (err) {
    console.warn('Failed to parse XML via network, using in-memory XML courses data:', err);
    return FALLBACK_COURSES;
  }
}
