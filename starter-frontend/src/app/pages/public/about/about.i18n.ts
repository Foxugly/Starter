import {LanguageEnumDto} from '../../../api/generated/model/language-enum';

export type AboutTechCard = {
  title: string;
  description: string;
  items: string[];
};

export type AboutLegalSection = {
  title: string;
  content: string[];
};

export type AboutUiText = {
  tabs: {
    company: string;
    legal: string;
    technical: string;
  };

  companyTitle: string;
  companyIntro: string;
  company: {
    contactLabel: string;
    companyLabel: string;
    vatLabel: string;
    addressLabel: string;
    emailLabel: string;
    emailButton: string;
    phoneLabel: string;
    websiteLabel: string;
  };

  legalTitle: string;
  legalIntro: string;
  legalSections: AboutLegalSection[];

  technicalTitle: string;
  technicalIntro: string;
  repositoryUrlLabel: string;
  cards: {
    repository: AboutTechCard;
    backend: AboutTechCard;
    frontend: AboutTechCard;
  };
};

// TODO (per project): customise the legal text below for the new project's
// jurisdiction and processor. The content shipped here is a generic GDPR
// outline meant as a starting point — review with legal counsel before
// production use.

const FR: AboutUiText = {
  tabs: {company: 'Société', legal: 'Mentions légales', technical: 'Technique'},

  companyTitle: 'Société',
  companyIntro: 'Coordonnées de la société qui édite et exploite cette plateforme.',
  company: {
    contactLabel: 'Contact',
    companyLabel: 'Société',
    vatLabel: 'TVA / BCE',
    addressLabel: 'Adresse',
    emailLabel: 'Email',
    emailButton: 'M\'envoyer un email',
    phoneLabel: 'Téléphone',
    websiteLabel: 'Site web',
  },

  legalTitle: 'Mentions légales & protection des données',
  legalIntro: 'Cette plateforme respecte la réglementation européenne en matière de protection des données personnelles.',
  legalSections: [
    {
      title: 'Responsable du traitement',
      content: [
        'Le responsable du traitement des données est l\'administrateur de l\'instance déployée.',
        'Pour toute question relative à vos données personnelles, contactez l\'administrateur de votre instance.',
      ],
    },
    {
      title: 'Données collectées',
      content: [
        'Données d\'identification : nom d\'utilisateur, adresse email, prénom, nom.',
        'Données techniques : journaux de connexion strictement nécessaires à la sécurité.',
      ],
    },
    {
      title: 'Vos droits (RGPD Art. 15-22)',
      content: [
        'Droit d\'accès, de rectification, à l\'effacement, à la portabilité, d\'opposition.',
        'Droit de réclamation auprès de votre autorité de contrôle nationale.',
      ],
    },
    {
      title: 'Sécurité',
      content: [
        'Communications chiffrées via HTTPS/TLS.',
        'Mots de passe hachés avec un algorithme irréversible (PBKDF2).',
        'Authentification basée sur des jetons JWT à durée de vie limitée.',
      ],
    },
  ],

  technicalTitle: 'Informations techniques',
  technicalIntro: 'Frontend Angular, backend Django REST, contrat OpenAPI partagé.',
  repositoryUrlLabel: 'URL du dépôt',
  cards: {
    repository: {
      title: 'Repository',
      description: 'Code source, CI et artefacts de contrat dans le même dépôt.',
      items: [
        'Monorepo pour le frontend, le backend et les scripts.',
        'Génération OpenAPI en CI.',
        'GitHub Actions pour les contrôles.',
      ],
    },
    backend: {
      title: 'Backend',
      description: 'API REST sécurisée.',
      items: [
        'Django et Django REST Framework',
        'drf-spectacular',
        'Simple JWT, django-parler',
        'Celery + Redis',
      ],
    },
    frontend: {
      title: 'Frontend',
      description: 'SPA Angular.',
      items: [
        'Angular 21, TypeScript, RxJS',
        'PrimeNG 21',
        'Client API généré depuis OpenAPI',
      ],
    },
  },
};

const EN: AboutUiText = {
  tabs: {company: 'Company', legal: 'Legal notice', technical: 'Technical'},

  companyTitle: 'Company',
  companyIntro: 'Contact details of the company operating this platform.',
  company: {
    contactLabel: 'Contact',
    companyLabel: 'Company',
    vatLabel: 'VAT',
    addressLabel: 'Address',
    emailLabel: 'Email',
    emailButton: 'Send me an email',
    phoneLabel: 'Phone',
    websiteLabel: 'Website',
  },

  legalTitle: 'Legal notice & data protection',
  legalIntro: 'This platform complies with European regulations on personal data protection.',
  legalSections: [
    {
      title: 'Data controller',
      content: [
        'The data controller is the administrator of the deployed instance.',
        'For any question regarding your personal data, contact the administrator of your instance.',
      ],
    },
    {
      title: 'Data collected',
      content: [
        'Identification data: username, email, first name, last name.',
        'Technical data: connection logs strictly necessary for security.',
      ],
    },
    {
      title: 'Your rights (GDPR Art. 15-22)',
      content: [
        'Rights of access, rectification, erasure, portability, objection.',
        'Right to lodge a complaint with your national supervisory authority.',
      ],
    },
    {
      title: 'Security',
      content: [
        'Communications encrypted via HTTPS/TLS.',
        'Passwords hashed using an irreversible algorithm (PBKDF2).',
        'Authentication relies on short-lived JWT tokens.',
      ],
    },
  ],

  technicalTitle: 'Technical details',
  technicalIntro: 'Angular frontend, Django REST backend, shared OpenAPI contract.',
  repositoryUrlLabel: 'Repository URL',
  cards: {
    repository: {
      title: 'Repository',
      description: 'Source code, CI and contract artifacts in one repository.',
      items: [
        'Monorepo for frontend, backend and scripts.',
        'OpenAPI generation in CI.',
        'GitHub Actions for checks.',
      ],
    },
    backend: {
      title: 'Backend',
      description: 'Secure REST API.',
      items: [
        'Django and Django REST Framework',
        'drf-spectacular',
        'Simple JWT, django-parler',
        'Celery + Redis',
      ],
    },
    frontend: {
      title: 'Frontend',
      description: 'Angular SPA.',
      items: [
        'Angular 21, TypeScript, RxJS',
        'PrimeNG 21',
        'API client generated from OpenAPI',
      ],
    },
  },
};

const NL: AboutUiText = {
  tabs: {company: 'Bedrijf', legal: 'Juridisch', technical: 'Technisch'},

  companyTitle: 'Bedrijf',
  companyIntro: 'Contactgegevens van het bedrijf dat dit platform uitbaat.',
  company: {
    contactLabel: 'Contact',
    companyLabel: 'Bedrijf',
    vatLabel: 'BTW',
    addressLabel: 'Adres',
    emailLabel: 'E-mail',
    emailButton: 'Stuur mij een e-mail',
    phoneLabel: 'Telefoon',
    websiteLabel: 'Website',
  },

  legalTitle: 'Juridische informatie & gegevensbescherming',
  legalIntro: 'Dit platform voldoet aan de Europese regelgeving inzake de bescherming van persoonsgegevens.',
  legalSections: [
    {
      title: 'Verwerkingsverantwoordelijke',
      content: [
        'De verwerkingsverantwoordelijke is de beheerder van de geïnstalleerde instantie.',
        'Neem voor vragen over uw persoonsgegevens contact op met de beheerder.',
      ],
    },
    {
      title: 'Verzamelde gegevens',
      content: [
        'Identificatiegegevens: gebruikersnaam, e-mailadres, voornaam, achternaam.',
        'Technische gegevens: verbindingslogboeken, strikt noodzakelijk voor beveiliging.',
      ],
    },
    {
      title: 'Uw rechten (AVG Art. 15-22)',
      content: [
        'Rechten op inzage, rectificatie, verwijdering, overdraagbaarheid, bezwaar.',
        'Recht om klacht in te dienen bij uw nationale toezichthoudende autoriteit.',
      ],
    },
    {
      title: 'Beveiliging',
      content: [
        'Communicatie versleuteld via HTTPS/TLS.',
        'Wachtwoorden gehasht met een onomkeerbaar algoritme (PBKDF2).',
        'Authenticatie gebaseerd op JWT-tokens met beperkte levensduur.',
      ],
    },
  ],

  technicalTitle: 'Technische informatie',
  technicalIntro: 'Angular-frontend, Django REST-backend, gedeeld OpenAPI-contract.',
  repositoryUrlLabel: 'Repository-URL',
  cards: {
    repository: {
      title: 'Repository',
      description: 'Broncode, CI en contractartefacten in hetzelfde depot.',
      items: [
        'Monorepo voor frontend, backend en scripts.',
        'OpenAPI-generatie in CI.',
        'GitHub Actions voor controles.',
      ],
    },
    backend: {
      title: 'Backend',
      description: 'Beveiligde REST API.',
      items: [
        'Django en Django REST Framework',
        'drf-spectacular',
        'Simple JWT, django-parler',
        'Celery + Redis',
      ],
    },
    frontend: {
      title: 'Frontend',
      description: 'Angular SPA.',
      items: [
        'Angular 21, TypeScript, RxJS',
        'PrimeNG 21',
        'API-client gegenereerd uit OpenAPI',
      ],
    },
  },
};

const IT: AboutUiText = {
  tabs: {company: 'Società', legal: 'Note legali', technical: 'Tecnico'},

  companyTitle: 'Società',
  companyIntro: 'Contatti della società che gestisce questa piattaforma.',
  company: {
    contactLabel: 'Contatto',
    companyLabel: 'Società',
    vatLabel: 'P.IVA',
    addressLabel: 'Indirizzo',
    emailLabel: 'Email',
    emailButton: 'Inviami una email',
    phoneLabel: 'Telefono',
    websiteLabel: 'Sito web',
  },

  legalTitle: 'Note legali e protezione dei dati',
  legalIntro: 'Questa piattaforma rispetta la normativa europea sulla protezione dei dati personali.',
  legalSections: [
    {
      title: 'Titolare del trattamento',
      content: [
        'Il titolare del trattamento è l\'amministratore dell\'istanza installata.',
        'Per domande sui dati personali, contattare l\'amministratore.',
      ],
    },
    {
      title: 'Dati raccolti',
      content: [
        'Dati identificativi: nome utente, email, nome, cognome.',
        'Dati tecnici: registri di connessione strettamente necessari per la sicurezza.',
      ],
    },
    {
      title: 'I tuoi diritti (GDPR Art. 15-22)',
      content: [
        'Diritti di accesso, rettifica, cancellazione, portabilità, opposizione.',
        'Diritto di reclamo presso l\'autorità di controllo nazionale.',
      ],
    },
    {
      title: 'Sicurezza',
      content: [
        'Comunicazioni crittografate tramite HTTPS/TLS.',
        'Password sottoposte a hash con algoritmo irreversibile (PBKDF2).',
        'Autenticazione basata su token JWT a durata limitata.',
      ],
    },
  ],

  technicalTitle: 'Informazioni tecniche',
  technicalIntro: 'Frontend Angular, backend Django REST, contratto OpenAPI condiviso.',
  repositoryUrlLabel: 'URL del repository',
  cards: {
    repository: {
      title: 'Repository',
      description: 'Codice sorgente, CI e artefatti del contratto nello stesso repository.',
      items: [
        'Monorepo per frontend, backend e script.',
        'Generazione OpenAPI in CI.',
        'GitHub Actions per i controlli.',
      ],
    },
    backend: {
      title: 'Backend',
      description: 'API REST sicura.',
      items: [
        'Django e Django REST Framework',
        'drf-spectacular',
        'Simple JWT, django-parler',
        'Celery + Redis',
      ],
    },
    frontend: {
      title: 'Frontend',
      description: 'SPA Angular.',
      items: [
        'Angular 21, TypeScript, RxJS',
        'PrimeNG 21',
        'Client API generato da OpenAPI',
      ],
    },
  },
};

const ES: AboutUiText = {
  tabs: {company: 'Empresa', legal: 'Aviso legal', technical: 'Técnico'},

  companyTitle: 'Empresa',
  companyIntro: 'Datos de contacto de la empresa que opera esta plataforma.',
  company: {
    contactLabel: 'Contacto',
    companyLabel: 'Empresa',
    vatLabel: 'IVA',
    addressLabel: 'Dirección',
    emailLabel: 'Correo',
    emailButton: 'Enviarme un correo',
    phoneLabel: 'Teléfono',
    websiteLabel: 'Sitio web',
  },

  legalTitle: 'Aviso legal y protección de datos',
  legalIntro: 'Esta plataforma cumple con la normativa europea sobre protección de datos personales.',
  legalSections: [
    {
      title: 'Responsable del tratamiento',
      content: [
        'El responsable del tratamiento es el administrador de la instancia desplegada.',
        'Para cualquier consulta sobre sus datos personales, contacte con el administrador.',
      ],
    },
    {
      title: 'Datos recogidos',
      content: [
        'Datos de identificación: nombre de usuario, correo, nombre, apellido.',
        'Datos técnicos: registros de conexión estrictamente necesarios para la seguridad.',
      ],
    },
    {
      title: 'Sus derechos (RGPD Art. 15-22)',
      content: [
        'Derechos de acceso, rectificación, supresión, portabilidad, oposición.',
        'Derecho a presentar una reclamación ante su autoridad de control nacional.',
      ],
    },
    {
      title: 'Seguridad',
      content: [
        'Comunicaciones cifradas mediante HTTPS/TLS.',
        'Contraseñas almacenadas con un algoritmo de hash irreversible (PBKDF2).',
        'Autenticación basada en tokens JWT de vida limitada.',
      ],
    },
  ],

  technicalTitle: 'Información técnica',
  technicalIntro: 'Frontend Angular, backend Django REST, contrato OpenAPI compartido.',
  repositoryUrlLabel: 'URL del repositorio',
  cards: {
    repository: {
      title: 'Repositorio',
      description: 'Código fuente, CI y artefactos del contrato en el mismo repositorio.',
      items: [
        'Monorepo para frontend, backend y scripts.',
        'Generación OpenAPI en CI.',
        'GitHub Actions para los controles.',
      ],
    },
    backend: {
      title: 'Backend',
      description: 'API REST segura.',
      items: [
        'Django y Django REST Framework',
        'drf-spectacular',
        'Simple JWT, django-parler',
        'Celery + Redis',
      ],
    },
    frontend: {
      title: 'Frontend',
      description: 'SPA Angular.',
      items: [
        'Angular 21, TypeScript, RxJS',
        'PrimeNG 21',
        'Cliente API generado desde OpenAPI',
      ],
    },
  },
};

const UI_TEXT: Partial<Record<LanguageEnumDto, AboutUiText>> = {
  [LanguageEnumDto.Fr]: FR,
  [LanguageEnumDto.En]: EN,
  [LanguageEnumDto.Nl]: NL,
  [LanguageEnumDto.It]: IT,
  [LanguageEnumDto.Es]: ES,
};

export function getAboutUiText(lang: LanguageEnumDto | string | null | undefined): AboutUiText {
  return UI_TEXT[lang as LanguageEnumDto] ?? EN;
}
