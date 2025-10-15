import { details, image, title } from "framer-motion/client";

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
    features: ["HTML5/CSS3", "JavaScript", "Boastrap", "React", "Responsive Design"],
    about: '',
    learn: [],
    opportunities: [],
  },
  {
    id: 2,
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies and tools",
    duration: "3 months",
    tutor: "Sarah Johnson",
    price: "20,000 FCFA",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["SEO", "Social Media", "Content Marketing", "Google Ads", "Analytics"]
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "Professional graphic design and branding",
    duration: "3 months",
    tutor: "Mr Sekwi Thierry",
    price: "15,000 FCFA",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Adobe Photoshop", "Illustrator", "Branding", "UI/UX", "Print Design"]
  },
  {
    id: 4,
    title: "Data Analysis",
    description: "Data analysis and machine learning fundamentals",
    duration: "3 months",
    tutor: "Mr. Elvis Ejah Malle",
    price: "25,000 FCFA",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["SPSS", "STATA", "Excel", "Data Visualization", "Statistics"]
  },
  {
    id: 5,
    title: "Mobile App Development",
    description: "Cross-platform mobile app development",
    duration: "5 months",
    tutor: "Mr Nengang Noel",
    price: "50,000 FCFA",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["React Native", "Mongo DB", "Firebase", "API Integration", "App Store","Node.js","Express.js"]
  },

  {
    id: 6,
    title: "Computer Studies for Secretariat Duties",
    description: "Essential computer skills for administrative roles",
    duration: "3 months",
    tutor: "Mr. Elvis Ejah Malle",
    price: "30,000 FCFA",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Microsoft Office", "Typing Skills", "Data Entry", "Email Management", "Basic IT"],
    about: "This course caters to both beginners and advanced learners, aiming to bridge the gap in IT proficiency needed in today's office environments. It focuses on delivering concise computer training that spans from basic to advanced levels, ensuring participants are well-versed in critical tools and practices pertinent to modern secretariat duties and office administration.",
    learns: ["Trainees in this course will attain proficiency in the Microsoft Office Suite, encompassing Excel for data management and spreadsheet analysis, Word for crafting professional documents, Access for handling databases, PowerPoint for designing impactful presentations, and Publisher for creating polished publications and marketing materials. Additionally, the course emphasizes developing a professional typing speed, augmenting efficiency in data entry and document preparation. Students will also cultivate excellent IT skills broadly applicable in office settings, alongside learning specific secretariat duties and office administration techniques crucial for effective coordination and management in professional environments."],
    opportunities: ["Upon completing the Computer Studies for Secretariat Duties course, you unlock a spectrum of career opportunities. You become a prime candidate for administrative roles such as office administrator, secretary, clerk/cashier, or executive assistant, where your computer literacy and secretarial skills are invaluable. There's potential for your involvement in data management tasks leveraging your Excel and Access competencies. Your skill set also positions you to provide technical support in office environments. In Cameroon and beyond, such qualifications bolster your employability in businesses, institutions, companies, governmental offices, and NGOs craving adept computer users. Furthermore, armed with these skills, you have prospects for freelance work encompassing typing services, document preparation, and presentation design. This course serves as a roadmap for your career advancement, arming you with qualifications that can precipitate promotions or superior job prospects within administrative echelons."],

    
  },
  {
    id: 7,
    title: "Back-end Development",
    description: "Server-side programming and database management",
    duration: "3 months",
    tutor: "Mr Ngulefac Terence",
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
    tutor: "Docila Fien",
    price: "15,000 FCFA",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Wireframing", "Prototyping", "User Research", "Usability Testing", "Design Systems"]
  },
  {
    id: 9,
    title: "Basic Catography",
    description: "User interface and user experience design principles",
    duration: "3 months",
    tutor: "Ashanga Boris Ngwa",
    price: "25,000 FCFA",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Cartography and GIS", "Secretarial duties ", "Cartography and GIS"]
  },
{
  id: 9,
  title: "Topography and Remote Sensing",
  description: "Master the principles of land measurement, mapping, and satellite imagery analysis for environmental monitoring and spatial data management.",
  duration: "4 months",
  tutor: "Ashanga Boris Ngwa",
  price: "40,000 FCFA",
  level: "Intermediate",
  image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  // image: "https://images.unsplash.com/photo-1540959733332-0b10d1c24339?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  features: [
    "Land Surveying Techniques",
    "GPS Data Collection",
    "Satellite Imagery Analysis",
    "GIS Mapping",
    "Topographic Data Processing",
    "Remote Sensing Applications"
  ]
}

];

// export const tutors = [
//   {
//     id: 1,
//     name: "John Smith",
//     specialization: "Web Development",
//     experience: "8 years",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     bio: "Full-stack developer with extensive experience in modern web technologies."
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     specialization: "Digital Marketing",
//     experience: "6 years",
//     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     bio: "Digital marketing expert specializing in SEO and social media strategies."
//   },
//   {
//     id: 3,
//     name: "Mike Chen",
//     specialization: "Graphic Design",
//     experience: "7 years",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     bio: "Award-winning graphic designer with expertise in branding and UI/UX."
//   },
//   {
//     id: 4,
//     name: "Dr. Emily Brown",
//     specialization: "Data Science",
//     experience: "10 years",
//     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
//     bio: "PhD in Computer Science with focus on machine learning and data analytics."
//   }
// ];