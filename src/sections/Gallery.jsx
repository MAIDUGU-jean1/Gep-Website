import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

import GraduationImg from '../assets/Images/graduation.jpeg';
import StudentImg from '../assets/Images/student.jpeg';
import ShowImg from '../assets/Images/Show.jpeg';
import TeamImg from '../assets/Images/team.jpeg';
import ActImg from '../assets/Images/gallery/act.jpeg';
import CertificateAwardImg from '../assets/Images/gallery/certificate award.jpeg';
import EncouragementImg from '../assets/Images/gallery/encouragement.jpeg';
import StaffImg from '../assets/Images/gallery/staff.jpeg';
import Staff2Img from '../assets/Images/gallery/staff2.jpeg';
import Jean2Img from '../assets/Images/gallery/jean2.jpeg';
import BootcampImg from '../assets/Images/bootcamp-image.jpeg';
import LaunchingImg from '../assets/Images/lauching.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      title: 'Graduation Ceremony & Awards',
      description: 'Our graduates celebrating their hard-earned milestone and transition into the tech industry.',
      category: 'Ceremonies',
      date: '2026-05-23',
      imageUrl: GraduationImg,
    },
    {
      id: 2,
      title: 'Certificate Presentation & Honors',
      description: 'Awarding certificates of excellence and technical merit to outstanding students.',
      category: 'Ceremonies',
      date: '2026-01-15',
      imageUrl: CertificateAwardImg,
    },
    {
      id: 3,
      title: 'Hands-on Practical Coding',
      description: 'Students engaged in collaborative coding, building robust software architectures.',
      category: 'Workshops',
      date: '2025-11-10',
      imageUrl: ActImg,
    },
    {
      id: 4,
      title: 'Interactive Classroom Learning',
      description: 'Dynamic lectures and mentorship sessions on modern full-stack web technologies.',
      category: 'Classes',
      date: '2025-10-15',
      imageUrl: StudentImg,
    },
    {
      id: 5,
      title: 'Student Projects Showcase & Expo',
      description: 'Showcasing exceptional capstone applications built by our talented students.',
      category: 'Showcase',
      date: '2025-09-20',
      imageUrl: ShowImg,
    },
    {
      id: 6,
      title: 'Gift from Our ex student',
      description: 'Inspiring guidance and career mentoring from experienced industry leaders.',
      category: 'Mentorship',
      date: '2025-08-18',
      imageUrl: EncouragementImg,
    },
    {
      id: 7,
      title: 'Faculty & Academic Team',
      description: 'Our dedicated team of lecturers, engineers, and technical trainers.',
      category: 'Staff',
      date: '2025-07-12',
      imageUrl: StaffImg,
    },
    {
      id: 8,
      title: 'Instructors & Technical Staff',
      description: 'Academic staff collaborating on state-of-the-art tech curriculum standards.',
      category: 'Staff',
      date: '2025-06-25',
      imageUrl: Staff2Img,
    },
    {
      id: 10,
      title: 'Team Building & Hackathons',
      description: 'Fostering teamwork, problem-solving, and innovative hackathon sprints.',
      category: 'Activities',
      date: '2025-04-14',
      imageUrl: TeamImg,
    },
    {
      id: 11,
      title: 'Intensive Tech Bootcamp',
      description: 'Accelerated bootcamp immersions transforming beginners into industry-ready devs.',
      category: 'Workshops',
      date: '2025-03-05',
      imageUrl: BootcampImg,
    },
    {
      id: 12,
      title: 'Official Cohort Launch Event',
      description: 'Welcoming the new intake of eager tech learners to the GeP ProTech ecosystem.',
      category: 'Events',
      date: '2025-01-20',
      imageUrl: LaunchingImg,
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