import { PortalChrome } from "@/components/portal/PortalChrome";
import { Accordion } from "@/components/portal/Accordion";
import { Lockup } from "@/components/brand/Lockup";

const STEPS: [string, string][] = [
  ["Dial *647# and Subscribe:", "Choose YoNumbers daily or weekly subscription."],
  ["Pick a Card:", "Enter the game and select your card from the deck."],
  ["Reveal Your Reward:", "Instantly see if you've won airtime, data, or other prizes."],
  ["See What You Missed:", "Check the rewards hidden behind the other cards."],
  ["Play Again:", "Come back daily to play and win again."],
  ["Claim Your Prize:", "Redeem your reward instantly and enjoy!"],
];

export default function InfoPage() {
  return (
    <PortalChrome title="Information" showLauncher>
      <div className="pt-2">
        <div className="mb-4 flex justify-end">
          <Lockup variant="purple" className="w-40" />
        </div>

        <Accordion title="How it works" defaultOpen>
          <ol className="flex list-decimal flex-col gap-3 pl-5 font-body text-navy-500">
            {STEPS.map(([h, b]) => (
              <li key={h}>
                <span className="font-extrabold text-navy-700">{h}</span> {b}
              </li>
            ))}
          </ol>
        </Accordion>

        <Accordion title="Terms and Conditions">
          <p className="font-body text-navy-500">
            By subscribing to YoNumbers you agree to be bound by the service&rsquo;s
            Terms &amp; Conditions. Standard network rates apply. Prizes are awarded
            per the published prize tiers and credited to the subscribed MSISDN. Econet
            Wireless reserves the right to vary prize tiers and daily play limits.
          </p>
        </Accordion>

        <Accordion title="About">
          <p className="font-body text-navy-500">
            YoNumbers is a gamified airtime &amp; data rewards experience by Econet
            Wireless. Pick a Card &amp; Win lets subscribers play daily to win
            Airtime, Data &amp; More. Dial <span className="font-extrabold text-navy-700">*647#</span> to get started.
          </p>
        </Accordion>
      </div>
    </PortalChrome>
  );
}
