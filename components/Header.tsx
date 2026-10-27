'use client';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { company, whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './ui';

const links = [['A empresa', '#empresa'], ['Tecnologia', '#tecnologia'], ['Recuperados', '#recuperados'], ['Planos', '#planos'], ['Contato', '#contato']];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
      const update = () => {
        const current = nodes.filter(node => node.getBoundingClientRect().top <= window.innerHeight * .35).at(-1);
        setActive(current ? `#${current.id}` : '');
      };
      observer = new IntersectionObserver(update, { rootMargin: `-${Math.round(window.innerHeight * .25)}px 0px -${Math.round(window.innerHeight * .55)}px 0px` });
      nodes.forEach(node => observer.observe(node));
      update();
    };
    observe();
    window.addEventListener('resize', observe);
    return () => { observer?.disconnect(); window.removeEventListener('resize', observe); };
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <div className="shell header-inner">
      <a href="#inicio" className="brand" aria-label="GTBLOCK — início" onClick={() => setOpen(false)}><Image src="/brand/gtblock-horizontal.webp" alt="GTBLOCK" width={222} height={42} priority /></a>
      <nav className="desktop-nav" aria-label="Navegação principal" onMouseLeave={() => setHovered(null)}>{links.map(([name, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} onMouseEnter={() => setHovered(href)} onFocus={() => setHovered(href)} onBlur={() => setHovered(null)} onClick={() => setActive(href)}>
        {(hovered ?? active) === href && <motion.span className="nav-highlight" layoutId="header-highlight" aria-hidden="true" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }} />}
        <span className="nav-label">{name}</span><span className="nav-active-dot" aria-hidden="true" />
      </a>)}</nav>
      <div className="header-actions">
        <a className="client-link" href={company.tracking} target="_blank" rel="noopener noreferrer">Área do cliente <ArrowUpRight size={14} /></a>
        <a className="button button-gold button-small header-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} /> Fale com um consultor</a>
        <button className="menu-button" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação no celular" initial={{ opacity: 0, y: reduce ? 0 : -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -8 }} transition={{ duration: reduce ? 0 : .18 }}>
      {links.map(([name, href], index) => <motion.a key={href} href={href} aria-current={active === href ? 'location' : undefined} initial={{ opacity: 0, x: reduce ? 0 : -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : .2, delay: reduce ? 0 : index * .035 }} onClick={() => { setActive(href); setOpen(false); }}>{name}<ArrowUpRight size={18} /></motion.a>)}<a href={company.tracking} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Área do cliente<ArrowUpRight size={18} /></a><a className="button button-gold" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Fale com um consultor</a>
    </motion.nav>}</AnimatePresence>
  </header>;
}
