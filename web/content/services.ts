import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Workflow,
  LineChart,
  Plug,
  Smartphone,
  LifeBuoy,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
};

export const services: Service[] = [
  {
    icon: Code2,
    title: "Custom Software",
    blurb: "Web and mobile applications built for your operations.",
  },
  {
    icon: Workflow,
    title: "Automation",
    blurb: "Workflows, approvals, and processes that save time and reduce errors.",
  },
  {
    icon: LineChart,
    title: "Financial Systems",
    blurb: "Real-time dashboards, reconciliation, and reporting.",
  },
  {
    icon: Plug,
    title: "Integrations",
    blurb: "APIs, third-party tools, and seamless data flow.",
  },
  {
    icon: Smartphone,
    title: "iOS Development",
    blurb: "Native iOS apps shipped to the App Store.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    blurb: "Monitoring, updates, and continuous improvement.",
  },
];
