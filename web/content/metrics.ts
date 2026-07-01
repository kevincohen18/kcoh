export type Metric = {
  value: number;
  suffix?: string;
  display?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: 7, display: "7-FIGURE", label: "Platform built and operated" },
  { value: 2600, suffix: "+", label: "Members managed at scale" },
  { value: 10, suffix: "+", label: "Production apps shipped" },
  { value: 100, suffix: "%", label: "Systems we stand behind" },
];
