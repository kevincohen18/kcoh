import type { Locale } from "@/lib/i18n/locale";

/**
 * Risk-assessment copy for the "compose your stack" hovercards
 * (`components/diagram/showcase/stack-map.tsx`). Each entry is an honest
 * senior engineering read on one option: what it is, what it buys you, what
 * it costs you. This is a credibility surface shown to prospective clients,
 * so every pro/con is a real trade-off, not marketing. Keep items terse.
 *
 * Keyed by the stable option ids in `stack-map.tsx` (35 total). Brand and
 * product names stay English in both locales; only the prose is translated.
 */
export type OptionInfo = { blurb: string; pros: string[]; cons: string[] };

export const stackOptionInfo: Record<Locale, Record<string, OptionInfo>> = {
  en: {
    // Frontend
    nextjs: {
      blurb: "React framework with SSR and routing",
      pros: ["SSR and SSG out of the box", "Great SEO and first paint", "Huge ecosystem, strong defaults"],
      cons: ["Build complexity grows fast", "Churn between major versions"],
    },
    react: {
      blurb: "The default UI library for the web",
      pros: ["Massive ecosystem and hiring pool", "Component model scales to big apps"],
      cons: ["No routing or data layer included", "Easy to over-engineer state"],
    },
    vue: {
      blurb: "Approachable reactive UI framework",
      pros: ["Gentle learning curve", "Clean reactivity, less boilerplate"],
      cons: ["Smaller ecosystem than React", "Smaller hiring pool"],
    },

    // Mobile
    ios: {
      blurb: "Native iOS with Swift",
      pros: ["Best performance and platform feel", "First access to new OS features"],
      cons: ["iOS only, separate Android build", "Needs Mac and App Store review"],
    },
    android: {
      blurb: "Native Android with Kotlin",
      pros: ["Full device and hardware access", "Best performance on Android"],
      cons: ["Android only, separate iOS build", "Fragmented devices to test"],
    },
    flutter: {
      blurb: "One codebase for iOS and Android",
      pros: ["Single codebase, both platforms", "Fast UI development"],
      cons: ["Dart, smaller talent pool", "Large app binaries"],
    },

    // Hosting / Edge / CDN
    cloudflare: {
      blurb: "Global edge network and Workers",
      pros: ["Runs close to users worldwide", "Cheap bandwidth, generous free tier", "Integrated CDN, DNS, security"],
      cons: ["Workers runtime, not full Node", "Vendor-specific APIs"],
    },
    vercel: {
      blurb: "Zero-config hosting for Next.js",
      pros: ["Effortless deploys and previews", "First-class Next.js support"],
      cons: ["Costs climb at scale", "Some lock-in to the platform"],
    },
    railway: {
      blurb: "Simple hosting for containers and databases",
      pros: ["Deploy anything, minimal config", "Managed databases built in"],
      cons: ["No global edge network", "Pricier than a VPS at scale"],
    },

    // Runtime
    nodejs: {
      blurb: "JavaScript runtime for the server",
      pros: ["Same language as the frontend", "Huge package ecosystem", "Great for I/O-bound APIs"],
      cons: ["Single thread limits CPU work", "npm dependency sprawl and risk"],
    },
    python: {
      blurb: "Readable language, strong for data and AI",
      pros: ["Excellent data and ML libraries", "Fast to write and read", "Huge ecosystem"],
      cons: ["GIL limits CPU parallelism", "Slower than compiled runtimes"],
    },
    go: {
      blurb: "Compiled language built for concurrency",
      pros: ["Fast, low memory footprint", "First-class concurrency", "Single static binary deploys"],
      cons: ["Verbose error handling", "Smaller library ecosystem"],
    },

    // Protocol
    rest: {
      blurb: "Simple resource-based HTTP APIs",
      pros: ["Universally understood", "Caches well over HTTP", "Easy to debug and tool"],
      cons: ["Over- and under-fetching data", "Many round trips for nested data"],
    },
    graphql: {
      blurb: "Clients query exactly the data they need",
      pros: ["Clients fetch exactly what they need", "Strong typed schema", "One endpoint, fewer round trips"],
      cons: ["Caching and rate-limiting harder", "Overkill for simple APIs"],
    },
    grpc: {
      blurb: "Fast typed RPC over HTTP/2",
      pros: ["Compact binary, low latency", "Strong contracts via protobuf", "Great for service-to-service"],
      cons: ["Poor browser support", "Harder to debug than JSON"],
    },

    // Realtime
    socketio: {
      blurb: "Realtime events over WebSockets",
      pros: ["Auto reconnect and fallbacks", "Rooms and broadcast built in", "Mature and widely used"],
      cons: ["You run and scale the servers", "Session affinity needed to scale"],
    },
    pusher: {
      blurb: "Hosted realtime messaging service",
      pros: ["No servers to run", "Fast to integrate"],
      cons: ["Per-message pricing adds up", "Vendor lock-in"],
    },
    ably: {
      blurb: "Managed realtime with delivery guarantees",
      pros: ["Global, low-latency edge", "Guaranteed ordering and delivery"],
      cons: ["Costly at high volume", "Vendor lock-in"],
    },

    // Database
    postgresql: {
      blurb: "Proven relational database",
      pros: ["Relational integrity plus JSONB flexibility", "Battle-tested, huge ecosystem", "Rich indexing and extensions"],
      cons: ["Vertical scaling ceiling", "Manual sharding at huge scale"],
    },
    mysql: {
      blurb: "Popular, widely-supported relational database",
      pros: ["Fast reads, simple to run", "Mature replication", "Ubiquitous hosting support"],
      cons: ["Weaker JSON and feature set", "Historically looser data integrity"],
    },
    mongodb: {
      blurb: "Document database with flexible schema",
      pros: ["Flexible schema, fast to iterate", "Horizontal scaling built in"],
      cons: ["Weaker multi-document transactions", "Easy to model data badly"],
    },

    // Cache
    redis: {
      blurb: "In-memory cache and data store",
      pros: ["Microsecond reads", "Versatile: cache, queues, locks", "Rich data structures"],
      cons: ["Memory is expensive", "Persistence needs careful config"],
    },
    memcached: {
      blurb: "Bare-bones in-memory cache",
      pros: ["Very fast and simple", "Multi-threaded scaling"],
      cons: ["Key-value only, no structures", "No persistence or replication"],
    },

    // Object storage
    r2: {
      blurb: "S3-compatible storage, no egress fees",
      pros: ["Zero egress fees", "S3-compatible API", "Cheap at scale"],
      cons: ["Fewer regions than AWS", "Younger, smaller ecosystem"],
    },
    s3: {
      blurb: "The industry-standard object store",
      pros: ["Extremely durable and proven", "Deep AWS integration", "Rich tiering and lifecycle"],
      cons: ["Egress fees add up", "Config complexity, easy misconfig"],
    },
    gcs: {
      blurb: "Google Cloud's object storage",
      pros: ["Strong consistency", "Tight Google Cloud integration", "Good analytics tie-ins"],
      cons: ["Egress fees", "Ties you to Google Cloud"],
    },

    // Queue / Jobs
    bullmq: {
      blurb: "Redis-backed job queue for Node",
      pros: ["Reuses existing Redis", "Retries, scheduling, rate limits", "Simple Node integration"],
      cons: ["Node-centric", "Bound by Redis capacity"],
    },
    rabbitmq: {
      blurb: "Mature message broker",
      pros: ["Flexible routing and exchanges", "Reliable delivery guarantees", "Language-agnostic"],
      cons: ["Another service to run", "Struggles under very high throughput"],
    },
    sqs: {
      blurb: "Fully managed AWS message queue",
      pros: ["No servers to manage", "Scales automatically", "Cheap and reliable"],
      cons: ["AWS lock-in", "Ordering only with FIFO queues"],
    },

    // Payments
    stripe: {
      blurb: "Developer-first payments platform",
      pros: ["Best-in-class API and docs", "Cards, wallets, subscriptions", "Strong fraud tooling"],
      cons: ["Percentage fee per charge", "Deep integration means lock-in"],
    },
    paypal: {
      blurb: "Widely-trusted consumer payment brand",
      pros: ["High buyer trust and reach", "Easy checkout for consumers"],
      cons: ["Clunkier developer API", "Fund holds and disputes"],
    },
    square: {
      blurb: "Payments for in-person and online",
      pros: ["Strong point-of-sale hardware", "Unified online and in-store"],
      cons: ["Weaker for pure online scale", "Smaller developer ecosystem"],
    },

    // Observability
    sentry: {
      blurb: "Error and performance monitoring",
      pros: ["Fast error triage with stack traces", "Easy SDK setup", "Release and regression tracking"],
      cons: ["Event volume drives cost", "Not full infra metrics"],
    },
    grafana: {
      blurb: "Open-source dashboards and metrics",
      pros: ["Flexible dashboards, many sources", "Open source, self-hostable", "No per-seat lock-in"],
      cons: ["You assemble the stack", "Ops overhead to run well"],
    },
    datadog: {
      blurb: "All-in-one monitoring platform",
      pros: ["Metrics, logs, traces unified", "Vast integrations", "Powerful out of the box"],
      cons: ["Expensive at scale", "Pricing hard to predict"],
    },
  },

  fr: {
    // Frontend
    nextjs: {
      blurb: "Framework React avec SSR et routing",
      pros: ["SSR et SSG intégrés", "Excellent SEO et premier rendu", "Écosystème riche, bons défauts"],
      cons: ["Complexité de build croissante", "Ruptures entre versions majeures"],
    },
    react: {
      blurb: "La bibliothèque UI par défaut du web",
      pros: ["Écosystème et bassin de talents énormes", "Modèle composant qui passe à l'échelle"],
      cons: ["Ni routing ni couche de données", "Facile à sur-architecturer"],
    },
    vue: {
      blurb: "Framework UI réactif et accessible",
      pros: ["Courbe d'apprentissage douce", "Réactivité propre, moins de boilerplate"],
      cons: ["Écosystème plus petit que React", "Bassin de talents plus restreint"],
    },

    // Mobile
    ios: {
      blurb: "iOS natif avec Swift",
      pros: ["Meilleures performances et rendu natif", "Accès rapide aux nouveautés OS"],
      cons: ["iOS seulement, build Android séparé", "Mac et revue App Store requis"],
    },
    android: {
      blurb: "Android natif avec Kotlin",
      pros: ["Accès complet au matériel", "Meilleures performances sur Android"],
      cons: ["Android seulement, build iOS séparé", "Fragmentation des appareils à tester"],
    },
    flutter: {
      blurb: "Un seul code pour iOS et Android",
      pros: ["Code unique, deux plateformes", "Développement d'UI rapide"],
      cons: ["Dart, bassin de talents réduit", "Binaires d'app volumineux"],
    },

    // Hosting / Edge / CDN
    cloudflare: {
      blurb: "Réseau edge mondial et Workers",
      pros: ["Exécution proche des utilisateurs", "Bande passante bon marché, offre gratuite", "CDN, DNS et sécurité intégrés"],
      cons: ["Runtime Workers, pas Node complet", "APIs spécifiques au fournisseur"],
    },
    vercel: {
      blurb: "Hébergement zéro-config pour Next.js",
      pros: ["Déploiements et previews sans effort", "Support Next.js de première classe"],
      cons: ["Coûts qui grimpent à l'échelle", "Dépendance à la plateforme"],
    },
    railway: {
      blurb: "Hébergement simple pour conteneurs et bases",
      pros: ["Déploie tout, config minimale", "Bases de données managées incluses"],
      cons: ["Pas de réseau edge mondial", "Plus cher qu'un VPS à l'échelle"],
    },

    // Runtime
    nodejs: {
      blurb: "Runtime JavaScript côté serveur",
      pros: ["Même langage que le frontend", "Écosystème de paquets immense", "Idéal pour les API I/O"],
      cons: ["Mono-thread pour le calcul CPU", "Prolifération de dépendances npm"],
    },
    python: {
      blurb: "Langage lisible, fort en data et IA",
      pros: ["Excellentes librairies data et ML", "Rapide à écrire et lire", "Écosystème immense"],
      cons: ["Le GIL limite le parallélisme", "Plus lent que les langages compilés"],
    },
    go: {
      blurb: "Langage compilé pensé pour la concurrence",
      pros: ["Rapide, faible empreinte mémoire", "Concurrence de première classe", "Déploiement en binaire unique"],
      cons: ["Gestion d'erreurs verbeuse", "Écosystème de librairies plus restreint"],
    },

    // Protocol
    rest: {
      blurb: "API HTTP simples basées ressources",
      pros: ["Universellement compris", "Bon cache via HTTP", "Facile à déboguer et outiller"],
      cons: ["Sur- et sous-récupération de données", "Nombreux allers-retours pour l'imbriqué"],
    },
    graphql: {
      blurb: "Le client interroge exactement ses données",
      pros: ["Le client récupère juste le nécessaire", "Schéma fortement typé", "Un endpoint, moins d'allers-retours"],
      cons: ["Cache et rate-limiting plus durs", "Excessif pour des API simples"],
    },
    grpc: {
      blurb: "RPC typé et rapide sur HTTP/2",
      pros: ["Binaire compact, faible latence", "Contrats stricts via protobuf", "Idéal entre services"],
      cons: ["Support navigateur limité", "Plus dur à déboguer que JSON"],
    },

    // Realtime
    socketio: {
      blurb: "Événements temps réel sur WebSockets",
      pros: ["Reconnexion et fallbacks automatiques", "Rooms et broadcast intégrés", "Mature et très répandu"],
      cons: ["Serveurs à gérer et scaler", "Affinité de session pour scaler"],
    },
    pusher: {
      blurb: "Service de messagerie temps réel hébergé",
      pros: ["Aucun serveur à gérer", "Intégration rapide"],
      cons: ["Tarif par message qui s'accumule", "Dépendance au fournisseur"],
    },
    ably: {
      blurb: "Temps réel managé avec garanties de livraison",
      pros: ["Edge mondial à faible latence", "Ordre et livraison garantis"],
      cons: ["Coûteux à fort volume", "Dépendance au fournisseur"],
    },

    // Database
    postgresql: {
      blurb: "Base relationnelle éprouvée",
      pros: ["Intégrité relationnelle et JSONB", "Éprouvée, écosystème immense", "Indexation et extensions riches"],
      cons: ["Plafond de scaling vertical", "Sharding manuel à grande échelle"],
    },
    mysql: {
      blurb: "Base relationnelle populaire et bien supportée",
      pros: ["Lectures rapides, simple à opérer", "Réplication mature", "Support d'hébergement omniprésent"],
      cons: ["JSON et fonctionnalités plus limités", "Intégrité historiquement plus laxiste"],
    },
    mongodb: {
      blurb: "Base documentaire à schéma flexible",
      pros: ["Schéma flexible, itération rapide", "Scaling horizontal intégré"],
      cons: ["Transactions multi-documents plus faibles", "Facile de mal modéliser les données"],
    },

    // Cache
    redis: {
      blurb: "Cache et store en mémoire",
      pros: ["Lectures en microsecondes", "Polyvalent: cache, files, verrous", "Structures de données riches"],
      cons: ["La mémoire coûte cher", "Persistance à configurer soigneusement"],
    },
    memcached: {
      blurb: "Cache en mémoire minimaliste",
      pros: ["Très rapide et simple", "Scaling multi-thread"],
      cons: ["Clé-valeur seulement, sans structures", "Ni persistance ni réplication"],
    },

    // Object storage
    r2: {
      blurb: "Stockage compatible S3, sans frais de sortie",
      pros: ["Zéro frais de sortie", "API compatible S3", "Bon marché à l'échelle"],
      cons: ["Moins de régions qu'AWS", "Écosystème plus jeune"],
    },
    s3: {
      blurb: "Le stockage objet standard du marché",
      pros: ["Extrêmement durable et éprouvé", "Intégration AWS profonde", "Tiering et cycle de vie riches"],
      cons: ["Frais de sortie qui s'accumulent", "Config complexe, erreurs faciles"],
    },
    gcs: {
      blurb: "Le stockage objet de Google Cloud",
      pros: ["Forte cohérence", "Intégration Google Cloud étroite", "Bons liens avec l'analytique"],
      cons: ["Frais de sortie", "Vous lie à Google Cloud"],
    },

    // Queue / Jobs
    bullmq: {
      blurb: "File de jobs sur Redis pour Node",
      pros: ["Réutilise le Redis existant", "Retries, planification, limites de débit", "Intégration Node simple"],
      cons: ["Centré sur Node", "Limité par la capacité Redis"],
    },
    rabbitmq: {
      blurb: "Broker de messages mature",
      pros: ["Routage et exchanges flexibles", "Garanties de livraison fiables", "Agnostique au langage"],
      cons: ["Un service de plus à opérer", "Peine à très haut débit"],
    },
    sqs: {
      blurb: "File de messages AWS entièrement managée",
      pros: ["Aucun serveur à gérer", "Scaling automatique", "Fiable et peu coûteux"],
      cons: ["Dépendance à AWS", "Ordre garanti seulement en FIFO"],
    },

    // Payments
    stripe: {
      blurb: "Plateforme de paiement pensée développeurs",
      pros: ["API et docs de premier plan", "Cartes, wallets, abonnements", "Outils anti-fraude solides"],
      cons: ["Commission sur chaque transaction", "Intégration profonde, donc dépendance"],
    },
    paypal: {
      blurb: "Marque de paiement grand public reconnue",
      pros: ["Forte confiance des acheteurs", "Paiement simple pour le consommateur"],
      cons: ["API développeur moins fluide", "Blocages de fonds et litiges"],
    },
    square: {
      blurb: "Paiements en personne et en ligne",
      pros: ["Solide matériel de point de vente", "Boutique physique et en ligne unifiées"],
      cons: ["Moins fort pour le pur en ligne", "Écosystème développeur plus petit"],
    },

    // Observability
    sentry: {
      blurb: "Suivi des erreurs et des performances",
      pros: ["Triage d'erreurs avec stack traces", "SDK simple à installer", "Suivi des releases et régressions"],
      cons: ["Le volume d'événements coûte cher", "Pas de métriques d'infra complètes"],
    },
    grafana: {
      blurb: "Dashboards et métriques open source",
      pros: ["Dashboards flexibles, multi-sources", "Open source, auto-hébergeable", "Pas de verrou par siège"],
      cons: ["Stack à assembler soi-même", "Charge d'exploitation pour bien tourner"],
    },
    datadog: {
      blurb: "Plateforme de monitoring tout-en-un",
      pros: ["Métriques, logs, traces unifiés", "Intégrations très nombreuses", "Puissant dès l'installation"],
      cons: ["Coûteux à l'échelle", "Tarification difficile à prévoir"],
    },
  },
};
