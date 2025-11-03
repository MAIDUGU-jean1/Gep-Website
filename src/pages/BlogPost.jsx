import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Play, X, Image as ImageIcon, Pause } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import './css/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const { getPostById } = useBlog();
  const post = getPostById(id);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const fileUrl = import.meta.env.VITE_FILE_API_URL;


  if (!post) {
    return (
      <div className="blog-post-not-found">
        <div className="container">
          <div className="not-found-content">
            <h2>Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog" className="back-to-blog-btn">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions to check file types
  const isImageFile = (fileType) => {
    const imageTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'tiff'];
    return imageTypes.includes(fileType?.toLowerCase());
  };

  const isVideoFile = (fileType) => {
    const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp'];
    return videoTypes.includes(fileType?.toLowerCase());
  };

  // Filter only images and videos based on filetype
  const mediaFiles = post.files?.filter(file => 
    isImageFile(file.filetype) || isVideoFile(file.filetype)
  ) || [];

  const handleThumbnailClick = (index) => {
    setActiveMediaIndex(index);
    if (isVideoFile(mediaFiles[index]?.filetype)) {
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
  };

  const modalVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    enter: { scale: 0.8, opacity: 0 },
    center: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  return (
    <section className="blog-post-section">
      <div className="container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="blog-post-back"
        >
          <Link to="/blog" className="back-to-posts-btn">
            <ArrowLeft size={20} />
            Back to All Posts
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="blog-post-article"
        >
          {/* Post Header */}
          <header className="blog-post-header">
            <span className="blog-post-category">
              {post.category}
            </span>
            
            <h1 className="blog-post-title">
              {post.title}
            </h1>
            
            <div className="blog-post-meta">
              <div className="meta-item">
                <User size={20} />
                <span>By {post.admin.first_name} {post.admin.last_name}</span>
              </div>
              <div className="meta-item">
                <Calendar size={20} />
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </header>

          {/* Media Gallery */}
          {mediaFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="media-gallery"
            >
              {/* Active Media Display */}
              <div className="active-media-container">
                <div 
                  className="active-media"
                  onClick={openModal}
                >
                  {isImageFile(mediaFiles[activeMediaIndex]?.filetype) ? (
                    <img 
                      src={`${fileUrl}/${mediaFiles[activeMediaIndex]?.filepath}`} 
                      alt={mediaFiles[activeMediaIndex]?.name}
                      className="active-image"
                    />
                  ) : isVideoFile(mediaFiles[activeMediaIndex]?.filetype) ? (
                    <div className="video-container">
                      <video
                        ref={videoRef}
                        className="active-video"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoPlayback();
                        }}
                        onEnded={handleVideoEnd}
                      >
                        <source 
                          src={`${fileUrl}/${mediaFiles[activeMediaIndex]?.filepath}`} 
                          type={`video/${mediaFiles[activeMediaIndex]?.filetype}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                      {!isVideoPlaying && (
                        <div 
                          className="video-play-overlay"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoPlayback();
                          }}
                        >
                          <div className="play-button">
                            <Play size={48} />
                          </div>
                          <span>Click to play video</span>
                        </div>
                      )}
                      {isVideoPlaying && (
                        <div 
                          className="video-controls-overlay"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoPlayback();
                          }}
                        >
                          <div className="pause-button">
                            <Pause size={32} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="unknown-file-type">
                      <File size={48} />
                      <span>Unsupported file type</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {mediaFiles.length > 1 && (
                <div className="thumbnail-gallery">
                  {mediaFiles.map((media, index) => (
                    <div
                      key={index}
                      className={`thumbnail-item ${index === activeMediaIndex ? 'thumbnail-active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      {isImageFile(media.filetype) ? (
                        <img 
                          src={`${fileUrl}/${media.filepath}`} 
                          alt={media.name}
                          className="thumbnail-image"
                        />
                      ) : isVideoFile(media.filetype) ? (
                        <div className="video-thumbnail">
                          <img 
                            src={`${fileUrl}/${media.filepath}`} 
                            alt={media.name}
                            className="thumbnail-image"
                          />
                          <div className="video-thumbnail-overlay">
                            <Play size={16} />
                          </div>
                        </div>
                      ) : (
                        <div className="unknown-thumbnail">
                          <File size={20} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Post Content */}
          <div className="blog-post-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>

          {/* Media Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                variants={modalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="media-modal"
                onClick={closeModal}
              >
                <motion.div
                  variants={contentVariants}
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeModal}
                    className="modal-close-btn"
                  >
                    <X size={24} />
                  </button>

                  {isImageFile(mediaFiles[activeMediaIndex]?.filetype) ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${mediaFiles[activeMediaIndex]?.filepath}`} 
                      alt={mediaFiles[activeMediaIndex]?.name}
                      className="modal-image"
                    />
                  ) : isVideoFile(mediaFiles[activeMediaIndex]?.filetype) ? (
                    <div className="modal-video-container">
                      <video
                        ref={videoRef}
                        controls
                        autoPlay
                        className="modal-video"
                        onEnded={handleVideoEnd}
                      >
                        <source 
                          src={`http://127.0.0.1:8000/storage/${mediaFiles[activeMediaIndex]?.filepath}`} 
                          type={`video/${mediaFiles[activeMediaIndex]?.filetype}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="modal-unknown-file">
                      <File size={64} />
                      <span>Unsupported file type</span>
                    </div>
                  )}

                  {/* Media Info */}
                  <div className="modal-info">
                    {mediaFiles[activeMediaIndex]?.name} ({activeMediaIndex + 1}/{mediaFiles.length})
                  </div>

                  {/* Thumbnail Navigation in Modal */}
                  {mediaFiles.length > 1 && (
                    <div className="modal-thumbnails">
                      {mediaFiles.map((media, index) => (
                        <div
                          key={index}
                          className={`modal-thumbnail ${index === activeMediaIndex ? 'modal-thumbnail-active' : ''}`}
                          onClick={() => handleThumbnailClick(index)}
                        >
                          {isImageFile(media.filetype) ? (
                            <img 
                              src={`http://127.0.0.1:8000/storage/${media.filepath}`} 
                              alt={media.name}
                              className="modal-thumbnail-image"
                            />
                          ) : isVideoFile(media.filetype) ? (
                            <div className="modal-video-thumbnail">
                              <img 
                                src={`http://127.0.0.1:8000/storage/${media.filepath}`} 
                                alt={media.name}
                                className="modal-thumbnail-image"
                              />
                              <div className="modal-video-indicator">
                                <Play size={12} />
                              </div>
                            </div>
                          ) : (
                            <div className="modal-unknown-thumbnail">
                              <File size={16} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogPost;