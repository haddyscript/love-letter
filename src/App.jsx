import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Splash from "./components/Splash";
import MusicPlayer from "./components/MusicPlayer";
import FloatingParticles from "./components/FloatingParticles";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import LoveMoment from "./components/LoveMoment";
import FinalMessage from "./components/FinalMessage";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <SmoothScroll>
      <Splash onDone={() => setIntroDone(true)} />
      <MusicPlayer />
      <FloatingParticles />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <main>
        <Hero ready={introDone} />
        <Timeline />
        <LoveMoment />
        <FinalMessage />
      </main>
    </SmoothScroll>
  );
}
