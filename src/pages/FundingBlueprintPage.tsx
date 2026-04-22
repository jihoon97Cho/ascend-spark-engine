import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertTriangle, Building2, CreditCard, TrendingUp, Layers } from "lucide-react";

const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
    {children}
  </div>
);

const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="my-8 rounded-xl border-l-4 border-primary bg-muted/60 p-6 text-base">
    {children}
  </div>
);

const CtaBlock = ({ heading, sub }: { heading: string; sub: string }) => (
  <div className="my-12 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 p-10 text-center text-white shadow-xl">
    <h3 className="mb-3 text-2xl font-bold">{heading}</h3>
    <p className="mb-6 text-slate-300">{sub}</p>
    <Link to="/book">
      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Book your free 15-min call <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  </div>
);

const FundingBlueprintPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-sm font-bold">
            Ascend Solutions
          </Link>
          <Link to="/book">
            <Button variant="outline" size="sm">Book a Call</Button>
          </Link>
        </div>
      </nav>

      <header className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-blue-300">
            Ascend Solutions · Free Playbook
          </div>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            The Business Funding Blueprint
          </h1>
          <p className="mb-8 text-lg text-slate-300 md:text-xl">
            How to legally stack $50K–$150K in business credit — and the part nobody tells you about.
          </p>
          <p className="text-sm text-slate-400">
            By <span className="font-semibold text-white">Michael Cho</span> · Founder, Ascend Solutions
          </p>
        </div>
      </header>

      <article className="mx-auto -mt-10 max-w-3xl rounded-2xl bg-card px-6 py-12 shadow-xl md:px-12 md:py-16">

        <section>
          <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">Before You Start</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Most "business funding" content on the internet is either lying to you or selling you a course.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            The "no doc $50K guaranteed by law" people? Fraud. The "1099-OID secret bank loophole" people? Fraud, and a crime. The folks promising you funding without touching your personal credit? Half-true.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            What's true: you can legally stack $50K–$150K in business credit in 90–180 days if you do every step right. The banks call it <strong>SBSS lending</strong> and they've been doing it for 30 years. They just don't advertise it because it doesn't make them money on application fees.
          </p>
          <p className="text-lg leading-relaxed">
            Here's how it actually works.
          </p>
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 1</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The 3 Real Funding Paths</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Every legit funding strategy lives in one of these three buckets. Most pros run all three in parallel.
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Path 1 — Personal Credit Stacking</h3>
              </div>
              <p className="text-base leading-relaxed">
                4–6 personal credit cards from different banks, applied for inside a tight FICO inquiry window. Total approvals: $20K–$80K. Fast (3–5 business days), no business proof needed.
              </p>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Path 2 — Business Credit Stacking</h3>
              </div>
              <p className="text-base leading-relaxed">
                0% intro APR business cards from Chase Ink, Amex, Capital One, US Bank. These don't report to your personal credit while in good standing. Total approvals: $50K–$150K. Requires 60–90 days of foundation work first.
              </p>
            </div>

            <div className="rounded-xl border border-border p-6">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Path 3 — SBA + Term Loans</h3>
              </div>
              <p className="text-base leading-relaxed">
                Real working capital — $50K–$500K. Slower (45–90 days), heavier docs (tax returns, P&L, projections). Best after you've been operating 12+ months with revenue.
              </p>
            </div>
          </div>

          <Callout>
            <strong>Most people only know about Path 3</strong> — and Path 3 is the slowest, hardest, and least flexible. Paths 1 + 2 are where the real speed lives.
          </Callout>
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 2</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">Personal Credit Prep — The Floor</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Before any path opens up, your personal FICO has to be at least <strong>720</strong>. That's the floor. Here's why:
          </p>
          <ul className="mb-6 space-y-2 pl-6 text-lg">
            <li className="list-disc">740+ unlocks the highest-limit cards (Chase Ink Preferred, Amex Business Platinum)</li>
            <li className="list-disc">680–719 gets you approvals but with $5K–$10K limits — not stacking material</li>
            <li className="list-disc">Below 680 gets you denied or shoved into secured/predatory products</li>
          </ul>

          <h3 className="mt-8 text-xl font-bold">What your file needs to look like</h3>
          <ul className="mt-3 space-y-2 pl-6 text-lg">
            <li className="list-disc"><strong>Score:</strong> 720+ across all 3 bureaus</li>
            <li className="list-disc"><strong>Utilization:</strong> Under 9% on every revolving account</li>
            <li className="list-disc"><strong>Inquiries:</strong> Less than 3 in the last 12 months on any single bureau</li>
            <li className="list-disc"><strong>Negatives:</strong> Zero open collections, zero late payments in the last 24 months</li>
            <li className="list-disc"><strong>Tradelines:</strong> 3+ open revolving accounts, all 12+ months old</li>
          </ul>
          <p className="mt-4 text-lg leading-relaxed">
            If your file doesn't look like that yet — that's where credit repair + credit building come in first. Stacking funding on a weak file is how you get denied 6 times in a row and burn your inquiry budget for the year.
          </p>
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 3</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The Business Foundation (Path 2 Setup)</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Banks underwrite businesses by looking at signals — and the signals have to match before you apply. Get one wrong and the algorithm flags you as a "shelf company" or fraud risk.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["LLC or Corp", "Filed with the state, in your name, active in good standing"],
              ["EIN", "Filed directly with the IRS — not via a third-party service"],
              ["Business Address", "A real one — not a virtual mailbox the banks have flagged"],
              ["Business Phone", "Listed in 411 directory under the EXACT business name"],
              ["NAICS Code", "Specific code that banks lend into — not the generic 'consulting' codes"],
              ["DUNS Number", "Free with Dun & Bradstreet — not the $200 'expedited' upsell"],
              ["Bank Account", "Business checking with the right banks — some are credit-friendly, some kill applications"],
              ["Website + Email", "Domain matches business name, professional email (no @gmail.com)"],
            ].map(([t, body]) => (
              <div key={t} className="rounded-lg border border-border p-4">
                <div className="font-bold">{t}</div>
                <div className="text-sm text-muted-foreground mt-1">{body}</div>
              </div>
            ))}
          </div>

          <Callout>
            <strong>The trap:</strong> 90% of DIY funding attempts fail at this step because they get one of these 8 details slightly wrong — and the banks share data. One denial cascades into 5 more.
          </Callout>
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 4</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The Stack — How It Actually Works</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Once your foundation is built, the "stack" is a coordinated multi-bank application sequence. The trick is the <strong>14-day FICO bucket</strong>:
          </p>
          <Callout>
            <strong>FICO 14-day rule:</strong> Multiple credit applications inside a 14-day window count as <strong>one</strong> hard inquiry instead of separate ones. Spread them out and your score tanks for nothing.
          </Callout>

          <h3 className="mt-8 text-xl font-bold">The basic sequence</h3>
          <ol className="mt-3 space-y-2 pl-6 text-lg">
            <li className="list-decimal">Apply to 4–6 cards across 4–6 different banks inside a single 5-day window</li>
            <li className="list-decimal">Use the <em>right order</em> — some banks check first, some check last (specific order matters and varies by month based on each bank's underwriting)</li>
            <li className="list-decimal">Use the <em>right channel</em> — phone vs branch vs online has different approval odds per bank</li>
            <li className="list-decimal">Use the <em>right declared income + business revenue numbers</em> — too high triggers verification, too low caps your limit</li>
            <li className="list-decimal">Wait 90 days, then run a "second wave" with new banks while the first round seasons</li>
          </ol>

          <p className="mt-6 text-lg leading-relaxed">
            That's the framework. The actual <em>execution</em> — which banks, what order, what channel, what numbers, what NAICS code, which day of the month, which underwriter team — is where the difference between $20K and $120K lives.
          </p>

          <CtaBlock
            heading="Want us to run your stack for you?"
            sub="Foundation buildout + multi-bank sequence + post-approval limit increases."
          />
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 5</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The Banks That Matter</h2>
          <p className="mb-6 text-lg leading-relaxed">
            Not all banks are equal. The funding ecosystem has tiers:
          </p>

          {[
            { tier: "Tier 1 — Aggressive Stackers", body: "High limits ($15K–$50K), don't report to personal, fast approvals. The core of any stack: Chase Ink (Cash, Unlimited, Preferred), Amex Business (Blue, Gold, Platinum), Capital One Spark." },
            { tier: "Tier 2 — Volume Builders", body: "Mid limits ($5K–$15K), fill out the stack. Bank of America Business, US Bank Triple Cash, Wells Fargo Business." },
            { tier: "Tier 3 — Niche & Regional", body: "Specialty cards (gas, fleet, vendor lines). Used to season your business profile and unlock Tier 1 increases." },
            { tier: "Avoid", body: "BlueVine, Fundbox, Kabbage-style 'fast funding.' Predatory rates, daily payments, can torpedo your score and your bank relationships." },
          ].map((b) => (
            <div key={b.tier} className="mb-4 rounded-xl border border-border p-5">
              <h3 className="text-lg font-bold">{b.tier}</h3>
              <p className="text-base mt-2">{b.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 6</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">The 12 Most Common Mistakes</h2>
          <ol className="space-y-3 pl-6 text-lg">
            {[
              ["Spreading applications over 30+ days.", "Each one becomes a separate hard inquiry. Score tanks 30–50 points for nothing."],
              ["Using the same address as your personal.", "Triggers fraud flags at most banks."],
              ["Filing your EIN through a third party.", "Banks see this and downgrade your file. Always direct with IRS."],
              ["Picking the wrong NAICS code.", "Some codes (like trucking, MLM, cannabis-adjacent) auto-deny at most banks."],
              ["Applying with a 'shelf' company.", "Banks check formation date. Anything under 60 days = soft denial."],
              ["No business bank account before applying.", "Modern underwriters check for it. Skip it = no approval."],
              ["Maxing the first card before applying for the second.", "Utilization spike kills the next application."],
              ["Personal guarantee surprise.", "Most 'no PG' claims are wrong — Chase + Amex always require one."],
              ["Misreading the 0% intro term.", "Some are 9 months, some are 12, some are 15. Wrong move and you owe interest on $40K."],
              ["Closing personal cards right before applying.", "Drops average age of accounts, score drops 20–40 points."],
              ["Not seasoning between waves.", "Apply for wave 2 too fast and banks see the wave 1 limits unused = soft deny."],
              ["Treating funding as 'free money.'", "It's debt. Misuse it and it eats your business + your personal credit at the same time."],
            ].map(([t, body], i) => (
              <li key={i} className="list-decimal"><strong>{t}</strong> {body}</li>
            ))}
          </ol>
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 7</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">Where DIY Gets Stuck</h2>
          <p className="mb-6 text-lg leading-relaxed">
            You can do all this yourself. Here's where it falls apart:
          </p>
          <ul className="space-y-3 pl-6 text-lg">
            <li className="list-disc"><strong>Picking the right banks for THIS month.</strong> Underwriting tightens and loosens monthly. The bank order that worked in January gets you denied in March.</li>
            <li className="list-disc"><strong>Knowing the income & revenue numbers to declare.</strong> Each bank has a "sweet spot" — declare too high and they verify, too low and they cap.</li>
            <li className="list-disc"><strong>Sequencing inquiries vs. account openings.</strong> Some banks pull Experian first; some pull TransUnion. Pull the same bureau twice in 24 hours = denial.</li>
            <li className="list-disc"><strong>Recovering from a denial.</strong> A reconsideration call done right turns 50% of denials into approvals. Done wrong, it locks the bank out for 6 months.</li>
            <li className="list-disc"><strong>Post-approval credit limit increases.</strong> Most people leave 50% of their available credit on the table by not requesting CLIs at the right time.</li>
            <li className="list-disc"><strong>The 5-day paydown trick.</strong> Pay down before statement cuts and your reported utilization stays under 9% — keeps your score high for the next round.</li>
            <li className="list-disc"><strong>Not blowing up your foundation mid-stack.</strong> A late payment, a moved business address, or a closed account during the stack window kills future approvals.</li>
          </ul>
          <p className="mt-6 text-lg leading-relaxed">
            The framework is simple. The execution is where 95% of DIY attempts hit $20K instead of $100K — or worse, get denied across the board and have to wait 12 months to try again.
          </p>
        </section>

        <section className="mt-16 border-t border-border pt-12">
          <SectionTag>Part 8</SectionTag>
          <h2 className="mb-5 text-3xl font-extrabold">DIY vs. Hire a Pro — Honest Take</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border p-6">
              <h3 className="text-xl font-bold">DIY if:</h3>
              <ul className="mt-3 space-y-2 pl-5 text-base">
                <li className="list-disc">Your personal FICO is already 740+</li>
                <li className="list-disc">You only need $20K–$30K and one round is enough</li>
                <li className="list-disc">You're comfortable getting denied a few times to learn</li>
                <li className="list-disc">You have 40+ hours over 90 days to research, apply, and recover</li>
              </ul>
            </div>
            <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
              <h3 className="text-xl font-bold">Hire a pro if:</h3>
              <ul className="mt-3 space-y-2 pl-5 text-base">
                <li className="list-disc">You need $50K+ and one shot to get it right</li>
                <li className="list-disc">Your file isn't perfect (lates, low age, high utilization)</li>
                <li className="list-disc">You have a time-sensitive use case (deal closing, payroll, inventory buy)</li>
                <li className="list-disc">You don't want to burn 12 months recovering from a bad sequence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-10 text-center text-white md:p-14">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">Ready to Stack?</h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-300">
            If after reading all this you'd rather have us run the entire sequence — we do this every week.
          </p>

          <div className="mx-auto mb-8 max-w-lg text-left">
            <p className="mb-3 font-semibold">What we do:</p>
            <ul className="space-y-2 text-slate-300">
              {[
                "Personal credit prep + cleanup if needed (parallel with our credit repair team)",
                "Full business foundation buildout (LLC, EIN, address, NAICS, DUNS, bank)",
                "Multi-bank stacking sequence — chosen for THIS month's underwriting",
                "Reconsideration calls on every denial",
                "Post-approval credit limit increase strategy at month 3, 6, 9",
                "$50K–$150K total target across personal + business stacks",
              ].map((s) => (
                <li key={s} className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/book">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Book your free 15-min call <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
            <AlertTriangle className="h-4 w-4" />
            Not a fit: "no doc / no PG" expectations, 1099-OID schemes, or wanting funding without 720+ FICO.
          </div>
        </section>
      </article>

      <footer className="py-12 text-center text-sm text-muted-foreground">
        <p>© Ascend Solutions LLC</p>
        <p className="mx-auto mt-2 max-w-lg px-6 text-xs">
          For educational purposes. Not legal or financial advice. Funding outcomes depend on your file, the banks' current underwriting, and your business's specifics.
        </p>
      </footer>
    </div>
  );
};

export default FundingBlueprintPage;
