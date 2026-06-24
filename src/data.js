// ============================================================
//  LUMENARFORGE — AGENCY DATA FILE
//  Edit this file to update all content on the website
// ============================================================

export const agency = {
  name: "LumenarForge",
  logo: "/logo.svg",
  tagline: "Powered by AR visualization, 3D technology, AI integration, and modern web engineering.",
  description: [
    "LumenarForge is a full-service digital agency specialising in cutting-edge web development, AI integration, and immersive digital experiences. We partner with startups and established businesses alike to turn ambitious ideas into products that perform.",
    "Our approach is product-first: we think about your users, your goals, and your growth before writing a single line of code. From MVPs to enterprise platforms, we design and ship solutions that are built to last — and built to scale.",
  ],
  location: "Pakistan",
  available: true, // set to false to hide "Taking on new projects" badge
};

export const leadership = [
  {
    id: 1,
    role: "Founder",
    name: "LumenarForge Founder",
    title: "Founder & Lead Developer",
    location: "Pakistan",
    description:
      "Leads product direction, technical strategy, and hands-on delivery across web platforms, AI integrations, and immersive digital experiences.",
  },
  {
    id: 2,
    role: "Co-Founder",
    name: "LumenarForge Co-Founder",
    title: "Co-Founder & Operations Lead",
    location: "Pakistan",
    description:
      "Supports client partnerships, project discovery, and international delivery, helping teams turn ambitious ideas into polished digital products.",
  },
];

export const contact = {
  email: "hello@lumenarforge.com",
  linkedin: "https://www.linkedin.com/company/arlumenforge/",
  instagram: "https://www.instagram.com/lumenarforge/",
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

export const serviceDetails = [
  {
    id: "full-stack-development",
    icon: "Globe",
    title: "Full-Stack Web Development",
    eyebrow: "Web platforms",
    description:
      "Modern responsive websites, landing pages, dashboards, backend systems, APIs, and scalable platforms built around speed, usability, and maintainability.",
    benefits: [
      "Conversion-focused pages that feel fast on every device",
      "Clean backend architecture for forms, dashboards, and data workflows",
      "Maintainable codebases that can grow with new product needs",
    ],
    capabilities: ["React", "Next.js", "Node.js", "APIs", "Dashboards", "Databases"],
    cta: "Plan a web project",
  },
  {
    id: "ai-integration",
    icon: "Bot",
    title: "AI Integration",
    eyebrow: "Intelligent automation",
    description:
      "AI chatbots, workflow automation, assistants, API integrations, and process automation that help teams move faster without adding operational noise.",
    benefits: [
      "Customer-facing AI assistants with clear handoff paths",
      "Internal automations for repetitive business processes",
      "AI features connected to the tools your team already uses",
    ],
    capabilities: ["OpenAI API", "Claude API", "RAG", "Automation", "AI Assistants", "Webhooks"],
    cta: "Discuss AI integration",
  },
  {
    id: "ar-commerce",
    icon: "Layers",
    title: "AR & Immersive Experiences",
    eyebrow: "Spatial commerce",
    description:
      "Product visualization, view-in-room experiences, 3D model integration, and furniture or e-commerce AR use cases that make buying decisions easier.",
    benefits: [
      "Let shoppers inspect products from every angle",
      "Bring furniture, decor, and products into real customer spaces",
      "Reduce uncertainty on high-consideration product pages",
    ],
    capabilities: ["WebAR", "Model Viewer", "GLB", "USDZ", "View in room", "3D configurators"],
    cta: "Explore AR commerce",
  },
  {
    id: "3d-product-visualization",
    icon: "ShoppingCart",
    title: "3D Product Visualization",
    eyebrow: "Interactive product detail",
    description:
      "Optimized 3D assets, interactive product viewers, browser-based 3D experiences, and performance-aware implementation for product-led brands.",
    benefits: [
      "Interactive viewers that load smoothly on modern devices",
      "Material, color, and structure presentation for richer product detail",
      "Reusable 3D systems for catalogs, campaigns, and landing pages",
    ],
    capabilities: ["Three.js", "3D viewers", "Asset optimization", "Texture workflows", "Performance tuning"],
    cta: "Start a 3D experience",
  },
  {
    id: "ui-ux-design",
    icon: "Smartphone",
    title: "UI/UX Design",
    eyebrow: "Conversion systems",
    description:
      "Conversion-focused interfaces, responsive layouts, customer journey improvements, and modern visual systems for web products and digital campaigns.",
    benefits: [
      "Clear paths from first visit to inquiry, booking, or checkout",
      "Responsive layouts designed for scanning and action",
      "Design systems that keep pages consistent as the site grows",
    ],
    capabilities: ["Figma", "Design systems", "Responsive UX", "Accessibility", "Landing pages"],
    cta: "Improve the user journey",
  },
  {
    id: "e-commerce-solutions",
    icon: "Zap",
    title: "E-Commerce Solutions",
    eyebrow: "Stores that sell",
    description:
      "Product pages, checkout flows, conversion optimization, catalog experiences, and immersive shopping journeys for brands ready to sell smarter online.",
    benefits: [
      "Product pages built to educate and convert",
      "Checkout and catalog flows that reduce friction",
      "Immersive shopping moments that differentiate the brand",
    ],
    capabilities: ["Shopify", "Stripe", "WooCommerce", "Catalog UX", "Checkout flows", "AR shopping"],
    cta: "Optimize commerce",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Clarify the opportunity",
    description:
      "We map the customer journey, business goal, and technical constraints before choosing the right web, AI, AR, or 3D approach.",
  },
  {
    step: "02",
    title: "Prototype the experience",
    description:
      "We shape the core interaction quickly, whether that is a landing page, AI workflow, 3D product viewer, or full platform flow.",
  },
  {
    step: "03",
    title: "Build for launch",
    description:
      "We implement responsive interfaces, integrations, performance details, and deployment paths with maintainability in mind.",
  },
  {
    step: "04",
    title: "Refine after real use",
    description:
      "We review behavior, improve conversion points, and prepare the system for new campaigns, services, or product lines.",
  },
];

export const differentiators = [
  {
    title: "Immersive commerce expertise",
    description:
      "We connect AR, 3D, and product storytelling so customers can understand the real feel of what they are buying.",
  },
  {
    title: "AI with practical outcomes",
    description:
      "We focus on assistants, automations, and integrations that save time or improve customer experience, not novelty features.",
  },
  {
    title: "Engineering that scales",
    description:
      "Every build is structured so future pages, services, dashboards, and integrations can be added without starting again.",
  },
  {
    title: "Conversion-led design",
    description:
      "Visual polish matters, but every section also has a job: explain value, reduce uncertainty, and move users toward action.",
  },
];

export const values = [
  {
    title: "Conversion-first design",
    description: "We design every page around the decision a customer needs to make next.",
  },
  {
    title: "Scalable engineering",
    description: "We build with clean architecture, reusable systems, and future service expansion in mind.",
  },
  {
    title: "Clear communication",
    description: "We keep technical tradeoffs understandable, visible, and tied to business outcomes.",
  },
  {
    title: "Immersive user experiences",
    description: "We use AR, AI, and 3D when they make products easier to evaluate and remember.",
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
