import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { courses } from "../data/courses";
import "./styles/Courses.css";

const Courses = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");

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
      </div>
    </section>
  );
};

export default Courses;