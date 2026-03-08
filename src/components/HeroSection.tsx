import { motion } from "framer-motion";
import { ArrowDown, Shield, Clock, DollarSign } from "lucide-react";
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6"
        >
          For Business Owners & Real Estate Investors That Need Funding FAST
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6"
        >
          Access Up to{" "}
          <span className="gold-text">$150,000</span>
          <br />
          at <span className="gold-text">0% Interest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Even without business revenue. No collateral. No upfront fees.
          You only pay after you're funded.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            onClick={scrollToQualify}
            size="lg"
            className="gold-gradient text-primary-foreground font-bold text-lg px-10 py-6 hover:opacity-90 transition-opacity gold-glow"
          >
            Check If You Qualify
          </Button>
          <Button
            onClick={() => document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline"
            size="lg"
            className="border-border text-foreground font-semibold text-lg px-10 py-6 hover:bg-secondary"
          >
            Learn More
          </Button>
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
