import { UserCheck, CornerUpRight, AlertCircle, FileText, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  requiresConfirmation: boolean;
}

export function ApprovalCenterCard({ requiresConfirmation }: Props) {
  return (
    <div className={`premium-card bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden border-2 transition-colors duration-500 ${requiresConfirmation ? 'border-amber-400 dark:border-amber-500/50' : 'border-slate-200/60 dark:border-slate-800/60'}`}>
      
      {requiresConfirmation && (
        <div className="absolute top-0 right-0 p-4">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${requiresConfirmation ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Approval Center</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Human-in-the-loop decision</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Decision Context */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Assigned Officer</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Op-Lead-42</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Timestamp</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Operator Notes</label>
          <textarea 
            placeholder="Add justification or context before approving..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none min-h-[80px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="md:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-bold h-12 shadow-sm hover:shadow-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
            Approve Action
          </Button>
          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-900/50 dark:text-rose-400 dark:hover:bg-rose-500/10 rounded-xl gap-2 font-bold h-12">
            <XCircle className="w-4 h-4" /> Reject
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 font-bold h-12">
            <AlertCircle className="w-4 h-4" /> Escalate
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 font-bold h-12 md:col-span-2">
            <CornerUpRight className="w-4 h-4" /> Forward / Assign
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 font-bold h-12 md:col-span-2">
            <FileText className="w-4 h-4" /> Modify Resources
          </Button>
        </div>
      </div>
    </div>
  );
}
