import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QualificationForm from "@/components/QualificationForm";
import WhyUsSection from "@/components/WhyUsSection";
import StepsSection from "@/components/StepsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <QualificationForm />
    <WhyUsSection />
    <StepsSection />
    <TestimonialsSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
