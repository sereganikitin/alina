import Hero from "@/components/Hero";
import About from "@/components/About";
import Principles from "@/components/Principles";
import Approach from "@/components/Approach";
import Consultation from "@/components/Consultation";
import Faq from "@/components/Faq";
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Hero />
      <About />
      <Principles />
      <Approach />
      <Consultation />
      <Faq />
      <Contacts />
    </main>
  );
}
