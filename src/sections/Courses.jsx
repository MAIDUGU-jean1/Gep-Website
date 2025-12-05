import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../data/courses';
import { Clock, Users, BookOpen, Target, Briefcase, X } from 'lucide-react';
import './styles/Courses.css'


const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  // Define course categories and their mappings
  const courseCategories = {
    'All': ['Web Development', 'Digital Marketing', 'Graphic Design', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Tech': ['Web Development', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Design': ['Graphic Design'],
    'Business': ['Digital Marketing','Basic Catography'],
    'Development': ['Web Development', 'Mobile App Development']
  };

  const categories = ['All', 'Tech', 'Design', 'Business', 'Development'];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedCourse]);

  const parsePrice = (priceStr) => {
    if (!priceStr && priceStr !== 0) return 0;
    const digits = String(priceStr).replace(/[^\d]/g, '');
    const num = Number(digits);
    return Number.isNaN(num) ? 0 : num;
  };

  const formatPrice = (amount) => {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return amount.toLocaleString() + ' FCFA';
  };

  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(course => 
        courseCategories[activeCategory]?.includes(course.title)
      );

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setActiveTab('about');
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

  const getTabContent = (course, tab) => {
    const tabContent = {
      about: (
        <div>
          <p className="tab-content-text">
            {course.detailedDescription || course.description}
          </p>
          <div className="tab-about-details">
            <div className="tab-detail-item">
              <Clock size={18} />
              <span>{course.about}</span>
            </div>
          </div>
        </div>
      ),
      
      learn: (
        <div>
          <ul className="tab-list">
            {course.learns.map((learn, idx) => (
              <li key={idx} className="tab-list-item">
                {learn}
              </li>
            ))}
          </ul>
        </div>
      ),
      
      opportunities: (
        <div>
          <p className="tab-content-text">
            Upon completion of this course, you'll be prepared for:
          </p>
          <ul className="tab-list">
            {course.opportunities?.map((opportunity, idx) => (
              <li key={idx} className="tab-list-item">
                {opportunity}
              </li>
            )) || [
              "Industry-recognized certification",
              "Career advancement opportunities",
              "Real-world project portfolio",
              "Networking with professionals"
            ].map((opportunity, idx) => (
              <li key={idx} className="tab-list-item">
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
    <section id="courses" className="courses-section">
      <div className="courses-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="courses-header"
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
          className="category-filters"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
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
            className="no-courses-message"
          >
            <h3>
              No courses found in {activeCategory} category
            </h3>
            <p>
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
        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="course-card"
              whileHover={{ 
                y: -10,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
            >
              {/* Course Image */}
              <div className="course-image-container">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="course-image"
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="level-badge">
                  {course.level}
                </div>
                {/* discount removed */}
              </div>

              {/* Course Info */}
              <div className="course-info">
                <h3 className="course-title">
                  {course.title}
                </h3>
                
                <div className="course-description">
                  <p>
                    {course.description}
                  </p>
                </div>

                <div className="course-details">
                  <div className="course-detail-item">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="course-detail-item">
                    <Users size={16} />
                    <span>{course.tutor}</span>
                  </div>
                </div>

                <div className="key-skills">
                  <div className="key-skills-header">
                    <BookOpen size={16} />
                    <span>Key Skills:</span>
                  </div>
                  <div className="skills-tags">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <motion.span 
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="skill-tag"
                      >
                        {feature}
                      </motion.span>
                    ))}
                    {course.features.length > 3 && (
                      <span className="more-skills">+{course.features.length - 3} more</span>
                    )}
                  </div>

                {/* Price Section */}
                <div className="price-section">
                  {(() => {
                    const original = parsePrice(course.price);
                    const newPrice = original + 10000; // add 10k to original
                    return (
                      <div className="price-display">
                        <span className="price">
                          {formatPrice(newPrice)}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

                {/* Course Actions */}
                <div className="course-actions">
                  <motion.button
                    onClick={() => openCourseModal(course)}
                    className="course-details-button"
                    whileHover={{ 
                      background: 'var(--primary-color)',
                      color: 'white',
                      transform: 'translateY(-2px)'
                    }}
                  >
                    <BookOpen size={16} />
                    Course Details
                  </motion.button>
                  
                  <motion.a 
                    className="btn-primary enroll-button"
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

        {/* Course Details Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCourseModal}
                className="modal-backdrop"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="modal-content"
                >
                  <div className="modal-scrollable">
                    <div className="modal-header">
                      <button
                        onClick={closeCourseModal}
                        className="modal-close-button"
                        whileHover={{ 
                          background: 'var(--primary-color)',
                          borderColor: 'var(--primary-color)'
                        }}
                      >
                        <X size={20} color="var(--text-primary)" />
                      </button>
                      
                      <div className="modal-header-content">
                        <div className="modal-course-image">
                          <img 
                            src={selectedCourse.image} 
                            alt={selectedCourse.title}
                          />
                        </div>
                        
                        <div className="modal-header-info">
                          <h3 className="modal-course-title">
                            {selectedCourse.title}
                          </h3>
                          
                          <div className="modal-course-meta">
                            <div className="course-detail-item">
                              <Clock size={16} />
                              <span>{selectedCourse.duration}</span>
                            </div>
                            <div className="course-detail-item">
                              <Users size={16} />
                              <span>{selectedCourse.tutor}</span>
                            </div>
                            <div className="level-badge">
                              {selectedCourse.level}
                            </div>
                          </div>
                          
                          <p className="course-description">
                            {selectedCourse.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="modal-body">
                      <div className="modal-tabs">
                        {[
                          { key: 'about', label: 'About Course', icon: BookOpen },
                          { key: 'learn', label: 'What You\'ll Learn', icon: Target },
                          { key: 'opportunities', label: 'Opportunities', icon: Briefcase }
                        ].map((tab) => (
                          <motion.button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`modal-tab-button ${activeTab === tab.key ? 'active' : ''}`}
                            whileHover={{ 
                              backgroundColor: activeTab === tab.key 
                                ? 'var(--primary-color)'
                                : 'var(--hover-color)'
                            }}
                          >
                            <tab.icon size={16} />
                            {tab.label}
                          </motion.button>
                        ))}
                      </div>

                      <div className="tab-content">
                        {getTabContent(selectedCourse, activeTab)}
                      </div>

                      <div className="modal-features">
                        <h4 className="modal-features-title">
                          Course Features:
                        </h4>
                        <div className="modal-features-list">
                          {selectedCourse.features.map((feature, idx) => (
                            <motion.span 
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              className="modal-feature-tag"
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="modal-price-section">
                        <div className="modal-price-info">
                          {(() => {
                            const original = parsePrice(selectedCourse.price);
                            const newPrice = original + 10000;
                            return (
                              <span className="modal-price">{formatPrice(newPrice)}</span>
                            );
                          })()}
                        </div>
                        
                        <div className="modal-actions">
                          <motion.button
                            onClick={closeCourseModal}
                            className="modal-close-action"
                            whileHover={{ 
                              background: 'var(--hover-color)',
                              transform: 'translateY(-2px)'
                            }}
                          >
                            Close
                          </motion.button>
                          
                          <motion.a 
                            className="btn-primary modal-enroll-button"
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
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Show active category info */}
        {activeCategory !== 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="active-category-info"
          >
            <p>
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} in <strong>{activeCategory}</strong> category
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;