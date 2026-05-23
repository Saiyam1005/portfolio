import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SplashScreen.module.css';

/* ═══════════════════════════════════════════════════════
   SplashScreen – Fullscreen splash with audio
   ─────────────────────────────────────────────────────
   Browser policy: unmuted autoplay requires a user gesture.
   Strategy:
     1. Show a "Click to enter" gate screen (the user gesture)
        - REDESIGNED to align with the premium black-and-red HUD cyberpunk style reference
     2. On click → start video UNMUTED with full volume
     3. When video ends → unlock browser scrolling (Lenis)
     4. Parallax scroll reveal: the main page rolls up naturally
        from bottom while the splash screen curtain translates upwards
        at scroll speed, and the video moves with a parallax shift.
     5. Once scroll exceeds 100vh, the splash screen unmounts cleanly.
   ═══════════════════════════════════════════════════════ */

const SplashScreen = ({ onComplete, onUnlockScroll, isMobile }) => {
  const videoRef = useRef(null);

  // 'gate'    → show the click-to-enter screen
  // 'playing' → video playing with audio
  // 'ended'   → video done, show scroll CTA & unlock native scroll-to-reveal
  const [phase, setPhase] = useState('gate');
  const [translateYValue, setTranslateYValue] = useState(0);
  const [isEntering, setIsEntering] = useState(false);

  /* ── Start video with sound after user click ── */
  const handleGateClick = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    video.play()
      .then(() => {
        setPhase('playing');
      })
      .catch(() => {
        // Fallback — still play muted if something goes wrong
        video.muted = true;
        video.play().catch(() => { });
        setPhase('playing');
      });
  };

  /* ── Video ended ── */
  const handleEnded = () => {
    setPhase('ended');
    if (!isMobile && onUnlockScroll) {
      onUnlockScroll();
    }
  };

  /* ── Unified mobile exit animation trigger ── */
  const triggerMobileExit = () => {
    if (isEntering) return;
    setIsEntering(true);
    setTranslateYValue(window.innerHeight);
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  /* ── Smooth Scroll to Main Site on CTA click ── */
  const handleEnterBtnClick = () => {
    if (isMobile) {
      triggerMobileExit();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  /* ── Track natural viewport scroll to translate curtain & unmount (Desktop only) ── */
  useEffect(() => {
    if (phase !== 'ended' || isMobile) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setTranslateYValue(currentScroll);

      // Once the user has scrolled past 100vh, unmount the splash cleanly
      if (currentScroll >= window.innerHeight && !isEntering) {
        setIsEntering(true);
        onComplete();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase, isEntering, onComplete, isMobile]);

  /* ── Mobile Swipe-Up gesture tracking ── */
  useEffect(() => {
    if (phase !== 'ended' || !isMobile || isEntering) return;

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isEntering) return;
      const touchCurrentY = e.touches[0].clientY;
      const diffY = touchStartY - touchCurrentY;

      // Swipe up threshold of 40px
      if (diffY > 40) {
        triggerMobileExit();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [phase, isMobile, isEntering]);

  return (
    <div
      className={styles.splash}
      style={{
        transform: `translateY(${-translateYValue}px)`,
        transition: isMobile && translateYValue > 0 ? 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        pointerEvents: translateYValue >= window.innerHeight ? 'none' : 'auto'
      }}
    >
      {/* ── Video with scroll parallax ── */}
      <div
        className={styles.videoWrapper}
        style={{
          transform: `translateY(${translateYValue * 0.35}px)`
        }}
      >
        <video
          ref={videoRef}
          className={styles.video}
          src="/hero-video.mp4"
          playsInline
          onEnded={handleEnded}
          style={{ opacity: phase === 'gate' ? 0 : 1, transition: 'opacity 0.8s ease' }}
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div className={styles.overlay} />
      <div className={styles.vignetteBottom} />

      {/* ── GATE: Click to Enter screen (Cyberpunk HUD Redesign) ── */}
      <AnimatePresence>
        {phase === 'gate' && (
          <motion.div
            className={styles.gate}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* ── Technical Grid & Border Brackets (HUD) ── */}
            <div className={styles.hudGrid} />
            <div className={styles.hudCornerTL} />
            <div className={styles.hudCornerTR} />
            <div className={styles.hudCornerBL} />
            <div className={styles.hudCornerBR} />

            {/* ── Top HUD Header ── */}
            <div className={styles.hudHeader}>
              <div className={styles.hudHeaderLeft}>
                <span className={styles.hudBrand}>SS // 2026</span>
                <span className={styles.hudLedRed} />
              </div>
              <div className={styles.hudHeaderCenter}>
                <span>WELCOME TO MY WORLD</span>
                <span className={styles.hudLedPulse} />
              </div>
              <div className={styles.hudHeaderRight}>
                <span>SOUND</span>
                <span className={styles.hudDot}>•</span>
                <span>ON</span>
                {/* Animated Waveform Equalizer */}
                <div className={styles.hudWave}>
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                  <span className={styles.waveBar} />
                </div>
              </div>
            </div>

            {/* ── Left Sidebar (Socials & Progress Indicator) ── */}
            <div className={styles.hudSidebarLeft}>
              <div className={styles.hudIndicator}>
                <span className={styles.hudLine} />
              </div>
            </div>
            {/* ── Main HUD Grid: Two Columns (Left Portrait, Right Text) ── */}
            <div className={styles.hudCenterGrid}>
              {/* Left Column: Portrait with Red Square Offset */}
              <motion.div
                className={styles.portraitCol}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.portraitBackdrop} />
                <div className={styles.portraitFrameContainer}>
                  <img
                    src="/gate.png"
                    alt="Saiyam Shah"
                    className={styles.portraitImageGritty}
                  />
                </div>
              </motion.div>

              {/* Right Column: Title and Details */}
              <motion.div
                className={styles.contentCol}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.textSubtitleArea}>
                  <span className={styles.textSubtitlePart1}>CREATIVE</span>
                  <span className={styles.textSubtitlePart2}>DEVELOPER</span>
                </div>

                <h1 className={styles.textMainTitle}>
                  <span className={styles.textNameLine}>SAIYAM</span>
                  <span className={styles.textNameLine}>SHAH</span>
                </h1>

                <div className={styles.textKeywords}>
                  I <span className={styles.textRed}>DESIGN.</span> I <span className={styles.textRed}>CODE.</span> I <span className={styles.textRed}>BUILD.</span>
                </div>

                <p className={styles.textDesc}>
                  Crafting interactive experiences that blend design, motion and technology.
                </p>

                {/* Outlined Enter Button */}
                <button
                  className={styles.hudEnterBtn}
                  onClick={handleGateClick}
                >
                  <span className={styles.hudEnterBtnBg} />
                  <span className={styles.hudEnterBtnText}>ENTER THE EXPERIENCE</span>
                  <span className={styles.hudEnterBtnArrow}>→</span>
                </button>
              </motion.div>
            </div>

            {/* ── Circular Decorative Technical Ring ── */}
            <div className={styles.hudCircularRing}>
              <span className={styles.hudRingNode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll Down indicator (shown when video ends) ── */}
      <AnimatePresence>
        {phase === 'ended' && (
          <motion.div
            className={styles.scrollCta}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className={styles.enterBtn} onClick={handleEnterBtnClick}>
              <span className={styles.enterText}>Scroll down to enter</span>
              <span className={styles.enterArrow}>
                <span className={styles.arrowLine} />
                <span className={styles.arrowHead} />
              </span>
            </button>
            <div className={styles.scrollPulse}>
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
