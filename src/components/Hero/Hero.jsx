import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import styles from './Hero.module.css';

/* ═══════════════════════════════════════════════════════
   FloatingParticles – Three.js particle field
   Periwinkle + deep-navy colour palette
   ═══════════════════════════════════════════════════════ */

function FloatingParticles({ count = 220 }) {
  const meshRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const type = Math.random() > 0.55 ? 1 : 0; // 0 = periwinkle, 1 = white
      data.push({
        x: (Math.random() - 0.5) * 28,
        y: (Math.random() - 0.5) * 18,
        z: (Math.random() - 0.5) * 14,
        scale: Math.random() * (type === 1 ? 0.75 : 0.38) + 0.08,
        speedX: (Math.random() - 0.5) * 0.09,
        speedY: (Math.random() - 0.5) * 0.07,
        speedZ: (Math.random() - 0.5) * 0.05,
        phaseOffset: Math.random() * Math.PI * 2,
        type,
      });
    }
    return data;
  }, [count]);

  // periwinkle #b4b8d2, navy #3d3d6e, white #f0f0f0
  const colorPeriwinkle = useMemo(() => new THREE.Color('#b4b8d2'), []);
  const colorWhite = useMemo(() => new THREE.Color('#f0f0f4'), []);
  const colorArray = useMemo(() => new Float32Array(count * 3), [count]);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const c = particles[i].type === 1 ? colorWhite : colorPeriwinkle;
      c.toArray(colorArray, i * 3);
    }
    if (meshRef.current) {
      meshRef.current.geometry.setAttribute(
        'color',
        new THREE.InstancedBufferAttribute(colorArray, 3)
      );
    }
  }, [count, particles, colorPeriwinkle, colorWhite, colorArray]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.22;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const phase = t + p.phaseOffset;

      dummy.position.set(
        p.x + Math.sin(phase * p.speedX * 2) * 1.6,
        p.y + Math.cos(phase * p.speedY * 2) * 1.3,
        p.z + Math.sin(phase * p.speedZ * 2) * 0.9
      );

      const breathe = 0.8 + Math.sin(phase * 0.75) * 0.28;
      const s = p.scale * breathe;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 10, 10]} />
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

/* ═══════════════════════════════════════════════════════
   Hero – Matching reference image layout
   Large display text + hero portrait card + explore badge
   ═══════════════════════════════════════════════════════ */

const Hero = () => {
  const fgRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const cardRef = useRef(null);
  const scrollRef = useRef(null);
  const mouseGlowRef = useRef(null);

  // Mouse-follow glow
  const handleMouseMove = useCallback((e) => {
    if (mouseGlowRef.current) {
      mouseGlowRef.current.style.left = `${e.clientX}px`;
      mouseGlowRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.6 },
        delay: 0.3,
      });

      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 1.8 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.4 }, '-=1.0')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 1.2 }, '-=1.0')
        .to(cardRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power3.out' }, '-=1.4')
        .to(badgeRef.current, { opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.4)' }, '-=0.8')
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 1.0 }, '-=0.6');
    }, fgRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroWrapper} id="hero">

      {/* ── Three.js Canvas (background particles) ── */}
      <div className={styles.canvasContainer}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 65 }}
          dpr={[1, Math.min(1.8, window.devicePixelRatio)]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <FloatingParticles count={220} />
        </Canvas>
      </div>

      {/* Mouse-follow glow orb */}
      <div ref={mouseGlowRef} className={styles.mouseGlow} />

      {/* ── Grid circles (like reference) ── */}
      <div className={styles.gridCircles}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>

      {/* ── Hero foreground content ── */}
      <div className={styles.heroContent} ref={fgRef}>

        {/* ─── HEADLINE: SAIYAM ⊕ SHAH ─── */}
        <div ref={headlineRef} className={styles.headline}>
          <span className={styles.headWord}>SAIYAM</span>
          <span className={styles.headCircleWrap} aria-hidden="true">
            <span className={styles.headCircle}>
              <span className={styles.headCircleInner} />
            </span>
          </span>
          <span className={styles.headWord}>SHAH</span>
        </div>

        {/* ─── Subtitle strip ─── */}
        <p ref={subtitleRef} className={styles.subtitle}>
          Works &nbsp;·&nbsp; Over the World &nbsp;·&nbsp; People from all walks of life
        </p>

        {/* ─── Split layout: portrait card + text ─── */}
        <div className={styles.splitRow}>

          {/* Portrait card (dark rounded, like reference) */}
          <div ref={cardRef} className={styles.portraitCard}>
            <img
              src="/profile.png"
              alt="Saiyam Shah"
              className={styles.portraitImg}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className={styles.portraitFallback}>S</div>

            {/* Circular rotating "EXPLORE MORE" badge */}
            <div ref={badgeRef} className={styles.exploreBadge}>
              <svg viewBox="0 0 100 100" className={styles.badgeSvg}>
                <defs>
                  <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <text className={styles.badgeText}>
                  <textPath href="#circlePath" startOffset="0%">
                    EXPLORE MORE · EXPLORE MORE ·
                  </textPath>
                </text>
              </svg>
              <span className={styles.badgeStar}>✦</span>
            </div>
          </div>

          {/* Right text block */}
          <div ref={ctaRef} className={styles.textBlock}>
            <p className={styles.roleLabel}>Full Stack Developer</p>
            <p className={styles.roleDesc}>
              I'm <strong>Saiyam Shah</strong> — a Computer Engineering
              student at VGEC. I craft scalable MERN apps and{' '}
              <span className={styles.highlight}>AI-powered systems</span>{' '}
              that push what's possible on the modern web.
            </p>
            <div className={styles.ctaRow}>
              <a href="#projects" className={styles.ctaPrimary}>
                View Projects
              </a>
              <a href="https://drive.google.com/file/d/1bc97C7VMZRfPdiDrACatjL7Df55CM8ip/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                Check My Resume
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ── Scroll Indicator ── */}
      <div ref={scrollRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.pulseLine} />
      </div>

    </section>
  );
};

export default Hero;
