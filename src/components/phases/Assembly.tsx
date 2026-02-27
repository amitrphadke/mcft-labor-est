import React, { useState } from 'react';

interface Operation {
  name: string;
  role: string;
  time: number;
}

export default function Assembly() {
  const [operations, setOperations] = useState<Operation[]>([]);

  const addOperation = () => {
    setOperations([...operations, { name: '', role: 'C+H', time: 0 }]);
  };

  const handleOperationChange = (index: number, field: keyof Operation, value: any) => {
    const newOps = [...operations];
    (newOps[index] as any)[field] = value;
    setOperations(newOps);
  };

  const removeOperation = (index: number) => {
    const newOps = [...operations];
    newOps.splice(index, 1);
    setOperations(newOps);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Assembly</h2>
      <button onClick={addOperation} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Add Operation</button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Time (mins)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {operations.map((op, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={op.name}
                  onChange={(e) => handleOperationChange(index, 'name', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={op.role}
                  onChange={(e) => handleOperationChange(index, 'role', e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>C</option>
                  <option>H</option>
                  <option>C+H</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={op.time}
                  onChange={(e) => handleOperationChange(index, 'time', parseInt(e.target.value, 10))}
                  className="w-20 p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => removeOperation(index)} className="text-red-500">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
