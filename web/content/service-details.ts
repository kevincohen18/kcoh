export type ServiceSlug =
  | "custom-software"
  | "automation"
  | "financial-systems"
  | "integrations"
  | "ios-development"
  | "ongoing-support";

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  heading: string;
  problem: string;
  deliverables: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Custom Software",
    heading: "Software built around how you actually operate.",
    problem:
      "Off-the-shelf tools force your operations into someone else's shape. We design, build, and operate cohesive systems across mobile, web, and backend, with one owner from first sketch to production. No handoffs, no silos.",
    deliverables: [
      "One operator across mobile, web, and API",
      "Design, build, deploy, and support under one roof",
      "Measured on stability, shipping speed, and adoption",
    ],
  },
  {
    slug: "automation",
    title: "Automation",
    heading: "Manual work, retired.",
    problem:
      "Repetitive workflows drain hours and invite errors. We replace manual processes with durable automation across operations, fulfillment, customer communications, and finance. Then we keep measuring it after launch.",
    deliverables: [
      "80%+ of repetitive tasks automated, fewer tickets",
      "Existing tools connected, edge cases handled",
      "Monitored, measured, and iterated after launch",
    ],
  },
  {
    slug: "financial-systems",
    title: "Financial Systems",
    heading: "One view of the money.",
    problem:
      "When payments, subscriptions, cards, and accounting live in separate tools, nobody knows the real number. We unify them into a single view, with reconciliation, dispute flows, and reporting handled.",
    deliverables: [
      "Weekly cashflow and P&L dashboards",
      "Dispute automation, refunds, and edge cases covered",
      "Fee reduction and processor optimization",
    ],
  },
  {
    slug: "integrations",
    title: "Integrations",
    heading: "Your tools, finally talking.",
    problem:
      "Most engagements connect to what you already run instead of replacing everything at once. API integrations, webhooks, and data migrations are standard, and your team gets trained on the result.",
    deliverables: [
      "APIs, webhooks, and data migrations",
      "Third-party tools and databases wired into one flow",
      "Your team trained on the new systems",
    ],
  },
  {
    slug: "ios-development",
    title: "iOS Development",
    heading: "Native iOS, shipped to the App Store.",
    problem:
      "We build native iOS in Swift and SwiftUI. More than ten production apps shipped to the App Store, built to hold up with real users.",
    deliverables: [
      "Swift and SwiftUI, native performance",
      "App Store submission handled end to end",
      "Backend integration included",
    ],
  },
  {
    slug: "ongoing-support",
    title: "Ongoing Support",
    heading: "We stand behind what we ship.",
    problem:
      "Software is not done at launch. Every project includes 30-90 days of post-launch support depending on scope. After that, retainers cover iteration, monitoring, and optimization on real usage.",
    deliverables: [
      "30-90 days of post-launch support on every project",
      "Retainers for iteration, monitoring, and optimization",
      "Runbooks and training for your team",
    ],
  },
];
