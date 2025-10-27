import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Award, 
  Users, 
  BookOpen, 
  Mail, 
  Clock, 
  Calendar,
  ArrowLeft,
  Play,
  CheckCircle,
  Bookmark,
  Share2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Jean from '../assets/Images/jean.jpeg';
import Fien from '../assets/Images/fien.jpeg';
import Elvis from '../assets/Images/elvis.jpeg';
import Noel from '../assets/Images/Noel.jpeg';
import Terence from '../../src/assets/Images/Terence.jpeg';
import Geo from '../../src/assets/Images/geo.jpeg';

// Your tutors data (same as in Tutors component)
const tutors = [
  {
    id: 1,
    name: "Mr. Elvis Ejah Malle",
    specialization: "Data Science & Business Analytics",
    experience: "6 years",
    image: Elvis,
    bio: "Computer Science with focus on AI and machine learning. Published researcher and industry consultant.",
    rating: 4.8,
    courses: ["Data Science", "Machine Learning", "Python Programming"],
    students: 1800,
    email: "ej.bnes@gmail.com",
    detailedBio: "Elvis is a seasoned data scientist with over 6 years of experience in AI and machine learning. He has published numerous research papers and worked as a consultant for various tech companies. His teaching methodology focuses on practical, real-world applications.",
    achievements: [
      "Published 10+ research papers",
      "AI Consultant for Fortune 500 companies",
      "Microsoft Certified Data Scientist"
    ],
    teachingStyle: "Hands-on, project-based learning with real-world datasets",
    courseDetails: [
      {
        name: "Data Science Fundamentals",
        duration: "8 weeks",
        level: "Beginner",
        students: 800,
        rating: 4.8,
        description: "Learn the basics of data analysis and visualization"
      },
      {
        name: "Machine Learning Mastery",
        duration: "12 weeks",
        level: "Intermediate",
        students: 600,
        rating: 4.9,
        description: "Deep dive into ML algorithms and implementations"
      },
      {
        name: "Python for Data Science",
        duration: "6 weeks",
        level: "Beginner",
        students: 400,
        rating: 4.7,
        description: "Master Python programming for data analysis"
      }
    ]
  },
    {
    id: 4,
    name: 'Mr Jean De Dieu Maidugu',
    specialization: "Web Development & Full-Stack",
    experience: "4 years",
    image: {Jean},
    bio: "Full-stack developer skilled in React, Node.js, and Laravel. Passionate about building innovative web solutions and sharing knowledge with others.",
    rating: 4.9,
    courses: ["Web Development", "React Masterclass", "Laravel Backend", "Express", "Node.js"],
    students: 1500,
    email: "maidugujeandedieu600@gmail.com",
    detailedBio: "Terence is a passionate full-stack developer with extensive experience in modern web technologies. He has built numerous web applications and enjoys mentoring aspiring developers.",
    achievements: [
      "Built 50+ web applications",
      "React Certified Developer",
      "Mentored 1000+ students"
    ],
    teachingStyle: "Code-along sessions with real project development",
    courseDetails: [
      {
        name: "React Masterclass",
        duration: "10 weeks",
        level: "Intermediate",
        students: 1200,
        rating: 4.9,
        description: "Complete React development from basics to advanced"
      },
      {
        name: "Full-Stack Development",
        duration: "14 weeks",
        level: "Advanced",
        students: 800,
        rating: 4.8,
        description: "End-to-end web application development"
      }
    ]
  },
  {
    id: 6,
    name: "Mr Ngulefac Terence",
    specialization: "Web Development & Full-Stack",
    experience: "6 years",
    image: "path/to/terence.jpg",
    bio: "Full-stack developer skilled in React, Node.js, and Laravel. Passionate about building innovative web solutions and sharing knowledge with others.",
    rating: 4.9,
    courses: ["Web Development", "React Masterclass", "Laravel Backend", "Express", "Node.js"],
    students: 2500,
    email: "ngulefacterence@gmail.com",
    detailedBio: "Terence is a passionate full-stack developer with extensive experience in modern web technologies. He has built numerous web applications and enjoys mentoring aspiring developers.",
    achievements: [
      "Built 50+ web applications",
      "React Certified Developer",
      "Mentored 1000+ students"
    ],
    teachingStyle: "Code-along sessions with real project development",
    courseDetails: [
      {
        name: "React Masterclass",
        duration: "10 weeks",
        level: "Intermediate",
        students: 1200,
        rating: 4.9,
        description: "Complete React development from basics to advanced"
      },
      {
        name: "Full-Stack Development",
        duration: "14 weeks",
        level: "Advanced",
        students: 800,
        rating: 4.8,
        description: "End-to-end web application development"
      }
    ]
  },
  // Add similar detailed data for other tutors...
];

const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tutor = tutors.find(t => t.id === parseInt(id));

  if (!tutor) {
    return (
      <div style={{ 
        padding: '4rem 0', 
        textAlign: 'center',
        background: 'var(--bg-primary)',
        minHeight: '100vh'
      }}>
        <h2>Tutor not found</h2>
        <button 
          onClick={() => navigate('/tutors')}
          className="btn-primary"
        >
          Back to Tutors
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'var(--bg-primary)',
      minHeight: '100vh',
      paddingTop: '2rem'
    }}>
      <div className="container">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/tutors')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            marginBottom: '2rem',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}
          whileHover={{ 
            backgroundColor: 'var(--bg-secondary)',
            scale: 1.02
          }}
        >
          <ArrowLeft size={20} />
          Back to Tutors
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start'
          }}
        >
          {/* Tutor Image */}
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid var(--primary-color)',
            flexShrink: 0
          }}>
            <img 
              src={tutor.image} 
              alt={tutor.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Tutor Info */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '700'
                }}>
                  {tutor.name}
                </h1>
                <p style={{
                  fontSize: '1.2rem',
                  color: 'var(--primary-color)',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {tutor.specialization}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Bookmark size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>

            {/* Ratings and Stats */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={20} 
                    color="var(--primary-color)" 
                    fill={star <= Math.floor(tutor.rating) ? "var(--primary-color)" : "none"} 
                  />
                ))}
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                  {tutor.rating}/5
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                <span>{tutor.students.toLocaleString()}+ students</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} />
                <span>{tutor.courses.length} courses</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} />
                <span>{tutor.experience} experience</span>
              </div>
            </div>

            {/* Bio */}
            <p style={{
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontSize: '1.1rem',
              opacity: 0.9
            }}>
              {tutor.detailedBio || tutor.bio}
            </p>

            {/* Contact Button */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Mail size={20} />
                Contact Tutor
              </motion.button>
              
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  fontSize: '1rem'
                }}
              >
                View All Courses
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {['overview', 'courses', 'achievements', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-primary)',
                fontWeight: activeTab === tab ? '600' : '400',
                borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontSize: '1rem'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: '2fr 1fr'
            }}>
              {/* Left Column */}
              <div>
                <div style={{
                  background: 'var(--card-bg)',
                  padding: '2rem',
                  borderRadius: '15px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
                    Teaching Style
                  </h3>
                  <p style={{ lineHeight: '1.8', opacity: 0.9 }}>
                    {tutor.teachingStyle}
                  </p>
                </div>

                <div style={{
                  background: 'var(--card-bg)',
                  padding: '2rem',
                  borderRadius: '15px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
                    Expertise Areas
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {tutor.courses.map((course, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'var(--primary-color)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Achievements */}
              <div>
                <div style={{
                  background: 'var(--card-bg)',
                  padding: '2rem',
                  borderRadius: '15px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h3 style={{ 
                    marginBottom: '1.5rem', 
                    fontSize: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Award size={24} />
                    Achievements
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {tutor.achievements.map((achievement, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                      }}>
                        <CheckCircle size={20} color="var(--primary-color)" />
                        <span style={{ lineHeight: '1.5' }}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {tutor.courseDetails.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '15px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'flex-start'
                  }}
                  whileHover={{ 
                    borderColor: 'var(--primary-color)',
                    transform: 'translateY(-5px)'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Play size={30} color="white" />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      fontSize: '1.3rem', 
                      marginBottom: '0.5rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {course.name}
                    </h4>
                    <p style={{ 
                      marginBottom: '1rem',
                      opacity: 0.8
                    }}>
                      {course.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '2rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}>
                        {course.level}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} />
                        <span>{course.students} students</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={16} color="var(--primary-color)" fill="var(--primary-color)" />
                        <span>{course.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.9rem'
                    }}
                  >
                    Enroll Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>
                Professional Achievements
              </h3>
              {/* Add detailed achievements content here */}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>
                Student Reviews
              </h3>
              {/* Add reviews content here */}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TutorProfile;