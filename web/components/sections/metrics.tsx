import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { StatBlock } from "@/components/stat-block";
import { metrics } from "@/content/metrics";

export function Metrics() {
  return (
    <section className="border-y border-border bg-section">
      <Container className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.06}>
            <StatBlock metric={m} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
