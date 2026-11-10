import { Hero } from "@/components/sections/Hero";
import { Bento } from "@/components/sections/Bento";
import { Work } from "@/components/sections/Work";
import { MoreProjects } from "@/components/sections/MoreProjects";
import { Impact } from "@/components/sections/Impact";
import { Skills } from "@/components/sections/Skills";
import { Activity } from "@/components/sections/Activity";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bento />
      <Work />
      <MoreProjects />
      <Impact />
      <Skills />
      <Activity />
      <Contact />
    </>
  );
}
