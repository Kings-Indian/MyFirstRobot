import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GetStartedSections from '../components/GetStartedSections';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <GetStartedSections />
    </div>
  );
}
