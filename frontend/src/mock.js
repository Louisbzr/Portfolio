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
