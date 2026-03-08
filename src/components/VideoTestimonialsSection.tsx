import { motion } from "framer-motion";

const videos = [
  { id: "i4K7b1EjEaA", label: "Client Success Story" },
  { id: "d1BiI-HG6G8", label: "Client Success Story" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

const VideoTestimonialsSection = () => (
  <section className="py-24 px-4 bg-card/50">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3"
        >
          Video Testimonials
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-3"
        >
          Hear It <span className="gold-text">From Them</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground"
        >
          Real clients sharing their real results
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
      >
        {videos.map(({ id }) => (
          <motion.div
            key={id}
            variants={item}
            className="rounded-2xl overflow-hidden border border-border card-hover bg-card aspect-[9/16]"
          >
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`}
              title="Client testimonial video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default VideoTestimonialsSection;
