import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiMongodb, SiTailwindcss,
  SiExpress, SiSocketdotio, SiJsonwebtokens, SiRabbitmq
} from 'react-icons/si';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowRight } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const projects = [
  {
    id: 1,
    num: '01',
    title: 'GenAI Resume Assistant',
    desc: 'AI-powered resume and interview preparation platform using Google Gemini AI with ATS resume analysis, skill gap analysis, and PDF generation.',
    longDesc:
      'A full-stack platform that leverages Google Gemini AI to help job seekers craft optimized resumes. Features include ATS compatibility scoring, intelligent skill gap analysis, tailored interview question generation, and one-click PDF resume export. Built with a modern MERN stack and secured with JWT authentication.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'JWT'],
    accent: '#FF8C42',
    github: 'https://github.com/Saiyam1005/GenAi-JobResume',
    // live: '#',
  },
  {
    id: 2,
    num: '02',
    title: 'Zomato Reel Food Discovery',
    desc: 'Modern reel-style food discovery and partner management platform with authentication, likes, comments, analytics, and responsive UI.',
    longDesc:
      'A Zomato-inspired food discovery app that introduces a TikTok-style reel interface for browsing restaurants and dishes. Includes a full partner management dashboard with analytics, user engagement features like likes and comments, and a fully responsive mobile-first UI.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
    accent: '#E23744',
    github: 'https://github.com/Saiyam1005/Reel-Food',
    // live: '#',
  },
  {
    id: 3,
    num: '03',
    title: 'VaultX Banking System',
    desc: 'Secure banking system with ledger accounting, atomic transactions, JWT authentication, multi-currency support, and transaction notifications.',
    longDesc:
      'A robust banking system featuring double-entry ledger accounting, ACID-compliant atomic transactions, multi-currency wallet support, and real-time transaction notifications. Fortified with JWT-based authentication and role-based access control.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    accent: '#00D4AA',
    github: 'https://github.com/Saiyam1005/VaultX-Bank-Transaction',
    // live: '#',
  },
  {
    id: 4,
    num: '04',
    title: 'Uber Ride Hailing App',
    desc: 'Microservices-based ride booking platform using RabbitMQ, Socket.io, MongoDB, JWT, and real-time ride tracking.',
    longDesc:
      'A production-grade ride-hailing platform built with a microservices architecture. Uses RabbitMQ for inter-service messaging, Socket.io for real-time ride tracking, MongoDB for persistent storage, and JWT for secure authentication across services.',
    tech: ['Node.js', 'Express.js', 'RabbitMQ', 'Socket.io', 'MongoDB'],
    accent: '#276EF1',
    github: 'https://github.com/Saiyam1005/Micro-Service-Uber',
    // live: '#',
  },
];

/* ─── Tech icon resolver ─── */
const techIcons = {
  'React.js': SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'MongoDB': SiMongodb,
  'Tailwind CSS': SiTailwindcss,
  'Socket.io': SiSocketdotio,
  'RabbitMQ': SiRabbitmq,
  'JWT': SiJsonwebtokens,
};

function TechIcon({ name }) {
  const Icon = techIcons[name] || BiCodeAlt;
  return <Icon />;
}

/* ─── Project Card ─── */
function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);

  /* Parallax tilt on mouse move */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 8;
    const rotX = ((cy - y) / cy) * 8;

    card.style.transform =
      `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.setProperty('--glow-x', '-300px');
    card.style.setProperty('--glow-y', '-300px');
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      style={{
        '--accent': project.accent,
        '--glow-x': '-300px',
        '--glow-y': '-300px',
      }}
    >
      {/* Animated gradient border */}
      <div className={styles.borderGlow} />

      {/* Hover glow overlay */}
      <div className={styles.glowOverlay} />

      {/* Inner content */}
      <div className={styles.cardInner}>
        {/* Number */}
        <span className={styles.projectNum}>{project.num}</span>

        {/* Title */}
        <h3 className={styles.projectTitle}>{project.title}</h3>

        {/* Description */}
        <p className={styles.projectDesc}>{project.desc}</p>

        {/* Tech pills */}
        <div className={styles.techPills}>
          {project.tech.map((t) => (
            <span key={t} className={styles.pill} style={{ '--accent': project.accent }}>
              <TechIcon name={t} />
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className={styles.cardActions}>
          <a
            href={project.github}
            className={styles.btnGithub}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> Code
          </a>
          {/* <a
            href={project.live}
            className={styles.btnLive}
            style={{ '--accent': project.accent }}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt /> Live
          </a> */}
        </div>
      </div>
    </div>
  );
}

/* ─── Modal ─── */
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectModal({ project, onClose }) {
  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) return null;

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        style={{ '--accent': project.accent }}
      >
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>

        <span className={styles.modalNum}>{project.num}</span>
        <h2 className={styles.modalTitle}>{project.title}</h2>

        <p className={styles.modalDesc}>{project.longDesc}</p>

        <div className={styles.modalTech}>
          {project.tech.map((t) => (
            <span key={t} className={styles.modalPill} style={{ '--accent': project.accent }}>
              <TechIcon name={t} />
              {t}
            </span>
          ))}
        </div>

        <div className={styles.modalActions}>
          <a
            href={project.github}
            className={styles.modalBtnGithub}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> View Source
          </a>
          {/* <a
            href={project.live}
            className={styles.modalBtnLive}
            style={{ '--accent': project.accent }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt /> Live Preview
          </a> */}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Projects Component ─── */
export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const [openProject, setOpenProject] = useState(null);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.from(headingRef.current, {
        y: 70,
        opacity: 0,
        duration: 1.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      /* Stagger cards */
      const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.3,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      {/* Ambient glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.container}>
        {/* ── Heading ── */}
        <div ref={headingRef} className={styles.heading}>
          <span className={styles.sectionLabel}>{'// PROJECTS'}</span>
          <h2 className={styles.title}>
            Selected <em>works</em>
          </h2>
          <p className={styles.subtitle}>
            A handpicked collection of projects that reflect my passion for building
            scalable, beautiful, and impactful digital experiences.
          </p>
        </div>

        {/* ── Cards ── */}
        <div ref={cardsRef} className={styles.grid}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={setOpenProject}
            />
          ))}
        </div>

        {/* ── View All Projects CTA ── */}
        <motion.div
          className={styles.viewAllWrap}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <a
            href="https://github.com/Saiyam1005"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllBtn}
          >
            <FaGithub className={styles.viewAllIcon} />
            View All Projects
            <FaArrowRight className={styles.viewAllArrow} />
          </a>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
