import { motion } from "framer-motion";
import { ClipboardCheck, Banknote, Rocket } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    step: "Step 1",
    title: "Pre-Qualify Online",
    desc: "Answer a few quick questions to see if you meet our funding criteria. Takes less than 60 seconds.",
  },
  {
    icon: Banknote,
    step: "Step 2",
    title: "Secure Your Funding",
    desc: "We handle everything — no upfront cost. Our team works with our bank network to get you approved fast.",
  },
  {
    icon: Rocket,
    step: "Step 3",
    title: "Scale Your Business",
    desc: "Use your 0% interest capital for anything — expansion, inventory, payroll, real estate, marketing, and more.",
  },
];

const StepsSection = () => (
  <section className="py-24 px-4 bg-card/50">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Get Funded in <span className="gold-text">3 Simple Steps</span>
        </h2>
        <p className="text-muted-foreground">It's really that simple</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, step, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-5">
              <Icon size={28} className="text-primary-foreground" />
            </div>
            <p className="text-xs uppercase tracking-[0.15em] text-primary font-bold mb-2">{step}</p>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>

            {i < 2 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+50px)] w-[calc(100%-100px)] border-t border-dashed border-border" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StepsSection;
