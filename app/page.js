import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Products from '@/components/Products';
import Quality from '@/components/Quality';
import Partners from '@/components/Partners';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <section id="home" className="hero" aria-label="Introduction"><Hero /></section>
      <section id="stats" className="stats-bar" aria-label="Key Performance Indicators"><Stats /></section>
      <section id="about" className="sec about" aria-label="About"><About /></section>
      <section id="certificates" className="sec sec--alt" aria-label="Certificates & Test Reports"><Quality showWhy={false} viewAll={true} /></section>
      <section id="products" className="sec" aria-label="Products"><Products /></section>
      <section id="partners" className="sec sec--alt sec--tight" aria-label="Our Partners"><Partners /></section>
    </>
  );
}
