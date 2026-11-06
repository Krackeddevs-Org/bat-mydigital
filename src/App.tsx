import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Format, { StatsStrip } from './sections/Format';
import Syllabus from './sections/Syllabus';
import Samples from './sections/Samples';
import Sessions from './sections/Sessions';
import ShowTell from './sections/ShowTell';
import Certificate from './sections/Certificate';
import { Faq, FinalCta, Footer } from './sections/Closing';

export default function App() {
  return (
    <>
      <a
        href="#format"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <Format />
        <Syllabus />
        <Samples />
        <Sessions />
        <ShowTell />
        <Certificate />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
