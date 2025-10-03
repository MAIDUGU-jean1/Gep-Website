import { image, title } from "framer-motion/client";

export const courses = [
  {
    id: 1,
    title: "Front-end Web Development",
    description: "Full-stack web development with modern technologies",
    duration: "3 months",
    tutor: "Jean de Dieu Maidugu",
    price: "25,000 FCFA",
    level: "Beginner to Advanced",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["HTML5/CSS3", "JavaScript", "Boastrap", "React", "Responsive Design"]
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies and tools",
    duration: "4 months",
    tutor: "Sarah Johnson",
    price: "$400",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["SEO", "Social Media", "Content Marketing", "Google Ads", "Analytics"]
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "Professional graphic design and branding",
    duration: "5 months",
    tutor: "Mike Chen",
    price: "$450",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Adobe Photoshop", "Illustrator", "Branding", "UI/UX", "Print Design"]
  },
  {
    id: 4,
    title: "Data Analysis",
    description: "Data analysis and machine learning fundamentals",
    duration: "3 months",
    tutor: "Mr. Ejah Elvis",
    price: "30,000 FCFA",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["SPSS", "Starter", "Excel", "Data Visualization", "Statistics"]
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Cross-platform mobile app development",
    duration: "7 months",
    tutor: "Alex Rodriguez",
    price: "$550",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["React Native", "Flutter", "Firebase", "API Integration", "App Store"]
  },
  {
    id: 6,
    title: "Computer Studies for Secretariat Duties",
    description: "Essential computer skills for administrative roles",
    duration: "2 months",
    tutor: "Ngulefac Terence",
    price: "20,000 FCFA",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Microsoft Office", "Typing Skills", "Data Entry", "Email Management", "Basic IT"]
  },
  {
    id: 7,
    title: "Back-end Development",
    description: "Server-side programming and database management",
    duration: "3 months",
    tutor: "Ngulefac Terence",
    price: "30,000 FCFA",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Laravel", "mySql", "PHP", "API Development", "Authentication"]
  },
  {
    id: 8,
    title: "Business Intelligence",
    description: "Data-driven decision making and BI tools",
    duration: "3 months",
    tutor: "Mr. Elvis Ejah",
    price: "30,000 FCFA",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    // image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Power BI", "Tableau", "Data Warehousing", "ETL Processes", "Predictive Analytics"]
  },
  {
    id: 9,
    title: "UI/UX Design",
    description: "User interface and user experience design principles",
    duration: "3 months",
    tutor: "Ngulefac Terence",
    price: "25,000 FCFA",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Wireframing", "Prototyping", "User Research", "Usability Testing", "Design Systems"]
  }

];

export const tutors = [
  {
    id: 1,
    name: "John Smith",
    specialization: "Web Development",
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Full-stack developer with extensive experience in modern web technologies."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    specialization: "Digital Marketing",
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Digital marketing expert specializing in SEO and social media strategies."
  },
  {
    id: 3,
    name: "Mike Chen",
    specialization: "Graphic Design",
    experience: "7 years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Award-winning graphic designer with expertise in branding and UI/UX."
  },
  {
    id: 4,
    name: "Dr. Emily Brown",
    specialization: "Data Science",
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "PhD in Computer Science with focus on machine learning and data analytics."
  }
];