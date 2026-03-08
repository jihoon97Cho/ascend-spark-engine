import { motion } from "framer-motion";
import { TrendingUp, Users, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Proven Results",
    desc: "In the last 5 years, we've secured over $5M in business capital for our clients. We have the best network of relationship managers at banks to get you funded.",
  },
  {
    icon: Users,
    title: "Startups Welcome",
    desc: "Brand new business with no revenue? If you have a 680+ credit score & primary credit cards with $2,500+ limits, we can get you funded — no bank statements or proof of income needed.",
  },
  {
    icon: ShieldCheck,
    title: "You Only Pay After Approval",
    desc: "We're so confident we work for free until we bring you results. You don't pay until you actually get the funds in hand. Nothing to lose, nothing to risk.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

const WhyUsSection = () => (
  <section id="why-us" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-3"
        >
          Why Work With <span className="gold-text">Us?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Our Fast Funding Program makes it easy and possible to get the capital you need
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        {reasons.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={item}
            className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Icon size={22} className="text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyUsSection;
