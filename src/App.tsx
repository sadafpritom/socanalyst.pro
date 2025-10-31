// import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; // *** ADDED THIS IMPORT ***
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

// *** FIX #5: ADDED THIS HELPER COMPONENT ***
// This component scrolls the user to the top of the page
// every time the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      {/* *** ADDED THIS COMPONENT *** */}
      <ScrollToTop /> 

      {/* *** FIX #6: 
        1. Changed 'font-mono' to 'font-sans' (to match your site's style).
        2. Added 'overflow-x-hidden' as a second layer of protection 
           against horizontal scrolling.
      */}
      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<BlogApp />} />
            <Route path="/works" element={<Works />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* *** FIX #7: ADDED THIS CATCH-ALL ROUTE ***
              This works with your netlify.toml to ensure any
              unknown URL still renders your app (and not a blank page).
            */}
            <Route path="*" element={<Homepage />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

