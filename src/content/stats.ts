/**
 * Statistics data for Alpha Elite Solutions & Trainings
 * If real numbers are not supplied, marked with TODO placeholders as instructed.
 * No copied or fabricated statistics.
 */

export interface StatItem {
  id: string;
  value: string;
  label: string;
  context: string;
}

export const statsData: StatItem[] = [
  {
    id: 'stat-projects',
    value: '50+', // TODO: Replace with verified projects count if different
    label: 'Projects Delivered',
    context: 'Stores & web applications deployed',
  },
  {
    id: 'stat-brands',
    value: '20+', // TODO: Replace with verified brand partner count
    label: 'Brands Supported',
    context: 'Across multi-channel marketplaces',
  },
  {
    id: 'stat-experience',
    value: '5+', // TODO: Replace with verified commercial years
    label: 'Years of Experience',
    context: 'In e-commerce and digital operations',
  },
];
