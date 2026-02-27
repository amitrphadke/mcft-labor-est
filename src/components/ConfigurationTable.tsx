import React from 'react';

export default function ConfigurationTable({ config, setConfig }: { config: any, setConfig: any }) {
  const handleChange = (op: string, role: string, value: string) => {
    const newConfig = { ...config };
    (newConfig as any)[op][role] = parseInt(value, 10);
    setConfig(newConfig);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C (mins)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">H (mins)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C+H (mins)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(config).map(([op, roles]: [string, any]) => (
            <tr key={op}>
              <td className="px-6 py-4 whitespace-nowrap">{op}</td>
              {Object.entries(roles).map(([role, time]: [string, any]) => (
                <td key={role} className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => handleChange(op, role, e.target.value)}
                    className="w-20 p-1 border border-gray-300 rounded-md"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
