import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const logs = [
  { id: 1, actor: 'Admin (Priya S.)', action: 'Verified donor', target: 'Karthik Iyer', time: '2026-08-21 09:12', tone: 'teal' as const },
  { id: 2, actor: 'Admin (Priya S.)', action: 'Blocked user', target: 'Rahul Sharma', time: '2026-08-20 17:40', tone: 'crimson' as const },
  { id: 3, actor: 'System', action: 'Auto-expired request', target: 'Request #r-098', time: '2026-08-20 06:00', tone: 'gray' as const },
  { id: 4, actor: 'Admin (Arvind K.)', action: 'Approved blood request', target: 'Request #r-002', time: '2026-08-19 14:22', tone: 'green' as const },
  { id: 5, actor: 'Admin (Priya S.)', action: 'Updated platform settings', target: 'Search radius default', time: '2026-08-18 11:05', tone: 'ink' as const },
  { id: 6, actor: 'System', action: 'Sent emergency broadcast', target: 'O- request near Porur', time: '2026-08-17 20:31', tone: 'crimson' as const },
];

export default function AdminAuditLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Audit Logs</h1>
        <p className="mt-1 text-sm text-ink-500">A record of administrative and system actions.</p>
      </div>

      <Card padding="none" className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wide text-ink-500">
            <tr>
              <th className="px-5 py-3 font-medium">Actor</th>
              <th className="px-5 py-3 font-medium">Action</th>
              <th className="px-5 py-3 font-medium">Target</th>
              <th className="px-5 py-3 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-mist/50">
                <td className="px-5 py-3 text-ink-900">{log.actor}</td>
                <td className="px-5 py-3">
                  <Badge tone={log.tone}>{log.action}</Badge>
                </td>
                <td className="px-5 py-3 text-ink-500">{log.target}</td>
                <td className="px-5 py-3 font-mono text-xs text-ink-300">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
