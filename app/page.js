import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Products from '@/components/Products';
import Quality from '@/components/Quality';
import Lifecycle from '@/components/Lifecycle';
import Faq from '@/components/Faq';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <section id="home" className="hero" aria-label="Introduction"><Hero /></section>
      <section id="stats" className="stats-bar" aria-label="Key Performance Indicators"><Stats /></section>
      <section id="about" className="sec about" aria-label="About"><About /></section>
      <section id="certificates" className="sec sec--alt" aria-label="Certificates & Test Reports"><Quality showWhy={false} viewAll={true} /></section>
      <section id="products" className="sec" aria-label="Products"><Products /></section>
      <section id="quality" className="sec sec--alt" aria-label="Why Work With BPEL"><Quality showCerts={false} /></section>
      <section id="lifecycle" className="sec sec--dark" aria-label="Project Lifecycle"><Lifecycle /></section>
      <section id="faq" className="sec" aria-label="FAQ"><Faq /></section>
      <section id="partners" className="sec sec--alt sec--tight" aria-label="Our Partners"><Partners /></section>
      <section id="contact" className="sec" aria-label="Contact"><Contact /></section>
    </>
  );
}
