import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, Eye, Lock, Terminal, Code, Database, Cpu
} from 'lucide-react';

// --- Data copied from BlogApp.tsx ---

// --- Helper function to create URL-friendly slugs ---
// This is needed because blogData relies on it
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
};

// --- TypeScript Types ---
interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string; // Using string for simplicity, could be Date object
  category: string;
  tags: string[];
  imageUrl: string;
}

// --- Blog Data (Cybersecurity Focused) ---
const blogData: Post[] = [
  {
    id: 1,
    title: "Anatomy of a Modern Phishing Attack",
    slug: slugify("Anatomy of a Modern Phishing Attack"),
    excerpt: "A deep dive into a sophisticated multi-stage phishing campaign, from initial lure and credential theft to C2 communication and payload delivery.",
    content: `...`, // Content truncated for brevity in this file
    author: "SOCAnalyst.Pro",
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-28",
    category: "Threat Analysis",
    tags: ["Phishing", "SOC", "Incident Response", "Social Engineering"],
    imageUrl: "/img/Phishing_Analysis_Cover.webp"
  },
  {
    id: 2,
    title: "The Rise of AI in Threat Detection",
    slug: slugify("The Rise of AI in Threat Detection"),
    excerpt: "How Machine Learning and AI are moving beyond buzzwords to become a SOC's most powerful tool for anomaly detection and alert triage.",
    content: `...`, // Content truncated for brevity in this file
    author: "SOCAnalyst.Pro",
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-25",
    category: "Cybersecurity",
    tags: ["AI", "Machine Learning", "SOC", "SIEM", "UEBA"],
    imageUrl: "/img/AI_and_Security_Cover.webp"
  },
  {
    id: 3,
    title: "Incident Response Playbook: A Step-by-Step Guide",
    slug: slugify("Incident Response Playbook: A Step-by-Step Guide"),
    excerpt: "A breach is detected. Panic is not an option. We walk through the six phases of the NIST Incident Response framework for a better understanding.",
    content: `...`, // Content truncated for brevity in this file
    author: "SOCAnalyst.Pro",
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-22",
    category: "Incident Response",
    tags: ["IR", "Playbook", "SOC", "Management"],
    imageUrl: "/img/IR_Playbook_Cover.webp"
  },
  {
    id: 4,
    title: "CVEs You Missed: Beyond the Hype",
    slug: slugify("Common Vulnerabilities and Exposures (CVEs) You Missed"),
    excerpt: "Why your vulnerability management program is failing. A review of critical CVEs that are *actually* being exploited in the wild.",
    content: `...`, // Content truncated for brevity in this file
    author: "SOCAnalyst.Pro",
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-19",
    category: "Vulnerability Management",
    tags: ["CVE", "Pentesting", "Patching", "Cybersecurity"],
    imageUrl: "/img/CVE_Analysis_Cover.webp"
  },
  {
    id: 5,
    title: "Zero Trust Architecture: A Practical Guide",
    slug: slugify("Zero Trust Architecture: A Practical Guide"),
    excerpt: "Moving beyond the 'castle-and-moat' security model. What Zero Trust *really* means and how to start implementing it today.",
    content: `...`, // Content truncated for brevity in this file
    author: "SOCAnalyst.Pro",
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-15",
    category: "Cybersecurity",
    tags: ["Zero Trust", "Architecture", "MFA", "Network Security"],
    imageUrl: "/img/Zero_Trust_Cover.webp"
  },
  {
    id: 6,
    title: "Pentesting vs. Vulnerability Scanning",
    slug: slugify("Penetration Testing vs. Vulnerability Scanning"),
    excerpt: "They both find weaknesses, but their methods, goals, and outcomes are fundamentally different. Let's compare.",
    content: `...`, // Content truncated for brevity in this file
    author: "SOCAnalyst.Pro",
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-12",
    category: "Vulnerability Management",
    tags: ["Pentesting", "Vulnerability Scanning", "Red Team", "CVE"],
    imageUrl: "/img/Pentest_VS_Scan_Cover.webp"
  }
];
// --- End of data from BlogApp.tsx ---


const Homepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get the 3 most recent posts
  const latestPosts = blogData.slice(0, 3);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: Terminal, delay: 0 },
    { icon: Code, delay: 0.5 },
    { icon: Database, delay: 1 },
    { icon: Cpu, delay: 1.5 },
  ];

  return (
    // --- MODIFIED: Removed global pt-16 from here ---
    <div className="overflow-hidden bg-black text-white"> 
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full" // Kept rounded-full for 1x1 particles
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className="fixed pointer-events-none z-10"
            animate={{
              x: mousePosition.x / (10 + index * 2),
              y: mousePosition.y / (10 + index * 2),
              rotate: [0, 360],
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 20 },
              y: { type: "spring", stiffness: 50, damping: 20 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
          >
            <Icon className="h-8 w-8 text-cyan-400 opacity-20" />
          </motion.div>
        );
      })}

      {/* Hero Section */}
      {/* --- MODIFIED: Added pt-24 and adjusted min-h for correct top padding --- */}
      <section className="min-h-[calc(100vh-6rem)] flex items-center bg-black relative pt-24">
        {/* Animated Grid Background */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundImage: [
              'linear-gradient(90deg, #00D4FF 1px, transparent 1px), linear-gradient(180deg, #00D4FF 1px, transparent 1px)',
              'linear-gradient(90deg, transparent 1px, #00D4FF 1px), linear-gradient(180deg, transparent 1px, #00D4FF 1px)',
              'linear-gradient(90deg, #00D4FF 1px, transparent 1px), linear-gradient(180deg, #00D4FF 1px, transparent 1px)',
            ],
            backgroundSize: ['50px 50px', '100px 100px', '50px 50px'],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Glitch Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent"
          animate={{
            x: [-100, window.innerWidth + 100],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
            >
              <motion.div
                className="mb-6"
                animate={{
                  textShadow: [
                    '0 0 0px #00D4FF',
                    '0 0 20px #00D4FF',
                    '0 0 0px #00D4FF',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  YOUR{' '}
                  <motion.span 
                    className="text-cyan-400 block"
                    animate={{
                      color: ['#00D4FF', '#ffffff', '#00D4FF'],
                      textShadow: ['0 0 10px #00D4FF', '0 0 30px #00D4FF', '0 0 10px #00D4FF'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    SHIELD
                  </motion.span>
                  AGAINST{' '}
                  <motion.span 
                    className="text-white block"
                    animate={{ x: [0, 2, -2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    CYBER THREATS
                  </motion.span>
                  <motion.span 
                    className="text-cyan-400 text-3xl md:text-4xl block mt-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, type: "spring" }}
                  >
                    IN CANADA
                  </motion.span>
                </motion.h1>
              </motion.div>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                SOC monitoring, incident response, penetration testing, and compliance — trusted by Canadian businesses nationwide.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px #00D4FF',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden" // Removed rounded-md
                >
                  {/* --- MODIFIED: Replaced Link with <a> --- */}
                  <a
                    href="/contact"
                    className="block bg-cyan-400 text-black px-8 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300 relative z-10"
                  >
                    <motion.span
                      animate={{ x: [0, 2, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      GET FREE CONSULTATION
                    </motion.span>
                  </a>
                </motion.div>
                
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: '#00D4FF',
                    boxShadow: '0 0 20px #00D4FF',
                  }}
                  whileTap={{ scale: 0.95 }}
                  // Removed rounded-md
                >
                  {/* --- MODIFIED: Replaced Link with <a> --- */}
                  <a
                    href="/services"
                    className="block border-2 border-white text-white px-8 py-4 font-black text-lg tracking-wider hover:bg-white hover:text-black transition-all duration-300" // Removed rounded-md
                  >
                    EXPLORE SERVICES
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 50 }}
            >
              {/* Animated Service Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "24/7 SOC", desc: "Continuous monitoring", delay: 0 },
                  { icon: Zap, title: "RAPID RESPONSE", desc: "Incident management", delay: 0.2 },
                  { icon: Eye, title: "PENETRATION TESTING", desc: "Vulnerability assessment", delay: 0.4 },
                  { icon: Lock, title: "COMPLIANCE", desc: "Regulatory standards", delay: 0.6 },
                ].map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      className={`bg-gray-900 p-6 border-l-4 border-cyan-400 ${index === 1 || index === 3 ? 'mt-8' : index === 2 ? '-mt-4' : ''}`} // Removed rounded-md
                      initial={{ opacity: 0, y: 50, rotateY: -90 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ 
                        delay: service.delay,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        borderColor: '#ffffff',
                        rotateY: 5,
                        boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Icon className="h-8 w-8 text-cyan-400 mb-4" />
                      </motion.div>
                      <motion.h3 
                        className="font-bold text-lg mb-2"
                        animate={{ 
                          textShadow: ['0 0 0px #00D4FF', '0 0 10px #00D4FF', '0 0 0px #00D4FF'] 
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-gray-400 text-sm">{service.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating Geometric Shapes */}
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 border-4 border-cyan-400" // Removed rounded-lg
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-16 h-16 bg-cyan-400" // Removed rounded-lg
                animate={{
                  rotate: [0, -360],
                  x: [0, 10, -10, 0],
                  y: [0, -10, 10, 0],
                }}
                transition={{
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  x: { duration: 4, repeat: Infinity },
                  y: { duration: 3, repeat: Infinity },
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-black border-t border-cyan-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
              OUR <span className="text-cyan-400">SERVICES</span>
            </h2>
            <div className="h-1 w-32 bg-cyan-400 mx-auto"></div> {/* Removed rounded-full */}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "SOC-AS-A-SERVICE", desc: "24/7 threat monitoring and response", icon: Shield },
              { title: "PENETRATION TESTING", desc: "Uncover vulnerabilities before hackers", icon: Eye },
              { title: "INCIDENT RESPONSE", desc: "Fast cyber breach management", icon: Zap },
              { title: "VULNERABILITY MGMT", desc: "Stay ahead of security weaknesses", icon: Lock },
              { title: "COMPLIANCE AUDIT", desc: "Meet industry standards", icon: Terminal },
              { title: "RISK ASSESSMENT", desc: "Comprehensive security evaluation", icon: Code },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-900 border-l-4 border-cyan-400 p-6 group" // Removed rounded-md
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: '#ffffff',
                    backgroundColor: '#000000'
                  }}
                >
                  <Icon className="h-10 w-10 text-cyan-400 mb-4 group-hover:text-white transition-colors duration-300" />
                  <h3 className="text-lg font-black mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* --- MODIFIED: Replaced Link with <a> --- */}
            <a
              href="/services"
              className="inline-block bg-cyan-400 text-black px-8 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300" // Removed rounded-md
            >
              VIEW ALL SERVICES
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section --- MODIFIED SECTION --- */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
                WHY CHOOSE <span className="text-cyan-400">SOC ANALYST PRO</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Canadian-based team with local expertise",
                  "24/7 Security Operations Center",
                  "Proven track record in incident response",
                  "Custom solutions for regulated industries"
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <div className="w-4 h-4 bg-cyan-400"></div> {/* Removed rounded-sm */}
                    <p className="text-lg text-gray-300">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* --- START: Image Carousel (Neubrutalist Card Stack) --- */}
            <ImageCarousel />
            {/* --- END: Image Carousel --- */}
            
          </div>
        </div>
      </section>
      {/* --- END: Why Choose Us Section --- */}

      {/* Call to Action Section */}
      <section className="py-20 bg-black border-t border-cyan-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
              READY TO <span className="text-cyan-400">SECURE</span> YOUR BUSINESS?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of Canadian businesses that trust SOC Analyst Pro for their cybersecurity needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // Removed rounded-md
              >
                {/* --- MODIFIED: Replaced Link with <a> --- */}
                <a
                  href="/contact"
                  className="block bg-cyan-400 text-black px-8 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300" // Removed rounded-md
                >
                  GET FREE CONSULTATION
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // Removed rounded-md
              >
                {/* --- MODIFIED: Replaced Link with <a> --- */}
                <a
                  href="/works"
                  className="block border-2 border-cyan-400 text-cyan-400 px-8 py-4 font-black text-lg tracking-wider hover:bg-cyan-400 hover:text-black transition-all duration-300" // Removed rounded-md
                >
                  VIEW OUR WORKS
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Introduction Section with Parallax */}
      <section className="py-20 bg-gray-900 border-t border-cyan-400 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              'repeating-linear-gradient(45deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 20px)',
              'repeating-linear-gradient(135deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 20px)',
              'repeating-linear-gradient(45deg, #00D4FF 0px, #00D4FF 2px, transparent 2px, transparent 20px)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="text-center"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black tracking-tighter mb-8"
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #ffffff, #00D4FF)',
                  'linear-gradient(135deg, #00D4FF, #ffffff)',
                  'linear-gradient(45deg, #ffffff, #00D4FF)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              CYBERSECURITY <span className="text-cyan-400">THAT WORKS</span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              At SOC Analyst Pro, we provide Canadian companies with cutting-edge cybersecurity consulting, SOC-as-a-Service, and incident response solutions. Our experts specialize in threat detection, vulnerability management, and regulatory compliance so your business can operate without fear of disruption. Whether you're a small startup or a large enterprise, we deliver protection tailored to your needs.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {[
                { number: "24/7", label: "MONITORING", icon: Shield },
                { number: "99.9%", label: "UPTIME", icon: Zap },
                { number: "< 5MIN", label: "RESPONSE", icon: Eye },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-black/40 backdrop-blur-md p-8 border border-cyan-400/50" // Removed rounded-lg
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#ffffff',
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
                    }}
                    animate={{
                      borderColor: ['#00D4FF80', '#ffffff', '#00D4FF80'],
                    }}
                    transition={{
                      borderColor: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    </motion.div>
                    <motion.div
                      className="text-4xl font-black text-cyan-400 mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm font-bold tracking-wider">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase Section 1 - Image Left */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-cyan-400/20 to-gray-900 border-2 border-cyan-400/50 backdrop-blur-sm relative overflow-hidden"> {/* Removed rounded-lg */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400/10"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* --- MODIFIED: Updated image path --- */}
                  <img 
                    src="/img/Image_5.webp" 
                    alt="Threat Monitoring" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/0E1018/00D4FF?text=Threat+Monitoring'; }}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
                ADVANCED <span className="text-cyan-400">THREAT DETECTION</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our state-of-art SOC utilizes AI-powered threat intelligence to identify and neutralize security threats before they impact your business. With real-time monitoring and automated response protocols, we ensure your infrastructure remains secure 24/7.
              </p>
              <div className="space-y-3">
                {['Machine Learning Detection', 'Automated Response', 'Real-time Alerts'].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400" /> {/* Removed rounded-full */}
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section 2 - Image Right */}
      <section className="py-20 bg-gray-900 border-t border-cyan-400/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
                COMPREHENSIVE <span className="text-cyan-400">PENETRATION TESTING</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Discover vulnerabilities before malicious actors do. Our certified ethical hackers conduct thorough penetration tests across your entire infrastructure, providing detailed reports and actionable remediation strategies.
              </p>
              <div className="space-y-3">
                {['Network Security Audits', 'Web Application Testing', 'Social Engineering Tests'].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400" /> {/* Removed rounded-full */}
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group order-1 lg:order-2"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-cyan-400/20 border-2 border-cyan-400/50 backdrop-blur-sm relative overflow-hidden"> {/* Removed rounded-lg */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400/10"
                  animate={{
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* --- MODIFIED: Updated image path --- */}
                   <img 
                     src="/img/Image_6.webp" 
                     alt="Penetration Testing" 
                     className="w-full h-full object-cover" 
                     onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/0E1018/00D4FF?text=Penetration+Testing'; }}
                   />
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section 3 - Image Left */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-cyan-400/20 to-gray-900 border-2 border-cyan-400/50 backdrop-blur-sm relative overflow-hidden"> {/* Removed rounded-lg */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400/10"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* --- MODIFIED: Updated image path --- */}
                  <img 
                    src="/img/Image_7.webp" 
                    alt="Compliance Audit" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x450/0E1018/00D4FF?text=Compliance+Audit'; }}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter">
                REGULATORY <span className="text-cyan-400">COMPLIANCE</span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Navigate complex regulatory requirements with confidence. We help Canadian businesses meet and maintain compliance with PIPEDA, SOC 2, ISO 27001, and other critical security standards.
              </p>
              <div className="space-y-3">
                {['PIPEDA Compliance', 'SOC 2 Certification', 'ISO 27001 Standards'].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400" /> {/* Removed rounded-full */}
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MODIFIED: Insights from Blog Section --- */}
      <section className="py-20 bg-gray-900 border-t border-cyan-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
              LATEST <span className="text-cyan-400">INSIGHTS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with expert analysis, industry trends, and cybersecurity best practices from our team
            </p>
            <div className="h-1 w-32 bg-cyan-400 mx-auto mt-8"></div> {/* Removed rounded-full */}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Map over the latestPosts array */}
            {latestPosts.map((post, index) => (
              <a 
                key={post.id}
                href={`/blog?post=${post.slug}`} 
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Added h-full to make cards equal height */}
                  <div className="bg-black/40 backdrop-blur-md border border-cyan-400/50 overflow-hidden hover:border-white transition-all duration-300 h-full">
                    <div className="aspect-video bg-gradient-to-br from-cyan-400/20 to-gray-900 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cyan-400/10"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { e.currentTarget.src = `https://placehold.co/600x338/0E1018/00D4FF?text=Blog+Image`; }}
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-cyan-400/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-cyan-400 font-bold mb-2 tracking-wider">
                        {post.category.toUpperCase()}
                      </div>
                      <h3 className="text-xl font-black mb-3 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {post.excerpt}
                      </p>
                      {/* Removed the "5 min read" placeholder */}
                    </div>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* This button correctly links to /blog */}
            <a
              href="/blog"
              className="inline-block bg-cyan-400 text-black px-8 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300" // Removed rounded-md
            >
              VIEW ALL BLOG POSTS
            </a>
          </motion.div>
        </div>
      </section>
      {/* --- END OF MODIFIED SECTION --- */}
    </div>
  );
};

// --- START: New Neubrutalist Card Stack Carousel ---
const carouselImages = [
  "/img/Image_1.webp",
  "/img/Image_2.webp",
  "/img/Image_3.webp",
  "/img/Image_4.webp"
];

const VISIBLE_CARDS = 3; // Number of cards to show in the stack

const ImageCarousel = () => {
  // We use the array index as the canonical "page"
  const [cards, setCards] = useState(carouselImages);

  const rotateCard = () => {
    setCards(prevCards => {
      const newCards = [...prevCards];
      const first = newCards.shift(); // Remove the top card
      if (first) {
        newCards.push(first); // Add it to the bottom of the stack
      }
      return newCards;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      // Container for the stack
      // --- MODIFIED: Added mt-12 lg:mt-0 to fix mobile overlap ---
      className="relative aspect-[4/3] w-full max-w-lg mx-auto flex items-center justify-center mt-12 lg:mt-0"
    >
      <div className="relative w-10/12 h-5/6">
        {cards.map((imageUrl, index) => {
          
          const isTopCard = index === 0;
          const zIndex = cards.length - index; // Top card has highest z-index
          
          // Calculate transform based on index
          let scale = 1;
          let y = 0;
          let opacity = 0;

          if (index < VISIBLE_CARDS) {
            // It's one of the visible cards
            scale = 1 - (index * 0.05); // e.g., 1, 0.95, 0.90
            y = index * 12; // e.g., 0, 12, 24
            opacity = 1;
          } else {
            // Hidden card at the bottom of the stack
            scale = 1 - (VISIBLE_CARDS * 0.05);
            y = VISIBLE_CARDS * 12;
            opacity = 0;
          }

          return (
            <motion.div
              key={imageUrl} // Use URL as key
              className="absolute w-full h-full bg-black border-4 border-cyan-400 overflow-hidden" // Removed rounded-lg
              style={{
                boxShadow: "8px 8px 0px #00D4FF", // Neubrutalist shadow
                zIndex: zIndex,
                cursor: isTopCard ? 'grab' : 'default',
              }}
              
              // Animate to its new position in the stack
              animate={{
                scale: scale,
                y: y,
                opacity: opacity,
              }}
              
              transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
              }}
              
              // Only the top card is draggable
              drag={isTopCard ? "x" : false}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              
              // --- FIX: Corrected onDragEnd handler ---
              onDragEnd={(_event, info) => {
                  const dragThreshold = 100;
                  // Check if dragged far enough
                  if (Math.abs(info.offset.x) > dragThreshold) {
                    rotateCard(); // "Swipe" the card
                  }
              }}
              
              // While dragging, make it bigger and remove shadow
              whileDrag={{ 
                scale: 1.05, 
                boxShadow: "0px 0px 0px #00D4FF",
                cursor: 'grabbing' 
              }}
            >
              <img 
                src={imageUrl} 
                alt="Carousel card" 
                className="w-full h-full object-cover pointer-events-none" 
                onError={(e) => {
                  // Fallback in case image fails to load
                  e.currentTarget.src = `https://placehold.co/600x450/0E1018/00D4FF?text=Image+Missing`;
                  e.currentTarget.alt = "Image missing placeholder";
                }}
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
// --- END: New Carousel Component ---


export default Homepage;
