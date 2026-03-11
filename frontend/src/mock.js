// Mock data for Louis's portfolio
export const portfolioData = {
  personal: {
    name: "Louis",
    title: "Développeur Web Full Stack",
    description:
      "Développeur passionné par la création d'applications web interactives et modernes. Je travaille principalement avec JavaScript et les technologies full-stack.",
    email: "louis@example.com",
    github: "https://github.com/louis-dev",
    linkedin: "https://linkedin.com/in/louis-dev",
    availableForWork: true,
  },

  about: {
    paragraphs: [
      "Je suis Louis, développeur web full stack passionné par la création d'expériences numériques modernes et interactives. Mon parcours a débuté avec une fascination pour la façon dont les sites web et les applications prennent vie.",
      "Je travaille principalement avec JavaScript, React côté frontend, et Node.js / Express côté backend. J'aime résoudre des problèmes complexes et transformer des idées en produits fonctionnels.",
      "En dehors du code, je suis passionné par les jeux vidéo, ce qui influence mon approche créative du développement — créer des expériences engageantes et mémorables.",
    ],
    stats: [
      { label: "Projets réalisés", value: "10+" },
      { label: "Technologies maîtrisées", value: "15+" },
      { label: "Années d'expérience", value: "3+" },
    ],
  },

  parcours: [
    {
      id: 1,
      year: "2024",
      type: "project",
      title: "Pokémon Compendium",
      organization: "Projet Personnel",
      description:
        "Développement d'une encyclopédie Pokémon interactive full stack avec authentification JWT, intégration de la PokéAPI et base de données PostgreSQL via Prisma.",
      tags: ["React", "Node.js", "PostgreSQL", "Prisma", "JWT"],
    },
    {
      id: 2,
      year: "2023 – 2024",
      type: "education",
      title: "Formation Développeur Web",
      organization: "Autodidacte & Projets",
      description:
        "Apprentissage intensif du développement full stack : JavaScript ES6+, React, Node.js/Express, bases de données relationnelles et outils DevOps modernes.",
      tags: ["JavaScript", "React", "Node.js", "Express", "SQL"],
    },
    {
      id: 3,
      year: "2023",
      type: "learning",
      title: "Maîtrise du Frontend",
      organization: "Projets & Pratique",
      description:
        "Approfondissement de React, state management, hooks avancés, et intégration d'APIs REST. Construction de plusieurs projets personnels pour consolider les acquis.",
      tags: ["React", "Hooks", "REST API", "TailwindCSS"],
    },
    {
      id: 4,
      year: "2022 – 2023",
      type: "education",
      title: "Bases du Développement Web",
      organization: "Autodidacte",
      description:
        "Découverte et maîtrise des fondamentaux : HTML5, CSS3, JavaScript vanilla. Création des premiers projets web statiques et dynamiques.",
      tags: ["HTML", "CSS", "JavaScript", "DOM"],
    },
    {
      id: 5,
      year: "2022",
      type: "achievement",
      title: "Premier Déploiement",
      organization: "Vercel & Railway",
      description:
        "Déploiement du premier projet full stack en production : frontend sur Vercel, backend sur Railway, base de données PostgreSQL managée. Découverte du workflow CI/CD.",
      tags: ["Vercel", "Railway", "CI/CD", "Git"],
    },
  ],

  skills: {
    frontend: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 85 },
    ],
    backend: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 80 },
    ],
    database: [
      { name: "PostgreSQL", level: 75 },
      { name: "Prisma", level: 72 },
      { name: "Supabase", level: 70 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 88 },
      { name: "Vercel", level: 85 },
      { name: "Railway", level: 78 },
    ],
  },

  projects: [
    {
      id: 1,
      title: "Pokémon Compendium",
      description:
        "Encyclopédie Pokémon interactive avec authentification utilisateur, consultation de fiches détaillées et collection personnalisée.",
      longDescription:
        "Application full stack permettant aux utilisateurs de créer un compte, explorer les Pokémon via l'API officielle PokéAPI, et gérer leur collection personnelle. Interface intuitive avec recherche, filtres par type et pages détaillées.",
      technologies: ["React", "Node.js", "PostgreSQL", "Prisma", "Railway", "Vercel"],
      features: [
        "Authentification utilisateur (JWT)",
        "Exploration via PokéAPI",
        "Base de données utilisateurs",
        "Interface responsive",
      ],
      demoUrl: "https://pokemon-compendium.vercel.app",
      githubUrl: "https://github.com/louis-dev/pokemon-compendium",
      featured: true,
      status: "Terminé",
      year: "2024",
    },
  ],
};
