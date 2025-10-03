import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Courses from './sections/Courses';
import Tutors from './sections/Tutors';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme(); // Initialize theme

  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Courses />
      <Tutors />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;