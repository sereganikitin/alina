import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Principles from "@/components/Principles";
import Approach from "@/components/Approach";
import FunFacts from "@/components/FunFacts";
import Consultation from "@/components/Consultation";
import BookingSection from "@/components/BookingSection";
import BlogPreview from "@/components/BlogPreview";
import Contacts from "@/components/Contacts";
import ContentGate from "@/components/ContentGate";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <ContentGate>
        <Hero />
        <About />
        <Education />
        <Principles />
        <Approach />
        <Consultation />
        <FunFacts />
        <BookingSection />
        <BlogPreview />
        <Contacts />
      </ContentGate>
    </main>
  );
}