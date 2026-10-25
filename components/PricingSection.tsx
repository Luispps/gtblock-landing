import { ArrowUpRight, BadgeCheck, Sparkles } from 'lucide-react';
import { plans, whatsappLink } from '@/lib/site';
import PricingCard from './PricingCard';
import { Reveal } from './ui';
export default function PricingSection() {
  const promotion = new Date() < new Date('2026-11-01T00:00:00-03:00');
  return <section id="planos" className="pricing-section section-space"><div className="pricing-pattern" aria-hidden="true" /><div className="shell">
    <Reveal className="pricing-heading"><div className="eyebrow"><span className="eyebrow-line" /> O PLANO CERTO PARA VOCÊ</div><h2>Seu veículo vale muito.<br /><span>Sua proteção pode custar pouco.</span></h2><p>Escolha como quer proteger o que é seu. A gente cuida do caminho.</p></Reveal>
    {promotion && <Reveal className="promo-banner"><span><Sparkles size={18} /><strong>Um motivo a mais para começar.</strong> No COMBAT, a instalação é por nossa conta.</span><span className="promo-deadline">ATÉ 31/10/2026</span></Reveal>}
    <div className="pricing-grid">{plans.map((plan, index) => <Reveal key={plan.name} effect="zoom" delay={index * 0.12}><PricingCard plan={plan} promotion={promotion} /></Reveal>)}</div>
    <div className="pricing-note"><span><BadgeCheck size={15} /> Instalação de R$ 100,00 nos demais planos. Consulte as condições de contratação.</span><a href={whatsappLink('Olá! Preciso de ajuda para escolher meu plano de rastreamento.')} target="_blank" rel="noopener noreferrer">Ajude-me a escolher <ArrowUpRight size={15} /></a></div>
  </div></section>;
}
