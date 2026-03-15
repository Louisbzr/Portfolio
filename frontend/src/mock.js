// Mock data for Louis's portfolio
export const portfolioData = {
  personal: {
    name: "Louis",
    title: "Développeur Web Full Stack",
    description:
      "Développeur passionné par la création d'applications web interactives et modernes. Je travaille principalement avec JavaScript et les technologies full-stack.",
    email: "louis.brazeau.pro@gmail.com",
    github: "https://github.com/Louisbzr",
    linkedin: "https://www.linkedin.com/in/louis-brazeau-pro/",
    availableForWork: true,
  },

  about: {
    paragraphs: [
      "Je suis Louis, développeur web full stack passionné par la création d'expériences numériques modernes et interactives. Mon parcours a débuté avec une fascination pour la façon dont les sites web et les applications prennent vie.",
      "Je travaille principalement avec JavaScript, React et TailwindCSS côté frontend, et Node.js / Express et Python côté backend. J'aime résoudre des problèmes complexes et transformer des idées en produits fonctionnels.",
      "En dehors du code, je suis passionné par les jeux vidéo, ce qui influence mon approche créative du développement — créer des expériences engageantes et mémorables.",
    ],
    stats: [
      { label: "Projets réalisés", value: "6+" },
      { label: "Technologies maîtrisées", value: "15+" },
      { label: "Années d'expérience", value: "3+" },
    ],
  },

  parcours: [
    {
      id: 1,
      year: "2026",
      type: "project",
      title: "MatchPulse",
      organization: "Projet Personnel",
      description:
        "Développement d'une encyclopédie Pokémon interactive full stack avec authentification JWT, intégration de la PokéAPI et base de données PostgreSQL via Prisma.",
      tags: ["React", "Node.js", "PostgreSQL", "Prisma", "JWT"],
    },
    {
      id: 1,
      year: "2025",
      type: "project",
      title: "PokeMorpho",
      organization: "Projet Personnel",
      description:
        "Développement d'une encyclopédie Pokémon interactive full stack avec authentification JWT, intégration de la PokéAPI et base de données PostgreSQL via Prisma.",
      tags: ["React", "Node.js", "PostgreSQL", "Prisma", "JWT"],
    },
    {
      id: 2,
      year: "2023 – 2025",
      type: "experience",
      title: "Développeur Full-Stack (alternance)",
      organization: "Infotel – Nanterre / Montreuil",
      description:
        "Développement et exécution de tests fonctionnels automatisés (JUnit, Selenium). Suivi des anomalies via Jira, pipelines CI/CD sur Jenkins et DevAzure, validation d'API REST avec Postman. Refonte visuelle d'une application interne avec Java, SpringBoot et Bootstrap.",
      tags: ["Java", "SpringBoot", "Selenium", "JUnit", "Jenkins", "Postman", "Jira", "AngularJs"],
    },
    {
      id: 3,
      year: "2022 – 2023",
      type: "experience",
      title: "Développeur Web (alternance)",
      organization: "JJA – Gonesse",
      description:
        "Conception d'un site web pour la restauration interne et client avec Java et SpringBoot. Maintenance corrective et évolutive du site web de l'entreprise.",
      tags: ["Java", "SpringBoot"],
    },
    {
      id: 4,
      year: "2020 – 2022",
      type: "experience",
      title: "Assistant IT (alternance)",
      organization: "Stimcar – Couëron",
      description:
        "Conception de sites web avec HTML, CSS et JavaScript. Automatisation de machines distantes via Ansible.",
      tags: ["HTML", "CSS", "JavaScript", "Ansible"],
    },
  ],

  skills: {
    frontend: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React" },
    ],
    backend: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
    ],
    database: [
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "Supabase" },
      { name: "MongoDB" },
    ],
    tools: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Render" },
    ],
  },

  projects: [
    {
      id: 2,
      title: "FootballPulse",
      image: "/images/footballpulse.png",
      description:
        "Application d’analyse de matchs et de pronostics footballistiques avec paris virtuels, collection de joueurs et classement en ligne.",
      longDescription:
        "Application full-stack d'analyse de matchs de football avec un système de jeu de prédiction. Les utilisateurs peuvent analyser les matchs, placer des paris virtuels, collectionner des joueurs et concourir au classement.",
      technologies: ["React", "TailwindCSS", "FastAPI (Python)", "MongoDB (Motor)", "Render", "Vercel"],
      features: [
        "Authentification utilisateur (JWT)",
        "Intégration API-Football pour 6 ligues",
        "Système de paris virtuels avec cotes dynamiques",
        "ISystème Gacha (packs Bronze/Argent/Or)",
        "Système XP, niveaux et badges",
      ],
      demoUrl: "https://football-pulse-sigma.vercel.app",
      githubUrl: "https://github.com/Louisbzr/FootballPulse/tree/master",
      featured: true,
      status: "Projet actuel en cours",
      year: "2026",
    },
    {
      id: 1,
      title: "PokeMorpho",
      image: "/images/pokemorpho.png",
      description:
        "Application de gestion de projets inspirée de Trello, conçue pour les étudiants, avec tableaux collaboratifs, tâches, checklists et mode sombre.",
      longDescription:
        "Application full stack permettant aux utilisateurs de créer un compte, explorer les Pokémon via l'API officielle PokéAPI, et gérer leur collection personnelle. Interface intuitive avec recherche, filtres par type et pages détaillées.",
      technologies: ["React", "Node.js", "PostgreSQL", "Prisma", "Render", "Vercel"],
      features: [
        "Authentification utilisateur (JWT)",
        "Exploration via PokéAPI",
        "Base de données utilisateurs",
        "Interface responsive",
      ],
      demoUrl: "https://pokemorpho.com",
      githubUrl: "https://github.com/Louisbzr/PokeMorpho",
      featured: true,
      status: "Terminé",
      year: "2026",
    },
    {
      id: 3,
      title: "StudyBoard",
      image: "/images/studyboard.png",
      description:
        "Encyclopédie Pokémon interactive avec authentification utilisateur, consultation de fiches détaillées et collection personnalisée.",
      longDescription:
        "Application web full-stack inspirée de Trello pour étudiants: gestion de tâches visuelle avec tableaux, listes, cartes, checklists, dates limites, tags, drag & drop, collaboration temps réel, commentaires, mode sombre.",
      technologies: ["React", "Python", "MongoDB (Atlas)", "Render", "Vercel"],
      features: [
        "Authentification utilisateur (JWT)",
        "5 templates (Projet Scolaire, Révisions Examens, Planning Semestre, Sprint Agile, Lecture & Recherche)",
        "Cartes détaillées (description, prioritée, date, tags, checklists, commentaires)",
        "Interface responsive",
        "Profil stats (boards, cards, checklists, tags, overdue alerts)",
      ],
      demoUrl: "https://study-board-nine.vercel.app/",
      githubUrl: "https://github.com/Louisbzr/StudyBoard",
      featured: true,
      status: "V1 Terminée",
      year: "2025",
    },
  ],
};
