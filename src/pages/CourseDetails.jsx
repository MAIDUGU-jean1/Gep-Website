import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    Users,
    BookOpen,
    Target,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    CheckCircle,
    Award
} from 'lucide-react';
import { courses } from '../data/courses';
import './css/CourseDetails.css';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const courseId = parseInt(id);

    // Find the main course
    const mainCourse = courses.find(c => c.id === courseId);

    // Get other courses (excluding the main one)
    const otherCourses = courses.filter(c => c.id !== courseId);

    const [activeTab, setActiveTab] = useState('about');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    // Calculate number of slides
    const totalSlides = Math.ceil(otherCourses.length / itemsPerSlide);

    // Handle responsive items per slide
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerSlide(1);
            } else {
                setItemsPerSlide(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        let interval;
        if (isAutoPlaying && otherCourses.length > 0) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 4000); // 4 seconds timeout
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides, otherCourses.length]);

    // Handle tab click - accordion style (only one open at a time)
    const handleTabClick = (tabKey) => {
        setActiveTab(activeTab === tabKey ? null : tabKey);
    };

    // Get first 4 courses for static display and remaining for slider
    const sliderCourses = otherCourses.slice(4);

    const goToSlide = useCallback((index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    }, [totalSlides]);

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

    const getTabContent = (course, tab) => {
        const tabContent = {
            about: (
                <div className="tab-content-inner">
                    <p className="tab-description">
                        {course.detailedDescription || course.description}
                    </p>
                    <div className="tab-about-details">
                        <div className="tab-detail-item">
                            <Clock size={20} />
                            <span>Duration: {course.duration}</span>
                        </div>
                        <div className="tab-detail-item">
                            <Users size={20} />
                            <span>Instructor: {course.tutor}</span>
                        </div>
                        <div className="tab-detail-item">
                            <Award size={20} />
                            <span>Level: {course.level}</span>
                        </div>
                    </div>
                </div>
            ),

            learn: (
                <div className="tab-content-inner">
                    <ul className="learn-list">
                        {course.learns.map((learn, idx) => (
                            <motion.li
                                key={idx}
                                className="learn-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <CheckCircle size={20} className="learn-icon" />
                                <span>{learn}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            ),

            opportunities: (
                <div className="tab-content-inner">
                    <p className="tab-opportunities-intro">
                        Upon completion of this course, you'll be prepared for:
                    </p>
                    <ul className="opportunities-list">
                        {course.opportunities?.map((opportunity, idx) => (
                            <motion.li
                                key={idx}
                                className="opportunity-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Briefcase size={18} className="opportunity-icon" />
                                <span>{opportunity}</span>
                            </motion.li>
                        )) || [
                            "Industry-recognized certification",
                            "Career advancement opportunities",
                            "Real-world project portfolio",
                            "Networking with professionals"
                        ].map((opportunity, idx) => (
                            <motion.li
                                key={idx}
                                className="opportunity-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Briefcase size={18} className="opportunity-icon" />
                                <span>{opportunity}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )
        };

        return tabContent[tab] || tabContent.about;
    };

    // Handle course click from slider
    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // If course not found
    if (!mainCourse) {
        return (
            <div className="course-details-page">
                <div className="course-not-found">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="not-found-content"
                    >
                        <h2>Course Not Found</h2>
                        <p>The course you're looking for doesn't exist or has been removed.</p>
                        <Link to="/" className="btn-primary">
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="course-details-page">
            {/* Main Course Section */}
            <section className="main-course-section">

                <div className="main-course-container">
                    {/* Back Button */}
                    <motion.div
                        className="back-navigation"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button
                            onClick={() => navigate('/#courses')}
                            className="back-button"
                        >
                            <ArrowLeft size={20} />
                            <span>Go Back</span>
                        </button>

                    </motion.div>

                    {/* Main Course Card */}
                    <motion.div
                        className="main-course-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="main-course-image">
                            <img
                                src={mainCourse.image}
                                alt={mainCourse.title}
                            />
                            <div className="level-badge-main">
                                {mainCourse.level}
                            </div>
                            <div className="discount-badge-main">
                                <span className="discount-text">30% OFF</span>
                                <small className="discount-subtext">Limited</small>
                            </div>
                        </div>

                        <div className="main-course-info">
                            <h1 className="main-course-title">{mainCourse.title}</h1>
                            <p className="main-course-description">{mainCourse.description}</p>

                            <div className="main-course-meta">
                                <div className="meta-item">
                                    <Clock size={18} />
                                    <span>{mainCourse.duration}</span>
                                </div>
                                <div className="meta-item">
                                    <Users size={18} />
                                    <span>{mainCourse.tutor}</span>
                                </div>
                            </div>

                            <div className="main-course-features">
                                <div className="features-header">
                                    <BookOpen size={18} />
                                    <span>Key Skills:</span>
                                </div>
                                <div className="features-tags">
                                    {mainCourse.features.map((feature, idx) => (
                                        <motion.span
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                            className="feature-tag"
                                        >
                                            {feature}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div className="main-course-price">
                                {(() => {
                                    const original = parsePrice(mainCourse.price);
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

                            <div className="main-course-actions">
                                <motion.button
                                    className="btn-primary enroll-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={()=> navigate('/enroll')}
                                >
                                    Enroll Now
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tabs Section */}
                    <motion.div
                        className="main-course-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="tabs-nav">
                            {[
                                { key: 'about', label: 'About Course', icon: BookOpen },
                                { key: 'learn', label: "What You'll Learn", icon: Target },
                                { key: 'opportunities', label: 'Opportunities', icon: Briefcase }
                            ].map((tab) => (
                                <motion.div key={tab.key} className="tab-item">
                                    <motion.button
                                        onClick={() => handleTabClick(tab.key)}
                                        className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                        <span className={`tab-arrow ${activeTab === tab.key ? 'open' : ''}`}>▼</span>
                                    </motion.button>
                                    <AnimatePresence>
                                        {activeTab === tab.key && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="tab-content-wrapper"
                                            >
                                                <div className="tab-content">
                                                    {getTabContent(mainCourse, tab.key)}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Other Courses Section */}
            <section className="other-courses-section">
                <div className="other-courses-container">
                    <motion.div
                        className="other-courses-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Explore Other Courses</h2>
                        <p className="section-subtitle">
                            Discover more courses that might interest you
                        </p>
                    </motion.div>

                  
                    {/* Slider - Remaining Courses */}
                    {sliderCourses.length > 0 && (
                        <>
                            <div
                                className="courses-slider"
                                onMouseEnter={() => setIsAutoPlaying(false)}
                                onMouseLeave={() => setIsAutoPlaying(true)}
                            >
                                <motion.button
                                    className="slider-arrow slider-arrow-left"
                                    onClick={prevSlide}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft size={32} />
                                </motion.button>

                                <div className="slider-viewport">
                                    <div
                                        className="slider-track"
                                        style={{
                                            transform: `translateX(-${currentSlide * 100}%)`
                                        }}
                                    >
                                        {sliderCourses.map((course, index) => (
                                            <motion.div
                                                key={course.id}
                                                className="slider-item"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="slider-course-card">
                                                    <div className="slider-course-image">
                                                        <img
                                                            src={course.image}
                                                            alt={course.title}
                                                        />
                                                        <div className="level-badge">
                                                            {course.level}
                                                        </div>
                                                    </div>

                                                    <div className="slider-course-info">
                                                        <h3 className="slider-course-title">{course.title}</h3>
                                                        <p className="slider-course-description">{course.description}</p>

                                                        <div className="slider-course-meta">
                                                            <div className="meta-item">
                                                                <Clock size={14} />
                                                                <span>{course.duration}</span>
                                                            </div>
                                                            <div className="meta-item">
                                                                <Users size={14} />
                                                                <span>{course.tutor}</span>
                                                            </div>
                                                        </div>

                                                        <div className="slider-course-features">
                                                            {course.features.slice(0, 2).map((feature, idx) => (
                                                                <span key={idx} className="mini-feature-tag">
                                                                    {feature}
                                                                </span>
                                                            ))}
                                                            {course.features.length > 2 && (
                                                                <span className="more-features">+{course.features.length - 2}</span>
                                                            )}
                                                        </div>

                                                        <div className="slider-course-price">
                                                            {(() => {
                                                                const original = parsePrice(course.price);
                                                                const discounted = Math.round((original + 10000) * 0.7);
                                                                return (
                                                                    <span className="slider-discounted-price">
                                                                        {formatPrice(discounted)}
                                                                    </span>
                                                                );
                                                            })()}
                                                        </div>

                                                        <motion.button
                                                            className="view-course-btn"
                                                            onClick={() => handleCourseClick(course.id)}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <BookOpen size={16} />
                                                            View Course
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    className="slider-arrow slider-arrow-right"
                                    onClick={nextSlide}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Next slide"
                                >
                                    <ChevronRight size={32} />
                                </motion.button>
                            </div>

                            {/* Slide Indicators */}
                            <div className="slider-indicators">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator ${currentSlide === index ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CourseDetails;
