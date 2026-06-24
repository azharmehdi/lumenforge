import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe, Bot, Smartphone, ShoppingCart, Zap, Layers,
  ArrowUpRight, Menu, X, MapPin, Send,
  CheckCircle2, Calendar, PlayCircle,
} from "lucide-react";
import {
  agency,
  contact,
  services,
  serviceDetails,
  techStack,
  stats,
  leadership,
  processSteps,
  differentiators,
  values,
} from "./data";
import promaxImage from "./assets/promax.png";
import founderPhoto from "./assets/team/11.jpg";
import coFounderPhoto from "./assets/team/22.jpg";
import "./App.css";

// ── Custom SVG brand icons ───────────────────────────────────
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const ICONS = { Globe, Bot, Smartphone, ShoppingCart, Zap, Layers };
const socialLinks = [
  { href: contact.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: contact.instagram, Icon: InstagramIcon, label: "Instagram" },
];
const leadershipPhotos = {
  1: { src: founderPhoto, width: 843, height: 912 },
  2: { src: coFounderPhoto, width: 878, height: 887 },
};
const bookingUrl = import.meta.env.NEXT_PUBLIC_BOOKING_URL || "";
const previewVideoSrc = "/videos/preview.mp4";
const previewPosterSrc = "/services-video-poster.svg";
const serviceOptions = [
  "Full-Stack Web Development",
  "AI Integration",
  "AR / 3D Product Experience",
  "E-commerce Development",
  "UI/UX Design",
  "API Development",
  "Other",
];

// Create a Cal.com event type, connect Google Calendar, set Google Meet as the
// location, add a 90-minute buffer, enable confirmation emails, and place the
// event URL in NEXT_PUBLIC_BOOKING_URL. Cal.com handles availability, slot
// blocking, meeting links, buffers, and confirmation emails.
function BookingButton({ className = "btn btn--primary", size = 16, children = "Book a Demo" }) {
  const href = bookingUrl || "/contact";
  const external = Boolean(bookingUrl);

  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={external ? "Book a demo through Cal.com" : "Contact LumenarForge to book a demo"}
    >
      <Calendar size={size} />
      {children}
    </a>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useMediaQuery(query) {
  const getMatches = () => (
    typeof window !== "undefined" && window.matchMedia(query).matches
  );
  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [query]);

  return matches;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
}

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a className="nav__logo" href="/" aria-label={`${agency.name} home`}>
          <img src={agency.logo} alt="LumenarForge logo" className="nav__logo-img" />
        </a>
        <ul className="nav__links">
          {links.map(({ label, href }) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
          <li>
            <BookingButton className="nav__cta" size={14} />
          </li>
        </ul>
        <button className="nav__burger" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="nav__mobile"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {links.map(({ label, href }) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <BookingButton className="nav__cta nav__cta--mobile" size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const isMobileHero = useMediaQuery("(max-width: 768px)");
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  return (
    <section className="hero" id="hero">
      <motion.div className="hero__bg" style={isMobileHero ? undefined : { y }} />
      <div className="hero__grid-overlay" />
      <div className="hero__particles" />
      <motion.div className="hero__inner" style={isMobileHero ? undefined : { opacity }}>
        <div className="hero__content">
          <motion.div className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            {agency.available && (<><span className="hero__badge-dot" /> Taking on New Projects</>)}
          </motion.div>

          <motion.p className="hero__support"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            Helping brands build faster, smarter, and more immersive web experiences.
          </motion.p>

          <motion.p className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}>
            Web Development · AI Integration · AR Experiences
          </motion.p>
          <motion.h6 className="hero__headline"
            initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}>
            Building the Future of Interactive Experiences
          </motion.h6>
          <motion.p className="hero__tagline"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.62 }}>
            {agency.tagline}
          </motion.p>
          <motion.div className="hero__actions"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}>
            <BookingButton />
            <a href="/services" className="btn btn--ghost">
              Explore Services <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <motion.div className="hero__socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            {socialLinks.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hero__social-link">
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div className="hero__visual"
          initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero__visualGlow" />
          <img
            src={promaxImage}
            alt="LumenarForge immersive AR, 3D and AI digital experience showcase"
            className="hero__showcaseImage"
          />
        </motion.div>
      </motion.div>
      <div className="hero__scroll-hint">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

// ── Preview video ────────────────────────────────────────────
function PreviewVideo() {
  const [ref, inView] = useInView();

  return (
    <section id="preview" className="preview section" aria-labelledby="preview-title">
      <div className="container">
        <motion.div
          ref={ref}
          className="preview__inner"
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div className="preview__copy" variants={fadeUp}>
            <span className="section__label">Commerce AR Preview</span>
            <h2 id="preview-title" className="section__title">See Products<br /><em>Before You Buy</em></h2>
            <p className="preview__sub">
              Give customers an interactive 3D and AR shopping experience directly inside your online store.
            </p>
            <div className="preview__steps" aria-label="Preview flow">
              <span>Product page</span>
              <span>3D viewer</span>
              <span>View in your space</span>
            </div>
            <div className="preview__actions">
              <BookingButton className="btn btn--primary btn--lg" size={18} />
              <a href="/services" className="btn btn--ghost btn--lg">
                View Services <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div className="preview__media-wrap" variants={fadeUp}>
            <div className="preview__media-head">
              <span><PlayCircle size={14} /> AR commerce demo</span>
              <span>3D + AR</span>
            </div>
            <div className="preview__media">
              {/* The production preview video lives at public/videos/preview.mp4. */}
              <video
                className="preview__video"
                aria-label="Preview of an e-commerce product opening in a 3D viewer and being placed in a real room"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                poster={previewPosterSrc}
              >
                <source src={previewVideoSrc} type="video/mp4" />
                Your browser does not support the preview video.
              </video>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Stats ────────────────────────────────────────────────────
function StatsBar() {
  const [ref, inView] = useInView();
  return (
    <motion.section ref={ref} className="stats" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
      {stats.map((s) => (
        <motion.div key={s.label} className="stats__item" variants={fadeUp}>
          <span className="stats__value">{s.value}</span>
          <span className="stats__label">{s.label}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}

// ── Home value proposition ───────────────────────────────────
function HomeValueProposition() {
  const [ref, inView] = useInView();
  return (
    <section id="value" className="about section">
      <div className="container">
        <motion.div ref={ref} className="about__inner" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>

          {/* Agency logo panel */}
          <motion.div className="about__logo-panel" variants={fadeUp}>
            <div className="about__logo-frame">
              <img src={agency.logo} alt="LumenarForge logo" className="about__logo-img" />
            </div>
            <div className="about__meta">
              <div className="about__location"><MapPin size={13} /><span>{agency.location}</span></div>
              {agency.available && (
                <div className="about__avail">
                  <span className="about__avail-dot" />
                  <span>Taking on new projects</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div className="about__text" variants={fadeUp}>
            <span className="section__label">Why LumenarForge</span>
            <h2 className="section__title">Immersive digital products<br /><em>built to convert</em></h2>
            {agency.description.map((p, i) => <p key={i} className="about__para">{p}</p>)}
            <div className="about__cta-row">
              <a href="/services" className="btn btn--primary">
                Explore Services <ArrowUpRight size={15} />
              </a>
              <a href="/about" className="btn btn--ghost">
                About Us <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Leadership ───────────────────────────────────────────────
function Leadership() {
  const [ref, inView] = useInView();
  return (
    <section className="leadership section" aria-labelledby="leadership-title">
      <div className="container">
        <motion.div ref={ref} className="leadership__inner" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div className="leadership__intro" variants={fadeUp}>
            <span className="section__label">Leadership</span>
            <h2 id="leadership-title" className="section__title">Meet the <em>Founders</em></h2>
            <p className="leadership__sub">
              A cross-border leadership team combining Pakistan-based product engineering with UK-based client strategy and delivery support.
            </p>
          </motion.div>

          <motion.div className="leadership__grid" variants={stagger}>
            {leadership.map((member) => {
              const photo = leadershipPhotos[member.id];

              return (
                <motion.article key={member.id} className="leader-card" variants={fadeUp}>
                  <div className="leader-card__photo-frame">
                    <img
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={`${member.name}, ${member.title}`}
                      className="leader-card__photo"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="leader-card__content">
                    <div className="leader-card__identity">
                      <span className="leader-card__eyebrow">{member.role}</span>
                      <h3 className="leader-card__name">{member.name}</h3>
                      <p className="leader-card__title">{member.title}</p>
                    </div>
                    <div className="leader-card__location">
                      <MapPin size={14} />
                      <span>{member.location}</span>
                    </div>
                    <p className="leader-card__desc">{member.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Marquee ──────────────────────────────────────────────────
function Marquee() {
  const items = [...techStack, ...techStack];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span key={i} className="marquee__item">{t} <span className="marquee__sep">✦</span></span>
        ))}
      </div>
    </div>
  );
}

// ── Services ─────────────────────────────────────────────────
function Services() {
  const [ref, inView] = useInView();
  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div className="section__header" ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.span className="section__label" variants={fadeUp}>What We Offer</motion.span>
          <motion.h2 className="section__title" variants={fadeUp}>Services That Drive<br /><em>Real Results</em></motion.h2>
          <motion.p className="section__sub" variants={fadeUp}>
            From conversion-focused websites to AI automation and immersive product experiences, our work is built around the way modern customers evaluate, trust, and buy.
          </motion.p>
        </motion.div>
        <motion.div className="services__grid" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {services.map((s) => {
            const Icon = ICONS[s.icon] || Globe;
            return (
              <motion.div key={s.id} className="service-card" variants={fadeUp}>
                <div className="service-card__icon"><Icon size={22} /></div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.description}</p>
                <div className="service-card__tags">
                  {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div className="services__footer" initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.a href="/services" className="btn btn--primary btn--lg" variants={fadeUp}>
            Explore Services <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Home process ─────────────────────────────────────────────
function ProcessSection() {
  const [ref, inView] = useInView();

  return (
    <section className="process section" aria-labelledby="process-title">
      <div className="container">
        <motion.div ref={ref} className="section__header process__header" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.span className="section__label" variants={fadeUp}>How We Work</motion.span>
          <motion.h2 id="process-title" className="section__title" variants={fadeUp}>
            From first idea<br /><em>to launch-ready experience</em>
          </motion.h2>
        </motion.div>
        <motion.div className="process__grid" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {processSteps.map((item) => (
            <motion.article key={item.step} className="process-card" variants={fadeUp}>
              <span className="process-card__step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Why choose ───────────────────────────────────────────────
function WhyChoose() {
  const [ref, inView] = useInView();

  return (
    <section className="why section" aria-labelledby="why-title">
      <div className="container">
        <motion.div ref={ref} className="why__inner" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div className="why__intro" variants={fadeUp}>
            <span className="section__label">Why Choose Us</span>
            <h2 id="why-title" className="section__title">Built for brands that need<br /><em>more than a website</em></h2>
            <p>
              LumenarForge combines product thinking, immersive technology, and practical engineering so every digital experience has a clear business purpose.
            </p>
          </motion.div>
          <motion.div className="why__grid" variants={stagger}>
            {differentiators.map((item) => (
              <motion.article key={item.title} className="why-card" variants={fadeUp}>
                <CheckCircle2 size={18} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Home founder preview ────────────────────────────────────
function FounderPreview() {
  const [ref, inView] = useInView();

  return (
    <section className="founder-preview section" aria-labelledby="founder-preview-title">
      <div className="container">
        <motion.div ref={ref} className="founder-preview__inner" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div className="founder-preview__copy" variants={fadeUp}>
            <span className="section__label">Meet the Founders</span>
            <h2 id="founder-preview-title" className="section__title">Small team.<br /><em>Focused execution.</em></h2>
            <p>
              Built by a team focused on immersive web, AI integration, and conversion-driven digital experiences.
            </p>
            <a href="/about" className="btn btn--ghost">
              Learn more about us <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <motion.div className="founder-preview__people" variants={stagger}>
            {leadership.map((member) => {
              const photo = leadershipPhotos[member.id];

              return (
                <motion.article key={member.id} className="founder-mini-card" variants={fadeUp}>
                  <img
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={`${member.name}, ${member.title}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{member.name}</h3>
                    <p>{member.title}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PageHero({ label, title, description, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__grid-overlay" />
      <div className="container page-hero__inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section__label">{label}</span>
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__sub">{description}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function CompanyStory() {
  const [ref, inView] = useInView();

  return (
    <section className="story section">
      <div className="container">
        <motion.div ref={ref} className="story__inner" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}>
            <span className="section__label">Company Story</span>
            <h2 className="section__title">A digital agency for<br /><em>the next buying journey</em></h2>
          </motion.div>
          <motion.div className="story__copy" variants={fadeUp}>
            <p>
              LumenarForge builds modern websites, AI-powered systems, AR/3D product experiences, and scalable digital platforms for brands that want more than a static online presence.
            </p>
            <p>
              Our work sits where product strategy, interface design, and practical engineering meet. We help teams turn complex ideas into digital experiences that customers can understand, explore, and act on.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionVision() {
  const [ref, inView] = useInView();

  return (
    <section className="mission section">
      <div className="container">
        <motion.div ref={ref} className="mission__grid" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.article className="mission-card" variants={fadeUp}>
            <span className="section__label">Mission</span>
            <h2>Help businesses adopt modern web, AI, and immersive technologies with clarity.</h2>
            <p>
              We translate emerging tools into useful digital products that improve customer experience, reduce friction, and support growth.
            </p>
          </motion.article>
          <motion.article className="mission-card" variants={fadeUp}>
            <span className="section__label">Vision</span>
            <h2>Make AR, AI, and 3D commerce accessible for growing brands.</h2>
            <p>
              We believe immersive and intelligent digital experiences should not be limited to enterprise teams with huge internal departments.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const [ref, inView] = useInView();

  return (
    <section className="values section">
      <div className="container">
        <motion.div ref={ref} className="section__header" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.span className="section__label" variants={fadeUp}>Values</motion.span>
          <motion.h2 className="section__title" variants={fadeUp}>Principles behind<br /><em>every build</em></motion.h2>
        </motion.div>
        <motion.div className="values__grid" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {values.map((value) => (
            <motion.article key={value.title} className="value-card" variants={fadeUp}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceDetailSections() {
  const [ref, inView] = useInView();

  return (
    <section className="service-details section" aria-labelledby="service-details-title">
      <div className="container">
        <motion.div ref={ref} className="section__header" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.span className="section__label" variants={fadeUp}>Capabilities</motion.span>
          <motion.h2 id="service-details-title" className="section__title" variants={fadeUp}>Services designed for<br /><em>modern digital businesses</em></motion.h2>
        </motion.div>

        <motion.div className="service-details__stack" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {serviceDetails.map((service) => {
            const Icon = ICONS[service.icon] || Globe;

            return (
              <motion.article key={service.id} id={service.id} className="service-detail" variants={fadeUp}>
                <div className="service-detail__icon"><Icon size={24} /></div>
                <div className="service-detail__content">
                  <span className="service-detail__eyebrow">{service.eyebrow}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-detail__columns">
                    <div>
                      <h4>Key benefits</h4>
                      <ul>
                        {service.benefits.map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Technologies & capabilities</h4>
                      <div className="service-detail__tags">
                        {service.capabilities.map((capability) => (
                          <span key={capability} className="tag">{capability}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a href="/contact" className="btn btn--outline">
                    {service.cta} <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ── Home contact CTA ─────────────────────────────────────────
function ContactCta() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" className="contact-cta section">
      <div className="container">
        <motion.div className="contact-cta__inner" ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}>
            <span className="section__label">Start a Conversation</span>
            <h2 className="section__title">Have a digital idea?<br /><em>Let&apos;s shape it together.</em></h2>
            <p className="contact-cta__sub">
              Tell us what you&apos;re building and where you need support across AR, 3D, AI, UI/UX, or web development.
            </p>
          </motion.div>
          <motion.div className="contact-cta__actions" variants={fadeUp}>
            <BookingButton className="btn btn--primary btn--lg" size={18} />
            <a href="/contact" className="btn btn--ghost btn--lg">
              Contact Us <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutPage() {
  usePageMeta(
    "About LumenarForge | Immersive Web & AI Agency",
    "Learn about LumenarForge, a digital agency building modern websites, AI systems, AR experiences, and 3D commerce solutions."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="About Us"
          title="About LumenarForge"
          description="We build immersive, intelligent, and conversion-driven digital experiences for brands ready to turn modern web, AI, AR, and 3D technology into practical growth."
        >
          <div className="page-hero__actions">
            <BookingButton className="btn btn--primary btn--lg" size={18} />
            <a href="/services" className="btn btn--ghost btn--lg">
              View Services <ArrowUpRight size={18} />
            </a>
          </div>
        </PageHero>
        <CompanyStory />
        <Leadership />
        <MissionVision />
        <ValuesSection />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}

function ServicesPage() {
  usePageMeta(
    "Services | Web, AI, AR & 3D Development | LumenarForge",
    "Explore LumenarForge services including full-stack web development, AI integration, AR commerce, 3D product visualization, UI/UX design, and e-commerce solutions."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Services"
          title="Services"
          description="Web, AI, AR, and 3D solutions built for modern digital businesses."
        >
          <div className="page-hero__actions">
            <BookingButton className="btn btn--primary btn--lg" size={18} />
            <a href="/contact" className="btn btn--ghost btn--lg">
              Contact Us <ArrowUpRight size={18} />
            </a>
          </div>
        </PageHero>
        <ServiceDetailSections />
        <PreviewVideo />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}

// ── Contact page ─────────────────────────────────────────────
function ContactForm() {
  const submissionSuccessful = new URLSearchParams(window.location.search).get("success") === "true";
  const nextUrl = `${window.location.origin}/contact?success=true`;
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = (nextValues) => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nextValues.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!nextValues.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!nextValues.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(nextValues.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!nextValues.service) nextErrors.service = "Choose the service you are interested in.";
    if (!nextValues.message.trim()) nextErrors.message = "Message is required.";

    if (nextValues.website.trim()) {
      try {
        const url = new URL(nextValues.website.trim());
        if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
          nextErrors.website = "Enter a valid website URL, including https://.";
        }
      } catch {
        nextErrors.website = "Enter a valid website URL, including https://.";
      }
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = (event) => {
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
    }
  };

  const errorId = (name) => `contact-${name}-error`;
  const fieldError = (name) => errors[name] ? (
    <span id={errorId(name)} className="form-error">{errors[name]}</span>
  ) : null;

  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${contact.email}`}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="_subject" value="New LumenarForge Inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={nextUrl} />
      <input type="text" name="_honey" style={{ display: "none" }} />
      {/* Connect EmailJS, Web3Forms, Getform, an API route, or another email service here if FormSubmit is replaced. Keep private API keys in environment variables or server-side code. */}

      <div className="contact-form__grid">
        <label className="form-field" htmlFor="firstName">
          <span>First Name <strong aria-hidden="true">*</strong></span>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? errorId("firstName") : undefined}
            required
          />
          {fieldError("firstName")}
        </label>
        <label className="form-field" htmlFor="lastName">
          <span>Last Name <strong aria-hidden="true">*</strong></span>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? errorId("lastName") : undefined}
            required
          />
          {fieldError("lastName")}
        </label>
        <label className="form-field contact-form__wide" htmlFor="email">
          <span>Email <strong aria-hidden="true">*</strong></span>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            required
          />
          {fieldError("email")}
        </label>
        <label className="form-field contact-form__wide" htmlFor="website">
          <span>Website <small>Optional</small></span>
          <input
            id="website"
            type="url"
            name="website"
            value={values.website}
            onChange={handleChange}
            autoComplete="url"
            placeholder="https://example.com"
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? errorId("website") : undefined}
          />
          {fieldError("website")}
        </label>
        <label className="form-field contact-form__wide" htmlFor="service">
          <span>Service Interested In <strong aria-hidden="true">*</strong></span>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={handleChange}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? errorId("service") : undefined}
            required
          >
            <option value="">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {fieldError("service")}
        </label>
        <label className="form-field contact-form__wide" htmlFor="message">
          <span>Message <strong aria-hidden="true">*</strong></span>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={6}
            placeholder="Tell us about your goals, timeline, and what you want customers to experience."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? errorId("message") : undefined}
            required
          />
          {fieldError("message")}
        </label>
      </div>

      <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
        <Send size={18} /> Send Inquiry
      </button>

      {submissionSuccessful && (
        <div className="form-success" role="status">
          <CheckCircle2 size={18} />
          <span>Thanks for reaching out. Your inquiry has been sent successfully.</span>
        </div>
      )}
    </form>
  );
}

function ContactPage() {
  usePageMeta(
    "Contact LumenarForge | Book a Demo",
    "Contact LumenarForge to discuss web development, AI integration, AR experiences, 3D product visualization, and conversion-focused digital platforms."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <main className="contact-page">
        <div className="contact-page__grid-overlay" />
        <div className="container contact-page__inner">
          <motion.div className="contact-page__intro"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <span className="section__label">Contact Us</span>
            <h1 className="contact-page__title">Let&apos;s build something<br /><em>worth remembering.</em></h1>
            <p className="contact-page__sub">
              Share a few details about your goals and the kind of support you need. We&apos;ll use them to start a focused conversation.
            </p>
            <div className="contact-page__focus">
              <span>AR &amp; 3D Experiences</span>
              <span>AI Integration</span>
              <span>UI/UX Design</span>
              <span>Web Development</span>
            </div>
            <div className="contact-page__socials">
              <span className="contact-page__social-label">Connect with us</span>
              <div className="contact-page__social-links">
                {socialLinks.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-page__social-link">
                    <Icon size={17} />
                    <span>{label}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="contact-page__panel"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <div className="contact-page__panel-head">
              <span>Project inquiry</span>
              <p>Required fields are marked with an asterisk.</p>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={agency.logo} alt="LumenarForge logo" className="footer__logo" />
        <span className="footer__copy">© {new Date().getFullYear()} {agency.name}. All rights reserved.</span>
        <div className="footer__actions">
          <div className="footer__socials">
            {socialLinks.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer__social-link">
                <Icon size={16} />
              </a>
            ))}
          </div>
          <a href="/contact" className="footer__contact">Contact Us <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────
function HomePage() {
  usePageMeta(
    "LumenarForge | AR, AI & Web Development Agency",
    "LumenarForge builds immersive websites, AI integrations, AR experiences, 3D product visualization, and conversion-focused digital platforms."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <HomeValueProposition />
      <Services />
      <PreviewVideo />
      <ProcessSection />
      <WhyChoose />
      <FounderPreview />
      <Marquee />
      <ContactCta />
      <Footer />
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/about") return <AboutPage />;
  if (pathname === "/services") return <ServicesPage />;
  if (pathname === "/contact") return <ContactPage />;

  return <HomePage />;
}
