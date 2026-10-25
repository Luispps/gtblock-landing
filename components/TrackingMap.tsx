'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Car, Crosshair, MapPin, Navigation } from 'lucide-react';
export default function TrackingMap({ blocked = false }: { blocked?: boolean }) {
  const reduce = useReducedMotion();
  return <div className={`tracking-map ${blocked ? 'map-blocked' : ''}`}>
    <svg className="map-svg" viewBox="0 0 660 490" fill="none" aria-hidden="true">
      <defs><pattern id="cityBlocks" width="105" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(-24)"><rect x="9" y="10" width="84" height="68" rx="6" fill="#232420" stroke="#30312b" /><path d="M26 22h24v19H26zM59 22h21v43H59zM26 50h24v15H26z" fill="#2a2b25"/></pattern><radialGradient id="mapGlow"><stop stopColor="#dec27a" stopOpacity=".13"/><stop offset="1" stopColor="#dec27a" stopOpacity="0"/></radialGradient></defs>
      <rect width="660" height="490" fill="#1b1d19"/><rect width="660" height="490" fill="url(#cityBlocks)"/><path d="M-30 355C130 304 116 179 267 204S377 52 690 96" stroke="#141713" strokeWidth="43"/><path d="M-30 355C130 304 116 179 267 204S377 52 690 96" stroke="#47473b" strokeWidth="2" strokeDasharray="8 8"/><path d="M492-25C399 132 521 210 446 315S372 405 394 510" stroke="#141713" strokeWidth="32"/><path d="M492-25C399 132 521 210 446 315S372 405 394 510" stroke="#393d32" strokeWidth="2"/><path d="M-20 450 700 119" stroke="#141713" strokeWidth="21"/>
      <circle cx="342" cy="234" r="185" fill="url(#mapGlow)"/><path d="M155 353 255 307 222 234 306 194 342 234" stroke="#dabb71" strokeOpacity=".16" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/><motion.path className="map-route" d="M155 353 255 307 222 234 306 194 342 234" stroke="#e8c97e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : 1.8, delay: reduce ? 0 : 0.3, ease: 'easeInOut' }}/><circle cx="155" cy="353" r="7" fill="#1c1d19" stroke="#e8c97e" strokeWidth="3"/><circle cx="342" cy="234" r="48" fill="#dabb71" fillOpacity=".07" stroke="#dabb71" strokeOpacity=".2"/><circle cx="342" cy="234" r="30" fill="#dabb71" fillOpacity=".1" stroke="#dabb71" strokeOpacity=".4"/>
      <g transform="translate(400 70) rotate(-24)"><text fill="#77796b" fontSize="10" fontFamily="sans-serif" letterSpacing="2">AVENIDA PRINCIPAL</text></g><g transform="translate(120 160) rotate(-24)"><text fill="#66695b" fontSize="9" fontFamily="sans-serif" letterSpacing="2">CENTRO</text></g>
    </svg>
    <div className="map-topbar"><span className="map-brand"><Crosshair size={15} /> GTBLOCK <span>TRACKING</span></span><span className="map-status"><span className="live-dot" /> {blocked ? 'Proteção acionada' : 'Conexão ativa'}</span></div>
    <div className="map-car"><Car size={22} /></div>
    <div className="map-location"><MapPin size={13} /> {blocked ? 'Comando de bloqueio' : 'Localização do veículo'}</div>
    <div className="map-controls" aria-hidden="true"><Crosshair size={18} /><Navigation size={18} /></div>
    <div className="map-info"><div className="map-info-icon"><Car size={24} /></div><div><strong>Meu veículo</strong><span>{blocked ? 'Bloqueio remoto • exemplo' : 'Acompanhamento em tempo real'}</span></div><span className="map-info-tag">{blocked ? 'BLOQUEIO' : 'PROTEGIDO'}</span></div>
    <span className="map-caption">Demonstração ilustrativa da tecnologia</span>
  </div>;
}
