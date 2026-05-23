import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
];

const Navbar = ({ splashDone }) => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  /* ── Only show after splash is done ── */
  useEffect(() => {
    if (!splashDone) {
      setVisible(false);
      return;
    }

    // Small delay after splash ends so the entrance feels intentional
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, [splashDone]);

  /* ── Hide on scroll-down, show on scroll-up (after splash) ── */
  useEffect(() => {
    if (!splashDone) return;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 80) {
        // Scrolling down — hide
        setVisible(false);
        setMenuOpen(false);
      } else {
        // Scrolling up — show
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [splashDone]);

  /* ── Smooth scroll on link click ── */
  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className={styles.navbar}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Capsule pill ── */}
          <div className={styles.capsule}>

            {/* Logo */}
            <a href="#" className={styles.logo} onClick={(e) => handleNav(e, '#hero')}>
              S<span className={styles.logoDot}>.</span>
            </a>

            {/* Desktop links */}
            <ul className={styles.links}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => handleNav(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact pill */}
            <a
              href="#contact"
              className={styles.contactBtn}
              onClick={(e) => handleNav(e, '#contact')}
            >
              Contact
            </a>

            {/* Hamburger (mobile) */}
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className={styles.mobileMenu}
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ul className={styles.mobileLinks}>
                  {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                    >
                      <a
                        href={link.href}
                        className={styles.mobileLink}
                        onClick={(e) => handleNav(e, link.href)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
