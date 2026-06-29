import { create } from 'zustand';

export type DecisionLifecycleState = 
  | 'AI_RECOMMENDATION' 
  | 'UNDER_REVIEW' 
  | 'MODIFIED' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'ESCALATED' 
  | 'RESOURCES_CONFIRMED' 
  | 'DISPATCH_AUTHORIZED' 
  | 'INCIDENT_ACTIVE' 
  | 'CLOSED';

export type ActivePanel = 'NONE' | 'MODIFY' | 'ESCALATE' | 'REQUEST_INFO' | 'ASSIGN';

export interface AuditLog {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  reason?: string;
  details?: string;
}

export interface DecisionChecklist {
  riskReviewed: boolean;
  resourcesVerified: boolean;
  stakeholdersNotified: boolean;
  humanApproved: boolean;
  dispatchReady: boolean;
}

interface DecisionStore {
  lifecycleState: DecisionLifecycleState;
  activePanel: ActivePanel;
  operator: string;
  checklist: DecisionChecklist;
  auditLogs: AuditLog[];
  finalPlan: Record<string, unknown> | null; // Stores modified/final plan

  // Actions
  setLifecycleState: (state: DecisionLifecycleState) => void;
  setActivePanel: (panel: ActivePanel) => void;
  toggleChecklist: (key: keyof DecisionChecklist) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp' | 'operator'>) => void;
  setFinalPlan: (plan: Record<string, unknown>) => void;
  reset: () => void;
}

const initialState = {
  lifecycleState: 'AI_RECOMMENDATION' as DecisionLifecycleState,
  activePanel: 'NONE' as ActivePanel,
  operator: 'Op-Lead-42',
  checklist: {
    riskReviewed: false,
    resourcesVerified: false,
    stakeholdersNotified: false,
    humanApproved: false,
    dispatchReady: false,
  },
  auditLogs: [],
  finalPlan: null,
};

export const useDecisionStore = create<DecisionStore>((set, get) => ({
  ...initialState,

  setLifecycleState: (state) => set({ lifecycleState: state }),
  
  setActivePanel: (panel) => set({ activePanel: panel }),
  
  toggleChecklist: (key) => set((state) => ({
    checklist: {
      ...state.checklist,
      [key]: !state.checklist[key]
    }
  })),

  addAuditLog: (log) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      operator: get().operator,
      ...log
    };
    set((state) => ({
      auditLogs: [...state.auditLogs, newLog]
    }));
  },

  setFinalPlan: (plan) => set({ finalPlan: plan }),

  reset: () => set(initialState),
}));
