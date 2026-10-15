/**
 * Alpha Elite Solutions & Trainings
 * Central Site Configuration & Content Data
 * Multi-Marketplace Focus: Shopify, Amazon, TikTok Shop, Walmart
 */

import { projects, Project } from './data';

export interface MarketplaceService {
  id: string;
  platform: 'Shopify' | 'Amazon' | 'TikTok Shop' | 'Walmart';
  tagline: string;
  description: string;
  services: string[];
}

export interface GeneralService {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  iconName: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  platformTag?: string;
  badge: string;
  duration: string; // May contain TODO
  fee: string; // Marked with TODO
  mode: 'Onsite Multan' | 'Online' | 'Hybrid (Onsite + Online)';
  level: string;
  description: string;
  highlights: string[];
  curriculum: string[];
  prerequisites: string;
  certification: boolean;
  seatsRemaining: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  targetKeyword: string;
  excerpt: string;
  content: string;
}

export { projects };
export type { Project };

export const siteConfig = {
  name: 'Alpha Elite Solutions & Trainings',
  shortName: 'Alpha Elite',
  tagline: 'Commitment To Excellence',
  positioning:
    'Comprehensive marketplace management across Shopify, Amazon, TikTok Shop and Walmart, custom web development, digital marketing, and practical professional training courses in Multan.',
  platforms: ['Shopify', 'Amazon', 'TikTok Shop', 'Walmart'] as const,
  platformWordmarks: [
    { name: 'Shopify', desc: 'Custom theme development, store builds, app integration, and payment gateways.' },
    { name: 'Amazon', desc: 'Seller account support, product listing optimization, A+ content, and PPC ads.' },
    { name: 'TikTok Shop', desc: 'Shop setup, creator and affiliate campaigns, product cataloging, and video ads.' },
    { name: 'Walmart', desc: 'Seller onboarding, listing creation, catalog and inventory management, and sponsored ads.' },
  ],
  contact: {
    email: 'alphaelitesolutionstrainings@gmail.com',
    phone: '03146077809',
    formattedPhone: '+92 314 6077809',
    whatsappLink: 'https://wa.me/923146077809',
    whatsappNumber: '+92 314 6077809',
    address: 'Chase Up, Bosan Road, Multan, Pakistan',
    locationShort: 'Chase Up, Bosan Road, Multan',
    facebook: 'https://www.facebook.com/profile.php?id=61594513037815',
    hours: 'Monday – Friday: 9:00 AM – 6:00 PM (PKT)',
  },
  disclaimer:
    'Shopify, Amazon, TikTok Shop and Walmart are trademarks of their respective owners. Alpha Elite is not affiliated with them.',
  founder: {
    name: 'Mian Abdul Raffay',
    title: 'Founder & Principal Director',
    role: 'Marketplace Architect & Digital Strategist',
    quote:
      'True execution in modern commerce requires mastering the specific mechanics of every major marketplace: Shopify, Amazon, TikTok Shop and Walmart.',
    bio: 'Guiding brands through multi-channel marketplace setup, account health, and catalog management from Chase Up, Bosan Road, Multan, while training the next generation of professional account managers.',
    image: '/src/assets/images/mian_abdul_raffay_1792037148522.jpg',
  },
  stats: [
    { value: '4 Major', label: 'Marketplaces Supported', context: 'Shopify, Amazon, TikTok Shop, Walmart' },
    { value: 'Turnkey', label: 'End-to-End Execution', context: 'Store setup, listings, ad management & inventory' },
    { value: 'Onsite + Online', label: 'Flexible Training Formats', context: 'Multan physical campus & live interactive online' },
    { value: 'Multan HQ', label: 'Commercial Presence', context: 'Chase Up, Bosan Road corporate office & lab' },
  ],
  marketplaceServices: [
    {
      id: 'shopify-service',
      platform: 'Shopify',
      tagline: 'High-Converting Storefronts & Custom Theme Engineering',
      description:
        'Complete Shopify e-commerce solutions from concept to launch. We build customized liquid storefronts designed for speed, local and global payment gateways, and friction-free mobile checkout.',
      services: [
        'Store setup and full account configuration',
        'Theme customisation and responsive liquid design',
        'Product setup, variants, and collection architecture',
        'App integration and conversion-focused checkout features',
        'Payment gateway integration (COD, Stripe, local gateways)',
      ],
    },
    {
      id: 'amazon-service',
      platform: 'Amazon',
      tagline: 'Seller Central Account Management & Catalog Optimization',
      description:
        'Structured support for brand owners and private labels on Amazon. We handle technical listing creation, keyword-indexed copy, and performance-monitored PPC campaigns.',
      services: [
        'Seller account support and health monitoring',
        'Listing creation and search keyword optimisation',
        'A+ Content (Enhanced Brand Content) and visual asset design',
        'PPC advertising campaign setup, bidding, and negative keywords',
        'Catalogue and variation management',
      ],
    },
    {
      id: 'tiktok-service',
      platform: 'TikTok Shop',
      tagline: 'Social Commerce Setup & Creator-Driven Campaigns',
      description:
        'Capitalize on high-engagement social shopping. We configure your TikTok Shop, synchronize products, manage creator affiliate programs, and run targeted in-feed video ads.',
      services: [
        'Shop setup, merchant registration, and warehouse mapping',
        'Product listings, bundles, and promotion engine setup',
        'Content and video creative strategy for commerce',
        'Affiliate and creator collaboration outreach campaigns',
        'TikTok Shop Ads setup and audience targeting',
      ],
    },
    {
      id: 'walmart-service',
      platform: 'Walmart',
      tagline: 'Marketplace Onboarding & Multi-Channel Expansion',
      description:
        'Expand your North American customer base by launching on Walmart Marketplace. We assist with seller application onboarding, catalog feeds, and sponsored product promotions.',
      services: [
        'Seller onboarding support and application documentation',
        'Listing optimisation, title structuring, and item specs',
        'Catalogue and inventory synchronization management',
        'Walmart Sponsored Products and advertising campaigns',
        'Order and shipping compliance configuration',
      ],
    },
  ] as MarketplaceService[],
  generalServices: [
    {
      id: 'web-dev',
      number: '01',
      title: 'Full-Stack Web Development',
      tagline: 'Modern Web Applications & Custom Portals',
      description:
        'Bespoke web development built with React, Next.js, and TypeScript. We engineer custom portals, business management dashboards, and fast marketing websites.',
      capabilities: [
        'React & Next.js modern web applications',
        'Custom customer dashboards and administrative portals',
        'API development, webhooks, and third-party database integration',
        'Core Web Vitals optimization and performance tuning',
      ],
      iconName: 'Code',
    },
    {
      id: 'seo',
      number: '02',
      title: 'Search Engine Optimization (SEO)',
      tagline: 'Google Search Visibility & Technical Engineering',
      description:
        'Systematic on-page, technical, and local SEO services to help your business gain sustainable search indexation in Pakistan and global search engines.',
      capabilities: [
        'Local SEO and Google Business Profile management',
        'Technical site audits, crawl budget, and indexing fixes',
        'Keyword research and search intent mapping',
        'Schema.org structured data (Product, Organization, LocalBusiness)',
      ],
      iconName: 'Search',
    },
    {
      id: 'ui-ux',
      number: '03',
      title: 'UI / UX Design Systems',
      tagline: 'Clean Digital Interfaces & Design Systems',
      description:
        'User-centric wireframes, design systems, and responsive prototypes created in Figma with strict visual hierarchy and accessible contrast.',
      capabilities: [
        'Complete design systems and reusable component libraries in Figma',
        'Responsive mobile and desktop interface layouts',
        'Checkout funnel and user journey wireframing',
        'Interactive clickable prototypes for user feedback',
      ],
      iconName: 'Palette',
    },
    {
      id: 'digital-marketing',
      number: '04',
      title: 'Digital & Performance Marketing',
      tagline: 'Multi-Channel Advertising & Customer Acquisition',
      description:
        'Paid media campaign management across Meta (Facebook & Instagram), Google Ads, and TikTok with conversion tracking and audience segmentation.',
      capabilities: [
        'Meta Ads Manager campaign architecture and Pixel/CAPI tracking',
        'Ad creative testing frameworks (video, carousels, single image)',
        'Retargeting funnels and lookalike audience mapping',
        'Google Search and Performance Max campaign management',
      ],
      iconName: 'TrendingUp',
    },
    {
      id: 'branding',
      number: '05',
      title: 'Brand & Graphic Design',
      tagline: 'Visual Identities & Corporate Collateral',
      description:
        'Distinctive logo marks, typography standards, color palettes, and social media creative templates that build a credible market presence.',
      capabilities: [
        'Vector monogram and wordmark logo design',
        'Brand guideline documentation and typography standards',
        'Packaging, business cards, and marketing collateral',
        'Social media templates and digital banner graphics',
      ],
      iconName: 'Sparkles',
    },
    {
      id: 'ecommerce-operations',
      number: '06',
      title: 'E-Commerce Operations & Inventory',
      tagline: 'Multi-Channel Synchronization & Fulfillment Workflows',
      description:
        'Structured catalog management, stock synchronization, and fulfillment workflows across multiple sales channels to eliminate stockouts and order discrepancies.',
      capabilities: [
        'Centralized inventory synchronization across stores',
        'Bulk catalog uploads, variant taxonomy, and SKU structuring',
        'Fulfillment workflows, tracking numbers, and returns handling',
        'Order export automation and third-party warehouse integration',
      ],
      iconName: 'ShoppingBag',
    },
  ] as GeneralService[],
  trainings: [
    {
      id: 'shopify-mastery',
      title: 'Shopify E-Commerce Store Development',
      platformTag: 'Shopify',
      badge: 'Comprehensive Track',
      duration: '6 Weeks (TODO: Confirm upcoming batch schedule)',
      fee: 'PKR TODO_FEE (Contact for current cohort pricing)',
      mode: 'Hybrid (Onsite + Online)',
      level: 'Beginner to Intermediate',
      description:
        'Practical step-by-step training on building and managing Shopify stores. Learn theme customisation, product listings, payment setup, courier integration, and store operations.',
      highlights: [
        'Step-by-step Shopify store setup from scratch',
        'Theme customization and section layout design',
        'Payment gateway configuration and Cash on Delivery (COD) logistics',
        'Essential e-commerce apps for navigation and conversion',
      ],
      curriculum: [
        'Week 1: Introduction to E-Commerce & Shopify Platform Overview',
        'Week 2: Product Catalog Architecture, Collections & Variants',
        'Week 3: Theme Selection, Customization & Branding',
        'Week 4: Shipping Zones, Courier Integration & COD Setup',
        'Week 5: Essential Apps, Upsells & Customer Communication',
        'Week 6: Store Launch Checklist, Order Fulfillment & Maintenance',
      ],
      prerequisites: 'Basic computer literacy and a laptop.',
      certification: true,
      seatsRemaining: 6,
    },
    {
      id: 'amazon-mastery',
      title: 'Amazon Seller Central & Marketplace Management',
      platformTag: 'Amazon',
      badge: 'New Marketplace Track',
      duration: 'TODO_DURATION (6 to 8 Weeks anticipated)',
      fee: 'PKR TODO_FEE (Contact admissions for updated schedule)',
      mode: 'Hybrid (Onsite + Online)',
      level: 'Beginner to Advanced',
      description:
        'Learn how to manage Amazon seller accounts professionally. Covers product listing creation, keyword indexing, A+ content, catalog management, and sponsored PPC campaigns.',
      highlights: [
        'Amazon Seller Central interface walkthrough and account navigation',
        'Keyword research tools (Helium 10, Jungle Scout principles)',
        'Product title, bullet points, and description SEO optimization',
        'PPC campaign setup: Sponsored Products, Brands, and Display',
      ],
      curriculum: [
        'Week 1: Amazon Ecosystem, Account Types & Seller Guidelines',
        'Week 2: Keyword Research & Product Listing Creation',
        'Week 3: A+ Content Guidelines and Image Optimization',
        'Week 4: Inventory Management & FBA/FBM Shipment Creation',
        'Week 5: Amazon Sponsored Ads (PPC) Architecture & Negative Keywords',
        'Week 6: Account Health Management, Case Logs & Customer Service',
      ],
      prerequisites: 'Foundational English comprehension and basic spreadsheet skills.',
      certification: true,
      seatsRemaining: 5,
    },
    {
      id: 'tiktok-shop-mastery',
      title: 'TikTok Shop Setup & Affiliate Marketing',
      platformTag: 'TikTok Shop',
      badge: 'Social Commerce Track',
      duration: 'TODO_DURATION (4 to 6 Weeks anticipated)',
      fee: 'PKR TODO_FEE (Contact admissions for updated schedule)',
      mode: 'Hybrid (Onsite + Online)',
      level: 'Beginner to Intermediate',
      description:
        'A dedicated course on selling through TikTok Shop. Learn merchant account setup, product catalog listing, creator affiliate collaboration, and TikTok Shop advertising.',
      highlights: [
        'TikTok Shop seller center onboarding and warehouse mapping',
        'Product catalog synchronization and promo configuration',
        'Affiliate program setup and creator collaboration workflows',
        'TikTok Shop video ad campaigns and live shopping principles',
      ],
      curriculum: [
        'Week 1: TikTok Shop Architecture & Regional Merchant Requirements',
        'Week 2: Product Uploads, Tagging & Catalog Compliance',
        'Week 3: TikTok Affiliate Center & Outreach to Creators',
        'Week 4: Short-Form Video Content Strategy for Commerce',
        'Week 5: TikTok Ads Manager Integration & Campaign Launch',
        'Week 6: Order Processing, Return Handling & Account Health',
      ],
      prerequisites: 'Smartphone and basic familiarity with the TikTok app.',
      certification: true,
      seatsRemaining: 8,
    },
    {
      id: 'walmart-mastery',
      title: 'Walmart Marketplace Operations & Management',
      platformTag: 'Walmart',
      badge: 'Expansion Track',
      duration: 'TODO_DURATION (4 to 6 Weeks anticipated)',
      fee: 'PKR TODO_FEE (Contact admissions for updated schedule)',
      mode: 'Hybrid (Onsite + Online)',
      level: 'Intermediate to Advanced',
      description:
        'Learn the operational requirements of selling on Walmart Marketplace. Covers seller account application, item spec feed uploads, catalog management, and Walmart Advertising.',
      highlights: [
        'Walmart Marketplace seller requirements and application guidelines',
        'Item spec feed templates and listing quality score maintenance',
        'Inventory synchronization and fulfillment options (WFS / 3PL)',
        'Walmart Sponsored Products ad campaign management',
      ],
      curriculum: [
        'Week 1: Walmart Marketplace Overview & Eligibility Standards',
        'Week 2: Seller Center Setup & Integration Protocols',
        'Week 3: Catalog Feed Uploads, Categories & Attributes',
        'Week 4: Listing Quality Score Optimization (Content, Offer, Rating)',
        'Week 5: Walmart Advertising Center & Sponsored Campaigns',
        'Week 6: Order Performance Standards, Returns & Dispute Resolution',
      ],
      prerequisites: 'Prior experience with general e-commerce or Amazon account management recommended.',
      certification: true,
      seatsRemaining: 4,
    },
    {
      id: 'fullstack-web',
      title: 'Full-Stack Modern Web Engineering',
      badge: 'Development Track',
      duration: '10 Weeks (TODO: Check next cohort dates)',
      fee: 'PKR TODO_FEE (Contact for syllabus & tuition)',
      mode: 'Onsite Multan',
      level: 'Beginner to Advanced',
      description:
        'Hands-on training in contemporary web engineering with React, TypeScript, Tailwind CSS, and Node.js. Build production-grade responsive applications.',
      highlights: [
        'TypeScript and modern React functional patterns',
        'Tailwind CSS layout design and animations',
        'API integration, backend endpoints, and databases',
        'Git version control and cloud deployment',
      ],
      curriculum: [
        'Weeks 1-2: HTML5 Semantic Structure, CSS Layouts & Responsive Design',
        'Weeks 3-4: JavaScript (ESNext) Core & TypeScript Foundations',
        'Weeks 5-7: React Components, Hooks, State & Routing',
        'Weeks 8-9: Backend Basics with Express & Database Queries',
        'Week 10: Capstone Project Deployment & Portfolio Review',
      ],
      prerequisites: 'Basic programming interest and a laptop.',
      certification: true,
      seatsRemaining: 6,
    },
    {
      id: 'seo-organic',
      title: 'Search Engine Optimization (SEO)',
      badge: 'Marketing Track',
      duration: '6 Weeks (TODO: Check next cohort dates)',
      fee: 'PKR TODO_FEE (Contact for syllabus & tuition)',
      mode: 'Hybrid (Onsite + Online)',
      level: 'Beginner to Intermediate',
      description:
        'Understand search engine mechanics, on-page content optimization, technical website audits, local search presence, and Google Search Console data.',
      highlights: [
        'Keyword research methodology and intent analysis',
        'On-page title, meta, heading, and image optimization',
        'Technical SEO: sitemaps, robots.txt, and site speed basics',
        'Google Business Profile setup and local citation building',
      ],
      curriculum: [
        'Week 1: How Search Engines Work & Crawling Concepts',
        'Week 2: Keyword Research & Competitive Keyword Mapping',
        'Week 3: On-Page Optimization & Content Structuring',
        'Week 4: Technical SEO Audits & Core Web Vitals Overview',
        'Week 5: Local SEO & Google Business Profile Optimization',
        'Week 6: Link Building Strategies & Search Console Reporting',
      ],
      prerequisites: 'Basic internet familiarity.',
      certification: true,
      seatsRemaining: 7,
    },
    {
      id: 'performance-marketing',
      title: 'Digital & Performance Marketing',
      badge: 'Marketing Track',
      duration: '6 Weeks (TODO: Check next cohort dates)',
      fee: 'PKR TODO_FEE (Contact for syllabus & tuition)',
      mode: 'Hybrid (Onsite + Online)',
      level: 'Beginner to Intermediate',
      description:
        'Practical training on setting up and managing paid advertising campaigns across Meta (Facebook & Instagram) and TikTok.',
      highlights: [
        'Meta Business Manager setup, assets, and permissions',
        'Campaign structures (Awareness, Traffic, Leads, Sales)',
        'Pixel and Conversion API (CAPI) installation concepts',
        'Creative copywriting, video ad hooks, and audience testing',
      ],
      curriculum: [
        'Week 1: Digital Advertising Fundamentals & Funnel Concepts',
        'Week 2: Meta Business Manager & Pixel Setup',
        'Week 3: Campaign Setup, Audiences & Placements',
        'Week 4: Ad Creatives, Copywriting & Media Formats',
        'Week 5: TikTok Ads Manager Overview & Setup',
        'Week 6: Reporting, Metrics Analysis & Campaign Optimization',
      ],
      prerequisites: 'Basic social media familiarity.',
      certification: true,
      seatsRemaining: 5,
    },
    {
      id: 'brand-uiux',
      title: 'Graphic Design & UI/UX Fundamentals',
      badge: 'Creative Track',
      duration: '8 Weeks (TODO: Check next cohort dates)',
      fee: 'PKR TODO_FEE (Contact for syllabus & tuition)',
      mode: 'Onsite Multan',
      level: 'Beginner to Intermediate',
      description:
        'Learn foundational graphic design, vector typography, brand styling, and user interface wireframing in Figma.',
      highlights: [
        'Design principles: layout, hierarchy, typography, and contrast',
        'Figma interface, components, and auto-layout fundamentals',
        'Brand identity design: logos, stationery, and social templates',
        'Web wireframing and responsive prototype creation',
      ],
      curriculum: [
        'Week 1: Fundamentals of Visual Design & Color Theory',
        'Week 2: Typography & Layout Systems',
        'Week 3: Vector Logo Concepts & Brand Assets',
        'Week 4: Introduction to Figma: Frames, Shapes & Components',
        'Week 5: Auto-Layout & UI Design Systems',
        'Week 6: Responsive Web & Mobile Screen Design',
        'Week 7: Interactive Prototyping & Micro-Interactions',
        'Week 8: Portfolio Preparation & Project Review',
      ],
      prerequisites: 'A laptop and enthusiasm for creative design.',
      certification: true,
      seatsRemaining: 6,
    },
  ] as TrainingCourse[],
  blogPosts: [
    {
      slug: 'growing-across-shopify-amazon-tiktok-walmart',
      title: 'Multi-Channel Commerce: Expanding Across Shopify, Amazon, TikTok Shop and Walmart',
      category: 'Marketplace Strategy',
      date: 'April 2026',
      readTime: '6 min read',
      targetKeyword: 'e-commerce agency Multan, Amazon seller services Pakistan',
      excerpt:
        'Why relying on a single channel limits brand potential, and how managing Shopify, Amazon, TikTok Shop, and Walmart in tandem provides diversified stability.',
      content: `In the evolving digital commerce ecosystem, relying on a single sales channel exposes businesses to platform policy changes, algorithm adjustments, or fluctuating advertising costs.

### The Four Pillars of Multi-Channel E-Commerce
1. **Shopify (Your Brand Flagship):** Provides complete ownership of your customer relationship, brand storytelling, custom checkout experiences, and direct remarketing.
2. **Amazon (High-Intent Marketplace):** Connects your catalog with millions of active, high-intent shoppers searching specifically for products with fast fulfillment expectations.
3. **TikTok Shop (Social Discovery):** Leverages video content, creator affiliate networks, and impulse in-app checkouts to reach audiences who discover products through organic entertainment.
4. **Walmart Marketplace (Retail Expansion):** Offers access to a rapidly growing North American marketplace with lower seller density in selected categories.

At Alpha Elite Solutions & Trainings, our agency team assists businesses in setting up, cataloging, and managing accounts across all four platforms from our Multan offices.`,
    },
    {
      slug: 'amazon-seller-services-pakistan-guide',
      title: 'Amazon Account Management & Catalog Optimization for Pakistani Exporters',
      category: 'Amazon Marketplace',
      date: 'April 2026',
      readTime: '5 min read',
      targetKeyword: 'Amazon seller services Pakistan, catalogue management',
      excerpt:
        'Key operational steps for creating compliant Amazon listings, managing A+ content, and structuring sponsored product advertising.',
      content: `Selling on Amazon requires strict operational discipline regarding account health, listing compliance, and customer metrics.

### Key Listing & Catalog Elements
- **Keyword-Indexed Titles & Bullets:** Structuring product copy with relevant backend search terms and clear consumer specifications.
- **A+ Content Architecture:** Enhancing standard listings with rich comparison charts, brand story modules, and high-resolution imagery.
- **PPC Advertising Management:** Organizing campaign structures into separate exact, phrase, and broad ad groups with proactive negative keyword pruning.

Our training academy in Multan also covers practical Seller Central operations to prepare local students for marketplace management roles.`,
    },
    {
      slug: 'tiktok-shop-management-affiliate-strategies',
      title: 'TikTok Shop Operations: Setup, Product Cataloging & Creator Affiliates',
      category: 'TikTok Shop',
      date: 'March 2026',
      readTime: '5 min read',
      targetKeyword: 'TikTok Shop management, creator campaigns',
      excerpt:
        'How modern merchants configure TikTok Shop seller centers, sync products, and collaborate with creators through open and targeted affiliate plans.',
      content: `TikTok Shop continues to expand social commerce by integrating purchasing directly inside the video feed.

### Core Operational Steps
1. **Merchant Verification & Warehouse Mapping:** Establishing verified seller accounts and linking logistics and return addresses.
2. **Affiliate Commission Structuring:** Creating open plans and targeted creator commission tiers to incentivize influencers to showcase your products.
3. **Shoppable Video Creatives:** Producing short-form video content with clear product tags and demonstration hooks.

Alpha Elite provides hands-on setup support and training on the TikTok Shop Seller Center.`,
    },
    {
      slug: 'walmart-marketplace-onboarding-overview',
      title: 'Walmart Marketplace Management: Application, Feeds & Catalog Standards',
      category: 'Walmart Marketplace',
      date: 'March 2026',
      readTime: '5 min read',
      targetKeyword: 'Walmart marketplace management, listing optimisation',
      excerpt:
        'An introduction to Walmart Marketplace onboarding, item spec feeds, and sponsored product advertising for expanding brands.',
      content: `Walmart Marketplace is an attractive expansion route for established e-commerce brands seeking diversified sales channels.

### What to Prepare for Walmart
- **Seller Application Documents:** Business registration, verifiable tax ID, and demonstrated track record of successful e-commerce operations.
- **Item Spec Catalog Feeds:** Structuring product attributes, UPC/GTIN barcodes, and category variants according to Walmart spec standards.
- **Listing Quality Score:** Maintaining competitive pricing, fast shipping standards, and clear product information to win the buy box.

Explore our dedicated Walmart marketplace management services and training modules at Alpha Elite.`,
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      category: 'services',
      question: 'Which e-commerce platforms and marketplaces does Alpha Elite support?',
      answer:
        'Alpha Elite works across four core e-commerce platforms: Shopify, Amazon, TikTok Shop, and Walmart. We also provide full-stack web development, SEO, UI/UX design, and digital marketing services.',
    },
    {
      id: 'faq-2',
      category: 'services',
      question: 'What specific services do you provide for Amazon sellers?',
      answer:
        'Our Amazon services include seller account support, product listing creation and keyword optimisation, A+ Content design, PPC sponsored advertising setup and management, and catalogue troubleshooting.',
    },
    {
      id: 'faq-3',
      category: 'services',
      question: 'How do you assist brands launching on TikTok Shop?',
      answer:
        'We help with TikTok Shop seller registration, product uploads, affiliate program configuration, creator collaboration outreach, and TikTok Shop advertising setup.',
    },
    {
      id: 'faq-4',
      category: 'services',
      question: 'Can you assist with Walmart Marketplace onboarding?',
      answer:
        'Yes. We support eligible brands with Walmart Marketplace onboarding, item spec feed cataloging, listing quality optimization, and Walmart Sponsored Products advertising.',
    },
    {
      id: 'faq-5',
      category: 'trainings',
      question: 'Which training courses do you offer at your Multan academy?',
      answer:
        'We offer courses in Shopify Store Development, Amazon Seller Central & Marketplace Management, TikTok Shop Setup & Affiliates, Walmart Marketplace Operations, Full-Stack Web Engineering, SEO, Digital Marketing, and Graphic Design & UI/UX.',
    },
    {
      id: 'faq-6',
      category: 'trainings',
      question: 'Are classes held in-person or online?',
      answer:
        'We provide both in-person training at our physical campus at Chase Up, Bosan Road, Multan, and live online interactive sessions for students across Pakistan and internationally.',
    },
    {
      id: 'faq-7',
      category: 'trainings',
      question: 'What are the course fees and upcoming batch schedules?',
      answer:
        'Course fees and upcoming batch start dates vary by track (marked as TODO in our course listings). Please contact our admissions desk on WhatsApp at 0314 6077809 for current schedule details.',
    },
    {
      id: 'faq-8',
      category: 'services',
      question: 'Where is Alpha Elite located?',
      answer:
        'Our corporate office and training lab are located at Chase Up, Bosan Road, Multan, Pakistan. You can visit during business hours (Monday–Friday, 9:00 AM – 6:00 PM) or reach us on WhatsApp at 0314 6077809.',
    },
  ],
};
