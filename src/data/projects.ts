import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management, secure payments, and admin dashboard.',
    category: 'web design',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication, transaction history, and budget tracking.',
    category: 'mobile development',
    technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '3',
    title: 'Brand Identity System',
    description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines.',
    category: 'ui ux',
    technologies: ['Figma', 'Adobe Creative Suite', 'Sketch'],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '4',
    title: 'Data Analytics Dashboard',
    description: 'Interactive dashboard for real-time data visualization with customizable charts and reports.',
    category: 'data visualization',
    technologies: ['Python', 'Django', 'D3.js', 'PostgreSQL'],
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '5',
    title: 'Social Media Platform',
    description: 'Modern social networking platform with real-time messaging, content sharing, and community features.',
    category: 'web design',
    technologies: ['Vue.js', 'Express.js', 'Socket.io', 'Redis'],
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '6',
    title: 'Fitness Tracking App',
    description: 'Comprehensive fitness app with workout tracking, nutrition logging, and progress analytics.',
    category: 'mobile development',
    technologies: ['Flutter', 'Firebase', 'TensorFlow', 'Cloud Functions'],
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '7',
    title: 'Restaurant POS System',
    description: 'Point-of-sale system for restaurants with order management, inventory tracking, and sales analytics.',
    category: 'ui ux',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '8',
    title: 'Machine Learning Pipeline',
    description: 'End-to-end ML pipeline for predictive analytics with automated model training and deployment.',
    category: 'data visualization',
    technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
    image: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: 'https://example.com',
    github: 'https://github.com'
  }
];

export const skills = [
  { id: '1', name: 'React', level: 95, category: 'frontend', icon: 'Code' },
  { id: '2', name: 'TypeScript', level: 90, category: 'frontend', icon: 'FileText' },
  { id: '3', name: 'Node.js', level: 85, category: 'backend', icon: 'Server' },
  { id: '4', name: 'Python', level: 88, category: 'backend', icon: 'Code2' },
  { id: '5', name: 'UI/UX Design', level: 92, category: 'design', icon: 'Palette' },
  { id: '6', name: 'PostgreSQL', level: 80, category: 'database', icon: 'Database' },
  { id: '7', name: 'AWS', level: 75, category: 'cloud', icon: 'Cloud' },
  { id: '8', name: 'Docker', level: 82, category: 'devops', icon: 'Container' }
];