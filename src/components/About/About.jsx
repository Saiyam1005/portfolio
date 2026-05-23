import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   About – Immersive split-layout about section
   ═══════════════════════════════════════════════════════ */

const About = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const portraitRef = useRef(null);
  const paragraphRefs = useRef([]);
  const techTagsRef = useRef(null);
  const statsRef = useRef(null);
  const dividerRef = useRef(null);

  // Parallax mouse move for portrait
  const handleMouseMove = useCallback((e) => {
    if (!portraitRef.current) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

    gsap.to(portraitRef.current, {
      x: x,
      y: y,
      duration: 1.2,
      ease: 'power2.out',
    });
  }, []);

  // Collect paragraph refs
  const setParagraphRef = useCallback((el, index) => {
    if (el) paragraphRefs.current[index] = el;
  }, []);

  // GSAP ScrollTrigger reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section tag reveal
      gsap.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Section title reveal
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 2.0,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Divider line scale-in
      if (dividerRef.current) {
        gsap.to(dividerRef.current, {
          opacity: 1,
          scaleX: 1,
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Paragraph lines slide in from right (staggered)
      paragraphRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 2.0,
          ease: 'power3.out',
          delay: i * 0.3,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Tech tags slide in
      if (techTagsRef.current) {
        gsap.to(techTagsRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: techTagsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stats row slide up
      if (statsRef.current) {
        gsap.to(statsRef.current, {
          opacity: 1,
          y: 0,
          duration: 2.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax listener
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const stats = [
    { value: '8.32', label: 'CPI' },
    { value: '8+', label: 'Projects' },
    { value: 'MERN', label: 'Stack' },
    { value: 'AI', label: 'Integration' },
  ];

  const techTags = [
    'React', 'Node.js', 'MongoDB', 'Express',
    'Socket.io', 'Gemini AI', 'TypeScript',
    'Tailwind CSS', 
  ];

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="about">
      {/* Floating Blur Orbs */}
      <div className={styles.floatingOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      <div className={styles.aboutContainer}>
        {/* Section Header */}
        <div className={styles.headerArea}>
          <p ref={tagRef} className={styles.sectionTag}>
            Who I Am
          </p>
          <h2 ref={titleRef} className={styles.sectionTitle}>
            About <span className={styles.sectionTitleAccent}>Me</span>
          </h2>
          
        </div>

        {/* Split Layout */}
        <div className={styles.splitLayout}>
          {/* Left – Glowing Portrait Frame */}
          <div className={styles.portraitSide}>
            <motion.div
              ref={portraitRef}
              className={styles.portraitWrapper}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Outer glow */}
              <div className={styles.portraitOuterGlow} />

              {/* Animated rotating gradient ring */}
              <div className={styles.portraitGlowRing} />

              {/* Main frame with monogram */}
              <div className={styles.portraitFrame}>
                {/* Decorative floating particles inside frame */}
                <span className={styles.portraitParticle} />
                <span className={styles.portraitParticle} />
                <span className={styles.portraitParticle} />
                <span className={styles.portraitParticle} />

                {/* Profile Image (Replaced Monogram) */}
                <img src="/about.png" alt="Saiyam Shah" className={styles.profileImage} />
              </div>
            </motion.div>
          </div>

          {/* Right – Animated Text */}
          <div className={styles.textSide}>
            <p
              ref={(el) => setParagraphRef(el, 0)}
              className={styles.aboutParagraph}
            >
              I'm <strong>Saiyam Shah</strong>, a passionate{' '}
              <span className={styles.highlightText}>Computer Engineering</span>{' '}
              student at VGEC with a CPI of{' '}
              <span className={styles.highlightText}>8.32</span>. I build
              scalable web applications and{' '}
              <span className={styles.highlightText}>AI-powered systems</span>{' '}
              that push the boundaries of what's possible on the modern web.
            </p>

            <hr ref={dividerRef} className={styles.divider} />

            <p
              ref={(el) => setParagraphRef(el, 1)}
              className={styles.aboutParagraph}
            >
              My expertise lies in the{' '}
              <strong>MERN stack</strong> — React, Node.js, Express, and
              MongoDB — where I craft performant frontends with stunning UI/UX
              and robust backend architectures. I integrate cutting-edge AI
              capabilities like{' '}
              <span className={styles.highlightText}>Gemini AI</span> to create
              intelligent, context-aware applications.
            </p>

            <p
              ref={(el) => setParagraphRef(el, 2)}
              className={styles.aboutParagraph}
            >
              From real-time collaborative features powered by{' '}
              <strong>Socket.io</strong> to scalable microservice patterns, I
              focus on engineering solutions that are as elegant in code as they
              are in experience. Every project is an opportunity to merge{' '}
              <span className={styles.highlightText}>
                creative vision with technical precision
              </span>.
            </p>

            {/* Tech Tags */}
            <div ref={techTagsRef} className={styles.techTags}>
              {techTags.map((tag) => (
                <motion.span
                  key={tag}
                  className={styles.techTag}
                  whileHover={{
                    scale: 1.08,
                    transition: { duration: 0.3 },
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className={styles.statsRow}>
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                  }}
                >
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
