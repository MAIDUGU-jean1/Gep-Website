import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, BookOpen, Mail } from 'lucide-react';
import Jean from '../assets/Images/jean.jpeg';
import Fien from '../assets/Images/fien.jpeg';
import Elvis from '../assets/Images/elvis.jpeg';
import Noel from '../assets/Images/Noel.jpeg';
import { image } from 'framer-motion/client';
import Terence from '../../src/assets/Images/Terence.jpeg';
import Geo from '../../src/assets/Images/geo.jpeg';

import { useNavigate } from 'react-router-dom'; // Add this import

// Dedicated tutors data array
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
    email: "ej.bnes@gmail.com"
  },

  {
    id: 6,
    name: "Mr Ngulefac Terence",
    specialization: "Web Development & Full-Stack",
    experience: "6 years",
    image: Terence,
    bio: "Full-stack developer skilled in React, Node.js, and Laravel. Passionate about building innovative web solutions and sharing knowledge with others.",
    rating: 4.9,
    courses: ["Web Development", "React Masterclass", "LaravelBackend", "Express", "Node.js"],
    students: 2500,
    email: "terencen143@icloud.com"
  },

  {
    id: 3,
    name: "Mrs. Docila Fien",
    specialization: "UI/UX",
    experience: "3 years",
    image: Fien,
    bio: "Award-winning designer with expertise in Adobe Creative Suite, branding, and user experience design. Worked with Fortune 500 companies.",
    rating: 4.9,
    courses: ["Graphic Design", "UI/UX Design", "Brand Identity"],
    students: 2200,
    email: "fiendocile@gmail.com"
  },
  {
    id: 4,
    name: "Mr. Ashanga Boris Ngwa	",
    specialization: "Basic Catography",
    experience: "4 years",
    image: Geo,
    bio: "These courses cover basic principles of map analysis, interpretation and design which links to mapping and projections in the contemporary world",
    rating: 4.7,
    courses: ["Cartography and GIS","Topography and Remote sensing", "Secretarial duties "],
    students: 100,
    email: "ashangaboris@gmail.com"
  },

  {
    id: 6,
    name: "Mr. Jean De Dieu Maidugu",
    specialization: "Web Development & Full-Stack",
    experience: "4 years",
    image: Jean,
    // image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "enginee with language like React, Node.js, Laravel, and more. Passionate about teaching modern web development.",
    rating: 4.9,
    courses: ["Web Development", "React Masterclass", "LaravelBackend"],
    students: 2500,
    email: "maidugujeandedieu600@gmail.com"
  },


  {
    id: 7,
    name: "Mr Nengang Noel",
    specialization: "Mobile App Development",
    experience: "4 years",
    image: Noel,
    bio: "Cross Platform Mobile App Developer skilled in React Native. Developed apps for startups and enterprises. Skilled in TypeScript, Basic UI Design, Node js and many more",
    rating: 4.7,
    courses: ["Web Development", "React Masterclass", "LaravelBackend"],
    students: 2500,
    email: ""
  },


];

const Tutors = () => {

  const navigate = useNavigate(); // Add this hook
  
  return (
    <section id="tutors" style={{
      padding: 'clamp(4rem, 8vw, 8rem) 0',
      background: 'var(--bg-primary)'
    }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title">Meet Our Expert Tutors</h2>
          <p className="section-subtitle">
            Learn from industry professionals with years of experience and passion for teaching.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '15px',
                overflow: 'hidden',
                border: '2px solid var(--border-color)',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              {/* Tutor Image */}
              <div style={{
                height: '250px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={tutor.image} 
                  alt={tutor.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {tutor.specialization}
                </div>
              </div>

              {/* Tutor Info */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  {tutor.name}
                </h3>
                <p style={{ 
                  marginBottom: '1rem', 
                  opacity: 0.8,
                  fontSize: '0.9rem'
                }}>
                  {tutor.specialization} • {tutor.experience} experience
                </p>
                <p style={{ 
                  marginBottom: '1.5rem', 
                  opacity: 0.8,
                  lineHeight: '1.6',
                  fontSize: '0.9rem'
                }}>
                  {tutor.bio}
                </p>
                
                {/* Tutor Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.8rem'
                }}>
                  <div style={{
                    background: 'var(--bg-primary)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                      {tutor.students.toLocaleString()}
                    </div>
                    <div style={{ opacity: 0.7 }}>Students</div>
                  </div>
                  <div style={{
                    background: 'var(--bg-primary)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                      {tutor.courses.length}
                    </div>
                    <div style={{ opacity: 0.7 }}>Courses</div>
                  </div>
                </div>

                {/* Ratings */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      color="var(--primary-color)" 
                      fill={star <= Math.floor(tutor.rating) ? "var(--primary-color)" : "none"} 
                    />
                  ))}
                  <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    ({tutor.rating}/5)
                  </span>
                </div>

                {/* Courses Taught */}
                <div style={{
                  marginBottom: '1.5rem',
                  textAlign: 'left'
                }}>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Courses:
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.3rem'
                  }}>
                    {tutor.courses.map((course, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'var(--primary-color)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '500'
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <motion.button 
                    className="btn-primary" 
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '0.8rem',
                      flex: 1
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={() => navigate(`/tutor/${tutor.id}`)} // Add this onClick
                  >
                    View Profile
                  </motion.button>
                  <motion.button 
                    className="btn-secondary" 
                    style={{ 
                      padding: '8px', 
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            padding: '3rem',
            borderRadius: '20px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h3 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem', 
            fontWeight: '600' 
          }}>
            Why Learn With Our Experts?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { 
                icon: Users, 
                number: tutors.length + '+', 
                label: 'Expert Tutors',
                description: 'Industry professionals with real-world experience'
              },
              { 
                icon: Award, 
                number: tutors.reduce((acc, tutor) => acc + tutor.students, 0).toLocaleString() + '+', 
                label: 'Students Trained',
                description: 'Successful graduates worldwide'
              },
              { 
                icon: Star, 
                number: '4.8', 
                label: 'Average Rating',
                description: 'Based on student feedback and reviews'
              },
              { 
                icon: BookOpen, 
                number: tutors.reduce((acc, tutor) => acc + tutor.courses.length, 0) + '+', 
                label: 'Courses Available',
                description: 'Comprehensive learning programs'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon size={40} color="white" style={{ marginBottom: '1rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {item.number}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {item.label}
                </div>
                <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tutors;