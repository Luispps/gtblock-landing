import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'GTBLOCK | Seu próximo destino. Mais seguro.',
  description: 'Proteja seu veículo com rastreamento 24h, bloqueio remoto e a equipe de pronta resposta GTBLOCK. Conheça os planos a partir de R$ 49,90/mês.',
  icons: { icon: '/brand/gtblock-symbol.webp' },
  openGraph: {
    title: 'GTBLOCK | Proteção que segue com você',
    description: 'Tecnologia no rastreamento. Pessoas na proteção. Conheça os planos GTBLOCK.',
    locale: 'pt_BR',
    type: 'website',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className="dark"><body>{children}</body></html>;
}
