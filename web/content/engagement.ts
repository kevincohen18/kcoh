export type EngagementStep = {
  n: number;
  title: string;
  body: string;
  meta: string;
};

export const engagementSteps: EngagementStep[] = [
  {
    n: 1,
    title: "Discovery Call",
    body: "A 30-minute call. No pitch, no pressure. Just a conversation about your systems and where the leverage is.",
    meta: "30 minutes",
  },
  {
    n: 2,
    title: "Proposal",
    body: "We scope the workflows with you, then provide a fixed quote. Project-based pricing, no hourly billing, no surprises.",
    meta: "Fixed quote after discovery",
  },
  {
    n: 3,
    title: "Build",
    body: "Weekly increments with working demos. Clean architecture, proper testing, and integration with your existing tools. Most projects run 4-12 weeks.",
    meta: "4-12 weeks typical",
  },
  {
    n: 4,
    title: "Support",
    body: "Every project includes 30-90 days of post-launch support. After that, retainers cover iteration, monitoring, and optimization.",
    meta: "30-90 days included",
  },
];

export const pricingNote =
  "Clear starting points: iOS MVPs from $5k, web platforms from $10k, full product builds from $20k. All projects include discovery, a fixed-price quote, and post-launch support.";
