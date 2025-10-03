import React from 'react';
import { motion } from 'framer-motion';
import { tutors } from '../data/courses';
import { Star, Award, Users, BookOpen } from 'lucide-react';

const Tutors = () => {
  return (
    <section id="tutors" style={{
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
          <h2 className="section-title">Meet Our Expert Tutors</h2>
          <p className="section-subtitle">
            Learn from industry professionals with years of experience and passion for teaching.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '15px',
                overflow: 'hidden',
                border: '2px solid var(--border-color)',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              {/* Tutor Image */}
              <div style={{
                height: '250px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={tutor.image} 
                  alt={tutor.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {tutor.specialization}
                </div>
              </div>

              {/* Tutor Info */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  {tutor.name}
                </h3>
                <p style={{ 
                  marginBottom: '1rem', 
                  opacity: 0.8,
                  fontSize: '0.9rem'
                }}>
                  {tutor.specialization} • {tutor.experience} experience
                </p>
                <p style={{ 
                  marginBottom: '1.5rem', 
                  opacity: 0.8,
                  lineHeight: '1.6',
                  fontSize: '0.9rem'
                }}>
                  {tutor.bio}
                </p>
                
                {/* Ratings */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      color="var(--primary-color)" 
                      fill="var(--primary-color)" 
                    />
                  ))}
                  <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>(4.9/5)</span>
                </div>

                <button className="btn-secondary" style={{ 
                  padding: '8px 20px', 
                  fontSize: '0.9rem',
                  width: '100%'
                }}>
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            padding: '3rem',
            borderRadius: '20px',
            color: 'white'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { icon: Users, number: '50+', label: 'Expert Tutors' },
              { icon: Award, number: '10K+', label: 'Students Trained' },
              { icon: Star, number: '4.9', label: 'Average Rating' },
              { icon: BookOpen, number: '95%', label: 'Success Rate' }
            ].map((item, index) => (
              <div key={index}>
                <item.icon size={40} color="white" style={{ marginBottom: '1rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {item.number}
                </div>
                <div style={{ opacity: 0.9 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tutors;