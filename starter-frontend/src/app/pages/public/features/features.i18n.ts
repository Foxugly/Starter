import {LanguageEnumDto} from '../../../api/generated/model/language-enum';

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type FeatureSection = {
  slug: string;
  icon: string;
  badge: string;
  title: string;
  intro: string;
  features: FeatureItem[];
};

export type FeaturesUiText = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaLoggedIn: string;
  sections: FeatureSection[];
};

// TODO (per project): customise the sections, slugs, and feature lists below
// for the new project's actual capabilities. The current content is a
// generic placeholder showcasing the platform-level capabilities provided
// by the starter itself.
type SectionDef = {
  slug: string;
  icon: string;
  features: ReadonlyArray<{key: string; icon: string}>;
};

const SECTION_DEFS: ReadonlyArray<SectionDef> = [
  {
    slug: 'auth',
    icon: 'pi-shield',
    features: [
      {key: 'register', icon: 'pi-user-plus'},
      {key: 'confirmEmail', icon: 'pi-envelope'},
      {key: 'login', icon: 'pi-sign-in'},
      {key: 'passwordReset', icon: 'pi-key'},
    ],
  },
  {
    slug: 'i18n',
    icon: 'pi-globe',
    features: [
      {key: 'languages', icon: 'pi-flag'},
      {key: 'switcher', icon: 'pi-language'},
      {key: 'parler', icon: 'pi-book'},
    ],
  },
  {
    slug: 'platform',
    icon: 'pi-cog',
    features: [
      {key: 'outbox', icon: 'pi-inbox'},
      {key: 'rateLimit', icon: 'pi-lock'},
      {key: 'api', icon: 'pi-code'},
      {key: 'celery', icon: 'pi-bolt'},
    ],
  },
];

type FeatureContent = {title: string; description: string};
type SectionContent = {
  badge: string;
  title: string;
  intro: string;
  features: Record<string, FeatureContent>;
};
type FeaturesContent = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaLoggedIn: string;
  sections: Record<string, SectionContent>;
};

const FR_CONTENT: FeaturesContent = {
  eyebrow: 'Plateforme',
  title: 'Un squelette prêt à démarrer',
  intro: 'Authentification, internationalisation et infrastructure prêtes pour la production.',
  ctaPrimary: 'Créer un compte',
  ctaSecondary: 'Se connecter',
  ctaLoggedIn: 'Mes préférences',
  sections: {
    auth: {
      badge: 'Authentification',
      title: 'Tout le flux d\'authentification',
      intro: 'Inscription, confirmation email, login JWT, reset de mot de passe — sécurisés.',
      features: {
        register: {title: 'Inscription', description: 'Création de compte ouverte avec validation des champs côté backend.'},
        confirmEmail: {title: 'Confirmation email', description: 'Lien tokenisé envoyé via la boîte de sortie.'},
        login: {title: 'Login JWT', description: 'Token + refresh, rotation et blacklist activés.'},
        passwordReset: {title: 'Reset de mot de passe', description: 'Flux complet avec rate limiting et email tokenisé.'},
      },
    },
    i18n: {
      badge: 'Multilingue',
      title: 'Cinq langues prêtes',
      intro: 'UI traduite et contenus traduisibles via django-parler.',
      features: {
        languages: {title: 'FR · EN · NL · IT · ES', description: 'Cinq langues UI livrées dans un dictionnaire typé.'},
        switcher: {title: 'Sélecteur de langue', description: 'Composant lang-select stocké en localStorage et synchronisé avec le profil.'},
        parler: {title: 'django-parler', description: 'Modèles avec champs traduisibles, intégration prête.'},
      },
    },
    platform: {
      badge: 'Plateforme',
      title: 'Infrastructure de production',
      intro: 'Outbox d\'emails, Celery, rate limiting, OpenAPI — branchés.',
      features: {
        outbox: {title: 'Outbox emails', description: 'Envoi asynchrone fiable avec retry et backoff.'},
        rateLimit: {title: 'Rate limiting', description: 'ScopedRateThrottle sur les endpoints sensibles.'},
        api: {title: 'OpenAPI', description: 'Schéma drf-spectacular et client TypeScript généré.'},
        celery: {title: 'Celery + Redis', description: 'Worker et beat configurés, healthcheck inclus.'},
      },
    },
  },
};

const EN_CONTENT: FeaturesContent = {
  eyebrow: 'Platform',
  title: 'A skeleton ready to ship',
  intro: 'Authentication, internationalisation and infrastructure ready for production.',
  ctaPrimary: 'Create an account',
  ctaSecondary: 'Sign in',
  ctaLoggedIn: 'My preferences',
  sections: {
    auth: {
      badge: 'Authentication',
      title: 'The full authentication flow',
      intro: 'Registration, email confirmation, JWT login and password reset — all secure.',
      features: {
        register: {title: 'Registration', description: 'Open account creation with backend-side field validation.'},
        confirmEmail: {title: 'Email confirmation', description: 'Tokenised link sent through the email outbox.'},
        login: {title: 'JWT login', description: 'Access + refresh tokens with rotation and blacklist.'},
        passwordReset: {title: 'Password reset', description: 'Full flow with rate limiting and tokenised email.'},
      },
    },
    i18n: {
      badge: 'Multilingual',
      title: 'Five languages out of the box',
      intro: 'Translated UI and translatable content via django-parler.',
      features: {
        languages: {title: 'FR · EN · NL · IT · ES', description: 'Five UI languages shipped as a typed dictionary.'},
        switcher: {title: 'Language switcher', description: 'lang-select component, localStorage-backed, synced with the profile.'},
        parler: {title: 'django-parler', description: 'Translatable model fields, integration ready.'},
      },
    },
    platform: {
      badge: 'Platform',
      title: 'Production infrastructure',
      intro: 'Email outbox, Celery, rate limiting, OpenAPI — wired in.',
      features: {
        outbox: {title: 'Email outbox', description: 'Reliable async delivery with retry and backoff.'},
        rateLimit: {title: 'Rate limiting', description: 'ScopedRateThrottle on sensitive endpoints.'},
        api: {title: 'OpenAPI', description: 'drf-spectacular schema and generated TypeScript client.'},
        celery: {title: 'Celery + Redis', description: 'Worker and beat configured, health check included.'},
      },
    },
  },
};

const NL_CONTENT: FeaturesContent = {
  eyebrow: 'Platform',
  title: 'Een skelet klaar om te starten',
  intro: 'Authenticatie, internationalisatie en infrastructuur klaar voor productie.',
  ctaPrimary: 'Account aanmaken',
  ctaSecondary: 'Aanmelden',
  ctaLoggedIn: 'Mijn voorkeuren',
  sections: {
    auth: {
      badge: 'Authenticatie',
      title: 'De volledige authenticatieflow',
      intro: 'Registratie, e-mailbevestiging, JWT-login en wachtwoordreset — allemaal veilig.',
      features: {
        register: {title: 'Registratie', description: 'Open account aanmaken met validatie aan de backend-zijde.'},
        confirmEmail: {title: 'E-mailbevestiging', description: 'Tokenized link verzonden via de e-mail outbox.'},
        login: {title: 'JWT-login', description: 'Access + refresh tokens met rotatie en blacklist.'},
        passwordReset: {title: 'Wachtwoordreset', description: 'Volledige flow met rate limiting en tokenized e-mail.'},
      },
    },
    i18n: {
      badge: 'Meertalig',
      title: 'Vijf talen kant-en-klaar',
      intro: 'Vertaalde UI en vertaalbare inhoud via django-parler.',
      features: {
        languages: {title: 'FR · EN · NL · IT · ES', description: 'Vijf UI-talen geleverd als getypeerd woordenboek.'},
        switcher: {title: 'Taalkiezer', description: 'lang-select component, opgeslagen in localStorage, gesynchroniseerd met het profiel.'},
        parler: {title: 'django-parler', description: 'Vertaalbare modelvelden, integratie klaar.'},
      },
    },
    platform: {
      badge: 'Platform',
      title: 'Productie-infrastructuur',
      intro: 'E-mail outbox, Celery, rate limiting, OpenAPI — aangesloten.',
      features: {
        outbox: {title: 'E-mail outbox', description: 'Betrouwbare async-levering met retry en backoff.'},
        rateLimit: {title: 'Rate limiting', description: 'ScopedRateThrottle op gevoelige endpoints.'},
        api: {title: 'OpenAPI', description: 'drf-spectacular schema en gegenereerde TypeScript-client.'},
        celery: {title: 'Celery + Redis', description: 'Worker en beat geconfigureerd, healthcheck inbegrepen.'},
      },
    },
  },
};

const IT_CONTENT: FeaturesContent = {
  eyebrow: 'Piattaforma',
  title: 'Uno scheletro pronto per partire',
  intro: 'Autenticazione, internazionalizzazione e infrastruttura pronte per la produzione.',
  ctaPrimary: 'Crea un account',
  ctaSecondary: 'Accedi',
  ctaLoggedIn: 'Le mie preferenze',
  sections: {
    auth: {
      badge: 'Autenticazione',
      title: 'L\'intero flusso di autenticazione',
      intro: 'Registrazione, conferma email, login JWT e reset password — tutti sicuri.',
      features: {
        register: {title: 'Registrazione', description: 'Creazione account aperta con validazione lato backend.'},
        confirmEmail: {title: 'Conferma email', description: 'Link tokenizzato inviato tramite l\'outbox email.'},
        login: {title: 'Login JWT', description: 'Token access + refresh con rotazione e blacklist.'},
        passwordReset: {title: 'Reset password', description: 'Flusso completo con rate limiting ed email tokenizzata.'},
      },
    },
    i18n: {
      badge: 'Multilingue',
      title: 'Cinque lingue pronte',
      intro: 'UI tradotta e contenuti traducibili tramite django-parler.',
      features: {
        languages: {title: 'FR · EN · NL · IT · ES', description: 'Cinque lingue UI fornite come dizionario tipizzato.'},
        switcher: {title: 'Selettore lingua', description: 'Componente lang-select, salvato in localStorage, sincronizzato con il profilo.'},
        parler: {title: 'django-parler', description: 'Campi modello traducibili, integrazione pronta.'},
      },
    },
    platform: {
      badge: 'Piattaforma',
      title: 'Infrastruttura di produzione',
      intro: 'Outbox email, Celery, rate limiting, OpenAPI — collegati.',
      features: {
        outbox: {title: 'Outbox email', description: 'Consegna asincrona affidabile con retry e backoff.'},
        rateLimit: {title: 'Rate limiting', description: 'ScopedRateThrottle sugli endpoint sensibili.'},
        api: {title: 'OpenAPI', description: 'Schema drf-spectacular e client TypeScript generato.'},
        celery: {title: 'Celery + Redis', description: 'Worker e beat configurati, healthcheck incluso.'},
      },
    },
  },
};

const ES_CONTENT: FeaturesContent = {
  eyebrow: 'Plataforma',
  title: 'Un esqueleto listo para empezar',
  intro: 'Autenticación, internacionalización e infraestructura listas para producción.',
  ctaPrimary: 'Crear una cuenta',
  ctaSecondary: 'Iniciar sesión',
  ctaLoggedIn: 'Mis preferencias',
  sections: {
    auth: {
      badge: 'Autenticación',
      title: 'El flujo completo de autenticación',
      intro: 'Registro, confirmación email, login JWT y reset de contraseña — todos seguros.',
      features: {
        register: {title: 'Registro', description: 'Creación de cuenta abierta con validación en el backend.'},
        confirmEmail: {title: 'Confirmación de email', description: 'Enlace tokenizado enviado vía la outbox de email.'},
        login: {title: 'Login JWT', description: 'Tokens access + refresh con rotación y blacklist.'},
        passwordReset: {title: 'Reset de contraseña', description: 'Flujo completo con rate limiting y email tokenizado.'},
      },
    },
    i18n: {
      badge: 'Multilingüe',
      title: 'Cinco idiomas listos',
      intro: 'UI traducida y contenido traducible vía django-parler.',
      features: {
        languages: {title: 'FR · EN · NL · IT · ES', description: 'Cinco idiomas UI entregados como diccionario tipado.'},
        switcher: {title: 'Selector de idioma', description: 'Componente lang-select, guardado en localStorage, sincronizado con el perfil.'},
        parler: {title: 'django-parler', description: 'Campos de modelo traducibles, integración lista.'},
      },
    },
    platform: {
      badge: 'Plataforma',
      title: 'Infraestructura de producción',
      intro: 'Outbox de emails, Celery, rate limiting, OpenAPI — conectados.',
      features: {
        outbox: {title: 'Outbox de emails', description: 'Entrega asíncrona fiable con retry y backoff.'},
        rateLimit: {title: 'Rate limiting', description: 'ScopedRateThrottle en endpoints sensibles.'},
        api: {title: 'OpenAPI', description: 'Esquema drf-spectacular y cliente TypeScript generado.'},
        celery: {title: 'Celery + Redis', description: 'Worker y beat configurados, healthcheck incluido.'},
      },
    },
  },
};

function buildUiText(content: FeaturesContent): FeaturesUiText {
  return {
    eyebrow: content.eyebrow,
    title: content.title,
    intro: content.intro,
    ctaPrimary: content.ctaPrimary,
    ctaSecondary: content.ctaSecondary,
    ctaLoggedIn: content.ctaLoggedIn,
    sections: SECTION_DEFS.map((def) => {
      const sec = content.sections[def.slug];
      return {
        slug: def.slug,
        icon: def.icon,
        badge: sec.badge,
        title: sec.title,
        intro: sec.intro,
        features: def.features.map((f) => {
          const featureContent = sec.features[f.key];
          return {
            icon: f.icon,
            title: featureContent.title,
            description: featureContent.description,
          };
        }),
      };
    }),
  };
}

const CONTENT_BY_LANG: Partial<Record<LanguageEnumDto, FeaturesContent>> = {
  [LanguageEnumDto.Fr]: FR_CONTENT,
  [LanguageEnumDto.En]: EN_CONTENT,
  [LanguageEnumDto.Nl]: NL_CONTENT,
  [LanguageEnumDto.It]: IT_CONTENT,
  [LanguageEnumDto.Es]: ES_CONTENT,
};

export function getFeaturesUiText(lang: LanguageEnumDto | string | null | undefined): FeaturesUiText {
  return buildUiText(CONTENT_BY_LANG[lang as LanguageEnumDto] ?? EN_CONTENT);
}
