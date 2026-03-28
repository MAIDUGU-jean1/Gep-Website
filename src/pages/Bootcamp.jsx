import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle, ChevronDown, ChevronUp, ShoppingBag, Star, Zap, Award, BookOpen, Code, Palette, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './css/Bootcamp.css';

const Bootcamp = () => {
    const [activeDay, setActiveDay] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    // Bootcamp dates
    const startDate = new Date('2026-03-31');
    const endDate = new Date('2026-04-04');

    // Program schedule
    const programSchedule = [
        {
            day: 1,
            date: 'March 31, 2026',
            theme: 'Decode the Tech World',
            topic: 'AI For Everyone',
            objectives: [
                'Understand AI fundamentals and machine learning concepts',
                'Explore real-world AI applications across industries',
                'Learn about ChatGPT, generative AI, and future trends',
                'Hands-on intro to AI tools and platforms'
            ],
            speaker: 'Engr. Selamo Allen',
            icon: <Zap size={24} />
        },
        {
            day: 2,
            date: 'April 1, 2026',
            theme: 'Think Like a Product Builder',
            topic: 'Design & Marketing Strategies',
            objectives: [
                'Master UI/UX design principles and Figma basics',
                'Learn product thinking and user-centered design',
                'Digital marketing strategies and social media growth',
                'Build a complete product mockup'
            ],
            speaker: 'Engr. Fien Docila',
            icon: <Palette size={24} />
        },
        {
            day: 3,
            date: 'April 2, 2026',
            theme: 'Build Day One',
            topic: 'Cybersecurity + Technical & Non-Technical Tracks',
            objectives: [
                'Cybersecurity fundamentals and threat awareness',
                'Choose your track: Web Dev, Mobile, or Data',
                'Start building your first project',
                'Learn version control with Git & GitHub'
            ],
            speaker: 'Engr. Steph Bryan',
            icon: <BookOpen size={24} />
        },
        {
            day: 4,
            date: 'April 3, 2026',
            theme: 'Build Day Two',
            topic: 'Project Management + Soft Skills + Final Build',
            objectives: [
                'Agile methodology and project management basics',
                'Communication and teamwork skills workshop',
                'Complete your project with mentor guidance',
                'Prepare your demo presentation'
            ],
            speaker: 'Engr. Elvis Ejahmalle',
            icon: <Code size={24} />
        },
        {
            day: 5,
            date: 'April 4, 2026',
            theme: 'Demo Day',
            topic: 'Present · Celebrate · Convert',
            objectives: [
                'Present your project to judges and peers',
                'Network with industry professionals',
                'Receive certificates and awards',
                'Learn next steps for your tech journey'
            ],
            speaker: 'Engr. Ngulefac Terence',
            icon: <Award size={24} />
        }
    ];

    // Why join advantages
    const advantages = [
        {
            icon: <BookOpen size={40} />,
            title: 'Learn from Experts',
            description: 'Get hands-on training from industry professionals with years of real-world experience.'
        },
        // {
        //     icon: <Award size={40} />,
        //     title: 'Earn Certificates',
        //     description: 'Receive recognized certificates upon completion to boost your career prospects.'
        // },
        {
            icon: <Users size={40} />,
            title: 'Network & Connect',
            description: 'Join a community of like-minded learners and build valuable professional connections.'
        },
        {
            icon: <Zap size={40} />,
            title: 'Lead the Future',
            description: 'Gain skills that position you as a leader in the tech industry.'
        }
    ];

    // Swag items
    const swagItems = [
        {
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
            title: 'GEP Bootcamp T-Shirt',
            price: '5,000 FCFA'
        },
        {
            image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400',
            title: 'GEP Brand Cap',
            price: '3,500 FCFA'
        },
        {
            image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400',
            title: 'GEP Premium Pen Set',
            price: '2,000 FCFA'
        },
        {
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            title: 'GEP Notebook',
            price: '2,500 FCFA'
        }
    ];

    // FAQ data
    const faqs = [
        {
            question: 'Is the bootcamp really free?',
            answer: 'Yes! The GEP Bootcamp 2026 is completely free for all participants. We believe in making quality tech education accessible to everyone.'
        },
        {
            question: 'Who can attend the bootcamp?',
            answer: 'Anyone interested in learning tech skills! Whether you\'re a beginner or have some experience, our bootcamp is designed to help you grow.'
        },
        {
            question: 'What do I need to bring?',
            answer: 'Just bring your laptop and enthusiasm! We\'ll provide all the learning materials, resources, and support you need.'
        },
        // {
        //     question: 'Will I get a certificate?',
        //     answer: 'Absolutely! All participants who complete the bootcamp will receive a certificate of completion from GEP Protech Academy.'
        // },
        {
            question: 'How do I register?',
            answer: 'Click the "Register Now" button and fill out the enrollment form. It\'s quick and easy!'
        }
    ];

    // Stats
    const stats = [
        { number: '25+', label: 'Registered' },
        // { number: '1', label: 'Week' },
        { number: '5', label: 'Days' },
        { number: '100%', label: 'Free' }
    ];

    return (
        <div className="bootcamp-page">
            {/* Hero Section */}
            <section className="bootcamp-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-main"
                    >
                        {/* Logo */}
                        <div className="hero-logo">
                            <img src="/src/assets/Images/logo1.png" alt="GEP Protech" />
                        </div>

                        {/* Date with Icon */}
                        <div className="hero-date">
                            <Calendar size={20} />
                            <span>March 31 - April 4, 2026</span>
                        </div>

                        {/* Title */}
                        <h1 className="hero-title">Bootcamp 2026</h1>

                        {/* Learn Earn Lead */}
                        <div className="hero-tagline">
                            <span className="tagline-item learn">Learn</span>
                            <span className="tagline-item earn">Earn</span>
                            <span className="tagline-item lead">Lead</span>
                        </div>

                        {/* Description */}
                        <p className="hero-description">
                            Join our intensive 5-day bootcamp and transform your tech skills.
                            Learn from industry experts, build real projects, and kickstart your career in technology.
                        </p>

                        {/* Buttons */}
                        <div className="hero-buttons">
                            <Link to="/enroll" className="btn-primary">
                                Register Now
                            </Link>
                            <a href="/events" className="btn-secondary">
                                Other Events
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="stat-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                >
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Free Badge */}
                        <motion.div
                            className="free-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Star size={20} />
                            <span>Completely Free!</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="why-join-section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Why Join Our Bootcamp?
                    </motion.h2>
                    <div className="advantages-grid">
                        {advantages.map((advantage, index) => (
                            <motion.div
                                key={index}
                                className="advantage-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="advantage-icon">{advantage.icon}</div>
                                <h3>{advantage.title}</h3>
                                <p>{advantage.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Section */}
            <section id="program" className="program-section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Program Schedule
                    </motion.h2>
                    <motion.p
                        className="program-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        March 31 - April 4, 2026
                    </motion.p>

                    <div className="program-timeline">
                        {programSchedule.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`program-card ${activeDay === index ? 'active' : ''}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setActiveDay(index)}
                            >
                                <div className="program-card-header">
                                    <div className="day-badge">
                                        <span className="day-number">Day {item.day}</span>
                                        <span className="day-date">{item.date}</span>
                                    </div>
                                    <div className="program-icon">{item.icon}</div>
                                </div>
                                <div className="program-card-body">
                                    <div className="program-theme">{item.theme}</div>
                                    <h3 className="program-topic">{item.topic}</h3>
                                    <div className="program-objectives">
                                        <h4>Objectives:</h4>
                                        <ul>
                                            {item.objectives.map((obj, i) => (
                                                <li key={i}>{obj}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="program-speaker">
                                        <Users size={16} />
                                        <span>{item.speaker}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Swag Section */}
            <section className="swag-section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <ShoppingBag size={40} />
                        Get Your GEP Swag
                    </motion.h2>
                    <motion.p
                        className="swag-subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Show your GEP pride with our exclusive merchandise
                    </motion.p>

                    <div className="swag-grid">
                        {swagItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="swag-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="swag-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="swag-info">
                                    <h3>{item.title}</h3>
                                    <span className="swag-price">{item.price}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bootcamp-about">
                <div className="container">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>About GEP Bootcamp 2026</h2>
                        <p>
                            The <strong>GEP Protech Academy Bootcamp 2026</strong> is more than just a learning event—it's a
                            <strong> transformative experience</strong> designed to empower the next generation of tech leaders.
                        </p>
                        <p>
                            Over <strong>5 intensive days</strong>, you'll dive deep into web development, from fundamentals to
                            advanced concepts. Our expert instructors will guide you through <strong>hands-on projects</strong>,
                            real-world scenarios, and industry best practices.
                        </p>
                        <p>
                            <strong>Best of all? It's completely FREE!</strong> We believe that financial constraints should never
                            be a barrier to quality education. This is our commitment to building a stronger tech community.
                        </p>
                        <div className="about-highlights">
                            <div className="highlight-item">
                                <CheckCircle size={24} />
                                <span>100% Free Participation</span>
                            </div>
                            {/* <div className="highlight-item">
                                <CheckCircle size={24} />
                                <span>Certificate of Completion</span>
                            </div> */}
                            <div className="highlight-item">
                                <CheckCircle size={24} />
                                <span>Hands-on Projects</span>
                            </div>
                            <div className="highlight-item">
                                <CheckCircle size={24} />
                                <span>Expert Mentorship</span>
                            </div>
                        </div>
                        <Link to="/enroll" className="btn-primary">
                            Secure Your Spot Now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Bootcamp;
