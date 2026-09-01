import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, ArrowRight, Layers } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

import Impression from '../assets/Images/impression.jpeg';
import GraduationImg from '../assets/Images/graduation.jpeg';
import StudentImg from '../assets/Images/student.jpeg';
import ShowImg from '../assets/Images/Show.jpeg';
import TeamImg from '../assets/Images/team.jpeg';
import ActImg from '../assets/Images/gallery/act.jpeg';
import CertificateAwardImg from '../assets/Images/gallery/certificate award.jpeg';
import EncouragementImg from '../assets/Images/gallery/encouragement.jpeg';
import StaffImg from '../assets/Images/gallery/staff.jpeg';
import Staff2Img from '../assets/Images/gallery/staff2.jpeg';
import BootcampImg from '../assets/Images/bootcamp-image.jpeg';
import LaunchingImg from '../assets/Images/lauching.jpg';

const defaultGalleryImages = [
  {
    id: 'static-1',
    title: 'Graduation Ceremony & Awards',
    description: 'Our graduates celebrating their hard-earned milestone and transition into the tech industry.',
    category: 'Ceremonies',
    date: '2026-05-23',
    images: [GraduationImg],
  },
  {
    id: 'static-2',
    title: 'Certificate Presentation & Honors',
    description: 'Awarding certificates of excellence and technical merit to outstanding students.',
    category: 'Ceremonies',
    date: '2026-01-15',
    images: [CertificateAwardImg],
  },
  {
    id: 'static-3',
    title: 'Hands-on Practical Coding',
    description: 'Students engaged in collaborative coding, building robust software architectures.',
    category: 'Workshops',
    date: '2025-11-10',
    images: [ActImg],
  },
  {
    id: 'static-4',
    title: 'Interactive Classroom Learning',
    description: 'Dynamic lectures and mentorship sessions on modern full-stack web technologies.',
    category: 'Classes',
    date: '2025-10-15',
    images: [StudentImg],
  },
  {
    id: 'static-5',
    title: 'Student Projects Showcase & Expo',
    description: 'Showcasing exceptional capstone applications built by our talented students.',
    category: 'Showcase',
    date: '2025-09-20',
    images: [ShowImg],
  },
  {
    id: 'static-6',
    title: 'Gift from Our Alumni Student',
    description: 'Inspiring guidance and career mentoring from experienced industry leaders.',
    category: 'Mentorship',
    date: '2025-08-18',
    images: [EncouragementImg],
  },
  {
    id: 'static-7',
    title: 'Faculty & Academic Team',
    description: 'Our dedicated team of lecturers, engineers, and technical trainers.',
    category: 'Staff',
    date: '2025-07-12',
    images: [StaffImg],
  },
  {
    id: 'static-8',
    title: 'Instructors & Technical Staff',
    description: 'Academic staff collaborating on state-of-the-art tech curriculum standards.',
    category: 'Staff',
    date: '2025-06-25',
    images: [Staff2Img],
  },
  {
    id: 'static-10',
    title: 'Team Building & Hackathons',
    description: 'Fostering teamwork, problem-solving, and innovative hackathon sprints.',
    category: 'Activities',
    date: '2025-04-14',
    images: [TeamImg],
  },
  {
    id: 'static-11',
    title: 'Intensive Tech Bootcamp',
    description: 'Accelerated bootcamp immersions transforming beginners into industry-ready devs.',
    category: 'Workshops',
    date: '2025-03-05',
    images: [BootcampImg],
  },
  {
    id: 'static-12',
    title: 'Official Cohort Launch Event',
    description: 'Welcoming the new intake of eager tech learners to the GeP ProTech ecosystem.',
    category: 'Events',
    date: '2025-01-20',
    images: [LaunchingImg],
  }
];

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const Gallery = () => {
  const { posts } = useBlog();
  const fileUrl = import.meta.env.VITE_FILE_API_URL || 'http://127.0.0.1:8000';

  const [startIndex, setStartIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Combine default static gallery images with dynamic Gallery posts from backend
  const galleryItems = useMemo(() => {
    if (!posts || posts.length === 0) return defaultGalleryImages;

    const backendPosts = posts
      .filter((post) => {
        const isPublic = post.target_type === 'public' || !post.target_type;
        const isGalleryCategory = post.category === 'Gallery';

        return isPublic && isGalleryCategory;
      })
      .map((post) => {
        const imageFiles = (post.files || []).filter((f) =>
          ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(
            f.filetype?.toLowerCase() || ''
          ) || (f.filepath && f.filepath.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i))
        );

        const images = imageFiles.length > 0
          ? imageFiles.map((f) => `${fileUrl}/${f.filepath}`)
          : [post.image || Impression];

        return {
          id: `backend-${post.id}`,
          title: post.title,
          description: stripHtml(post.description || post.excerpt || ''),
          category: post.category || 'Gallery',
          date: post.created_at ? post.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          images: images,
        };
      });

    return [...backendPosts, ...defaultGalleryImages];
  }, [posts, fileUrl]);

  // Display 4 cards visible at a time
  const visibleCount = 4;
  const maxIndex = Math.max(0, galleryItems.length - visibleCount);

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleItems = galleryItems.slice(startIndex, startIndex + visibleCount);

  const openLightbox = (card) => {
    setSelectedCard(card);
    setActiveImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedCard(null);
    setActiveImageIndex(0);
  };

  return (
    <section
      id="gallery"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) 0',
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 20%, var(--bg-primary) 100%)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <Image size={44} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
          <h2 className="section-title">Campus Gallery</h2>
          <p className="section-subtitle">
            Take a look at our vibrant campus life, student activities, practical sessions, and success stories.
          </p>
        </motion.div>

        {/* Carousel Slider Controls Container */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Gallery Slide"
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Gallery Slide"
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Visible 4-Item Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              padding: '0 10px'
            }}
          >
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openLightbox(item)}
                style={{
                  background: 'var(--card-bg)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'var(--primary-color)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.12)'
                }}
              >
                {/* Image */}
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  {/* Category Pill */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.8rem',
                      left: '0.8rem',
                      background: 'rgba(0,0,0,0.75)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    {item.category}
                  </span>

                  {item.images.length > 1 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.8rem',
                        right: '0.8rem',
                        background: 'var(--primary-color)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Layers size={11} /> {item.images.length}
                    </span>
                  )}
                </div>

                {/* Info Text */}
                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      marginBottom: '0.5rem',
                      color: 'var(--text-secondary)',
                      fontWeight: '600',
                      lineHeight: '1.3'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      marginBottom: '1rem',
                      opacity: 0.8,
                      lineHeight: '1.4',
                      fontSize: '0.85rem',
                      flexGrow: 1
                    }}
                  >
                    {item.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      opacity: 0.7
                    }}
                  >
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span
                      style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        padding: '2px 10px',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      View
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Full Gallery CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}
        >
          <Link
            to="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.9rem 2.2rem',
              borderRadius: '30px',
              background: 'var(--primary-color)',
              color: 'white',
              fontWeight: '700',
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.94)',
                backdropFilter: 'blur(10px)',
                zIndex: 3000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem'
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '1000px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'white'
                }}
              >
                <span
                  style={{
                    background: 'var(--primary-color)',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}
                >
                  {selectedCard.category}
                </span>
                <button
                  onClick={closeLightbox}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: 'none',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <div
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  height: '60vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {selectedCard.images.length > 1 && (
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + selectedCard.images.length) % selectedCard.images.length)}
                    style={{
                      position: 'absolute',
                      left: '10px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                <img
                  src={selectedCard.images[activeImageIndex]}
                  alt={selectedCard.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '10px'
                  }}
                />

                {selectedCard.images.length > 1 && (
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % selectedCard.images.length)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              <div style={{ textAlign: 'center', color: 'white', maxWidth: '800px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.4rem' }}>{selectedCard.title}</h3>
                <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{selectedCard.description}</p>
                {selectedCard.images.length > 1 && (
                  <div style={{ opacity: 0.6, fontSize: '0.8rem' }}>
                    Photo {activeImageIndex + 1} of {selectedCard.images.length}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;