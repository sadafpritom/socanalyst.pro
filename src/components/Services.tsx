// import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Zap, Bug, FileCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "SOC-as-a-Service",
      subtitle: "Continuous monitoring of your systems to detect and neutralize threats in real time.",
      description: "Our SOC-as-a-Service solution provides 24/7 threat detection and incident response for Canadian businesses. We use advanced SIEM tools, threat intelligence feeds, and skilled analysts to identify malicious activity before it becomes a major incident.",
      imgSrc: "/img/Image_8.webp"
    },
    {
      icon: Search,
      title: "Penetration Testing",
      subtitle: "Uncover vulnerabilities before hackers do.",
      description: "We simulate real-world cyberattacks to test your network, applications, and security controls. Our reports provide actionable steps to close security gaps quickly.",
      imgSrc: "/img/Image_9.webp"
    },
    {
      icon: Zap,
      title: "Incident Response",
      subtitle: "Fast and effective cyber breach management.",
      description: "When a breach happens, our team responds immediately, containing the threat, recovering data, and ensuring regulatory compliance reporting is handled correctly.",
      imgSrc: "/img/Image_10.webp"
    },
    {
      icon: Bug,
      title: "Vulnerability Management",
      subtitle: "Stay ahead of security weaknesses.",
      description: "We continuously scan and prioritize vulnerabilities, providing patching guidance and mitigation strategies tailored to your IT environment.",
      imgSrc: "/img/Image_11.webp"
    },
    {
      icon: FileCheck,
      title: "Compliance & Risk Assessment",
      subtitle: "Meet industry standards and regulations.",
      description: "We help you achieve compliance with PIPEDA, PCI-DSS, HIPAA, ISO 27001, and other standards, ensuring both legal and operational security.",
      imgSrc: "/img/Image_12.webp"
    }
  ];

  return (
    <div className="pt-16 bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-black border-b border-cyan-400 relative overflow-hidden">
        {/* Animated Background */}
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* CONVERTED: h1 to motion.h1 with glow animation */}
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
              OUR <span className="text-cyan-400">SERVICES</span>
            </motion.h1>
            <div className="h-1 w-32 bg-cyan-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Our services cover the full spectrum of cybersecurity, from proactive monitoring to emergency breach response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services "Book" Layout */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  // This is now the "book" container
                  className="bg-black border border-cyan-400/30 overflow-hidden grid lg:grid-cols-2"
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{
                    borderColor: '#00D4FF',
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)'
                  }}
                >
                  {/* Text Content "Page" */}
                  <div className={`p-12 flex flex-col justify-center ${!isEven ? 'lg:order-2' : ''}`}>
                    <div>
                      <Icon className="h-16 w-16 text-cyan-400 mb-6" />
                      <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
                        {service.title}
                      </h2>
                      <p className="text-xl text-cyan-400 font-bold mb-6">
                        {service.subtitle}
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Image "Page" */}
                  <div className={`w-full h-full min-h-[300px] ${!isEven ? 'lg:order-1' : ''}`}>
                    <img
                      src={service.imgSrc}
                      alt={service.title}
                      // w-full, h-full, and object-cover make it fill the grid cell perfectly
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.onerror = null; // Prevents infinite loop
                        img.src = `https://placehold.co/600x600/0E1018/00D4FF?text=${service.title.replace(' ', '+')}`;
                        img.alt = `${service.title} placeholder`;
                      }}
                    />
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* --- END: Services "Book" Layout --- */}


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
              NEED CUSTOM <span className="text-cyan-400">SECURITY</span> SOLUTIONS?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Every business has unique security challenges. Let's build a solution that fits your needs.
            </p>
            <motion.a
              href="/contact"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px #00D4FF',
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-cyan-400 text-black px-12 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300" // Removed rounded-md
            >
              DISCUSS YOUR REQUIREMENTS
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;