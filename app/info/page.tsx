import { PortalChrome } from "@/components/portal/PortalChrome";
import { Accordion } from "@/components/portal/Accordion";
import { Logo } from "@/components/brand/Logo";

const PLAY_STEPS: [string, string][] = [
  ["Subscribe", "Dial *647# and choose Daily (US$0.05), Weekly (US$0.10) or Monthly (US$0.25)."],
  ["Match the Daily Number", "Each day we compare your mobile number with the Daily Number — the more of your last digits that match, the bigger your airtime prize, up to the Grand Win."],
  ["Play Pick a Card", "Open the Pick a Card promo, flip a card and reveal an airtime prize."],
  ["Collect points", "Participation, matches and daily streaks build up points that turn into airtime prizes through Pick a Card."],
  ["Win your prize", "Airtime is credited to your line with a confirmation SMS."],
  ["Come back daily", "A fresh Daily Number and new flips await each day — keep your streak for bonus points."],
];

const FAQS: [string, string][] = [
  ["What is YoNumbers?", "A gamified rewards experience by Econet Wireless Zimbabwe. You play and win airtime by matching a Daily Number and by playing Pick a Card."],
  ["How do I subscribe?", "Dial *647# (Daily / Weekly / Monthly) or subscribe on the portal."],
  ["How much does it cost?", "Daily US$0.05, Weekly US$0.10, Monthly US$0.25, charged to your Econet line. Confirm current pricing on *647#."],
  ["How do I win a prize?", "Match from 2 up to 8 digits of your number with the Daily Number — the more digits, the bigger the airtime prize. A full match is the Grand Win, our top prize."],
  ["What is Pick a Card?", "An in-portal promo: take part to collect points, then flip cards to win airtime prizes."],
  ["Is this gambling or a lottery?", "No. YoNumbers is a rewards programme — no betting, staking or gambling. You subscribe to a service and play to win airtime prizes for taking part."],
  ["How do I unsubscribe?", "Dial *647# and choose unsubscribe, or manage it on the portal; you'll get an SMS confirmation."],
];

export default function InfoPage() {
  return (
    <PortalChrome title="Information" showLauncher>
      <div className="pt-2">
        <div className="mb-5 mt-2 flex justify-center">
          <Logo variant="navy" className="w-36" priority />
        </div>

        <Accordion title="About YoNumbers" defaultOpen>
          <div className="flex flex-col gap-3 font-body text-slate-600">
            <p>
              YoNumbers is a gamified rewards experience by{" "}
              <span className="font-bold text-navy-700">Econet Wireless Zimbabwe</span> — a simple,
              fun way for subscribers to play and win airtime just by being part of the Econet family.
            </p>
            <p>
              Every day, YoNumbers generates a <span className="font-bold text-navy-700">Daily Number</span>.
              If the last digits of your mobile number match it, you win an airtime prize — and the more
              digits match, the bigger the prize, up to the <span className="font-bold text-navy-700">Grand Win</span>.
              Alongside it, Pick a Card lets you play and win: take part, collect points, and flip cards to
              reveal airtime prizes.
            </p>
            <p>
              No catches, no complicated rules — just take part, match, and win. Subscribe by dialling{" "}
              <span className="font-extrabold text-brand-red">*647#</span>.
            </p>
          </div>
        </Accordion>

        <Accordion title="How to Play &amp; Win Big">
          <ol className="flex list-decimal flex-col gap-3 pl-5 font-body text-slate-600">
            {PLAY_STEPS.map(([h, b]) => (
              <li key={h}>
                <span className="font-extrabold text-navy-700">{h}.</span> {b}
              </li>
            ))}
          </ol>
        </Accordion>

        <Accordion title="FAQs">
          <div className="flex flex-col gap-4 font-body text-slate-600">
            {FAQS.map(([q, a]) => (
              <div key={q}>
                <p className="font-extrabold text-navy-700">{q}</p>
                <p className="mt-0.5">{a}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="Terms &amp; Conditions">
          <div className="flex flex-col gap-3 font-body text-slate-600">
            <p>
              YoNumbers (&ldquo;the Service&rdquo;) is operated by Econet Wireless Zimbabwe. It is a
              subscription-based rewards / play-and-win programme — not a lottery, draw, betting or
              gambling service. Subscribers pay a subscription fee and may win airtime prizes for participating.
            </p>
            <p>
              Eligibility requires an active Econet subscription via *647# or the portal that is successfully
              charged. Each day Econet generates a Daily Number; airtime prizes follow the published tiers
              based on matching trailing digits, and only the highest qualifying tier is awarded. Points are
              non-transferable, hold no cash value and turn into airtime prizes only through the Service.
            </p>
            <p>
              Prizes are credited to the subscriber&rsquo;s Econet line and are non-transferable and
              non-refundable. Econet may vary tiers, values, mechanics, pricing and limits with notice.
              These terms are governed by the laws of Zimbabwe. Manage or stop your subscription anytime by
              dialling <span className="font-extrabold text-brand-red">*647#</span>.
            </p>
            <p className="text-xs text-slate-400">
              Standard network rates apply. Full terms are subject to Econet Legal / Regulatory approval.
            </p>
          </div>
        </Accordion>
      </div>
    </PortalChrome>
  );
}
