import { PersonalInfo, Skill, Project, Education, Experience, Certification } from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: 'LINGAPPAGARI VINOD',
  title: 'Full Stack Developer',
  tagline: 'Passionate about building scalable web applications with modern technologies',
  location: 'Chittoor, Andhra Pradesh, India',
  phone: '+91 94415 50186',
  email: 'lingappagarivinod@gmail.com',
  linkedin: 'www.linkedin.com/in/lingappagari-vinod',
  website: 'magentalvinod.dev',
  github: 'github.com/lingappagarivinod'
};

export const about = `Enthusiastic and detail-oriented aspiring Full Stack Developer with hands-on experience building responsive web applications using the MERN stack. Strong foundation in React, Node.js, Express, MongoDB, and modern JavaScript. A motivated problem-solver with a passion for continuous learning and delivering production-ready features. Currently seeking internships or entry-level opportunities to contribute to real-world projects and grow as a developer.`;

export const interests = [
  'Full Stack Development',
  'Power BI',
  'Python Development',
  'Web Development',
  'Data Analytics',
  'Machine Learning',
  'UI/UX Design'
];

export const skills: Skill[] = [
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'HTML5', level: 95, category: 'Frontend' },
  { name: 'CSS3', level: 90, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'Bootstrap', level: 80, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Express.js', level: 75, category: 'Backend' },
  { name: 'MongoDB', level: 75, category: 'Database' },
  { name: 'MySQL', level: 70, category: 'Database' },
  { name: 'Git & GitHub', level: 85, category: 'Tools' },
  { name: 'Power BI', level: 60, category: 'Other' },
  { name: 'Python', level: 70, category: 'Other' }
];

export const education: Education[] = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'Siddhartha Institute of Engineering and Technology, Andhra Pradesh',
    period: '2023 – 2026 (Expected)',
    specialization: 'Computer Science & Technology'
  },
  {
    degree: 'Higher Secondary (Class 12)',
    institution: 'Secondary Education',
    period: '2019 – 2021'
  },
  {
    degree: 'Secondary School (Class 10)',
    institution: 'Secondary Education',
    period: '2017 – 2019'
  }
];

export const projects: Project[] = [
  {
    title: 'Full Stack Web Application (MERN)',
    description: 'Developed a fully responsive web application using React and Node.js + Express. Implemented JWT authentication, CRUD operations, and RESTful APIs. Integrated MongoDB for data persistence. Added data visualization components and client-side form validation.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    year: '2025'
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Built and deployed a responsive developer portfolio using React. Showcased projects, skills, and integrated a functional contact form. Hosted live project demos.',
    techStack: ['React', 'Tailwind CSS', 'Responsive Design'],
    year: '2025'
  },
  {
    title: 'Spam Detection (Machine Learning)',
    description: 'Implemented a basic ML pipeline for spam classification. Performed text preprocessing, TF-IDF feature extraction, and model training. Explored multiple classification algorithms and evaluated accuracy.',
    techStack: ['Python', 'Machine Learning', 'TF-IDF', 'Classification'],
    year: '2024'
  }
];

export const experience: Experience[] = [
  {
    title: 'Java Intern',
    company: 'Slash Mark',
    period: '2024',
    description: [
      'Worked on Java-based development tasks and internal projects',
      'Gained exposure to software development workflows and version control',
      'Collaborated with team members and refined coding practices'
    ]
  }
];

export const certifications: Certification[] = [
  { name: 'Full Stack Web Development', issuer: 'Online Certification', year: '' },
  { name: 'SQL Certificate', issuer: 'SoloLearn', year: '2025' },
  { name: 'Python Essentials 2', issuer: 'Cisco Networking', year: '' }
];
