export type ProcessStep = {
  n: number;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: "Map the System",
    body: "We audit your current workflows, data flows, and bottlenecks before writing any code.",
  },
  {
    n: 2,
    title: "Find the Leverage",
    body: "We identify the automations and systems that will deliver the highest operational ROI.",
  },
  {
    n: 3,
    title: "Build and Ship",
    body: "Clean architecture, proper testing, and integration with your existing tools. Deployed to production.",
  },
  {
    n: 4,
    title: "Support and Iterate",
    body: "We monitor performance, train your team, and iterate based on real usage.",
  },
];
