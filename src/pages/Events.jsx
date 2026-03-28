import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Users, Filter, ChevronRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './css/Events.css';

const Events = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    // Event categories
    const categories = ['All', 'Workshops', 'Training', 'Webinars', 'Networking', 'Meetups'];

    // Events data
    const events = [
        {
            id: 1,
            title: 'GEP Bootcamp 2026',
            description: 'An intensive 5-day bootcamp covering AI, Design, Cybersecurity, and Project Management. Learn from industry experts and build real projects.',
            startDate: 'March 31, 2026',
            endDate: 'April 4, 2026',
            location: 'GEP Office, Psalm One City',
            category: 'Workshops',
            registered: 25,
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
            link: '/bootcamp'
        },
        {
            id: 2,
            title: 'Launching of 13th Batch',
            description: 'Join us for the official launch of our 12th batch! Discover our programs, meet instructors, and learn about scholarship opportunities.',
            startDate: 'April 11, 2026',
            endDate: 'April 11, 2026',
            location: 'GEP Office, Psalm One City',
            category: 'Training',
            registered: 42,
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
            link: '/enroll'
        },
        // {
        //   id: 3,
        //   title: 'Web Development Masterclass',
        //   description: 'A comprehensive webinar on modern web development technologies including React, Node.js, and cloud deployment strategies.',
        //   startDate: 'April 15, 2026',
        //   endDate: 'April 15, 2026',
        //   location: 'Online (Zoom)',
        //   category: 'Webinars',
        //   registered: 78,
        //   image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600',
        //   link: '#'
        // },
        // {
        //   id: 4,
        //   title: 'Tech Networking Night',
        //   description: 'Connect with fellow tech enthusiasts, industry professionals, and potential collaborators in a relaxed networking environment.',
        //   startDate: 'April 20, 2026',
        //   endDate: 'April 20, 2026',
        //   location: 'GEP Office, Psalm One City',
        //   category: 'Networking',
        //   registered: 35,
        //   image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
        //   link: '#'
        // },
        // {
        //   id: 5,
        //   title: 'AI & Machine Learning Workshop',
        //   description: 'Hands-on workshop covering AI fundamentals, machine learning algorithms, and practical applications in business.',
        //   startDate: 'April 25, 2026',
        //   endDate: 'April 26, 2026',
        //   location: 'GEP Office, Psalm One City',
        //   category: 'Workshops',
        //   registered: 30,
        //   image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
        //   link: '#'
        // },
        // {
        //   id: 6,
        //   title: 'Mobile App Development Training',
        //   description: 'Learn to build cross-platform mobile applications using React Native and Flutter frameworks.',
        //   startDate: 'May 5, 2026',
        //   endDate: 'May 9, 2026',
        //   location: 'GEP Office, Psalm One City',
        //   category: 'Training',
        //   registered: 22,
        //   image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
        //   link: '#'
        // },
        // {
        //   id: 7,
        //   title: 'Cybersecurity Essentials Webinar',
        //   description: 'Understand cybersecurity threats, protection strategies, and best practices for securing your digital assets.',
        //   startDate: 'May 10, 2026',
        //   endDate: 'May 10, 2026',
        //   location: 'Online (Zoom)',
        //   category: 'Webinars',
        //   registered: 65,
        //   image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
        //   link: '#'
        // },
        // {
        //   id: 8,
        //   title: 'Women in Tech Meetup',
        //   description: 'A supportive community meetup for women in technology to share experiences, mentorship, and career growth opportunities.',
        //   startDate: 'May 15, 2026',
        //   endDate: 'May 15, 2026',
        //   location: 'GEP Office, Psalm One City',
        //   category: 'Meetups',
        //   registered: 48,
        //   image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600',
        //   link: '#'
        // }
    ];

    // Filter events based on search and category
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = activeCategory === 'All' || event.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="events-page">
            {/* Hero Section */}
            <section className="events-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-main"
                    >
                        <h1 className="hero-title">Our Events</h1>
                        <p className="hero-description">
                            Discover workshops, training sessions, webinars, and networking opportunities
                            designed to accelerate your tech journey. Join our community and learn from industry experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="events-search-section">
                <div className="container">
                    <div className="search-filter-wrapper">
                        {/* Search Bar */}
                        <motion.div
                            className="search-bar"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search events by name, location, topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </motion.div>

                        {/* Category Filters */}
                        <motion.div
                            className="category-filters"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Filter size={18} />
                            <div className="filter-buttons">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Events Grid Section */}
            <section className="events-grid-section">
                <div className="container">
                    {filteredEvents.length > 0 ? (
                        <div className="events-grid">
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="event-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="event-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="event-category">
                                            <Tag size={14} />
                                            <span>{event.category}</span>
                                        </div>
                                    </div>
                                    <div className="event-content">
                                        <div className="event-date">
                                            <Calendar size={16} />
                                            <span>{event.startDate}</span>
                                            {event.endDate !== event.startDate && (
                                                <>
                                                    <span className="date-separator">-</span>
                                                    <span>{event.endDate}</span>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="event-title">{event.title}</h3>
                                        <p className="event-description">{event.description}</p>
                                        <div className="event-location">
                                            <MapPin size={16} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="event-stats">
                                            <div className="stat">
                                                <Users size={16} />
                                                <span>{event.registered} Registered</span>
                                            </div>
                                        </div>
                                        <div className="event-actions">
                                            <Link to={event.link} className="btn-view">
                                                View Details
                                                <ChevronRight size={16} />
                                            </Link>
                                            <Link to="/enroll" className="btn-register">
                                                Register Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="no-events"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Search size={60} />
                            <h3>No events found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Events;
