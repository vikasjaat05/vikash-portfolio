import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CinematicTextSection from "./components/CinematicTextSection";
import MetricsSection from "./components/MetricsSection";
import TechnologySection from "./components/TechnologySection";
import ArchitectureSection from "./components/ArchitectureSection";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <HeroSection entranceComplete={entranceComplete} />
      <CinematicTextSection />
      <MetricsSection />
      <TechnologySection />
      <ArchitectureSection />
      <Footer />
    </div>
  );
}

export default App;
