import { motion } from "framer-motion";

import win20k from "@/assets/client-wins/win-20k.png";
import win15k from "@/assets/client-wins/win-15k.png";
import win117k from "@/assets/client-wins/win-117k.png";
import win7k from "@/assets/client-wins/win-7k.png";
import win45k from "@/assets/client-wins/win-45k.png";
import win12k from "@/assets/client-wins/win-12k.png";
import win52k from "@/assets/client-wins/win-52k.png";
import win143k from "@/assets/client-wins/win-143k.png";

const wins = [
  { src: win20k, alt: "Client approved for $20K at 0% interest" },
  { src: win117k, alt: "Client approved for $117K" },
  { src: win45k, alt: "Client approved for $45K at 0% interest" },
  { src: win143k, alt: "Client approved for $143K" },
  { src: win15k, alt: "Client approved for $15K at 0% interest" },
  { src: win7k, alt: "Client approved for $7K at 0% interest" },
  { src: win52k, alt: "Client approved for $52K" },
  { src: win12k, alt: "Client approved for $12K" },
];

const ClientWinsSection = () => (
  <section className="py-24 px-4 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3"
        >
          Proof of Results
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-3"
        >
          Client <span className="gold-text">Wins</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground"
        >
          Real approvals. Real funding. Real results.
        </motion.p>
      </div>
    </div>

    <div className="mt-14 relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee gap-6" style={{ width: "max-content" }}>
        {[...wins, ...wins].map(({ src, alt }, i) => (
          <div
            key={`${alt}-${i}`}
            className="w-[260px] flex-shrink-0 rounded-2xl overflow-hidden border border-border card-hover"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ClientWinsSection;
