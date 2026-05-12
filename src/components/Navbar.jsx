// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const loadCartCount = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = savedCart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(totalItems);
    return totalItems;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setCartBounce(true);
    const t = setTimeout(() => setCartBounce(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    loadCartCount();
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        loadCartCount();
        setCartBounce(true);
        setTimeout(() => setCartBounce(false), 600);
      }
    };
    const handleCartUpdate = () => {
      loadCartCount();
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/',         label: 'Home'     },
    { to: '/about',    label: 'About'    },
    { to: '/products', label: 'Products' },
    { to: '/contact',  label: 'Contact'  },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleSearchClick = () => {
    navigate('/products', { state: { focusSearch: true } });
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        /* ── Promo bar ── */
        .promo-bar {
          background: #0a0a0a;
          color: #fff;
          text-align: center;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          font-weight: 700;
          text-transform: uppercase;
          padding: 8px 12px;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.4;
        }
        .promo-bar span { color: #f5c842; margin: 0 3px; }

        /* ── Main nav ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid #ebebeb;
          transition: box-shadow 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

        /* ── Nav inner: Logo | Links | Actions ── */
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav-logo img {
          width: 140px;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Desktop links ── */
        .nav-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }
        .nav-links li a {
          display: inline-block;
          padding: 8px 14px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a1a;
          text-decoration: none;
          border-radius: 8px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-links li a::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 14px; right: 14px;
          height: 2px;
          background: #1a1a1a;
          border-radius: 1px;
          transform: scaleX(0);
          transition: transform 0.25s cubic-bezier(.4,0,.2,1);
        }
        .nav-links li a:hover { color: #000; }
        .nav-links li a:hover::after { transform: scaleX(1); }
        .nav-links li a.active { color: #000; }
        .nav-links li a.active::after { transform: scaleX(1); }

        /* ── Right actions ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Icon button */
        .icon-btn {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border: none; background: transparent;
          border-radius: 10px;
          cursor: pointer;
          color: #1a1a1a;
          transition: background 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .icon-btn:hover { background: #f3f3f3; transform: scale(1.08); }

        /* Cart button */
        .cart-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #0a0a0a;
          color: #fff;
          border: none;
          padding: 0 16px;
          height: 40px;
          border-radius: 20px;
          font-size: 0.77rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .cart-btn:hover {
          background: #222;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.18);
        }
        .cart-btn:active { transform: translateY(0); }

        /* Cart icon */
        .cart-icon-wrap {
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .cart-icon-wrap svg { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        .cart-btn:hover .cart-icon-wrap svg { transform: rotate(-12deg) scale(1.15); }

        /* Cart badge */
        .cart-badge {
          position: absolute;
          top: -7px; right: -8px;
          min-width: 16px;
          height: 16px;
          background: #f5c842;
          color: #0a0a0a;
          border-radius: 50%;
          font-size: 0.58rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid #0a0a0a;
          box-sizing: content-box;
          line-height: 1;
        }

        /* Bounce animation */
        @keyframes cartBounce {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.3) rotate(-8deg); }
          60%  { transform: scale(0.92) rotate(4deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .cart-bounce svg { animation: cartBounce 0.55s cubic-bezier(.36,.07,.19,.97); }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px; height: 40px;
          border: none; background: transparent;
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .hamburger:hover { background: #f3f3f3; }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Menu ── */
        .mobile-menu {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.38s cubic-bezier(.4,0,.2,1), opacity 0.3s;
          opacity: 0;
          background: #fff;
          border-top: 1px solid #f0f0f0;
        }
        .mobile-menu.open { max-height: 480px; opacity: 1; }

        .mobile-menu-inner {
          padding: 8px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Mobile nav links */
        .mobile-menu-inner .mobile-link {
          display: flex;
          align-items: center;
          padding: 14px 4px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid #f0f0f0;
          transition: color 0.2s, padding-left 0.2s;
          gap: 10px;
        }
        .mobile-menu-inner .mobile-link:hover { color: #000; padding-left: 10px; }
        .mobile-menu-inner .mobile-link.active {
          color: #000;
          font-weight: 800;
        }
        .mobile-link-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #f5c842;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .mobile-menu-inner .mobile-link.active .mobile-link-dot { opacity: 1; }

        /* Mobile bottom actions */
        .mobile-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 16px;
        }
        .mobile-search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex: 1;
          height: 44px;
          border: 1.5px solid #e0e0e0;
          background: transparent;
          border-radius: 22px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #1a1a1a;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, border-color 0.2s;
        }
        .mobile-search-btn:hover { background: #f5f5f5; border-color: #ccc; }

        .mobile-cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex: 1;
          height: 44px;
          background: #0a0a0a;
          color: #fff;
          border: none;
          border-radius: 22px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
          position: relative;
        }
        .mobile-cart-btn:hover { background: #222; }
        .mobile-cart-badge {
          position: absolute;
          top: -4px; right: -4px;
          min-width: 18px;
          height: 18px;
          background: #f5c842;
          color: #0a0a0a;
          border-radius: 50%;
          font-size: 0.6rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid #0a0a0a;
          box-sizing: content-box;
        }

        /* ── Responsive breakpoints ── */

        /* Tablet: hide desktop links, show hamburger */
        @media (max-width: 1023px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .search-desktop { display: none !important; }
          .nav-inner { padding: 0 20px; }
        }

        /* Mobile: tighter layout */
        @media (max-width: 639px) {
          .nav-inner {
            padding: 0 14px;
            height: 58px;
            gap: 10px;
          }
          .nav-logo img { width: 120px; }

          /* Show only icon cart (no text) on very small screens */
          .cart-btn-text { display: none; }
          .cart-btn {
            padding: 0 10px;
            min-width: 40px;
            height: 40px;
            border-radius: 50%;
            gap: 0;
          }
          .promo-bar {
            font-size: 0.6rem;
            padding: 6px 10px;
            letter-spacing: 0.06em;
          }
        }

        /* Very small: minor padding tweaks */
        @media (max-width: 380px) {
          .nav-inner { padding: 0 10px; }
          .nav-logo img { width: 100px; }
        }
      `}</style>

      {/* Promotional Bar */}
      <div className="promo-bar">
        🎁 Limited Time: Buy All Items And Get upto<span>70% Off</span>+ Free Shipping On 5000+ PKR Order
      </div>

      {/* Main Navigation */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src="./logo.png" alt="Logo" />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={isActive(to) ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Search — desktop only */}
            <button
              className="icon-btn search-desktop"
              title="Search"
              onClick={handleSearchClick}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                  d="M21 21l-5.2-5.2M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <button className={`cart-btn${cartBounce ? ' cart-bounce' : ''}`}>
                <span className="cart-icon-wrap">
                  <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2.2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                      d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                  )}
                </span>
                <span className="cart-btn-text">Cart</span>
              </button>
            </Link>

            {/* Hamburger */}
            <button
              className={`hamburger${isMenuOpen ? ' open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${isMenuOpen ? ' open' : ''}`}>
          <div className="mobile-menu-inner">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`mobile-link${isActive(to) ? ' active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mobile-link-dot" />
                {label}
              </Link>
            ))}

            {/* Mobile bottom actions: Search + Cart side by side */}
            <div className="mobile-actions">
              <button className="mobile-search-btn" onClick={handleSearchClick}>
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                    d="M21 21l-5.2-5.2M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                Search
              </button>

              <Link
                to="/cart"
                className="mobile-cart-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2.2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                    d="M16 10a4 4 0 01-8 0" />
                </svg>
                View Cart
                {cartCount > 0 && (
                  <span className="mobile-cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;