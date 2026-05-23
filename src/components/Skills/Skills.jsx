import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact, SiNodedotjs, SiPython, SiMongodb, SiTailwindcss,
  SiGit, SiGithub, SiJavascript, SiTypescript, SiExpress,
  SiFastapi, SiPostman, SiNetlify, SiVercel,
  SiVite, SiSocketdotio, SiScikitlearn, SiNumpy, SiPandas
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaCode } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Skills Data ─── */
const categories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai', label: 'AI & Data' },
  { key: 'tools', label: 'Tools & Platforms' },
];

const iconMap = {
  'React.js': SiReact,
  'HTML5': FaHtml5,
  'CSS3': FaCss3Alt,
  'Tailwind CSS': SiTailwindcss,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Responsive Design': BiCodeAlt,
  'Vite': SiVite,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'FastAPI': SiFastapi,
  'REST APIs': BiCodeAlt,
  'Socket.io': SiSocketdotio,
  'JWT Auth': BiCodeAlt,
  'MongoDB': SiMongodb,
  'Python': SiPython,
  'NumPy': SiNumpy,
  'Pandas': SiPandas,
  'Matplotlib': BiCodeAlt,
  'Scikit-Learn': SiScikitlearn,
  'Google Gemini AI': BiCodeAlt,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Postman': SiPostman,
  'VS Code': FaCode,
  'Netlify': SiNetlify,
  'Vercel': SiVercel,
};

const skillsData = {
  frontend: [
    { name: 'React.js', level: 90 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 75 },
    { name: 'Responsive Design', level: 90 },
    { name: 'Vite', level: 80 },
  ],
  backend: [
    { name: 'Node.js', level: 85 },
    { name: 'Express.js', level: 85 },
    { name: 'FastAPI', level: 70 },
    { name: 'REST APIs', level: 90 },
    { name: 'Socket.io', level: 75 },
    { name: 'JWT Auth', level: 80 },
    { name: 'MongoDB', level: 80 },
  ],
  ai: [
    { name: 'Python', level: 80 },
    { name: 'NumPy', level: 70 },
    { name: 'Pandas', level: 70 },
    { name: 'Matplotlib', level: 65 },
    { name: 'Scikit-Learn', level: 65 },
    { name: 'Google Gemini AI', level: 75 },
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'GitHub', level: 90 },
    { name: 'Postman', level: 80 },
    { name: 'VS Code', level: 95 },
    { name: 'Netlify', level: 80 },
    { name: 'Vercel', level: 85 },
  ],
};

/* ─── Skill Card ─── */
function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const Icon = iconMap[skill.name] || BiCodeAlt;

  /* 3D tilt + radial gradient light that follows cursor */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 12;
    const rotateX = ((cy - y) / cy) * 12;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
    card.style.setProperty('--light-x', `${x}px`);
    card.style.setProperty('--light-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.setProperty('--light-x', '-200px');
    card.style.setProperty('--light-y', '-200px');
  }, []);

  /* Animate progress bar when card scrolls into view */
  useEffect(() => {
    if (!barRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          gsap.fromTo(
            barRef.current,
            { width: '0%' },
            {
              width: `${skill.level}%`,
              duration: 2.0,
              ease: 'power3.out',
              delay: index * 0.12,
            },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [skill.level, index, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className={styles.skillCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-index': index }}
    >
      {/* Hover light overlay */}
      <div className={styles.cardLight} />

      <div className={styles.cardHeader}>
        <Icon className={styles.skillIcon} />
        <span className={styles.skillName}>{skill.name}</span>
        <span className={styles.skillPercent}>{skill.level}%</span>
      </div>

      <div className={styles.progressTrack}>
        <div
          ref={barRef}
          className={styles.progressBar}
          style={{ '--bar-color': '#b4b8d2', width: hasAnimated ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/* ─── Main Skills Component ─── */
export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const gridRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('frontend');

  /* GSAP heading + tabs entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(tabsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Stagger skill cards on category change */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(`.${styles.skillCard}`);
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.12,
      },
    );
  }, [activeCategory]);

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      {/* Background grid pattern */}
      <div className={styles.gridBg} />

      <div className={styles.container}>
        {/* ── Heading ── */}
        <div ref={headingRef} className={styles.heading}>
          <span className={styles.sectionLabel}>{'// SKILLS'}</span>
          <h2 className={styles.title}>
            Technologies I <em>work&nbsp;with</em>
          </h2>
          <p className={styles.subtitle}>
            A curated stack of modern technologies I use to build fast, scalable,
            and beautiful digital products.
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div ref={tabsRef} className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.tab} ${activeCategory === cat.key ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Skills Grid ── */}
        <div ref={gridRef} className={styles.grid} key={activeCategory}>
          {skillsData[activeCategory].map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
