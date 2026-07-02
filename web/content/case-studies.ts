// Case-study content for /work and /work/[slug].
//
// FACTS: every claim below is drafted from the verified v1 sources catalogued
// in plan-refs/facts-inventory.md (section 1). No metrics are invented: where
// a project has no numbers on record (Concordia Connect), outcomes are
// qualitative by design. Problem-narrative framing is written in the site
// voice and awaits Kevin's fact-check pass before launch (Phase 2 spec,
// open item 3).
//
// Bilingual pattern: structured content module, `Record<Locale, T>` per
// `web/lib/i18n/PATTERN.md` (see `content/proof.ts` for the reference).
// `slug`, `name` (brand), `accent`, `logoSrc`, and `stack[]` (tech proper
// nouns) are identical across locales; everything else is translated.
// `outcomes[].value` keeps its numerals (French-formatted where relevant)
// while `outcomes[].label` is translated.

import type { Locale } from "@/lib/i18n/locale";

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

export const caseStudies: Record<Locale, CaseStudy[]> = {
  en: [
    {
      slug: "concordia-connect",
      name: "Concordia Connect",
      accent: "#8b1d3f",
      tagline: "Connect. Belong. Succeed.",
      oneLiner:
        "A student networking platform for Concordia University. Native iOS and web, with realtime chat and sign-in through Apple and Google.",
      factChips: [
        "Native iOS + web",
        "Realtime chat",
        "Apple & Google sign-in",
      ],
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
  ],
  fr: [
    {
      slug: "concordia-connect",
      name: "Concordia Connect",
      accent: "#8b1d3f",
      tagline: "Se connecter. Appartenir. Réussir.",
      oneLiner:
        "Une plateforme de réseautage étudiant pour l'Université Concordia. Native sur iOS et sur le web, avec clavardage en temps réel et connexion via Apple et Google.",
      factChips: [
        "iOS natif + web",
        "Clavardage en temps réel",
        "Connexion Apple et Google",
      ],
      problem: [
        "Un campus rempli de monde n'est pas la même chose qu'une communauté. Les étudiants partagent des salles de classe et des horaires, et obtiennent quand même leur diplôme sans avoir rencontré les gens qui auraient compté.",
        "Concordia Connect a été conçu pour combler cet écart : un seul réseau pour une seule université, sur les appareils que les étudiants utilisent réellement.",
      ],
      system: [
        {
          title: "Un seul produit, deux plateformes",
          body: "Une application iOS native conçue avec SwiftUI et un client web, appuyés sur le même système Node et PostgreSQL. La communauté est identique, peu importe où on l'ouvre.",
        },
        {
          title: "Un clavardage qui semble instantané",
          body: "La messagerie en temps réel fonctionne avec Socket.IO. Les conversations sont au cœur du produit, pas une fonctionnalité ajoutée après coup.",
        },
        {
          title: "Connexion sans mot de passe",
          body: "La connexion Apple et Google permet aux étudiants d'entrer avec des comptes en qui ils ont déjà confiance. Rien de nouveau à retenir, rien de nouveau à faire fuiter.",
        },
        {
          title: "Livraison web légère et statique",
          body: "Le client web est livré comme un build statique sur Cloudflare Pages, avec Resend pour les courriels et Cloudflare Web Analytics. Rapide à charger, économique à exploiter.",
        },
      ],
      outcomes: [
        { value: "2", label: "Plateformes livrées : iOS natif et web" },
        { value: "Temps réel", label: "Le clavardage au cœur du produit" },
        { value: "Statique", label: "Livraison web sur Cloudflare Pages" },
      ],
      stack: ["Swift", "SwiftUI", "Node", "PostgreSQL", "Socket.IO"],
      logoSrc: "/work/concordia-connect.png",
    },
    {
      slug: "drafterie",
      name: "Drafterie",
      accent: "#6e63ff",
      tagline: "De la page blanche au contrat signé, en quelques minutes",
      oneLiner:
        "Une plateforme complète de génération de contrats et de signature électronique. 8 types de contrats, signatures électroniques intégrées et application compagnon native pour iOS.",
      factChips: [
        "8 types de contrats",
        "Signatures électroniques intégrées",
        "En ligne à draftory.ca",
      ],
      problem: [
        "Les contrats, c'est là où l'élan meurt. Les modèles dérivent, les signatures traînent dans des fils de courriels, et personne ne peut prouver quelle version est celle qui a été signée.",
        "Drafterie condense tout le parcours : choisir un type de contrat, générer un document digne d'un cabinet d'avocats, et le signer au même endroit, avec une piste de vérification derrière chaque signature.",
      ],
      system: [
        {
          title: "Un moteur de contrats, pas un dossier de modèles",
          body: "Drafterie génère 8 types de contrats avec une sortie PDF digne d'un cabinet d'avocats. Les documents sont produits par le système, donc chaque contrat part sur des bases justes.",
        },
        {
          title: "Des signatures avec preuves",
          body: "Les signatures électroniques sont intégrées, appuyées par des pistes de vérification cryptographiques et une signature HMAC-SHA256. On peut prouver qui a signé quoi, et quand.",
        },
        {
          title: "La sécurité traitée comme une fonctionnalité",
          body: "Chiffrement AES-256-GCM, authentification par clé d'accès, authentification à deux facteurs TOTP et authentification JWT. Les données contractuelles sont traitées comme si elles comptaient.",
        },
        {
          title: "Plateforme web, compagnon natif",
          body: "La plateforme fonctionne sur le web avec Stripe pour les paiements, et une application iOS native garde les contrats à portée de main.",
        },
      ],
      outcomes: [
        {
          value: "8",
          label: "Types de contrats avec signatures électroniques intégrées",
        },
        { value: "AES-256", label: "Chiffrement GCM sur les données contractuelles" },
        { value: "En ligne", label: "Web et iOS, à draftory.ca" },
      ],
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
      tagline: "Entiercement réglementé pour les biens numériques",
      oneLiner:
        "Un entiercement sécurisé qui protège acheteurs et vendeurs dans les transactions numériques. Vérification KYC, résolution des litiges, clavardage en temps réel et conformité alignée sur les exigences du CANAFE.",
      factChips: [
        "Registre à double entrée",
        "KYC échelonné",
        "En ligne à skyroa.com",
      ],
      problem: [
        "Les biens numériques s'échangent sur la confiance entre inconnus, ce qui revient à dire qu'ils s'échangent sur l'espoir. Quelqu'un livre en premier, et quelqu'un d'autre décide d'être honnête ou non.",
        "Skyroa élimine ce saut dans le vide. Les fonds restent en entiercement jusqu'à ce que les deux parties livrent, avec des identités vérifiées et un processus de résolution des litiges pour quand les choses tournent mal.",
      ],
      system: [
        {
          title: "Un registre qui ne peut pas dériver",
          body: "Chaque mouvement d'argent est enregistré comme une écriture à double entrée. Les soldes sont dérivés du registre, jamais simplement affirmés, donc les comptes concordent toujours.",
        },
        {
          title: "Un KYC qui s'ajuste au risque",
          body: "Vérification d'identité échelonnée : des limites plus élevées exigent des preuves plus solides, en phase avec les exigences de conformité du CANAFE.",
        },
        {
          title: "Les transactions comme des machines à états",
          body: "Chaque transaction suit un parcours explicite de machine à états. Il n'y a jamais d'ambiguïté sur l'étape où en est une transaction.",
        },
        {
          title: "Les deux parties voient la même vérité",
          body: "Les mises à jour en temps réel par WebSocket et le clavardage intégré gardent l'acheteur et le vendeur synchronisés pendant qu'une transaction est ouverte, avec la résolution des litiges à un pas de distance.",
        },
      ],
      outcomes: [
        {
          value: "2",
          label: "Écritures de registre pour chaque mouvement, par conception",
        },
        {
          value: "CANAFE",
          label: "Conformité alignée, demande au FMSB en cours",
        },
        { value: "En ligne", label: "En production à skyroa.com" },
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
      tagline: "Système de réservation de bout en bout avec opérations en temps réel",
      oneLiner:
        "Une plateforme complète pour une entreprise montréalaise de mécanique mobile. Moteur de réservation sur mesure avec disponibilité des créneaux en direct, tableau de bord administratif synchronisé instantanément avec la base de données, et support bilingue. Le tout construit à partir de zéro.",
      factChips: [
        "Zéro double réservation",
        "Courriel + SMS avec .ics",
        "Bilingue FR / EN",
      ],
      problem: [
        "Pour un mécanicien mobile, l'agenda, c'est l'entreprise. Chaque double réservation est un contrat manqué, un déplacement gaspillé, ou un client qui attend dans un stationnement une camionnette qui ne viendra pas.",
        "AutoMedic a remplacé le flux de travail téléphone-et-carnet par un moteur de réservation qui sait, en temps réel, exactement quels créneaux existent, et refuse de vendre le même deux fois.",
      ],
      system: [
        {
          title: "Réservation transactionnelle",
          body: "Les réservations sont validées à l'intérieur de transactions PostgreSQL : aucune double réservation, aucune condition de concurrence. Deux clients ne peuvent pas gagner le même créneau.",
        },
        {
          title: "Un panneau d'administration qui fait tourner la journée",
          body: "Horaire en direct, gestion complète des services (CRUD), dérogations de dates et statistiques de revenus dans un seul tableau de bord, synchronisé instantanément avec la base de données.",
        },
        {
          title: "Des notifications qui arrivent",
          body: "Confirmations par courriel avec Resend et par SMS avec Twilio, chacune avec une pièce jointe de calendrier .ics, pour que les rendez-vous atterrissent là où les clients regardent réellement.",
        },
        {
          title: "Bilingue par défaut",
          body: "Français et anglais avec changement en temps réel et détection de la langue. Conçu pour la façon dont Montréal parle réellement.",
        },
      ],
      outcomes: [
        {
          value: "0",
          label: "Double réservation, empêchée par la base de données",
        },
        { value: "2", label: "Langues, interchangeables en temps réel" },
        { value: "En ligne", label: "À automedicquebec.com" },
      ],
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
  ],
};

export function getCaseStudy(locale: Locale, slug: CaseSlug): CaseStudy {
  const study = caseStudies[locale].find((c) => c.slug === slug);
  if (!study) {
    throw new Error(`Unknown case study slug: ${slug}`);
  }
  return study;
}

export function nextCaseStudy(locale: Locale, slug: CaseSlug): CaseStudy {
  const list = caseStudies[locale];
  const index = list.findIndex((c) => c.slug === slug);
  return list[(index + 1) % list.length];
}

/**
 * Inline copy for the work index (/work) and case-study page chrome —
 * eyebrows, section labels, and link text that aren't part of a per-project
 * `CaseStudy` record. Colocated here (not in `content/i18n/messages.ts`)
 * per this area's ownership split; consumed via `useLocale()` in
 * `components/work/*`.
 */
export type WorkCopy = {
  index: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    alsoBuilt: string;
    readCaseStudy: string;
  };
  case: {
    caseStudyLabel: string;
    exploreDemo: string;
    theProblem: string;
    theSystemWeBuilt: string;
    systemHeading: (name: string) => string;
    theOutcome: string;
    builtWith: string;
    nextCaseStudy: string;
  };
};

export const workCopy: Record<Locale, WorkCopy> = {
  en: {
    index: {
      eyebrow: "Selected Work",
      titleLine1: "Systems that run",
      titleLine2: "real businesses.",
      intro:
        "Everything shown here was built, shipped, and operated in production.",
      alsoBuilt: "Also built and shipped",
      readCaseStudy: "Read the case study",
    },
    case: {
      caseStudyLabel: "Case Study",
      exploreDemo: "Explore the live demo",
      theProblem: "The Problem",
      theSystemWeBuilt: "The System We Built",
      systemHeading: (name) => `What it took to make ${name} run.`,
      theOutcome: "The Outcome",
      builtWith: "Built with",
      nextCaseStudy: "Next case study",
    },
  },
  fr: {
    index: {
      eyebrow: "Réalisations sélectionnées",
      titleLine1: "Des systèmes qui font tourner",
      titleLine2: "de vraies entreprises.",
      intro:
        "Tout ce qui est présenté ici a été construit, livré et exploité en production.",
      alsoBuilt: "Aussi construit et livré",
      readCaseStudy: "Lire l'étude de cas",
    },
    case: {
      caseStudyLabel: "Étude de cas",
      exploreDemo: "Explorer la démo en direct",
      theProblem: "Le problème",
      theSystemWeBuilt: "Le système que nous avons bâti",
      systemHeading: (name) => `Ce qu'il a fallu pour faire fonctionner ${name}.`,
      theOutcome: "Le résultat",
      builtWith: "Construit avec",
      nextCaseStudy: "Prochaine étude de cas",
    },
  },
};
