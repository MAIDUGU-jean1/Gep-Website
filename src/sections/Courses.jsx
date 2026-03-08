import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, BookOpen, Target, Briefcase, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { courses } from "../data/courses";
import "./styles/Courses.css";

const Courses = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  /* ------------------------------------------------ */
  /* CATEGORY CONFIGURATION */
  /* ------------------------------------------------ */

  const courseCategories = {
    All: [
      "Web Development",
      "Digital Marketing",
      "Graphic Design",
      "Data Science",
      "Mobile App Development",
      "Cybersecurity",
    ],
    Tech: [
      "Web Development",
      "Data Science",
      "Mobile App Development",
      "Cybersecurity",
    ],
    Design: ["Graphic Design"],
    Business: ["Digital Marketing", "Basic Cartography"],
    Development: ["Web Development", "Mobile App Development"],
  };

  const categories = ["All", "Tech", "Design", "Business", "Development"];

  /* ------------------------------------------------ */
  /* EFFECTS */
  /* ------------------------------------------------ */

  useEffect(() => {
    console.log(
      "Modal state:",
      selectedCourse ? "OPEN" : "CLOSED",
      selectedCourse
    );
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedCourse]);

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

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) =>
          courseCategories[activeCategory]?.includes(course.title)
        );

  /* ------------------------------------------------ */
  /* MODAL HANDLERS */
  /* ------------------------------------------------ */

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setActiveTab("about");
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

  /* ------------------------------------------------ */
  /* TAB CONTENT */
  /* ------------------------------------------------ */

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
        <ul className="tab-list">
          {course.learns.map((learn, idx) => (
            <li key={idx} className="tab-list-item">
              {learn}
            </li>
          ))}
        </ul>
      ),

      opportunities: (
        <div>
          <p className="tab-content-text">
            Upon completion of this course, you'll be prepared for:
          </p>

          <ul className="tab-list">
            {(course.opportunities || [
              "Industry-recognized certification",
              "Career advancement opportunities",
              "Real-world project portfolio",
              "Networking with professionals",
            ]).map((opportunity, idx) => (
              <li key={idx} className="tab-list-item">
                {opportunity}
              </li>
            ))}
          </ul>
        </div>
      ),
    };

    return tabContent[tab] || tabContent.about;
  };

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
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
            >
              {category}{" "}
              {category !== "All" &&
                `(${courseCategories[category]?.length || 0})`}
            </motion.button>
          ))}
        </motion.div>

        {/* COURSES GRID */}

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
                    onClick={() => openCourseModal(course)}
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

        {/* MODAL */}

        <AnimatePresence>
          {selectedCourse && (
            <>
              <motion.div
                className="modal-backdrop"
                onClick={closeCourseModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="modal-header">
                  <button
                    onClick={closeCourseModal}
                    className="modal-close-button"
                  >
                    <X size={20} />
                  </button>

                  <h3>{selectedCourse.title}</h3>
                </div>

                <div className="modal-body">
                  <div className="modal-tabs">
                    {[
                      { key: "about", label: "About", icon: BookOpen },
                      { key: "learn", label: "What You'll Learn", icon: Target },
                      {
                        key: "opportunities",
                        label: "Opportunities",
                        icon: Briefcase,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`modal-tab-button ${
                          activeTab === tab.key ? "active" : ""
                        }`}
                      >
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="tab-content">
                    {getTabContent(selectedCourse, activeTab)}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Courses;