import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, BookOpen, Search, X, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { courses } from "../data/courses";
import "./styles/Courses.css";

const Courses = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* ------------------------------------------------ */
  /* CATEGORY CONFIGURATION */
  /* ------------------------------------------------ */

  const courseCategories = {
    All: [
      "Front-end Web Development",
      "Back-end Development",
      "Digital Marketing",
      "Graphic Design",
      "Data Science",
      "Mobile App Development",
      "Cybersecurity",
    ],
    Tech: [
      "Front-end Web Development",
      "Back-end Development",
      "Data Science",
      "Mobile App Development",
      "Cybersecurity",
    ],
    Design: ["Graphic Design"],
    Business: ["Digital Marketing", "Basic Cartography"],
    Development: [
      "Front-end Web Development",
      "Back-end Development",
      "Mobile App Development"
    ],
  };

  const categories = ["All", "Tech", "Design", "Business", "Development"];

  /* ------------------------------------------------ */
  /* HELPERS */
  /* ------------------------------------------------ */

  const parsePrice = (priceStr) => {
    if (!priceStr && priceStr !== 0) return 0;

    const digits = String(priceStr).replace(/[^\d]/g, "");
    const num = Number(digits);

    return Number.isNaN(num) ? 0 : num;
  };

  const formatPrice = (amount) => {
    if (typeof amount !== "number") amount = Number(amount) || 0;

    return amount.toLocaleString() + " FCFA";
  };

  /* ------------------------------------------------ */
  /* FILTER COURSES */
  /* ------------------------------------------------ */

  // Advanced search function that searches across multiple fields
  const searchCourses = (course, query) => {
    if (!query.trim()) return true;

    const searchTerm = query.toLowerCase().trim();

    // Search in various fields
    const searchableFields = [
      course.title,
      course.description,
      course.level,
      course.duration,
      course.tutor,
      course.price,
      ...(course.features || []),
      ...(course.about ? [course.about] : []),
    ];

    // Also search in normalized price (extract numbers)
    const priceMatch = course.price && course.price.toString().toLowerCase().includes(searchTerm);

    return (
      searchableFields.some(field =>
        field && field.toString().toLowerCase().includes(searchTerm)
      ) || priceMatch
    );
  };

  const filteredCourses = useMemo(() => {
    let result = courses;

    // First filter by category
    if (activeCategory !== "All") {
      result = result.filter((course) =>
        courseCategories[activeCategory]?.includes(course.title)
      );
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      result = result.filter(course => searchCourses(course, searchQuery));
    }

    return result;
  }, [activeCategory, searchQuery]);

  /* ------------------------------------------------ */
  /* COMPONENT UI */
  /* ------------------------------------------------ */

  return (
    <section id="courses" className="courses-section">
      <div className="courses-container">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="courses-header"
        >
          <h2 className="section-title">Our Courses</h2>

          <p className="section-subtitle">
            Choose from our wide range of professional courses designed to
            equip you with in-demand skills for today's job market.
          </p>
        </motion.div>

        {/* CATEGORY FILTER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="category-filters"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`category-button ${activeCategory === category ? "active" : ""
                }`}
            >
              {category}{" "}
              {category !== "All" &&
                `(${courseCategories[category]?.length || 0})`}
            </motion.button>
          ))}
        </motion.div>

        {/* MODERN SEARCH BAR */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="search-container"
        >
          <div className="search-wrapper">
            <div className="search-icon-wrapper">
              <Search className="search-icon" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search courses by title, price, category, description, tutor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>
            <div className="search-glow"></div>
          </div>

          {/* Search suggestions / active filters display */}
          <AnimatePresence>
            {(searchQuery || activeCategory !== "All") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="search-filters-display"
              >
                {activeCategory !== "All" && (
                  <span className="active-filter-chip">
                    <span>Category: {activeCategory}</span>
                    <X
                      size={14}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveCategory("All")}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="active-filter-chip search-filter">
                    <Sparkles size={14} />
                    <span>Searching: "{searchQuery}"</span>
                    <X
                      size={14}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSearchQuery("")}
                    />
                  </span>
                )}
                <span className="results-count">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* COURSES GRID */}

        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="no-courses-message"
          >
            <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            {(searchQuery || activeCategory !== "All") && (
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="category-button active"
                style={{ marginTop: '1rem' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear all filters
              </motion.button>
            )}
          </motion.div>
        ) : (
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
                  borderColor: "var(--primary-color)",
                }}
              >

                {/* IMAGE */}

                <div className="course-image-container">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                  />

                  <div className="level-badge">{course.level}</div>

                  <div className="discount-badge">
                    <span className="discount-text">30% OFF</span>
                    <small className="discount-subtext">Limited</small>
                  </div>
                </div>

                {/* INFO */}

                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>

                  <p className="course-description">{course.description}</p>

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

                  {/* PRICE */}

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

                  {/* ACTIONS */}

                  <div className="course-actions">
                    <motion.button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="course-details-button"
                    >
                      <BookOpen size={16} />
                      Course Details
                    </motion.button>

                    <motion.a
                      className="btn-primary enroll-button"
                      href="/enroll"
                    >
                      Enroll Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;