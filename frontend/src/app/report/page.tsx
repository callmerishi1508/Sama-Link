"use client";

import { useState } from "react";
import { IncidentInput } from "@/components/incident/IncidentInput";
import { 
  AlertCircle, Camera, MapPin, Globe, User, 
  ShieldAlert, UserPlus, Home, HeartHandshake, PhoneOff
} from "lucide-react";
import { motion } from "framer-motion";

const REPORTER_TYPES = [
  { id: 'citizen', label: 'Citizen', icon: User },
  { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake },
  { id: 'hospital', label: 'Hospital', icon: Home },
  { id: 'police', label: 'Police', icon: ShieldAlert },
  { id: 'ngo', label: 'NGO', icon: UserPlus },
  { id: 'anonymous', label: 'Anonymous', icon: PhoneOff },
];

export default function ReportIncidentPage() {
  const [selectedReporter, setSelectedReporter] = useState('citizen');
  const [language, setLanguage] = useState('English');

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-8">
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">File Emergency Report</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Secure incident intake form. Intelligence will be extracted automatically.
        </p>
      </div>

      <div className="space-y-8">
        {/* Reporter Information */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" /> Reporter Information
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {REPORTER_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedReporter(type.id)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  selectedReporter === type.id
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <type.icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Location & Context */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" /> Location
            </label>
            <input 
              type="text" 
              placeholder="Detecting location..." 
              disabled
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" /> Primary Language
            </label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>Mandarin</option>
              <option>Hindi</option>
              <option>Arabic</option>
            </select>
          </div>
        </section>

        <section className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Camera className="w-4 h-4 text-slate-400" /> Attachments
          </label>
          <button className="w-full h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/20 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors">
            <span className="text-sm font-medium">Click to browse or drag and drop photos</span>
            <span className="text-xs mt-1 text-slate-400">Max 50MB</span>
          </button>
        </section>

        {/* Incident Input (Text/Voice + Submit) */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Incident Description</h2>
            <p className="text-sm text-slate-500">Provide details or use Voice Intelligence. Our system will extract key entities.</p>
          </div>
          
          <div className="premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-2 shadow-sm">
            <IncidentInput />
          </div>
        </section>

        {/* Emergency Tips */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-bold">Emergency Reporting Guidelines</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-900/70 dark:text-amber-200/70">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Prioritize exact location</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Note hazardous materials</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Mention trapped individuals</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Identify weapons or threats</li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
