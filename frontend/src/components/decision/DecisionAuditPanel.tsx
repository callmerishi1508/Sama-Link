import { useDecisionStore } from "@/stores/decision-store";

export function DecisionAuditPanel() {
  const auditLogs = useDecisionStore(state => state.auditLogs);

  if (auditLogs.length === 0) return null;

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 rounded-3xl p-6 border-2 border-slate-200/60 dark:border-slate-800/60 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Decision Audit Log</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Operator</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Reason / Details</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {auditLogs.map(log => (
              <tr key={log.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  {log.operator}
                </td>
                <td className="py-3 px-4 font-medium text-indigo-600 dark:text-indigo-400">
                  {log.action}
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  {log.reason || log.details || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
