import { ArrowUpRight, Check, LockKeyhole, Radio, ShieldCheck, Signal } from 'lucide-react';
import { Plan, whatsappLink } from '@/lib/site';
export default function PricingCard({ plan }: { plan: Plan }) {
  const highlighted = 'highlighted' in plan && plan.highlighted;
  return <article className={`pricing-card ${highlighted ? 'pricing-featured' : ''}`}>
    {highlighted && <div className="popular-label"><ShieldCheck size={14} /> MAIS VENDIDO</div>}
    <div className="plan-top"><div className="plan-icon">{plan.blocking ? <ShieldCheck size={25} strokeWidth={1.5} /> : <Radio size={25} strokeWidth={1.5} />}</div><span className="generation"><Signal size={11} />{plan.generation}</span></div>
    <h3>{plan.name}</h3><p className="plan-description">{plan.description}</p>
    <div className="plan-price"><span className="currency">R$</span><strong>{plan.price}<span>,{plan.cents}</span></strong><span className="per-month">/mês</span></div>
    <div className="plan-installation">Instalação: a combinar</div>
    <div className="plan-divider" /><ul>{plan.features.map(feature => <li key={feature}><Check size={15} />{feature}</li>)}<li className={plan.blocking ? '' : 'feature-unavailable'}><LockKeyhole size={14} />{plan.blocking ? 'Com bloqueio remoto' : 'Sem bloqueio remoto'}</li></ul>
    <a className={`button ${highlighted ? 'button-gold' : 'button-plan'}`} href={whatsappLink(`Olá! Tenho interesse no plano ${plan.name} de R$ ${plan.price},${plan.cents}/mês. Gostaria de saber mais.`)} target="_blank" rel="noopener noreferrer">Contratar {plan.name}<ArrowUpRight size={17} /></a>
  </article>;
}
