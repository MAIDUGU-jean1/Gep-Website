import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen } from 'lucide-react';
import { courses } from '../data/courses';
import './styles/Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  // Define course categories and their mappings
  const courseCategories = {
    'All': ['Web Development', 'Digital Marketing', 'Graphic Design', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Tech': ['Web Development', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
    'Design': ['Graphic Design'],
    'Business': ['Digital Marketing', 'Basic Catography'],
    'Development': ['Web Development', 'Mobile App Development']
  };

  const categories = ['All', 'Tech', 'Design', 'Business', 'Development'];

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

  const openCourseDetails = (course) => {
    navigate(`/course/${course.id}`);
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

                <div className="discount-badge">
                  <span className="discount-text">30% OFF</span>
                  <small className="discount-subtext">Limited</small>
                </div>
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
                      <span className="more-skills">
                        +{course.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                <div className="price-section">
                  {(() => {
                    const original = parsePrice(course.price);
                    const discounted = Math.round((original + 10000) * 0.7);
                    return (
                      <div className="price-display">
                        <span className="original-price">
                          {formatPrice(original + 10000)}
                        </span>
                        <span className="discounted-price">
                          {formatPrice(discounted)}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                {/* Course Actions */}
                <div className="course-actions">
                  <motion.button
                    onClick={() => openCourseDetails(course)}
                    className="course-details-button"
                    whileHover={{
                      background: 'var(--primary-color)',
                      color: 'white',
                      transform: 'translateY(-2px)'
                    }}
                  >
                    <BookOpen size={16} />
                    View Course Details
                  </motion.button>

                  <motion.a
                    className="btn-primary enroll-button"
                    whileHover={{
                      scale: 1.05,
                      background: 'var(--secondary-color)',
                      boxShadow: '0 4px 12px rgba(var(--primary-color-rgb), 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    href='/enroll'
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
