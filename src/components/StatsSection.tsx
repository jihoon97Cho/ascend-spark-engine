import { motion } from "framer-motion";

const stats = [
  { value: "200+", label: "Trusted Clients" },
  { value: "$5M+", label: "Capital Secured" },
  { value: "5 Year", label: "Track Record" },
  { value: "48hr", label: "Fastest Approval" },
];

const StatsSection = () => (
  <section className="py-16 px-4 border-y border-border bg-card/30">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-3xl sm:text-4xl font-extrabold gold-text mb-1">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
