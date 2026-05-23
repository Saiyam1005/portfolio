import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGoogle, FaRocket, FaChartBar, FaBrain } from 'react-icons/fa';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    id: 1,
    year: '2025',
    title: 'Google Student Ambassador',
    description:
      'Selected as Google Student Ambassador, representing the university in Google\'s student programs, tech events, and developer community initiatives.',
    Icon: FaGoogle,
  },
  {
    id: 2,
    year: '2025',
    title: 'Co-Founder, Trionity',
    description:
      'Running a fun content creation page with my two friends where we make creative and entertaining content, experiment with ideas, and enjoy building things together.',
    Icon: FaRocket,
  },

];

const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const headingRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── heading reveal ── */
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

      /* ── timeline line grow ── */
      gsap.from(timelineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      /* ── cards stagger ── */
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const isLeft = i % 2 === 0;
        gsap.from(item, {
          x: isLeft ? -80 : 80,
          opacity: 0,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      {/* floating particles */}
      <div className={styles.particles}>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--size': `${2 + Math.random() * 4}px`,
              '--dur': `${6 + Math.random() * 10}s`,
              '--delay': `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <h2 ref={headingRef} className={styles.heading}>
          <span className={styles.headingAccent}>Experience</span>
          <span className={styles.headingSub}>Milestones &amp; Achievements</span>
        </h2>

        <div className={styles.timeline}>
          <div ref={timelineRef} className={styles.timelineLine} />

          {timelineItems.map((item, i) => {
            const { Icon } = item;
            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`${styles.timelineItem} ${
                  i % 2 === 0 ? styles.left : styles.right
                }`}
              >
                {/* connector dot */}
                <div className={styles.dot}>
                  <span className={styles.dotPulse} />
                </div>

                {/* card */}
                <div className={styles.card}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap}>
                      <Icon className={styles.icon} />
                    </div>
                    <span className={styles.year}>{item.year}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
