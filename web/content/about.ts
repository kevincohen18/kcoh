export type ProofPoint = { title: string; body: string };
export type Principle = { title: string; body: string };

export const aboutIntro =
  "I built and operated a 7-figure digital platform with 2,600+ members. Handled payments, disputes, support, abuse, and uptime. I apply that systems thinking to businesses through KCOH Software Inc.";

export const founderStory: string[] = [
  "Most developers build what you spec. I've been on the other side, operating a platform with thousands of members, handling payments, disputes, uptime, and the kind of edge cases that only show up at scale.",
  "That experience changed how I build. I design systems around how businesses actually run, not how they look in a wireframe. Financial clarity, automated workflows, operational leverage. These aren't features I list. They're problems I've solved for myself.",
  "When I build for you, I'm applying judgment I earned by operating, not just engineering.",
];

export const proofPoints: ProofPoint[] = [
  {
    title: "Digital platform",
    body: "Built and operated a 7-figure platform with 2,600+ members.",
  },
  {
    title: "iOS apps",
    body: "10+ production apps shipped to the App Store.",
  },
  {
    title: "Payment operations",
    body: "Managed payment flows, disputes, and reconciliation at scale.",
  },
];

export const stepDetails: Record<number, string> = {
  1: "We sit with your actual workflows: orders, payments, support, reporting. We trace where time and money leak, and name the bottlenecks and edge cases before any code is written.",
  2: "Not everything is worth automating. We rank the work by operational ROI, then agree on a fixed scope and a fixed quote. No hourly billing, no surprises.",
  3: "We build in weekly increments with demos of actual working software, not status decks. Clean architecture, proper testing, and integration with the tools you already run.",
  4: "Launch is not the end. Every project includes 30-90 days of post-launch support. We monitor performance, train your team, and iterate on real usage.",
};

export const principles: Principle[] = [
  {
    title: "Clear scoping",
    body: "Fixed quotes after discovery. Clear scope, clear price, no surprises.",
  },
  {
    title: "Weekly progress",
    body: "Real software every week, with measurable results. Never status decks.",
  },
  {
    title: "Durable stack",
    body: "Swift, React, Node, and cloud infrastructure. Tools chosen for durability and speed, not trends.",
  },
  {
    title: "Leverage first",
    body: "Focus on what creates leverage for your business. No fluff.",
  },
];
