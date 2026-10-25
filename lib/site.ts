export const company = {
  phone: '(71) 9345-7167',
  whatsapp: '557193457167',
  instagram: 'https://www.instagram.com/gtblockcomercial/',
  instagramHandle: '@gtblockcomercial',
  tracking: 'https://sis.getrak.com/gtblock/',
};

export function whatsappLink(message = 'Olá! Gostaria de saber mais sobre os planos de rastreamento GTBLOCK.') {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const plans = [
  { name: 'SIGA-ME', price: '49', cents: '90', description: 'Seu veículo sempre no radar.', generation: '2G', blocking: false, features: ['Rastreamento 24 horas', 'Acompanhamento da localização', 'Atendimento especializado'] },
  { name: 'COMBAT', price: '59', cents: '90', description: 'Proteção que vai além de localizar.', generation: '2G', blocking: true, highlighted: true, features: ['Rastreamento 24 horas', 'Atendimento especializado', 'Equipe de pronta resposta'] },
  { name: 'STANDARD', price: '79', cents: '90', description: 'Mais conexão em cada trajeto.', generation: '4G', blocking: false, features: ['Rastreamento 24 horas', 'Conexão com tecnologia 4G', 'Atendimento especializado'] },
  { name: 'PLUS', price: '89', cents: '90', description: 'Tecnologia e controle juntos.', generation: '4G', blocking: true, features: ['Rastreamento 24 horas', 'Conexão com tecnologia 4G', 'Equipe de pronta resposta'] },
];
export type Plan = (typeof plans)[number];
