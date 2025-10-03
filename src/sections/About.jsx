import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Clock } from 'lucide-react';

const About = () => {
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
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {[
            {
              icon: Target,
              title: 'Our Mission',
              description: 'To provide accessible, high-quality vocational training that bridges the gap between education and employment.'
            },
            {
              icon: Users,
              title: 'Expert Instructors',
              description: 'Learn from industry professionals with years of practical experience and teaching expertise.'
            },
            {
              icon: Award,
              title: 'Certification',
              description: 'Earn recognized certifications that validate your skills and enhance your career prospects.'
            },
            {
              icon: Clock,
              title: 'Flexible Learning',
              description: 'Study at your own pace with both full-time and part-time program options available.'
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--card-bg)',
                padding: '2.5rem',
                borderRadius: '15px',
                textAlign: 'center',
                border: '2px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                background: 'var(--primary-color)',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                <item.icon size={32} />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1rem', 
                color: 'var(--text-secondary)',
                fontWeight: '600'
              }}>
                {item.title}
              </h3>
              <p style={{ lineHeight: '1.6', opacity: 0.8 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

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
          <button style={{
            background: 'white',
            color: 'var(--secondary-color)',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            {/* Link to Enroll in the main page */}
            <a href="" style={{
              textDecoration: 'none',
              color: 'var(--secondary-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Enroll Now
            </a>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;