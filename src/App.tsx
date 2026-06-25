import { Background } from "@/components/layout/Background";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Background />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
