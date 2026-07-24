import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Principles from "@/components/Principles";
import Approach from "@/components/Approach";
import Consultation from "@/components/Consultation";
import BlogPreview from "@/components/BlogPreview";
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Hero />
      <About />
      <Education />
      <Principles />
      <Approach />
      <Consultation />
      <BlogPreview />
      <Contacts />
    </main>
  );
}