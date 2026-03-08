import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kevin R.",
    result: "$107K Funded",
    quote: "Made $50K in profit in just 2 months after securing $107K to fund my fix & flips. The process was incredibly smooth.",
    timeline: "Funded in 2 weeks",
  },
  {
    name: "Jennifer L.",
    result: "$100K at 0%",
    quote: "Secured $100K in 0% funding in just 2 weeks to invest into my business. I couldn't believe how easy it was.",
    timeline: "Funded in 2 weeks",
  },
  {
    name: "Dylan M.",
    result: "$60K Funded",
    quote: "At just 18 years old, I secured $60K in funding and tripled my business. Age didn't matter — results did.",
    timeline: "Funded in 3 weeks",
  },
  {
    name: "Darrick S.",
    result: "$60K+ Funded",
    quote: "After 5 bank denials, Ascend Solutions got me $60K+ in just 2 weeks. I wish I found them sooner.",
    timeline: "Funded in 2 weeks",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Real Client <span className="gold-text">Results</span>
        </h2>
        <p className="text-muted-foreground">Don't take our word for it — see what our clients achieved</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {testimonials.map(({ name, result, quote, timeline }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-7 relative"
          >
            <Quote size={32} className="text-primary/20 absolute top-6 right-6" />
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-5">"{quote}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{timeline}</p>
              </div>
              <span className="gold-gradient text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                {result}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
