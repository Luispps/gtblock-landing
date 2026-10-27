'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Car, Check, Crosshair, LockKeyhole, Pause, Play, Radio, RotateCcw, Signal, Smartphone } from 'lucide-react';

type DemoKind = 'rastreamento' | 'bloqueio' | 'conexao';
const route = 'M60 232H175V130H350V80H475';
const blockingSteps = [
  { title: 'Acionamento', description: 'O cliente entra em contato com a equipe.' },
  { title: 'Comando remoto', description: 'A equipe orienta a operação e envia o comando.' },
  { title: 'Proteção acionada', description: 'O recurso auxilia na imobilização, conforme as condições de segurança.' },
];

function Vehicle({ color = '#191e14' }: { color?: string }) {
  return <g fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"><rect x="-17" y="-9" width="34" height="18" rx="6"/><path d="M-5-8 3-5v10l-8 3M10-7v14M-13-6v12M-8-10v-2M8-10v-2M-8 10v2M8 10v2"/></g>;
}

function Packet({ path, duration, delay = '0s' }: { path: string; duration: string; delay?: string }) {
  return <circle r="4" fill="#f3d891"><animateMotion path={path} dur={duration} begin={delay} repeatCount="indefinite" /></circle>;
}

function TrackingScene({ motionAllowed }: { motionAllowed: boolean }) {
  return <>
    <defs><pattern id="demo-city" width="76" height="65" patternUnits="userSpaceOnUse"><rect x="6" y="7" width="62" height="49" rx="6" fill="#22291c" stroke="#343b29"/><path d="M16 17h20v12H16zm29 0h13v28H45zM16 36h20v9H16z" fill="#2c3424"/></pattern></defs>
    <rect x="18" y="18" width="524" height="255" rx="12" fill="url(#demo-city)" opacity=".7"/>
    <path d={route} fill="none" stroke="#10170d" strokeWidth="27" strokeLinejoin="round"/>
    <path d={route} fill="none" stroke="#e4c680" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 7"/>
    <circle cx="60" cy="232" r="6" fill="#171d12" stroke="#dfc07b" strokeWidth="2"/>
    <circle className="demo-beacon" cx="475" cy="80" r="19" fill="none" stroke="#dfc07b" strokeOpacity=".4"/>
    <circle cx="475" cy="80" r="6" fill="#dfc07b"/>
    <g transform="translate(26 28)"><rect width="159" height="30" rx="5" fill="#141b11" stroke="#bbad7145"/><circle cx="14" cy="15" r="3" fill="#b6d096"/><text x="25" y="19" fill="#cad6ba" fontSize="9" letterSpacing="1">TRAJETO ILUSTRATIVO</text></g>
    <g transform="translate(419 151)"><rect width="86" height="125" rx="13" fill="#11180e" stroke="#a99a6590" strokeWidth="2"/><rect x="8" y="18" width="70" height="87" rx="5" fill="#25331d"/><path d="M30 0h26v7H30" stroke="#a99a6580"/><path d="m15 90 17-28 13 12 23-37" stroke="#d8bd79" strokeWidth="2" fill="none"/><circle cx="68" cy="37" r="4" fill="#e9cd87"/><text x="43" y="117" textAnchor="middle" fill="#e6d39e" fontSize="7">LOCALIZADO</text></g>
    <path d="M475 99V142" stroke="#e4c680" strokeOpacity=".35" strokeDasharray="3 5"/>
    {motionAllowed && <Packet path="M475 99V142" duration="2.2s" />}
    {motionAllowed ? <g><animateMotion path={route} dur="8s" rotate="auto" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="linear" repeatCount="indefinite"/><circle r="25" fill="#e6c982" fillOpacity=".12"/><circle r="19" fill="#e6c982"/><g transform="scale(.77)"><Vehicle /></g></g> : <g transform="translate(350 130)"><circle r="19" fill="#e6c982"/><g transform="scale(.77)"><Vehicle /></g></g>}
    <text x="66" y="259" fill="#879875" fontSize="9">SAÍDA</text><text x="378" y="64" fill="#c5b887" fontSize="9">LOCALIZAÇÃO</text>
  </>;
}

function BlockingScene({ stage, motionAllowed }: { stage: number; motionAllowed: boolean }) {
  return <>
    <path d="M153 140H233M327 140H407" stroke="#485639" strokeWidth="2" strokeDasharray="5 6"/>
    <path d="M153 140H233M327 140H407" stroke="#dfc07b" strokeWidth="2" opacity={stage >= 1 ? .7 : 0}/>
    {stage === 1 && motionAllowed && <><Packet path="M153 140H233" duration="1.1s" /><Packet path="M327 140H407" duration="1.1s" delay=".4s" /></>}
    {[100, 280, 460].map((x, index) => <g key={x}><circle cx={x} cy="140" r="51" fill={stage >= index ? '#28341d' : '#1a2315'} stroke={stage >= index ? '#b5a16b' : '#3b4930'} strokeWidth="1.5"/><circle cx={x} cy="140" r="61" fill="none" stroke="#7c86532b"/></g>)}
    <g transform="translate(100 140)" fill="none" stroke="#ddc181" strokeWidth="2"><rect x="-23" y="-17" width="46" height="29" rx="4"/><path d="M-13 24h26M0 12v12M-11-5h22M-11 2H3"/></g>
    <g transform="translate(280 140)" fill="none" stroke="#ddc181" strokeWidth="2"><path d="M0-25v47M-14 22h28M-10 4l10-20L10 4M-23-17q-15 17 0 34M23-17q15 17 0 34M-15-10q-9 10 0 20M15-10q9 10 0 20"/></g>
    <g transform="translate(460 140) scale(1.3)"><Vehicle color={stage === 2 ? '#e8cc88' : '#8b9a79'} /></g>
    {stage === 2 && <g className="demo-lock-confirmed" transform="translate(486 105)"><circle r="20" fill="#e4c680"/><path d="M-7-2v-4a7 7 0 0 1 14 0v4M-10-2h20v14h-20Z" fill="none" stroke="#202a17" strokeWidth="2"/><path d="m-4 5 3 3 5-5" fill="none" stroke="#202a17" strokeWidth="2"/></g>}
    <text x="100" y="232" textAnchor="middle" fill="#bbc6a8" fontSize="11">CENTRAL</text><text x="280" y="232" textAnchor="middle" fill="#bbc6a8" fontSize="11">REDE MÓVEL</text><text x="460" y="232" textAnchor="middle" fill="#bbc6a8" fontSize="11">VEÍCULO</text>
    <text x="280" y="276" textAnchor="middle" fill="#80916e" fontSize="10">RASTREAMENTO + ATUAÇÃO DA EQUIPE</text>
  </>;
}

function ConnectionScene({ network, motionAllowed }: { network: '2G' | '4G'; motionAllowed: boolean }) {
  const duration = network === '4G' ? '2.8s' : '4.8s';
  return <>
    <path d="M99 180Q165 76 268 126T466 163" stroke="#a89660" strokeOpacity=".4" strokeWidth="2" fill="none" strokeDasharray="4 6"/>
    <path d="M99 180Q165 76 268 126T466 163" stroke="#d9bf7c" strokeOpacity=".08" strokeWidth="13" fill="none"/>
    {motionAllowed && <>{[0, 1, 2, ...(network === '4G' ? [3, 4] : [])].map(index => <Packet key={index} path="M99 180Q165 76 268 126T466 163" duration={duration} delay={`-${index * 1.1}s`} />)}</>}
    <g transform="translate(95 183)"><rect x="-39" y="-31" width="78" height="62" rx="11" fill="#25311c" stroke="#a89967"/><g transform="scale(1.3)"><Vehicle color="#e5ca88" /></g><circle cx="29" cy="-22" r="3" fill="#b6d096"/></g>
    <g transform="translate(280 133)" stroke="#ddc181" strokeWidth="2" fill="none"><path d="M0-34v99M-25 65h50M-20 51l20-66 20 66M-12 18h24M-17 34h34M-22-34q-20 23 0 46M22-34q20 23 0 46M-34-45q-29 34 0 68M34-45q29 34 0 68"/><circle cy="-22" r="5" fill="#dfc07b"/></g>
    <g transform="translate(467 161)"><rect x="-33" y="-60" width="66" height="120" rx="11" fill="#11180e" stroke="#a99a65" strokeWidth="2"/><rect x="-25" y="-42" width="50" height="78" rx="5" fill="#26351c"/><path d="M-10-60h20v7h-20" fill="#11180e" stroke="#a99a65"/><circle cy="-10" r="11" fill="#e1c17a" fillOpacity=".14"/><path d="M0-23a9 9 0 0 1 9 9c0 7-9 16-9 16s-9-9-9-16a9 9 0 0 1 9-9Z" fill="none" stroke="#e1c17a" strokeWidth="2"/><circle cy="-14" r="3" fill="#e1c17a"/><text x="0" y="51" textAnchor="middle" fill="#dbc68f" fontSize="7">LOCALIZAÇÃO</text></g>
    <text x="95" y="254" textAnchor="middle" fill="#bbc6a8" fontSize="10">RASTREADOR</text><text x="280" y="254" textAnchor="middle" fill="#e5ca88" fontSize="12">REDE {network}</text><text x="467" y="254" textAnchor="middle" fill="#bbc6a8" fontSize="10">VOCÊ</text>
  </>;
}

export default function TechnologyDemo({ kind }: { kind: DemoKind }) {
  const scene = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(scene, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [stage, setStage] = useState(0);
  const [network, setNetwork] = useState<'2G' | '4G'>('4G');
  const playing = inView && pageVisible && !paused && !reduce;
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    if (playing) element.unpauseAnimations(); else element.pauseAnimations();
  }, [playing, cycle, network, reduce]);
  useEffect(() => {
    if (kind !== 'bloqueio' || !playing || stage >= 2) return;
    const timer = window.setTimeout(() => setStage(value => Math.min(value + 1, 2)), 2200);
    return () => window.clearTimeout(timer);
  }, [kind, playing, stage]);
  const restart = () => { setStage(0); setCycle(value => value + 1); setPaused(false); };
  const heading = kind === 'rastreamento' ? 'Cada movimento, no seu radar.' : kind === 'bloqueio' ? 'Da central até o veículo.' : 'Como a localização chega até você.';
  const summary = kind === 'rastreamento' ? 'Um veículo percorre uma rota e transmite a localização para o celular.' : kind === 'bloqueio' ? 'A central envia um comando pela rede móvel até o veículo, com atuação da equipe.' : `O rastreador transmite dados pela rede ${network} para consulta da localização.`;

  return <div className={`tech-demo demo-${kind}`} data-playing={playing}>
    <div className="demo-toolbar"><span><Crosshair size={14} /> GTBLOCK <b>EXPLICA</b></span><div><button type="button" onClick={() => setPaused(value => !value)} disabled={!!reduce} aria-label={reduce ? 'Animação desativada por preferência de movimento reduzido' : paused ? 'Reproduzir demonstração' : 'Pausar demonstração'} aria-pressed={paused}>{paused || reduce ? <Play size={15} /> : <Pause size={15} />}</button><button type="button" onClick={restart} disabled={!!reduce} aria-label="Reiniciar demonstração"><RotateCcw size={15} /></button></div></div>
    <div className="demo-heading"><span className="demo-kicker">{kind === 'rastreamento' ? '01 / RASTREAMENTO' : kind === 'bloqueio' ? '02 / BLOQUEIO REMOTO' : '03 / CONEXÃO MÓVEL'}</span><h4>{heading}</h4></div>
    {kind === 'conexao' && <div className="demo-network-toggle" role="group" aria-label="Escolher tecnologia da demonstração">{(['2G', '4G'] as const).map(value => <button type="button" key={value} aria-pressed={network === value} onClick={() => setNetwork(value)}><Signal size={14} /> {value}<span>{value === '2G' ? 'Custo-benefício' : 'Mais capacidade'}</span></button>)}</div>}
    <div className="demo-scene" ref={scene}><svg ref={svg} key={`${cycle}-${network}`} className="demo-canvas" viewBox="0 0 560 300" role="img" aria-label={summary}>
      {kind === 'rastreamento' ? <TrackingScene motionAllowed={!reduce} /> : kind === 'bloqueio' ? <BlockingScene stage={stage} motionAllowed={!reduce} /> : <ConnectionScene network={network} motionAllowed={!reduce} />}
    </svg></div>
    {kind === 'rastreamento' && <div className="demo-tracking-footer"><div><Car size={17} /><span>Veículo em movimento</span></div><ArrowRight size={14} /><div><Smartphone size={17} /><span>Localização disponível</span></div></div>}
    {kind === 'bloqueio' && <><div className="demo-blocking-steps" role="group" aria-label="Explorar etapas do bloqueio">{blockingSteps.map((step, index) => <button key={step.title} type="button" aria-pressed={stage === index} onClick={() => { setStage(index); setPaused(true); }}><span>{stage > index ? <Check size={11} /> : `0${index + 1}`}</span>{step.title}</button>)}</div><div className="demo-stage-caption"><LockKeyhole size={15} /><p>{blockingSteps[stage].description}</p></div></>}
    {kind === 'conexao' && <div className="demo-connection-footer"><Radio size={19} /><div><strong>{network === '2G' ? 'Localização com foco no custo-benefício.' : 'Maior capacidade para transmitir dados.'}</strong><span>{network === '2G' ? 'Transmissão dos dados do rastreador pela rede 2G.' : 'Transmissão dos dados do rastreador pela rede 4G.'}</span></div></div>}
    <p className="demo-disclaimer">{kind === 'conexao' ? 'Fluxo ilustrativo, sem escala de velocidade. Sujeito à cobertura da rede.' : kind === 'bloqueio' ? 'Demonstração ilustrativa. Acionamento pela equipe, conforme condições de segurança.' : 'Demonstração ilustrativa. Não representa a localização de um veículo real.'}{reduce && <span> Movimento reduzido ativado.</span>}</p>
  </div>;
}
