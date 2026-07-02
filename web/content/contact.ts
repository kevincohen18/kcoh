import type { Locale } from "@/lib/i18n/locale";

/**
 * Structured bilingual content pattern (see `web/lib/i18n/PATTERN.md`): the
 * original shape stays a plain type, wrapped in `Record<Locale, T>`.
 * Consumers select the active locale's copy with `contactPageCopy[locale]`.
 */
export type ContactPageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  book: {
    heading: string;
    subline: string;
    /** Rendered immediately before the "Open the calendar on Cal.com" link. */
    calLinkPrefix: string;
    calLinkText: string;
  };
  write: {
    heading: string;
    subline: string;
  };
  directLines: {
    /** "LinkedIn" is a brand name and stays identical across locales. */
    linkedinLabel: string;
    responseTime: string;
  };
};

export const contactPageCopy: Record<Locale, ContactPageCopy> = {
  en: {
    hero: {
      eyebrow: "Contact",
      title: "Let's talk about what you're building.",
      intro:
        "30-minute call. No pitch, no pressure. Just a conversation about your systems.",
    },
    book: {
      heading: "Book a conversation",
      subline: "A 30-minute consultation, scheduled directly.",
      calLinkPrefix: "Prefer a direct link?",
      calLinkText: "Open the calendar on Cal.com",
    },
    write: {
      heading: "Or write to us",
      subline: "A few lines about what you're building is plenty.",
    },
    directLines: {
      linkedinLabel: "LinkedIn",
      responseTime: "Average reply: under 24h",
    },
  },
  fr: {
    hero: {
      eyebrow: "Contact",
      title: "Parlons de ce que vous bâtissez.",
      intro:
        "Un appel de 30 minutes. Pas de discours de vente, pas de pression. Juste une conversation sur vos systèmes.",
    },
    book: {
      heading: "Réserver une conversation",
      subline: "Une consultation de 30 minutes, planifiée directement.",
      calLinkPrefix: "Vous préférez un lien direct ?",
      calLinkText: "Ouvrir le calendrier sur Cal.com",
    },
    write: {
      heading: "Ou écrivez-nous",
      subline: "Quelques lignes sur ce que vous bâtissez suffisent amplement.",
    },
    directLines: {
      linkedinLabel: "LinkedIn",
      responseTime: "Délai de réponse moyen : moins de 24 h",
    },
  },
};

export type ContactFormCopy = {
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    company: { label: string; optional: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  /** The honeypot input is `aria-hidden` and out of tab order, so no real
   *  user ever sees or hears this — kept bilingual only for consistency
   *  with the rest of the form's content sourcing. */
  honeypotLabel: string;
  submit: string;
  sending: string;
  sent: {
    heading: string;
    body: string;
  };
  error: {
    prefix: string;
    linkText: string;
    suffix: string;
  };
};

export const contactFormCopy: Record<Locale, ContactFormCopy> = {
  en: {
    fields: {
      name: { label: "Name", placeholder: "Jane Doe" },
      email: { label: "Email", placeholder: "jane@company.com" },
      company: {
        label: "Company",
        optional: "(optional)",
        placeholder: "Acme Inc.",
      },
      message: {
        label: "Message",
        placeholder: "Tell us about what you're building…",
      },
    },
    honeypotLabel: "Website",
    submit: "Send message",
    sending: "Sending…",
    sent: {
      heading: "Message sent.",
      body: "It landed in the right inbox. Average reply: under 24h.",
    },
    error: {
      prefix: "Something went wrong.",
      linkText: "Email us directly",
      suffix: "; your message is pre-filled.",
    },
  },
  fr: {
    fields: {
      name: { label: "Nom", placeholder: "Jeanne Tremblay" },
      email: { label: "Courriel", placeholder: "jeanne@entreprise.com" },
      company: {
        label: "Entreprise",
        optional: "(facultatif)",
        placeholder: "Acme inc.",
      },
      message: {
        label: "Message",
        placeholder: "Parlez-nous de ce que vous bâtissez…",
      },
    },
    honeypotLabel: "Site Web",
    submit: "Envoyer le message",
    sending: "Envoi en cours…",
    sent: {
      heading: "Message envoyé.",
      body: "Il est bien arrivé à destination. Délai de réponse moyen : moins de 24 h.",
    },
    error: {
      prefix: "Une erreur est survenue.",
      linkText: "Écrivez-nous directement",
      suffix: "; votre message est déjà rempli.",
    },
  },
};
