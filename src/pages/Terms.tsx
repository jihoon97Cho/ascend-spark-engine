import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/leadTracking";
import Footer from "@/components/Footer";

const Terms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('/terms');
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-6 pb-2 max-w-3xl mx-auto w-full">
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
        className="flex-1 max-w-3xl mx-auto w-full px-4 pb-16"
      >
        <div className="py-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Terms & <span className="gold-text">Conditions</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: April 20, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-foreground space-y-8 text-sm sm:text-base leading-relaxed">
          <p>
            By engaging Ascend Solutions LLC ("Company," "we," "us") for consulting services, you ("Client," "you") agree to the following Terms & Conditions. Please read carefully.
          </p>

          <section>
            <h2 className="text-xl font-bold mb-3">1. Services</h2>
            <p>
              Ascend Solutions provides credit profile optimization, lender identification, application preparation, and submission coordination to help Client apply for business funding products, including 0% introductory APR business credit cards and business lines of credit. Ascend Solutions is NOT a direct lender, bank, or credit repair organization, and does not guarantee funding approval. All approval decisions rest solely with third-party financial institutions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. No Guarantee of Results</h2>
            <p>Client acknowledges that:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Funding approval and approval amounts are determined by third-party lenders, not Ascend Solutions;</li>
              <li>Ascend Solutions makes no guarantee of any specific dollar amount, approval rate, timeline, or outcome;</li>
              <li>All estimated funding ranges are projections based on Client's profile and historical outcomes — NOT promises;</li>
              <li>Results depend on Client's credit profile, the accuracy of information provided, and lender underwriting at the time of application.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Client Obligations</h2>
            <p>Client agrees to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide accurate, complete, and truthful information;</li>
              <li>Respond to communications within 24 business hours;</li>
              <li>Submit applications within the timeline specified by Ascend Solutions;</li>
              <li>Not apply for additional credit products during the engagement without written approval;</li>
              <li>Maintain the personal credit profile represented at engagement start;</li>
              <li>Provide access to credit reports and bank statements as requested.</li>
            </ul>
            <p className="mt-2">Failure to meet these obligations may result in forfeiture of the Commitment Deposit and/or termination of services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Fees and Payment</h2>
            <p><strong>4.1 Commitment Deposit.</strong> A $400 Commitment Deposit is required upon engagement. The Deposit is credited toward the Success Fee upon successful funding.</p>
            <p className="mt-2"><strong>4.2 Success Fee.</strong> Client pays a Success Fee, calculated as a percentage of total gross funding secured (as specified in the signed Funding Consulting Agreement), due within 48 hours of funds being disbursed.</p>
            <p className="mt-2"><strong>4.3 Refund Policy.</strong> The Commitment Deposit is refundable only if Ascend Solutions fails to secure the minimum funding threshold specified in the Funding Consulting Agreement within 60 days, AND Client has fulfilled all obligations under Section 3.</p>
            <p className="mt-2"><strong>4.4 Payment Authorization.</strong> Client authorizes automatic ACH debit for the Success Fee and agrees to keep a valid payment method on file.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Credit Authorization</h2>
            <p>
              Client authorizes Ascend Solutions to review credit reports (via Client-provided access) and assist in application preparation. All hard credit inquiries resulting from applications are initiated by Client, not Ascend Solutions. Client accepts full responsibility for any impact on credit scores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Non-Circumvention</h2>
            <p>During the term of engagement and for 12 months thereafter, Client shall not:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Apply directly for funding products identified by Ascend Solutions without paying the Success Fee;</li>
              <li>Share Ascend Solutions' lender lists, card sequences, or strategies with any third party;</li>
              <li>Refer others to direct lenders in a manner designed to circumvent Ascend Solutions' fee.</li>
            </ul>
            <p className="mt-2">Violation entitles Ascend Solutions to recover the Success Fee plus reasonable attorney fees.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Confidentiality</h2>
            <p>
              Both parties shall keep all financial information, strategies, and communications confidential. Ascend Solutions will not sell or share Client's personal information with third parties except as required to submit applications on Client's behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Ascend Solutions' total liability is limited to the amount paid by Client under the Funding Consulting Agreement;</li>
              <li>Ascend Solutions is NOT liable for credit score fluctuations, lender denials, approval amounts, Client's business outcomes from use of funds, or any indirect, incidental, special, or consequential damages;</li>
              <li>Client assumes all risk associated with credit applications, funding usage, and repayment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Disclaimer</h2>
            <p>
              Ascend Solutions is not a law firm, CPA firm, credit repair organization, or financial advisor. Information provided is for educational and strategic purposes only and should not be construed as legal, tax, or financial advice. Client should consult qualified professionals before making financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Termination</h2>
            <p>
              Either party may terminate the engagement with 7 days written notice. Any earned Success Fees remain due and payable upon termination. Sections 4, 6, 7, 8, 9, 11, and 12 survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Dispute Resolution</h2>
            <p>
              Any disputes shall first be addressed through good-faith negotiation. If unresolved within 30 days, disputes shall be resolved through binding arbitration, administered by the American Arbitration Association. Each party bears its own attorney fees. <strong>CLIENT WAIVES THE RIGHT TO PARTICIPATE IN CLASS ACTION PROCEEDINGS.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State in which Ascend Solutions LLC is registered, without regard to conflict of law principles. Exclusive jurisdiction for any non-arbitrable matters is in the state and federal courts located in that state.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">13. Changes to Terms</h2>
            <p>
              Ascend Solutions may update these Terms at any time. Material changes will be communicated to active clients. Continued engagement after changes constitutes acceptance of updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">14. Electronic Communications & Signatures</h2>
            <p>
              Client consents to receiving communications electronically. Electronic signatures are legally binding under the E-SIGN Act and UETA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">15. Severability</h2>
            <p>
              If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">16. Entire Agreement</h2>
            <p>
              These Terms, together with the Funding Consulting Agreement signed by Client, constitute the entire agreement between the parties and supersede all prior negotiations, representations, or agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">17. Contact</h2>
            <p>Questions about these Terms:</p>
            <div className="mt-2">
              <p><strong>Ascend Solutions LLC</strong></p>
              <p>Email: <a href="mailto:contact@ascendingsolutions.co" className="text-primary underline">contact@ascendingsolutions.co</a></p>
            </div>
          </section>

          <p className="text-muted-foreground text-xs pt-8 border-t border-border">
            BY CHECKING "I AGREE" OR SIGNING THE FUNDING CONSULTING AGREEMENT, CLIENT ACKNOWLEDGES HAVING READ, UNDERSTOOD, AND AGREED TO THESE TERMS & CONDITIONS.
          </p>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Terms;
