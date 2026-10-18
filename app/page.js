import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Products from '@/components/Products';
import Industries from '@/components/Industries';
import Projects from '@/components/Projects';
import Quality from '@/components/Quality';
import Lifecycle from '@/components/Lifecycle';
import Faq from '@/components/Faq';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import Chatbot from '@/components/Chatbot';
import Dialog from '@/components/Dialog';
import Search from '@/components/Search';
import Motion from '@/components/Motion';

export default function Home() {
  return (
    <>
      <a className="skip" href="#home">Skip to content</a>
      <Header />
      <main>
        <section id="home" className="hero" aria-label="Introduction"><Hero /></section>
        <section id="stats" className="stats-bar" aria-label="Key Performance Indicators"><Stats /></section>
        <section id="about" className="sec about" aria-label="About"><About /></section>
        <section id="products" className="sec sec--alt" aria-label="Products"><Products /></section>
        <section id="industries" className="sec sec--dark" aria-label="Industries"><Industries /></section>
        <section id="projects" className="sec" aria-label="Projects"><Projects /></section>
        <section id="quality" className="sec sec--alt" aria-label="Why Work With BPEL"><Quality /></section>
        <section id="lifecycle" className="sec sec--dark" aria-label="Project Lifecycle"><Lifecycle /></section>
        <section id="faq" className="sec" aria-label="FAQ"><Faq /></section>
        <section id="partners" className="sec sec--alt sec--tight" aria-label="Our Partners"><Partners /></section>
        <section id="contact" className="sec" aria-label="Contact"><Contact /></section>
      </main>
      <Footer />
      <FloatingActions />
      <Chatbot />
      <Dialog />
      <Search />
      <Motion />
    </>
  );
}
