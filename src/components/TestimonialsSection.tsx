import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kevin R.",
    role: "Real Estate Investor",
    result: "$107K Funded",
    quote: "Made $50K in profit in just 2 months after securing $107K to fund my fix & flips. The process was incredibly smooth.",
    timeline: "Funded in 2 weeks",
  },
  {
    name: "Jennifer L.",
    role: "E-commerce Owner",
    result: "$100K at 0%",
    quote: "Secured $100K in 0% funding in just 2 weeks to invest into my business. I couldn't believe how easy it was.",
    timeline: "Funded in 2 weeks",
  },
  {
    name: "Dylan M.",
    role: "Startup Founder",
    result: "$60K Funded",
    quote: "At just 18 years old, I secured $60K in funding and tripled my business. Age didn't matter — results did.",
    timeline: "Funded in 3 weeks",
  },
  {
    name: "Darrick S.",
    role: "Contractor",
    result: "$60K+ Funded",
    quote: "After 5 bank denials, Ascend Solutions got me $60K+ in just 2 weeks. I wish I found them sooner.",
    timeline: "Funded in 2 weeks",
  },
  {
    name: "Laura S.",
    role: "E-commerce Owner",
    result: "$85K at 0%",
    quote: "They found the single hidden issue blocking every approval I'd tried for months. Fixed it fast, and suddenly I was getting real limits.",
    timeline: "Funded in 18 days",
  },
  {
    name: "Sofia M.",
    role: "Project Manager",
    result: "$70K Funded",
    quote: "Their sequencing strategy got me approved by three major banks at 0% back-to-back. Something I never thought possible with my profile.",
    timeline: "Funded in 14 days",
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 px-4 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3"
        >
          Real Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-3"
        >
          Real Client <span className="gold-text">Results</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground"
        >
          Don't take our word for it — see what our clients achieved
        </motion.p>
      </div>
    </div>

    {/* Scrolling marquee */}
    <div className="mt-14 relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee gap-6" style={{ width: "max-content" }}>
        {[...testimonials, ...testimonials].map(({ name, role, result, quote, timeline }, i) => (
          <div
            key={`${name}-${i}`}
            className="bg-card border border-border rounded-2xl p-7 w-[340px] flex-shrink-0 relative"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-5">"{quote}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
              <span className="gold-gradient text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                {result}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
