import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Clock, Users, CalendarX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import calendarReminder from "@/assets/calendar-reminder.png";

const videos = [
  {
    id: "i4K7b1EjEaA",
    title: "Kevin Made $50k in Profit in Just 2 Months After Securing 107k To Fund His Fix & Flips!",
  },
  {
    id: "d1BiI-HG6G8",
    title: "Jennifer Secured $100k in 0% Funding In 2 weeks To Invest Into Her Business!",
  },
];

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
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            You're <span className="gold-text">All Set!</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your call is booked — follow the steps below to prepare.
          </p>
        </div>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">
            Step 1. Watch this quick video before we speak. 👇
          </h2>
          <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-video">
            <video
              src="https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/691caae30eb06dc7b7495125.mp4"
              controls
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">
            Step 2. Add This Call to Your Calendar 👇
          </h2>
          <p className="text-muted-foreground mb-4">
            Check your email for the calendar invite and make sure to add it.
          </p>
          <div className="rounded-2xl overflow-hidden border border-border bg-card">
            <img
              src={calendarReminder}
              alt="Press the 'I know the sender' button in your calendar invite email"
              className="w-full"
            />
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">
            Step 3: 🛑 STOP: Upload Your Experian Credit Report
          </h2>
          <p className="text-foreground font-semibold mb-4">
            Please obtain a copy of your Experian credit report and upload it to this secure portal below… or else we will cancel the appointment if you do not have it when we start the call.
          </p>
          <p className="text-foreground font-bold text-lg mb-6">We aren't kidding. 👇</p>

          {/* Warnings */}
          <div className="space-y-4 mb-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-destructive shrink-0 mt-0.5" size={20} />
              <p className="text-foreground font-semibold">
                🚨 Important: If we do not receive your confirmation by responding to our text or email, we will automatically cancel your appointment in 30 Minutes. 🚨
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-muted-foreground shrink-0 mt-0.5" size={20} />
              <p className="text-muted-foreground">
                Ensure that you have 30 Minutes of Uninterrupted Time With All Decision Makers On the Zoom.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CalendarX className="text-muted-foreground shrink-0 mt-0.5" size={20} />
              <p className="text-muted-foreground">
                If you need to Reschedule Your Call, please let us know promptly. This is a one-time fee waiver for our usual $297 charge.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <a
              href="https://api.leadconnectorhq.com/widget/booking/pf6Qvry1sNsR8s08Tb0V"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold px-8 py-3 hover:bg-primary/90 transition-colors"
            >
              Click Here to Reschedule
            </a>
          </div>

          <p className="text-muted-foreground text-center text-sm mb-8">
            If you have any questions in the meantime, feel free to reach out to us at{" "}
            <a href="mailto:contact@ascendingsolutions.co" className="text-primary underline">
              contact@ascendingsolutions.co
            </a>
            ; we'll be happy to help!
          </p>
        </section>

        {/* Credit Report Upload Form */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">
            Upload Your Credit Report Below 👇
          </h2>
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
        </section>

        {/* Video Testimonials */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Real Client <span className="gold-text">Success Stories</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {videos.map(({ id, title }) => (
              <div key={id} className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-[9/16]">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=0&mute=1&loop=1&playlist=${id}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm font-semibold text-foreground text-center px-2">{title}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default ThankYou;
