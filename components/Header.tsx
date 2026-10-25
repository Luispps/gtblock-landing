'use client';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { company, whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './ui';

const links = [['A empresa', '#empresa'], ['Tecnologia', '#tecnologia'], ['Recuperados', '#recuperados'], ['Planos', '#planos'], ['Contato', '#contato']];
export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <div className="shell header-inner">
      <a href="#inicio" className="brand" aria-label="GTBLOCK — início" onClick={() => setOpen(false)}><Image src="/brand/gtblock-horizontal.webp" alt="GTBLOCK" width={222} height={42} priority /></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav>
      <div className="header-actions">
        <a className="client-link" href={company.tracking} target="_blank" rel="noopener noreferrer">Área do cliente <ArrowUpRight size={14} /></a>
        <a className="button button-gold button-small header-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} /> Fale com um consultor</a>
        <button className="menu-button" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação no celular">{links.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}<ArrowUpRight size={18} /></a>)}<a href={company.tracking} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Área do cliente<ArrowUpRight size={18} /></a><a className="button button-gold" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Fale com um consultor</a></nav>}
  </header>;
}
