import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import heroImage from "@assets/SocialLab-Home-Main-Slider-2_1783330194635.png";

const SLIDES = [
  "Hero",
  "Vision",
  "Services",
  "Roadmap",
  "Projects",
  "Industries",
  "Partners",
  "Footer"
];

// --- Utilities & Shared ---
const EASE = [0.22, 1, 0.36, 1];

function AnimatedCount({ to, suffix = "", duration = 2 }: { to: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = to;
      if (start === end) {
        setCount(end);
        return;
      }
      const totalMilSecDur = duration * 1000;
      const incrementTime = (totalMilSecDur / end) * 2;
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start > end) start = end;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- Layout Components ---
function Navbar({ activeIndex, onJump }: { activeIndex: number, onJump: (index: number) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-off-white z-50 flex items-center justify-between px-4 md:px-16 border-b border-primary-teal/10">
      <div className="text-xl md:text-3xl font-semibold tracking-[0.1em] md:tracking-[0.15em] flex items-center">
        <span className="text-primary-teal">SOCIAL</span>
        <span className="text-coral">LAB</span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        {SLIDES.slice(0, 5).map((slide, i) => (
          <div key={slide} className="relative cursor-pointer group">
            <span className={`text-lg tracking-widest transition-colors duration-300 ${activeIndex === i ? 'text-coral font-medium' : 'text-primary-teal group-hover:text-coral'}`}>
              {slide.toUpperCase()}
            </span>
            {activeIndex === i && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-coral" />
            )}
          </div>
        ))}
        <button className="bg-coral text-cream px-6 py-2 rounded-full font-medium tracking-widest hover:bg-opacity-90 transition-all hover:-translate-y-0.5 shadow-sm">
          CONTACT
        </button>
      </div>

      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
        className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
      >
        <span className={`block w-6 h-[2px] bg-primary-teal transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
        <span className={`block w-6 h-[2px] bg-primary-teal transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`block w-6 h-[2px] bg-primary-teal transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
      </button>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="md:hidden absolute top-16 left-0 right-0 bg-off-white border-b border-primary-teal/10 shadow-sm flex flex-col px-4 py-4 gap-1"
        >
          {SLIDES.slice(0, 5).map((slide, i) => (
            <button
              key={slide}
              onClick={() => { onJump(i); setMenuOpen(false); }}
              className={`text-left text-base tracking-widest py-3 border-b border-primary-teal/5 transition-colors ${activeIndex === i ? 'text-coral font-medium' : 'text-primary-teal'}`}
            >
              {slide.toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => { onJump(SLIDES.length - 1); setMenuOpen(false); }}
            className="mt-3 bg-coral text-cream px-6 py-3 rounded-full font-medium tracking-widest text-center"
          >
            CONTACT
          </button>
        </motion.div>
      )}
    </nav>
  );
}

function ProgressRail({ activeIndex, onJump }: { activeIndex: number, onJump: (index: number) => void }) {
  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center space-y-4">
      {SLIDES.map((slide, i) => (
        <button
          key={slide}
          onClick={() => onJump(i)}
          className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
        >
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-orange-red scale-150' : 'bg-primary-teal/30 group-hover:bg-primary-teal'}`} />
          <span className="absolute right-full mr-4 text-sm font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary-teal">
            {slide}
          </span>
        </button>
      ))}
    </div>
  );
}

// --- Slides ---

function HeroSlide() {
  return (
    <div className="h-full w-full bg-sand flex flex-col md:flex-row items-center justify-center px-6 md:px-24 md:gap-8 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="w-full md:w-1/2 lg:w-[40%] md:min-w-0 md:shrink-0 text-left z-10 pt-20 md:pt-0"
      >
        <p className="font-mono text-primary-teal mb-3 md:mb-4 tracking-widest uppercase text-xs md:text-sm">INNOVATION FACTORY & ACADEMY</p>
        <h1 className="text-4xl md:text-8xl font-medium text-primary-teal leading-[1.15] md:leading-[1.1] tracking-[0.06em] md:tracking-[0.12em] mb-4 md:mb-6">
          HUMAN-CENTERED<br/><span className="text-coral">AI RESEARCH</span>
        </h1>
        <p className="text-base md:text-2xl text-muted-teal max-w-lg mb-6 md:mb-10 leading-relaxed font-sans">
          Applying machine learning and data science to health, education, environment, and culture.
        </p>
        <div className="flex flex-wrap items-center gap-3 md:gap-6">
          <button className="bg-primary-teal text-cream px-6 md:px-8 py-3 rounded-full text-sm md:text-lg tracking-widest hover:bg-opacity-90 transition-transform hover:-translate-y-1">
            OUR VISION
          </button>
          <button className="bg-transparent border border-primary-teal/30 text-primary-teal px-6 md:px-8 py-3 rounded-full text-sm md:text-lg tracking-widest hover:border-primary-teal transition-all hover:-translate-y-1 bg-white/10 backdrop-blur-sm">
            EXPLORE PROJECTS
          </button>
        </div>
      </motion.div>
      <div className="w-full md:w-1/2 lg:w-[60%] h-full flex items-center justify-center lg:justify-end relative mt-6 md:mt-0">
        <motion.img
          src={heroImage}
          alt="SocialLab AI research illustration"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          animate={{ y: [0, -12, 0] }}
          className="w-full max-w-[280px] md:max-w-xs lg:max-w-2xl h-auto object-contain"
          style={{ transitionProperty: "opacity, transform" }}
        />
      </div>
    </div>
  );
}

function VisionSlide() {
  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-24 py-16 md:py-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="text-3xl md:text-6xl font-medium text-primary-teal mb-4 md:mb-6 tracking-[0.06em] md:tracking-[0.12em] leading-tight">
            SOCIAL <span className="text-coral">IMPACT</span><br/>AT SCALE
          </h2>
          <p className="text-base md:text-xl text-muted-teal leading-relaxed mb-6 md:mb-8">
            We bridge the gap between academic research and practical application, building AI systems that solve real-world problems. Our interdisciplinary approach ensures that technology serves humanity, not the other way around.
          </p>
          <button className="text-coral font-medium tracking-widest hover:text-orange-red transition-colors flex items-center gap-2 text-sm md:text-base">
            LEARN MORE ABOUT OUR MISSION
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
        <motion.div 
          className="bg-dark-teal p-6 md:p-12 rounded-[16px] md:rounded-[20px] text-cream grid grid-cols-2 gap-y-6 gap-x-5 md:gap-y-12 md:gap-x-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Decorative background in stats card */}
          <svg className="absolute right-0 bottom-0 w-64 h-64 opacity-10 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#F5F1E8" strokeWidth="2" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#F5F1E8" strokeWidth="2" />
          </svg>

          <div>
            <div className="text-3xl md:text-6xl font-semibold text-coral mb-1 md:mb-2 tracking-wider"><AnimatedCount to={50} suffix="+" /></div>
            <div className="font-mono text-[10px] md:text-sm tracking-wider opacity-80 uppercase">Active Projects</div>
          </div>
          <div>
            <div className="text-3xl md:text-6xl font-semibold text-coral mb-1 md:mb-2 tracking-wider"><AnimatedCount to={12} /></div>
            <div className="font-mono text-[10px] md:text-sm tracking-wider opacity-80 uppercase">Global Partners</div>
          </div>
          <div>
            <div className="text-3xl md:text-6xl font-semibold text-coral mb-1 md:mb-2 tracking-wider"><AnimatedCount to={5} suffix="M+" /></div>
            <div className="font-mono text-[10px] md:text-sm tracking-wider opacity-80 uppercase">Lives Reached</div>
          </div>
          <div>
            <div className="text-3xl md:text-6xl font-semibold text-coral mb-1 md:mb-2 tracking-wider"><AnimatedCount to={3} suffix="0+" /></div>
            <div className="font-mono text-[10px] md:text-sm tracking-wider opacity-80 uppercase">Researchers</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ServicesSlide() {
  const services = [
    { title: "AI RESEARCH", desc: "Fundamental and applied research in machine learning and data science.", iconPath: "M20,32 L44,32 M32,20 L32,44", cx: 32, cy: 32 },
    { title: "DATA STRATEGY", desc: "Helping organizations build robust, ethical data infrastructures.", iconPath: "M20,44 L32,20 L44,44", cx: 32, cy: 28 },
    { title: "PROTOTYPING", desc: "Rapid development of AI-powered applications and tools.", iconPath: "M20,20 L44,44 M20,44 L44,20", cx: 32, cy: 32 },
    { title: "CAPACITY BUILDING", desc: "Training and workshops to empower teams with AI literacy.", iconPath: "M20,44 C20,32 44,32 44,20", cx: 32, cy: 32 }
  ];

  return (
    <div className="h-full w-full bg-peach/10 flex flex-col justify-center px-6 md:px-24 py-16 md:py-0">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-3 md:mb-4">
          CORE <span className="text-coral">CAPABILITIES</span>
        </h2>
        <p className="text-base md:text-lg text-muted-teal max-w-2xl">A full-stack approach from theoretical research to deployed software.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            className="bg-off-white p-5 md:p-8 rounded-[14px] md:rounded-[16px] border border-primary-teal/10 hover:shadow-sm transition-shadow group relative overflow-hidden"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 relative">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <circle cx={s.cx} cy={s.cy} r="24" fill="#F4A261" opacity="0.2" className="group-hover:scale-110 transition-transform duration-500 origin-center" />
                <motion.path d={s.iconPath} stroke="#00635F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.2 }} />
                <circle cx="44" cy="20" r="3" fill="#D6766B" />
                <circle cx="20" cy="44" r="3" fill="#E94B2E" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-primary-teal tracking-wider mb-2 md:mb-3">{s.title}</h3>
            <p className="text-muted-teal leading-relaxed text-sm md:text-base">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RoadmapSlide() {
  const steps = [
    { name: "DISCOVERY", desc: "Identify social challenges where data & AI can move the needle." },
    { name: "IDEATION", desc: "Formulate research hypotheses and design human-centered solutions." },
    { name: "DEVELOPMENT", desc: "Build, train, and validate robust models with ethical guardrails." },
    { name: "DEPLOYMENT", desc: "Integrate solutions with partners to achieve real-world impact." }
  ];

  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-24 py-16 md:py-0 overflow-hidden relative">
      <svg className="absolute right-0 top-0 w-[50vh] h-[50vh] opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#00635F" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#00635F" strokeWidth="0.5" />
      </svg>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10 md:mb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-3 md:mb-4">
          INNOVATION <span className="text-coral">ROADMAP</span>
        </h2>
        <p className="text-muted-teal text-base md:text-lg">Our structured four-step approach to applied AI research.</p>
      </motion.div>

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-6xl mx-auto gap-8 md:gap-4">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute left-8 right-8 top-8 h-[1px] bg-primary-teal/20 z-0">
          <motion.div 
            className="h-full bg-coral origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
          />
        </div>

        {/* Connecting Line (Mobile) */}
        <div className="md:hidden absolute left-6 top-6 bottom-6 w-[1px] bg-primary-teal/20 z-0">
          <motion.div 
            className="w-full bg-coral origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
          />
        </div>

        {steps.map((step, i) => (
          <motion.div 
            key={i}
            className="relative z-10 flex flex-row md:flex-col items-start md:items-center bg-transparent group w-full md:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary-teal/30 bg-off-white flex items-center justify-center mb-0 md:mb-6 shrink-0 relative overflow-hidden group-hover:border-coral transition-colors">
              <motion.div className="absolute inset-0 bg-peach/10" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }} />
              <span className="text-coral font-mono text-base md:text-xl relative z-10">0{i+1}</span>
            </div>
            <div className="ml-4 md:ml-0 md:text-center">
              <h3 className="font-semibold text-primary-teal tracking-widest mb-1 md:mb-2 text-base md:text-lg">{step.name}</h3>
              <p className="text-muted-teal text-sm leading-relaxed max-w-[240px] md:max-w-[200px] mx-auto">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSlide() {
  const projects = [
    { name: "EduConnect", tag: "EDUCATION", imgFill: "#005B57", desc: "AI-driven personalized learning paths for rural schools." },
    { name: "HealthGraph", tag: "HEALTHCARE", imgFill: "#D6766B", desc: "Predictive analytics for early outbreak detection." },
    { name: "EcoMonitor", tag: "ENVIRONMENT", imgFill: "#F4A261", desc: "Satellite imagery analysis for deforestation tracking." }
  ];

  return (
    <div className="h-full w-full bg-sand flex flex-col justify-center px-6 md:px-24 py-16 md:py-0">
       <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-3 md:mb-4">
          FEATURED <span className="text-coral">PROJECTS</span>
        </h2>
        <p className="text-muted-teal text-base md:text-lg">Applied research currently in deployment.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-10">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
            className="group cursor-pointer flex flex-col"
          >
            <div className="w-full aspect-[4/3] rounded-[14px] md:rounded-[16px] mb-4 md:mb-6 overflow-hidden relative bg-off-white border border-primary-teal/10 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 shadow-sm">
              <svg viewBox="0 0 200 150" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity">
                 {/* Abstract project representation */}
                 <rect x="0" y="0" width="200" height="150" fill={p.imgFill} opacity="0.05" />
                 <motion.circle cx="100" cy="75" r="40" fill="none" stroke={p.imgFill} strokeWidth="1" strokeDasharray="2 4"
                  animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                 <circle cx="100" cy="75" r="25" fill={p.imgFill} opacity="0.8" />
                 <path d="M 60 75 L 140 75 M 100 35 L 100 115" stroke="#F7F7F5" strokeWidth="0.5" opacity="0.5" />
                 <circle cx="120" cy="60" r="4" fill="#E94B2E" />
                 <circle cx="80" cy="90" r="3" fill="#F4A261" />
              </svg>
            </div>
            <div className="font-mono text-xs text-orange-red mb-2 md:mb-3 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-red"></span>
              {p.tag}
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-primary-teal tracking-wider group-hover:text-coral transition-colors mb-2 md:mb-3">{p.name}</h3>
            <p className="text-muted-teal leading-relaxed text-sm">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IndustriesSlide() {
  const industries = [
    { name: "Public Health", path: "M10 20 L50 20 L50 60 L10 60 Z M30 10 L30 30 M20 20 L40 20" },
    { name: "Education", path: "M10 50 L30 20 L50 50 Z M20 50 L20 60 L40 60 L40 50" },
    { name: "Environment", path: "M30 60 C30 40 10 40 10 20 C30 20 30 40 50 40 C50 60 30 60 30 60 Z" },
    { name: "Digital Media", path: "M10 30 L50 30 M10 40 L50 40 M20 20 L40 20 M20 50 L40 50" },
    { name: "Civic Tech", path: "M30 10 A20 20 0 1 1 29.9 10 Z M30 30 L30 50 M20 40 L40 40" },
    { name: "Financial Incl.", path: "M20 60 L20 20 L40 20 M20 40 L35 40 M20 20 C40 10 50 30 40 40" }
  ];

  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-24 py-16 md:py-0">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-3 md:mb-4">
          KEY <span className="text-coral">INDUSTRIES</span>
        </h2>
        <p className="text-base md:text-lg text-muted-teal max-w-2xl">Cross-sector innovation for systemic challenges.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 md:gap-y-12 max-w-5xl">
        {industries.map((ind, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full border border-primary-teal/20 flex items-center justify-center shrink-0 relative overflow-hidden bg-sand/30 group-hover:border-coral transition-colors">
              <svg viewBox="0 0 60 80" className="w-6 h-6">
                <motion.path d={ind.path} fill="none" stroke="#00635F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-coral transition-colors"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: i*0.1 }} />
              </svg>
            </div>
            <span className="font-semibold text-primary-teal tracking-wider text-sm md:text-lg group-hover:text-coral transition-colors">{ind.name.toUpperCase()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PartnersSlide() {
  const logos = [
    "ACADEMIC PARTNER", "NGO FOUNDATION", "TECH INSTITUTE", "GLOBAL FUND", "DATA CONSORTIUM", "RESEARCH LAB"
  ];

  return (
    <div className="h-full w-full bg-peach/10 flex flex-col justify-center px-6 md:px-24 py-16 md:py-0">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 md:mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-3 md:mb-4">
          GLOBAL <span className="text-coral">PARTNERS</span>
        </h2>
        <p className="text-base md:text-lg text-muted-teal">Collaborating with leading institutions worldwide.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 max-w-5xl mx-auto w-full">
        {logos.map((logo, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="h-16 md:h-32 bg-off-white border border-primary-teal/10 rounded-xl flex items-center justify-center px-6 text-center grayscale hover:grayscale-0 hover:border-coral/30 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span className="font-mono text-xs md:text-sm tracking-widest text-primary-teal font-semibold opacity-70">{logo}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FooterSlide() {
  return (
    <div className="h-full w-full bg-dark-teal flex flex-col justify-center px-6 md:px-24 text-cream relative overflow-hidden">
      <svg className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 100 L 100 0" stroke="#F5F1E8" strokeWidth="0.5" />
        <path d="M 0 50 L 50 0" stroke="#F5F1E8" strokeWidth="0.5" />
        <path d="M 50 100 L 100 50" stroke="#F5F1E8" strokeWidth="0.5" />
      </svg>

      <div className="max-w-4xl z-10 pt-20 md:pt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-medium mb-5 md:mb-8 tracking-[0.06em] md:tracking-[0.12em] leading-tight"
        >
          READY TO <span className="text-coral">INNOVATE?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base md:text-xl text-sand/80 max-w-2xl mb-8 md:mb-12 font-sans"
        >
          Partner with us to build intelligent systems that drive meaningful social impact. Whether you're an NGO, academic institution, or civic organization, we're ready to collaborate.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-coral text-cream px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg tracking-widest hover:bg-orange-red transition-all hover:-translate-y-1 shadow-lg shadow-coral/20"
        >
          START A CONVERSATION
        </motion.button>
      </div>

      <div className="mt-auto pt-10 md:pt-16 border-t border-sand/20 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-mono tracking-widest opacity-60 z-10 pb-10 md:pb-12">
        <div className="mb-4 md:mb-0 text-center md:text-left">© 2026 SOCIALLAB STUDIO. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6 md:gap-8">
          <a href="#" className="hover:text-coral transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-coral transition-colors">TWITTER</a>
          <a href="#" className="hover:text-coral transition-colors">GITHUB</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout: number;

    const handleScroll = () => {
      // Debounce scroll handling slightly for performance
      if (timeout) cancelAnimationFrame(timeout);
      
      timeout = requestAnimationFrame(() => {
        const height = window.innerHeight; // Use window height for more reliable snap points
        // calculate index based on scroll position
        const index = Math.round(container.scrollTop / height);
        setActiveIndex(Math.min(Math.max(index, 0), SLIDES.length - 1));
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timeout) cancelAnimationFrame(timeout);
    };
  }, []);

  const jumpToSlide = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-off-white font-sans text-primary-teal">
      <Navbar activeIndex={activeIndex} onJump={jumpToSlide} />
      <ProgressRail activeIndex={activeIndex} onJump={jumpToSlide} />
      
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto md:snap-y md:snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Hide scrollbar for Chrome/Safari/Webkit */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><HeroSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><VisionSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><ServicesSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><RoadmapSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><ProjectsSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><IndustriesSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><PartnersSlide /></section>
        <section className="md:snap-start w-full min-h-[100svh] md:h-[100svh] md:shrink-0"><FooterSlide /></section>
      </div>
    </div>
  );
}
