import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Crosshair, ShieldCheck, Signal } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './ui';
import { HeroBackdrop } from './ScrollEffects';

export default function Hero() {
  return <>
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <HeroBackdrop><Image className="hero-image" src="/images/gtblock-hero.webp" alt="SUV preto com iluminação dourada" fill sizes="100vw" priority /></HeroBackdrop>
      <div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
      <div className="shell hero-content">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" /> SEGURANÇA QUE ACOMPANHA VOCÊ</div>
          <h1 id="hero-title">Seu próximo<br />destino.<br /><span className="gold-text">Mais seguro.</span></h1>
          <p>Você segue a vida. A gente protege o caminho.<br className="desktop-break" /> Rastreamento 24h, bloqueio remoto e uma equipe pronta para agir pelo seu veículo.</p>
          <div className="hero-buttons">
            <a className="button button-gold" href={whatsappLink('Olá! Quero proteger meu veículo com a GTBLOCK.')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Proteger meu veículo <ArrowUpRight size={19} /></a>
            <a className="button button-outline" href="#planos">Conheça os planos <ArrowDown size={17} /></a>
          </div>
          <div className="hero-reassurance"><ShieldCheck size={17} /><span>Tecnologia no rastreamento. Pessoas na proteção.</span></div>
        </div>
        <div className="hero-tracking" aria-label="Ilustração de veículo monitorado">
          <div className="target-marker"><Crosshair size={23} /><span /></div>
          <div className="tracking-callout"><div className="callout-top"><span className="live-dot" /><span>PROTEÇÃO EM MOVIMENTO</span><Signal size={15} /></div><strong>Seu veículo, no seu radar.</strong><div className="callout-bottom"><span>Rastreamento inteligente</span><span className="gold-text">24h / 7 dias</span></div></div>
        </div>
        <div className="hero-bottom"><a href="#empresa"><span className="scroll-indicator"><ArrowDown size={13} /></span> TRANQUILIDADE EM CADA TRAJETO</a><span>RASTREAR. PROTEGER. RECUPERAR.</span></div>
      </div>
    </section>
    <div className="service-ribbon" aria-label="Serviços GTBLOCK"><div className="shell ribbon-inner"><span>RASTREAMENTO 24H</span><i>✦</i><span>BLOQUEIO REMOTO</span><i>✦</i><span>PRONTA RESPOSTA</span><i>✦</i><span>TECNOLOGIA 4G</span><i>✦</i><span>MAIS TRANQUILIDADE</span></div></div>
  </>;
}
