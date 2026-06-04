import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe, Bot, Smartphone, ShoppingCart, Zap, Layers,
  ArrowUpRight, Menu, X, MapPin, Send,
  CheckCircle2, AlertCircle, LoaderCircle,
} from "lucide-react";
import { agency, contact, services, techStack, stats, leadership } from "./data";
import promaxImage from "./assets/promax.png";
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
  const links = [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a className="nav__logo" href="/" aria-label={`${agency.name} home`}>
          <img src={agency.logo} alt={agency.name} className="nav__logo-img" />
        </a>
        <ul className="nav__links">
          {links.map(({ label, href }) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
          <li>
            <a href="/contact" className="nav__cta">
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
            {links.map(({ label, href }) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a href="/contact" className="nav__cta nav__cta--mobile">
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
            <a href="/contact" className="btn btn--primary">
              <Send size={16} /> Let&apos;s Talk
            </a>
            <a href="/#services" className="btn btn--ghost">
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
              <a href="/contact" className="btn btn--primary">
                <Send size={15} /> Discuss Your Project
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

// ── Home contact CTA ─────────────────────────────────────────
function ContactCta() {
  const [ref, inView] = useInView();
  return (
    <section className="contact-cta section">
      <div className="container">
        <motion.div className="contact-cta__inner" ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}>
            <span className="section__label">Start a Conversation</span>
            <h2 className="section__title">Have a digital idea?<br /><em>Let&apos;s shape it together.</em></h2>
            <p className="contact-cta__sub">
              Tell us what you&apos;re building and where you need support across AR, 3D, AI, UI/UX, or web development.
            </p>
          </motion.div>
          <motion.a href="/contact" className="btn btn--primary btn--lg" variants={fadeUp}>
            Contact Us <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Contact page ─────────────────────────────────────────────
function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/heelo@lumenarforge.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: formData.get("first_name"),
          last_name: formData.get("last_name"),
          email: formData.get("email"),
          website: formData.get("website"),
          service: formData.get("service"),
          _subject: `New Lumen Forge inquiry from ${formData.get("first_name")} ${formData.get("last_name")}`,
          _template: "table",
          _captcha: "false",
          _honey: formData.get("_honey"),
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error("Submission failed");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your inquiry has been sent successfully.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We could not send your inquiry right now. Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__grid">
        <label className="form-field">
          <span>First Name <strong aria-hidden="true">*</strong></span>
          <input type="text" name="first_name" autoComplete="given-name" required />
        </label>
        <label className="form-field">
          <span>Last Name <strong aria-hidden="true">*</strong></span>
          <input type="text" name="last_name" autoComplete="family-name" required />
        </label>
        <label className="form-field contact-form__wide">
          <span>Email <strong aria-hidden="true">*</strong></span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label className="form-field contact-form__wide">
          <span>Website <small>Optional</small></span>
          <input type="url" name="website" autoComplete="url" placeholder="https://" />
        </label>
        <label className="form-field contact-form__wide">
          <span>Service Interested In <small>Optional</small></span>
          <select name="service" defaultValue="">
            <option value="">Select a service</option>
            <option value="AR & 3D Experiences">AR &amp; 3D Experiences</option>
            <option value="AI Integration">AI Integration</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Web Development">Web Development</option>
            <option value="Other / Not sure">Other / Not sure</option>
          </select>
        </label>
      </div>

      <label className="form-honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="_honey" tabIndex="-1" autoComplete="off" />
      </label>

      <button type="submit" className="btn btn--primary btn--lg contact-form__submit" disabled={submitting}>
        {submitting ? <LoaderCircle size={18} className="contact-form__spinner" /> : <Send size={18} />}
        {submitting ? "Sending..." : "Send Inquiry"}
      </button>

      {status && (
        <div className={`form-status form-status--${status.type}`} role="status" aria-live="polite">
          {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
}

function ContactPage() {
  useEffect(() => {
    document.title = `Contact Us | ${agency.name}`;
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
        <img src={agency.logo} alt={agency.name} className="footer__logo" />
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
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <About />
      <Leadership />
      <Marquee />
      <Services />
      <ContactCta />
      <Footer />
    </>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  return pathname === "/contact" ? <ContactPage /> : <HomePage />;
}
