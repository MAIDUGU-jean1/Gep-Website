import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, Sparkles, Calendar, Layers, Eye } from 'lucide-react';
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

// Static Default Gallery Images (Preserved)
const defaultGalleryImages = [
  {
    id: 'static-1',
    title: 'Graduation Ceremony & Awards',
    description: 'Our graduates celebrating their hard-earned milestone and transition into the tech industry.',
    category: 'Ceremonies',
    date: '2026-05-23',
    images: [GraduationImg],
    isBackend: false,
  },
  {
    id: 'static-2',
    title: 'Certificate Presentation & Honors',
    description: 'Awarding certificates of excellence and technical merit to outstanding students.',
    category: 'Ceremonies',
    date: '2026-01-15',
    images: [CertificateAwardImg],
    isBackend: false,
  },
  {
    id: 'static-3',
    title: 'Hands-on Practical Coding',
    description: 'Students engaged in collaborative coding, building robust software architectures.',
    category: 'Workshops',
    date: '2025-11-10',
    images: [ActImg],
    isBackend: false,
  },
  {
    id: 'static-4',
    title: 'Interactive Classroom Learning',
    description: 'Dynamic lectures and mentorship sessions on modern full-stack web technologies.',
    category: 'Classes',
    date: '2025-10-15',
    images: [StudentImg],
    isBackend: false,
  },
  {
    id: 'static-5',
    title: 'Student Projects Showcase & Expo',
    description: 'Showcasing exceptional capstone applications built by our talented students.',
    category: 'Showcase',
    date: '2025-09-20',
    images: [ShowImg],
    isBackend: false,
  },
  {
    id: 'static-6',
    title: 'Gift from Our Alumni Student',
    description: 'Inspiring guidance and career mentoring from experienced industry leaders.',
    category: 'Mentorship',
    date: '2025-08-18',
    images: [EncouragementImg],
    isBackend: false,
  },
  {
    id: 'static-7',
    title: 'Faculty & Academic Team',
    description: 'Our dedicated team of lecturers, engineers, and technical trainers.',
    category: 'Staff',
    date: '2025-07-12',
    images: [StaffImg],
    isBackend: false,
  },
  {
    id: 'static-8',
    title: 'Instructors & Technical Staff',
    description: 'Academic staff collaborating on state-of-the-art tech curriculum standards.',
    category: 'Staff',
    date: '2025-06-25',
    images: [Staff2Img],
    isBackend: false,
  },
  {
    id: 'static-10',
    title: 'Team Building & Hackathons',
    description: 'Fostering teamwork, problem-solving, and innovative hackathon sprints.',
    category: 'Activities',
    date: '2025-04-14',
    images: [TeamImg],
    isBackend: false,
  },
  {
    id: 'static-11',
    title: 'Intensive Tech Bootcamp',
    description: 'Accelerated bootcamp immersions transforming beginners into industry-ready devs.',
    category: 'Workshops',
    date: '2025-03-05',
    images: [BootcampImg],
    isBackend: false,
  },
  {
    id: 'static-12',
    title: 'Official Cohort Launch Event',
    description: 'Welcoming the new intake of eager tech learners to the GeP ProTech ecosystem.',
    category: 'Events',
    date: '2025-01-20',
    images: [LaunchingImg],
    isBackend: false,
  }
];

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const GalleryPage = () => {
  const { posts } = useBlog();
  const fileUrl = import.meta.env.VITE_FILE_API_URL || 'http://127.0.0.1:8000';

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Combine static gallery items with dynamic Gallery / Public Image posts from backend
  const allGalleryItems = useMemo(() => {
    if (!posts || posts.length === 0) return defaultGalleryImages;

    const backendGalleryPosts = posts
      .filter((post) => {
        const isPublic = post.target_type === 'public' || !post.target_type;
        const isGalleryCategory = post.category === 'Gallery';

        // Include post if category is Gallery OR if it contains image files
        const hasImages = post.files && post.files.some((f) =>
          ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(
            f.filetype?.toLowerCase() || ''
          ) || (f.filepath && f.filepath.match(/\.(png|jpg|jpeg|webp|gif|svg)$/i))
        );

        return isPublic && (isGalleryCategory || hasImages);
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
          isBackend: true,
        };
      });

    return [...backendGalleryPosts, ...defaultGalleryImages];
  }, [posts, fileUrl]);

  const categories = useMemo(() => {
    const set = new Set(allGalleryItems.map((item) => item.category));
    return ['All', ...Array.from(set)];
  }, [allGalleryItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return allGalleryItems;
    return allGalleryItems.filter((item) => item.category === activeCategory);
  }, [allGalleryItems, activeCategory]);

  const openLightbox = (card) => {
    setSelectedCard(card);
    setActiveImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedCard(null);
    setActiveImageIndex(0);
  };

  const nextImageInCard = (e) => {
    if (e) e.stopPropagation();
    if (!selectedCard) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedCard.images.length);
  };

  const prevImageInCard = (e) => {
    if (e) e.stopPropagation();
    if (!selectedCard) return;
    setActiveImageIndex((prev) => (prev - 1 + selectedCard.images.length) % selectedCard.images.length);
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* HERO SECTION WITH WATERMARK BACKGROUND */}
      <section
        style={{
          position: 'relative',
          padding: '8rem 1rem 5rem',
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 40%, var(--bg-primary) 100%)',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Fullscreen Impression Watermark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${Impression})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--accent-color)',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={16} /> Campus Life & Student Showcase
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1.2rem',
              color: 'var(--text-secondary)'
            }}
          >
            Explore Our Campus <span style={{ color: 'var(--accent-color)' }}>Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              opacity: 0.9,
              maxWidth: '750px',
              margin: '0 auto 2.5rem',
              lineHeight: '1.6'
            }}
          >
            Discover our vibrant academic journey, practical workshops, team bootcamps, student award ceremonies, and memorable campus highlights.
          </motion.p>
        </div>
      </section>

      {/* GALLERY CONTENT SECTION */}
      <section style={{ padding: '4rem 1rem 6rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* CATEGORY FILTER TABS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.8rem',
              marginBottom: '3.5rem'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '30px',
                  border: activeCategory === cat ? '2px solid var(--accent-color)' : '2px solid var(--border-color)',
                  background: activeCategory === cat ? 'var(--primary-color)' : 'var(--card-bg)',
                  color: activeCategory === cat ? '#ffffff' : 'var(--text-primary)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat ? '0 8px 20px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* GALLERY GRID */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => openLightbox(item)}
                style={{
                  background: 'var(--card-bg)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                whileHover={{
                  y: -8,
                  borderColor: 'var(--primary-color)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.15)'
                }}
              >
                {/* Image Container */}
                <div style={{ height: '230px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />

                  {/* Category Pill */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(5px)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Multiple Photos Badge */}
                  {item.images.length > 1 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'var(--primary-color)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Layers size={12} /> {item.images.length} Photos
                    </span>
                  )}
                </div>

                {/* Card Text Info */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      marginBottom: '0.6rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.3'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      lineHeight: '1.5',
                      marginBottom: '1.2rem',
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
                      opacity: 0.7,
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '0.8rem'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span
                      style={{
                        color: 'var(--accent-color)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={14} /> View
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FULLSCREEN MULTI-IMAGE LIGHTBOX MODAL */}
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
            {/* Top Bar */}
            <div
              style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white',
                zIndex: 3001
              }}
            >
              <div>
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
                <span style={{ marginLeft: '10px', opacity: 0.7, fontSize: '0.85rem' }}>
                  {new Date(selectedCard.date).toLocaleDateString()}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: 'white',
                  width: '42px',
                  height: '42px',
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

            {/* Center Image Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1000px',
                height: '62vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '1rem 0'
              }}
            >
              {/* Left Arrow for Multi-Images */}
              {selectedCard.images.length > 1 && (
                <button
                  onClick={prevImageInCard}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 3002
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedCard.images[activeImageIndex]}
                alt={selectedCard.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
              />

              {/* Right Arrow for Multi-Images */}
              {selectedCard.images.length > 1 && (
                <button
                  onClick={nextImageInCard}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 3002
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Info & Thumbnail Strip */}
            <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                {selectedCard.title}
              </h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem', lineHeight: '1.4' }}>
                {selectedCard.description}
              </p>

              {/* Thumbnails list if multiple images exist */}
              {selectedCard.images.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  {selectedCard.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Thumbnail"
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: activeImageIndex === idx ? '2px solid var(--accent-color)' : '2px solid transparent',
                        opacity: activeImageIndex === idx ? 1 : 0.5,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              )}

              {selectedCard.images.length > 1 && (
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  Photo {activeImageIndex + 1} of {selectedCard.images.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
