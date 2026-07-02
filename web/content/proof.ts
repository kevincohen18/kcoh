export type ProofPoint = {
  value: string;
  label: string;
  context: string;
};

export const proofHeading = "Built from real operating experience";

export const proofBody =
  "These systems come from operating them, not just building them — scaling a platform, running the day-to-day, wiring up automations, shipping apps, and managing thousands of real users.";

export const proofPoints: ProofPoint[] = [
  {
    value: "7-figure",
    label: "platform",
    context: "Built and operated from the inside.",
  },
  {
    value: "2,600+",
    label: "members",
    context: "Managed across real workflows and systems.",
  },
  {
    value: "10+",
    label: "apps shipped",
    context: "Production tools brought from idea to live usage.",
  },
  {
    value: "100%",
    label: "ownership",
    context: "Systems we maintain, improve, and stand behind.",
  },
];
