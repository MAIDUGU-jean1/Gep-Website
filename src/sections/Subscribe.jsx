import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Users, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Subscribe = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Inline subscriber fields (replacing popup)
  const [subscriberName, setSubscriberName] = useState('');
  const [subscriberCountry, setSubscriberCountry] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    console.log('[DEBUG] Newsletter form submitted, email:', newsletterEmail);

    if (!newsletterEmail.trim() || !subscriberName.trim() || !subscriberCountry.trim()) {
      console.log('[DEBUG] Missing required fields:', { newsletterEmail, subscriberName, subscriberCountry });
      setErrorMessage('Please fill in all required fields');
      setSuccessMessage('');
      return;
    }

    setNewsletterLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }

      // Submit subscriber to backend (include name & country)
      const response = await axios.post(`${apiUrl}/newsletter-subscribe`, {
        email: newsletterEmail,
        name: subscriberName,
        country: subscriberCountry
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (response.data && response.data.success) {
        console.log('Subscription successful, setting green success message');
        setSuccessMessage('Thank you for subscribing!');
        // Show alert on successful subscription
        alert('Thank you for subscribing!');
        // clear inputs
        setNewsletterEmail('');
        setSubscriberName('');
        setSubscriberCountry('');
        setErrorMessage('');
      } else {
        // API returned but without success flag - still show alert and clear
        console.log('API response received but no success flag:', response.data);
        alert('Thank you for subscribing!');
        setNewsletterEmail('');
        setSubscriberName('');
        setSubscriberCountry('');
        setSuccessMessage('Thank you for subscribing!');
      }
    } catch (error) {
      console.error('[DEBUG] Subscription error caught:', error.message);

      // Frontend-focused error handling - generate clear user-friendly messages
      let errorMsg = 'Failed to subscribe. Please try again.';

      if (error.response) {
        if (error.response.status === 422) {
          const errors = error.response.data.errors || error.response.data.message;
          // If backend indicates the email is already taken, show friendly message
          const emailErrors = errors && errors.email ? errors.email : null;
          const emailMsg = Array.isArray(emailErrors) ? emailErrors.join(' ') : (typeof emailErrors === 'string' ? emailErrors : '');
          const generalMsg = typeof errors === 'string' ? errors : '';

          if (
            (emailMsg && (emailMsg.toLowerCase().includes('already') || emailMsg.toLowerCase().includes('taken'))) ||
            (generalMsg && (generalMsg.toLowerCase().includes('already') || generalMsg.toLowerCase().includes('taken')))
          ) {
            errorMsg = 'You already subscribed.';
          } else if (typeof errors === 'object') {
            errorMsg = Object.entries(errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages[0] : messages}`)
              .join('\n');
          } else {
            errorMsg = errors;
          }
        } else {
          errorMsg = error.response.data?.message || `Error: ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMsg = 'No response from server. Please check your connection.';
      } else {
        errorMsg = error.message;
      }

      console.log('[DEBUG] Setting error message:', errorMsg);
      setErrorMessage(errorMsg);
      setSuccessMessage('');

      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Popup removed: using inline name & country fields instead

  return (
    <section id="subscribe" style={{
      padding: 'clamp(4rem, 8vw, 8rem) 0',
      background: 'var(--bg-primary)'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="section-title">Stay Connected</h2>
          <p className="section-subtitle">
            Subscribe to our newsletter for updates, tips, and exclusive offers from Gep Protech Academy.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          alignItems: 'center',
          maxWidth: '1100px',
          margin: '0 auto'
        }} className="subscribe-grid">
          {/* Left Side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              order: 1
            }}
            className="subscribe-info"
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Why Subscribe?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                {
                  icon: Mail,
                  title: 'Latest Updates',
                  info: 'Get the first notification about new courses, programs, and opportunities'
                },
                {
                  icon: GraduationCap,
                  title: 'Exclusive Content',
                  info: 'Access to tips, guides, and industry insights for tech professionals'
                },
                {
                  icon: Users,
                  title: 'Community Benefits',
                  info: 'Join our growing community and network with like-minded learners'
                },
                {
                  icon: Clock,
                  title: 'Early Access',
                  info: 'Be the first to know about special promotions and limited-time offers'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  <div style={{
                    background: 'var(--primary-color)',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'white'
                  }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ whiteSpace: 'pre-line', opacity: 0.8, lineHeight: '1.6', fontSize: '0.95rem' }}>{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                marginTop: '2rem',
                padding: '2rem',
                background: 'var(--card-bg)',
                borderRadius: '15px',
                border: '2px solid var(--border-color)'
              }}
            >
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                What You'll Receive
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Weekly tech tips and industry trends',
                  'Course release announcements',
                  'Scholarship and promotion alerts',
                  'Success stories from our alumni',
                  'Free webinar invitations',
                  'Career guidance articles',
                  'Networking event updates',
                  'Exclusive subscriber-only discounts'
                ].map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={18} color="var(--primary-color)" />
                    <span style={{ opacity: 0.8 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, var(--primary-color) 0%, rgba(var(--primary-color-rgb), 0.8) 100%)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              borderRadius: '20px',
              order: 2,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
            }}
            className="newsletter-cta"
          >
            <div style={{
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Mail size={28} color="white" />
              </div>

              <h3 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
                marginBottom: '0.75rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                Subscribe Now
              </h3>

              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '1.5rem',
                lineHeight: '1.5',
                fontSize: 'clamp(0.85rem, 2vw, 1rem)'
              }}>
                Join thousands of students and professionals staying updated with the latest opportunities.
              </p>

              {(successMessage || errorMessage) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    background: successMessage
                      ? 'rgba(34, 197, 94, 0.95)'  // Green background for success
                      : 'rgba(239, 68, 68, 0.95)', // Red background for error
                    padding: '1rem',
                    borderRadius: '10px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                    border: `2px solid ${successMessage ? '#22c55e' : '#ef4444'}`
                  }}
                >
                  {successMessage ? (
                    <>
                      <CheckCircle size={20} color="white" style={{ background: '#22c55e', borderRadius: '50%', padding: '2px' }} />
                      <span style={{ color: 'white', fontWeight: '600' }}>
                        {successMessage}
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '1.2rem', color: 'white' }}>⚠</span>
                      <span style={{ color: 'white', fontWeight: '500' }}>
                        {errorMessage}
                      </span>
                    </>
                  )}
                </motion.div>
              )}

              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Inline name & country fields (stacked on mobile, side by side on desktop) */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap'
                }}>
                  <input
                    type="text"
                    value={subscriberName}
                    onChange={(e) => setSubscriberName(e.target.value)}
                    placeholder="Your name"
                    required
                    disabled={newsletterLoading}
                    style={{
                      flex: '1 1 180px',
                      minWidth: '140px',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'white',
                      color: '#333',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      opacity: newsletterLoading ? 0.7 : 1
                    }}
                  />

                  <input
                    type="text"
                    value={subscriberCountry}
                    onChange={(e) => setSubscriberCountry(e.target.value)}
                    placeholder="Your country"
                    required
                    disabled={newsletterLoading}
                    style={{
                      flex: '1 1 180px',
                      minWidth: '140px',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'white',
                      color: '#333',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      opacity: newsletterLoading ? 0.7 : 1
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterLoading}
                    required
                    placeholder="Your email address"
                    style={{
                      flex: 1,
                      minWidth: '180px',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      borderRadius: '10px',
                      background: 'white',
                      color: '#333',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      opacity: newsletterLoading ? 0.7 : 1
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={newsletterLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'white',
                      color: 'var(--primary-color)',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      cursor: newsletterLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease',
                      opacity: newsletterLoading ? 0.7 : 1,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {newsletterLoading ? (
                      <span className="spinning">⟳</span>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                </div>

                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '0.5rem'
                }}>
                  No spam, just valuable updates.
                </p>
              </form>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  textAlign: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    50+
                  </div>
                  <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Active Subscribers
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    100%
                  </div>
                  <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Value Guaranteed
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Popup removed — using inline fields in the form instead */}

      <style>{`
        @media (max-width: 767px) {
          .subscribe-grid {
            grid-template-columns: 1fr !important;
          }
          .subscribe-info {
            order: 1 !important;
          }
          .newsletter-cta {
            order: 2 !important;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
        }

        input::placeholder {
          color: #999;
        }
      `}</style>
    </section>
  );
};

export default Subscribe;
