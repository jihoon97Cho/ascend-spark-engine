import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is the minimum and maximum amount of funding I can apply for?",
    a: "We offer funding amounts ranging from $10,000 to $500,000 based on your business's needs and credit score.",
  },
  {
    q: "How long does it take to get approved?",
    a: "Our funding process typically takes about 30 days, however, we can help you secure funding in as quickly as 48 hours if you qualify.",
  },
  {
    q: "What are the interest rates and repayment terms?",
    a: "We focus on getting you 0% interest business credit cards. Terms vary across banks but are usually 12-18 months of 0% interest.",
  },
  {
    q: "Do I need to provide collateral?",
    a: "No collateral is required for 0% interest funding or business lines of credit.",
  },
  {
    q: "What can I use the funding for?",
    a: "You can use the funds for anything business-related — expansion, payroll, equipment, marketing, real estate, inventory, and more.",
  },
  {
    q: "What kind of support can I expect after receiving funding?",
    a: "We provide ongoing financial coaching and expert advice to help you manage your capital and grow your business.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-24 px-4 bg-card/50">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Frequently Asked <span className="gold-text">Questions</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map(({ q, a }, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-card border border-border rounded-xl px-6 data-[state=open]:gold-border"
          >
            <AccordionTrigger className="text-left text-sm font-semibold py-5 hover:no-underline">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
