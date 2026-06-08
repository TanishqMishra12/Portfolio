import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import {
  Sun,
  Moon,
 
  Terminal as TerminalIcon, 
  ExternalLink, 
  Download, 
  Mail, 
  Users, 
  Code, 
  ArrowRight,
  Star,
  Trophy,
  Cloud,
  Globe
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Scroll Reveal Hook ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal-hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          el.classList.add('reveal-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// --- Components ---

const ParticleStorm = React.memo(() => {
  const particles = React.useMemo(() => [
    { id: 'p1', size: 'w-1.5 h-1.5', color: 'bg-red-500', glow: 'shadow-[0_0_10px_#ef4444]', anim: 'particle-storm_8s_infinite_linear', vars: { sa: '0deg', ea: '360deg', sr: '150px', er: '450px' } },
    { id: 'p2', size: 'w-1 h-1', color: 'bg-red-400', glow: 'shadow-[0_0_8px_#f87171]', anim: 'particle-storm_12s_infinite_linear_1s', vars: { sa: '120deg', ea: '480deg', sr: '200px', er: '500px' } },
    { id: 'p3', size: 'w-2 h-2', color: 'bg-red-600', glow: 'shadow-[0_0_15px_#dc2626]', anim: 'particle-storm_15s_infinite_linear_2s', vars: { sa: '240deg', ea: '600deg', sr: '100px', er: '600px', ss: '0.8', es: '1.5' } },
    { id: 'p4', size: 'w-1.5 h-1.5', color: 'bg-red-500', glow: 'shadow-[0_0_10px_#ef4444]', anim: 'particle-storm_20s_infinite_linear', vars: { sa: '45deg', ea: '405deg', sr: '300px', er: '700px' } },
    { id: 'p5', size: 'w-1 h-1', color: 'bg-red-700', glow: 'shadow-[0_0_6px_#b91c1c]', anim: 'particle-storm_18s_infinite_linear_3s', vars: { sa: '180deg', ea: '540deg', sr: '250px', er: '550px' } },
    { id: 'p6', size: 'w-1.5 h-1.5', color: 'bg-red-500', glow: 'shadow-[0_0_12px_#ef4444]', anim: 'particle-storm_25s_infinite_linear_5s', vars: { sa: '315deg', ea: '675deg', sr: '200px', er: '800px', ss: '0.4', es: '2.0' } },
    { id: 'p7', size: 'w-1 h-1', color: 'bg-red-400', glow: 'shadow-[0_0_10px_#f87171]', anim: 'particle-storm_6s_infinite_linear_1.5s', vars: { sa: '90deg', ea: '-270deg', sr: '50px', er: '400px' } },
    { id: 'p8', size: 'w-1.5 h-1.5', color: 'bg-white', glow: 'shadow-[0_0_8px_#ffffff]', anim: 'particle-storm_10s_infinite_linear_0.5s', vars: { sa: '210deg', ea: '-150deg', sr: '150px', er: '500px' }, extra: 'opacity-70' },
    { id: 'p9', size: 'w-1 h-1', color: 'bg-red-500', glow: 'shadow-[0_0_12px_#ef4444]', anim: 'particle-storm_9s_infinite_linear_4s', vars: { sa: '330deg', ea: '-30deg', sr: '180px', er: '480px' } },
    { id: 'p10', size: 'w-2 h-2', color: 'bg-red-900', glow: 'shadow-[0_0_20px_#7f1d1d]', anim: 'particle-storm_35s_infinite_linear', vars: { sa: '15deg', ea: '375deg', sr: '400px', er: '200px' }, extra: 'blur-[3px] opacity-40' },
    { id: 'p11', size: 'w-1 h-1', color: 'bg-red-500', glow: 'shadow-[0_0_10px_#ef4444]', anim: 'particle-storm_14s_infinite_linear_6s', vars: { sa: '145deg', ea: '505deg', sr: '350px', er: '650px' }, extra: 'z-20' },
    { id: 'p12', size: 'w-1.5 h-1.5', color: 'bg-red-300', glow: 'shadow-[0_0_10px_#fca5a5]', anim: 'particle-storm_16s_infinite_linear_2.5s', vars: { sa: '265deg', ea: '625deg', sr: '120px', er: '420px' } },
    { id: 'p13', size: 'w-1 h-1', color: 'bg-red-600', glow: 'shadow-[0_0_8px_#dc2626]', anim: 'particle-storm_11s_infinite_linear_0.8s', vars: { sa: '60deg', ea: '420deg', sr: '220px', er: '520px' } },
    { id: 'p14', size: 'w-1.5 h-1.5', color: 'bg-red-500', glow: 'shadow-[0_0_10px_#ef4444]', anim: 'particle-storm_13s_infinite_linear_2.2s', vars: { sa: '160deg', ea: '520deg', sr: '280px', er: '580px' } },
    { id: 'p15', size: 'w-1 h-1', color: 'bg-white', glow: 'shadow-[0_0_8px_#ffffff]', anim: 'particle-storm_17s_infinite_linear_3.4s', vars: { sa: '280deg', ea: '640deg', sr: '320px', er: '620px' }, extra: 'opacity-60' },
    { id: 'p16', size: 'w-1.5 h-1.5', color: 'bg-red-400', glow: 'shadow-[0_0_10px_#f87171]', anim: 'particle-storm_19s_infinite_linear_4.6s', vars: { sa: '340deg', ea: '700deg', sr: '180px', er: '480px' } },
    { id: 'p17', size: 'w-1 h-1', color: 'bg-red-700', glow: 'shadow-[0_0_6px_#b91c1c]', anim: 'particle-storm_21s_infinite_linear_5.8s', vars: { sa: '20deg', ea: '380deg', sr: '380px', er: '680px' } },
    { id: 'p18', size: 'w-2 h-2', color: 'bg-red-500', glow: 'shadow-[0_0_15px_#ef4444]', anim: 'particle-storm_23s_infinite_linear_7s', vars: { sa: '100deg', ea: '460deg', sr: '140px', er: '740px', ss: '0.6', es: '1.8' } },
    { id: 'p19', size: 'w-1 h-1', color: 'bg-red-400', glow: 'shadow-[0_0_10px_#f87171]', anim: 'particle-storm_7s_infinite_linear_1.2s', vars: { sa: '200deg', ea: '560deg', sr: '90px', er: '390px' } },
    { id: 'p20', size: 'w-1.5 h-1.5', color: 'bg-red-600', glow: 'shadow-[0_0_12px_#dc2626]', anim: 'particle-storm_27s_infinite_linear_8.5s', vars: { sa: '290deg', ea: '650deg', sr: '260px', er: '560px' } },
    { id: 'p21', size: 'w-1 h-1', color: 'bg-white', glow: 'shadow-[0_0_8px_#ffffff]', anim: 'particle-storm_30s_infinite_linear_9.2s', vars: { sa: '30deg', ea: '390deg', sr: '340px', er: '640px' }, extra: 'opacity-50' },
    { id: 'p22', size: 'w-1.5 h-1.5', color: 'bg-red-500', glow: 'shadow-[0_0_10px_#ef4444]', anim: 'particle-storm_10s_infinite_linear_0.3s', vars: { sa: '110deg', ea: '-250deg', sr: '170px', er: '470px' } },
    { id: 'p23', size: 'w-1 h-1', color: 'bg-red-400', glow: 'shadow-[0_0_10px_#f87171]', anim: 'particle-storm_15s_infinite_linear_1.8s', vars: { sa: '230deg', ea: '-130deg', sr: '210px', er: '510px' } },
    { id: 'p24', size: 'w-1.5 h-1.5', color: 'bg-red-700', glow: 'shadow-[0_0_12px_#b91c1c]', anim: 'particle-storm_22s_infinite_linear_4.2s', vars: { sa: '350deg', ea: '710deg', sr: '310px', er: '610px' } },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn(
            "absolute top-1/2 left-1/2 rounded-full",
            p.size, p.color, p.glow, p.extra
          )}
          style={{
            animation: `${p.anim.replace(/_/g, ' ')}`,
            '--start-angle': p.vars.sa,
            '--end-angle': p.vars.ea,
            '--start-radius': p.vars.sr,
            '--end-radius': p.vars.er,
            ...(p.vars.ss ? { '--start-scale': p.vars.ss } : {}),
            ...(p.vars.es ? { '--end-scale': p.vars.es } : {}),
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

const Terminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logData = [
    "> INITIALIZING_CORE_V4.2.0...",
    "> LOADING_NEURAL_LAYERS [OK]",
    "> SYNCING_PROFILE_IDENTITY [OK]",
    "> RAG_PIPELINE_STATUS: OPTIMIZED",
    "> LATENCY_CHECK: <142MS [STABLE]",
    "> ENCRYPTION_SECURED_VIA_JWT",
    "> SYSTEM_STATUS: FULLY_OPERATIONAL"
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < logData.length) {
        const log = logData[index];
        if (log) setLogs(prev => [...prev, log]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-12 right-12 w-80 bg-white/80 dark:bg-white dark:bg-black/80 border border-neutral-300 dark:border-neutral-800 p-6 font-mono text-[11px] text-red-500 hidden lg:block backdrop-blur-xl shadow-2xl scanline overflow-hidden rounded-sm z-20">
      <div className="flex items-center justify-between mb-3 border-b border-neutral-300 dark:border-neutral-800/50 pb-2">
        <span className="flex items-center gap-2 font-bold tracking-tight">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> SYSTEM_SESSION_01
        </span>
        <span className="text-neutral-500 text-[9px]">v4.2.0</span>
      </div>
      <div className="space-y-2 h-36 leading-relaxed font-medium overflow-hidden">
        {logs.map((log, i) => (
          <p key={i} className={cn(
            "transition-opacity duration-300",
            i === logData.length - 1 ? "text-black dark:text-white font-bold" : ""
          )}>
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

const Reveal = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useReveal();
  return <div ref={ref} className={className}>{children}</div>;
};

const SectionHeader = ({ label, title, className }: { label: string, title: string | React.ReactNode, className?: string }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className={cn("mb-20", className)}>
      <span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">
        // {label}
      </span>
      <h2 className="font-display text-7xl md:text-8xl text-black dark:text-white leading-tight">
        {title}
      </h2>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#f0ede8]">
      <ThemeToggle />
      <div className="global-scanline"></div>

      {/* Hero Section */}
      <header className="relative w-full h-[900px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full animate-flicker overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1718844172564-ccaf5a086486?auto=format&w=1600&q=80&fit=crop" 
              className="w-full h-full object-cover opacity-10 grayscale brightness-50 animate-ken-burns" 
              alt="Neural Background" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
          
          {/* Neural Grid */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(232,57,42,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(232,57,42,0.15)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(800px)_rotateX(60deg)] origin-center h-[200%] -top-1/2 animate-grid-move"></div>
          </div>

          <ParticleStorm />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(232,57,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(232,57,42,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_70%)] blur-[40px] pointer-events-none animate-pulse-aura z-0"></div>
          
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-red-500/20 bg-red-500/5 backdrop-blur-md rounded-full relative z-10">
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-red"></span>
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-bold">Protocol Active: System Monitoring</span>
          </div>
          
          <h1 className="font-display text-[80px] sm:text-[120px] md:text-[200px] lg:text-[240px] text-black dark:text-white leading-[0.75] tracking-tighter mb-6 select-none relative z-10 uppercase">
            Tanishq<br /><span className="text-[#E60000]">Mishra</span>
          </h1>
          
          <p className="mt-4 font-mono text-neutral-500 text-xs md:text-base max-w-2xl mx-auto uppercase tracking-[0.3em] font-light relative z-10">
            AI Engineer <span className="text-red-600 mx-3">|</span> LLM Architect <span className="text-red-600 mx-3">|</span> Autonomous Agent R&D
          </p>
        </div>

        <Terminal />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
          <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-black dark:text-white">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </header>

      {/* Ticker */}
      <div className="w-full bg-red-600 py-4 overflow-hidden whitespace-nowrap border-y border-red-700/50 relative z-20">
        <div className="inline-block animate-ticker font-mono text-[10px] uppercase tracking-[0.2em] text-black dark:text-white font-bold">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8">LLM Applications</span> <span className="text-black dark:text-white/30">•</span>
              <span className="mx-8">RAG Pipelines</span> <span className="text-black dark:text-white/30">•</span>
              <span className="mx-8">Autonomous Agents</span> <span className="text-black dark:text-white/30">•</span>
              <span className="mx-8">FastAPI Architecture</span> <span className="text-black dark:text-white/30">•</span>
              <span className="mx-8">Vector Databases</span> <span className="text-black dark:text-white/30">•</span>
              <span className="mx-8">Neural Reasoning</span> <span className="text-black dark:text-white/30">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="w-full py-32 px-6 bg-[#0c0c0c] border-b border-neutral-200 dark:border-neutral-900 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <SectionHeader label="SYSTEM_OVERVIEW" title={<>THE CORE<br />ARCHITECTURE</>} />
            <Reveal className="space-y-6 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed text-lg">
              <p>I’m a <span className="text-black dark:text-white">Computer Science student at Vellore Institute of Technology</span> passionate about building AI systems that solve real-world problems beyond simple demos.</p>
              <p>My interests lie in <span className="text-black dark:text-white">AI Engineering, LLM applications, Retrieval-Augmented Generation (RAG), autonomous agents, and scalable backend systems</span>. I enjoy turning complex ideas into practical tools from AI web agents and resume intelligence systems to document assistants and educational AI platforms.</p>
              <p>I’ve worked on projects involving <span className="text-red-500 font-bold">LangChain, LangGraph, FastAPI, Qdrant, Firecrawl, Streamlit, and OpenAI APIs</span>, with a strong focus on production-ready architectures, structured outputs, and reliable AI workflows.</p>
              <p>I’m continuously learning, experimenting, and pushing myself through projects, internships, hackathons, and collaborations with people who are equally passionate about technology and innovation.</p>
            </Reveal>
            
            <Reveal className="mt-12 grid grid-cols-2 gap-8 border-t border-neutral-300 dark:border-neutral-800 pt-12">
              <div>
                <span className="block font-mono text-xs text-neutral-600 uppercase mb-2">Location</span>
                <span className="text-black dark:text-white font-bold">India / Remote</span>
              </div>
              <div>
                <span className="block font-mono text-xs text-neutral-600 uppercase mb-2">Academic</span>
                <span className="text-black dark:text-white font-bold">VIT Bhopal '28</span>
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <a 
                href="/resume-preview.png" 
                download="Tanishq_Mishra_Resume.png"
                className="inline-flex items-center gap-4 px-8 py-3 border border-red-500/30 bg-red-500/5 text-red-500 font-mono text-xs uppercase tracking-widest hover:bg-red-500 hover:text-black dark:text-white transition-all group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                Download Operations Resume
              </a>
            </Reveal>
          </div>

          <Reveal className="relative aspect-[4/5] group overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-2xl">
            <img src="/profile.jpg" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" alt="Tanishq Mishra" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/60 dark:bg-white dark:bg-black/60 backdrop-blur-xl border border-white/5 rounded-xl">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-red-500 font-mono text-[10px] uppercase block mb-1">Status</span>
                  <span className="text-black dark:text-white font-bold uppercase tracking-widest">System Ready</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-1">Efficiency</span>
                  <span className="text-red-500 font-bold">+8.6 CGPA</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skill Matrix */}
      <section id="skills" className="w-full py-32 px-6 border-b border-neutral-200 dark:border-neutral-900 relative z-10 skill-bg-anim">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-24">
            <span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">// TECH_CAPABILITIES</span>
            <h2 className="font-display text-7xl text-black dark:text-white">THE SKILL MATRIX</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', category: 'LANGUAGES', skills: ['Python', 'Java', 'C++', 'SQL'] },
              { num: '02', category: 'AI / ML', skills: ['LLMs', 'RAG', 'NLP', 'Prompt Eng.', 'ML', 'AI Agents'] },
              { num: '03', category: 'FRAMEWORKS', skills: ['LangChain', 'LangGraph', 'FastAPI', 'Streamlit', 'PyTorch', 'Firecrawl', 'Celery', 'Inngest'] },
              { num: '04', category: 'INFRASTRUCTURE', skills: ['Qdrant', 'Pinecone', 'PostgreSQL', 'Docker'] },
              { num: '05', category: 'TOOLS', skills: ['Git', 'CI/CD', 'REST APIs', 'JWT Auth'] },
              { num: '06', category: 'COMPETENCIES', skills: ['System Architecture', 'Backend Dev.', 'Algorithm Design', 'Problem Solving'] },
            ].map((cat, idx) => (
              <Reveal key={idx} className="p-8 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0d0d0d] relative group hover:border-red-500/30 transition-all overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-red-600/5 -translate-y-6 translate-x-6 rotate-45 group-hover:bg-red-600/10 transition-colors"></div>
                <h3 className="font-display text-3xl text-black dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-red-600">{cat.num}.</span> {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-red-500/5 border border-red-500/10 text-[10px] text-neutral-600 dark:text-neutral-400 font-mono uppercase tracking-wider group-hover:text-red-400 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Logs (Experience) */}
      <section id="experience" className="w-full py-32 px-6 relative z-10 experience-bg-anim">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_2fr] gap-12 items-start">
            <div className="md:text-right md:pr-12">
              <Reveal><span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">Archive_01</span></Reveal>
              <Reveal><h2 className="font-display text-7xl md:text-8xl text-black dark:text-white mb-8 uppercase">Operational<br />Logs</h2></Reveal>
              <Reveal>
                <p className="text-neutral-500 font-mono text-sm leading-relaxed max-w-xs md:ml-auto">
                  Tracing the evolution from academic foundations to industrial AI R&D.
                </p>
              </Reveal>
            </div>

            <div className="h-full bg-neutral-800/50 relative hidden md:block">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 pulse-red shadow-[0_0_30px_rgba(220,38,38,1)]"></div>
            </div>

            <div className="space-y-24 pl-0 md:pl-12">
              
              <Reveal className="group">
                <div className="flex items-center gap-6 mb-6">
                  <span className="text-[#E60000] font-mono text-xs font-bold tracking-widest uppercase">FEB 2026 — MAY 2026</span>
                </div>
                <h3 className="text-4xl md:text-5xl text-black dark:text-white font-extrabold mb-6 group-hover:text-red-500 transition-colors uppercase tracking-wide leading-tight">
                  Laneway — AI R&D<br />Intern
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {['FastAPI', 'LangGraph', 'Clerk Auth', 'Vector DB'].map((tag) => (
                    <span key={tag} className="px-3 py-1 border border-[#E60000]/40 text-[9px] text-[#E60000] font-mono font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>

                <ul className="space-y-4 text-neutral-600 dark:text-neutral-400 font-mono text-sm leading-relaxed max-w-2xl">
                  {[
                    "Architected a 5-phase hybrid AI matchmaking pipeline achieving sub-200ms end-to-end response time.",
                    "Engineered async FastAPI backend with integrated reputation ledger and Celery task queues for zero race conditions.",
                    "Developed robust Clerk JWT authentication workflows and custom viral referral logic for platform growth.",
                    "Implemented automated dynamic prompt templates for scalable agentic reasoning."
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="text-[#E60000] font-bold">{">>"}</span> 
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 border border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-white dark:bg-black/50 group hover:border-red-500/30 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 translate-x-8 -translate-y-8 rounded-full"></div>
                  <span className="text-red-500 text-6xl font-display tracking-widest block mb-2">95%</span>
                  <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Doc QA Accuracy</span>
                </div>
                <div className="p-8 border border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-white dark:bg-black/50 group hover:border-red-500/30 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 translate-x-8 -translate-y-8 rounded-full"></div>
                  <span className="text-red-600 text-6xl font-display tracking-widest block mb-2">60%</span>
                  <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Latency Reduction</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Deployments Section */}
      <section id="projects" className="w-full py-32 px-6 bg-neutral-50 dark:bg-[#0a0a0a] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">// DEPLOYMENTS</span>
              <h2 className="font-display text-7xl md:text-9xl text-black dark:text-white uppercase leading-none">What I've<br />Shipped</h2>
            </div>
            <div className="text-neutral-500 font-mono text-xs uppercase tracking-[0.2em] max-w-xs md:text-right">
              Functional AI solutions integrated with production-grade backend architectures.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900 border border-neutral-200 dark:border-neutral-900">
            {[
              {
                num: '01',
                type: 'New Deployment',
                name: 'Kaya-AI',
                desc: 'Advanced AI research assistant designed for complex task orchestration and automated knowledge retrieval.',
                tags: ['FastAPI', 'LangChain'],
                link: 'https://github.com/TanishqMishra12/kaya-AI.git'
              },
              {
                num: '02',
                type: 'Autonomous Agent',
                name: 'Web AI Agent',
                desc: 'Developer-facing agent using graph-based cyclic reasoning and semantic scraping via LangGraph.',
                tags: ['Python', 'LangGraph'],
                link: 'https://github.com/TanishqMishra12/Web-Agent.git'
              },
              {
                num: '03',
                type: 'RAG Systems',
                name: 'RAG Assistant',
                desc: 'Document QA system achieving 95% accuracy via semantic hybrid search with Qdrant.',
                tags: ['Qdrant', 'PostgreSQL'],
                link: 'https://github.com/TanishqMishra12/RAG.git'
              },
              {
                num: '04',
                type: 'Backend Systems',
                name: 'AI Matchmaking',
                desc: 'Core infra for social platforms featuring high-concurrency request processing.',
                tags: ['Celery', 'Redis'],
                link: 'https://github.com/TanishqMishra12/AI-Match-Making.git'
              },
              {
                num: '05',
                type: 'Educational AI',
                name: 'LECTURE2CODE',
                desc: 'An AI system that converts educational video lectures into searchable, structured code and documentation.',
                tags: ['Python', 'Whisper', 'LLMs', 'Markdown'],
                link: 'https://github.com/TanishqMishra12/LECTURE2CODE.git'
              }
            ].map((p, idx) => (
              <Reveal key={idx} className="bg-neutral-100 dark:bg-[#0d0d0d] p-10 group hover:bg-[#121212] transition-colors relative overflow-hidden">
                <span className="absolute top-8 right-8 text-neutral-800 font-display text-6xl group-hover:text-red-500/10 transition-colors z-0">{p.num}</span>
                <span className="font-mono text-red-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block relative z-10">{p.type}</span>
                <h3 className="text-2xl text-black dark:text-white font-bold mb-4 group-hover:text-red-500 transition-colors relative z-10">{p.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-mono text-xs leading-relaxed mb-10 relative z-10">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-10 relative z-10">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 border border-neutral-300 dark:border-neutral-800 text-neutral-500 uppercase">{tag}</span>
                  ))}
                </div>
                <a href={p.link} target="_blank" className="inline-flex items-center gap-2 text-black dark:text-white font-mono text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors relative z-10">
                  Explore Repository <ExternalLink className="w-3 h-3" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic & Milestones */}
      <section className="w-full py-32 px-6 bg-[#0c0c0c] relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Reveal>
            <span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">// FORMATION</span>
            <h2 className="font-display text-7xl text-black dark:text-white mb-12 uppercase">Academic<br />History</h2>
            <div className="space-y-12">
              <div className="group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-black dark:text-white font-bold text-xl group-hover:text-red-500 transition-colors">VIT Bhopal University</h4>
                  <span className="font-mono text-red-600 text-[10px] mt-1 uppercase">2024 — 2028</span>
                </div>
                <p className="text-neutral-500 font-mono text-xs uppercase mb-4">B.Tech in Computer Science (AI & ML)</p>
                <div className="inline-block px-3 py-1 border border-neutral-300 dark:border-neutral-800 text-[10px] text-black dark:text-white font-bold font-mono uppercase">CGPA: 8.6 / 10</div>
              </div>
              <div className="group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-black dark:text-white font-bold text-xl group-hover:text-red-500 transition-colors">DPS Bokaro Steel City</h4>
                  <span className="font-mono text-neutral-600 text-[10px] mt-1 uppercase">2022 — 2024</span>
                </div>
                <p className="text-neutral-500 font-mono text-xs uppercase">Higher Secondary Education (PCM)</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">// MILESTONES</span>
            <h2 className="font-display text-7xl text-black dark:text-white mb-12 uppercase">Certified<br />Expertise</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <Star className="w-6 h-6" />, title: 'HackerRank 5-Star Python', desc: 'Advanced problem-solving & language mastery' },
                { icon: <Trophy className="w-6 h-6" />, title: 'Applied ML — Michigan Univ.', desc: 'End-to-end ML workflows & predictive modeling' },
                { icon: <Cloud className="w-6 h-6" />, title: 'Azure Computer Vision', desc: 'Cloud-based AI API integration expert' },
                { icon: <Globe className="w-6 h-6" />, title: 'NPTEL Cloud Computing — IIT Kharagpur', desc: 'Scalable infrastructure & distributed systems' },
              ].map((m, i) => (
                <div key={i} className="p-6 border border-neutral-300 dark:border-neutral-800 hover:border-red-500/20 transition-all flex items-center gap-6 group bg-white dark:bg-black/30">
                  <div className="text-red-500 opacity-40 group-hover:opacity-100 transition-opacity">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-black dark:text-white font-bold text-sm uppercase mb-1">{m.title}</h4>
                    <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-32 px-6 bg-neutral-50 dark:bg-[#0a0a0a] relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1718844172564-ccaf5a086486?auto=format&w=1200&q=80&fit=crop" className="w-full h-full object-cover" alt="Background" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-24">
            <span className="font-mono text-red-500 text-xs tracking-widest uppercase mb-4 block">// INTERFACE</span>
            <h2 className="font-display text-7xl md:text-9xl text-black dark:text-white uppercase leading-none">Establish<br />Connection</h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 font-medium text-lg mb-12 max-w-md">
                I am actively looking for internship and collaborative opportunities in <span className="text-black dark:text-white font-bold">AI Engineering</span> and <span className="text-black dark:text-white font-bold">Scalable Backend Systems</span>.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'Secure Email', value: 'mishratanishq539@gmail.com', href: 'mailto:mishratanishq539@gmail.com' },
                  { icon: <Users className="w-5 h-5" />, label: 'LinkedIn Signal', value: '/tanishqmishra-205315303', href: 'https://linkedin.com/in/tanishqmishra-205315303' },
                  { icon: <Code className="w-5 h-5" />, label: 'Repository Root', value: 'github.com/TanishqMishra12', href: 'https://github.com/TanishqMishra12' },
                ].map((link, i) => (
                  <a 
                    key={i} 
                    href={link.href} 
                    target="_blank" 
                    className="flex items-center gap-6 p-6 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0d0d0d] hover:border-red-500/50 hover:bg-[#121212] transition-all group rounded-sm"
                  >
                    <span className="text-red-500 group-hover:scale-110 transition-transform">{link.icon}</span>
                    <div>
                      <span className="block font-mono text-[8px] text-neutral-600 uppercase tracking-widest mb-1">{link.label}</span>
                      <span className="text-black dark:text-white font-mono text-sm">{link.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-black/90 border border-neutral-300 dark:border-neutral-800 p-8 scanline relative shadow-2xl overflow-hidden rounded-xl">
              <div className="flex items-center gap-3 mb-8 border-b border-neutral-200 dark:border-neutral-900 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800"></div>
                </div>
                <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">TRANSMIT_DATA_STREAM.EXE</span>
              </div>

              <form 
                className="space-y-6" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const message = formData.get('message');
                  window.location.href = `mailto:mishratanishq539@gmail.com?subject=Transmission from ${name}&body=${message}%0A%0AReply to: ${email}`;
                }}
              >
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Identification</label>
                  <input name="name" required type="text" placeholder="GUEST_NAME" className="w-full bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 px-4 py-3 text-black dark:text-white font-mono text-xs focus:border-red-500/50 outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Return Path</label>
                  <input name="email" required type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 px-4 py-3 text-black dark:text-white font-mono text-xs focus:border-red-500/50 outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Message Payload</label>
                  <textarea name="message" required placeholder="SYSTEM_REQUEST..." rows={4} className="w-full bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 px-4 py-3 text-black dark:text-white font-mono text-xs focus:border-red-500/50 outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-red-600 text-black dark:text-white font-mono text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-red-700 transition-all flex items-center justify-center gap-2 group">
                  Transmit Data <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 bg-neutral-50 dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
        <div className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.2em] text-center">
          © 2026 Tanishq Mishra — AI ENGINEER — ALL SYSTEMS OPERATIONAL
        </div>
        <div className="flex gap-6 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          <a href="https://github.com/TanishqMishra12" target="_blank" className="hover:text-red-500 transition-colors">Github</a>
          <a href="https://linkedin.com/in/tanishqmishra-205315303" target="_blank" className="hover:text-red-500 transition-colors">Linkedin</a>
          <a href="mailto:mishratanishq539@gmail.com" className="hover:text-red-500 transition-colors">Email</a>
        </div>
      </footer>
    </div>
  );
}
