import type { Locale } from "@/lib/i18n/locale";

/**
 * Comparative positioning copy for the "compose your stack" hovercards
 * (`components/diagram/showcase/stack-map.tsx`). Each entry is one option
 * within a layer, and the client is choosing BETWEEN the siblings, so every
 * card reads as a trade-off: why reach for THIS one over its layer siblings,
 * and for what purpose. This is a credibility surface shown to prospective
 * clients, so every pro/con is a real, accurate trade-off, not marketing.
 * Keep items terse.
 *
 * Keyed by the stable option ids in `stack-map.tsx` (35 total). Brand and
 * product names stay English in both locales; only the prose is translated.
 */
export type OptionInfo = { blurb: string; pros: string[]; cons: string[] };

export const stackOptionInfo: Record<Locale, Record<string, OptionInfo>> = {
  en: {
    // Frontend
    nextjs: {
      blurb: "Our default: full-stack React done right",
      pros: ["Routing, SSR, data built in, unlike React", "Best SEO and first paint", "Biggest ecosystem and hiring pool"],
      cons: ["Heavier than plain React for SPAs", "More framework than a simple site needs"],
    },
    react: {
      blurb: "Just the UI layer, you assemble the rest",
      pros: ["Unopinionated, pick your own stack", "Largest ecosystem and hiring pool"],
      cons: ["No routing or SSR, unlike Next.js", "Easy to over-engineer state"],
    },
    vue: {
      blurb: "Reach for it when simplicity wins",
      pros: ["Gentler curve than React", "Clean reactivity, less boilerplate"],
      cons: ["Smaller ecosystem than React", "Smaller hiring pool"],
    },

    // Mobile
    ios: {
      blurb: "Our default: native iOS, best feel",
      pros: ["Best performance and native feel", "First to new iOS features"],
      cons: ["iOS only, Flutter covers both cheaper", "Separate Android build to reach everyone"],
    },
    android: {
      blurb: "Native when Android is the priority",
      pros: ["Full hardware access, best Android feel", "Reaches the largest global audience"],
      cons: ["Android only, Flutter covers both cheaper", "Fragmented devices to test"],
    },
    flutter: {
      blurb: "One codebase for iOS and Android",
      pros: ["Ship both platforms from one codebase", "Faster to build than two native apps"],
      cons: ["Larger app, less native feel than iOS/Android", "Platform-edge features lag native"],
    },

    // Hosting / Edge / CDN
    cloudflare: {
      blurb: "Our default: global edge, cheap bandwidth",
      pros: ["No egress fees, cheapest at scale", "Integrated CDN, DNS, edge worldwide", "Runs close to users everywhere"],
      cons: ["Workers runtime, not full Node", "Vercel is smoother for Next.js"],
    },
    vercel: {
      blurb: "Reach for the best Next.js DX",
      pros: ["Best Next.js deploys and previews", "Zero config, ship in minutes"],
      cons: ["Costs climb fast at scale", "Pricier bandwidth than Cloudflare"],
    },
    railway: {
      blurb: "When you need real containers and DBs",
      pros: ["Runs full containers, not just functions", "Managed databases built in"],
      cons: ["No global edge, unlike Cloudflare", "Pricier than a VPS at scale"],
    },

    // Runtime
    nodejs: {
      blurb: "Our default: one language, front to back",
      pros: ["Same language as the frontend", "Best for I/O-bound APIs", "Huge package ecosystem"],
      cons: ["Weak at CPU work, Go wins there", "Fewer data and ML tools than Python"],
    },
    python: {
      blurb: "Reach for data, ML, and AI work",
      pros: ["Unmatched data, ML, and AI libraries", "Fast to write and read"],
      cons: ["GIL limits CPU parallelism", "Slower than Go for compute"],
    },
    go: {
      blurb: "When throughput and concurrency matter",
      pros: ["Fast, low memory, true concurrency", "Single static binary to deploy"],
      cons: ["Smaller library ecosystem", "More verbose than Python"],
    },

    // Protocol
    rest: {
      blurb: "Our default for public HTTP APIs",
      pros: ["Universally understood, easy to consume", "Caches natively over HTTP", "Simplest to debug and tool"],
      cons: ["Over-fetches, GraphQL avoids that", "Many round trips for nested data"],
    },
    graphql: {
      blurb: "When clients need flexible, nested data",
      pros: ["Clients fetch exactly what they need", "One request for nested data", "Strongly typed schema"],
      cons: ["Caching harder than REST", "Overkill for simple APIs"],
    },
    grpc: {
      blurb: "For fast internal service-to-service calls",
      pros: ["Compact binary, lowest latency", "Strict contracts via protobuf"],
      cons: ["Poor browser support, unlike REST", "Harder to debug than JSON"],
    },

    // Realtime
    socketio: {
      blurb: "Our default: own your realtime layer",
      pros: ["No per-message fees like Pusher or Ably", "Full control, no vendor lock-in", "Battle-tested, huge ecosystem"],
      cons: ["You run and scale the servers", "Sticky sessions or Redis to scale out"],
    },
    pusher: {
      blurb: "Managed realtime, fastest to ship",
      pros: ["Zero infra, live in an hour", "Simple SDKs, predictable at low scale"],
      cons: ["Per-message cost grows with traffic", "Less control than self-hosted Socket.IO"],
    },
    ably: {
      blurb: "Managed realtime built for scale",
      pros: ["Global edge, guaranteed ordering and delivery", "Strong SLAs at high scale"],
      cons: ["Priciest of the three", "Overkill for simple realtime"],
    },

    // Database
    postgresql: {
      blurb: "Our default relational database",
      pros: ["Strongest correctness, rich types like JSONB", "Handles most workloads we build", "Huge ecosystem and extensions"],
      cons: ["Vertical scaling ceiling", "Manual sharding, Mongo scales out easier"],
    },
    mysql: {
      blurb: "When simple, fast reads are the priority",
      pros: ["Fast reads, dead simple to run", "Mature replication, ubiquitous hosting"],
      cons: ["Weaker types and features than Postgres", "Less rigorous than Postgres historically"],
    },
    mongodb: {
      blurb: "For flexible schemas and easy scale-out",
      pros: ["Flexible schema, fast to iterate", "Scales out easier than Postgres"],
      cons: ["Weaker multi-document transactions", "Easy to model data badly"],
    },

    // Cache
    redis: {
      blurb: "Our default: cache plus data structures",
      pros: ["Structures, queues, locks, not just cache", "Optional persistence, unlike Memcached", "Microsecond reads"],
      cons: ["Heavier than Memcached for plain caching", "Memory is expensive"],
    },
    memcached: {
      blurb: "When you only need a fast key cache",
      pros: ["Dead simple, multi-threaded throughput", "Lean for pure key-value caching"],
      cons: ["No data structures, unlike Redis", "No persistence or replication"],
    },

    // Object storage
    r2: {
      blurb: "Our default: S3 API, zero egress fees",
      pros: ["Zero egress fees, unlike S3 and GCS", "S3-compatible API, easy migration", "Cheapest at scale"],
      cons: ["Fewer regions than S3", "Younger, smaller ecosystem"],
    },
    s3: {
      blurb: "When you need AWS depth and reach",
      pros: ["Most proven, most regions", "Deep AWS integration and tiering"],
      cons: ["Egress fees, R2 has none", "Config complexity, easy to misconfigure"],
    },
    gcs: {
      blurb: "The pick inside Google Cloud",
      pros: ["Tightest Google Cloud integration", "Strong analytics and BigQuery tie-ins"],
      cons: ["Egress fees, R2 has none", "Ties you to Google Cloud"],
    },

    // Queue / Jobs
    bullmq: {
      blurb: "Our default: jobs on our existing Redis",
      pros: ["Reuses Redis, no new service", "Retries, scheduling, rate limits built in", "Simple Node integration"],
      cons: ["Node-centric, RabbitMQ is polyglot", "Bound by Redis capacity"],
    },
    rabbitmq: {
      blurb: "When routing and delivery get complex",
      pros: ["Flexible routing and exchanges", "Language-agnostic, strong guarantees"],
      cons: ["Another service to run and scale", "Strains at very high throughput"],
    },
    sqs: {
      blurb: "When you want zero-ops on AWS",
      pros: ["Fully managed, scales automatically", "Cheap and reliable, no servers"],
      cons: ["AWS lock-in", "Ordering only with FIFO queues"],
    },

    // Payments
    stripe: {
      blurb: "Our default: best developer payments API",
      pros: ["Best-in-class API and docs", "Cards, wallets, subscriptions in one", "Strong fraud and billing tooling"],
      cons: ["Percentage fee per charge", "Weaker in-person than Square"],
    },
    paypal: {
      blurb: "When buyer trust drives conversion",
      pros: ["High buyer trust lifts conversion", "Instant reach to PayPal users"],
      cons: ["Clunkier API than Stripe", "Fund holds and disputes"],
    },
    square: {
      blurb: "When in-person is the main channel",
      pros: ["Best point-of-sale hardware", "Unifies in-store and online"],
      cons: ["Weaker for pure online scale", "Smaller developer ecosystem"],
    },

    // Observability
    sentry: {
      blurb: "Our default: fast app error triage",
      pros: ["Best error triage with stack traces", "Easy SDK, live in minutes", "Release and regression tracking"],
      cons: ["Not full infra metrics like Datadog", "Event volume drives cost"],
    },
    grafana: {
      blurb: "When you want open, self-hosted metrics",
      pros: ["Flexible dashboards, any data source", "Open source, no vendor lock-in"],
      cons: ["You assemble and run the stack", "Ops overhead to run well"],
    },
    datadog: {
      blurb: "When you want everything in one platform",
      pros: ["Metrics, logs, traces unified", "Turnkey, vast integrations"],
      cons: ["Expensive, hard to predict cost", "Overkill for small apps"],
    },
  },

  fr: {
    // Frontend
    nextjs: {
      blurb: "Notre défaut: React full-stack bien fait",
      pros: ["Routing, SSR et data intégrés, pas comme React", "Meilleur SEO et premier rendu", "Plus grand écosystème et bassin de talents"],
      cons: ["Plus lourd que React seul pour un SPA", "Trop de framework pour un site simple"],
    },
    react: {
      blurb: "Juste l'UI, vous assemblez le reste",
      pros: ["Non-opiniâtre, choisissez votre stack", "Plus grand écosystème et bassin de talents"],
      cons: ["Ni routing ni SSR, pas comme Next.js", "Facile à sur-architecturer l'état"],
    },
    vue: {
      blurb: "À privilégier quand la simplicité prime",
      pros: ["Courbe plus douce que React", "Réactivité propre, moins de boilerplate"],
      cons: ["Écosystème plus petit que React", "Bassin de talents plus restreint"],
    },

    // Mobile
    ios: {
      blurb: "Notre défaut: iOS natif, meilleur rendu",
      pros: ["Meilleures performances et rendu natif", "Premier accès aux nouveautés iOS"],
      cons: ["iOS seulement, Flutter couvre les deux", "Build Android séparé pour tout couvrir"],
    },
    android: {
      blurb: "Natif quand Android est prioritaire",
      pros: ["Accès matériel complet, meilleur rendu Android", "Touche le plus large public mondial"],
      cons: ["Android seulement, Flutter couvre les deux", "Fragmentation des appareils à tester"],
    },
    flutter: {
      blurb: "Un seul code pour iOS et Android",
      pros: ["Les deux plateformes depuis un seul code", "Plus rapide que deux apps natives"],
      cons: ["App plus lourde, moins natif qu'iOS/Android", "Fonctions natives de pointe en retard"],
    },

    // Hosting / Edge / CDN
    cloudflare: {
      blurb: "Notre défaut: edge mondial, bande passante bon marché",
      pros: ["Aucun frais de sortie, moins cher à l'échelle", "CDN, DNS et edge intégrés mondialement", "Exécution proche des utilisateurs partout"],
      cons: ["Runtime Workers, pas Node complet", "Vercel plus fluide pour Next.js"],
    },
    vercel: {
      blurb: "Pour la meilleure expérience Next.js",
      pros: ["Meilleurs déploiements et previews Next.js", "Zéro config, en ligne en minutes"],
      cons: ["Coûts qui grimpent vite à l'échelle", "Bande passante plus chère que Cloudflare"],
    },
    railway: {
      blurb: "Quand il faut vrais conteneurs et bases",
      pros: ["Exécute de vrais conteneurs, pas que des fonctions", "Bases de données managées incluses"],
      cons: ["Pas d'edge mondial, pas comme Cloudflare", "Plus cher qu'un VPS à l'échelle"],
    },

    // Runtime
    nodejs: {
      blurb: "Notre défaut: un langage, du front au back",
      pros: ["Même langage que le frontend", "Idéal pour les API orientées I/O", "Écosystème de paquets immense"],
      cons: ["Faible en calcul CPU, Go l'emporte", "Moins d'outils data et ML que Python"],
    },
    python: {
      blurb: "Pour la data, le ML et l'IA",
      pros: ["Bibliothèques data, ML et IA inégalées", "Rapide à écrire et lire"],
      cons: ["Le GIL limite le parallélisme", "Plus lent que Go pour le calcul"],
    },
    go: {
      blurb: "Quand débit et concurrence comptent",
      pros: ["Rapide, léger, vraie concurrence", "Binaire statique unique à déployer"],
      cons: ["Écosystème de librairies plus restreint", "Plus verbeux que Python"],
    },

    // Protocol
    rest: {
      blurb: "Notre défaut pour les API HTTP publiques",
      pros: ["Universellement compris, facile à consommer", "Cache natif via HTTP", "Le plus simple à déboguer"],
      cons: ["Sur-récupère, GraphQL l'évite", "Nombreux allers-retours pour l'imbriqué"],
    },
    graphql: {
      blurb: "Quand le client veut des données flexibles",
      pros: ["Le client récupère juste le nécessaire", "Une requête pour les données imbriquées", "Schéma fortement typé"],
      cons: ["Cache plus dur qu'en REST", "Excessif pour des API simples"],
    },
    grpc: {
      blurb: "Pour les appels rapides entre services",
      pros: ["Binaire compact, latence minimale", "Contrats stricts via protobuf"],
      cons: ["Support navigateur faible, pas comme REST", "Plus dur à déboguer que JSON"],
    },

    // Realtime
    socketio: {
      blurb: "Notre défaut: maîtrisez votre couche temps réel",
      pros: ["Aucun frais par message, contrairement à Pusher ou Ably", "Contrôle total, sans dépendance fournisseur", "Éprouvé, écosystème immense"],
      cons: ["Serveurs à gérer et scaler", "Sessions collantes ou Redis pour scaler"],
    },
    pusher: {
      blurb: "Temps réel managé, le plus rapide à livrer",
      pros: ["Zéro infra, en ligne en une heure", "SDK simples, prévisible à petite échelle"],
      cons: ["Le coût par message grimpe avec le trafic", "Moins de contrôle que Socket.IO auto-hébergé"],
    },
    ably: {
      blurb: "Temps réel managé conçu pour l'échelle",
      pros: ["Edge mondial, ordre et livraison garantis", "SLA solides à grande échelle"],
      cons: ["Le plus cher des trois", "Excessif pour du temps réel simple"],
    },

    // Database
    postgresql: {
      blurb: "Notre base relationnelle par défaut",
      pros: ["Meilleure rigueur, types riches comme JSONB", "Couvre la plupart de nos charges", "Écosystème et extensions immenses"],
      cons: ["Plafond de scaling vertical", "Sharding manuel, Mongo scale plus facilement"],
    },
    mysql: {
      blurb: "Quand des lectures rapides et simples priment",
      pros: ["Lectures rapides, très simple à opérer", "Réplication mature, hébergement omniprésent"],
      cons: ["Types et fonctions plus limités que Postgres", "Historiquement moins rigoureux que Postgres"],
    },
    mongodb: {
      blurb: "Pour un schéma flexible et le scale-out",
      pros: ["Schéma flexible, itération rapide", "Scale plus facilement que Postgres"],
      cons: ["Transactions multi-documents plus faibles", "Facile de mal modéliser les données"],
    },

    // Cache
    redis: {
      blurb: "Notre défaut: cache plus structures de données",
      pros: ["Structures, files, verrous, pas que du cache", "Persistance optionnelle, pas comme Memcached", "Lectures en microsecondes"],
      cons: ["Plus lourd que Memcached pour du cache simple", "La mémoire coûte cher"],
    },
    memcached: {
      blurb: "Quand un cache clé-valeur rapide suffit",
      pros: ["Très simple, débit multi-thread", "Léger pour du pur cache clé-valeur"],
      cons: ["Pas de structures, pas comme Redis", "Ni persistance ni réplication"],
    },

    // Object storage
    r2: {
      blurb: "Notre défaut: API S3, zéro frais de sortie",
      pros: ["Zéro frais de sortie, pas comme S3 et GCS", "API compatible S3, migration facile", "Le moins cher à l'échelle"],
      cons: ["Moins de régions que S3", "Écosystème plus jeune et petit"],
    },
    s3: {
      blurb: "Pour la profondeur et la portée d'AWS",
      pros: ["Le plus éprouvé, le plus de régions", "Intégration AWS profonde et tiering"],
      cons: ["Frais de sortie, R2 n'en a pas", "Config complexe, erreurs faciles"],
    },
    gcs: {
      blurb: "Le choix au sein de Google Cloud",
      pros: ["Intégration Google Cloud la plus étroite", "Liens forts avec l'analytique et BigQuery"],
      cons: ["Frais de sortie, R2 n'en a pas", "Vous lie à Google Cloud"],
    },

    // Queue / Jobs
    bullmq: {
      blurb: "Notre défaut: jobs sur notre Redis existant",
      pros: ["Réutilise Redis, aucun service en plus", "Retries, planification, limites de débit inclus", "Intégration Node simple"],
      cons: ["Centré Node, RabbitMQ est polyglotte", "Limité par la capacité Redis"],
    },
    rabbitmq: {
      blurb: "Quand routage et livraison se compliquent",
      pros: ["Routage et exchanges flexibles", "Agnostique au langage, garanties solides"],
      cons: ["Un service de plus à opérer et scaler", "Peine à très haut débit"],
    },
    sqs: {
      blurb: "Quand vous voulez zéro-ops sur AWS",
      pros: ["Entièrement managé, scaling automatique", "Fiable et peu coûteux, sans serveurs"],
      cons: ["Dépendance à AWS", "Ordre garanti seulement en FIFO"],
    },

    // Payments
    stripe: {
      blurb: "Notre défaut: la meilleure API de paiement",
      pros: ["API et docs de premier plan", "Cartes, wallets, abonnements réunis", "Outils anti-fraude et facturation solides"],
      cons: ["Commission sur chaque transaction", "Moins fort en personne que Square"],
    },
    paypal: {
      blurb: "Quand la confiance acheteur booste la conversion",
      pros: ["Forte confiance acheteur, meilleure conversion", "Portée immédiate aux utilisateurs PayPal"],
      cons: ["API moins fluide que Stripe", "Blocages de fonds et litiges"],
    },
    square: {
      blurb: "Quand le point de vente est le canal principal",
      pros: ["Meilleur matériel de point de vente", "Unifie boutique physique et en ligne"],
      cons: ["Moins fort pour le pur en ligne", "Écosystème développeur plus petit"],
    },

    // Observability
    sentry: {
      blurb: "Notre défaut: triage rapide des erreurs",
      pros: ["Meilleur triage d'erreurs avec stack traces", "SDK simple, en ligne en minutes", "Suivi des releases et régressions"],
      cons: ["Pas de métriques d'infra comme Datadog", "Le volume d'événements coûte cher"],
    },
    grafana: {
      blurb: "Pour des métriques ouvertes et auto-hébergées",
      pros: ["Dashboards flexibles, toute source de données", "Open source, sans dépendance fournisseur"],
      cons: ["Stack à assembler et opérer soi-même", "Charge d'exploitation pour bien tourner"],
    },
    datadog: {
      blurb: "Quand vous voulez tout sur une plateforme",
      pros: ["Métriques, logs, traces unifiés", "Clé en main, intégrations très nombreuses"],
      cons: ["Coûteux, tarification difficile à prévoir", "Excessif pour de petites apps"],
    },
  },
};
