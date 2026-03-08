import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BookCall = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load the form embed script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-6 pb-2 max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 max-w-4xl mx-auto w-full px-4 pb-12"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            See If You <span className="gold-text">Qualify</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Answer a few quick questions to find out how much 0% capital you can access.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 sm:p-8">
          <iframe
            src="https://api.leadconnectorhq.com/widget/survey/TL0Xei08t8ADyBpL916x"
            style={{ border: "none", width: "100%", minHeight: "600px" }}
            scrolling="no"
            id="TL0Xei08t8ADyBpL916x"
            title="Qualification Survey"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BookCall;
