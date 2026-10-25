import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureGrid from '@/components/FeatureGrid';
import TechTabs from '@/components/TechTabs';
import PricingSection from '@/components/PricingSection';
import FAQ from '@/components/FAQ';
import RecoverySection from '@/components/RecoverySection';
import Footer from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollEffects';
export default function Home() {
  return <><noscript><style>{'[data-scroll-reveal]{opacity:1!important;transform:none!important}.map-route{stroke-dasharray:none!important}'}</style></noscript><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><ScrollProgress /><Header /><main id="conteudo"><Hero /><FeatureGrid /><TechTabs /><RecoverySection /><PricingSection /><FAQ /><Footer /></main></>;
}
