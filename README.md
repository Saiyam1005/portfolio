# Saiyam Shah // Creative Developer Portfolio

An immersive, high-end 3D developer portfolio designed to merge technical precision with creative motion design. This application showcases robust front-end architectures, hardware-accelerated graphics, fluid physics-based kinetic scrolling, and responsive brutalist layouts tailored around a custom **periwinkle-blue and deep navy** cyber-HUD aesthetic.

---

## ⚡ Engineering & Design Highlights

### 1. Immersive Cyber-Brutalist HUD Gate
An advanced, sensory entrance screen designed to bypass modern browser autoplay restrictions while delivering a stunning luxury first impression:
* **Interactive Wave Equalizer:** Real-time bouncing waveform equalizer built in custom periwinkle CSS bars animating beside a `SOUND • ON` indicator.
* **Technical HUD Grids & Corners:** Corner coordinate brackets with glowing periwinkle LED indicator nodes, overlapping subtle grid lines, and a giant rotating satellite node orbital ring.
* **Gritty Grayscale Portrait Offset:** A high-contrast gritted portrait card framed against a solid periwinkle brutalist backdrop block that reacts dynamically to hover states.
* **Visualizer Header:** Minimal monospaced data grids including tracking indicators, progress markers (`01 INTRO`), and glowing social nodes.

### 2. Scroll-Driven Parallax Curtain Reveal
A mathematically synchronized scrolling reveal transition that integrates the entry sequence directly into the viewport scrollbar:
* **Unified Viewport Flow:** The entire website content is pushed below the fold by a custom `100vh` DOM spacer while the splash screen is active.
* **Curtain Rise & Video Parallax:** As scrolling is unlocked, the splash screen curtain translates upwards natively (`translateY(-scrollY)`), while the background video translates downwards (`translateY(scrollY * 0.35)`). This relative parallax counter-motion anchors the video in place while the Hero section rolls up over it.
* **Zero-Latency Cleanup:** Once scroll position crosses `100vh`, the splash screen and spacer are unmounted dynamically, scroll is locked back to `0` in a single microtask, and smooth scroll triggers initialize with zero visual jump or layout shift.

### 3. Physics-Based Smooth Scroll & GSAP Integration
* **Lenis Smooth Scroll:** Provides fluid physics-based inertial scrolling that defer-initializes only after splash unmount to eliminate position caches or screen rubber-banding.
* **GSAP ScrollTrigger Recalibration:** Automated `ScrollTrigger.refresh()` loops mapped to unmounting sequences, ensuring all coordinate offsets across the About text, Skills cards, Projects grid, and Experience timelines recalculate accurately post-spacer removal.

### 4. Interactive Components & Premium UX
* **Floating Capsule Navbar:** A modern rounded capsule navbar designed to stay hidden during the splash sequence and reveal on scroll-up / hide on scroll-down with glowing hover transitions.
* **About Split Portrait:** Parallax mouse-tracking grayscale portrait frame featuring rotating monogram visualizer loops.
* **Projects Grid & Detail Modals:** Grids showcasing projects with dedicated details modals, live source control tags, and custom GitHub CTA components.
* **Kinetic Contacts Form:** Highly responsive form inputs with custom glowing periwinkle neon outlines and submission status handling.

---

## 🛠️ Technology Stack

* **Core Library:** React 19 (Functional Components, Custom hooks)
* **Build Engine:** Vite (Hot Module Replacement, lightning-fast compilation)
* **Styling Engine:** Vanilla CSS Modules (scoped properties, global periwinkle design tokens, custom keyframe engines)
* **Graphics:** Three.js (React Three Fiber, Drei particle shaders)
* **Motion & Timelines:** GSAP 3 (ScrollTrigger context pools), Framer Motion (AnimatePresence transitions, dynamic exit interpolations)
* **Physics Scrolling:** Lenis Scroll (Smooth wheel/touch inertia)

---

## 📂 Project Architecture

```
3d/
├── public/                 # Static assets (3D models, profile grayscale images, video loops)
├── src/
│   ├── components/         # Immersive scoped components
│   │   ├── SplashScreen/   # Cyber-HUD gate & parallax scroll-reveal logic
│   │   ├── Navbar/         # Floating capsule header
│   │   ├── Hero/           # Custom particles header
│   │   ├── About/          # Grayscale portrait card & details
│   │   ├── Skills/         # Scoped technical stats
│   │   ├── Projects/       # Showcase details and modular CTAs
│   │   ├── Experience/     # Vertical interactive timeline items
│   │   └── Contact/        # Active form fields
│   ├── App.jsx             # Spacer rendering, scroll-lock hook, Lenis initiator
│   ├── index.css           # Global typography, color variables, scrollbar styling
│   └── main.jsx            # DOM mounting point
├── package.json            # Active dependencies (Three, GSAP, Lenis, Motion)
└── vite.config.js          # Scoped build targets
```

---

## 🚀 Local Development

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone your project repository.
2. Open your terminal in the project root directory (`3d`) and install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Launch the Vite development server locally:
```bash
npm run dev
```
*The local environment will boot up, typically running on `http://localhost:5173/` or `http://localhost:5174/`.*

### Building for Production
To bundle and optimize all JSX files, particle shaders, and scoped CSS modules for production deployment:
```bash
npm run build
```
*This compiles all files and outputs a highly performant, fully static web folder in the `/dist` directory.*

---

## 🌐 Production Deployment

Since the output of `npm run build` is a pure static build folder (`/dist`), this application can be hosted completely free on premier static hosting platforms:

### Vercel (Recommended)
1. Commit and push your code to your GitHub repository.
2. Sign up on [Vercel](https://vercel.com/) using GitHub.
3. Import your project repository. Vercel will automatically detect **Vite** and configure the build command and output path.
4. Click **Deploy**. Any future commits pushed to the `main` branch will automatically trigger automated preview and production rebuilds.
