import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Info from '../../src/assets/Images/info.jpeg';
import Certificate from '../../src/assets/Images/certificate.jpeg';

const About = () => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const aboutSections = [
    // {
    //   id: 1,
    //   title: 'Our Mission',
    //   shortDescription: 'Bridging the gap between education and employment through quality vocational training.',
    //   fullDescription: 'At Gep Protech Academic, our mission is to provide accessible, high-quality vocational training that directly addresses the skills gap in today\'s job market. We focus on practical, hands-on learning that prepares students for immediate employment in high-demand fields. Our programs are designed in collaboration with industry experts to ensure relevance and effectiveness.',
    //   image: Info,
    //   features: ['Industry-relevant curriculum', 'Hands-on practical training', 'Job placement assistance']
    // },
    // {
    //   id: 2,
    //   title: 'Expert Instructors',
    //   shortDescription: 'Learn from industry professionals with real-world experience.',
    //   fullDescription: 'Our instructors are seasoned professionals who bring years of industry experience into the classroom. They are not just teachers but mentors who guide students through real-world projects and challenges. Each instructor undergoes rigorous training to ensure they can effectively translate complex concepts into understandable, practical skills.',
    //   image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    //   features: ['Industry professionals', 'Practical experience', 'Personalized mentorship']
    // },
    {
      id: 3,
      title: 'Certification',
      shortDescription: 'Earn recognized certifications that boost your career prospects.',
      fullDescription: 'Our certification programs are designed to be recognized and valued by employers. We partner with industry leaders to ensure our certifications meet current market standards. Graduates receive not just a certificate but a portfolio of work that demonstrates their capabilities to potential employers.',
      image: Certificate,
      features: ['Industry-recognized', 'Portfolio building', 'Career advancement']
    }
  ];

  const toggleCardExpansion = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section id="about" style={{
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
          <h2 className="section-title">About Gep Protech Academic</h2>
          <p className="section-subtitle">
            Empowering individuals with practical skills for the modern workforce through 
            comprehensive vocational training and career development programs.
          </p>
          
          {/* Read More Button for Main Content */}
          <motion.button
            onClick={() => setShowFullContent(!showFullContent)}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '2rem auto 0'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showFullContent ? 'Show Less' : 'Read More'}
            {showFullContent ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </motion.button>
        </motion.div>

        {/* Expanded Main Content */}
        <AnimatePresence>
          {showFullContent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                overflow: 'hidden',
                marginBottom: '4rem'
              }}
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  background: 'var(--card-bg)',
                  padding: '3rem',
                  borderRadius: '20px',
                  border: '2px solid var(--primary-color)',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  fontSize: '2rem',
                  marginBottom: '1.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                   Gep Protech Academic?
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '2rem',
                  textAlign: 'left'
                }}>
                   {[
                    {
                      title: 'Our Mission',
                      description: 'To provide accessible, high-quality vocational training that bridges the gap between education and employment, empowering individuals with practical skills for sustainable careers in the modern workforce.',
                    },
                    {
                      title: 'Our Vision',
                      description: 'To be the leading vocational training institution in Bamenda, recognized for producing highly skilled professionals who drive innovation and economic growth in their communities.',
                    },
                    {
                      title: 'Our Objectives',
                      description: 'To deliver industry-relevant training programs, foster partnerships with leading companies, provide career placement support, and continuously update our curriculum to meet evolving market demands.',
                    }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem'
                    }}>
                      <div style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginTop: '0.2rem'
                      }}>
                        ✓
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: '1.1rem',
                          marginBottom: '0.5rem',
                          color: 'var(--text-secondary)',
                          fontWeight: '600'
                        }}>
                          {item.title}
                        </h4>
                        <p style={{ opacity: 0.8, lineHeight: '1.5' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Sections Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {aboutSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '5x',
                // overflow: 'hidden',
                border: '2px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                y: -5,
                borderColor: 'var(--primary-color)'
              }}
            >
              {/* Section Image */}
              <div style={{
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={section.image} 
                  alt={section.title}
                  style={{
                    width: '100%',
                    height: '200%', // to be adjusted not really accurate 
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>

              {/* Section Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  {section.title}
                </h3>
                
                <p style={{ 
                  lineHeight: '1.6', 
                  opacity: 0.8,
                  marginBottom: '1rem'
                }}>
                  {section.shortDescription}
                </p>

                {/* Read More Toggle for Individual Cards */}
                <AnimatePresence>
                  {expandedCard === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ 
                        lineHeight: '1.6', 
                        opacity: 0.8,
                        marginBottom: '1rem'
                      }}>
                        {section.fullDescription}
                      </p>
                      
                      {/* Features List */}
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          color: 'var(--text-secondary)',
                          fontWeight: '600'
                        }}>
                          Key Features:
                        </h4>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.3rem'
                        }}>
                          {section.features.map((feature, idx) => (
                            <div 
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                opacity: 0.8
                              }}
                            >
                              <div style={{
                                width: '6px',
                                height: '6px',
                                background: 'var(--primary-color)',
                                borderRadius: '50%'
                              }}></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Read More/Less Button */}
                <motion.button
                  onClick={() => toggleCardExpansion(section.id)}
                  style={{
                    background: 'transparent',
                    color: 'var(--primary-color)',
                    border: '1px solid var(--primary-color)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                  whileHover={{ 
                    background: 'var(--primary-color)',
                    color: 'white'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {expandedCard === section.id ? 'Show Less' : 'Read More'}
                  {expandedCard === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            padding: '3rem',
            borderRadius: '20px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
            Ready to Start Your Journey?
          </h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join thousands of successful graduates who transformed their careers with our training programs.
          </p>
          <motion.button 
            style={{
              background: 'white',
              color: 'var(--secondary-color)',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#contact" 
              style={{
                textDecoration: 'none',
                color: 'var(--secondary-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Enroll Now
            </a>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;