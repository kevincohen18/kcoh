// Case-study content for /work and /work/[slug].
//
// FACTS: every claim below is drafted from the verified v1 sources catalogued
// in plan-refs/facts-inventory.md (section 1). No metrics are invented: where
// a project has no numbers on record (Concordia Connect), outcomes are
// qualitative by design. Problem-narrative framing is written in the site
// voice and awaits Kevin's fact-check pass before launch (Phase 2 spec,
// open item 3).

export type CaseSlug =
  | "concordia-connect"
  | "drafterie"
  | "skyroa"
  | "automedic";

export type CaseStudy = {
  slug: CaseSlug;
  name: string;
  accent: string;
  tagline: string;
  oneLiner: string;
  factChips: [string, string, string];
  problem: string[];
  system: { title: string; body: string }[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  logoSrc: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "concordia-connect",
    name: "Concordia Connect",
    accent: "#8b1d3f",
    tagline: "Connect. Belong. Succeed.",
    oneLiner:
      "A student networking platform for Concordia University. Native iOS and web, with realtime chat and sign-in through Apple and Google.",
    factChips: ["Native iOS + web", "Realtime chat", "Apple & Google sign-in"],
    problem: [
      "A campus full of people is not the same thing as a community. Students share classrooms and schedules, and still graduate without meeting the people who would have mattered.",
      "Concordia Connect was built to close that gap: one network for one university, on the devices students actually live on.",
    ],
    system: [
      {
        title: "One product, two clients",
        body: "A native iOS app built in SwiftUI and a web client, backed by the same Node and PostgreSQL system. The community is identical wherever you open it.",
      },
      {
        title: "Chat that feels instant",
        body: "Realtime messaging runs over Socket.IO. Conversations are the core of the product, not a feature bolted on.",
      },
      {
        title: "Sign-in without passwords",
        body: "Apple and Google sign-in get students in with accounts they already trust. Nothing new to remember, nothing new to leak.",
      },
      {
        title: "Lean, static web delivery",
        body: "The web client ships as a static build on Cloudflare Pages, with Resend for email and Cloudflare Web Analytics. Fast to load and cheap to operate.",
      },
    ],
    // No public metrics on record for Concordia Connect (facts inventory
    // section 1) — outcomes are qualitative statements of shipped scope.
    // None invented.
    outcomes: [
      { value: "2", label: "Clients shipped: native iOS and web" },
      { value: "Realtime", label: "Chat at the center of the product" },
      { value: "Static", label: "Web delivery on Cloudflare Pages" },
    ],
    stack: ["Swift", "SwiftUI", "Node", "PostgreSQL", "Socket.IO"],
    logoSrc: "/work/concordia-connect.png",
  },
  {
    slug: "drafterie",
    name: "Drafterie",
    accent: "#6e63ff",
    tagline: "From blank page to signed contract in minutes",
    // v1 index.html verbatim description. The live domain is draftory.ca;
    // the product name is standardized as Drafterie (commit 55b1468).
    oneLiner:
      "A full contract generation and e-signature platform. 8 contract types, built-in electronic signatures, and a native iOS companion app.",
    factChips: [
      "8 contract types",
      "Built-in e-signatures",
      "Live at draftory.ca",
    ],
    problem: [
      "Contracts are where momentum goes to die. Templates drift, signatures crawl through email threads, and nobody can prove which version was the one that got signed.",
      "Drafterie compresses the whole path: pick a contract type, generate a document of law-firm quality, and sign it in the same place, with an audit trail behind every signature.",
    ],
    system: [
      {
        title: "A contract engine, not a template folder",
        body: "Drafterie generates 8 contract types with law-firm quality PDF output. Documents are produced by the system, so every contract starts correct.",
      },
      {
        title: "Signatures with receipts",
        body: "Electronic signatures are built in, backed by cryptographic audit trails and HMAC-SHA256 signing. Who signed what, and when, is provable.",
      },
      {
        title: "Security treated as a feature",
        body: "AES-256-GCM encryption, passkey authentication, TOTP two-factor, and JWT auth. Contract data is handled like it matters.",
      },
      {
        title: "Web platform, native companion",
        body: "The platform runs on the web with Stripe handling payments, and a native iOS app keeps contracts within reach.",
      },
    ],
    outcomes: [
      { value: "8", label: "Contract types with built-in e-signatures" },
      { value: "AES-256", label: "GCM encryption on contract data" },
      { value: "Live", label: "Web and iOS, at draftory.ca" },
    ],
    // CONFLICT (facts inventory section 1): v1 portfolio.html says SQLite;
    // the newer projects.ts says PostgreSQL. Using the fuller v1 list until
    // Kevin's fact-check pass resolves it.
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "SQLite",
      "Stripe",
      "Cloudflare Pages",
      "Railway",
      "Swift",
    ],
    logoSrc: "/work/drafterie.png",
  },
  {
    slug: "skyroa",
    name: "Skyroa",
    accent: "#4f46e5",
    tagline: "Regulated escrow for digital goods",
    oneLiner:
      "Secure escrow protecting buyers and sellers in digital transactions. KYC verification, dispute resolution, real-time chat, and FINTRAC-aligned compliance.",
    factChips: ["Double-entry ledger", "Tiered KYC", "Live at skyroa.com"],
    problem: [
      "Digital goods trade on trust between strangers, which is to say they trade on hope. Someone ships first, and someone else decides whether to be honest.",
      "Skyroa removes the leap of faith. Funds sit in escrow until both sides deliver, with verified identities and a dispute process for when things go sideways.",
    ],
    system: [
      {
        title: "A ledger that cannot drift",
        body: "Every movement of money lands as a double-entry record. Balances are derived from the ledger, not asserted, so the books always reconcile.",
      },
      {
        title: "KYC that scales with risk",
        body: "Tiered identity verification: higher limits require stronger proof, in line with FINTRAC-aligned compliance.",
      },
      {
        title: "Trades as state machines",
        body: "Every trade moves through an explicit state-machine flow. There is never ambiguity about where a transaction stands.",
      },
      {
        title: "Both sides see the same truth",
        body: "WebSocket realtime updates and built-in chat keep buyer and seller in sync while a trade is open, with dispute resolution one step away.",
      },
    ],
    outcomes: [
      { value: "2", label: "Ledger entries for every movement, by design" },
      {
        value: "FINTRAC",
        label: "Aligned compliance, FMSB application in progress",
      },
      { value: "Live", label: "In production at skyroa.com" },
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Stripe",
      "Plaid",
      "React",
      "Cloudflare Workers",
    ],
    logoSrc: "/work/skyroa.png",
  },
  {
    slug: "automedic",
    name: "AutoMedic",
    accent: "#16a34a",
    tagline: "End-to-end booking system with real-time ops",
    oneLiner:
      "A full platform for a Montreal mobile mechanic business. Custom booking engine with live slot availability, admin dashboard with instant database sync, and bilingual support. All built from scratch.",
    factChips: [
      "Zero double-bookings",
      "Email + SMS with .ics",
      "Bilingual EN / FR",
    ],
    problem: [
      "For a mobile mechanic, the calendar is the business. Every double-booking is a missed job, a wasted drive, or a customer waiting in a parking lot for a van that is not coming.",
      "AutoMedic replaced the phone-and-notebook workflow with a booking engine that knows, in real time, exactly which slots exist and refuses to sell the same one twice.",
    ],
    system: [
      {
        title: "Transactional booking",
        body: "Bookings commit inside PostgreSQL transactions: no double-books, no race conditions. Two customers cannot win the same slot.",
      },
      {
        title: "An admin panel that runs the day",
        body: "Live schedule, service CRUD, date overrides, and revenue stats in one dashboard, synced instantly with the database.",
      },
      {
        title: "Notifications that arrive",
        body: "Resend email and Twilio SMS confirmations, each with an .ics calendar attachment, so appointments land where customers actually look.",
      },
      {
        title: "Bilingual by default",
        body: "English and French with runtime switching and locale detection. Built for how Montreal actually talks.",
      },
    ],
    outcomes: [
      { value: "0", label: "Double-bookings, enforced by the database" },
      { value: "2", label: "Languages, switchable at runtime" },
      { value: "Live", label: "At automedicquebec.com" },
    ],
    // CONFLICT (facts inventory section 1): projects.ts lists React Native;
    // v1 says a vanilla-JS web front end with Node/Express/PostgreSQL. Using
    // v1 until Kevin's fact-check pass resolves it.
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Resend",
      "Twilio",
      "Railway",
      "Cloudflare",
    ],
    logoSrc: "/work/automedic.png",
  },
];

export function getCaseStudy(slug: CaseSlug): CaseStudy {
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) {
    throw new Error(`Unknown case study slug: ${slug}`);
  }
  return study;
}

export function nextCaseStudy(slug: CaseSlug): CaseStudy {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}
