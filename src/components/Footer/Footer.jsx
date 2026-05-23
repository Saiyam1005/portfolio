import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* ── scroll-to-top ── */}
        <button
          className={styles.toTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaArrowUp className={styles.toTopIcon} />
          <span className={styles.toTopGlow} />
        </button>

        {/* ── separator ── */}
        <div className={styles.separator}>
          <span className={styles.separatorLine} />
        </div>

        {/* ── brand ── */}
        <h3 className={styles.name}>Saiyam Shah</h3>
        <p className={styles.subtitle}>Full Stack Developer · AI Engineer</p>

        {/* ── socials ── */}
        <div className={styles.socials}>
          <a
            href="https://github.com/Saiyam1005"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/saiyam-shah-52b3bb332?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* ── copyright ── */}
        <p className={styles.copy}>
          &copy; {currentYear} Saiyam Shah. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
