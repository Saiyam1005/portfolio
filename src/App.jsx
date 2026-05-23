import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SplashScreen from './components/SplashScreen/SplashScreen.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Skills from './components/Skills/Skills.jsx'
import Projects from './components/Projects/Projects.jsx'
import Experience from './components/Experience/Experience.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const cursorRef = useRef(null)
  const cursorPos = useRef({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const [splashDone, setSplashDone] = useState(() => {
    return sessionStorage.getItem('splashPlayed') === 'true'
  })

  // Whether scrolling is allowed (starts true if splash already played)
  const [scrollUnlocked, setScrollUnlocked] = useState(() => {
    return sessionStorage.getItem('splashPlayed') === 'true'
  })

  // Ensure scroll is reset to top on page load and manual scroll restoration is active
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashPlayed', 'true')
    window.scrollTo(0, 0)
    setSplashDone(true)
    setScrollUnlocked(true)
    // unlock scroll
    document.body.style.overflow = ''
    
    // Snaps coordinate to 0 in next tick and refreshes GSAP ScrollTriggers
    setTimeout(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.refresh()
    }, 100)
  }

  /* ── Lock scroll during splash ──────────────────────── */
  useEffect(() => {
    if (!scrollUnlocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [scrollUnlocked])

  /* ── Lenis Smooth Scroll ─────────────────────────────── */
  useEffect(() => {
    if (!splashDone) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [splashDone])

  /* ── Custom Cursor ───────────────────────────────────── */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onMouseMove = (e) => {
      cursorPos.current = { x: e.clientX, y: e.clientY }
      gsap.to(cursor, {
        x: e.clientX - 9,
        y: e.clientY - 9,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    const onMouseEnter = () => cursor.classList.add('hovering')
    const onMouseLeave = () => cursor.classList.remove('hovering')

    window.addEventListener('mousemove', onMouseMove)

    const interactiveElements = document.querySelectorAll('a, button, [data-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [isLoaded, splashDone])

  /* ── Loading Sequence ────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Splash screen — shown once per session */}
      {!splashDone && (
        <SplashScreen 
          onComplete={handleSplashComplete} 
          onUnlockScroll={() => setScrollUnlocked(true)} 
        />
      )}

      {/* Spacer pushing the website content down by 100vh during the scroll reveal */}
      {!splashDone && (
        <div style={{ height: '100vh', width: '100%', background: 'var(--bg-dark)' }} />
      )}

      {/* Main site — rendered under splash, revealed after */}
      <div className="custom-cursor" ref={cursorRef} />
      <div className="grain-overlay" />
      <Navbar splashDone={splashDone} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
