import Image from 'next/image';
import { ArrowUpRight, Crosshair, Headphones, Radio, ShieldCheck } from 'lucide-react';
import { Reveal } from './ui';
const features = [
  { icon: Crosshair, number: '01', title: 'Sempre no radar', text: 'Rastreamento 24 horas para acompanhar a localização do seu veículo.' },
  { icon: Headphones, number: '02', title: 'Gente de verdade', text: 'Atendimento especializado para orientar você quando mais precisa.' },
  { icon: Radio, number: '03', title: 'Prontos para agir', text: 'Equipe de pronta resposta dedicada à recuperação do seu patrimônio.' },
  { icon: ShieldCheck, number: '04', title: 'Controle à distância', text: 'Bloqueio remoto nos planos compatíveis, com orientação da nossa equipe.' },
];
export default function FeatureGrid() {
  return <section id="empresa" className="company-section section-space"><div className="shell">
    <div className="company-intro"><Reveal effect="left"><div className="eyebrow"><span className="eyebrow-line" /> MUITO ALÉM DE UM RASTREADOR</div><h2>O seu patrimônio.<br />A nossa <span className="muted-heading">missão.</span></h2></Reveal><Reveal effect="right" delay={0.12} className="company-text"><p>A GTBLOCK é especializada em recuperação de veículos roubados, com um sistema de rastreamento e bloqueio de última geração.</p><p>Por trás de cada sinal no mapa, existe o nosso compromisso com a sua tranquilidade. Unimos tecnologia e uma equipe de pronta resposta para proteger o que você conquistou.</p><a className="text-link" href="#tecnologia">Conheça a tecnologia por trás da proteção <ArrowUpRight size={18} /></a></Reveal></div>
    <div className="features-grid">{features.map(({ icon: Icon, number, title, text }, index) => <Reveal className="feature" key={number} delay={index * 0.06}><div className="feature-top"><Icon size={26} strokeWidth={1.3} /><span>{number}</span></div><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
    <Reveal className="brand-statement" effect="left"><Image src="/brand/gtblock-symbol.webp" alt="" width={36} height={34} /><p>Proteção para o veículo.<span> Liberdade para você.</span></p><span className="statement-line" /></Reveal>
  </div></section>;
}
