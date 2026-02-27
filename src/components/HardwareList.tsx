import React from 'react';

export default function HardwareList({ data }: { data: any[] }) {
  const hardware = data.filter((row) => row['Material type'] === 'Hardware');

  return (
    <div className="overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Hardware List</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {hardware.map((row: any, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{row.Designation}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.Quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-right font-semibold">Total Items:</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold">
              {hardware.reduce((acc, row) => acc + parseInt(row.Quantity, 10), 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
