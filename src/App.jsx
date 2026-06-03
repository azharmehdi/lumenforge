import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe, Bot, Smartphone, ShoppingCart, Zap, BarChart2, Layers,
  MessageCircle, ArrowUpRight, Menu, X,
  MapPin, ChevronRight, Star,
} from "lucide-react";
import { agency, contact, services, projects, techStack, stats, leadership } from "./data";
import promaxImage from "./assets/promax.png";
import "./App.css";

// ── Custom SVG brand icons ───────────────────────────────────
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
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
const UpworkIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.142-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const ICONS = { Globe, Bot, Smartphone, ShoppingCart, Zap, BarChart2, Layers };
const wa = (num) => `https://wa.me/${num.replace(/\D/g, "")}`;

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

// ── Nav ──────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Services", "Work", "Contact"];
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={agency.logo} alt={agency.name} className="nav__logo-img" />
        </button>
        <ul className="nav__links">
          {links.map((l) => (
            <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>
          ))}
          <li>
            <a href={wa(contact.whatsapp)} target="_blank" rel="noreferrer" className="nav__cta">
              Start a Project <ArrowUpRight size={14} />
            </a>
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
            {links.map((l) => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
            <a href={wa(contact.whatsapp)} target="_blank" rel="noreferrer" className="nav__cta nav__cta--mobile">
              Start a Project <ArrowUpRight size={14} />
            </a>
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
            <a href={wa(contact.whatsapp)} target="_blank" rel="noreferrer" className="btn btn--primary">
              <MessageCircle size={16} /> Let&apos;s Talk
            </a>
            <button className="btn btn--ghost"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
              View Our Work <ChevronRight size={16} />
            </button>
          </motion.div>
          <motion.div className="hero__socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            {[
              { href: contact.github, icon: <GithubIcon size={18} />, label: "GitHub" },
              { href: contact.linkedin, icon: <LinkedinIcon size={18} />, label: "LinkedIn" },
              { href: contact.instagram, icon: <InstagramIcon size={18} />, label: "Instagram" },
              { href: contact.upwork, icon: <UpworkIcon size={18} />, label: "Upwork" },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hero__social-link">
                {icon}
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

// ── About ────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div ref={ref} className="about__inner" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>

          {/* Agency logo panel */}
          <motion.div className="about__logo-panel" variants={fadeUp}>
            <div className="about__logo-frame">
              <img src={agency.logo} alt={agency.name} className="about__logo-img" />
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
            <span className="section__label">Who We Are</span>
            <h2 className="section__title">A Digital Agency<br /><em>Built to Deliver</em></h2>
            {agency.description.map((p, i) => <p key={i} className="about__para">{p}</p>)}
            <div className="about__cta-row">
              <a href={wa(contact.whatsapp)} target="_blank" rel="noreferrer" className="btn btn--primary">
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <a href={contact.upwork} target="_blank" rel="noreferrer" className="btn btn--outline">
                <Star size={15} /> Upwork Profile
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
            {leadership.map((member) => (
              <motion.article key={member.id} className="leader-card" variants={fadeUp}>
                <div className="leader-card__photo-frame">
                  <img src={member.image} alt={`${member.role} portrait`} className="leader-card__photo" />
                </div>
                <div className="leader-card__content">
                  <span className="leader-card__eyebrow">{member.role}</span>
                  <h3 className="leader-card__title">{member.title}</h3>
                  <div className="leader-card__location">
                    <MapPin size={14} />
                    <span>{member.location}</span>
                  </div>
                  <p className="leader-card__desc">{member.description}</p>
                </div>
              </motion.article>
            ))}
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
      </div>
    </section>
  );
}

// ── Work / Projects ──────────────────────────────────────────
function Work() {
  const [ref, inView] = useInView();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const Card = ({ p }) => (
    <motion.div className={`project-card ${p.featured ? "project-card--featured" : ""}`} variants={fadeUp}>
      <div className="project-card__top">
        <div className="project-card__num">0{p.id}</div>
        {p.featured && <span className="project-card__badge">Featured</span>}
      </div>
      <h3 className="project-card__title">{p.title}</h3>
      <p className="project-card__desc">{p.description}</p>
      <div className="project-card__tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      {/* Live link intentionally omitted — shared privately on request */}
    </motion.div>
  );

  return (
    <section id="work" className="projects section">
      <div className="container">
        <motion.div className="section__header" ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
          <motion.span className="section__label" variants={fadeUp}>Our Work</motion.span>
          <motion.h2 className="section__title" variants={fadeUp}>Projects &amp; <em>Products</em></motion.h2>
        </motion.div>
        <motion.div className="projects__featured" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {featured.map((p) => <Card key={p.id} p={p} />)}
        </motion.div>
        {rest.length > 0 && (
          <motion.div className="projects__rest" variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
            {rest.map((p) => <Card key={p.id} p={p} />)}
          </motion.div>
        )}
        <motion.p className="work__note" variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}>
          Interested in seeing a live demo? <a href={wa(contact.whatsapp)} target="_blank" rel="noreferrer">Get in touch</a> and we&apos;ll walk you through it.
        </motion.p>
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const links = [
    { label: "WhatsApp", href: wa(contact.whatsapp), icon: <MessageCircle size={18} />, handle: contact.whatsapp },
    { label: "LinkedIn", href: contact.linkedin, icon: <LinkedinIcon size={18} />, handle: "Lumen Forge" },
    { label: "Instagram", href: contact.instagram, icon: <InstagramIcon size={18} />, handle: "lumenarforge" },
    { label: "Upwork", href: contact.upwork, icon: <UpworkIcon size={18} />, handle: "Hire us on Upwork" },
  ];
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div className="contact__inner" ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div className="contact__text" variants={fadeUp}>
            <span className="section__label">Get In Touch</span>
            <h2 className="section__title">Ready to Build<br /><em>Something Great?</em></h2>
            <p className="contact__sub">Have a project in mind, or just want to explore what&apos;s possible? We&apos;d love to hear from you. Drop us a message and we&apos;ll get back to you promptly.</p>
            <a href={wa(contact.whatsapp)} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              <MessageCircle size={18} /> Start a Conversation
            </a>
          </motion.div>
          <motion.div className="contact__links" variants={stagger}>
            {links.map(({ label, href, icon, handle }) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer" className="contact__link"
                variants={fadeUp} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
                <span className="contact__link-icon">{icon}</span>
                <span className="contact__link-info">
                  <span className="contact__link-label">{label}</span>
                  <span className="contact__link-handle">{handle}</span>
                </span>
                <ArrowUpRight size={16} className="contact__link-arrow" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={agency.logo} alt={agency.name} className="footer__logo" />
        <span className="footer__copy">© {new Date().getFullYear()} {agency.name}. All rights reserved.</span>
        <span className="footer__love">Crafted with ♥</span>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <Leadership />
      <Marquee />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </>
  );
}
