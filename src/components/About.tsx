// import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Target, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Clock,
      title: "24/7 Security Operations Center",
      description: "Round-the-clock monitoring and threat detection"
    },
    {
      icon: Users,
      title: "Experienced Canadian cybersecurity consultants",
      description: "Decades of combined expertise in security operations"
    },
    {
      icon: Target,
      title: "Proven track record in incident response",
      description: "Successfully handled countless security incidents"
    },
    {
      icon: Award,
      title: "Custom solutions for regulated industries",
      description: "Specialized expertise in finance, healthcare, and retail"
    }
  ];

  return (
    // --- FIX: Added bg-black, text-white, and overflow-hidden to the root div ---
    <div className="pt-16 bg-black text-white overflow-hidden">
      {/* Hero Section */}
      {/* --- FIX: Added relative and overflow-hidden for the background animation --- */}
      <section className="py-20 bg-black border-b border-cyan-400 relative overflow-hidden">
        {/* --- ADDED: Animated Background from Works.jsx --- */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              'radial-gradient(circle at 20% 50%, #00D4FF 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, #00D4FF 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, #00D4FF 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Added relative z-10 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* --- ADDED: motion.h1 with glow animation from Works.jsx --- */}
            <motion.h1 
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8"
              animate={{
                textShadow: [
                  '0 0 0px #00D4FF',
                  '0 0 20px #00D4FF',
                  '0 0 0px #00D4FF',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              WHO <span className="text-cyan-400">WE ARE</span>
            </motion.h1>
            <div className="h-1 w-32 bg-cyan-400 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Based in Canada, SOC Analyst Pro is a team of cybersecurity professionals dedicated to safeguarding businesses from cyber threats. With decades of combined experience in security operations, digital forensics, and penetration testing, we help organizations stay ahead of attackers. Our approach is proactive, data-driven, and built on industry best practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MOVED SECTION --- */}
      {/* Our Approach Section */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* --- text-white class is good here, but also inherited now --- */}
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">
                A PROACTIVE <span className="text-cyan-400">PARTNERSHIP</span>
              </h2>
              <div className="h-1 w-24 bg-cyan-400 mb-8"></div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We don't just react to threats; we anticipate them. Our model is built on a deep partnership with your team. We integrate seamlessly into your operations, acting as an extension of your IT department to provide continuous monitoring, threat intelligence, and strategic guidance.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This collaborative approach ensures that your security posture evolves with the threat landscape. We're not just a vendor; we are your dedicated Canadian security ally, committed to your resilience.
              </p>
      </motion.div>
            
            {/* Image with "hanging" animation */}
            <motion.div
              className="flex justify-center items-center py-8"
              // The "hanging" animation
              animate={{ 
                rotate: [0, -2, 2, -2, 0], // Subtle sway back and forth
              }}
              transition={{
                duration: 5, // Slower, more natural duration
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror" // Reverses the animation smoothly
              }}
              style={{ transformOrigin: "top center" }} // Pivots from the top center
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-2 border-4 border-gray-700/50 rounded-lg shadow-2xl shadow-cyan-500/10 bg-black"
              >
                <img
                  src="/img/about_thumbnail.webp"
                  alt="Our Proactive Approach"
                  className="rounded-lg w-full h-auto object-cover max-w-lg"
                  // --- FIX: Corrected onError logic to use a placeholder ---
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null; // Prevents infinite loop
                    img.src = 'https://placehold.co/600x400/0E1018/00D4FF?text=Proactive+Partnership';
                    img.alt = 'Proactive Partnership placeholder';
                  }}
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
      {/* --- END OF MOVED SECTION --- */}

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group"
                >
                  <div className="bg-black border-l-4 border-cyan-400 p-8 h-full transform transition-all duration-300 hover:scale-105 hover:border-white">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Icon className="h-12 w-12 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
ICONS - 
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black border-t border-cyan-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
            READY TO <span className="text-cyan-400">SECURE</span> YOUR BUSINESS?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can protect your Canadian business from cyber threats.
            </p>
            {/* --- FIX: Changed <motion.button> to <motion.a> to link to contact page --- */}
            <motion.a
              href="/contact" // Added link
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px #00D4FF', // Added shadow from Works.jsx for consistency
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-cyan-400 text-black px-12 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300" // Removed rounded-md
          >
              GET STARTED TODAY
            </motion.a>
          </motion.div>
        </div>
      </section>
</div>
  );
};

export default About;
