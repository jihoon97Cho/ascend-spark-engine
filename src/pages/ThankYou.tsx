import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Clock, CalendarX } from "lucide-react";
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

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="px-4 pt-6 pb-2 max-w-3xl mx-auto w-full">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>

      <div className="max-w-3xl mx-auto w-full px-4 pb-16">
        {/* Header */}
        <motion.div variants={fade} initial="hidden" animate="show" className="text-center py-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            You're <span className="gold-text">All Set!</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Your call is booked — follow the steps below to prepare.
          </p>
        </motion.div>

        {/* Divider */}
        <hr className="border-border mb-12" />

        {/* Step 1 */}
        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Step 1</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Watch this quick video before we speak 👇
          </h2>
          <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-video max-w-2xl mx-auto">
            <video
              src="https://assets.cdn.filesafe.space/bnmo2H6CkK9L4cUOXrpa/media/691caae30eb06dc7b7495125.mp4"
              controls
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
        </motion.section>

        <hr className="border-border mb-12" />

        {/* Step 2 */}
        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Step 2</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Add This Call to Your Calendar 👇
          </h2>
          <p className="text-muted-foreground mb-6">
            Check your email for the calendar invite and make sure to accept it.
          </p>
          <div className="rounded-2xl overflow-hidden border border-border bg-card max-w-xl mx-auto">
            <img
              src={calendarReminder}
              alt="Press the 'I know the sender' button in your calendar invite email"
              className="w-full"
            />
          </div>
        </motion.section>

        <hr className="border-border mb-12" />

        {/* Step 3 */}
        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Step 3</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            🛑 Upload Your Experian Credit Report
          </h2>
          <p className="text-foreground max-w-xl mx-auto mb-2">
            Please obtain a copy of your Experian credit report and upload it to the secure portal below — <span className="font-bold">or we will cancel your appointment</span> if you do not have it when the call starts.
          </p>
          <p className="text-foreground font-bold text-lg mb-8">We aren't kidding. 👇</p>

          {/* Warning box */}
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 sm:p-8 max-w-xl mx-auto text-left space-y-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-destructive shrink-0 mt-0.5" size={20} />
              <p className="text-foreground font-semibold text-sm">
                🚨 If we do not receive your confirmation by responding to our text or email, we will automatically cancel your appointment in 30 minutes. 🚨
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-muted-foreground shrink-0 mt-0.5" size={20} />
              <p className="text-muted-foreground text-sm">
                Ensure that you have <span className="font-semibold text-foreground">30 minutes of uninterrupted time</span> with all decision makers on the Zoom.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CalendarX className="text-muted-foreground shrink-0 mt-0.5" size={20} />
              <p className="text-muted-foreground text-sm">
                If you need to reschedule, please let us know promptly. This is a <span className="font-semibold text-foreground">one-time fee waiver</span> for our usual $297 charge.
              </p>
            </div>
          </div>

          <a
            href="https://api.leadconnectorhq.com/widget/booking/pf6Qvry1sNsR8s08Tb0V"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold px-8 py-3 hover:bg-primary/90 transition-colors mb-6"
          >
            Click Here to Reschedule
          </a>

          <p className="text-muted-foreground text-sm">
            Questions? Reach out at{" "}
            <a href="mailto:contact@ascendingsolutions.co" className="text-primary underline">
              contact@ascendingsolutions.co
            </a>
          </p>
        </motion.section>

        <hr className="border-border mb-12" />

        {/* Credit Report Upload Form */}
        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Secure Upload</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-8">
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
        </motion.section>

        <hr className="border-border mb-12" />

        {/* Video Testimonials */}
        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Success Stories</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-8">
            Real Client <span className="gold-text">Results</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {videos.map(({ id, title }) => (
              <div key={id} className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-[9/16]">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?mute=1&loop=1&playlist=${id}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm font-semibold text-foreground px-2">{title}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ThankYou;
