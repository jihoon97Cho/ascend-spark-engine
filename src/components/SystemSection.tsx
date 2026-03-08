import { motion } from "framer-motion";
import { Search, Settings, Target, Handshake, TrendingUp, BookOpen } from "lucide-react";

const steps = [
  { icon: Search, title: "The Funding Audit", desc: "We audit your business structuring, personal credit, and reveal every rejection killer — then optimize for maximum approvals." },
  { icon: Settings, title: "The Optimization Process", desc: "We restructure your business setup and make sure your personal profile is clean and application-ready for the banks." },
  { icon: Target, title: "Application Sequencing", desc: "We build a tailored game plan and sequencing strategy for your exact business and credit setup. Timing matters more than you think." },
  { icon: Handshake, title: "Banking Relationships", desc: "Our private network of relationship managers at major banks run your applications directly, optimizing for maximum approvals." },
  { icon: TrendingUp, title: "Set Up For The Long Game", desc: "We don't just get you 0% funding — we set your business up for long-term capital like SBAs, BLOCs, and low-interest options." },
  { icon: BookOpen, title: "You Get Our Exact Playbook", desc: "We work side by side with you AND teach you the strategies so you can leverage these skills for years to come." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

const SystemSection = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3"
        >
          The System
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          How We <span className="gold-text">Guarantee</span> High-Limit Approvals
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          We engineer approvals through optimization, timing, and sequencing — not guesswork.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14"
      >
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            variants={item}
            className="bg-card border border-border rounded-2xl p-7 card-hover group relative"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} className="text-primary-foreground" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold">
                Step {i + 1}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SystemSection;
