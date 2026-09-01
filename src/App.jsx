import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Send, BookOpen, FlaskConical } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Courses from './sections/Courses';
import Tutors from './sections/Tutors';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import { useTheme } from './hooks/useTheme';
import Achievements from './sections/Achievement';
import TutorProfile from './pages/TutorProfile';
import Blog from '../src/pages/Blog';
import BlogPost from './pages/BlogPost';
import { BlogProvider } from './context/BlogContext';
import Subscribe from './sections/Subscribe';
import Enrollment from './pages/Enrollment';
import CourseDetails from './pages/CourseDetails';
import Bootcamp from './pages/Bootcamp';
import Events from './pages/Events';
import DiscountCountdown from './components/DiscountCountdown';
import Review from './pages/Review';
import FindPath from './pages/FindPath';
import GraduationFlyer from './pages/GraduationFlyer';
import HolidayTraining from './pages/HolidayTraining';
import InternshipAttendance from './pages/InternshipAttendance';
import WelcomePopup from './components/WelcomePopup';
import GalleryPage from './pages/GalleryPage';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Tutors />
      <Gallery />
      <Achievements />
      <Contact />
      <Subscribe />
    </>
  );
}

function App() {
  useTheme();

  return (
    <BlogProvider>
      <Router>
        <div className="App">
          <WelcomePopup />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tutor/:id" element={<TutorProfile />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/enroll" element={<Enrollment />} />
              <Route path="/holiday-training" element={<HolidayTraining />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/bootcamp" element={<Bootcamp />} />
              <Route path="/events" element={<Events />} />
              <Route path="/review" element={<Review />} />
              <Route path="/find-path" element={<FindPath />} />
              <Route path="/graduation-flyer" element={<GraduationFlyer />} />
              <Route path="/internship-attendance" element={<InternshipAttendance />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </main>
          <Footer />
          <DiscountCountdown />
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;