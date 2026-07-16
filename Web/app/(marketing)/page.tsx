import Background from "@/components/landing/background";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import Dashboard from "@/components/landing/dashboard";
import Stats from "@/components/landing/stats";
import Integrations from "@/components/landing/integrations";
import Timeline from "@/components/landing/timeline";
import Testimonials from "@/components/landing/testimonials";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function MarketingPage() {
  return (
    <>
      <Background />

      <Navbar />

      <section className="relative z-10">
        <Hero />

        <Dashboard />

        <Stats />

        <Integrations />

        <Timeline />

        <Testimonials />

        <CTA />
      </section>
      <Footer />
    </>
  );
}