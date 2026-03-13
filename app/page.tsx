import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Storia from './components/Storia';
import Momenti from './components/Momenti';
import MenuPreview from './components/MenuPreview';
import InfoOrari from './components/InfoOrari';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Storia />
        <Marquee dark />
        <Momenti />
        <Marquee />
        <MenuPreview />
        <InfoOrari />
      </main>
      <Footer />
    </>
  );
}
