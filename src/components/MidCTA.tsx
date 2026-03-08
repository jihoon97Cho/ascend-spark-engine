import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MidCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          See Your Exact <span className="gold-text">Approval Amount</span>
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Get a clear path to $30K–$150K in 0% business capital. Takes less than 60 seconds.
        </p>
        <Button
          onClick={() => navigate("/book")}
          size="lg"
          className="gold-gradient text-primary-foreground font-bold text-lg px-10 py-6 hover:scale-105 transition-all duration-300 gold-glow btn-shine"
        >
          Check If You Qualify <ArrowRight size={18} className="ml-1" />
        </Button>
      </motion.div>
    </section>
  );
};

export default MidCTA;
