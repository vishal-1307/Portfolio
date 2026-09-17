import { Hero } from "@/components/hero/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Founder } from "@/components/sections/Founder";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <About />
      <Work />
      <Founder />
      <Stack />
      <Contact />
    </>
  );
}
