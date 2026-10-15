/**
 * Typed Real Projects Data for Alpha Elite Portfolio
 */

export interface Project {
  slug: string;
  title: string;
  category: 'E-commerce' | 'Websites' | 'Branding';
  platform: string;
  url: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: 'colourway',
    title: 'ColourWay',
    category: 'E-commerce',
    platform: 'Shopify (TODO: verify platform)',
    url: 'https://colourway.pk',
    description: 'Official distributor e-commerce website developed with complete product setup and digital presence. (TODO_REAL_DETAIL: Add verified client scope)',
    image: '/portfolio/colourway.svg',
  },
  {
    slug: 'giftpoint',
    title: 'GiftPoint',
    category: 'E-commerce',
    platform: 'Shopify (TODO: verify platform)',
    url: 'https://giftpoint.com.pk',
    description: 'E-commerce website developed with complete product setup and digital presence. (TODO_REAL_DETAIL: Add verified client scope)',
    image: '/portfolio/giftpoint.svg',
  },
  {
    slug: 'dmarina',
    title: 'D Marina',
    category: 'E-commerce',
    platform: 'Shopify (TODO: verify platform)',
    url: 'https://dmarina.pk',
    description: 'Multi-product e-commerce website developed with complete product setup and digital presence. (TODO_REAL_DETAIL: Add verified client scope)',
    image: '/portfolio/dmarina.svg',
  },
  {
    slug: 'originals-by-dmarina',
    title: 'Originals by D Marina',
    category: 'E-commerce',
    platform: 'Shopify (TODO: verify platform)',
    url: 'https://originalsbydmarina.com',
    description: 'Premium e-commerce store developed with complete product setup and digital presence. (TODO_REAL_DETAIL: Add verified client scope)',
    image: '/portfolio/originals-by-dmarina.svg',
  },
  {
    slug: 'rqmarble',
    title: 'RQ Marble',
    category: 'Websites',
    platform: 'Custom Web (TODO: verify platform)',
    url: 'https://rqmarble.com',
    description: 'Business website built for construction and marble company with product showcase and presentation. (TODO_REAL_DETAIL: Add verified client scope)',
    image: '/portfolio/rqmarble.svg',
  },
];
