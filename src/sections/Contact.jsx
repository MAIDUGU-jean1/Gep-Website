import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
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
            Have questions? Reach out to us directly via WhatsApp for quick assistance.
          </p>
        </motion.div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'start',
          maxWidth: '800px',
          margin: '0 auto'
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
                  info:'ENS Street Bambili, Near Psalms one city'
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  info: '+237 674 386 778\n+237 682 090 879'
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  info: 'info@gepprotech.com'
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  info: 'Monday - Friday \nSaturday: 9:00 AM - 6:00 PM'
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
          </motion.div>
          
          {/* WhatsApp Quick Action - Only Contact Method */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <h4 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
              Quick WhatsApp Message
            </h4>
            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
              Prefer to message us directly on WhatsApp? Click below to start a conversation.
            </p>
            <motion.button
              onClick={() => window.open('https://wa.me/237682090879', '_blank')}
              style={{
                background: 'white',
                color: '#25D366',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
              </svg>
              Message on WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;