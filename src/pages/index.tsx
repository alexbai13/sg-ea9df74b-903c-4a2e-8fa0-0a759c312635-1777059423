import React from "react";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ValuesSection } from "@/components/ValuesSection";
import { BlogPreview } from "@/components/BlogPreview";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <ValuesSection />
        <BlogPreview />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}