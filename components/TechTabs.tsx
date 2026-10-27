'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Crosshair, LockKeyhole, Wifi } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { Reveal } from './ui';
import TechnologyDemo from './TechnologyDemo';
const tabs = [
  { id: 'rastreamento', label: 'Rastreamento', icon: Crosshair, eyebrow: 'O SEU VEÍCULO, MAIS PERTO', title: ['A distância muda.', 'O cuidado, não.'], description: 'Acompanhe a localização do seu veículo e tenha mais visibilidade sobre cada trajeto. Tecnologia para transformar informação em tranquilidade.', bullets: ['Localização disponível para consulta', 'Monitoramento 24 horas', 'Mais controle sobre o seu patrimônio'] },
  { id: 'bloqueio', label: 'Bloqueio remoto', icon: LockKeyhole, eyebrow: 'MAIS UMA CAMADA DE PROTEÇÃO', title: ['Uma resposta rápida.', 'Mesmo à distância.'], description: 'Em caso de roubo ou emergência, o bloqueio remoto auxilia a impedir a continuidade do deslocamento. A atuação é orientada pela equipe, conforme as condições de segurança.', bullets: ['Disponível nos planos COMBAT e PLUS', 'Acionamento com suporte especializado', 'Apoio à operação de recuperação'] },
  { id: 'conexao', label: 'Conexão 2G e 4G', icon: Wifi, eyebrow: 'TECNOLOGIA PARA A SUA ROTINA', title: ['A conexão ideal', 'para o seu caminho.'], description: 'O rastreador utiliza a rede móvel para transmitir a localização. Conheça as opções e escolha com a nossa equipe a tecnologia adequada ao seu veículo e à sua região.', bullets: ['2G: uma opção com foco no custo-benefício', '4G: maior capacidade de transmissão de dados', 'Disponibilidade sujeita à cobertura da rede'] },
] as const;
export default function TechTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];
  return <section id="tecnologia" className="technology-section section-space"><div className="shell">
    <Reveal className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> CONECTADO AO QUE IMPORTA</div><h2>Tecnologia que você vê.<br /><span className="muted-heading">Segurança que você sente.</span></h2></div><span className="section-index">/ 02 — TECNOLOGIA</span></Reveal>
    <Reveal className="tech-panel" effect="zoom">
      <div className="tech-tabs" role="tablist" aria-label="Recursos de rastreamento">{tabs.map(({ id, label, icon: Icon }, index) => <button key={id} ref={el => { refs.current[index] = el; }} id={`tab-${id}`} type="button" role="tab" aria-selected={active === index} aria-controls={`panel-${id}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => { let next = index; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = tabs.length - 1; else return; event.preventDefault(); setActive(next); refs.current[next]?.focus(); }}><Icon size={18} />{label}<span>0{index + 1}</span></button>)}</div>
      <div className="tech-content" role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} tabIndex={0}>
        <div className="tech-copy" key={tab.id}><div className="eyebrow">{tab.eyebrow}</div><h3>{tab.title.map(line => <span key={line}>{line}<br /></span>)}</h3><p>{tab.description}</p><ul>{tab.bullets.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul><a className="text-link" href={whatsappLink('Olá! Quero entender melhor a tecnologia de rastreamento da GTBLOCK.')} target="_blank" rel="noopener noreferrer">Tire suas dúvidas com a gente <ArrowUpRight size={17} /></a></div>
        <div className="tech-visual"><TechnologyDemo key={tab.id} kind={tab.id} /></div>
      </div>
    </Reveal>
    <div className="how-it-works"><Reveal><div className="eyebrow">SIMPLES DESDE O PRIMEIRO PASSO</div><h3>Sua proteção começa aqui.</h3></Reveal><div className="steps">{[{ n: '01', title: 'Escolha seu plano', text: 'Encontre a proteção que combina com você.' }, { n: '02', title: 'Agende a instalação', text: 'Nossa equipe orienta você em cada etapa.' }, { n: '03', title: 'Siga com tranquilidade', text: 'Seu veículo conectado à proteção GTBLOCK.' }].map(step => <Reveal key={step.n} className="step"><span>{step.n}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></Reveal>)}</div></div>
  </div></section>;
}
