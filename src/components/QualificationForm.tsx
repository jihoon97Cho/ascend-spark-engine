import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

type FormData = {
  creditScore: string;
  creditLimits: string;
  capitalNeeded: string;
  fullName: string;
  email: string;
  phone: string;
};

const QualificationForm = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    creditScore: "",
    creditLimits: "",
    capitalNeeded: "",
    fullName: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      title: "What is your credit score?",
      key: "creditScore" as keyof FormData,
      options: ["700+ with No Negatives", "650-699", "Below 650"],
    },
    {
      title: "Do you have $10K+ in personal credit card limits?",
      subtitle: "Cannot be credit builder accounts like Kikoff, Ava, Kovo, or authorized users",
      key: "creditLimits" as keyof FormData,
      options: ["Yes, $25K+ in total limits", "Yes, $10K+ in total limits", "No, but I have a co-signer who does", "No, I don't have any credit cards"],
    },
    {
      title: "How much capital do you need?",
      key: "capitalNeeded" as keyof FormData,
      options: ["$100,000 - $150,000+", "$75,000 - $100,000", "$50,000 - $75,000", "$30,000 - $50,000"],
    },
  ];

  const canProceed = () => {
    if (step < 3) return !!data[steps[step].key];
    return data.fullName && data.email && data.phone;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="qualify" className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center bg-card border border-border rounded-2xl p-12 gold-glow"
        >
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">You're Pre-Qualified!</h2>
          <p className="text-muted-foreground mb-6">
            We'll review your information and reach out within 24 hours to schedule your funding call.
          </p>
          <p className="text-sm text-muted-foreground">
            Get approved in as little as <span className="text-primary font-semibold">48 hours</span>
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="qualify" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            See if You <span className="gold-text">Qualify</span>
          </h2>
          <p className="text-muted-foreground">Takes less than 60 seconds</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8 max-w-md mx-auto">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-500"
              style={{
                background: i <= step ? "linear-gradient(90deg, hsl(45 100% 50%), hsl(38 100% 60%))" : "hsl(220 15% 18%)",
              }}
            />
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 gold-glow">
          <AnimatePresence mode="wait">
            {step < 3 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl font-bold mb-2">{steps[step].title}</h3>
                {steps[step].subtitle && (
                  <p className="text-sm text-muted-foreground mb-6">{steps[step].subtitle}</p>
                )}
                {!steps[step].subtitle && <div className="mb-6" />}
                <div className="grid gap-3">
                  {steps[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setData({ ...data, [steps[step].key]: opt })}
                      className={`text-left px-5 py-4 rounded-xl border transition-all text-sm font-medium ${
                        data[steps[step].key] === opt
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-xl font-bold mb-6">Almost there! Enter your details</h3>
                <div className="grid gap-4">
                  <Input
                    placeholder="Full Name"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    className="bg-secondary/30 border-border h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="bg-secondary/30 border-border h-12"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="bg-secondary/30 border-border h-12"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-muted-foreground">
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gold-gradient text-primary-foreground font-semibold px-8 hover:opacity-90 disabled:opacity-40"
            >
              {step < 3 ? "Next" : "Submit Application"}
              {step < 3 && <ArrowRight size={16} className="ml-1" />}
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 Your information is secure and will never be shared
        </p>
      </div>
    </section>
  );
};

export default QualificationForm;
