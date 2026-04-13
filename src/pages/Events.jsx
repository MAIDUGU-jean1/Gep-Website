import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, MapPin, Users, Filter, ChevronRight, Clock, Tag, Star, Send, User, Mail, MessageSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Events.css';

const apiUrl = import.meta.env.VITE_API_URL;
const fileUrl = import.meta.env.VITE_FILE_API_URL;
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600';

const Events = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        isAnonymous: false,
        message: '',
        rating: 5
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${apiUrl}/events`);
                setEvents(response.data.events || response.data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const categories = ['All', 'Workshops', 'Training', 'Webinars', 'Networking', 'Meetups'];

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.type?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = activeCategory === 'All' || event.type === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory, events]);

    const handleReviewClick = (event) => {
        setSelectedEvent(event);
        setShowReviewModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.isAnonymous) {
            if (!formData.name.trim()) errors.name = 'Name is required';
            if (!formData.email.trim()) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Email is invalid';
            }
        }
        if (!formData.message.trim()) errors.message = 'Message is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await axios.post(`${apiUrl}/reviews`, {
                event_id: selectedEvent?.id,
                name: formData.isAnonymous ? null : formData.name,
                email: formData.isAnonymous ? null : formData.email,
                is_anonymous: formData.isAnonymous,
                message: formData.message,
                rating: formData.rating,
            });
            setFormData({ name: '', email: '', isAnonymous: false, message: '', rating: 5 });
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                setShowReviewModal(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to submit review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRatingClick = (rating) => {
        setFormData({ ...formData, rating });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const getThumbnail = (event) => {
        if (!event.thumbnail) return DEFAULT_IMAGE;
        if (event.thumbnail.startsWith('http')) return event.thumbnail;
        return `${fileUrl}/${event.thumbnail}`;
    };

    return (
        <div className="events-page">
            {/* Hero Section */}
            <section className="events-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-main"
                    >
                        <h1 className="hero-title">Our Events</h1>
                        <p className="hero-description">
                            Discover workshops, training sessions, webinars, and networking opportunities
                            designed to accelerate your tech journey. Join our community and learn from industry experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="events-search-section">
                <div className="container">
                    <div className="search-filter-wrapper">
                        {/* Search Bar */}
                        <motion.div
                            className="search-bar"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search events by name, location, topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </motion.div>

                        {/* Category Filters */}
                        <motion.div
                            className="category-filters"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Filter size={18} />
                            <div className="filter-buttons">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Events Grid Section */}
            <section className="events-grid-section">
                <div className="container">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading events...</p>
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="events-grid">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="event-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="event-image">
                                        <img src={getThumbnail(event)} alt={event.title} />
                                        <div className="event-category">
                                            <Tag size={14} />
                                            <span>{event.type}</span>
                                        </div>
                                    </div>
                                    <div className="event-content">
                                        <div className="event-date">
                                            <Calendar size={16} />
                                            <span>{formatDate(event.date || event.start_date)}</span>
                                            {event.end_date && event.end_date !== event.start_date && (
                                                <>
                                                    <span className="date-separator">-</span>
                                                    <span>{formatDate(event.end_date)}</span>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="event-title">{event.title}</h3>
                                        <p className="event-description">{event.description}</p>
                                        <div className="event-location">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="event-actions">
                                            <button className="btn-review" onClick={() => handleReviewClick(event)}>
                                                <Star size={16} />
                                                Review
                                            </button>
                                            <Link to={event.code ? `/bootcamp?event=${event.code}` : '/enroll'} className="btn-view">
                                                View Details
                                                <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="no-events"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Search size={60} />
                            <h3>No events found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Review Modal */}
            <AnimatePresence>
                {showReviewModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowReviewModal(false)}
                    >
                        <motion.div
                            className="review-modal"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <div className="modal-header">
                                <button className="modal-close" onClick={() => setShowReviewModal(false)}>
                                    <X size={20} />
                                </button>
                                <h2>Review Event</h2>
                                <p>Share your experience about {selectedEvent?.title}</p>
                            </div>

                            {submitSuccess && (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Thank you for your review! It has been submitted successfully.
                                </motion.div>
                            )}

                            <form onSubmit={handleReviewSubmit} className="review-form" style={{ pointerEvents: 'auto' }}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <User size={18} />
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your name"
                                            className={formErrors.name ? 'error' : ''}
                                            disabled={formData.isAnonymous}
                                            style={{ pointerEvents: 'auto' }}
                                        />
                                        {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <Mail size={18} />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            className={formErrors.email ? 'error' : ''}
                                            disabled={formData.isAnonymous}
                                            style={{ pointerEvents: 'auto' }}
                                        />
                                        {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">
                                        <MessageSquare size={18} />
                                        Your Review
                                    </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Share your experience with this event..."
                                            rows={5}
                                            className={formErrors.message ? 'error' : ''}
                                            style={{ pointerEvents: 'auto' }}
                                        ></textarea>
                                    {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label>
                                        <Star size={18} />
                                        Rating
                                    </label>
                                    <div className="rating-stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                                                onClick={() => handleRatingClick(star)}
                                            >
                                                <Star
                                                    size={24}
                                                    fill={star <= formData.rating ? 'var(--primary-color)' : 'none'}
                                                    stroke={star <= formData.rating ? 'var(--primary-color)' : 'var(--text-secondary)'}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="isAnonymous"
                                            checked={formData.isAnonymous}
                                            onChange={handleInputChange}
                                        />
                                        <span className="checkbox-custom"></span>
                                        Submit anonymously
                                    </label>
                                </div>

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <span className="loading-text">Submitting...</span>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Submit Review
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Events;
