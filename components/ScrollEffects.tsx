'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMobileMotion } from './ui';

const sections = [
  ['inicio', 'Início'], ['empresa', 'A empresa'], ['tecnologia', 'Tecnologia'],
  ['recuperados', 'Pronta resposta'], ['planos', 'Planos'], ['duvidas', 'Dúvidas'], ['contato', 'Contato'],
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 35, restDelta: 0.001 });
  const progress = useTransform(smoothProgress, value => Math.max(0, Math.min(1, value)));
  const reduce = useReducedMotion();
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    let observer: IntersectionObserver;
    const observeSections = () => {
      observer?.disconnect();
      // Pixel margins keep the observation band correct in landscape viewports.
      observer = new IntersectionObserver(entries => {
        const current = entries.find(entry => entry.isIntersecting);
        if (current) setActive(current.target.id);
      }, { rootMargin: `-${Math.round(window.innerHeight * 0.25)}px 0px -${Math.round(window.innerHeight * 0.55)}px 0px`, threshold: 0 });
      const nodes = sections.map(([id]) => document.getElementById(id)).filter((node): node is HTMLElement => node !== null);
      const current = nodes.filter(node => node.getBoundingClientRect().top <= window.innerHeight * 0.35).at(-1);
      if (current) setActive(current.id);
      nodes.forEach(node => observer.observe(node));
    };
    observeSections();
    window.addEventListener('resize', observeSections);
    return () => { observer.disconnect(); window.removeEventListener('resize', observeSections); };
  }, []);
  return <nav className="scroll-rail" aria-label="Navegação lateral por seções">
    <div className="scroll-rail-track" aria-hidden="true"><motion.div className="scroll-progress" style={{ scaleY: reduce ? scrollYProgress : progress }} /></div>
    {sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? 'location' : undefined}><span className="scroll-rail-dot" /><span className="scroll-rail-label">{label}</span></a>)}
  </nav>;
}

export function HeroBackdrop({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mobile = useMobileMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  return <div ref={ref} className="hero-backdrop"><motion.div className="hero-backdrop-image" style={reduce || mobile ? undefined : { y, scale }}>{children}</motion.div></div>;
}
