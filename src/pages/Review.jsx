import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Mail, MessageSquare, Calendar, Clock, ThumbsUp, Quote, Eye, EyeOff, ArrowRight, History, CalendarDays, User2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Review.css';
import Logo from '../assets/Images/logo1.png';

const apiUrl = import.meta.env.VITE_API_URL;
const fileUrl = import.meta.env.VITE_FILE_API_URL;
const DEFAULT_IMAGE = Logo;
const DARK_PERSON_IMAGE = Logo;

const Review = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [inactiveEvents, setInactiveEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  

  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAnonymous: false,
    message: '',
    rating: 5,
    eventId: null,
    eventTitle: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: true, label: 'Anonymous' },
    { value: false, label: 'Non Anonymous' }
  ];

  const filteredReviews = reviews.filter(review => {
    if (activeFilter === 'all') return true;
    if (activeFilter === true) return review.is_anonymous === 1;
    if (activeFilter === false) return review.is_anonymous === 0;
    return true;
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, eventsRes] = await Promise.all([
          axios.get(`${apiUrl}/reviews`),
          axios.get(`${apiUrl}/events`)
        ]);

        console.log('Reviews Response:', reviewsRes.data);
        setReviews(reviewsRes.data.reviews || reviewsRes.data);

        const eventsData = eventsRes.data;
        const active = eventsData.active || eventsData.events || [];
        const inactive = eventsData.inactive || [];

        setActiveEvents(active);
        setInactiveEvents(inactive);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEventReview = (event) => {
    setFormData(prev => ({
      ...prev,
      eventId: event.id,
      eventTitle: event.title
    }));
    scrollToForm();
  };

  const handleLearnMore = (event) => {
    navigate('/events');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/reviews`, {
        event_id: formData.eventId,
        name: formData.isAnonymous ? null : formData.name,
        email: formData.isAnonymous ? null : formData.email,
        is_anonymous: formData.isAnonymous,
        message: formData.message,
        rating: formData.rating,
      });
      setReviews([response.data.review || { ...formData, id: Date.now(), date: new Date().toLocaleDateString() }, ...reviews]);
      setFormData({ name: '', email: '', isAnonymous: false, message: '', rating: 5, eventId: null, eventTitle: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpandReview = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const truncateMessage = (message, maxLength = 20) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        fill={i < rating ? 'var(--primary-color)' : 'none'}
        stroke={i < rating ? 'var(--primary-color)' : 'var(--text-secondary)'}
        className={`star-icon ${i < rating ? 'filled' : ''}`}
      />
    ));
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleLike = async (reviewId) => {
    try {
      const response = await axios.post(`${apiUrl}/reviews/${reviewId}/like`);
      setReviews(reviews.map(review =>
        review.id === reviewId
          ? { ...review, likes_count: response.data.likes_count }
          : review
      ));
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  };

  const handleUnlike = async (reviewId) => {
    try {
      const response = await axios.delete(`${apiUrl}/reviews/${reviewId}/like`);
      setReviews(reviews.map(review =>
        review.id === reviewId
          ? { ...review, likes_count: response.data.likes_count }
          : review
      ));
    } catch (error) {
      console.error('Failed to unlike review:', error);
    }
  };

  const getThumbnail = (event) => {
    if (!event?.thumbnail) return DEFAULT_IMAGE;
    if (event.thumbnail.startsWith('http')) return event.thumbnail;
    return `${fileUrl}/${event.thumbnail}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="review-page">
      {/* Hero Section */}
      <section className="review-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-main"
          >
            <h1 className="hero-title">Reviews</h1>
            <p className="hero-description">
              Discover what our students say about their journey at GEP Protech Academy.
            </p>



            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{reviews.length}</span>
                <span className="stat-label">Reviews</span>
              </div>

            </div>
          </motion.div>
        </div>
      </section>



      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Real experiences from our community of learners
          </motion.p>

          <div className="filter-container">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter(option.value);
                  setShowAllReviews(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading reviews...</p>
            </div>
          ) : displayedReviews.length === 0 ? (
            <div className="empty-state">
              <MessageSquare size={48} />
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <>
              <div className="reviews-grid">
                <AnimatePresence mode="popLayout">
                  {displayedReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      className="review-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="review-header">
                        <div className="review-avatar">
                          {review.is_anonymous || review.isAnonymous ? (
                            <div className="anonymous-avatar">
                              <User2 size={28} />
                            </div>
                          ) : (
                            <img src={DARK_PERSON_IMAGE} alt={review.name} />
                          )}
                        </div>
                        <div className="review-info">
                          <h4>{(review.is_anonymous || review.isAnonymous) ? 'Anonymous' : review.name}</h4>
                          <span className="review-date">{formatDate(review.created_at || review.date)}</span>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating || 5)}
                        </div>
                      </div>
                      <div className="review-body">
                        <Quote size={24} className="quote-icon" />
                        {review.message && review.message.length > 20 ? (
                          <p>
                            {expandedReviews[review.id] 
                              ? review.message 
                              : truncateMessage(review.message, 20)}
                            <button
                              className="learn-more-btn"
                              onClick={() => toggleExpandReview(review.id)}
                            >
                              {expandedReviews[review.id] ? '...Show less' : '...Learn more'}
                            </button>
                          </p>
                        ) : (
                          <p>{review.message}</p>
                        )}
                      </div>
                      <div className="review-footer">
                        <button className="like-btn" onClick={() => handleLike(review.id)}>
                          <ThumbsUp size={16} />
                          <span>{review.likes_count || review.likes || 0}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredReviews.length > 4 && (
                <div className="view-all-container">
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? 'Show Less' : `View All ${filteredReviews.length} Reviews`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Review Form Section */}
      <section className="form-section" ref={formRef}>
        <div className="container">
          <motion.div
            className="form-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <h2>Share Your Experience</h2>
              <p>
                {formData.eventTitle
                  ? `Share your experience about "${formData.eventTitle}" event`
                  : 'Your feedback helps us improve and helps others make informed decisions'}
              </p>
            </div>

            {submitSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Thank you for your review! It has been submitted successfully.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="review-form">
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
                  placeholder="Share your experience with GEP Protech Academy..."
                  rows={5}
                  className={formErrors.message ? 'error' : ''}
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
        </div>
      </section>
    </div>
  );
};

export default Review;