import React, { useState, useMemo, useEffect } from 'react';
// --- MODIFIED: Added ArrowRight for CTA and X icon for sharing ---
import { Search, Tag, Calendar, User, ChevronsRight, ArrowRight, ChevronLeft, ChevronRight, Share2, Link, Facebook, Linkedin, X } from 'lucide-react';

// --- Helper function to create URL-friendly slugs ---
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
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
// --- MODIFIED: All content expanded and authors updated ---
const blogData: Post[] = [
  {
    id: 1,
    title: "Anatomy of a Modern Phishing Attack",
    slug: slugify("Anatomy of a Modern Phishing Attack"),
    excerpt: "A deep dive into a sophisticated multi-stage phishing campaign, from initial lure and credential theft to C2 communication and payload delivery.",
    content: `
      <p>Modern phishing attacks have evolved far beyond the poorly-spelled emails of the past. Today's campaigns are targeted, sophisticated, and multi-staged, designed to bypass both human suspicion and automated security filters. In this analysis, we dissect a real-world campaign that targeted employees in the financial services sector.</p>
      
      <img src="/img/Phishing_Analysis_Inner.webp" alt="SOCAnalyst.Pro Logo" class="my-6 shadow-md w-full h-auto" />
      
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Phase 1: The Lure and Initial Compromise</h3>
      <p>The attack began with a spear-phishing email, not a mass spam campaign. The email impersonated a trusted SaaS vendor (e.g., Microsoft 365 or Salesforce), alerting the user to an 'urgent security issue' with their account. The email used several sophisticated techniques:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Sender Spoofing:</strong> The 'From' address appeared legitimate, passing casual inspection. Deeper analysis showed it originated from a 'typosquatted' domain (e.g., 'microsft-security.com').</li>
        <li><strong>Social Engineering:</strong> The language conveyed urgency and authority, pressing the user to 'validate their account immediately' to avoid suspension.</li>
        <li><strong>Evasive Link:</strong> The 'Validate Now' button linked to a redirector service, which first fingerprinted the user's device (browser, OS, location) before forwarding them to the actual phishing site. This technique is often used to evade sandbox analysis by security vendors.</li>
      </ul>
      <p>The landing page was a pixel-perfect clone of the legitimate Microsoft 365 login portal. Upon entering credentials, the user's browser submitted a POST request to a C2 (Command and Control) server, while simultaneously redirecting the user to the *real* Microsoft login page, creating the illusion of a simple login error.</p>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Phase 2: Credential Validation and Session Hijacking</h3>
      <p>The C2 server didn't just store the credentials; it immediately used them in an automated script to log in to the user's real account. This was done to capture the Multi-Factor Authentication (MFA) token, typically sent as a push notification or SMS.</p>
      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400">
        <p class="italic text-gray-300">"This is the critical window. The user, having just entered their password, expects an MFA prompt. The attacker's script triggers the real prompt, and the user approves it, thinking they are completing their own 'failed' login. The attacker has now captured the session cookie."</p>
        <cite class="block text-right text-gray-400 mt-2">- SOCAnalyst.Pro</cite>
      </blockquote>
      <p>With a valid session cookie, the attacker gains persistent access, bypassing the need for the password or future MFA. The attacker then set up inbox rules to auto-delete security alerts from IT and forward sensitive emails to an external account.</p>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Detection & Response for SOC Analysts</h3>
      <p>Detecting this requires layered defenses:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Email Gateway:</strong> Configure filters to quarantine emails from newly registered domains and analyze links for redirect chains.</li>
        <li><strong>SIEM Alerts:</strong> Correlate 'impossible travel' alerts (e.g., login from user's home IP and C2 server's IP simultaneously) with new inbox rule creation.</li>
        <li><strong>User Training:</strong> Move beyond 'check the spelling'. Train users to inspect link destinations on hover and to be suspicious of *any* unexpected MFA prompt.</li>
      </ul>
      <p>Response involves immediate session revocation for the compromised user, a full password reset, and a comprehensive audit of their mailbox for data exfiltration and newly created rules.</p>
    `,
    author: "SOCAnalyst.Pro",
    // --- MODIFIED: Author avatar path updated ---
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-28",
    category: "Threat Analysis",
    tags: ["Phishing", "SOC", "Incident Response", "Social Engineering"],
    // --- MODIFIED: Image dimensions updated for Open Graph (1200x630) ---
    imageUrl: "/img/Phishing_Analysis_Cover.webp"
  },
  {
    id: 2,
    title: "The Rise of AI in Threat Detection",
    slug: slugify("The Rise of AI in Threat Detection"),
    excerpt: "How Machine Learning and AI are moving beyond buzzwords to become a SOC's most powerful tool for anomaly detection and alert triage.",
    content: `
      <p>The modern Security Operations Center (SOC) is drowning in data. A typical enterprise generates terabytes of logs daily from firewalls, endpoints, servers, and cloud services. It's impossible for human analysts to manually review this data. This is where Artificial Intelligence (AI) and Machine Learning (ML) transition from marketing buzzwords to mission-critical tools.</p>

      <img src="/img/AI_and_Security_Inner.webp" alt="SOCAnalyst.Pro Logo" class="my-6 shadow-md w-full h-auto" />
      
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Moving Beyond Signature-Based Detection</h3>
      <p>Traditional security tools are reactive. They rely on 'signatures'—known patterns of badness, like a virus hash or a specific IP address. The problem? They are completely blind to 'zero-day' attacks and novel attacker techniques. ML models, in contrast, are predictive and adaptive. They are trained to understand *normal*.</p>
      
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Key Use Case: User and Entity Behavior Analytics (UEBA)</h3>
      <p>UEBA is perhaps the most impactful application of AI in a SOC. Here's how it works:</p>
      <ol class="list-decimal list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Baseline Creation:</strong> The ML model observes network activity for weeks, learning the unique 'rhythm' of every user and device. What hours does Jane from marketing normally work? What servers does she access? How much data does she typically upload?</li>
        <li><strong>Anomaly Detection:</strong> The model continuously scores new activity against this baseline.</li>
        <li><strong>High-Fidelity Alerts:</strong> When Jane's account suddenly logs in at 3 AM from an unrecognized IP, accesses the finance server for the first time, and begins exfiltrating gigabytes of data, the system flags this as a high-confidence anomaly.</li>
      </ol>
      <p>Instead of 10,000 low-level alerts, the SOC analyst receives one high-priority alert that says: "This account is behaving in a way that is 99% anomalous." This allows analysts to focus on investigating real threats, not drowning in false positives.</p>

      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400">
        <p class="italic text-gray-300">"Our AI doesn't replace our analysts. It empowers them. It acts as a Tier-1 analyst that never sleeps, escalating only the most suspicious events. Our team can then perform the deep-dive investigation that requires human intuition."</p>
        <cite class="block text-right text-gray-400 mt-2">- SOCAnalyst.Pro</cite>
      </blockquote>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">The Future: AI-Driven SOAR</h3>
      <p>The next frontier is integrating AI with Security Orchestration, Automation, and Response (SOAR) platforms. In this model, the AI not only detects the threat but also initiates the response. For example, upon detecting the anomalous behavior from Jane's account, the SOAR playbook could be automatically triggered to:
      </p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li>Isolate the user's machine from the network.</li>
        <li>Temporarily suspend the user's account.</li>
        <li>Create a high-priority incident ticket for a Tier-2 analyst with all relevant logs and data compiled.</li>
      </ul>
      <p>This automated response can reduce attacker dwell time from days or weeks to mere seconds.</p>
    `,
    author: "SOCAnalyst.Pro",
    // --- MODIFIED: Author avatar path updated ---
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-25",
    category: "Cybersecurity",
    tags: ["AI", "Machine Learning", "SOC", "SIEM", "UEBA"],
    // --- MODIFIED: Image dimensions updated for Open Graph (1200x630) ---
    imageUrl: "/img/AI_and_Security_Cover.webp"
  },
  {
    id: 3,
    title: "Incident Response Playbook: A Step-by-Step Guide",
    slug: slugify("Incident Response Playbook: A Step-by-Step Guide"),
    excerpt: "A breach is detected. Panic is not an option. We walk through the six phases of the NIST Incident Response framework.",
    content: `
      <p>When a security incident is declared, chaos is the enemy. A well-defined, actionable Incident Response (IR) playbook is the only way to ensure a coordinated, effective, and timely response. Without one, teams operate in silos, evidence is destroyed, and recovery is delayed. We'll walk through the industry-standard six-phase model, based on the NIST framework.</p>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">The 6 Phases of Incident Response (NIST SP 800-61)</h3>
      <p>Your playbook should be built around these six critical phases. Note that these are not always linear; you may cycle between containment, eradication, and recovery multiple times.</p>
      
      <img src="/img/IR_Playbook_Inner.webp" alt="SOCAnalyst.Pro Logo" class="my-6 shadow-md w-full h-auto" />

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">1. Preparation</h4>
      <p>This is the most important phase, and it happens *before* the incident. If you're building your playbook during an attack, it's already too late. Preparation includes:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Tooling:</strong> Having your SIEM, EDR (Endpoint Detection & Response), and SOAR platforms deployed and configured.</li>
        <li><strong>Documentation:</strong> Maintaining accurate network diagrams, asset inventories, and contact lists for key personnel (including legal and PR).</li>
        <li><strong>Training:</strong> Running regular tabletop exercises and drills. Your IR team shouldn't be reading the playbook for the first time during a real event.</li>
      </ul>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">2. Identification (Detection & Analysis)</h4>
      <p>This phase is where a SOC analyst triages an alert. Is this a false positive or a real incident? Key questions:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li>What is the vector of attack (e.g., phishing, vulnerability exploit)?</li>
        <li>What systems are affected? Is it one laptop or a domain controller?</li>
        <li>Is the attack ongoing?</li>
      </ul>
      <p>This analysis dictates the incident's priority. A ransomware outbreak on a critical server is a 'drop everything' event. A single adware detection is a low priority.</p>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">3. Containment</h4>
      <p>Stop the bleeding. The immediate goal is to prevent the attack from spreading. Containment strategies can be short-term or long-term:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Short-Term:</strong> Immediately isolate the affected host from the network (an EDR function), block the attacker's IP on the firewall.</li>
        <li><strong>Long-Term:</strong> Segment the network. If the attacker is in your user VLA, ensure they can't pivot to the server VLAN.</li>
      </ul>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">4. Eradication</h4>
      <p>Find the root cause and eliminate it. It's not enough to just delete the malware. You must understand *how* it got in. Did they exploit an unpatched server? Steal credentials?</p>
      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400">
        <p class="italic text-gray-300">"If you 'clean' a machine by deleting a virus but don't patch the vulnerability it used, you're not done. The attacker will be back in hours. Eradication means closing the door, not just swatting the fly."</p>
        <cite class="block text-right text-gray-400 mt-2">- SOCAnalyst.Pro</cite>
      </blockquote>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">5. Recovery</h4>
      <p>This is the process of safely restoring systems to normal operation. This phase must be deliberate. You must validate that systems are clean *before* connecting them back to the network. This involves restoring from known-good backups and monitoring the systems closely for any signs of reinfection.</p>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">6. Lessons Learned (Post-Incident Activity)</h4>
      <p>Within two weeks of the incident, hold a 'blameless' post-mortem. The goal is not to fire anyone, but to understand what went wrong and how to improve. Key outputs:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li>What was the timeline of the attack and our response?</li>
        <li>Where did our playbooks fail? Where did they succeed?</li>
        <li>What new tools, alerts, or training do we need to prevent this specific attack from happening again?</li>
      </ul>
      <p>This final step feeds back into the Preparation phase, creating a cycle of continuous improvement for your security posture.</p>
    `,
    author: "SOCAnalyst.Pro",
    // --- MODIFIED: Author avatar path updated ---
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-22",
    category: "Incident Response",
    tags: ["IR", "Playbook", "SOC", "Management"],
    // --- MODIFIED: Image dimensions updated for Open Graph (1200x630) ---
    imageUrl: "/img/IR_Playbook_Cover.webp"
  },
  {
    id: 4,
    title: "CVEs You Missed: Beyond the Hype",
    slug: slugify("Common Vulnerabilities and Exposures (CVEs) You Missed"),
    excerpt: "Why your vulnerability management program is failing. A review of critical CVEs that are *actually* being exploited in the wild.",
    content: `
      <p>Every week, hundreds of new Common Vulnerabilities and Exposures (CVEs) are published. Security teams are inundated with 'Critical' and 'High' severity alerts. The problem? Not all 'Critical' vulnerabilities are created equal. Many high-score CVEs are complex to exploit and see no real-world attacks. Meanwhile, a 'Medium' severity bug that is trivial to exploit can be tearing through networks.</p>
      <p>A mature vulnerability management program moves beyond just CVSS scores and focuses on *exploitable* and *exploited* vulnerabilities.</p>
      
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Case Study 1: The 'Critical' Hype (CVE-2025-XXXX)</h3>
      <p>Last quarter, CVE-2025-XXXX, a 9.8 'Critical' RCE vulnerability, was announced in a niche enterprise Java framework. Panic ensued, and teams scrambled to patch. However, exploiting this bug required a complex, non-default configuration and deep system knowledge. To date, there is no public proof-of-concept (PoC) and no evidence of in-the-wild exploitation.</p>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Case Study 2: The 'Medium' Threat (CVE-2025-YYYY)</h3>
      <p>In contrast, CVE-2025-YYYY was a 'Medium' 6.5 vulnerability—a simple cross-site scripting (XSS) flaw in a popular public-facing helpdesk portal. Within 48 hours of its disclosure, a PoC was on GitHub. Attackers began using it to steal admin session cookies, allowing full takeover of the helpdesk system. This 'Medium' flaw led to numerous significant breaches.</p>
      
      <img src="/img/CVE_Analysis_Inner.webp" alt="SOCAnalyst.Pro Logo" class="my-6 shadow-md w-full h-auto" />

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Threat-Informed Prioritization</h3>
      <p>Your patch cycle should be dictated by threat intelligence, not just a scanner report. Your team must ask:</p>
      <ol class="list-decimal list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Is this vulnerability externally facing?</strong> A vulnerable internal-only server is lower risk than a vulnerable firewall.</li>
        <li><strong>Is there a public PoC exploit?</strong> This drastically lowers the bar for attackers.</li>
        <li><strong>Is this CVE on CISA's KEV list?</strong> The 'Known Exploited Vulnerabilities' catalog is your new bible. It lists vulnerabilities that are being *actively exploited* in the wild.</li>
      </ol>

      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400">
        <p class="italic text-gray-300">"Your scanner says you have 10,000 'Critical' vulnerabilities. Threat intelligence tells you which 10 matter *right now*. A 30-day patch window is fine for most. A 24-hour window is required for a CVE on the KEV list."</p>
        <cite class="block text-right text-gray-400 mt-2">- SOCAnalyst.Pro</cite>
      </blockquote>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Actionable Steps for SOCs</h3>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Ingest Threat Feeds:</strong> Integrate CISA's KEV list and other threat intelligence feeds directly into your vulnerability management tool.</li>
        <li><strong>Prioritize Asset Criticality:</strong> A vulnerability on a domain controller or a public-facing web server is infinitely more critical than the same flaw on a marketing intern's laptop.</li>
        <li><strong>Measure 'Time to Patch' for KEVs:</strong> This is your new critical metric. How long does it take your organization to patch a known *exploited* vulnerability? This, not your total patch count, is what will save you from a breach.</li>
      </ul>
    `,
    author: "SOCAnalyst.Pro",
    // --- MODIFIED: Author avatar path updated ---
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-19",
    category: "Vulnerability Management",
    tags: ["CVE", "Pentesting", "Patching", "Cybersecurity"],
    // --- MODIFIED: Image dimensions updated for Open Graph (1200x630) ---
    imageUrl: "/img/CVE_Analysis_Cover.webp"
  },
  {
    id: 5,
    title: "Zero Trust Architecture: A Practical Guide",
    slug: slugify("Zero Trust Architecture: A Practical Guide"),
    excerpt: "Moving beyond the 'castle-and-moat' security model. What Zero Trust *really* means and how to start implementing it today.",
    content: `
      <p>For decades, network security was built on the 'castle-and-moat' principle: a hard, crunchy exterior (firewalls, VPNs) and a soft, chewy interior where everyone and everything was trusted. This model is broken. Once an attacker breaches the perimeter—via phishing or a vulnerable server—they can move laterally with ease. Zero Trust is a security model that fixes this. Its core principle is simple: <strong>"Never trust, always verify."</strong></p>
      
      <p>Zero Trust assumes that the network is already compromised. It requires that all users, devices, and applications, whether inside or outside the network, be authenticated, authorized, and continuously validated before being granted access.</p>

      <img src="/img/Zero_Trust_Inner.webp" alt="SOCAnalyst.Pro Logo" class="my-6 shadow-md w-full h-auto" />

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">The Core Pillars of Zero Trust</h3>
      <p>Zero Trust isn't a single product you can buy; it's an architectural approach built on several pillars:</p>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">1. Identity (The User)</h4>
      <p>This is the foundation. You must prove *who* is requesting access. This means moving beyond passwords.</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Strong Authentication:</strong> Phishing-resistant Multi-Factor Authentication (MFA) is non-negotiable.</li>
        <li><strong>Single Sign-On (SSO):</strong> Centralize identity management. Users log in once to an identity provider (like Okta, Azure AD) which then grants access to applications.</li>
      </ul>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">2. Device (The Endpoint)</h4>
      <p>It's not enough to know *who* is logging in. You must also know *what* they are logging in from. A trusted user on a compromised device is a major threat.</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Device Health:</strong> Is the device corporate-managed? Is its OS patched? Is the EDR solution running and healthy?</li>
        <li><strong>Conditional Access:</strong> A user can access non-sensitive apps from a personal phone, but can only access critical financial data from a compliant, corporate-managed laptop.</li>
      </ul>

      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">3. Network (The Pathway)</h4>
      <p>In Zero Trust, the network's only job is to connect systems. It no longer provides trust. The key here is segmentation.</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Micro-segmentation:</strong> This is a critical concept. Instead of one large 'trusted' internal network, you create tiny, isolated zones. The web server should *only* be able to talk to the database server on a specific port, and nothing else. This prevents lateral movement.</li>
      </ul>
      
      <h4 class="text-xl font-semibold text-gray-200 mt-6 mb-2">4. Application & Data (The 'Why')</h4>
      <p>Access is granted on a least-privilege basis. Users should only have access to the specific applications and data they need to do their job, and nothing more.</p>

      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400">
        <p class="italic text-gray-300">"Zero Trust is a journey, not a destination. You can start today. The first step for most organizations? Enforce MFA everywhere. That single step is the beginning of your Zero Trust journey."</p>
        <cite class="block text-right text-gray-400 mt-2">- SOCAnalyst.Pro</cite>
      </blockquote>
      
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">How to Start Your Zero Trust Journey</h3>
      <p>It can be overwhelming. Don't try to boil the ocean. Start with high-impact, low-complexity projects:</p>
      <ol class="list-decimal list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Enforce MFA Everywhere:</strong> Start with admins, then all users, then all services.</li>
        <li><strong>Identify Your 'Crown Jewels':</strong> What is your most critical data? Start building micro-segmentation rules around that data first.</li>
        <li><strong>Implement Conditional Access:</strong> Start with a simple policy: 'Block all logins from high-risk countries' or 'Require compliant device for admin access'.</li>
      </ol>
  a     <p>Every step you take reduces your attack surface and moves you away from the fragile 'castle-and-moat' model.</p>
    `,
    author: "SOCAnalyst.Pro",
    // --- MODIFIED: Author avatar path updated ---
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-15",
    category: "Cybersecurity",
    tags: ["Zero Trust", "Architecture", "MFA", "Network Security"],
    // --- MODIFIED: Image dimensions updated for Open Graph (1200x630) ---
    imageUrl: "/img/Zero_Trust_Cover.webp"
  },
  {
    id: 6,
    title: "Pentesting vs. Vulnerability Scanning",
    slug: slugify("Penetration Testing vs. Vulnerability Scanning"),
    excerpt: "They both find weaknesses, but their methods, goals, and outcomes are fundamentally different. Let's compare.",
    content: `
      <p>Many organizations use the terms "vulnerability scanning" and "penetration testing" interchangeably, but they are not the same. Understanding the difference is crucial for building a mature security program. One is an automated 'list' of potential problems; the other is a manual, goal-oriented 'attack' that simulates real-world risk.</p>

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Vulnerability Scanning (The "Mile Wide, Inch Deep")</h3>
      <p>A vulnerability scan is an automated process that uses a tool (like Nessus, Qualys, or OpenVAS) to scan your systems, networks, and applications for *known* vulnerabilities. It compares your system's configuration and patch levels against a massive database of known flaws.</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>What it is:</strong> An automated, broad scan.</li>
        <li><strong>What it finds:</strong> Known vulnerabilities, unpatched software, open ports, default credentials, and common misconfigurations.</li>
        <li><strong>The Output:</strong> A long report, often with hundreds or thousands of 'High' or 'Critical' findings, many of which may be false positives.</li>
        <li><strong>Analogy:</strong> This is like checking every window and door on your building to see if any are unlocked.</li>
      </ul>
      <p><strong>When to use it:</strong> All the time. Vulnerability scanning should be a continuous, automated process. Run it weekly or even daily on critical assets.</p>

      <img src="/img/Pentest_VS_Scan_Inner.webp" alt="SOCAnalyst.Pro Logo" class="my-6 shadow-md w-full h-auto" />

      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">Penetration Testing (The "Inch Wide, Mile Deep")</h3>
      <p>A penetration test (or 'pentest') is a manual, goal-oriented exercise that simulates a real-world attacker. A human expert (a 'pentester') takes the *results* of a vulnerability scan and goes further. They don't just find the 'unlocked window'; they *climb through it* to see what they can steal.</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>What it is:</strong> A manual, focused, human-driven attack simulation.</li>
        <li><strong>What it finds:</strong> Business logic flaws, chained exploits, and the *actual business risk*. It answers the question, "Can an attacker compromise our customer database?" not just "Is port 3389 open?"</li>
        <li><strong>The Output:</strong> A concise, executive-level report that details *how* the tester breached defenses and what data they accessed. It focuses on *impact*.</li>
        <li><strong>Analogy:</strong> This is hiring a professional thief to see if they can break in and steal a specific, high-value painting from your vault.</li>
      </ul>

      <blockquote class="my-6 p-4 bg-gray-800 border-l-4 border-blue-400">
a       <p class="italic text-gray-300">"A vulnerability scan tells you that you have a 'Medium' risk vulnerability. A pentest report tells you, 'I used that 'Medium' vulnerability to pivot, escalate my privileges, and dump your entire domain controller.' One is a list, the other is proof of risk."</p>
        <cite class="block text-right text-gray-400 mt-2">- SOCAnalyst.Pro</cite>
      </blockquote>
      
      <h3 class="text-2xl font-semibold text-gray-200 mt-6 mb-3">How They Work Together</h3>
a     <p>You don't choose one or the other; you need both. A mature security program looks like this:</p>
      <ol class="list-decimal list-inside space-y-2 my-4 pl-4 text-gray-300">
        <li><strong>Continuous Scanning:</strong> Run automated vulnerability scans weekly. Your SOC team uses these reports for their routine patch management.</li>
        <li><strong>Annual Pentesting:</strong> Once or twice a year (and after major application changes), you hire an external pentesting team. They will find the gaps your automated tools and internal team missed.</li>
      </ol>
      <p>Use vulnerability scanning to manage your known weaknesses. Use penetration testing to discover your unknown risks and test your defenses against a creative human attacker.</p>
    `,
    author: "SOCAnalyst.Pro",
    // --- MODIFIED: Author avatar path updated ---
    authorAvatar: "/img/socanalystpro_logo.webp",
    date: "2025-10-12",
    category: "Vulnerability Management",
    tags: ["Pentesting", "Vulnerability Scanning", "Red Team", "CVE"],
    // --- MODIFIED: Image dimensions updated for Open Graph (1200x630) ---
    imageUrl: "/img/Pentest_VS_Scan_Cover.webp"
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
  onShare: () => void;
}

interface BlogListProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface ShareModalProps {
  post: Post;
  onClose: () => void;
}

// --- NEW: Prop type for AdBanner ---
interface AdBannerProps {
  href: string;
  thumbnail: string;
  alt: string;
  className?: string;
}

/**
 * A reusable component for a search input field.
 */
const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search blog..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>
);

/**
 * A reusable card component for sidebar sections.
 */
const SidebarCard: React.FC<SidebarCardProps> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 border border-gray-700">
    <h3 className="text-xl font-semibold text-white mb-5 pb-3 border-b border-gray-700">
      {title}
    </h3>
    {children}
  </div>
);

/**
 * A component to display a list of categories for filtering.
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
 */
const TagList: React.FC<TagListProps> = ({ tags, selectedTag, setSelectedTag }) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => setSelectedTag(null)}
      className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${
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
        className={`px-3 py-1 text-sm font-medium transition-colors duration-200 ${
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
 */
const RecentPosts: React.FC<RecentPostsProps> = ({ onPostSelect }) => (
  <ul className="space-y-4">
    {blogData.slice(0, 3).map(post => (
      <li key={post.id} className="flex items-start space-x-3 group">
        <img
          src={post.imageUrl}
          alt={post.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/100x100/cccccc/ffffff?text=Image')}
          className="w-16 h-16 object-cover flex-shrink-0"
        />
        <div>
          <a
            href={`?post=${post.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onPostSelect(post);
            }}
            className="text-left font-medium text-gray-200 group-hover:text-blue-400 transition-colors duration-200 leading-tight"
          >
            {post.title}
          </a>
          <p className="text-sm text-gray-400 mt-1">
            {post.date}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

/**
 * --- NEW: AdBanner Component ---
 * A reusable component for displaying advertisements.
 */
const AdBanner: React.FC<AdBannerProps> = ({ href, thumbnail, alt, className = "" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer nofollow"
    className={`block group relative overflow-hidden bg-gray-700 border border-gray-600 text-white ${className}`}
  >
    <img 
      src={thumbnail} 
      alt={alt} 
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/300x250/374151/ffffff?text=Advertisement')}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
    />
    <div className="absolute bottom-0 left-0 w-full p-3 bg-black bg-opacity-60 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wider">Advertisement</p>
    </div>
  </a>
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

    {/* --- NEW: Advertisement Banner --- */}
    <SidebarCard title="Our Partners">
      <AdBanner
        href="https://softwaredevelopmentontario.ca"
        thumbnail="/img/Our_Partner.webp"
        alt="Software Development Ontario"
      />
    </SidebarCard>
  </aside>
);

/**
 * A card component to display a blog post summary.
 * --- MODIFIED: Added group hover effects & title glow effect ---
 */
const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onPostSelect }) => (
  <article className="group overflow-hidden border border-gray-700 transition-all duration-300 hover:border-blue-500">
    <div className="overflow-hidden">
      <img
        src={post.imageUrl}
        alt={post.title}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/1200x630/cccccc/ffffff?text=Blog+Image')}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
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
      {/* --- MODIFIED: Added glowing text shadow --- */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight transition-all duration-300 group-hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
        {post.title}
      </h2>
      <p className="text-gray-300 mb-6 leading-relaxed">
        {post.excerpt}
      </p>
      <a
        href={`?post=${post.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onPostSelect(post);
        }}
        className="inline-flex items-center space-x-2 font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 group/link"
      >
        <span>Read More</span>
        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </div>
  </article>
);


/**
 * --- NEW: CallToAction Component ---
 * A reusable component to direct users to the contact page.
 */
const CallToAction: React.FC = () => (
  <div className="bg-blue-600 p-6 md:p-8 my-10 text-white shadow-lg relative overflow-hidden border border-blue-400">
    <h3 className="text-2xl font-bold mb-3">Need Expert Cybersecurity Solutions?</h3>
    <p className="text-blue-100 mb-6 max-w-2xl">
      From penetration testing to incident response, our team at SOCAnalyst.Pro is ready to secure your digital assets. Let's talk.
    </p>
    <a
      href="/contact" // This assumes your app router handles the /contact route
      className="inline-flex items-center space-x-2 font-semibold bg-white text-blue-700 px-5 py-3 shadow-md hover:bg-gray-100 transition-colors duration-200"
    >
      <span>Get in Touch</span>
      <ArrowRight className="w-5 h-5" />
    </a>
  </div>
);


/**
 * The component to display the full content of a selected blog post.
 * --- MODIFIED: Added CTA, Ad Banner, and Title Glow Effect ---
 */
const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack, onShare }) => (
  <div className="bg-gray-800 overflow-hidden border border-gray-700">
    <img
      // --- MODIFIED: Removed dimension replacement, using 1200x630 directly ---
      src={post.imageUrl}
      alt={post.title}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://placehold.co/1200x630/cccccc/ffffff?text=Blog+Image')}
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
      
      {/* --- MODIFIED: Added glowing text shadow --- */}
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
        {post.title}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-8 border-b border-gray-700 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <img src={post.authorAvatar} alt={post.author} className="w-12 h-12" />
          <div>
            <p className="font-semibold text-gray-200">{post.author}</p>
            <p className="text-sm text-gray-400">{post.date}</p>
          </div>
        </div>
        <button
          onClick={onShare}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Post</span>
        </button>
      </div>

      <div 
        className="prose prose-lg lg:prose-xl prose-invert max-w-none text-gray-300
                  prose-headings:font-bold prose-headings:text-white
                  prose-a:text-blue-400 hover:prose-a:underline
                  prose-img:shadow-md
                  prose-blockquote:border-blue-400 prose-blockquote:bg-gray-900"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* --- NEW: Call to Action Component --- */}
      <CallToAction />

      {/* --- NEW: In-Article Ad Banner --- */}
      <div className="my-10">
        <AdBanner
          href="https://www.softwaredevelopmentontario.ca/sdocustomsoftwares" // Update this link
          thumbnail="/img/Advertisement_3.webp"
          alt="A different ad for your clients"
        />
      </div>

      <div className="mt-10 pt-8 border-t border-gray-700">
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Tags:</h4>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-sm font-medium bg-gray-700 text-gray-300">
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
 */
const BlogList: React.FC<BlogListProps> = ({ posts, onPostSelect }) => (
  <div className="w-full space-y-12">
    {posts.length > 0 ? (
      posts.map(post => (
        <BlogPostCard key={post.id} post={post} onPostSelect={onPostSelect} />
      ))
    ) : (
      <div className="bg-gray-800 shadow-lg p-10 text-center border border-gray-700">
        <h2 className="text-2xl font-semibold text-white">No Posts Found</h2>
        <p className="text-gray-400 mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    )}
  </div>
);

/**
 * Pagination Component
 * --- MODIFIED: Increased tap target size for mobile ---
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
        className="flex items-center justify-center w-11 h-11 p-0 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`flex items-center justify-center w-11 h-11 p-0 font-medium transition-colors ${
            currentPage === number
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
          aria-label={`Go to page ${number}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-11 h-11 p-0 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};


/**
 * Share Modal Component
 * --- MODIFIED: Added 'X' (Twitter) icon ---
 */
const ShareModal: React.FC<ShareModalProps> = ({ post, onClose }) => {
  const [copyText, setCopyText] = useState("Copy");
  
  const postUrl = window.location.href;
  const postTitle = post.title;

  const handleCopy = () => {
    // Fallback for insecure contexts or older browsers (like in some iframes)
    // This is often more reliable inside sandboxed environments.
    try {
      const input = document.createElement('input');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      input.value = postUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 2000);
    } catch (err) {
      console.error('Fallback failed to copy: ', err);
      // Try the modern API as a last resort if execCommand fails
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(postUrl).then(() => {
          setCopyText("Copied!");
          setTimeout(() => setCopyText("Copy"), 2000);
        }, (navErr) => {
          console.error('Failed to copy: ', navErr);
          setCopyText("Failed");
        });
      } else {
        setCopyText("Failed");
      }
    }
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-gray-800 border border-gray-700 shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h3 className="text-xl font-semibold text-white mb-4">Share this Post</h3>
        <p className="text-gray-300 mb-5 line-clamp-1">{post.title}</p>

        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={postUrl}
            readOnly
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none"
           />
          <button
            onClick={handleCopy}
            className={`px-4 py-2 font-semibold text-white transition-colors duration-200 ${
              copyText === 'Copied!' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Link className="w-5 h-5 inline sm:hidden" />
            <span className="hidden sm:inline">{copyText}</span>
          </button>
        </div>

        <div className="flex justify-center space-x-3 sm:space-x-4">
          {/* --- NEW: Added X Button --- */}
          <button 
            onClick={shareOnTwitter}
            title="Share on X (Twitter)"
            className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white hover:bg-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={shareOnFacebook}
            title="Share on Facebook"
            className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white hover:bg-blue-600 transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </button>
          <button 
            onClick={shareOnLinkedIn} 
            title="Share on LinkedIn"
            className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white hover:bg-blue-700 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};


/**
 * The main component that ties everything together.
* --- MODIFIED: Added spacing and layout adjustments ---
*/
export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;

  const allCategories = useMemo(() => getAllCategories(), []);
  const allTags = useMemo(() => getAllTags(), []);

  useEffect(() => {
    const checkUrlForPost = () => {
      const params = new URLSearchParams(window.location.search);
      const postSlug = params.get('post');
      if (postSlug) {
        const post = blogData.find(p => p.slug === postSlug);
        if (post) {
          setSelectedPost(post);
          window.scrollTo(0, 0);
        }
      } else {
        setSelectedPost(null);
      }
    };

    checkUrlForPost();
    window.addEventListener('popstate', checkUrlForPost);
    return () => {
      window.removeEventListener('popstate', checkUrlForPost);
    };
  }, []);

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

  const { currentPosts, totalPages } = useMemo(() => {
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    return { currentPosts: paginatedPosts, totalPages };
  }, [filteredPosts, currentPage]);

  function handlePostSelect(post: Post) {
    const url = new URL(window.location.href);
    url.searchParams.set('post', post.slug);
     history.pushState({}, '', url);
    setSelectedPost(post);
    window.scrollTo(0, 0);
  }

  const handleBack = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('post');
    history.pushState({}, '', url);
    setSelectedPost(null);
  };
  
  const CurrentView: React.FC = () => {
    if (selectedPost) {
      return <BlogPostDetail 
                post={selectedPost} 
                onBack={handleBack} 
                onShare={() => setIsShareModalOpen(true)}
           />;
    }
    return (
      <>
        <BlogList posts={currentPosts} onPostSelect={handlePostSelect} />
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* --- MODIFIED: Increased gap for more breathing room --- */}
      <div className="flex flex-col lg:flex-row lg:gap-16">
        
        <div className={selectedPost ? "w-full" : "w-full lg:w-2/3"}>
           <CurrentView />
        </div>

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

      {isShareModalOpen && selectedPost && (
        <ShareModal post={selectedPost} onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
}