import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import QualificationForm from "@/components/QualificationForm";
import WhyUsSection from "@/components/WhyUsSection";
import MidCTA from "@/components/MidCTA";
import SystemSection from "@/components/SystemSection";
import StepsSection from "@/components/StepsSection";
import VideoTestimonialsSection from "@/components/VideoTestimonialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientWinsSection from "@/components/ClientWinsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <StatsSection />
    <QualificationForm />
    <WhyUsSection />
    <MidCTA />
    <SystemSection />
    <StepsSection />
    <VideoTestimonialsSection />
    <TestimonialsSection />
    <MidCTA />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
