// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

/* ── SVG Social Icons ─────────────────────────────────── */
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

/* ── Component ─────────────────────────────────────────── */
const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

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

        /* Subtle grain texture overlay */
        .footer-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* Gold top border */
        .footer-root::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a84c 30%, #f5e6a3 50%, #c9a84c 70%, transparent);
        }

        .footer-inner { position: relative; z-index: 1; }

        /* ── Newsletter band ── */
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
        .footer-newsletter-form:focus-within {
          border-color: #c9a84c;
        }
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

        /* ── Main grid ── */
        .footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 40px 48px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* Brand column */
        .footer-brand-logo {
          display: block;
          margin-bottom: 20px;
          filter: brightness(0) invert(1);
          width: 160px;
          height: auto;
          object-fit: contain;
        }
        .footer-brand-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-style: italic;
          color: #7a7268;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* Social icons */
        .footer-socials {
          display: flex;
          gap: 10px;
        }
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

        /* Column headings */
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

        /* Footer links */
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

        /* Contact items */
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.82rem;
          color: #6e6a64;
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .footer-contact-item .icon {
          color: #c9a84c;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* ── Bottom bar ── */
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
        .footer-bottom-copy {
          font-size: 0.75rem;
          color: #3e3a34;
          letter-spacing: 0.04em;
        }
        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }
        .footer-bottom-links a {
          font-size: 0.75rem;
          color: #3e3a34;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: #c9a84c; }

        /* ── Responsive ── */
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

          {/* ── Newsletter Band ── */}
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
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <button type="submit">Subscribe</button>
                </form>
              )}
            </div>
          </div>

          {/* ── Main Grid ── */}
          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-col">
              <Link to="/">
                <img src="./logo.png" alt="Lumina Optical" className="footer-brand-logo" />
              </Link>
              <p className="footer-brand-tagline">
                Redefining vision through innovation<br />and Italian design since 1998.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-btn" aria-label="Facebook"><IconFacebook /></a>
                <a href="#" className="social-btn" aria-label="Instagram"><IconInstagram /></a>
                <a href="#" className="social-btn" aria-label="Twitter/X"><IconTwitter /></a>
              </div>
            </div>

            {/* Shop */}
            <div className="footer-col">
              <h4>Shop</h4>
              <ul className="footer-links">
                {["Men's Frames","Women's Frames","Kids' Collection","Blue Light Glasses","Sunglasses"].map(item => (
                  <li key={item}><Link to="/product">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                {["Shipping & Returns","Track Order","Prescription Guide","FAQ","Warranty"].map(item => (
                  <li key={item}><Link to="/contact">{item}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Visit Us</h4>
              <div className="footer-contact-item">
                <span className="icon"><IconPin /></span>
                <span>123 Fashion Ave,<br />New York, NY 10001</span>
              </div>
              <div className="footer-contact-item">
                <span className="icon"><IconPhone /></span>
                <span>+1 (212) 555-0190</span>
              </div>
              <div className="footer-contact-item">
                <span className="icon"><IconMail /></span>
                <span>hello@luminaoptical.com</span>
              </div>
              <div className="footer-contact-item" style={{marginTop: 4}}>
                <span className="icon" style={{marginTop:0}}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <span>Mon–Sat: 9am–8pm<br />Sunday: Closed</span>
              </div>
            </div>

          </div>

          {/* ── Bottom Bar ── */}
          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <span className="footer-bottom-copy">
                © 2026 Lumina Optical Luxury. All rights reserved.
              </span>
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

export default Footer;