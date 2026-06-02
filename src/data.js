// ============================================================
//  LUMEN FORGE — AGENCY DATA FILE
//  Edit this file to update all content on the website
// ============================================================

export const agency = {
  name: "Lumen Forge",
  logo: "/logo.jpeg",
  tagline: "Powered by AR visualization, 3D technology, AI integration, and modern web engineering.",
  description: [
    "Lumen Forge is a full-service digital agency specialising in cutting-edge web development, AI integration, and immersive digital experiences. We partner with startups and established businesses alike to turn ambitious ideas into products that perform.",
    "Our approach is product-first: we think about your users, your goals, and your growth before writing a single line of code. From MVPs to enterprise platforms, we design and ship solutions that are built to last — and built to scale.",
  ],
  location: "Pakistan",
  available: true, // set to false to hide "Taking on new projects" badge
};

export const leadership = [
  {
    id: 1,
    role: "Founder",
    title: "Pakistan-based Founder",
    location: "Pakistan",
    image: "/founder.jpg",
    description:
      "Leads product direction, technical strategy, and hands-on delivery across web platforms, AI integrations, and immersive digital experiences.",
  },
  {
    id: 2,
    role: "Co-Founder",
    title: "UK-based Co-Founder",
    location: "United Kingdom",
    image: "/co-founder.jpeg",
    description:
      "Supports client partnerships, project discovery, and international delivery, helping teams turn ambitious ideas into polished digital products.",
  },
];

export const contact = {
  whatsapp: "+923452718668",
  linkedin: "https://www.linkedin.com/in/azhar-mehdi/",
  instagram: "https://www.instagram.com/lumenarforge/",
  upwork: "https://www.upwork.com/freelancers/azharmehdi",
};

// ── SERVICES ────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    icon: "Globe",
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications built with React, Next.js, Node.js, and modern databases. Scalable, maintainable, and production-ready from day one.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    id: 2,
    icon: "Bot",
    title: "AI Integration",
    description:
      "Supercharge your product with AI — chatbots, intelligent automation, LLM-powered features, and smart data processing using OpenAI, Claude, and more.",
    tags: ["OpenAI API", "Claude API", "LangChain", "RAG", "Automation"],
  },
  {
    id: 3,
    icon: "Layers",
    title: "AR & Immersive Experiences",
    description:
      "Bring your brand to life with augmented reality. From product try-ons and 3D configurators to interactive AR campaigns — we build experiences that stop the scroll and drive engagement.",
    tags: ["WebAR", "Three.js", "8th Wall", "Model Viewer", "USDZ / GLB"],
  },
  {
    id: 4,
    icon: "Smartphone",
    title: "Responsive UI/UX Design",
    description:
      "Pixel-perfect, mobile-first interfaces that delight users. From design systems to interactive components — beautiful, fast, and accessible.",
    tags: ["Tailwind CSS", "Figma", "Framer Motion", "Accessibility"],
  },
  {
    id: 5,
    icon: "ShoppingCart",
    title: "E-Commerce Solutions",
    description:
      "Custom e-commerce platforms and Shopify/WooCommerce integrations with secure payments, inventory management, and conversion-optimised UX.",
    tags: ["Shopify", "Stripe", "WooCommerce", "PayPal"],
  },
  {
    id: 6,
    icon: "Zap",
    title: "API Development & Integration",
    description:
      "RESTful and GraphQL APIs built for performance and security. Seamlessly connect third-party services, payment gateways, and data sources.",
    tags: ["REST", "GraphQL", "Webhooks", "Third-party APIs"],
  },
  
];

// ── PROJECTS ────────────────────────────────────────────────
// Set featured: true for the top 2 large cards.
// liveUrl is kept in data but NOT shown on the site publicly.
export const projects = [
  {
    id: 1,
    title: "AI Customer Support Bot",
    description:
      "A fully-featured AI chatbot integrated into a SaaS platform, reducing support ticket volume by 60%. Built with OpenAI's API, a custom knowledge base (RAG), and a sleek chat UI.",
    liveUrl: "", // share privately when needed
    tags: ["React", "OpenAI", "Node.js", "RAG"],
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A high-performance online store with Stripe payments, product variants, an admin dashboard, and automated order management — built from scratch with Next.js.",
    liveUrl: "",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    featured: true,
  },
  {
    id: 3,
    title: "AR Product Try-On Experience",
    description:
      "A WebAR product visualiser allowing shoppers to place and interact with 3D product models in their real environment before purchasing — boosting conversion rates significantly.",
    liveUrl: "",
    tags: ["WebAR", "Three.js", "8th Wall", "GLB"],
    featured: false,
  },
  {
    id: 4,
    title: "Real-Time Analytics Dashboard",
    description:
      "A live data dashboard for a logistics company, visualising shipment status, delivery metrics, and KPIs — updated every few seconds using WebSockets.",
    liveUrl: "",
    tags: ["React", "WebSockets", "Chart.js", "PostgreSQL"],
    featured: false,
  },
];

// ── TECH STACK (scrolling marquee) ──────────────────────────
export const techStack = [
  "React", "Next.js", "Node.js", "TypeScript", "Python",
  "PostgreSQL", "MongoDB", "Tailwind CSS", "OpenAI API",
  "Claude API", "WebAR", "Three.js", "AWS", "Vercel",
  "Docker", "GraphQL", "Stripe", "Shopify", "Framer Motion", "LangChain",
];

// ── STATS ────────────────────────────────────────────────────
export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];
