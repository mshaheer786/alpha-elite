import { siteConfig } from '../content/site';

/**
 * Local persistence and WhatsApp dispatch service for Alpha Elite
 */

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'completed';
  createdAt: string;
}

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  mode: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const LEADS_STORAGE_KEY = 'ae_leads_data_v1';
const ENROLLMENTS_STORAGE_KEY = 'ae_enrollments_data_v1';

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Kamran Siddiqui',
    email: 'kamran.textiles@gmail.com',
    phone: '03001234567',
    service: 'E-commerce Architecture',
    budget: '$1,000 - $3,000',
    message: 'We want to launch an online store for our Multan cotton and fabric brand with COD integration.',
    source: 'Contact Form (Lamp Switch)',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Zainab Fatima',
    email: 'zainab.design@gmail.com',
    phone: '03219876543',
    service: 'Digital & Performance Marketing',
    budget: '$500 - $1,500/mo',
    message: 'Looking for Meta & TikTok ads management for our beauty e-commerce store.',
    source: 'Consultation Button',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-1',
    name: 'Hamza Bilal',
    email: 'hamza.bilal99@gmail.com',
    phone: '03124567890',
    courseId: 'shopify-mastery',
    courseTitle: 'Shopify E-commerce & Store Scale Mastery',
    mode: 'Onsite Multan (Chase Up)',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'enr-2',
    name: 'Ayesha Noor',
    email: 'ayesha.noor.dev@gmail.com',
    phone: '03337654321',
    courseId: 'fullstack-web',
    courseTitle: 'Full-Stack Modern Web Engineering',
    mode: 'Hybrid (Onsite + Online)',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

export const storageService = {
  getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
        return INITIAL_LEADS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LEADS;
    }
  },

  saveLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: 'lead_' + Math.random().toString(36).substring(2, 9),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    leads.unshift(newLead);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    return newLead;
  },

  updateLeadStatus(id: string, status: Lead['status']) {
    const leads = this.getLeads().map((l) => (l.id === id ? { ...l, status } : l));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    return leads;
  },

  getEnrollments(): Enrollment[] {
    try {
      const data = localStorage.getItem(ENROLLMENTS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(INITIAL_ENROLLMENTS));
        return INITIAL_ENROLLMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ENROLLMENTS;
    }
  },

  saveEnrollment(enrollment: Omit<Enrollment, 'id' | 'createdAt' | 'status'>): Enrollment {
    const enrollments = this.getEnrollments();
    const newEnrollment: Enrollment = {
      ...enrollment,
      id: 'enr_' + Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    enrollments.unshift(newEnrollment);
    try {
      localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(enrollments));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    return newEnrollment;
  },

  updateEnrollmentStatus(id: string, status: Enrollment['status']) {
    const enrollments = this.getEnrollments().map((e) => (e.id === id ? { ...e, status } : e));
    localStorage.setItem(ENROLLMENTS_STORAGE_KEY, JSON.stringify(enrollments));
    return enrollments;
  },

  createWhatsAppUrl(lead: { name: string; phone: string; service?: string; course?: string; message?: string }): string {
    let text = `*New Inquiry via Alpha Elite Website*\n\n`;
    text += `*Name:* ${lead.name}\n`;
    text += `*Contact:* ${lead.phone}\n`;
    if (lead.service) text += `*Service Requested:* ${lead.service}\n`;
    if (lead.course) text += `*Course Interested:* ${lead.course}\n`;
    if (lead.message) text += `*Message:* ${lead.message}\n`;
    text += `\n_Alpha Elite Solutions & Trainings (Chase Up, Bosan Road, Multan)_`;

    return `${siteConfig.contact.whatsappLink}?text=${encodeURIComponent(text)}`;
  },
};
