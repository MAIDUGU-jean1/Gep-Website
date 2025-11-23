import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../data/courses';
import { Clock, Users, Star, BookOpen, ChevronDown, ChevronUp, Target, Award, Briefcase } from 'lucide-react';

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCourses, setExpandedCourses] = useState({});
  const [activeTabs, setActiveTabs] = useState({});

  // Define course categories and their mappings
  const courseCategories = {
    'All': ['Web Development', 'Digital Marketing', 'Graphic Design', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Tech': ['Web Development', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Design': ['Graphic Design'],
    'Business': ['Digital Marketing','Basic Catography'],
    'Development': ['Web Development', 'Mobile App Development']
  };

  const categories = ['All', 'Tech', 'Design', 'Business', 'Development'];

  // Helper to parse price strings like "25,000 FCFA" -> 25000
  const parsePrice = (priceStr) => {
    if (!priceStr && priceStr !== 0) return 0;
    const digits = String(priceStr).replace(/[^\d]/g, '');
    const num = Number(digits);
    return Number.isNaN(num) ? 0 : num;
  };

  // Format number to localized string with currency suffix
  const formatPrice = (amount) => {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return amount.toLocaleString() + ' FCFA';
  };

  // Filter courses based on active category
  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(course => 
        courseCategories[activeCategory]?.includes(course.title)
      );

  // Toggle expanded state for individual courses
  const toggleCourseExpansion = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
    
    // Set default tab to 'about' when expanding
    if (!expandedCourses[courseId]) {
      setActiveTabs(prev => ({
        ...prev,
        [courseId]: 'about'
      }));
    }
  };

  // Set active tab for a course
  const setActiveTab = (courseId, tab) => {
    setActiveTabs(prev => ({
      ...prev,
      [courseId]: tab
    }));
  };

  // Tab content configuration
  const getTabContent = (course, tab) => {
    const tabContent = {
      about: (
        <div>
          <p style={{ fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>
            {course.detailedDescription || course.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={14} />
              <span style={{ fontSize: '0.8rem' }}>{course.about}</span>
            </div>
            
          </div>
        </div>
      ),
      
      learn: (
        <div>
          <ul style={{
            paddingLeft: '1rem',
            margin: 0,
            fontSize: '0.8rem',
            lineHeight: '1.6'
          }}>
            {course.learns.map((learn, idx) => (
              <li key={idx} style={{ marginBottom: '0.3rem' }}>
                {learn}
              </li>
            ))}
          </ul>
        </div>
      ),
      
      opportunities: (
        <div>
          <p style={{ fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>
            {/* Upon completion of this course, you'll be prepared for: */}
          </p>
          <ul style={{
            paddingLeft: '1rem',
            margin: 0,
            fontSize: '0.8rem',
            lineHeight: '1.6',
            // listStyle: 'none'
          }}>
            {course.opportunities?.map((opportunity, idx) => (
              <li key={idx} style={{ marginBottom: '0.3rem' }}>
                {opportunity}
              </li>
            )) || [
              "Industry-recognized certification",
              "Career advancement opportunities",
              "Real-world project portfolio",
              "Networking with professionals"
            ].map((opportunity, idx) => (
              <li key={idx} style={{ marginBottom: '0.3rem' }}>
                {opportunity}
              </li>
            ))}
          </ul>
        </div>
      )
    };

    return tabContent[tab] || tabContent.about;
  };

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
                {/* Level Badge (top-right) */}
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

                {/* Discount Badge (top-left) */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.95) 100%)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.06)'
                }}>
                  <span style={{ color: 'var(--secondary-color)', marginRight: '6px' }}>30% OFF</span>
                  <small style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Limited</small>
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
                
                {/* Course Description with Read More */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ 
                    opacity: 0.8,
                    lineHeight: '1.5',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {course.description}
                  </p>
                  
                  {/* Expanded Course Details with Tabs */}
                  <AnimatePresence>
                    {expandedCourses[course.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '1rem',
                          background: 'var(--bg-primary)',
                          borderRadius: '8px',
                          marginTop: '0.5rem',
                          border: '1px solid var(--border-color)'
                        }}>
                          {/* Tab Navigation */}
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            borderBottom: '1px solid var(--border-color)',
                            paddingBottom: '0.5rem'
                          }}>
                            {[
                              { key: 'about', label: 'About', icon: BookOpen },
                              { key: 'learn', label: 'What You\'ll Learn', icon: Target },
                              { key: 'opportunities', label: 'Opportunities', icon: Briefcase }
                            ].map((tab) => (
                              <motion.button
                                key={tab.key}
                                onClick={() => setActiveTab(course.id, tab.key)}
                                style={{
                                  backgroundColor: activeTabs[course.id] === tab.key 
                                    ? 'var(--primary-color)' 
                                    : 'var(--bg-secondary)',
                                  color: activeTabs[course.id] === tab.key 
                                    ? 'var(--primary)' 
                                    : 'var(--text-primary)',
                                  border: `1px solid ${
                                    activeTabs[course.id] === tab.key 
                                      ? 'var(--primary-color)' 
                                      : 'var(--border-color)'
                                  }`,
                                  padding: '0.5rem 0.8rem',
                                  borderRadius: '8px',
                                  fontSize: '0.7rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  transition: 'all 0.3s ease',
                                  flex: 1,
                                  justifyContent: 'center',
                                  boxShadow: activeTabs[course.id] === tab.key 
                                    ? '0 2px 8px rgba(var(--primary-color-rgb), 0.3)'
                                    : 'none'
                                }}
                                whileHover={{ 
                                  backgroundColor: activeTabs[course.id] === tab.key 
                                    ? 'var(--primary-color)'
                                    : 'var(--hover-color)',
                                  borderColor: 'var(--primary-color)',
                                  transform: 'translateY(-1px)',
                                  boxShadow: '0 4px 12px rgba(var(--primary-color-rgb), 0.2)'
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <tab.icon 
                                  size={12} 
                                  color={activeTabs[course.id] === tab.key ? 'white' : 'var(--primary-color)'} 
                                />
                                {tab.label}
                              </motion.button>
                            ))}
                          </div>

                          {/* Tab Content */}
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeTabs[course.id]}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                minHeight: '120px',
                                padding: '0.5rem 0'
                              }}
                            >
                              {getTabContent(course, activeTabs[course.id])}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Read More Button */}
                  <motion.button
                    onClick={() => toggleCourseExpansion(course.id)}
                    style={{
                      background: 'transparent',
                      color: 'var(--primary-color)',
                      border: 'none',
                      padding: '0.5rem 0',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ 
                      color: 'var(--secondary-color)',
                      transform: 'translateX(4px)'
                    }}
                  >
                    {expandedCourses[course.id] ? 'Show Less' : 'Course Details'}
                    {expandedCourses[course.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </motion.button>
                </div>

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

                {/* Quick Features Preview */}
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
                    <span>Key Skills:</span>
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
                  {/* Compute and display original (struck-through) + discounted price */}
                  {(() => {
                    const original = parsePrice(course.price);
                    const discounted = Math.round(original * 0.7); // 30% off => pay 70%
                    return (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{
                          textDecoration: 'line-through',
                          color: 'red',
                          fontSize: '0.95rem',
                          fontWeight: '700'
                        }}>{formatPrice(original)}</span>
                        <span style={{
                          fontSize: '1.35rem',
                          fontWeight: '800',
                          color: 'var(--primary-color)'
                        }}>{formatPrice(discounted)}</span>
                      </div>
                    );
                  })()}
                  <motion.a 
                    className="btn-primary" 
                    style={{ 
                      padding: '8px 20px', 
                      fontSize: '0.9rem',
                      background: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      background: 'var(--secondary-color)',
                      boxShadow: '0 4px 12px rgba(var(--primary-color-rgb), 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    href='/#contact'
                  >
                    Enroll Now
                  </motion.a>
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