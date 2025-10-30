// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import About from './components/About';
import Services from './components/Services';
// import Blog from './components/Blog';
// import BlogPost from './components/BlogPost';
import BlogApp from './components/BlogApp';
import Works from './components/Works';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-mono">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<BlogApp />} />
            <Route path="/works" element={<Works />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;