import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCircle,
} from 'react-icons/fa';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  /* ── GSAP heading reveal ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── auto-dismiss toast ── */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (field) => setFocused((p) => ({ ...p, [field]: true }));
  const handleBlur = (field) => {
    if (!form[field]) setFocused((p) => ({ ...p, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    /* simulate network */
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Form submitted:', form);

    setLoading(false);
    setForm({ name: '', email: '', message: '' });
    setFocused({});
    setToast(true);
  };

  const isActive = (field) => focused[field] || form[field];

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      {/* background gradient mesh */}
      <div className={styles.meshBg} />
      <div className={styles.radialGlow} />

      <div className={styles.inner}>
        <h2 ref={headingRef} className={styles.heading}>
          <span className={styles.headingAccent}>Get In Touch</span>
          <span className={styles.headingSub}>Let&apos;s Build Something Great</span>
        </h2>

        <motion.div
          className={styles.panel}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* ── left: info ── */}
          <motion.div className={styles.info} variants={itemVariants}>
            <h3 className={styles.infoTitle}>Contact Info</h3>

            <div className={styles.infoRow}>
              <FaEnvelope className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Email</span>
                <a
                  href="mailto:saiyamjshah2005@gmail.com"
                  className={styles.infoValue}
                >
                  saiyamjshah2005@gmail.com
                </a>
              </div>
            </div>
            <div className={styles.infoRow}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <div>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>
                  Ahmedabad, Gujarat, India
                </span>
              </div>
            </div>

            <div className={styles.infoRow}>
              <FaCircle className={styles.availDot} />
              <div>
                <span className={styles.infoLabel}>Availability</span>
                <span className={styles.infoValue}>
                  Available for opportunities
                </span>
              </div>
            </div>

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
          </motion.div>

          {/* ── right: form ── */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            {/* name */}
            <div
              className={`${styles.field} ${isActive('name') ? styles.active : ''}`}
            >
              <label className={styles.label} htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                className={styles.input}
              />
              <span className={styles.fieldBorder} />
            </div>

            {/* email */}
            <div
              className={`${styles.field} ${isActive('email') ? styles.active : ''}`}
            >
              <label className={styles.label} htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className={styles.input}
              />
              <span className={styles.fieldBorder} />
            </div>

            {/* message */}
            <div
              className={`${styles.field} ${styles.fieldTextarea} ${isActive('message') ? styles.active : ''
                }`}
            >
              <label className={styles.label} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows="5"
                value={form.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                className={`${styles.input} ${styles.textarea}`}
              />
              <span className={styles.fieldBorder} />
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      {/* ── success toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            ✓&ensp;Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
