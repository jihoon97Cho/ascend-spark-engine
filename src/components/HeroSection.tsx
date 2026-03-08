import { motion } from "framer-motion";
import { ArrowDown, Shield, Clock, DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToQualify = () => {
    document.getElementById("qualify")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-8"
        >
          <span className="text-sm font-semibold text-primary">Need Additional Capital For Growth?</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6"
        >
          We'll Help You Secure Up To{" "}
          <span className="gold-text">$150,000</span>
          <br />
          at <span className="gold-text">0% Interest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Even without business revenue. No collateral. No upfront fees.
          You only pay after you're funded.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-6 bg-card border border-border rounded-full px-6 py-3 mb-10"
        >
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">200+</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Clients Funded</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-sm font-bold gold-text">$5M+</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Capital Secured</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">48hr</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fast Approval</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <Button
            onClick={scrollToQualify}
            size="lg"
            className="gold-gradient text-primary-foreground font-bold text-lg px-12 py-7 hover:opacity-90 transition-opacity gold-glow"
          >
            Get Me Funded Now <ArrowRight size={20} className="ml-1" />
          </Button>
        </motion.div>

        {/* Trust bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-2 mb-16"
        >
          {[
            "No credit check required",
            "Just a few quick questions",
            "Know exactly how much you qualify for",
            "We will never share your information",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="gold-text">→</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: DollarSign, label: "0% Interest", sub: "12-18 month terms" },
            { icon: Clock, label: "48hr Approval", sub: "Fast-track available" },
            { icon: Shield, label: "No Upfront Fees", sub: "Pay only after funded" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 bg-card/50 border border-border rounded-lg px-5 py-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <Icon size={18} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <button onClick={scrollToQualify} className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
