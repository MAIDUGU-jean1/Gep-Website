import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { courses } from '../data/courses';
import { Clock, Users, Star, BookOpen } from 'lucide-react';

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Define course categories and their mappings
  const courseCategories = {
    'All': ['Web Development', 'Digital Marketing', 'Graphic Design', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Tech': ['Web Development', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Design': ['Graphic Design'],
    'Business': ['Digital Marketing'],
    'Development': ['Web Development', 'Mobile App Development']
  };

  const categories = ['All', 'Tech', 'Design', 'Business', 'Development'];

  // Filter courses based on active category
  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(course => 
        courseCategories[activeCategory]?.includes(course.title)
      );

  return (
    <section id="courses" style={{
      padding: 'clamp(4rem, 8vw, 8rem) 0',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 20%, var(--bg-primary) 100%)'
    }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title">Our Courses</h2>
          <p className="section-subtitle">
            Choose from our wide range of professional courses designed to equip you with 
            in-demand skills for today's job market.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '0.8rem 1.5rem',
                border: `2px solid ${activeCategory === category ? 'var(--primary-color)' : 'var(--border-color)'}`,
                background: activeCategory === category ? 'var(--primary-color)' : 'transparent',
                color: activeCategory === category ? 'white' : 'var(--text-primary)',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              {category} {category !== 'All' && `(${courseCategories[category]?.length || 0})`}
            </motion.button>
          ))}
        </motion.div>

        {/* Show message when no courses found */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '3rem',
              background: 'var(--card-bg)',
              borderRadius: '15px',
              border: '2px solid var(--border-color)'
            }}
          >
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              No courses found in {activeCategory} category
            </h3>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
              We're constantly adding new courses. Please check back later or browse other categories.
            </p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="btn-primary"
            >
              View All Courses
            </button>
          </motion.div>
        )}

        {/* Courses Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
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
                position: 'relative'
              }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
            >
              {/* Course Image */}
              <div style={{
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={course.image} 
                  alt={course.title}
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
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {course.level}
                </div>
              </div>

              {/* Course Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  {course.title}
                </h3>
                <p style={{ 
                  marginBottom: '1rem', 
                  opacity: 0.8,
                  lineHeight: '1.5'
                }}>
                  {course.description}
                </p>

                {/* Course Details */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  opacity: 0.7
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Users size={16} />
                    <span>{course.tutor}</span>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <BookOpen size={16} />
                    <span>What you'll learn:</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <motion.span 
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          background: 'var(--primary-color)',
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: '500'
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                    {course.features.length > 3 && (
                      <span style={{
                        background: 'var(--border-color)',
                        color: 'var(--text-primary)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '500'
                      }}>
                        +{course.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Enroll */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                  }}>
                    {course.price}
                  </div>
                  <motion.button 
                    className="btn-primary" 
                    style={{ padding: '8px 20px', fontSize: '0.9rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show active category info */}
        {activeCategory !== 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              padding: '1.5rem',
              background: 'var(--card-bg)',
              borderRadius: '10px',
              border: '2px solid var(--primary-color)'
            }}
          >
            <p style={{ opacity: 0.8 }}>
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} in <strong>{activeCategory}</strong> category
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;