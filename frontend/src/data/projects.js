export const projectsPerPage = 4;

export const projects = [
  {
    id: 1,
    title: 'Portfolio personnel',
    category: 'web',
    image: '/images/projects/portfolio.png',
    screenshots: [{ image: '/images/projects/portfolio-screenshot.png' }],
    description: 'Un portfolio responsive qui réunit présentation, projets, parcours et articles.',
    long_description:
      'Un projet personnel conçu pour présenter mon parcours et mes réalisations, avec une interface React et un backend Django.',
    role: 'Conception et développement du portfolio, de l’interface React aux fonctionnalités backend Django.',
    tags: ['React', 'Django', 'API REST', 'SQLite', 'Tailwind CSS'],
    github: 'https://github.com/TIEMOUO/Dorcas_portfolio',
    demo: '',
  },
  {
    id: 2,
    title: 'VELORA — Location de véhicules',
    category: 'web',
    image: '',
    screenshots: [],
    description:
      'Projet académique de conception d’une application de location organisée autour d’une facturation horaire.',
    long_description:
      'Le projet porte sur l’analyse fonctionnelle et la définition des règles métier pour les demandes de réservation, la disponibilité des véhicules et le suivi des locations. Les technologies envisagées sont Python et Flask ; toutes les fonctionnalités ne sont pas présentées comme déjà développées.',
    role: 'Analyse fonctionnelle, définition des règles métier et cadrage des parcours de réservation et de location.',
    tags: ['Python', 'Flask'],
    github: '',
    demo: '',
  },
  {
    id: 3,
    title: 'Application mobile .NET MAUI',
    category: 'mobile',
    image: '',
    screenshots: [],
    description:
      'Application mobile fonctionnelle, avec une contribution centrée sur l’interface et les interactions côté client.',
    long_description:
      'Le travail réalisé concerne principalement le frontend : création des interfaces, navigation entre les écrans et interactions côté client.',
    role: 'Réalisation des interfaces, de la navigation et des interactions côté client.',
    tags: ['.NET MAUI'],
    github: '',
    demo: '',
  },
  {
    id: 4,
    title: 'AfrikPay — Dashboard multi-tenant',
    category: 'web',
    image: '',
    screenshots: [],
    description:
      'Amélioration des interfaces d’un tableau de bord Django et Django Unfold dans le cadre de mon stage.',
    long_description:
      'Contribution orientée interface et présentation des données : amélioration des tableaux, des filtres, de l’affichage des transactions, de la navigation et du responsive design.',
    role: 'Amélioration des interfaces du dashboard et de la lisibilité des données, sans revendication sur l’architecture ou la logique backend.',
    tags: ['Django', 'Django Unfold'],
    github: '',
    demo: '',
  },
];
