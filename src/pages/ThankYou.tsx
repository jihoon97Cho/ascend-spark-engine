import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
            You're <span className="gold-text">All Set!</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your call is booked. Upload your credit report below to speed up your approval.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/vK3S8Rm0TqpknxTS3xWC"
            style={{ width: "100%", height: "1330px", border: "none", borderRadius: "3px" }}
            id="inline-vK3S8Rm0TqpknxTS3xWC"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Credit Report Upload"
            data-height="1330"
            data-layout-iframe-id="inline-vK3S8Rm0TqpknxTS3xWC"
            data-form-id="vK3S8Rm0TqpknxTS3xWC"
            title="Credit Report Upload"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
