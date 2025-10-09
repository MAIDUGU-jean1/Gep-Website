import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Graduatiion from '../../src/assets/Images/graduation.jpeg'
import Student from '../../src/assets/Images/student.jpeg'
import Show from '../../src/assets/Images/Show.jpeg'
import Team from '../../src/assets/Images/team.jpeg'
import { image } from 'framer-motion/client';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      title: 'Photoshoot 2024',
      description: 'Our latest batch of graduates celebrating their success',
      category: 'Events',
      date: '2024-01-15',
      imageUrl: Graduatiion,
    //   imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Web Development Class',
      description: 'Students working on real-world projects',
      category: 'Classes',
      date: '2024-01-10',
      imageUrl: Student,
    //   imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    // {
    //   id: 3,
    //   title: 'Industry Workshop',
    //   description: 'Guest speaker from tech industry sharing insights',
    //   category: 'Workshops',
    //   date: '2023-12-20',
    //   imageUrl: 'https://images.unsplash.com/photo-1551836026-d5c2e0c49b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    // },
    {
      id: 4,
      title: 'Student Projects Showcase',
      description: 'Display of exceptional student work',
      category: 'Showcase',
      date: '2023-12-15',
      imageUrl: Show,
    //   imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Campus Facilities',
      description: 'State-of-the-art learning environment',
      category: 'Campus',
      date: '2023-12-10',
      imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Team Building Activity',
      description: 'Students collaborating on group projects',
      category: 'Activities',
      date: '2023-11-28',
      imageUrl: Team,
    //   imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const categories = ['All', ...new Set(galleryImages.map(img => img.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section id="gallery" style={{
      padding: 'clamp(4rem, 8vw, 8rem) 0',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 20%, var(--bg-primary) 100%)'
    }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <Image size={48} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
          <h2 className="section-title">Campus Gallery</h2>
          <p className="section-subtitle">
            Take a look at our vibrant campus life, student activities, and success stories.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '0.8rem 1.5rem',
                border: `2px solid ${activeCategory === category ? 'var(--primary-color)' : 'var(--border-color)'}`,
                background: activeCategory === category ? 'var(--primary-color)' : 'transparent',
                color: activeCategory === category ? 'white' : 'var(--text-primary)',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredImages.map((image, index) => (
            <motion.div 
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(image, index)}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '15px',
                overflow: 'hidden',
                border: '2px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              whileHover={{ 
                y: -5,
                borderColor: 'var(--primary-color)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
              }}
            >
              {/* Image */}
              <div style={{
                height: '250px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {image.category}
                </div>
              </div>

              {/* Image Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  {image.title}
                </h3>
                <p style={{ 
                  marginBottom: '1rem', 
                  opacity: 0.8,
                  lineHeight: '1.5',
                  fontSize: '0.9rem'
                }}>
                  {image.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  opacity: 0.7
                }}>
                  <span>{new Date(image.date).toLocaleDateString()}</span>
                  <span style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '500'
                  }}>
                    View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                padding: '1rem'
              }}
            >
              <button 
                onClick={closeLightbox}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2001
                }}
              >
                <X size={24} />
              </button>

              <button 
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2001
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button 
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '2rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 2001
                }}
              >
                <ChevronRight size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '70vh',
                  margin: '0 auto 2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: '10px'
                }}>
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </div>
                
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '600' }}>
                    {selectedImage.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                    {selectedImage.description}
                  </p>
                  <p style={{ opacity: 0.7, fontSize: '1rem' }}>
                    {selectedImage.category} • {new Date(selectedImage.date).toLocaleDateString()}
                  </p>
                  <p style={{ marginTop: '1rem', opacity: 0.6, fontSize: '1rem' }}>
                    {currentIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;