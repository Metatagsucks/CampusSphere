import type { Opportunity, Review } from './types';

const reviews1: Review[] = [
  { id: 'r1', author: 'Alex Johnson', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Amazing experience, learned a lot about full-stack development.', date: '2023-08-15' },
  { id: 'r2', author: 'Brenda Smith', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'Good mentorship and a friendly team. The work was challenging but rewarding.', date: '2023-08-10' },
  { id: 'r3', author: 'Carl White', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Highly recommend! The projects were very relevant to my studies.', date: '2023-08-05' },
];

const reviews2: Review[] = [
  { id: 'r4', author: 'Diana Green', avatarUrl: 'https://placehold.co/40x40.png', rating: 3, text: 'The course content was good but a bit fast-paced for beginners.', date: '2023-07-20' },
  { id: 'r5', author: 'Ethan Hunt', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'Great instructors and practical examples. The final project was very useful.', date: '2023-07-18' },
];

const reviews3: Review[] = [
    { id: 'r6', author: 'Fiona Gallagher', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'This was a fantastic internship. The marketing team was very supportive.', date: '2023-09-01' },
    { id: 'r7', author: 'George King', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'I got to work on real campaigns. A great addition to my resume.', date: '2023-08-25' },
];

const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Innovate Inc.',
    type: 'Internship',
    category: 'Technology',
    location: 'Remote',
    verified: true,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'tech company',
    description: 'Join our dynamic engineering team to work on cutting-edge web technologies. You will contribute to both front-end and back-end development, gaining hands-on experience with modern frameworks like React and Node.js. This is a great opportunity to learn from experienced developers in a fast-paced environment.',
    reviews: reviews1,
  },
  {
    id: '2',
    title: 'Advanced Machine Learning',
    company: 'Data University',
    type: 'Course',
    category: 'Technology',
    location: 'Online',
    verified: true,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'online course',
    description: 'A comprehensive course on advanced machine learning topics, including deep learning, reinforcement learning, and natural language processing. This course is designed for students with a foundational knowledge of ML and programming. Taught by industry experts.',
    reviews: reviews2,
  },
  {
    id: '3',
    title: 'Digital Marketing Intern',
    company: 'MarketPro Agency',
    type: 'Internship',
    category: 'Marketing',
    location: 'New York, NY',
    verified: true,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'marketing agency',
    description: 'Assist our digital marketing team with SEO, content creation, and social media campaigns. You will learn how to use various marketing analytics tools and contribute to real client projects. Ideal for students passionate about digital marketing and communications.',
    reviews: reviews3,
  },
  {
    id: '4',
    title: 'Financial Analyst',
    company: 'Capital Investments',
    type: 'Placement',
    category: 'Finance',
    location: 'London, UK',
    verified: false,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'finance office',
    description: 'A full-time placement opportunity for recent graduates. As a Financial Analyst, you will be responsible for financial modeling, market research, and preparing investment reports. Strong analytical and quantitative skills are required.',
    reviews: [],
  },
  {
    id: '5',
    title: 'UX/UI Design Intern',
    company: 'Creative Solutions',
    type: 'Internship',
    category: 'Design',
    location: 'San Francisco, CA',
    verified: true,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'design studio',
    description: 'Work alongside our design team to create intuitive and beautiful user experiences for our web and mobile applications. You will be involved in the entire design process, from user research and wireframing to prototyping and usability testing.',
    reviews: [
      { id: 'r8', author: 'Ivy Chen', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Incredible learning experience. I had a lot of creative freedom.', date: '2023-09-05' },
    ],
  },
  {
    id: '6',
    title: 'Introduction to Python',
    company: 'Code Academy',
    type: 'Course',
    category: 'Technology',
    location: 'Online',
    verified: true,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'programming code',
    description: 'A beginner-friendly course covering the fundamentals of Python programming. No prior coding experience is necessary. Learn about variables, data structures, loops, functions, and object-oriented programming through interactive exercises and projects.',
    reviews: [
      { id: 'r9', author: 'Jack Ryan', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Perfect for absolute beginners!', date: '2023-08-20' },
      { id: 'r10', author: 'Kate Austen', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'Well-structured and easy to follow.', date: '2023-08-18' },
    ],
  },
];

export function getOpportunities(): Opportunity[] {
  return opportunities;
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return opportunities.find(op => op.id === id);
}
