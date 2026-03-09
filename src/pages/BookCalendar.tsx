import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/leadTracking";

const BookCalendar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('/book-call');
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        (event.data.type === "form:submit" ||
          event.data.type === "booking:submit" ||
          event.data === "form_submitted" ||
          (typeof event.data === "string" && event.data.includes("submit")))
      ) {
        navigate("/thank-you");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

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
            Book Your <span className="gold-text">Funding Call</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pick a time that works for you. We'll walk you through your approval details.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/pf6Qvry1sNsR8s08Tb0V"
            style={{ border: "none", width: "100%", minHeight: "100vh", overflow: "hidden" }}
            scrolling="no"
            id="jtn3sWu1QUALvsUUhsST_1773004167773"
            title="Book a Call"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BookCalendar;
