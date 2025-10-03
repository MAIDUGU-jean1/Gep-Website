import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', course: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" style={{
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
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to start your journey? Contact us for more information about our courses and enrollment.
          </p>
        </motion.div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'start'
        }} className="contact-grid">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Contact Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                {
                  icon: MapPin,
                  title: 'Visit Our Campus',
                  info:'UBa Second Gate'
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  info: '+237 674 386 778\n+237 682 090 879'
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  info: 'ej.bnes@gmail.com'
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  info: 'Monday - Friday: (unStable)\nSaturday: 9:00 AM - 6:00 PM'
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
                    <p style={{ whiteSpace: 'pre-line', opacity: 0.8, lineHeight: '1.6' }}>{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                marginTop: '3rem',
                padding: '2rem',
                background: 'var(--card-bg)',
                borderRadius: '15px',
                border: '2px solid var(--border-color)'
              }}
            >
              <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Why Choose Us?
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Industry-experienced instructors',
                  'Hands-on practical training',
                  'Job placement assistance',
                  'Flexible payment options',
                  'Modern facilities and equipment'
                ].map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: 'var(--primary-color)',
                      borderRadius: '50%'
                    }}></div>
                    <span style={{ opacity: 0.8 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'var(--card-bg)',
              padding: '2.5rem',
              borderRadius: '15px',
              border: '2px solid var(--border-color)'
            }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Course Interest
                </label>
                <select 
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a course</option>
                  <option value="web-development">Web Development</option>
                  <option value="digital-marketing">Data Analysis</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="data-science">Computer studies</option>
                  <option value="mobile-development">Mobile App Development</option>
                  <option value="cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: 'var(--text-secondary)'
                }}>
                  Message *
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease'
                  }}
                  placeholder="Tell us about your goals and how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                marginTop: '1rem'
              }}>
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: var(--primary-color) !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;