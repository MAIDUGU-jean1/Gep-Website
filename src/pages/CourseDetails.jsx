import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Clock,
    Users,
    BookOpen,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    CheckCircle,
    Award
} from 'lucide-react';
import { fetchCourses } from '../data/courses';
import './css/CourseDetails.css';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const courseId = parseInt(id);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    // Scroll to the top of the details page whenever the course ID changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [courseId]);

    // Fetch all courses
    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                const data = await fetchCourses();
                setCourses(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Failed to load courses:", err);
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    // Find the main course
    const mainCourse = courses.find(c => c.id === courseId);

    // Get other courses (excluding the main one)
    const otherCourses = courses.filter(c => c.id !== courseId);

    // Calculate number of slides
    const totalSlides = Math.ceil(otherCourses.length / itemsPerSlide);

    // Handle responsive items per slide
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerSlide(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-slide functionality for recommendations
    useEffect(() => {
        let interval;
        if (isAutoPlaying && otherCourses.length > 0) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 4000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides, otherCourses.length]);

    // Slider controls
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

    const handleCourseClick = (targetId) => {
        navigate(`/course/${targetId}`);
    };

    const handleBackClick = () => {
        navigate('/');
        setTimeout(() => {
            const coursesSection = document.getElementById('courses');
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
    };

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

    const getCourseImageSrc = (course) => {
        if (!course) return '';
        if (course.thumbnail) {
            if (course.thumbnail.startsWith('http://') || course.thumbnail.startsWith('https://')) {
                return course.thumbnail;
            }
            return `${import.meta.env.VITE_FILE_API_URL || 'http://127.0.0.1:8000'}/${course.thumbnail}`;
        }
        return course.image || '';
    };

    // Loading state
    if (loading) {
        return (
            <div className="course-details-page">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading course details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="course-details-page">
                <div className="error-state">
                    <h2>Failed to load course</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // If course not found
    if (!mainCourse) {
        return (
            <div className="course-details-page">
                <div className="course-not-found">
                    <div className="not-found-content">
                        <h2>Course Not Found</h2>
                        <p>The course you're looking for doesn't exist or has been removed.</p>
                        <button onClick={handleBackClick} className="btn-primary">
                            <ArrowLeft size={18} />
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="course-details-page">
            <div className="course-details-container">
                
                {/* Back Button */}
                <div className="back-navigation">
                    <button onClick={handleBackClick} className="back-button">
                        <ArrowLeft size={18} />
                        <span>Back to Courses</span>
                    </button>
                </div>

                {/* Hero Showcase Block */}
                <div className="course-showcase-card">
                    {/* Left Column: Visual details & Price summary */}
                    <div className="showcase-visuals">
                        <div className="showcase-image-wrapper">
                            <img
                                src={getCourseImageSrc(mainCourse)}
                                alt={mainCourse.title}
                            />
                            <div className="level-badge">{mainCourse.level === 'C' ? 'Beginner - Advanced' : mainCourse.level === 'B' ? 'Intermediate - Advanced' : 'Advanced'}</div>
                            {mainCourse.bonus > 0 && (
                                <div className="price-tag-badge">
                                    {mainCourse.bonus}% OFF
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Title info + pricing */}
                    <div className="showcase-details">
                        <div className="showcase-tags">
                            <span className="level-badge">
                                {mainCourse.level === 'C' ? 'Beginner to Advanced' : mainCourse.level === 'B' ? 'Intermediate to Advanced' : mainCourse.level || 'Professional'}
                            </span>
                        </div>
                        <h1 className="course-title">{mainCourse.title}</h1>
                        <p className="course-tagline">{mainCourse.description}</p>

                        <div className="main-meta-details">
                            <div className="meta-detail-box">
                                <Clock size={16} />
                                <div>
                                    <small>Duration</small>
                                    <span>{mainCourse.duration}</span>
                                </div>
                            </div>
                            <div className="meta-detail-box">
                                <Users size={16} />
                                <div>
                                    <small>Tutor</small>
                                    <span>{mainCourse.tutor}</span>
                                </div>
                            </div>
                            <div className="meta-detail-box">
                                <Award size={16} />
                                <div>
                                    <small>Level</small>
                                    <span>{mainCourse.level === 'C' ? 'Beginner - Advanced' : mainCourse.level === 'B' ? 'Intermediate - Advanced' : 'Advanced'}</span>
                                </div>
                            </div>
                        </div>

                        {mainCourse.skills && mainCourse.skills.length > 0 && (
                            <div className="key-skills-section">
                                <b>Skills Covered:</b>
                                <div className="skills-tag-cloud">
                                    {mainCourse.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag-pill">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pricing-enrollment-action">
                            <div className="pricing-box">
                                {(() => {
                                    let original;
                                    let discounted;
                                    if (mainCourse.bonus > 0) {
                                        original = parsePrice(mainCourse.price);
                                        discounted = Math.round(original - (original * (mainCourse.bonus / 100)));
                                    } else {
                                        original = parsePrice(mainCourse.slash_price);
                                        discounted = parsePrice(mainCourse.price);
                                    }

                                    return (
                                        <div className="price-pricing-row">
                                            <span className="final-price">{formatPrice(discounted || original)}</span>
                                            {original > 0 && original !== discounted && (
                                                <span className="slashed-price">{formatPrice(original)}</span>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>

                            <button onClick={() => navigate('/enroll')} className="btn-primary enroll-cta-button">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Section Grid (Widescreen multi-column layout) */}
                <div className="details-info-grid">
                    
                    {/* Left Column: About & Learnings */}
                    <div className="details-columns-main">
                        <section className="info-section-card">
                            <h2 className="info-header-title">About the Course</h2>
                            <p className="about-text">{mainCourse.about || mainCourse.description}</p>
                        </section>

                        {mainCourse.learns && mainCourse.learns.length > 0 && (
                            <section className="info-section-card">
                                <h2 className="info-header-title">What You'll Learn</h2>
                                <div className="learnings-list-grid">
                                    {mainCourse.learns.map((learn, index) => (
                                        <div className="learn-point-row" key={index}>
                                            <div className="learn-icon-box">
                                                <CheckCircle size={16} />
                                            </div>
                                            <span>{learn}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Career Pathways */}
                    <div className="details-columns-sidebar">
                        <section className="info-section-card sidebar-card-accent">
                            <h2 className="info-header-title">Career Opportunities</h2>
                            <p className="opportunities-desc">Completing this course qualifies you for roles such as:</p>
                            <div className="oportunities-vertical-list">
                                {(mainCourse.opportunities || [
                                    "Industry professional roles",
                                    "Consulting projects & freelancers",
                                    "In-demand developer positions",
                                    "Technical advisor career tracks"
                                ]).map((opp, index) => (
                                    <div className="opportunity-point-row" key={index}>
                                        <div className="opp-bullet-symbol">✦</div>
                                        <span>{opp}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>

            </div>

            {/* Slider Showcase: Other Recommended Courses */}
            {otherCourses.length > 0 && (
                <section className="recommendations-slider-section">
                    <div className="recommendations-container">
                        <div className="slider-header-block">
                            <h2 className="recommendations-heading">Explore Other Courses</h2>
                            <p className="recommendations-subheading">Continuously build your coding and professional skills</p>
                        </div>

                        <div
                            className="premium-courses-slider"
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                        >
                            <button
                                className="slider-control-arrow left-control"
                                onClick={prevSlide}
                                aria-label="Previous Course"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="slider-viewport-mask">
                                <div
                                    className="slider-moving-track"
                                    style={{
                                        transform: `translateX(-${currentSlide * 100}%)`
                                    }}
                                >
                                    {otherCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="slider-item-column"
                                            style={{ flex: `0 0 ${100 / itemsPerSlide}%` }}
                                        >
                                            <div className="recommended-course-card">
                                                <div className="recommended-card-image">
                                                    <img
                                                        src={getCourseImageSrc(course)}
                                                        alt={course.title}
                                                    />
                                                    <span className="card-badge">
                                                        {course.level === 'C' ? 'Beginner' : course.level === 'B' ? 'Intermediate' : course.level}
                                                    </span>
                                                </div>

                                                <div className="recommended-card-info">
                                                    <h3 className="card-course-title">{course.title}</h3>
                                                    <p className="card-course-desc">{course.description}</p>

                                                    <div className="card-course-meta">
                                                        <span>⏱️ {course.duration}</span>
                                                        <span>👨‍🏫 {course.tutor}</span>
                                                    </div>

                                                    <div className="card-pricing-footer">
                                                        {(() => {
                                                            let original = parsePrice(course.price);
                                                            let discounted = course.bonus > 0 ? Math.round(original - (original * (course.bonus / 100))) : original;
                                                            return (
                                                                <span className="pricing-value">
                                                                    {formatPrice(discounted)}
                                                                </span>
                                                            );
                                                        })()}
                                                        
                                                        <button
                                                            className="slider-view-detail-btn"
                                                            onClick={() => handleCourseClick(course.id)}
                                                        >
                                                            <BookOpen size={14} />
                                                            <span>Details</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="slider-control-arrow right-control"
                                onClick={nextSlide}
                                aria-label="Next Course"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Indicators dots */}
                        {totalSlides > 1 && (
                            <div className="slider-carousel-indicators">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <button
                                        key={index}
                                        className={`carousel-indicator-dot ${currentSlide === index ? 'active-indicator' : ''}`}
                                        onClick={() => goToSlide(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CourseDetails;
