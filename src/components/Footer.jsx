import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const PURPLE = "#5B3A8A";
const TEAL = "#00A99D";
const grad = `linear-gradient(135deg, ${PURPLE}, ${TEAL})`;

function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useFadeUp();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function InputField({ label, type = "text", placeholder, value, onChange, name }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: focused ? TEAL : "#6A6A6A", transition: "color 0.2s" }}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: "Arial,sans-serif", fontSize: 15, fontWeight: 300,
          padding: "13px 16px",
          background: "#fff",
          border: focused ? `1.5px solid ${TEAL}` : "1.5px solid #E0DCD6",
          borderRadius: 10, outline: "none", color: "#2C2C2C",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? `0 0 0 3px ${TEAL}18` : "none",
          width: "100%",
        }}
      />
    </div>
  );
}

function TextArea({ label, placeholder, value, onChange, name }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: focused ? TEAL : "#6A6A6A", transition: "color 0.2s" }}>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={5}
        style={{
          fontFamily: "Arial,sans-serif", fontSize: 15, fontWeight: 300,
          padding: "13px 16px", resize: "vertical",
          background: "#fff",
          border: focused ? `1.5px solid ${TEAL}` : "1.5px solid #E0DCD6",
          borderRadius: 10, outline: "none", color: "#2C2C2C",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: focused ? `0 0 0 3px ${TEAL}18` : "none",
          width: "100%",
        }}
      />
    </div>
  );
}

const infoCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Visit Us",
    lines: ["Shop No.1, Sadiq Heights", "Sharfabad, Karachi", "Pakistan"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    label: "Call Us",
    lines: ["+92 312 2251134", "Mon – Sat, 11am – 9pm"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email Us",
    lines: ["info.optiquehouse@gmail.com", "We reply within 24 hours"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    label: "Opening Hours",
    lines: ["Mon – Sat: 11am – 9pm", "Sunday: 3pm – 9pm"],
  },
];

// Shop images gallery
const shopImages = [
  {
    url: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&auto=format",
    alt: "Luxury eyewear display",
    caption: "Latest Designer Frames"
  },
  {
    url: "https://images.unsplash.com/photo-1607861716491-05dd45c6808c?w=800&auto=format",
    alt: "Optical shop interior",
    caption: "Elegant Boutique Setting"
  },
  {
    url: "https://images.unsplash.com/photo-1556305070-43a3ae4cec8c?w=800&auto=format",
    alt: "Premium sunglasses collection",
    caption: "Sunglasses Lookbook"
  },
  {
    url: "https://images.unsplash.com/photo-1592330067538-3e54b4e782f9?w=800&auto=format",
    alt: "Eye exam station",
    caption: "Precision Eye Care"
  },
  {
    url: "https://images.unsplash.com/photo-1618221327952-61ecf1fb868b?w=800&auto=format",
    alt: "Brand showcase",
    caption: "CHANEL • GUCCI • PRADA"
  },
  {
    url: "https://images.unsplash.com/photo-1571639615189-3f3f5e8f77b8?w=800&auto=format",
    alt: "Optique house storefront",
    caption: "Visit Our Karachi Store"
  }
];

// ---------- Enhanced Footer Component (customized for Optique House) ----------
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .footer-root {
          background: #0a0a0a;
          color: #e8e4dc;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .footer-root::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a84c 30%, #f5e6a3 50%, #c9a84c 70%, transparent);
        }

        .footer-inner { position: relative; z-index: 1; }

        .footer-newsletter {
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 48px 40px;
        }
        .footer-newsletter-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .footer-newsletter-text h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 4px;
          letter-spacing: 0.02em;
        }
        .footer-newsletter-text p {
          font-size: 0.82rem;
          color: #8a8278;
          margin: 0;
          letter-spacing: 0.04em;
        }
        .footer-newsletter-form {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.3s;
          min-width: 340px;
        }
        .footer-newsletter-form:focus-within { border-color: #c9a84c; }
        .footer-newsletter-form input {
          background: transparent;
          border: none;
          outline: none;
          padding: 13px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          color: #e8e4dc;
          flex: 1;
          min-width: 0;
        }
        .footer-newsletter-form input::placeholder { color: #5a5550; }
        .footer-newsletter-form button {
          background: #c9a84c;
          color: #0a0a0a;
          border: none;
          padding: 13px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .footer-newsletter-form button:hover { background: #f5e6a3; }
        .subscribed-msg {
          font-size: 0.82rem;
          color: #c9a84c;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 340px;
          padding: 13px 18px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 4px;
        }
        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 40px 48px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .footer-brand-logo {
          display: block;
          margin-bottom: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.02em;
        }
        .footer-brand-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-style: italic;
          color: #7a7268;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .footer-socials { display: flex; gap: 10px; }
        .social-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #8a8278;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(.4,0,.2,1);
          background: transparent;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: #c9a84c;
          color: #c9a84c;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(201,168,76,0.2);
        }
        .footer-col h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a84c;
          margin: 0 0 20px;
          position: relative;
          padding-bottom: 12px;
        }
        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 24px; height: 1px;
          background: #c9a84c;
          opacity: 0.5;
        }
        .footer-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links li a, .footer-links li span {
          font-size: 0.83rem;
          color: #6e6a64;
          text-decoration: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s, gap 0.2s;
          line-height: 1.5;
        }
        .footer-links li a::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.25s;
          vertical-align: middle;
        }
        .footer-links li a:hover { color: #e8e4dc; gap: 10px; }
        .footer-links li a:hover::before { width: 10px; }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.82rem;
          color: #6e6a64;
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .footer-contact-item .icon { color: #c9a84c; margin-top: 2px; flex-shrink: 0; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px 40px;
        }
        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer-bottom-copy { font-size: 0.75rem; color: #3e3a34; letter-spacing: 0.04em; }
        .footer-bottom-links { display: flex; gap: 24px; }
        .footer-bottom-links a {
          font-size: 0.75rem;
          color: #3e3a34;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: #c9a84c; }
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; padding: 48px 32px; }
          .footer-newsletter { padding: 36px 32px; }
          .footer-bottom { padding: 20px 32px; }
        }
        @media (max-width: 639px) {
          .footer-grid { grid-template-columns: 1fr; padding: 40px 20px; }
          .footer-newsletter { padding: 32px 20px; }
          .footer-newsletter-inner { flex-direction: column; align-items: flex-start; }
          .footer-newsletter-form, .subscribed-msg { min-width: unset; width: 100%; }
          .footer-bottom { padding: 20px; }
          .footer-bottom-inner { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-newsletter">
            <div className="footer-newsletter-inner">
              <div className="footer-newsletter-text">
                <h3>Join the Inner Circle</h3>
                <p>Exclusive offers, early access & style guides — no spam, ever.</p>
              </div>
              {subscribed ? (
                <div className="subscribed-msg">
                  <svg width="16" height="16" fill="none" stroke="#c9a84c" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  You're on the list — welcome!
                </div>
              ) : (
                <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                  <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
                  <button type="submit">Subscribe</button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <Link to="/" className="footer-brand-logo">OPTIOUE HOUSE</Link>
              <p className="footer-brand-tagline">
                Redefining vision through luxury eyewear<br />and precision eye care since 2010.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-btn" aria-label="Facebook"><IconFacebook /></a>
                <a href="#" className="social-btn" aria-label="Instagram"><IconInstagram /></a>
                <a href="#" className="social-btn" aria-label="Twitter/X"><IconTwitter /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Shop</h4>
              <ul className="footer-links">
                {["Men's Frames","Women's Frames","Kids' Collection","Blue Light Glasses","Sunglasses"].map(item => (
                  <li key={item}><Link to="/product">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                {["Shipping & Returns","Track Order","Prescription Guide","FAQ","Warranty"].map(item => (
                  <li key={item}><Link to="/contact">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Visit Us</h4>
              <div className="footer-contact-item">
                <span className="icon"><IconPin /></span>
                <span>Shop No.1, Sadiq Heights,<br />Sharfabad, Karachi, Pakistan</span>
              </div>
              <div className="footer-contact-item">
                <span className="icon"><IconPhone /></span>
                <span>+92 312 2251134</span>
              </div>
              <div className="footer-contact-item">
                <span className="icon"><IconMail /></span>
                <span>info.optiquehouse@gmail.com</span>
              </div>
              <div className="footer-contact-item">
                <span className="icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <span>Mon–Sat: 11am–9pm<br />Sunday: 3pm–9pm</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <span className="footer-bottom-copy">© 2026 Optique House. All rights reserved.</span>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Settings</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// ---------- Main Contact Component ----------
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "Georgia,serif", background: "#FAFAF8", color: "#2C2C2C", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Hero Section */}
      <section style={{ background: "#F5F3EF", padding: "72px 48px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 500, height: 500, top: -160, right: -100, background: `radial-gradient(circle, ${TEAL}15 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 340, height: 340, bottom: -100, left: -60, background: `radial-gradient(circle, ${PURPLE}10 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
        <svg style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", opacity: 0.055, width: 380, pointerEvents: "none" }} viewBox="0 0 500 200" fill="none">
          <circle cx="130" cy="100" r="88" stroke={PURPLE} strokeWidth="14"/>
          <circle cx="370" cy="100" r="88" stroke={TEAL} strokeWidth="14"/>
          <path d="M218 100 C238 78, 262 78, 282 100" stroke={PURPLE} strokeWidth="10" strokeLinecap="round"/>
          <line x1="42" y1="100" x2="0" y2="86" stroke={PURPLE} strokeWidth="10" strokeLinecap="round"/>
          <line x1="458" y1="100" x2="500" y2="86" stroke={TEAL} strokeWidth="10" strokeLinecap="round"/>
        </svg>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, fontFamily: "Arial,sans-serif", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: TEAL, marginBottom: 22 }}>
            <div style={{ width: 28, height: 2, background: grad, borderRadius: 2 }} />
            Get In Touch
            <div style={{ width: 28, height: 2, background: grad, borderRadius: 2 }} />
          </div>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(38px,4.5vw,62px)", fontWeight: 700, lineHeight: 1.1, color: "#1C1C1C", marginBottom: 22 }}>
            We'd Love to{" "}
            <span style={{ background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Hear From You
            </span>
          </h1>
          <p style={{ fontFamily: "Arial,sans-serif", fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: "#5A5A5A", maxWidth: 500, margin: "0 auto" }}>
            Visit our boutique in Sharfabad or reach out — we're here to help you see the world with clarity & style.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section style={{ background: "#fff", padding: "0 48px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, transform: "translateY(-40px)" }}>
          {infoCards.map((card, i) => (
            <FadeUp key={card.label} delay={i * 0.08}>
              <div
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === i ? "#1C1C1C" : "#fff",
                  border: "1px solid #E8E4DE",
                  borderRadius: i === 0 ? "16px 0 0 16px" : i === 3 ? "0 16px 16px 0" : 0,
                  padding: "32px 24px",
                  transition: "background 0.25s, transform 0.22s, box-shadow 0.22s",
                  transform: hoveredCard === i ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hoveredCard === i ? `0 20px 48px ${PURPLE}22` : "0 8px 24px rgba(0,0,0,0.06)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {hoveredCard === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: grad }} />}
                <div style={{ color: hoveredCard === i ? TEAL : PURPLE, marginBottom: 16, display: "flex" }}>{card.icon}</div>
                <div style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: hoveredCard === i ? TEAL : PURPLE, marginBottom: 12 }}>{card.label}</div>
                {card.lines.map((l, j) => (
                  <div key={j} style={{ fontFamily: "Arial,sans-serif", fontSize: 13, lineHeight: 1.9, fontWeight: j === card.lines.length - 1 ? 300 : 400, color: hoveredCard === i ? (j === card.lines.length - 1 ? "#888" : "#ddd") : (j === card.lines.length - 1 ? "#9A9A9A" : "#2C2C2C") }}>{l}</div>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: "#E8E4DE", maxWidth: 1060, margin: "0 auto" }} />

      {/* Form + Map */}
      <section style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 48px 96px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "start" }}>
        {/* Form Column */}
        <FadeUp>
          {!submitted ? (
            <div>
              <div style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: PURPLE, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 36, height: 1, background: `linear-gradient(90deg, ${PURPLE}, transparent)` }} />
                Send a Message
              </div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(26px,2.8vw,38px)", fontWeight: 700, lineHeight: 1.18, color: "#1C1C1C", marginBottom: 36 }}>
                Book an Appointment<br />or <em style={{ color: TEAL }}>Drop Us a Line</em>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <InputField label="Full Name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
                  <InputField label="Email Address" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <InputField label="Phone Number" type="tel" name="phone" placeholder="+92 312 2251134" value={form.phone} onChange={handleChange} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6A6A" }}>Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      style={{ fontFamily: "Arial,sans-serif", fontSize: 15, fontWeight: 300, padding: "13px 16px", background: "#fff", border: "1.5px solid #E0DCD6", borderRadius: 10, outline: "none", color: form.subject ? "#2C2C2C" : "#9A9A9A", width: "100%", cursor: "pointer" }}
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="appointment">Book an Eye Exam</option>
                      <option value="frames">Eyewear Enquiry</option>
                      <option value="lenses">Contact Lenses</option>
                      <option value="repair">Frame Repair</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <TextArea label="Message" name="message" placeholder="Tell us how we can help you..." value={form.message} onChange={handleChange} />
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 4 }}>
                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "14px 32px",
                      background: grad,
                      color: "#fff", fontFamily: "Arial,sans-serif",
                      fontSize: 14, fontWeight: 600, letterSpacing: "0.04em",
                      border: "none", borderRadius: 50, cursor: "pointer",
                      boxShadow: btnHover ? `0 14px 36px ${PURPLE}40` : `0 8px 24px ${PURPLE}28`,
                      transform: btnHover ? "translateY(-2px)" : "translateY(0)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                  </button>
                  <span style={{ fontFamily: "Arial,sans-serif", fontSize: 12, color: "#B0AAA0" }}>We reply within 24 hours</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 20, padding: "56px 40px", border: "1px solid #E8E4DE", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 32 }}>✓</div>
              <h3 style={{ fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 700, color: "#1C1C1C", marginBottom: 14 }}>Message Sent!</h3>
              <p style={{ fontFamily: "Arial,sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "#5A5A5A", maxWidth: 320, margin: "0 auto 32px" }}>
                Thank you, <strong style={{ fontWeight: 600 }}>{form.name}</strong>. We've received your message and will get back to you within 24 hours.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", subject:"", message:"" }); }}
                style={{ fontFamily: "Arial,sans-serif", fontSize: 13, fontWeight: 600, color: TEAL, background: "transparent", border: `1.5px solid ${TEAL}`, borderRadius: 50, padding: "10px 24px", cursor: "pointer", letterSpacing: "0.04em" }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </FadeUp>

        {/* Right Column: Map, Social, Quote */}
        <FadeUp delay={0.15}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #E8E4DE", boxShadow: "0 8px 28px rgba(0,0,0,0.06)", background: "#fff" }}>
              <div style={{ height: 260, width: "100%", position: "relative" }}>
                <iframe
                  title="Optique House Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=67.0600%2C24.8550%2C67.0800%2C24.8700&layer=mapnik&marker=24.8625%2C67.0700"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div style={{ background: "#fff", padding: "18px 22px", display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid #F0EDE8" }}>
                <div style={{ color: PURPLE }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: "Arial,sans-serif", fontSize: 13, fontWeight: 600, color: "#2C2C2C" }}>Optique House</div>
                  <div style={{ fontFamily: "Arial,sans-serif", fontSize: 12, color: "#9A9A9A", marginTop: 1 }}>Shop No.1, Sadiq Heights, Sharfabad, Karachi</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 18, padding: "28px", border: "1px solid #E8E4DE" }}>
              <div style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: PURPLE, marginBottom: 18 }}>Connect With Us</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { platform: "Instagram", handle: "@optiquehouse.khi", color: "#C13584" },
                  { platform: "Facebook", handle: "Optique House Pakistan", color: "#1877F2" },
                  { platform: "WhatsApp", handle: "+92 312 2251134", color: "#25D366" },
                ].map((s) => (
                  <div key={s.platform} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: "#FAFAF8", border: "1px solid #F0EDE8" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: "Arial,sans-serif", fontSize: 12, fontWeight: 600, color: "#5A5A5A", minWidth: 80 }}>{s.platform}</div>
                    <div style={{ fontFamily: "Arial,sans-serif", fontSize: 12, color: "#9A9A9A", fontWeight: 300 }}>{s.handle}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#1C1C1C", borderRadius: 18, padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${PURPLE}22, ${TEAL}18)`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: grad }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 16, color: "#E8E4DE", lineHeight: 1.6, marginBottom: 16 }}>
                  "Walk in, and let us help you see the world more clearly."
                </div>
                <div style={{ fontFamily: "Arial,sans-serif", fontSize: 11, color: TEAL, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>— The Optique House Team</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Shop Images Gallery */}
      <section style={{ background: "#FAFAF8", padding: "0 48px 80px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontFamily: "Arial,sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: PURPLE, marginBottom: 12, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 1, background: grad }} />
                Premium Eyewear Boutique
                <div style={{ width: 28, height: 1, background: grad }} />
              </div>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3vw,42px)", fontWeight: 700, color: "#1C1C1C" }}>
                Our Karachi Store
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            {shopImages.map((img, idx) => (
              <FadeUp key={idx} delay={idx * 0.05}>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 28px rgba(0,0,0,0.08)", transition: "transform 0.3s ease", cursor: "pointer", background: "#fff" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <img src={img.url} alt={img.alt} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} loading="lazy" />
                  <div style={{ padding: "14px 18px", fontFamily: "Arial,sans-serif", fontSize: 13, fontWeight: 500, color: "#2C2C2C", borderTop: "1px solid #F2EFEA", background: "#fff" }}>
                    {img.caption}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, marginTop: 56, padding: "24px 0", borderTop: "1px solid #E8E4DE", borderBottom: "1px solid #E8E4DE" }}>
            {["CHANEL", "GUCCI", "PRADA", "CARRERA", "VOGUE", "RAY-BAN"].map(brand => (
              <span key={brand} style={{ fontFamily: "Arial,sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.2em", color: "#A19B92" }}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* New Enhanced Footer (replaces old simple footer) */}
      <Footer />
    </div>
  );
}