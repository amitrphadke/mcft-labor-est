import React, { useState, useEffect } from 'react';

const initialOperations = [
  { name: 'Pasting', role: 'C+H', time: 0, startTime: '08:00' },
  { name: 'Tape Removal', role: 'C+H', time: 0, startTime: '08:00' },
  { name: 'Edge Banding - Pass 1', role: 'C+H', time: 0, startTime: '08:00' },
  { name: 'Edge Banding - Pass 2', role: 'C+H', time: 0, startTime: '08:00' },
  { name: 'Trimming', role: 'C+H', time: 0, startTime: '08:00' },
];

export default function OperationTable({ data, config, sheetCount }: { data: any[], config: any, sheetCount?: number }) {
  const [operations, setOperations] = useState(initialOperations);

  useEffect(() => {
    if (data && data.length > 0 && config.pasting) {
      const newOps = JSON.parse(JSON.stringify(initialOperations));

      const edgeBandingParts = data.filter((row: any) => {
        return (
          row['Edge Length 1'] ||
          row['Edge Length 2'] ||
          row['Edge Width 1'] ||
          row['Edge Width 2']
        );
      });

      const pass2Parts = edgeBandingParts.filter((row: any) => {
        return (
          (row['Edge Length 1'] && row['Edge Width 1']) ||
          (row['Edge Length 1'] && row['Edge Width 2']) ||
          (row['Edge Length 2'] && row['Edge Width 1']) ||
          (row['Edge Length 2'] && row['Edge Width 2'])
        );
      });

      newOps[0].time = data.filter((row: any) => row['Material type'] === 'Sheet Goods').length * config.pasting[newOps[0].role];
      newOps[1].time = data.filter((row: any) => row['Material type'] === 'Sheet Goods').length * config.tapeRemoval[newOps[1].role];
      newOps[2].time = edgeBandingParts.length * config.edgeBanding[newOps[2].role];
      newOps[3].time = pass2Parts.length * config.edgeBanding[newOps[3].role];
      newOps[4].time = edgeBandingParts.length * config.trimming[newOps[4].role];

      let cumulativeTime = 0;
      newOps.forEach((op:any, index:number) => {
        const [hours, minutes] = initialOperations[index].startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + cumulativeTime;
        const startHours = Math.floor(totalMinutes / 60);
        const startMinutes = totalMinutes % 60;
        op.startTime = `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}`;
        cumulativeTime += op.time;
      });

      setOperations(newOps);
    } else if (sheetCount && config) {
      const phaseName = Object.keys(config)[0];
      const phaseConfig = config[phaseName];
      const newOps = Object.keys(phaseConfig).map(opName => {
        return {
          name: opName,
          role: 'C+H',
          time: sheetCount * (phaseConfig[opName]['C+H'] || 0),
          startTime: '08:00',
        };
      });

      let cumulativeTime = 0;
      newOps.forEach((op:any) => {
        const totalMinutes = 8 * 60 + cumulativeTime;
        const startHours = Math.floor(totalMinutes / 60);
        const startMinutes = totalMinutes % 60;
        op.startTime = `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}`;
        cumulativeTime += op.time;
      });

      setOperations(newOps);
    }
  }, [data, config, sheetCount]);

  const handleRoleChange = (index: number, role: string) => {
    const newOps = [...operations];
    newOps[index].role = role;
    setOperations(newOps);
  };

  const handleTimeChange = (index: number, time: string) => {
    const newOps = [...operations];
    newOps[index].time = parseInt(time, 10);
    setOperations(newOps);
  };

  const calculateEndTime = (startTime: string, duration: number) => {
    if(!startTime) return ''
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const totalTime = operations.reduce((acc, op) => acc + op.time, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Time (mins)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {operations.map((op, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{op.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={op.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
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
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  className="w-20 p-1 border border-gray-300 rounded-md"
                  disabled={op.role === 'C' || op.role === 'H'}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{op.startTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{calculateEndTime(op.startTime, op.time)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-right font-semibold">Total Estimated Time:</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold">{totalTime} mins</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
