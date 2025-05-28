import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import UseCases from "@/components/UseCases";
import Apps from "@/components/Apps";
import Pricing from "@/components/Pricing";
import Testimonials3 from "@/components/Testimonials3";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Metadata } from 'next';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'LearningScience.ai - AI Teaching Assistant for College Professors',
  description: 'Give professors their time back with a 24/7 AI teaching assistant powered by learning science principles. Save 15+ hours per week on routine teaching tasks with DrLeeGPT.',
  keywords: 'AI teaching assistant, college professors, learning science, DrLeeGPT, education AI, professor tools, teaching automation, student support',
};

export default function Home(): JSX.Element {
  return (
    <>
      <main>
        {/* LearningScience.ai - Give professors their time back with a 24/7 AI teaching assistant */}
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <FeaturesAccordion />
        <UseCases />
        <Apps />
        <Pricing />
        <Testimonials3 />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
