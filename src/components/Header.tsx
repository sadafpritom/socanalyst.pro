import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// The 'Shield' import is no longer needed, so I've removed it.
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/services', label: 'SERVICES' },
    { path: '/works', label: 'WORKS' },
    { path: '/blog', label: 'BLOG' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (
    <motion.header
      className="fixed top-0 w-full z-50 glass-strong border-b border-cyan-400/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Here is your new logo. 
              We assume the 'public' folder is served as the root '/'.
              So, '/public/img/socanalystpro_logo.webp' becomes '/img/socanalystpro_logo.webp'.
            */}
            <img
              src="/public/img/socanalystpro_logo.webp"
              alt="SOC Analyst Pro Logo"
              className="h-8 w-auto" // Using h-8 and w-auto to maintain aspect ratio
              onError={(ev) => {
                // Fallback in case the image fails to load
                const img = ev.currentTarget as HTMLImageElement;
                img.onerror = null;
                img.style.display = 'none';
                // You could show a placeholder or text here if you like
              }}
            />
            <span className="text-xl font-bold tracking-wider group-hover:text-cyan-400 transition-colors duration-200">
              SOCAnalyst.pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-bold tracking-wider hover:text-cyan-400 transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-cyan-400' : 'text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-cyan-400 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            className="md:hidden py-4 border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`block py-2 text-sm font-bold tracking-wider hover:text-cyan-400 transition-colors duration-200 ${
                    location.pathname === item.path ? 'text-cyan-400' : 'text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
