// Import all project images
import fallGuys from '../assets/images/projects/fall-guys.webp';
import landingPage from '../assets/images/projects/landingPage.webp';
import pencilRun from '../assets/images/projects/pencilRun.jpg';
import petCare from '../assets/images/projects/pet-care.webp';

// Import all design images
import portfolio from '../assets/images/projects/portfolio.webp';

// Import all art images
import beruArt from '../assets/images/art/beru.webp';
import walkingMobileWallpaper from '../assets/images/art/walking_mobile-wallpaper.webp';

// Import all render images
import error403 from '../assets/images/renders/403.webp';
import error404 from '../assets/images/renders/404.webp';
import error500 from '../assets/images/renders/500.webp';
import error502 from '../assets/images/renders/502.webp';
import error503 from '../assets/images/renders/503.webp';
import error504 from '../assets/images/renders/504.webp';
import abstract1 from '../assets/images/renders/abstract 1.webp';
import abstract2 from '../assets/images/renders/abstract 2.webp';
import axe from '../assets/images/renders/axe.webp';
import carScene from '../assets/images/renders/Car Scene.webp';
import foodDragon from '../assets/images/renders/Food Dragon.webp';
import knife from '../assets/images/renders/knife.webp';
import pocketKnife from '../assets/images/renders/pocket_knife.webp';
import robot1 from '../assets/images/renders/robot 1.webp';
import simpleTable2 from '../assets/images/renders/Simple Table 2.webp';
import steampunkTableLamp from '../assets/images/renders/steampunk Table Lamp.webp';
import sword from '../assets/images/renders/sword.webp';
import tableScene2 from '../assets/images/renders/Table Scene 2.webp';
import underMaintenance from '../assets/images/renders/Under Maintenance.webp';
import violin from '../assets/images/renders/violin.webp';
import violin2 from '../assets/images/renders/violin 2.webp';
import wallartInStreet from '../assets/images/renders/wallart in street.webp';
import watch from '../assets/images/renders/watch.webp';
import zen from '../assets/images/renders/zen.webp';
import zenClose from '../assets/images/renders/zen-close.webp';

// Projects data based on images in assets/images folder
export const projects: (Project | Comic)[] = [
  // Featured Projects
  // Featured Web projects
  {
    id: 'web-fall-guys',
    title: 'Fall Guys',
    content: 'Fall Guys inspired web project',
    category: 'web-project',
    beta: false,
    thumbnail: fallGuys,
    status: 'published',
    featured: true,
    link: 'https://fall-guys-clone.netlify.app/',
  },
  {
    id: 'web-landing-page',
    title: 'Landing Page',
    content: 'Modern landing page design',
    category: 'web-project',
    beta: false,
    thumbnail: landingPage,
    status: 'published',
    featured: true,
    link: 'https://www.figma.com/design/CTKkn4O8d1SQhAr5XNbfjZ/portfolio-test?node-id=0-1&t=MqjYJBaxubuR5ifq-1',
  },
  {
    id: 'web-pencil-run',
    title: 'Pencil Run',
    content: 'Pencil Run web application',
    category: 'web-project',
    beta: false,
    thumbnail: pencilRun,
    status: 'published',
    featured: true,
    link: 'https://the-code-canvas.netlify.app/pencil-runner',
  },
  {
    id: 'web-pet-care',
    title: 'Pet Care',
    content: 'Pet care management web application',
    category: 'web-project',
    beta: false,
    thumbnail: petCare,
    status: 'published',
    featured: true,
    link: 'https://pet-care-landing-page.netlify.app/',
  },
  // Featured Render projects
  {
    id: 'render-wallart-in-street',
    title: 'Wallart In Street',
    content: '3D render of wallart in street',
    category: 'render',
    beta: false,
    thumbnail: wallartInStreet,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-food-dragon',
    title: 'Food Dragon',
    content: '3D render of a food dragon',
    category: 'render',
    beta: false,
    thumbnail: foodDragon,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-violin-2',
    title: 'Violin 2',
    content: '3D render of a violin',
    category: 'render',
    beta: false,
    thumbnail: violin2,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-robot-1',
    title: 'Robot 1',
    content: '3D render of a robot',
    category: 'render',
    beta: false,
    thumbnail: robot1,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-table-scene-2',
    title: 'Table Scene 2',
    content: '3D render of a table scene',
    category: 'render',
    beta: false,
    thumbnail: tableScene2,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-zen',
    title: 'Zen',
    content: '3D render of a zen scene',
    category: 'render',
    beta: false,
    thumbnail: zen,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-502',
    title: '502 Error',
    content: '3D render of 502 error page design',
    category: 'render',
    beta: false,
    thumbnail: error502,
    status: 'published',
    featured: true,
  },
  {
    id: 'render-car-scene',
    title: 'Car Scene',
    content: '3D render of a car scene',
    category: 'render',
    beta: false,
    thumbnail: carScene,
    status: 'published',
    featured: true,
  },
  
  // Featured Art projects
  {
    id: 'art-walking-mobile-wallpaper',
    title: 'Walking Mobile Wallpaper',
    content: 'Mobile wallpaper artwork',
    category: 'art',
    beta: false,
    thumbnail: walkingMobileWallpaper,
    status: 'published',
    featured: true,
  },
  
  // Non-Featured Projects
  // Design projects
  {
    id: 'web-portfolio',
    title: 'Portfolio',
    content: 'Portfolio website project',
    category: 'design',
    beta: false,
    thumbnail: portfolio,
    status: 'published',
    link: 'https://example.com/portfolio',
  },
  // Art projects
  {
    id: 'art-beru',
    title: 'Beru',
    content: 'Digital art piece featuring Beru',
    category: 'art',
    beta: false,
    thumbnail: beruArt,
    status: 'published',
  },
  // Render projects
  {
    id: 'render-403',
    title: '403 Error',
    content: '3D render of 403 error page design',
    category: 'render',
    beta: false,
    thumbnail: error403,
    status: 'published',
  },
  {
    id: 'render-404',
    title: '404 Error',
    content: '3D render of 404 error page design',
    category: 'render',
    beta: false,
    thumbnail: error404,
    status: 'published',
  },
  {
    id: 'render-500',
    title: '500 Error',
    content: '3D render of 500 error page design',
    category: 'render',
    beta: false,
    thumbnail: error500,
    status: 'published',
  },
  {
    id: 'render-503',
    title: '503 Error',
    content: '3D render of 503 error page design',
    category: 'render',
    beta: false,
    thumbnail: error503,
    status: 'published',
  },
  {
    id: 'render-504',
    title: '504 Error',
    content: '3D render of 504 error page design',
    category: 'render',
    beta: false,
    thumbnail: error504,
    status: 'published',
  },
  {
    id: 'render-abstract-1',
    title: 'Abstract 1',
    content: 'Abstract 3D render',
    category: 'render',
    beta: false,
    thumbnail: abstract1,
    status: 'published',
  },
  {
    id: 'render-abstract-2',
    title: 'Abstract 2',
    content: 'Abstract 3D render',
    category: 'render',
    beta: false,
    thumbnail: abstract2,
    status: 'published',
  },
  {
    id: 'render-axe',
    title: 'Axe',
    content: '3D render of an axe',
    category: 'render',
    beta: false,
    thumbnail: axe,
    status: 'published',
  },
  {
    id: 'render-knife',
    title: 'Knife',
    content: '3D render of a knife',
    category: 'render',
    beta: false,
    thumbnail: knife,
    status: 'published',
  },
  {
    id: 'render-pocket-knife',
    title: 'Pocket Knife',
    content: '3D render of a pocket knife',
    category: 'render',
    beta: false,
    thumbnail: pocketKnife,
    status: 'published',
  },
  {
    id: 'render-simple-table-2',
    title: 'Simple Table 2',
    content: '3D render of a simple table',
    category: 'render',
    beta: false,
    thumbnail: simpleTable2,
    status: 'published',
  },
  {
    id: 'render-steampunk-table-lamp',
    title: 'Steampunk Table Lamp',
    content: '3D render of a steampunk table lamp',
    category: 'render',
    beta: false,
    thumbnail: steampunkTableLamp,
    status: 'published',
  },
  {
    id: 'render-sword',
    title: 'Sword',
    content: '3D render of a sword',
    category: 'render',
    beta: false,
    thumbnail: sword,
    status: 'published',
  },
  {
    id: 'render-under-maintenance',
    title: 'Under Maintenance',
    content: '3D render of an under maintenance page design',
    category: 'render',
    beta: false,
    thumbnail: underMaintenance,
    status: 'published',
  },
  {
    id: 'render-violin',
    title: 'Violin',
    content: '3D render of a violin',
    category: 'render',
    beta: false,
    thumbnail: violin,
    status: 'published',
  },
  {
    id: 'render-watch',
    title: 'Watch',
    content: '3D render of a watch',
    category: 'render',
    beta: false,
    thumbnail: watch,
    status: 'published',
  },
  {
    id: 'render-zen-close',
    title: 'Zen Close',
    content: '3D render of a zen scene - close up',
    category: 'render',
    beta: false,
    thumbnail: zenClose,
    status: 'published',
  },
  
  // Comics
  {
    id: 'comic-adventure-quest',
    title: 'Adventure Quest',
    content: 'An epic adventure comic series',
    category: 'comic',
    beta: false,
    thumbnail: robot1,
    status: 'published',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Chapter 1: The Beginning',
        pages: [
          { id: 'page-1', number: 1 },
          { id: 'page-2', number: 2 },
          { id: 'page-3', number: 3 },
          { id: 'page-4', number: 4 },
        ],
      },
      {
        id: 'chapter-2',
        title: 'Chapter 2: The Journey',
        pages: [
          { id: 'page-1', number: 1 },
          { id: 'page-2', number: 2 },
          { id: 'page-3', number: 3 },
          { id: 'page-4', number: 4 },
          { id: 'page-5', number: 5 },
        ],
      },
      {
        id: 'chapter-3',
        title: 'Chapter 3: The Discovery',
        pages: [
          { id: 'page-1', number: 1 },
          { id: 'page-2', number: 2 },
          { id: 'page-3', number: 3 },
        ],
      },
    ],
  },
  {
    id: 'comic-mystery-tales',
    title: 'Mystery Tales',
    content: 'A collection of mysterious stories',
    category: 'comic',
    beta: false,
    thumbnail: abstract1,
    status: 'published',
    chapters: [
      {
        id: 'chapter-1',
        title: 'Chapter 1: The Secret',
        pages: [
          { id: 'page-1', number: 1 },
          { id: 'page-2', number: 2 },
          { id: 'page-3', number: 3 },
          { id: 'page-4', number: 4 },
        ],
      },
      {
        id: 'chapter-2',
        title: 'Chapter 2: The Revelation',
        pages: [
          { id: 'page-1', number: 1 },
          { id: 'page-2', number: 2 },
          { id: 'page-3', number: 3 },
          { id: 'page-4', number: 4 },
          { id: 'page-5', number: 5 },
          { id: 'page-6', number: 6 },
        ],
      },
    ],
  },
];
