import { useRef } from "react";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProfileCardJourney } from "@/components/ProfileCardJourney";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";

export default function App() {
  const heroProfileSlotRef = useRef<HTMLDivElement>(null);
  const aboutProfileSlotRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <ProfileCardJourney
        heroSlotRef={heroProfileSlotRef}
        aboutSlotRef={aboutProfileSlotRef}
      />
      <main className="min-w-0 overflow-x-clip">
        <Hero heroProfileSlotRef={heroProfileSlotRef} />
        <Services />
        <About aboutProfileSlotRef={aboutProfileSlotRef} />
        <Projects />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
