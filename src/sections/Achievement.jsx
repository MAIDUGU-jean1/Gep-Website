import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Trophy, Award, Star, Quote, Calendar, Users, GraduationCap, X } from 'lucide-react';
import award from '../assets/Videos/award.mp4';

// Data for achievements and testimonials
const achievementsData = {
  ceremonies: [
    {
      id: 1,
      title: '2024 Graduation Ceremony',
      description: 'Celebrating our latest batch of successful graduates',
      date: '2024-01-15',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      awards: ['Best Overall Student', 'Most Innovative Project', 'Academic Excellence']
    },
    {
      id: 2,
      title: 'Graduation and awards ceremony for 9&8 batch',
      description: 'Honoring outstanding student achievements and project showcases',
      date: '2023-12-10',
      videoUrl: award,
    //   videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      awards: ['Best Web App', 'Most Creative Design', 'Technical Excellence']
    },
    {
      id: 3,
      title: 'Industry Partnership Awards',
      description: 'Recognizing outstanding industry collaborations',
      date: '2023-11-20',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551836026-d5c2e0c49b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      awards: ['Best Industry Project', 'Outstanding Partnership', 'Innovation Award']
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      course: 'Web Development',
      graduation: '2023',
      currentRole: 'Frontend Developer at TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'Gep Protech transformed my career. The hands-on projects and expert guidance prepared me perfectly for the tech industry.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      course: 'Data Science',
      graduation: '2023',
      currentRole: 'Data Analyst at DataWorks',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'The practical approach to learning and industry-relevant curriculum gave me the confidence to excel in my data science career.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      course: 'Graphic Design',
      graduation: '2023',
      currentRole: 'UI/UX Designer at CreativeStudio',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'The mentorship and portfolio-building opportunities at Gep Protech were invaluable. I landed my dream job within weeks of graduating.',
      rating: 5
    },
    {
      id: 4,
      name: 'David Thompson',
      course: 'Digital Marketing',
      graduation: '2023',
      currentRole: 'Marketing Specialist at GrowthAgency',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'The real-world marketing campaigns we worked on gave me practical experience that directly translated to my current role.',
      rating: 5
    }
  ],
  awards: [
    {
      id: 1,
      title: 'Excellence in Vocational Education',
      organization: 'National Education Board',
      year: '2024',
      description: 'Recognized for outstanding contribution to vocational training and skill development',
      icon: Trophy
    },
    {
      id: 2,
      title: 'Best Tech Training Institute',
      organization: 'Tech Innovation Awards',
      year: '2023',
      description: 'Awarded for innovative curriculum and exceptional student outcomes in technology education',
      icon: Award
    },
    {
      id: 3,
      title: 'Industry Partnership Excellence',
      organization: 'Business Education Council',
      year: '2023',
      description: 'Recognized for outstanding collaboration with industry partners and job placement success',
      icon: GraduationCap
    }
  ]
};

const Achievements = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('ceremonies');

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="achievements" style={{
      padding: 'clamp(4rem, 8vw, 8rem) 0',
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-color) 50%, var(--bg-primary) 100%)'
    }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <Trophy size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          <h2 className="section-title">Achievements & Testimonials</h2>
          <p className="section-subtitle">
            Celebrating our students' success stories, memorable ceremonies, and institutional achievements
          </p>
        </motion.div>

        {/* Tab Navigation */}
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
          {[
            { key: 'ceremonies', label: 'Ceremonies & Events', icon: Calendar },
            { key: 'testimonials', label: 'Student Stories', icon: Users },
            { key: 'awards', label: 'Our Awards', icon: Trophy }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '1rem 2rem',
                border: `2px solid ${activeTab === tab.key ? 'var(--primary-color)' : 'var(--border-color)'}`,
                background: activeTab === tab.key ? 'var(--primary-color)' : 'transparent',
                color: activeTab === tab.key ? 'white' : 'var(--text-primary)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Ceremonies & Events Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'ceremonies' && (
            <motion.div
              key="ceremonies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {achievementsData.ceremonies.map((ceremony, index) => (
                  <motion.div
                    key={ceremony.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      background: 'var(--card-bg)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      border: '2px solid var(--border-color)',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ 
                      y: -5,
                      borderColor: 'var(--primary-color)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Video Thumbnail */}
                    <div 
                      style={{
                        height: '200px',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => openVideo(ceremony)}
                    >
                      <img 
                        src={ceremony.thumbnail} 
                        alt={ceremony.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.3s ease'
                      }}>
                        <div style={{
                          background: 'rgba(0,0,0,0.7)',
                          borderRadius: '50%',
                          padding: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Play size={30} color="white" fill="white" />
                        </div>
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'var(--primary-color)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        <Calendar size={12} style={{ marginRight: '5px', display: 'inline' }} />
                        {new Date(ceremony.date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Ceremony Info */}
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{
                        fontSize: '1.3rem',
                        marginBottom: '0.5rem',
                        color: 'var(--text-secondary)',
                        fontWeight: '600'
                      }}>
                        {ceremony.title}
                      </h3>
                      <p style={{ 
                        marginBottom: '1rem', 
                        opacity: 0.8,
                        lineHeight: '1.5'
                      }}>
                        {ceremony.description}
                      </p>

                      {/* Awards Presented */}
                      <div>
                        <div style={{ 
                          fontSize: '0.9rem', 
                          fontWeight: '600', 
                          marginBottom: '0.5rem',
                          color: 'var(--text-secondary)'
                        }}>
                          Awards Presented:
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.3rem'
                        }}>
                          {ceremony.awards.map((award, idx) => (
                            <div 
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.8rem',
                                opacity: 0.8
                              }}
                            >
                              <Trophy size={12} color="var(--primary-color)" />
                              {award}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {achievementsData.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      background: 'var(--card-bg)',
                      borderRadius: '15px',
                      padding: '2rem',
                      border: '2px solid var(--border-color)',
                      position: 'relative'
                    }}
                    whileHover={{ 
                      y: -5,
                      borderColor: 'var(--primary-color)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Quote Icon */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      opacity: 0.1
                    }}>
                      <Quote size={40} color="var(--primary-color)" />
                    </div>

                    {/* Student Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <h4 style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          color: 'var(--text-secondary)',
                          marginBottom: '0.2rem'
                        }}>
                          {testimonial.name}
                        </h4>
                        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.2rem' }}>
                          {testimonial.course} • {testimonial.graduation}
                        </p>
                        <p style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: '500' }}>
                          {testimonial.currentRole}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div style={{
                      display: 'flex',
                      gap: '0.2rem',
                      marginBottom: '1rem'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          color="var(--primary-color)"
                          fill={i < testimonial.rating ? "var(--primary-color)" : "none"}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote style={{
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      opacity: 0.9,
                      fontStyle: 'italic',
                      position: 'relative'
                    }}>
                      "{testimonial.quote}"
                    </blockquote>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Awards Tab */}
          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {achievementsData.awards.map((award, index) => (
                  <motion.div
                    key={award.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      background: 'var(--card-bg)',
                      borderRadius: '15px',
                      padding: '2rem',
                      border: '2px solid var(--border-color)',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                    whileHover={{ 
                      y: -5,
                      borderColor: 'var(--primary-color)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Award Icon */}
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
                      <award.icon size={32} />
                    </div>

                    <h3 style={{
                      fontSize: '1.3rem',
                      marginBottom: '0.5rem',
                      color: 'var(--text-secondary)',
                      fontWeight: '600'
                    }}>
                      {award.title}
                    </h3>

                    <div style={{
                      fontSize: '0.9rem',
                      color: 'var(--primary-color)',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      {award.organization} • {award.year}
                    </div>

                    <p style={{
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      opacity: 0.8
                    }}>
                      {award.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
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
              onClick={closeVideo}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  width: 'clamp(300px, 90vw, 800px)',
                  maxHeight: '90vh',
                  background: 'var(--card-bg)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={closeVideo}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.7)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    zIndex: 2001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={20} />
                </button>

                {/* Video Player */}
                <div style={{
                  width: '100%',
                  height: '0',
                  paddingBottom: '56.25%',
                  position: 'relative'
                }}>
                  <video 
                    controls 
                    autoPlay
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video Info */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontWeight: '600'
                  }}>
                    {selectedVideo.title}
                  </h3>
                  <p style={{ 
                    opacity: 0.8,
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {selectedVideo.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    opacity: 0.7
                  }}>
                    <Calendar size={16} />
                    {new Date(selectedVideo.date).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Achievements;