export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  github: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  year: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  specialization?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}
