import React, { useState, useMemo } from 'react';

const initialConfig = {
  pasting: { C: 10, H: 15, 'C+H': 8 },
  tapeRemoval: { C: 5, H: 8, 'C+H': 4 },
  edgeBanding: { C: 15, H: 20, 'C+H': 12 },
  trimming: { C: 10, H: 12, 'C+H': 7 },
};
import { useCsvParser } from '../hooks/useCsvParser';
import FileUpload from './FileUpload';
import OperationTable from './OperationTable';
import ConfigurationTable from './ConfigurationTable';

interface Part {
  'Material type': string;
  'Material name': string;
  'Thickness - raw': string;
  'Edge Length 1': string;
  'Edge Length 2': string;
  'Edge Width 1': string;
  'Edge Width 2': string;
}

export default function Phase2() {
  const { data, error, loading, parse } = useCsvParser();
  const [file, setFile] = useState<File | null>(null);
  const [pastingTapeRemovalRole, setPastingTapeRemovalRole] = useState('Carpenter');
  const [config, setConfig] = useState(initialConfig);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      parse(e.target.files[0]);
    }
  };

  const sheetGoods = useMemo(() => {
    return data.filter((row: Part) => row['Material type'] === 'Sheet Goods');
  }, [data]);

  const uniqueMaterials = useMemo(() => {
    const materials = new Map<string, any>();
    sheetGoods.forEach((row: Part) => {
      const key = `${row['Material name']}-${row['Thickness - raw']}`;
      if (!materials.has(key)) {
        materials.set(key, row);
      }
    });
    return Array.from(materials.values());
  }, [sheetGoods]);

  const hardwareCount = useMemo(() => {
    return data.filter((row: Part) => row['Material type'] === 'Hardware').length;
  }, [data]);

  const edgeBandingParts = useMemo(() => {
    return data.filter((row: Part) => {
      return (
        row['Edge Length 1'] ||
        row['Edge Length 2'] ||
        row['Edge Width 1'] ||
        row['Edge Width 2']
      );
    });
  }, [data]);

  return (
    <section id="phase2">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Phase 2: Estimation</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Part List CSV</label>
          <input type="file" accept=".csv" onChange={handleFileChange} className="mt-1" />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {data.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Cutting Diagram Uploads</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {uniqueMaterials.map((material: Part) => (
                <FileUpload
                  key={`${material['Material name']}-${material['Thickness - raw']}`}
                  label={`${material['Material name']} (${material['Thickness - raw']})`}
                />
              ))}
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mb-4">Estimation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Hardware Installation</h4>
                <p>{hardwareCount} items</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Edge Banding & Trimming</h4>
                <p>{edgeBandingParts.length} parts</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold">Pasting & Tape Removal</h4>
                <div className="flex items-center justify-between">
                  <p>{uniqueMaterials.length} sheets</p>
                  <select
                    value={pastingTapeRemovalRole}
                    onChange={(e) => setPastingTapeRemovalRole(e.target.value)}
                    className="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Carpenter</option>
                    <option>Helper</option>
                  </select>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Configuration</h3>
            <ConfigurationTable config={config} setConfig={setConfig} />

            <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Operations</h3>
            <OperationTable data={data} config={config} />

            <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Parts Table (Sheet Goods)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thickness</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sheetGoods.map((row: Part, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{row['Material name']}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row['Thickness - raw']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
