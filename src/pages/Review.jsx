import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, Mail, MessageSquare, Calendar, Clock, ThumbsUp, Quote } from 'lucide-react';
import './css/Review.css';

const Review = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAnonymous: 'no',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sampleReviews = [
    {
      id: 1,
      name: 'Marie Claire',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      date: 'April 5, 2026',
      message: 'GEP Protech Academy transformed my career. The courses are well-structured and the instructors are exceptional. I landed my dream job within 3 months of completing the web development program!',
      likes: 24
    },
    {
      id: 2,
      name: 'Pierre Kamga',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      date: 'April 3, 2026',
      message: 'Outstanding learning experience! The bootcamp was intensive but incredibly rewarding. The hands-on projects gave me real-world skills that I use every day.',
      likes: 18
    },
    {
      id: 3,
      name: 'Fatou Mbarga',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4,
      date: 'March 28, 2026',
      message: 'Great academy with excellent resources. The community support is amazing. Would highly recommend to anyone looking to break into tech.',
      likes: 12
    },
    {
      id: 4,
      name: 'Jean Paul Biwole',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 5,
      date: 'March 25, 2026',
      message: 'The instructors are knowledgeable and patient. The curriculum is up-to-date with industry standards. Best investment in my education!',
      likes: 15
    },
    {
      id: 5,
      name: 'Amara Diop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 5,
      date: 'March 20, 2026',
      message: 'I joined the academy with zero tech knowledge. After 6 months, I\'m now a junior developer at a tech startup. The journey has been incredible!',
      likes: 22
    },
    {
      id: 6,
      name: 'Samuel Nguemfo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4,
      date: 'March 15, 2026',
      message: 'Quality education at an affordable price. The mentorship program helped me refine my skills and build a professional portfolio.',
      likes: 9
    }
  ];

  const events = [
    {
      id: 1,
      title: 'GEP Bootcamp 2026',
      date: 'March 31 - April 4, 2026',
      description: '5-day intensive tech bootcamp covering AI, Web Development, and more.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
      attendees: '25+ Registered'
    },
    {
      id: 2,
      title: 'Tech Career Fair',
      date: 'April 15, 2026',
      description: 'Connect with top tech employers and explore career opportunities.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      attendees: 'Coming Soon'
    },
    {
      id: 3,
      title: 'AI Workshop Series',
      date: 'Every Saturday',
      description: 'Hands-on workshops on Artificial Intelligence and Machine Learning.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      attendees: 'Ongoing'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setReviews(sampleReviews);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview = {
        id: reviews.length + 1,
        name: formData.isAnonymous === 'yes' ? 'Anonymous' : formData.name,
        avatar: formData.isAnonymous === 'yes' 
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
          : 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
        rating: 5,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        message: formData.message,
        likes: 0
      };
      setReviews([newReview, ...reviews]);
      setFormData({ name: '', email: '', isAnonymous: 'no', message: '' });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
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
            <h1 className="hero-title">Reviews & Events</h1>
            <p className="hero-description">
              Discover what our students say about their journey at GEP Protech Academy 
              and stay updated with our upcoming events.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{reviews.length}+</span>
                <span className="stat-label">Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Events</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join our events and take your tech journey to the next level
          </motion.p>

          <div className="events-grid">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-badge">{event.attendees}</div>
                </div>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span><Calendar size={16} /> {event.date}</span>
                  </div>
                  <p>{event.description}</p>
                  <button className="event-btn">Learn More</button>
                </div>
              </motion.div>
            ))}
          </div>
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
                          <img src={review.avatar} alt={review.name} />
                        </div>
                        <div className="review-info">
                          <h4>{review.name}</h4>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="review-body">
                        <Quote size={24} className="quote-icon" />
                        <p>{review.message}</p>
                      </div>
                      <div className="review-footer">
                        <button className="like-btn">
                          <ThumbsUp size={16} />
                          <span>{review.likes}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {reviews.length > 4 && (
                <div className="view-all-container">
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Review Form Section */}
      <section className="form-section">
        <div className="container">
          <motion.div
            className="form-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <h2>Share Your Experience</h2>
              <p>Your feedback helps us improve and helps others make informed decisions</p>
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
                    disabled={formData.isAnonymous === 'yes'}
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
                    disabled={formData.isAnonymous === 'yes'}
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="isAnonymous"
                    value="no"
                    checked={formData.isAnonymous === 'no'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-custom"></span>
                  Show my name
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="isAnonymous"
                    value="yes"
                    checked={formData.isAnonymous === 'yes'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-custom"></span>
                  Submit anonymously
                </label>
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
