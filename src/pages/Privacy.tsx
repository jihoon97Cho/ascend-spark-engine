import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/leadTracking";
import Footer from "@/components/Footer";

const Privacy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('/privacy');
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
            Privacy <span className="gold-text">Policy</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: April 20, 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-foreground space-y-8 text-sm sm:text-base leading-relaxed">
          <p>
            Ascend Solutions LLC ("we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit our website, submit forms, or engage our services.
          </p>

          <section>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p><strong>Information you provide directly:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Name, email address, phone number, and mailing address</li>
              <li>Business name, EIN, and business contact information</li>
              <li>Credit profile information (FICO score range, card limits, existing accounts)</li>
              <li>Income and revenue information</li>
              <li>Credit reports you upload or share with us</li>
              <li>Communications, messages, and call recordings</li>
              <li>Payment information (processed through third-party payment processors)</li>
            </ul>
            <p className="mt-4"><strong>Information collected automatically:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>IP address, browser type, device information</li>
              <li>Pages visited, time on site, referral source</li>
              <li>Cookies and tracking pixels (including Meta Pixel, Google Analytics)</li>
              <li>UTM parameters and ad attribution data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide and deliver our consulting services</li>
              <li>Communicate with you about your engagement (email, phone, SMS)</li>
              <li>Process payments and manage billing</li>
              <li>Assist you in completing credit and funding applications</li>
              <li>Improve our services and marketing effectiveness</li>
              <li>Send marketing communications (you can opt out anytime)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Share Your Information</h2>
            <p>We share your information only as necessary:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Service providers:</strong> CRM platforms (GoHighLevel), email/SMS providers, payment processors (Square, Stripe), analytics tools (Meta Pixel, Google Analytics)</li>
              <li><strong>Financial institutions:</strong> Only as needed to assist you in submitting funding applications (you initiate all applications)</li>
              <li><strong>Legal requirements:</strong> If required by law, subpoena, or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger, sale, or acquisition</li>
            </ul>
            <p className="mt-4"><strong>We do NOT sell your personal information to third parties.</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, pixels, and similar technologies to track site usage and deliver targeted advertising. This includes Meta Pixel for Facebook/Instagram ad attribution. You can disable cookies in your browser settings, but some site features may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information, including encrypted data transmission and secure storage with our service providers. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Data Retention</h2>
            <p>
              We retain your information as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your data at any time by emailing us (see Section 11).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Your Rights</h2>
            <p>Depending on your state of residence, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Access the personal information we have about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Opt out of the "sale" or "sharing" of personal information (we do not sell, but we use advertising pixels)</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at <a href="mailto:contact@ascendingsolutions.co" className="text-primary underline">contact@ascendingsolutions.co</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. California Privacy Rights (CCPA/CPRA)</h2>
            <p>
              California residents have additional rights under the CCPA/CPRA, including the right to know what personal information is collected, the right to delete, the right to correct, and the right to opt out of the sharing of personal information for cross-context behavioral advertising. We do not knowingly sell personal information. To exercise your rights, contact us at the email above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. SMS / Text Messaging</h2>
            <p>
              By providing your phone number, you consent to receive SMS messages from us regarding your engagement, appointments, and service updates. Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance. We do not share SMS opt-in data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Third-Party Links</h2>
            <p>
              Our site may contain links to third-party websites (lenders, calendar services, etc.). We are not responsible for the privacy practices of those sites. Review their privacy policies before providing any information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent site notice. Your continued use of our services after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">13. Contact</h2>
            <p>Questions or requests regarding this Privacy Policy:</p>
            <div className="mt-2">
              <p><strong>Ascend Solutions LLC</strong></p>
              <p>Email: <a href="mailto:contact@ascendingsolutions.co" className="text-primary underline">contact@ascendingsolutions.co</a></p>
            </div>
          </section>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Privacy;
