import SmoothScroll from "./components/SmoothScroll";
import MusicPlayer from "./components/MusicPlayer";
import FloatingParticles from "./components/FloatingParticles";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import LoveMoment from "./components/LoveMoment";
import FinalMessage from "./components/FinalMessage";

export default function App() {
  return (
    <SmoothScroll>
      <MusicPlayer />
      <FloatingParticles />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <main>
        <Hero />
        <Timeline />
        <LoveMoment />
        <FinalMessage />
      </main>
    </SmoothScroll>
  );
}
