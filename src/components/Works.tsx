// import React from 'react'; // Combined imports
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react'; // Added CheckCircle for features

// --- UPDATED & EXPANDED DATA ARRAY ---
const projects = [
  {
    id: 1,
    title: "OSCP Journey Tracker Notebook",
    description: "Personalized study and progress tracking dashboard for OSCP preparation with notes and lab attempt tracking.",
    detailedDescription: "This full-stack application provides aspiring OSCP candidates with a centralized, private notebook to manage their study journey. Users can document notes from modules, track their progress against the syllabus, and log detailed reports for each lab machine they compromise, complete with commands, vulnerabilities, and remediation steps.",
    keyFeatures: [
      "Secure User Authentication & Private Notebooks",
      "Rich Text Editor for Detailed Note-Taking",
      "Lab Progress Tracker (Active, Rooted, User)",
      "Vulnerability & Exploit Attempt Logging"
    ],
    image: "/img/OSCP.webp",
    techStack: ["React", "Node.js", "MongoDB", "JWT"],
    liveDemoUrl: "https://oscp-exam-prep-tracker.netlify.app/"
  },
  {
    id: 2,
    title: "Phishing Awareness Training App",
    description: "Educational web app that simulates phishing attacks to train users on recognizing and avoiding threats.",
    detailedDescription: "A corporate-focused training tool that allows administrators to create and send simulated phishing email campaigns to their employees. The app tracks metrics like open rates, click rates, and data submission rates, providing a clear dashboard to measure organizational resilience and identify users who need more training.",
    keyFeatures: [
      "Realistic Email Template Library",
      "Scheduled Phishing Campaign Management",
      "Real-time Analytics & Reporting Dashboard",
      "User-facing Educational Portal on Threat Avoidance"
    ],
    image: "/img/PAT.webp",
    techStack: ["Next.js", "PostgreSQL", "Node.js", "TailwindCSS"],
    liveDemoUrl: "https://phishing-awareness-training-project.netlify.app/"
  },
  {
    id: 3,
    title: "Password Strength Analyzer",
    description: "Web app that evaluates password strength in real-time and suggests secure, user-friendly alternatives.",
    detailedDescription: "A client-side tool built to visually demonstrate password vulnerability. It analyzes input against common patterns, dictionary attacks, and character-set entropy, providing instant feedback and actionable suggestions for creating stronger, more resilient passwords without sacrificing memorability.",
    keyFeatures: [
      "Real-time Entropy Calculation",
      "Common Password & Dictionary Checks",
      "Visual Strength Meter (Weak, Medium, Strong)",
      "Secure, User-Friendly Password Generator"
    ],
    image: "/img/PSA.webp",
    techStack: ["JavaScript", "Node.js", "React", "zxcvbn"],
    liveDemoUrl: "https://password-strength-checker-app-info.netlify.app/"
  },
  {
    id: 4,
    title: "Red Team Cyber Attack Map",
    description: "Visualization dashboard that maps cyber attacks globally in real-time using simulated red team telemetry.",
    detailedDescription: "This project uses D3.js to create a compelling, real-time visualization of simulated cyber attacks. It ingests telemetry from various red team tools, parses geo-location data, and plots attacks on a global map, complete with attack type, source, and target information. It serves as an engaging visual centerpiece for a Security Operations Center.",
    keyFeatures: [
      "Real-time Data Visualization with D3.js",
      "Interactive Global Map (Zoom/Pan)",
      "Simulated Telemetry Feed Integration",
      "Attack Type Categorization & Filtering"
    ],
    image: "/img/RTCAM.webp",
    techStack: ["D3.js", "Node.js", "React", "WebSocket"],
    liveDemoUrl: "https://red-team-cyber-attack-map.netlify.app/"
  },
  {
    id: 5,
    title: "SOC Response Platform",
    description: "Security operations platform designed to automate response playbooks, alerts, and incident workflows.",
    detailedDescription: "A custom-built SOAR (Security Orchestration, Automation, and Response) platform. It integrates with SIEMs like Elasticsearch to ingest alerts, then automatically triggers predefined playbooks—such as isolating a host, detonating a file in a sandbox, or enriching an IP—dramatically reducing analyst workload and mean time to respond (MTTR).",
    keyFeatures: [
      "Elasticsearch (SIEM) Alert Ingestion",
      "Visual Playbook Builder (Drag-and-Drop)",
      "Automated Incident Triage & Enrichment",
      "Case Management & Analyst Queuing System"
    ],
    image: "/img/SOCIRW.webp",
    techStack: ["Python", "FastAPI", "Elasticsearch", "React"],
    liveDemoUrl: "https://soc-incident-response-workflow-tool.netlify.app/"
  },
  {
    id: 6,
    title: "Threat Intelligence Dashboard",
    description: "Cyber threat intelligence platform with real-time feed integration, attack categorization, and alerting.",
    detailedDescription: "This dashboard aggregates and de-duplicates threat intelligence from multiple open-source (OSINT) feeds. It provides a single pane of glass for analysts to view the latest Indicators of Compromise (IOCs), track Advanced Persistent Threats (APTs), and understand emerging attack patterns, complete with confidence scoring and TTP mapping.",
    keyFeatures: [
      "Multiple OSINT Feed Aggregation",
      "IOC Deduplication & Confidence Scoring",
      "MITRE ATT&CK Framework Mapping",
      "Searchable Database for IPs, Hashes, and Domains"
    ],
    image: "/img/TID.webp",
    techStack: ["Python", "Elasticsearch", "React", "MISP"],
    liveDemoUrl: "https://threat-intelligence-dashboard-app.netlify.app/"
  },
  {
    id: 7,
    title: "Vulnerability Scanner Simulator",
    description: "Security scanning tool that detects system vulnerabilities, misconfigurations, and outdated dependencies.",
    detailedDescription: "An educational tool designed to simulate the behavior of professional vulnerability scanners like Nessus or OpenVAS. The application scans a target (simulated) environment, identifies a predefined set of vulnerabilities (e.g., open ports, weak services, misconfigurations), and generates a professional report detailing the findings, CVSS scores, and remediation steps.",
    keyFeatures: [
      "Simulated Network Scanning Engine",
      "Vulnerability Database (CVSS Scoring)",
      "Comprehensive PDF Report Generation",
      "Scan Configuration & Target Management"
    ],
    image: "/img/VSS.webp",
    techStack: ["Python", "Flask", "React", "Nmap (sim)"],
    liveDemoUrl: "https://vulnerability-scanner.netlify.app/"
  },
  {
    id: 8,
    title: "SOC Analyst Simulation Platform",
    description: "A next-gen cybersecurity lab that simulates real SOC incidents, enabling analysts to detect and respond.",
    detailedDescription: "A 'flight simulator' for SOC analysts. This platform provides a virtualized environment with a SIEM, endpoint logs, and network traffic, then injects realistic attack scenarios (e.g., a ransomware outbreak, a phishing-to-C2 beacon). Analysts must use the tools to detect, investigate, and remediate the threat against the clock.",
    keyFeatures: [
      "Realistic Attack Scenario Injection",
      "Integrated SIEM & Endpoint (sim) Tools",
      "Scored Assessments & Feedback System",
      "Live 'Attacker' vs. 'Defender' Mode"
    ],
    image: "/img/SSP.webp",
    techStack: ["React", "Node.js", "WebSocket", "Docker"],
    liveDemoUrl: "https://soc-analyst-simulation-platform.netlify.app/"
  },
  {
    id: 9,
    title: "Pentesting Engagement Platform",
    description: "A complete vulnerability assessment tool that manages penetration tests, reports findings, and enhances security posture.",
    detailedDescription: "This platform streamlines the entire penetration testing lifecycle. Pentesters use it to manage engagements, document findings in real-time, and automatically generate comprehensive, client-ready reports. Clients can log in to view findings, track remediation progress, and request re-tests, creating a collaborative security partnership.",
    keyFeatures: [
      "Engagement & Scope Management",
      "Real-time Vulnerability Write-up Editor",
      "Automated PDF Report Generation",
      "Client-side Remediation Tracking Portal"
    ],
    image: "/img/PEP.webp",
    techStack: ["Next.js", "Node.js", "MongoDB", "TailwindCSS"],
    liveDemoUrl: "https://pentesting-engagement-platform.netlify.app/"
  }
];


const Works = () => {
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
              OUR <span className="text-cyan-400">WORKS</span>
            </motion.h1>
            <div className="h-1 w-32 bg-cyan-400 mx-auto mb-8"></div> {/* Removed rounded-full */}
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Showcasing our cybersecurity implementations, SOC deployments, and security transformations for Canadian businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MODIFIED: Works List (2-Card Layout) --- */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Changed to 2-column grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-stretch"> 
            {projects.map((project, index) => {
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black border border-cyan-400/30 overflow-hidden flex flex-col group h-full" // Card styles - Removed rounded-lg
                  whileHover={{ 
                    borderColor: '#00D4FF',
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)'
                  }}
                >
                  {/* Image on Top */}
                  <motion.div
                    className="aspect-video w-full bg-black border-b-2 border-cyan-400/50 overflow-hidden"
                    style={{ perspective: '1000px' }}
                  >
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover" 
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5, // 3D Tilt
                      }}
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x338/0E1018/00D4FF?text=${project.title.replace(' ', '+')}`;
                        e.currentTarget.alt = `${project.title} placeholder`;
                      }}
                    />
                  </motion.div>

                  {/* Text Content Below */}
                  <div className="p-8 flex flex-col justify-between flex-grow"> {/* Added flex-grow */}
                    <div> {/* Wrapper for top content */}
                      {/* Title */}
                      <h2 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                      </h2>
                      {/* Subtitle (Original Description) */}
                      <p className="text-lg text-cyan-400 font-bold mb-6">
                        {project.description}
                      </p>
                      {/* Detailed Description */}
                      <p className="text-gray-300 text-base leading-relaxed mb-6">
                        {project.detailedDescription}
                      </p>

                      {/* Key Features */}
                      <div className="mb-6">
                        <h3 className="text-base font-black mb-4 text-cyan-400 uppercase tracking-wider">KEY FEATURES</h3>
                        <ul className="space-y-2">
                          {project.keyFeatures.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center text-gray-300 text-sm" // Smaller text
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <CheckCircle className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" /> {/* Smaller icon */}
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div> {/* End wrapper for top content */}

                    {/* Bottom content: Tech Stack and Live Demo Button */}
                    <div className="mt-auto"> {/* Pushes to bottom */}
                      {/* Tech Stack */}
                      <div className="mb-8">
                        <h3 className="text-base font-black mb-4 text-cyan-400 uppercase tracking-wider">TECHNOLOGIES USED</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="bg-gray-800 border border-cyan-400/50 px-3 py-1 text-sm font-bold text-cyan-400" // Removed rounded-full
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Live Demo Button */}
                      <motion.a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-cyan-400 text-black px-8 py-3 font-black text-base tracking-wider hover:bg-white transition-all duration-300" // Removed rounded-md
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ExternalLink className="h-5 w-5" />
                          LIVE DEMO
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* --- END: Works Grid --- */}


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
              READY FOR YOUR <span className="text-cyan-400">TRANSFORMATION</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how we can implement a world-class cybersecurity solution for your Canadian business.
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
              START YOUR PROJECT
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Works;

