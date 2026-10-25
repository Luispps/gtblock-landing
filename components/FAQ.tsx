import { ArrowUpRight, Plus } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { Reveal } from './ui';
const questions = [
  ['Como faço para contratar?', 'Escolha um plano e clique em contratar. Você será direcionado ao WhatsApp da GTBLOCK, onde um consultor explica as condições e ajuda a agendar a instalação.'],
  ['Qual é a diferença entre rastreamento e bloqueio?', 'O rastreamento permite acompanhar a localização do veículo. O bloqueio remoto é um recurso adicional, disponível nos planos COMBAT e PLUS, que auxilia na imobilização do veículo, com orientação da equipe e conforme as condições de segurança.'],
  ['Qual a diferença entre os planos 2G e 4G?', 'A diferença está na rede móvel utilizada para transmitir os dados do rastreador. O 4G oferece maior capacidade de transmissão. Nossa equipe ajuda a avaliar a cobertura da região e a compatibilidade com o seu veículo antes da contratação.'],
  ['O que devo fazer em caso de roubo ou furto?', 'Entre em contato imediatamente com a central de atendimento da GTBLOCK pelos canais informados na contratação e acione as autoridades. A equipe orientará os próximos passos. Por segurança, não tente recuperar o veículo por conta própria.'],
  ['Qual é o valor da instalação?', 'O valor da instalação é a combinar em todos os planos. Converse com nossa equipe pelo WhatsApp para definir os valores, as condições e o agendamento.'],
];
export default function FAQ() {
  return <section className="faq-section section-space" id="duvidas"><div className="shell faq-grid">
    <Reveal effect="left"><div className="eyebrow"><span className="eyebrow-line" /> SEM DÚVIDAS. MAIS SEGURANÇA.</div><h2>Vamos deixar<br />tudo <span className="muted-heading">claro.</span></h2><p>O primeiro passo para se sentir seguro<br />é entender a sua proteção.</p><a className="text-link" href={whatsappLink('Olá! Tenho uma dúvida sobre o rastreamento GTBLOCK.')} target="_blank" rel="noopener noreferrer">Converse com um especialista <ArrowUpRight size={18} /></a></Reveal>
    <div className="faq-list">{questions.map(([question, answer], index) => <Reveal key={question} delay={index * 0.04}><details className="faq-item"><summary><span className="faq-number">0{index + 1}</span><span>{question}</span><Plus size={19} /></summary><p>{answer}</p></details></Reveal>)}</div>
  </div></section>;
}
