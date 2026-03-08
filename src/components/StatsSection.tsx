import { motion } from "framer-motion";

const stats = [
  { value: "200+", label: "Trusted Clients" },
  { value: "$5M+", label: "Capital Secured" },
  { value: "5 Year", label: "Track Record" },
  { value: "48hr", label: "Fastest Approval" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

const StatsSection = () => (
  <section className="py-16 px-4 border-y border-border bg-card/30">
    <div className="max-w-5xl mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map(({ value, label }) => (
          <motion.div key={label} variants={item} className="text-center">
            <p className="text-3xl sm:text-4xl font-extrabold gold-text mb-1">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default StatsSection;
