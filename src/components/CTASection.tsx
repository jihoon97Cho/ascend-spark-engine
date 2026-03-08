import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-24 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center bg-card border border-border rounded-3xl p-12 sm:p-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Don't Let Lack of Capital <span className="gold-text">Hold You Back</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Why stress over money when you can get funded quickly and easily?
          Take the first risk-free step toward financial freedom now.
        </p>
        <Button
          onClick={() => document.getElementById("qualify")?.scrollIntoView({ behavior: "smooth" })}
          size="lg"
          className="gold-gradient text-primary-foreground font-bold text-lg px-12 py-6 hover:scale-105 transition-all duration-300 gold-glow btn-shine"
        >
          Schedule Your Funding Call
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Get approved in as little as 48 hours
        </p>
      </div>
    </motion.div>
  </section>
);

export default CTASection;
