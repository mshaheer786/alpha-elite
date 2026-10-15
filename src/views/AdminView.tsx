import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  MessageSquare,
  Download,
  CheckCircle,
  Clock,
  UserCheck,
  Search,
  Filter,
  ArrowLeft,
  Lock,
  Unlock,
} from 'lucide-react';
import { storageService, Lead, Enrollment } from '../services/storageService';

interface AdminViewProps {
  onBack: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'leads' | 'enrollments'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLeads(storageService.getLeads());
    setEnrollments(storageService.getEnrollments());
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'alphaelite2026' || passcode.trim() === 'admin' || passcode.trim() === '') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect passcode. Try "admin" or click Quick Unlock.');
    }
  };

  const handleLeadStatusChange = (id: string, status: Lead['status']) => {
    const updated = storageService.updateLeadStatus(id, status);
    setLeads(updated);
  };

  const handleEnrollmentStatusChange = (id: string, status: Enrollment['status']) => {
    const updated = storageService.updateEnrollmentStatus(id, status);
    setEnrollments(updated);
  };

  const exportData = () => {
    const data = {
      leads,
      enrollments,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alpha-elite-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEnrollments = enrollments.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#C8282D]/20 border border-[#C8282D] flex items-center justify-center text-[#E53935] mx-auto mb-4">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-brand-serif font-bold text-white mb-2">
            Admin Access Portal
          </h2>
          <p className="text-xs text-[#A1A1AA] mb-6">
            Review client consultation briefs, academy seat enrollments, and live metrics.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D]"
              />
              {errorMsg && <p className="text-xs text-red-400 mt-1">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C8282D] hover:bg-[#E53935] text-white font-medium text-xs rounded-lg transition-colors shadow-lg"
            >
              Authenticate & Open Dashboard
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(true)}
              className="w-full py-2 bg-neutral-900 text-neutral-400 hover:text-white text-xs rounded-lg transition-colors border border-neutral-800"
            >
              Demo Quick Unlock
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5">
            <button
              onClick={onBack}
              className="text-xs text-neutral-500 hover:text-white inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Return to site"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-brand-serif font-bold text-white">
                Alpha Elite Executive Console
              </h1>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-1 ml-9">
              Managing inquiries, course admissions, and direct communication logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-[#C8282D]" />
              <span>Export Records (JSON)</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 text-neutral-400 hover:text-white"
              title="Lock Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-[#141414] border border-white/10 rounded-xl">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#C8282D] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Consultation Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'enrollments'
                  ? 'bg-[#C8282D] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Academy Enrollments ({enrollments.length})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg pl-9 pr-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8282D]"
            />
          </div>
        </div>

        {/* Leads Table */}
        {activeTab === 'leads' && (
          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161616] border-b border-white/5 text-neutral-400 font-mono">
                  <tr>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Service & Budget</th>
                    <th className="py-3.5 px-4">Message Scope</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-neutral-400">{lead.email}</div>
                        <div className="text-[#E53935] font-mono mt-0.5">{lead.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">{lead.service}</div>
                        <div className="text-neutral-400">{lead.budget || 'Not specified'}</div>
                      </td>
                      <td className="py-4 px-4 max-w-sm">
                        <p className="text-neutral-300 line-clamp-2">{lead.message}</p>
                        <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                          {new Date(lead.createdAt).toLocaleDateString()} at{' '}
                          {new Date(lead.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleLeadStatusChange(lead.id, e.target.value as Lead['status'])
                          }
                          className="bg-neutral-900 border border-neutral-700 text-xs rounded px-2.5 py-1 text-white focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <a
                          href={storageService.createWhatsAppUrl({
                            name: lead.name,
                            phone: lead.phone,
                            service: lead.service,
                            message: lead.message,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-black font-semibold rounded hover:bg-[#20ba59] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-neutral-500">
                        No leads found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enrollments Table */}
        {activeTab === 'enrollments' && (
          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161616] border-b border-white/5 text-neutral-400 font-mono">
                  <tr>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Course Enrolled</th>
                    <th className="py-3.5 px-4">Study Mode</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEnrollments.map((enr) => (
                    <tr key={enr.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{enr.name}</div>
                        <div className="text-neutral-400">{enr.email}</div>
                        <div className="text-[#E53935] font-mono mt-0.5">{enr.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">{enr.courseTitle}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          Applied: {new Date(enr.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-neutral-300 font-mono">
                        {enr.mode}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={enr.status}
                          onChange={(e) =>
                            handleEnrollmentStatusChange(
                              enr.id,
                              e.target.value as Enrollment['status']
                            )
                          }
                          className="bg-neutral-900 border border-neutral-700 text-xs rounded px-2.5 py-1 text-white focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <a
                          href={storageService.createWhatsAppUrl({
                            name: enr.name,
                            phone: enr.phone,
                            course: enr.courseTitle,
                            message: `Hello ${enr.name}, confirming your application for ${enr.courseTitle} at Alpha Elite Academy Multan.`,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-black font-semibold rounded hover:bg-[#20ba59] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filteredEnrollments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-neutral-500">
                        No admissions found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
