import React, { useState, useMemo, useEffect } from 'react';
import { Search, Tag, Calendar, User, ChevronsRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';

// --- Contact Page Component ---
// (Your existing Contact component code is preserved here)

// Define a specific type for the submission status
type SubmissionStatus = 'submitting' | 'success' | 'error' | null;

const Contact = () => {
  const formId = "xkgprabe"; // <-- PASTE YOUR FORMSPREE ID HERE
  const formspreeEndpoint = `https://formspree.io/f/${formId}`;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Use the specific type for the useState hook
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);

  const services = [
    'SOC-as-a-Service',
    'Penetration Testing',
    'Incident Response',
    'Vulnerability Management',
    'Compliance & Risk Assessment',
    'General Consultation'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="pt-16 bg-black text-white font-inter"> {/* Assuming Inter font from Tailwind default */}
      {/* Hero Section */}
      {/* MODIFIED: Added relative overflow-hidden for the background animation */}
      <section className="py-20 bg-black border-b border-cyan-400 relative overflow-hidden">
        {/* ADDED: Animated Background from About component */}
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

        {/* MODIFIED: Added relative z-10 to ensure content is above the animation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* MODIFIED: Changed h1 to motion.h1 and added glow animation */}
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
              LET'S <span className="text-cyan-400">SECURE</span><br />
              YOUR BUSINESS
            </motion.h1>
            <div className="h-1 w-32 bg-cyan-400 mx-auto mb-8"></div> {/* Removed rounded-full */}
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Get in touch with our cybersecurity experts for a free consultation or emergency response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-black p-8 border-l-4 border-cyan-400"> {/* Removed rounded-lg */}
                <h2 className="text-3xl font-black mb-8">GET STARTED</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold mb-2 tracking-wider text-gray-300">
                        NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300" /* Removed rounded-md */
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-bold mb-2 tracking-wider text-gray-300">
                        COMPANY *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300" /* Removed rounded-md */
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold mb-2 tracking-wider text-gray-300">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300" /* Removed rounded-md */
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold mb-2 tracking-wider text-gray-300">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300" /* Removed rounded-md */
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-bold mb-2 tracking-wider text-gray-300">
                      SERVICE NEEDED *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300" /* Removed rounded-md */
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold mb-2 tracking-wider text-gray-300">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors duration-300 resize-none" /* Removed rounded-md */
                      placeholder="Tell us about your cybersecurity needs..."
                    />
                  </div>

                  {/* Submission Status Messages */}
                  {submissionStatus === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-green-900/50 border border-green-500 text-green-300"> {/* Removed rounded-md */}
                      <CheckCircle className="h-5 w-5" />
                      <span>Thank you! Your message has been sent successfully.</span>
                    </div>
                  )}
                  {submissionStatus === 'error' && (
                    <div className="flex items-center gap-3 p-4 bg-red-900/50 border border-red-500 text-red-300"> {/* Removed rounded-md */}
                      <AlertTriangle className="h-5 w-5" />
                      <span>Something went wrong. Please try again later.</span>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={submissionStatus === 'submitting'}
                    className="w-full bg-cyan-400 text-black px-8 py-4 font-black text-lg tracking-wider hover:bg-white transition-all duration-300 transform hover:shadow-lg hover:shadow-cyan-400/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" /* Removed rounded-md */
                  >
                    {submissionStatus === 'submitting' ? 'SUBMITTING...' : 'SEND MESSAGE'}
                    {submissionStatus !== 'submitting' && <Send className="h-5 w-5" />}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-black p-8 border-l-4 border-cyan-400"> {/* Removed rounded-lg */}
                <h2 className="text-3xl font-black mb-8">CONTACT INFO</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 uppercase tracking-wider">EMAIL</h3>
                      <p className="text-gray-400 hover:text-cyan-400 transition-colors break-all">softwaredevelopmentontario@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 uppercase tracking-wider">PHONE</h3>
                      <p className="text-gray-400 hover:text-cyan-400 transition-colors">1-437-269-0856</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 uppercase tracking-wider">COVERAGE</h3>
                      <p className="text-gray-400">
                        Serving businesses across<br />
                        Toronto, Vancouver, Calgary,<br />
                        Montreal, Ottawa, and all of Canada
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="bg-gray-800 p-8 border border-cyan-400" /* Removed rounded-lg */
                animate={{
                  borderColor: ['#00D4FF', '#ffffff', '#00D4FF'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <h3 className="text-2xl font-black mb-4">EMERGENCY RESPONSE</h3>
                <p className="text-gray-300 mb-6">
                  Under cyberattack? Our incident response team is available 24/7 to contain threats and minimize damage.
                </p>
                <motion.a
                  href="tel:1-437-269-0856" // Added tel link
                  whileHover={{ scale: 1.05 }}
                  className="inline-block bg-red-600 text-white px-6 py-3 font-black tracking-wider hover:bg-red-700 transition-all duration-300" /* Removed rounded-md */
                >
                  EMERGENCY CONTACT
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-16 bg-black border-t border-cyan-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-black tracking-tighter mb-6">
              SERVING <span className="text-cyan-400">CANADA</span> NATIONWIDE
            </h2>
            <p className="text-lg text-gray-400">
              Serving businesses across Toronto, Vancouver, Calgary, Montreal, Ottawa, and all of Canada.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};


// --- TypeScript Types ---

interface Post {
  id: number;
  title: string;
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
// All blog data is now included in this file and relevant to your site.

const blogData: Post[] = [
  {
    id: 1,
    title: "Anatomy of a Modern Phishing Attack",
    excerpt: "We dissect a sophisticated phishing campaign, from initial lure to payload delivery, and how SOC analysts can detect it.",
    content: `
      <p>Phishing attacks are no longer just poorly-spelled emails. Modern campaigns use sophisticated social engineering, domain spoofing, and multi-stage payloads. In this post, we analyze a recent attack that targeted financial services.</p>
      <img src="https://placehold.co/800x400/0d47a1/ffffff?text=Phishing+Attack+Vector" alt="Phishing Attack" class="my-6 shadow-md" /> {/* Removed rounded-lg */}
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">The Lure and The Hook</h3>
      <p>The attack began with a highly-convincing email impersonating a trusted SaaS vendor, complete with a link to a pixel-perfect clone of the login page. The link used a 'typosquatted' domain, passing casual inspection.</p>
      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400"> {/* Removed rounded-r-lg */}
        <p class="italic text-gray-300">"For a SOC, detecting these attacks requires moving beyond simple signature-based email filters. We now rely on analyzing URL reputation, header anomalies, and user-reported phishing alerts in real-time."</p>
        <cite class="block text-right text-gray-400 mt-2">- Lead SOC Analyst</cite>
      </blockquote>
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Payload and C2 Communication</h3>
      <p>Upon credential theft, the user was redirected to the legitimate site, while the backend POST request sent the credentials to a command-and-control (C2) server. We'll examine the network traffic and the obfuscated script used.</p>
    `,
    author: "SOC Analyst Pro",
    authorAvatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=SOC",
    date: "2025-10-28",
    category: "Threat Analysis",
    tags: ["Phishing", "SOC", "Incident Response", "Social Engineering"],
    imageUrl: "https://placehold.co/600x400/0d47a1/ffffff?text=Phishing+Analysis"
  },
  {
    id: 2,
    title: "The Rise of AI in Threat Detection",
    excerpt: "How machine learning models are becoming a SOC's best friend in finding the needle in a haystack of logs.",
    content: `
      <p>The sheer volume of security logs generated by a modern enterprise is impossible for human analysts to review manually. This is where Artificial Intelligence and Machine Learning come in.</p>
      <img src="https://placehold.co/800x400/004d40/ffffff?text=AI+Threat+Detection" alt="AI Threat Detection" class="my-6 shadow-md" /> {/* Removed rounded-lg */}
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">User and Entity Behavior Analytics (UEBA)</h3>
      <p>UEBA systems create baseline models of normal behavior for every user and device on the network. When an account suddenly starts accessing unusual files, logging in at odd hours, or sending data to a new external IP, the AI flags it as a high-priority anomaly.</p>
      <p>This allows analysts to focus on high-fidelity alerts rather than drowning in false positives. We'll explore how to train these models and integrate them into your SIEM workflow.</p>
    `,
    author: "Dr. Eva Core",
    authorAvatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=EC",
    date: "2025-10-25",
    category: "Cybersecurity",
    tags: ["AI", "Machine Learning", "SOC", "SIEM", "UEBA"],
    imageUrl: "https://placehold.co/600x400/004d40/ffffff?text=AI+and+Security"
  },
  {
    id: 3,
    title: "Incident Response Playbook: A Step-by-Step Guide",
    excerpt: "A breach is detected. What happens next? We walk through the critical steps of an effective Incident Response plan.",
    content: `
      <p>When an incident is declared, chaos is the enemy. A well-defined Incident Response (IR) playbook is the only way to ensure a coordinated, effective, and timely response to minimize damage.</p>
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">The 6 Phases of Incident Response</h3>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Preparation:</strong> The work you do *before* the incident. Tooling, training, and documentation.</li>
        <li><strong>Identification:</strong> Is this a real incident? How critical is it? Triage is key.</li>
        <li><strong>Containment:</strong> Stop the bleeding. Isolate affected systems, segment the network.</li>
        <li><strong>Eradication:</strong> Find the root cause and eliminate it.</li>
        <li><strong>Recovery:</strong> Safely restore systems and validate they are clean.</li>
        <li><strong>Lessons Learned:</strong> The most critical step. What went wrong? How do we prevent it next time?</li>
      </ul>
      <img src="https://placehold.co/800x400/b71c1c/ffffff?text=Incident+Response+Plan" alt="Incident Response" class="my-6 shadow-md" /> {/* Removed rounded-lg */}
      <p>We'll provide a template playbook that your organization can adapt, covering everything from initial triage by a Tier 1 SOC Analyst to executive communication.</p>
    `,
    author: "SOC Analyst Pro",
    authorAvatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=SOC",
    date: "2025-10-22",
    category: "Incident Response",
    tags: ["IR", "Playbook", "SOC", "Management"],
    imageUrl: "https://placehold.co/600x400/b71c1c/ffffff?text=IR+Playbook"
  },
  {
    id: 4,
    title: "Common Vulnerabilities and Exposures (CVEs) You Missed",
    excerpt: "A review of the top 5 critical vulnerabilities from the last quarter and why patch management is more critical than ever.",
    content: `
      <p>While zero-day exploits get all the headlines, the vast majority of successful breaches exploit known vulnerabilities that were never patched. We review the most impactful CVEs from the last quarter.</p>
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Case Study: CVE-2025-XXXX</h3>
      <p>This remote code execution (RCE) vulnerability in a popular web framework was trivial to exploit, yet scanners found that over 60% of public-facing servers remained unpatched 30 days after the fix was released.</p>
      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400"> {/* Removed rounded-r-lg */}
        <p class="italic text-gray-300">"Your vulnerability management program is only as good as its speed. A 30-day patch window for a critical RCE is no longer acceptable."</p>
        <cite class="block text-right text-gray-400 mt-2">- Senior Pentester</cite>
      </blockquote>
      <p>We discuss strategies for prioritizing patches, validating fixes, and using threat intelligence to focus on CVEs that are being actively exploited in the wild.</p>
    `,
    author: "Alex Vex",
    authorAvatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=AV",
    date: "2025-10-19",
    category: "Vulnerability Management",
    tags: ["CVE", "Pentesting", "Patching", "Cybersecurity"],
    imageUrl: "https://placehold.co/600x400/4a148c/ffffff?text=CVE+Analysis"
  },
  // Added more posts to demonstrate pagination
  {
    id: 5,
    title: "Zero Trust Architecture: A Practical Guide",
    excerpt: "Moving beyond the castle-and-moat. What Zero Trust really means and how to start implementing it.",
    content: `
      <p>Zero Trust is a security model based on the principle of "never trust, always verify." It requires that all users, whether inside or outside the organization's network, be authenticated, authorized, and continuously validated before being granted access to applications and data.</p>
      <img src="https://placehold.co/800x400/1a237e/ffffff?text=Zero+Trust" alt="Zero Trust Architecture" class="my-6 shadow-md" /> {/* Removed rounded-lg */}
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">The Core Pillars of Zero Trust</h3>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Identity:</strong> Strong authentication (MFA) for all users and devices.</li>
        <li><strong>Device:</strong> Enforcing device health and compliance before granting access.</li>
        <li><strong>Network:</strong> Micro-segmentation to prevent lateral movement.</li>
        <li><strong>Application:</strong> Least-privilege access to specific applications.</li>
        <li><strong>Data:</strong> Classifying, labeling, and encrypting data at rest and in transit.</li>
      </ul>
    `,
    author: "Dr. Eva Core",
    authorAvatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=EC",
    date: "2025-10-15",
    category: "Cybersecurity",
    tags: ["Zero Trust", "Architecture", "MFA", "Network Security"],
    imageUrl: "https://placehold.co/600x400/1a237e/ffffff?text=Zero+Trust"
  },
  {
    id: 6,
    title: "Penetration Testing vs. Vulnerability Scanning",
    excerpt: "They both find weaknesses, but their methods, goals, and outcomes are fundamentally different. Let's compare.",
    content: `
      <p>Many organizations use the terms "vulnerability scanning" and "penetration testing" interchangeably, but they are not the same. Understanding the difference is crucial for building a mature security program.</p>
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Vulnerability Scanning (The "Mile Wide")</h3>
      <p>This is an automated process that scans systems, networks, and applications for *known* vulnerabilities. It's great for quickly identifying low-hanging fruit like unpatched software, open ports, and misconfigurations. It's a "list" of potential problems.</p>
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Penetration Testing (The "Inch Wide, Mile Deep")</h3>
      <p>This is a goal-oriented, often manual, exercise that simulates a real-world attacker. A pentester *exploits* vulnerabilities to determine the actual risk and impact. Can that "low-risk" vulnerability be chained with another to achieve full system compromise? A pentest answers this question.</p>
    `,
    author: "Alex Vex",
    authorAvatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=AV",
    date: "2025-10-12",
    category: "Vulnerability Management",
    tags: ["Pentesting", "Vulnerability Scanning", "Red Team", "CVE"],
    imageUrl: "https://placehold.co/600x400/bf360c/ffffff?text=Pentest+vs+Scan"
  }
];

// --- Utility Functions ---

/**
 * Gets a list of all unique categories from the blog data.
 * @returns {string[]} An array of unique category strings.
 */
const getAllCategories = (): string[] => {
  const categories = blogData.map(post => post.category);
  return [...new Set(categories)];
};

/**
 * Gets a list of all unique tags from the blog data.
 * @returns {string[]} An array of unique tag strings.
 */
const getAllTags = (): string[] => {
  const tags = blogData.flatMap(post => post.tags);
  return [...new Set(tags)];
};

// --- React Components ---

// Prop Types for Components
interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface SidebarCardProps {
  title: string;
  children: React.ReactNode;
}

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

interface TagListProps {
  tags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

interface RecentPostsProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

interface BlogSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  tags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  onPostSelect: (post: Post) => void;
}

interface BlogPostCardProps {
  post: Post;
  onPostSelect: (post: Post) => void;
}

interface BlogPostDetailProps {
  post: Post;
  onBack: () => void;
}

interface BlogListProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

// New prop type for Pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


/**
 * A reusable component for a search input field.
 * Styling updated to match dark theme.
 */
const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search blog..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /* Removed rounded-lg */
    />
    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>
);

/**
 * A reusable card component for sidebar sections.
 * Styling updated to match dark theme from screenshot.
 */
const SidebarCard: React.FC<SidebarCardProps> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 border border-gray-700"> {/* Removed rounded-lg */}
    <h3 className="text-xl font-semibold text-white mb-5 pb-3 border-b border-gray-700">
      {title}
    </h3>
    {children}
  </div>
);

/**
 * A component to display a list of categories for filtering.
 * Styling updated for dark theme.
 */
const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, setSelectedCategory }) => (
  <ul className="space-y-3">
    <li>
      <button
        onClick={() => setSelectedCategory(null)}
        className={`w-full text-left flex justify-between items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 ${
          selectedCategory === null ? 'font-bold text-blue-400' : ''
        }`}
      >
        <span>All Posts</span>
        <ChevronsRight className="w-4 h-4" />
      </button>
    </li>
    {categories.map(category => (
      <li key={category}>
        <button
          onClick={() => setSelectedCategory(category)}
          className={`w-full text-left flex justify-between items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 ${
            selectedCategory === category ? 'font-bold text-blue-400' : ''
          }`}
        >
          <span>{category}</span>
          <ChevronsRight className="w-4 h-4" />
        </button>
      </li>
    ))}
  </ul>
);

/**
 * A component to display a list of tags for filtering.
 * Styling updated for dark theme.
 */
const TagList: React.FC<TagListProps> = ({ tags, selectedTag, setSelectedTag }) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => setSelectedTag(null)}
      className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${ /* Removed rounded-full */
        selectedTag === null
          ? 'bg-blue-600 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      All
    </button>
    {tags.map(tag => (
      <button
        key={tag}
        onClick={() => setSelectedTag(tag)}
        className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${ /* Removed rounded-full */
          selectedTag === tag
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        #{tag}
      </button>
    ))}
  </div>
);

/**
 * A component to display "Recent Posts" links.
 * Styling updated for dark theme.
 */
const RecentPosts: React.FC<RecentPostsProps> = ({ onPostSelect }) => (
  <ul className="space-y-4">
    {/* Use full blogData for recent, not filtered posts */}
    {blogData.slice(0, 3).map(post => (
      <li key={post.id} className="flex items-start space-x-3">
        <img
          src={post.imageUrl}
          alt={post.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/100x100/cccccc/ffffff?text=Image')}
          className="w-16 h-16 object-cover flex-shrink-0" /* Removed rounded-lg */
        />
        <div>
          <button
            onClick={() => onPostSelect(post)}
            className="text-left font-medium text-gray-200 hover:text-blue-400 transition-colors duration-200 leading-tight"
          >
            {post.title}
          </button>
          <p className="text-sm text-gray-400 mt-1">
            {post.date}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

/**
 * The main sidebar component containing search, categories, recent posts, and tags.
 */
const BlogSidebar: React.FC<BlogSidebarProps> = (props) => (
  <aside className="w-full lg:w-1/3 space-y-8">
    <SidebarCard title="Search">
      <SearchInput 
        searchTerm={props.searchTerm} 
        setSearchTerm={props.setSearchTerm} 
      />
    </SidebarCard>
    
    <SidebarCard title="Categories">
      <CategoryList 
        categories={props.categories}
        selectedCategory={props.selectedCategory}
        setSelectedCategory={props.setSelectedCategory}
      />
    </SidebarCard>

    <SidebarCard title="Recent Posts">
      <RecentPosts 
        posts={blogData} 
        onPostSelect={props.onPostSelect}
      />
    </SidebarCard>

    <SidebarCard title="Tags">
      <TagList 
        tags={props.tags}
        selectedTag={props.selectedTag}
        setSelectedTag={props.setSelectedTag}
      />
    </SidebarCard>
  </aside>
);

/**
 * A card component to display a blog post summary.
 * Styling updated for dark theme: removed background and shadow, added border.
 */
const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onPostSelect }) => (
  <article className="overflow-hidden border border-gray-700 transition-all duration-300 hover:border-blue-500"> {/* Removed rounded-lg */}
    <img
      src={post.imageUrl}
      alt={post.title}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Blog+Image')}
      className="w-full h-64 object-cover"
    />
    <div className="p-6 md:p-8">
      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
        {post.title}
      </h2>
      <p className="text-gray-300 mb-6 leading-relaxed">
        {post.excerpt}
      </p>
      <button
        onClick={() => onPostSelect(post)}
        className="flex items-center space-x-2 font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
      >
        <span>Read More</span>
        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  </article>
);

/**
 * The component to display the full content of a selected blog post.
 * Styling updated for dark theme.
 */
const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => (
  <div className="bg-gray-800 overflow-hidden border border-gray-700"> {/* Removed rounded-lg */}
    <img
      src={post.imageUrl.replace('600x400', '800x400')} // Larger image for detail view
      alt={post.title}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/800x400/cccccc/ffffff?text=Blog+Image')}
      className="w-full h-72 md:h-96 object-cover"
    />
    <div className="p-6 md:p-10">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 group mb-6"
      >
        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1 transform rotate-180" />
        <span>Back to All Posts</span>
      </button>

      <div className="flex items-center space-x-2 text-sm text-blue-400 font-medium mb-3">
        <Tag className="w-4 h-4" />
        <span>{post.category}</span>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-700">
        <img src={post.authorAvatar} alt={post.author} className="w-12 h-12" /> {/* Removed rounded-full */}
        <div>
          <p className="font-semibold text-gray-200">{post.author}</p>
          <p>{post.date}</p>
        </div>
      </div>

      <div 
        className="prose prose-lg lg:prose-xl prose-invert max-w-none text-gray-300 
                prose-headings:font-bold prose-headings:text-white
                prose-a:text-blue-400 hover:prose-a:underline
                prose-img:shadow-md
                prose-blockquote:border-blue-400 prose-blockquote:bg-gray-900" /* Removed prose-img:rounded-lg */
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-10 pt-8 border-t border-gray-700">
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Tags:</h4>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-sm font-medium bg-gray-700 text-gray-300"> {/* Removed rounded-full */}
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * The main list of blog posts.
 * Styling updated for dark theme.
*/
const BlogList: React.FC<BlogListProps> = ({ posts, onPostSelect }) => (
  <div className="w-full space-y-12"> {/* Removed lg:w-2/3 to allow pagination to be full width */}
    {posts.length > 0 ? (
      posts.map(post => (
        <BlogPostCard key={post.id} post={post} onPostSelect={onPostSelect} />
      ))
    ) : (
      <div className="bg-gray-800 shadow-lg p-10 text-center border border-gray-700"> {/* Removed rounded-lg */}
        <h2 className="text-2xl font-semibold text-white">No Posts Found</h2>
        <p className="text-gray-400 mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    )}
  </div>
);

/**
 * NEW: Pagination Component
 * Renders page navigation buttons
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12 pt-8 border-t border-gray-700">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" /* Removed rounded-full */
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`flex items-center justify-center w-10 h-10 font-medium transition-colors ${ /* Removed rounded-full */
            currentPage === number
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" /* Removed rounded-full */
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};


/**
 * The main component that ties everything together.
 * Renamed to BlogPage to avoid conflicts.
 * Added a responsive wrapper for padding and max-width.
*/
export function BlogPage() { // Removed default export to allow multiple exports
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3; // You can change this number

  // Memoized lists of categories and tags
  const allCategories = useMemo(() => getAllCategories(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Memoized filtering logic
  const filteredPosts = useMemo(() => {
    return blogData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  // --- Pagination Logic ---
  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTag]);

  // Calculate current posts and total pages for pagination
  const { currentPosts, totalPages } = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    return { currentPosts: paginatedPosts, totalPages };
  }, [filteredPosts, currentPage]);


// Handlers
  function handlePostSelect(post: Post) {
        setSelectedPost(post);
        window.scrollTo(0, 0); // Scroll to top on post select
    }

  const handleBack = () => {
    setSelectedPost(null);
  };
  
  // This component manages the view (List vs Detail)
  const CurrentView: React.FC = () => {
    if (selectedPost) {
      return <BlogPostDetail post={selectedPost} onBack={handleBack} />;
    }
    return (
      // Use a Fragment to return list and pagination together
      <>
        <BlogList posts={currentPosts} onPostSelect={handlePostSelect} />
        {/* Only show pagination if there is more than one page */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </>
    );
  };

  return (
    // NEW: Added a wrapper to control layout, padding, and max-width
    // FIXED: Changed py-8 md:py-12 to pt-16 md:pt-24 to add top padding
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-12">
      <div className="flex flex-col lg:flex-row lg:gap-12"> {/* Increased gap for better spacing */}
        
        {/* Main Content Area (Blog List or BlogDetail) */}
        <div className={selectedPost ? "w-full" : "w-full lg:w-2/3"}>
          <CurrentView />
        </div>

        {/* Sidebar */}
        {/* Only show sidebar if no post is selected */}
        {!selectedPost && (
          <BlogSidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={allCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            tags={allTags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            onPostSelect={handlePostSelect}
          />
        )}
      </div>
    </div>
  );
}

// Export the Contact component as the default
export default Contact;
