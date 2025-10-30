// import React from 'react';
import { Link } from 'react-router-dom';
// --- MODIFIED: Updated icons for new social links ---
import { Shield, Youtube, Facebook, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'SOC-as-a-Service',
    'Penetration Testing',
    'Incident Response',
    'Vulnerability Management',
    'Compliance & Risk Assessment'
  ];

  return (
    <footer className="bg-black border-t border-cyan-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-black tracking-wider">SOC ANALYST PRO</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              SOC Analyst Pro is Canada's trusted partner for SOC monitoring, cybersecurity consulting, and incident response. We protect companies nationwide with proactive, results-driven solutions.
            </p>
            {/* --- MODIFIED: Social links updated --- */}
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/sdocustomsoftwares/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-900 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@SDOcustomsoftwares"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-900 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                title="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://account.goodfirms.co/manage/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-900 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                title="GoodFirms"
              >
                <Star className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://clutch.co/profile/sdo-custom-softwares"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-900 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                title="Clutch"
              >
                <Award className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-lg font-black mb-6 tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-lg font-black mb-6 tracking-wider">SERVICES</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              © 2025 SOC Analyst Pro. All rights reserved.
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 text-gray-500 text-sm"
            >
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </motion.div>
img/         </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

