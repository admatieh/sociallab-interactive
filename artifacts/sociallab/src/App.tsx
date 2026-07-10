import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import heroImage from "@assets/SocialLab-Home-Main-Slider-2_1783330194635.png";

// Platform screenshots
import nafHero from "@/assets/projects/national-ai-framework.png";
import nafOverview from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/National_AI_Framework/screenshots/overview.png";
import nafFeatures from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/National_AI_Framework/screenshots/features.png";


import portHero from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/SocialLab_Portfolio/screenshots/hero.png";
import portOverview from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/SocialLab_Portfolio/screenshots/overview.png";

import acadHero from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/SocialLab_Academy/screenshots/hero.png";
import acadOverview from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/SocialLab_Academy/screenshots/overview.png";

import evtHero from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/SocialLab_Events/screenshots/hero.png";
import evtOverview from "@assets/Presentation_Evidence_Pack/Platforms_and_Frameworks/SocialLab_Events/screenshots/overview.png";

// Project screenshots
import dfcHero from "@/assets/projects/data-for-crisis.png";
import dfcPreview from "@assets/Presentation_Evidence_Pack/Projects_and_Initiatives/Data_for_Crisis/screenshots/project_preview.png";

import ddHero from "@/assets/projects/disinformation-demasked.png";
import ddPreview from "@assets/Presentation_Evidence_Pack/Projects_and_Initiatives/Disinformation_Demasked/screenshots/project_preview.png";

import elHero from "@/assets/projects/elections-monitoring.png";
import elPreview from "@assets/Presentation_Evidence_Pack/Projects_and_Initiatives/Elections_Monitoring_Open_Data/screenshots/project_preview.png";

import covidHero from "@/assets/projects/covid-intelligent.png";
import covidPreview from "@assets/Presentation_Evidence_Pack/Projects_and_Initiatives/COVID_Intelligent_Project/screenshots/project_preview.png";

import codeHerHero from "@/assets/projects/code-her.png";
import codeHerPreview from "@assets/Presentation_Evidence_Pack/Projects_and_Initiatives/Code_Her/screenshots/project_preview.png";

import itlHero from "@/assets/projects/intelligent-trash-locator.png";
import itlPreview from "@assets/Presentation_Evidence_Pack/Projects_and_Initiatives/Intelligent_Trash_Locator/screenshots/project_preview.png";

import {
  hero,
  whatWeDo,
  whoWeAre,
  mission,
  capabilities,
  roadmap,
  nationalAIFramework,
  ecosystemSlide,
  projects,
  closing,
  SLIDE_LABELS,
} from "./data/slides";

// --- Utilities ---
const EASE = [0.22, 1, 0.36, 1] as const;

// --- Layout Components ---
function Navbar({ activeIndex, onJump }: { activeIndex: number; onJump: (index: number) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-off-white z-50 flex items-center justify-between px-4 md:px-16 border-b border-primary-teal/10">
      <div className="flex items-center">
        <img 
          src="/sociallab-interactive/assets/SocialLab-Logo-Expanded.png" 
          alt="SocialLab" 
          className="w-[120px] md:w-[160px] h-auto object-contain"
        />
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {SLIDE_LABELS.slice(0, 7).map((slide, i) => (
          <div key={slide} className="relative cursor-pointer group" onClick={() => onJump(i)}>
            <span
              className={`text-sm tracking-widest transition-colors duration-300 ${
                activeIndex === i ? "text-coral font-medium" : "text-primary-teal group-hover:text-coral"
              }`}
            >
              {slide.toUpperCase()}
            </span>
            {activeIndex === i && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-coral" />
            )}
          </div>
        ))}
        <button
          onClick={() => onJump(SLIDE_LABELS.length - 1)}
          className="bg-coral text-cream px-5 py-2 rounded-full font-medium tracking-widest text-sm hover:bg-opacity-90 transition-all hover:-translate-y-0.5 shadow-sm"
        >
          CONTACT
        </button>
      </div>

      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
        className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
      >
        <span className={`block w-6 h-[2px] bg-primary-teal transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
        <span className={`block w-6 h-[2px] bg-primary-teal transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`block w-6 h-[2px] bg-primary-teal transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
      </button>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="md:hidden absolute top-16 left-0 right-0 bg-off-white border-b border-primary-teal/10 shadow-sm flex flex-col px-4 py-4 gap-1"
        >
          {SLIDE_LABELS.slice(0, -1).map((slide, i) => (
            <button
              key={slide}
              onClick={() => { onJump(i); setMenuOpen(false); }}
              className={`text-left text-sm tracking-widest py-3 border-b border-primary-teal/5 transition-colors ${
                activeIndex === i ? "text-coral font-medium" : "text-primary-teal"
              }`}
            >
              {slide.toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => { onJump(SLIDE_LABELS.length - 1); setMenuOpen(false); }}
            className="mt-3 bg-coral text-cream px-6 py-3 rounded-full font-medium tracking-widest text-center text-sm"
          >
            CONTACT
          </button>
        </motion.div>
      )}
    </nav>
  );
}

function ProgressRail({ activeIndex, onJump }: { activeIndex: number; onJump: (index: number) => void }) {
  return (
    <div className="hidden md:flex fixed left-1/2 bottom-6 -translate-x-1/2 z-50 flex-row items-center space-x-3">
      {SLIDE_LABELS.map((slide, i) => (
        <button
          key={slide}
          onClick={() => onJump(i)}
          className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
        >
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? "bg-orange-red scale-150" : "bg-primary-teal/30 group-hover:bg-primary-teal"
            }`}
          />
          <span className="absolute bottom-full mb-2 text-xs font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary-teal">
            {slide}
          </span>
        </button>
      ))}
    </div>
  );
}

// --- Shared UI atoms ---
function ScreenshotCard({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-primary-teal/10 shadow-md bg-white ${className}`}>
      <div className="w-full h-2 bg-primary-teal/10 flex items-center gap-1 px-2">
        <span className="w-1.5 h-1.5 rounded-full bg-coral/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-peach/80" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary-teal/30" />
      </div>
      <img src={src} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
    </div>
  );
}

// ================================================================
// SLIDES
// ================================================================

// Slide 1 — Hero / Opening (no CTA buttons — presentation style)
function HeroSlide() {
  return (
    <div className="h-full w-full bg-sand flex flex-col md:flex-row items-center justify-center px-6 md:px-24 md:gap-8 relative overflow-hidden pt-16 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="w-full md:w-1/2 lg:w-[40%] md:min-w-0 md:shrink-0 text-left z-10"
      >
        <p className="font-mono text-primary-teal mb-4 md:mb-6 tracking-widest uppercase text-xs md:text-sm">
          {hero.label}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-primary-teal leading-[1.1] tracking-[0.06em] md:tracking-[0.10em] mb-5 md:mb-8">
          {hero.titleLine1}
          <br />
          <span className="text-coral">{hero.titleLine2}</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-teal max-w-lg leading-relaxed font-sans">
          {hero.body}
        </p>
      </motion.div>
      <div className="w-full md:w-1/2 lg:w-[60%] h-full flex items-center justify-center lg:justify-end relative mt-8 md:mt-0">
        <motion.img
          src={heroImage}
          alt="SocialLab AI research illustration"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          animate={{ y: [0, -12, 0] }}
          className="w-full max-w-[300px] md:max-w-sm lg:max-w-2xl h-auto object-contain"
          style={{ transitionProperty: "opacity, transform" }}
        />
      </div>
    </div>
  );
}

// Slide 2 — What SocialLab Does
function WhatWeDoSlide() {
  const d = whatWeDo;
  return (
    <div className="h-full w-full bg-sand flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-24 pb-8 md:pb-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-2 md:mb-3">
          {d.title} <span className="text-coral">{d.titleAccent}</span>
        </h2>
        <p className="text-base md:text-lg text-muted-teal max-w-3xl">{d.body}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {d.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="bg-off-white p-4 md:p-6 lg:p-7 rounded-[14px] md:rounded-[16px] border border-primary-teal/10 hover:shadow-sm transition-shadow group relative overflow-hidden"
          >
            <div className="text-coral font-mono text-xl mb-3">0{i+1}</div>
            <h3 className="text-sm md:text-base font-semibold text-primary-teal tracking-wider mb-1 md:mb-2 leading-snug">{item.title}</h3>
            <p className="text-muted-teal leading-relaxed text-xs md:text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Slide 3 — Who SocialLab Is
function WhoWeAreSlide() {
  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-24 pb-8 md:pb-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary-teal mb-4 md:mb-6 tracking-[0.06em] md:tracking-[0.1em] leading-tight">
            {whoWeAre.title}
            <br />
            <span className="text-coral">{whoWeAre.titleAccent}</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-teal leading-relaxed">{whoWeAre.body}</p>
        </motion.div>

        <motion.div
          className="bg-dark-teal p-7 md:p-10 lg:p-12 rounded-[16px] md:rounded-[20px] text-cream grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <svg className="absolute right-0 bottom-0 w-64 h-64 opacity-10 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#F5F1E8" strokeWidth="2" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#F5F1E8" strokeWidth="2" />
          </svg>
          {whoWeAre.pillars.map((pillar, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }} className="relative z-10">
              <div className="text-coral font-semibold text-base md:text-lg tracking-wider mb-2 uppercase">{pillar.label}</div>
              <div className="text-xs md:text-sm tracking-wide opacity-75 leading-relaxed">{pillar.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Slide 3 — Mission & Vision
function MissionSlide() {
  return (
    <div className="h-full w-full bg-peach/10 flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-24 pb-8 md:pb-0">
      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary-teal mb-4 md:mb-6 tracking-[0.06em] md:tracking-[0.12em] leading-tight">
            {mission.title}
            <br />
            <span className="text-coral">{mission.titleAccent}</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-teal leading-relaxed">{mission.body}</p>
        </motion.div>

        <motion.div
          className="bg-dark-teal p-7 md:p-10 lg:p-12 rounded-[16px] md:rounded-[20px] text-cream relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <svg className="absolute right-0 bottom-0 w-48 h-48 opacity-10 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#F5F1E8" strokeWidth="2" />
          </svg>
          <ul className="relative z-10 space-y-5 md:space-y-6">
            {mission.bullets.map((bullet, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-coral shrink-0" />
                <span className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90">{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// Slide 4 — Capabilities / Services
function CapabilitiesSlide() {
  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-24 pb-8 md:pb-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-2 md:mb-3">
          {capabilities.title} <span className="text-coral">{capabilities.titleAccent}</span>
        </h2>
        <p className="text-base md:text-lg text-muted-teal max-w-2xl">{capabilities.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {capabilities.items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className="bg-off-white p-4 md:p-6 lg:p-7 rounded-[14px] md:rounded-[16px] border border-primary-teal/10 hover:shadow-sm transition-shadow group relative overflow-hidden"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 relative">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <circle cx={s.cx} cy={s.cy} r="24" fill="#F4A261" opacity="0.2" className="group-hover:scale-110 transition-transform duration-500 origin-center" />
                <motion.path d={s.iconPath} stroke="#00635F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.15 }} />
                <circle cx="44" cy="20" r="3" fill="#D6766B" />
                <circle cx="20" cy="44" r="3" fill="#E94B2E" />
              </svg>
            </div>
            <h3 className="text-sm md:text-base font-semibold text-primary-teal tracking-wider mb-1 md:mb-2 leading-snug">{s.title}</h3>
            <p className="text-muted-teal leading-relaxed text-xs md:text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Slide 5 — How SocialLab Works
function RoadmapSlide() {
  return (
    <div className="h-full w-full bg-sand flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-24 pb-8 md:pb-0 overflow-hidden relative">
      <svg className="absolute right-0 top-0 w-[50vh] h-[50vh] opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#00635F" strokeWidth="0.5" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#00635F" strokeWidth="0.5" />
      </svg>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10 md:mb-20 text-center">
        <h2 className="text-3xl md:text-5xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-3 md:mb-4">
          {roadmap.title} <span className="text-coral">{roadmap.titleAccent}</span>
        </h2>
        <p className="text-muted-teal text-base md:text-lg">{roadmap.subtitle}</p>
      </motion.div>

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-6xl mx-auto gap-8 md:gap-4">
        <div className="hidden md:block absolute left-8 right-8 top-8 h-[1px] bg-primary-teal/20 z-0">
          <motion.div className="h-full bg-coral origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.5, ease: EASE }} />
        </div>
        <div className="md:hidden absolute left-6 top-6 bottom-6 w-[1px] bg-primary-teal/20 z-0">
          <motion.div className="w-full bg-coral origin-top" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 1.5, ease: EASE }} />
        </div>

        {roadmap.steps.map((step, i) => (
          <motion.div key={i} className="relative z-10 flex flex-row md:flex-col items-start md:items-center bg-transparent group w-full md:w-1/4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }}>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary-teal/30 bg-off-white flex items-center justify-center mb-0 md:mb-6 shrink-0 relative overflow-hidden group-hover:border-coral transition-colors">
              <motion.div className="absolute inset-0 bg-peach/10" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }} />
              <span className="text-coral font-mono text-base md:text-xl relative z-10">0{i + 1}</span>
            </div>
            <div className="ml-4 md:ml-0 md:text-center">
              <h3 className="font-semibold text-primary-teal tracking-wider mb-1 md:mb-2 text-sm md:text-base leading-snug">{step.name}</h3>
              <p className="text-muted-teal text-xs md:text-sm leading-relaxed max-w-[240px] md:max-w-[180px] mx-auto">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Slide 6 — National AI Framework
function NationalAIFrameworkSlide() {
  const d = nationalAIFramework;
  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 md:pt-24 pb-8 md:pb-0 overflow-hidden">
      <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-10 items-center w-full max-w-7xl mx-auto">
        {/* LEFT: text content */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <div className="font-mono text-xs tracking-widest text-orange-red mb-3 flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-red" />
            {d.tag}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary-teal mb-4 md:mb-5 tracking-[0.06em] md:tracking-[0.1em] leading-tight">
            {d.title}
            <br />
            <span className="text-coral">{d.titleAccent}</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-teal leading-relaxed mb-5 md:mb-6">{d.body}</p>

          <div className="mb-4 md:mb-5">
            <div className="font-mono text-[10px] tracking-widest text-primary-teal/60 mb-2 uppercase">{d.servesLabel}</div>
            <div className="flex flex-wrap gap-2">
              {d.serves.map((s, i) => (
                <span key={i} className="text-xs border border-primary-teal/20 text-primary-teal px-3 py-1 rounded-full tracking-wider">{s}</span>
              ))}
            </div>
          </div>

          <ul className="space-y-3 mb-5">
            {d.bullets.map((b, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                <span className="text-sm md:text-base text-muted-teal leading-relaxed">{b}</span>
              </motion.li>
            ))}
          </ul>

          <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-coral/70 text-xs font-mono tracking-widest hover:text-coral transition-colors uppercase">
            View project
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </motion.div>

        {/* RIGHT: larger screenshot stack */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative flex flex-col gap-3 md:gap-4"
        >
          <ScreenshotCard src={nafHero} alt="National AI Framework hero" className="w-full aspect-[16/8]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <ScreenshotCard src={nafOverview} alt="National AI Framework overview" className="aspect-[4/3]" />
            <ScreenshotCard src={nafFeatures} alt="National AI Framework features" className="aspect-[4/3]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Slide 8 — SocialLab Ecosystem (Portfolio / Academy / Events)
function EcosystemSlide() {
  const d = ecosystemSlide;
  const imgMap = [
    [portHero, portOverview],
    [acadHero, acadOverview],
    [evtHero, evtOverview],
  ];
  const accentColors = ["#F4A261", "#D6766B", "#00635F"];

  return (
    <div className="h-full w-full bg-off-white flex flex-col justify-center px-6 md:px-24 pt-20 md:pt-24 pb-8 md:pb-2">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-5 md:mb-7">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.12em] mb-2">
          {d.title} <span className="text-coral">{d.titleAccent}</span>
        </h2>
        <p className="text-base md:text-lg text-muted-teal max-w-2xl">{d.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {d.cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            className="bg-off-white border border-primary-teal/10 rounded-[16px] overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Screenshot preview — made taller */}
            <div className="relative overflow-hidden" style={{ background: `${accentColors[i]}08` }}>
              <ScreenshotCard src={imgMap[i][0]} alt={`${card.title} screenshot`} className="w-full aspect-[16/10] rounded-none border-0 shadow-none" />
              <div className="absolute bottom-2 right-2 w-20 md:w-24 border border-white/60 shadow-md rounded overflow-hidden">
                <img src={imgMap[i][1]} alt={`${card.title} overview`} className="w-full object-cover" />
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="font-mono text-[10px] tracking-widest mb-2 flex items-center gap-2" style={{ color: accentColors[i] }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: accentColors[i] }} />
                {card.label.toUpperCase()}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-primary-teal tracking-wider mb-2 group-hover:text-coral transition-colors">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-teal leading-relaxed mb-3">{card.desc}</p>
              <div className="flex items-start gap-2 mb-3">
                <span className="mt-1 w-1 h-1 rounded-full bg-coral shrink-0" />
                <span className="text-xs md:text-sm text-muted-teal/80 leading-relaxed">{card.bullet}</span>
              </div>
              <a href={`https://${card.url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] text-coral/60 tracking-wider hover:text-coral transition-colors font-mono">
                {card.url}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Slide 9 — Projects Across Public-Interest Domains
function ProjectsSlide() {
  const d = projects;

  const heroImgs = [dfcHero, ddHero, elHero, covidHero, codeHerHero, itlHero];
  const previewImgs = [dfcPreview, ddPreview, elPreview, covidPreview, codeHerPreview, itlPreview];

  return (
    // pt-20/pt-24 ensures title clears the fixed navbar on all screen sizes
    <div className="h-full w-full bg-sand flex flex-col px-6 md:px-24 pt-20 md:pt-24 pb-6 md:pb-4 overflow-y-auto lg:overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-3 md:mb-5 shrink-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary-teal tracking-[0.06em] md:tracking-[0.10em] mb-1">
          {d.title} <span className="text-coral">{d.titleAccent}</span>
        </h2>
        <p className="text-xs md:text-sm lg:text-base text-muted-teal max-w-3xl leading-relaxed">{d.subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 flex-1 content-start md:content-stretch">
        {d.cards.map((card, i) => (
          <motion.a
            key={i}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${card.name} project`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="group bg-off-white border border-primary-teal/10 rounded-[12px] md:rounded-[14px] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
          >
            {/* Screenshot */}
            <div className="relative overflow-hidden h-[180px] md:h-[160px] lg:h-[140px] xl:h-[180px] shrink-0">
              <img
                src={heroImgs[i]}
                alt={`${card.name} screenshot`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Preview badge */}
              <div className="absolute top-1.5 right-1.5 w-12 md:w-14 border border-white/70 shadow-sm rounded overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                <img src={previewImgs[i]} alt="" className="w-full object-cover" />
              </div>
              {/* Tag overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[9px] font-mono tracking-widest text-white font-medium"
                style={{ background: `linear-gradient(to top, ${card.tagColor}CC, transparent)` }}>
                {card.tag.toUpperCase()}
              </div>
            </div>

            <div className="p-3 lg:p-[14px] xl:p-4 flex flex-col flex-1">
              <h3 className="text-sm md:text-base lg:text-[15px] font-semibold text-primary-teal tracking-wider mb-1 group-hover:text-coral transition-colors leading-tight truncate">
                {card.name}
              </h3>
              <p className="text-[11px] md:text-xs lg:text-[12px] text-muted-teal leading-snug flex-1 line-clamp-2 mb-1">{card.desc}</p>
              <div className="flex items-center justify-between mt-auto border-t border-primary-teal/5 pt-1.5">
                <div className="font-mono text-[9px] tracking-wider text-muted-teal/60 truncate pr-2">
                  {card.aiAngle}
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] tracking-wider text-coral/80 uppercase shrink-0 group-hover:text-coral transition-colors">
                  View project
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// Slide 10 — Credibility & Closing
function ClosingSlide() {
  const d = closing;
  return (
    <div className="h-full w-full bg-dark-teal flex flex-col justify-center px-6 md:px-24 text-cream relative overflow-hidden pt-20 md:pt-24">
      <svg className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 100 L 100 0" stroke="#F5F1E8" strokeWidth="0.5" />
        <path d="M 0 50 L 50 0" stroke="#F5F1E8" strokeWidth="0.5" />
        <path d="M 50 100 L 100 50" stroke="#F5F1E8" strokeWidth="0.5" />
      </svg>

      <div className="max-w-4xl z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium mb-5 md:mb-7 tracking-[0.06em] md:tracking-[0.12em] leading-tight"
        >
          {d.title} <span className="text-coral">{d.titleAccent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base md:text-xl text-sand/80 max-w-2xl mb-5 md:mb-6 font-sans"
        >
          {d.body}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6 md:mb-8 space-y-2"
        >
          {d.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm md:text-base text-sand/70">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
              {h}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}
          className="flex flex-wrap gap-2 mb-8 md:mb-10"
        >
          {d.credibilityCategories.map((cat, i) => (
            <span key={i} className="font-mono text-[10px] md:text-xs tracking-widest border border-sand/20 text-sand/50 px-3 py-1 rounded-full">
              {cat.toUpperCase()}
            </span>
          ))}
        </motion.div>



      </div>

      <div className="mt-auto pt-8 md:pt-12 border-t border-sand/20 flex justify-center md:justify-start items-center text-xs md:text-sm font-mono tracking-widest opacity-60 z-10 pb-8 md:pb-10">
        <div className="text-center md:text-left">{d.copyright}</div>
      </div>
    </div>
  );
}

// ================================================================
// Root
// ================================================================
export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  const slides = [
    <HeroSlide />,
    <WhatWeDoSlide />,
    <WhoWeAreSlide />,
    <MissionSlide />,
    <CapabilitiesSlide />,
    <RoadmapSlide />,
    <NationalAIFrameworkSlide />,
    <EcosystemSlide />,
    <ProjectsSlide />,
    <ClosingSlide />
  ];

  const numSlides = slides.length;

  const isMobile = () => window.innerWidth <= 768;

  const goToSlide = (index: number) => {
    if (isMobile()) {
      const slideEl = document.getElementById(`slide-${index}`);
      if (slideEl) {
        slideEl.scrollIntoView({ behavior: "smooth" });
      }
      setActiveIndex(index);
      return;
    }
    if (index < 0 || index >= numSlides || index === activeIndex || isAnimating.current) return;
    isAnimating.current = true;
    setActiveIndex(index);
    setTimeout(() => {
      isAnimating.current = false;
    }, 500); // Transition duration
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile()) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToSlide(activeIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToSlide(activeIndex - 1);
      }
    };

    let wheelTimeout: number | null = null;
    let accumulatedDeltaY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isMobile()) return;
      // Allow internal scrolling if the target or its parents have vertical overflow
      const target = e.target as HTMLElement;
      let el: HTMLElement | null = target;
      let canScroll = false;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          // If trying to scroll down and not at bottom, or scroll up and not at top
          if (e.deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) {
             canScroll = true;
             break;
          }
          if (e.deltaY < 0 && el.scrollTop > 1) {
             canScroll = true;
             break;
          }
        }
        el = el.parentElement;
      }
      
      if (canScroll) return; // Let native scroll happen

      // Otherwise handle slide navigation
      e.preventDefault(); // Prevent default vertical scroll at document level
      
      accumulatedDeltaY += e.deltaY;
      
      if (!wheelTimeout) {
        wheelTimeout = window.setTimeout(() => {
          if (accumulatedDeltaY > 40) {
            goToSlide(activeIndex + 1);
          } else if (accumulatedDeltaY < -40) {
            goToSlide(activeIndex - 1);
          }
          accumulatedDeltaY = 0;
          wheelTimeout = null;
        }, 100); // Debounce duration
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile()) return;
      const target = e.target as HTMLElement;
      let el: HTMLElement | null = target;
      let canScroll = false;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
           canScroll = true;
           break;
        }
        el = el.parentElement;
      }
      if (canScroll) return;

      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isMobile()) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchStartX - touchEndX;
      const dy = touchStartY - touchEndY;
      
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0) goToSlide(activeIndex + 1);
        else goToSlide(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [activeIndex]);

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-off-white font-sans text-primary-teal relative presentation-stage">
      <Navbar activeIndex={activeIndex} onJump={goToSlide} />
      <ProgressRail activeIndex={activeIndex} onJump={goToSlide} />

      <div className="absolute inset-0 overflow-hidden presentation-stage-inner">
        {slides.map((slide, i) => {
          let transform = "translateX(0)";
          let opacity = 1;
          let zIndex = 10;
          let pointerEvents = "auto" as const;

          if (i < activeIndex) {
            transform = "translateX(-100%)";
            opacity = 0;
            zIndex = 0;
            pointerEvents = "none";
          } else if (i > activeIndex) {
            transform = "translateX(100%)";
            opacity = 0;
            zIndex = 0;
            pointerEvents = "none";
          }

          return (
            <div
              key={i}
              id={`slide-${i}`}
              className="absolute inset-0 transition-all duration-500 ease-out slide-container"
              style={{
                transform,
                opacity,
                zIndex,
                pointerEvents,
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>
    </div>
  );
}
