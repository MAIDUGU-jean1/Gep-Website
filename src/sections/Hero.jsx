import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Award, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '80px',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="hero-grid">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ order: 2 }} 
            className="mobile-order-2"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'inline-block'
              }}>
                Professional Training
              </div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: 'var(--text-secondary)'
            }} className="mobile-center">
              Transform Your Career with{' '}
              <span style={{ color: 'var(--primary-color)' }}>Gep Protech</span>
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              opacity: 0.9,
              maxWidth: '600px'
            }}>
              Master in-demand skills with our comprehensive vocational training programs. 
              Get hands-on experience and launch your career in tech, design, and business.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <button className="btn-primary">
                Explore Courses
              </button>
              <button className="btn-secondary" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Play size={20} />
                Watch Intro
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: Users, number: '2K+', label: 'Students Trained' },
                { icon: Award, number: '50+', label: 'Certified Courses' },
                { icon: Clock, number: '98%', label: 'Success Rate' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{ textAlign: 'center' }}
                >
                  <item.icon size={32} color="var(--primary-color)" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                    {item.number}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '2px solid var(--primary-color)',
              order: 1,
              position: 'relative',
              overflow: 'hidden'
            }} 
            className="mobile-order-1"
          >
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <Play size={60} color="white" fill="white" style={{ marginBottom: '1rem' }} />
                <div>Student Success Stories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .mobile-order-1 { order: 2 !important; }
          .mobile-order-2 { order: 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;