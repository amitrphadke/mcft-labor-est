import React, { useMemo, useState } from 'react';

const initialOperations = [
  { name: 'Layout edge holes', C: 2, H: 2, 'C+H': 1 },
  { name: 'Layout face holes', C: 3, H: 3, 'C+H': 2 },
  { name: 'Drill edge holes', C: 2, H: 2, 'C+H': 1 },
  { name: 'Drill face holes', C: 3, H: 3, 'C+H': 2 },
];

export default function Minifix({ data }: { data: any[] }) {
  const [operations, setOperations] = useState(initialOperations);

  const minifixCount = useMemo(() => {
    return data.reduce((acc, row) => acc + (parseInt(row.Minifix, 10) || 0), 0);
  }, [data]);

  const handleTimeChange = (index: number, role: string, time: string) => {
    const newOps = [...operations];
    (newOps[index] as any)[role] = parseInt(time, 10);
    setOperations(newOps);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Minifix</h2>
      <p>Total Minifix operations: {minifixCount}</p>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C (mins)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">H (mins)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C+H (mins)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {operations.map((op, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{op.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={op.C}
                  onChange={(e) => handleTimeChange(index, 'C', e.target.value)}
                  className="w-20 p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={op.H}
                  onChange={(e) => handleTimeChange(index, 'H', e.target.value)}
                  className="w-20 p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={op['C+H']}
                  onChange={(e) => handleTimeChange(index, 'C+H', e.target.value)}
                  className="w-20 p-1 border border-gray-300 rounded-md"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
