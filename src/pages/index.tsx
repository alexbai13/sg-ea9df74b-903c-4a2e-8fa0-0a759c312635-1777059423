import React from "react";
import dynamic from "next/dynamic";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";

// Lazy loaded components for below-the-fold content to improve initial load time
const ServicesSection = dynamic(() => import("@/components/ServicesSection").then(mod => mod.ServicesSection));
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => mod.HowItWorks));
const ComparisonSection = dynamic(() => import("@/components/ComparisonSection").then(mod => mod.ComparisonSection));
const Testimonials = dynamic(() => import("@/components/Testimonials").then(mod => mod.Testimonials));
const ValuesSection = dynamic(() => import("@/components/ValuesSection").then(mod => mod.ValuesSection));
const BlogPreview = dynamic(() => import("@/components/BlogPreview").then(mod => mod.BlogPreview));
const LeadForm = dynamic(() => import("@/components/LeadForm").then(mod => mod.LeadForm));
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => mod.FAQ));
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton").then(mod => mod.WhatsAppButton));
const StickyCTA = dynamic(() => import("@/components/StickyCTA").then(mod => mod.StickyCTA));

export default function Home() {
  return (
    <>
      <SEO 
        title="ALDALU | Brokers de Creditaria en Querétaro" 
        description="Brokers de Creditaria en Querétaro. Encuentra la mejor tasa para tu crédito hipotecario, crédito automotriz asociados a Kavak o préstamos personales para pensionados del IMSS."
        image="/og-image.png"
      />
      <Navigation />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <ServicesSection />
        <HowItWorks />
        <ComparisonSection />
        <Testimonials />
        <ValuesSection />
        <BlogPreview />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyCTA />
    </>
  );
}