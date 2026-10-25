'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Car, Crosshair, Expand, Radio, ShieldCheck, X } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { whatsappLink } from '@/lib/site';
import { Reveal } from './ui';

const photos = [
  { id: 3, category: 'Carros', title: 'Automóvel recuperado', alt: 'Automóvel branco recuperado, registrado na galeria oficial da GTBLOCK' },
  { id: 1, category: 'Motos', title: 'Motocicleta recuperada', alt: 'Motocicleta preta recuperada, registrada na galeria oficial da GTBLOCK' },
  { id: 6, category: 'Carros', title: 'Automóvel recuperado', alt: 'Automóvel vermelho recuperado, registrado na galeria oficial da GTBLOCK' },
  { id: 2, category: 'Motos', title: 'Motocicleta recuperada', alt: 'Motocicleta amarela recuperada, registrada na galeria oficial da GTBLOCK' },
  { id: 4, category: 'Carros', title: 'Automóvel recuperado', alt: 'Automóvel prata recuperado, registrado na galeria oficial da GTBLOCK' },
  { id: 5, category: 'Carros', title: 'Automóvel recuperado', alt: 'Automóvel branco recuperado à noite, registrado na galeria oficial da GTBLOCK' },
];
const steps = [
  { name: 'Acionar', icon: Radio, title: 'O primeiro sinal é o seu contato.', text: 'Em caso de roubo ou furto, o cliente aciona a central de atendimento. Nossa equipe recebe as informações e orienta os próximos passos.', label: 'CENTRAL DE ATENDIMENTO' },
  { name: 'Localizar', icon: Crosshair, title: 'Tecnologia para orientar a ação.', text: 'O rastreador instalado no veículo fornece informações de localização para apoiar a atuação da equipe de pronta resposta.', label: 'RASTREAMENTO DO VEÍCULO' },
  { name: 'Recuperar', icon: ShieldCheck, title: 'Pessoas preparadas para agir.', text: 'Com apoio do rastreamento, a equipe de pronta resposta atua na recuperação do veículo. Os registros abaixo mostram parte desse trabalho.', label: 'EQUIPE DE PRONTA RESPOSTA' },
];

export default function RecoverySection() {
  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const filtered = photos.filter(photo => filter === 'Todos' || photo.category === filter);
  const currentPhoto = selected === null ? null : filtered[selected];
  const StepIcon = steps[step].icon;

  const updateEdges = () => {
    const node = track.current;
    if (!node) return;
    const next = { start: node.scrollLeft < 3, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 3 };
    setEdges(previous => previous.start === next.start && previous.end === next.end ? previous : next);
  };
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    node.scrollTo({ left: 0, behavior: 'instant' });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(node);
    updateEdges();
    return () => observer.disconnect();
  }, [filter]);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (selected !== null && !node.open) node.showModal();
    if (selected === null && node.open) node.close();
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);
  const movePhoto = (direction: number) => setSelected(value => value === null ? null : (value + direction + filtered.length) % filtered.length);
  const moveTrack = (direction: number) => {
    const node = track.current;
    if (!node) return;
    const card = node.firstElementChild;
    node.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 300) + 20), behavior: reduce ? 'instant' : 'smooth' });
  };

  return <section id="recuperados" className="recovery-section section-space"><div className="shell">
    <Reveal className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> PRONTA RESPOSTA. PROTEÇÃO NA PRÁTICA.</div><h2>Rastrear é o começo.<br /><span className="gold-text">Recuperar é a nossa missão.</span></h2></div><p className="recovery-intro">Tecnologia para localizar. Uma equipe de pronta resposta para atuar na recuperação de veículos roubados com rastreador.</p></Reveal>
    <Reveal className="response-panel" effect="zoom">
      <div className="response-steps" role="tablist" aria-label="Como funciona a pronta resposta">{steps.map(({ name, icon: Icon }, index) => <button type="button" key={name} ref={node => { stepButtons.current[index] = node; }} id={`response-tab-${index}`} role="tab" aria-selected={step === index} aria-controls="response-details" tabIndex={step === index ? 0 : -1} onClick={() => setStep(index)} onKeyDown={event => { let next = index; if (event.key === 'ArrowRight') next = (index + 1) % steps.length; else if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = steps.length - 1; else return; event.preventDefault(); setStep(next); stepButtons.current[next]?.focus(); }}><span className="response-number">0{index + 1}</span><Icon size={21} /><span>{name}</span><ArrowRight size={15} /></button>)}</div>
      <div className="response-details" id="response-details" role="tabpanel" aria-labelledby={`response-tab-${step}`} tabIndex={0}><div className="response-icon"><StepIcon size={35} strokeWidth={1.3} /></div><div key={step} className="response-copy"><span className="eyebrow">{steps[step].label}</span><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div><a className="text-link" href={whatsappLink('Olá! Gostaria de conhecer os planos com equipe de pronta resposta.')} target="_blank" rel="noopener noreferrer">Conhecer a proteção <ArrowUpRight size={17} /></a></div>
    </Reveal>

    <Reveal className="recovery-gallery-heading"><div><h3>Histórias reais. <span>Patrimônios recuperados.</span></h3><p>Registros do acervo institucional da GTBLOCK. Toque nas fotos para ampliar.</p></div><div className="gallery-filters" role="group" aria-label="Filtrar veículos recuperados">{['Todos', 'Carros', 'Motos'].map(value => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div></Reveal>
    <div className="recovery-carousel" ref={track} onScroll={updateEdges} aria-label="Fotos de veículos recuperados" tabIndex={0}>{filtered.map(photo => <article className="recovery-photo-card" key={photo.id}><button type="button" className="recovery-photo-button" aria-label={`Ampliar foto: ${photo.alt}`} onClick={() => setSelected(filtered.indexOf(photo))}><Image src={`/images/recuperados/registro-${photo.id}.webp`} alt={photo.alt} width={800} height={800} sizes="(max-width: 600px) 80vw, (max-width: 900px) 45vw, 380px" /><span className="photo-expand"><Expand size={17} /> Ampliar</span></button><div className="photo-caption"><span><Car size={15} />{photo.title}</span><span>ACERVO GTBLOCK</span></div></article>)}</div>
    <div className="gallery-bottom"><div className="gallery-arrows"><span>Arraste para explorar</span><button type="button" aria-label="Fotos anteriores" disabled={edges.start} onClick={() => moveTrack(-1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Próximas fotos" disabled={edges.end} onClick={() => moveTrack(1)}><ArrowRight size={18} /></button></div></div>

    <dialog className="recovery-dialog" ref={dialog} aria-labelledby="recovery-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); } }}>
      {currentPhoto && <div className="recovery-dialog-content"><div className="dialog-heading"><h3 id="recovery-dialog-title">{currentPhoto.title}</h3><button className="dialog-close" type="button" aria-label="Fechar foto ampliada" autoFocus onClick={() => setSelected(null)}><X size={23} /></button></div><Image className="dialog-photo" src={`/images/recuperados/registro-${currentPhoto.id}.webp`} alt={currentPhoto.alt} width={800} height={800} sizes="(max-width: 600px) 90vw, 70vh" /><div className="dialog-bottom"><button type="button" aria-label="Foto anterior" onClick={() => movePhoto(-1)}><ArrowLeft size={20} /></button><span aria-live="polite">{(selected ?? 0) + 1} / {filtered.length} · Acervo GTBLOCK</span><button type="button" aria-label="Próxima foto" onClick={() => movePhoto(1)}><ArrowRight size={20} /></button></div></div>}
    </dialog>
  </div></section>;
}
