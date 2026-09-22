import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import LenisLock from "./components/LenisLock";
import ConstantScroll from "./components/ConstantScroll";
import Splash from "./components/Splash";
import MusicPlayer from "./components/MusicPlayer";
import FloatingParticles from "./components/FloatingParticles";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import LoveMoment from "./components/LoveMoment";
import FinalMessage from "./components/FinalMessage";
import useScrollLock from "./hooks/useScrollLock";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  useScrollLock(!storyOpen);

  return (
    <SmoothScroll>
      <LenisLock locked={!storyOpen} />
      <ConstantScroll locked={!storyOpen} />
      <Splash onDone={() => setIntroDone(true)} />
      <MusicPlayer>
        <FloatingParticles />
        <div className="grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <main>
          <Hero ready={introDone} onOpen={() => setStoryOpen(true)} />
          <Timeline />
          <LoveMoment />
          <FinalMessage />
        </main>
      </MusicPlayer>
    </SmoothScroll>
  );
}
