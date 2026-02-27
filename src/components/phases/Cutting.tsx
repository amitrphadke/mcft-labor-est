import React, { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function Cutting({ data }: { data: any[] }) {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const uniqueMaterials = useMemo(() => {
    const materials = new Map<string, any>();
    data.forEach((row: any) => {
      if (row['Material type'] === 'Sheet Goods') {
        const key = `${row['Material name']}-${row['Thickness - raw']}`;
        if (!materials.has(key)) {
          materials.set(key, row);
        }
      }
    });
    return Array.from(materials.values());
  }, [data]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFile(event.target.files[0]);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cutting</h2>
      <div className="flex">
        <aside className="w-64 bg-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-2">Materials</h3>
          <ul>
            {uniqueMaterials.map((material: any) => (
              <li key={material.key} className="mb-2">
                <button
                  onClick={() => setSelectedMaterial(material.key)}
                  className={`w-full text-left p-2 rounded-md ${selectedMaterial === material.key ? 'bg-gray-300' : 'hover:bg-gray-300'}`}>
                  {material['Material name']} ({material['Thickness - raw']})
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-8">
          {selectedMaterial && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{selectedMaterial}</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Cutting Diagram PDF</label>
                <input type="file" accept=".pdf" onChange={onFileChange} className="mt-1" />
              </div>
              {pdfFile && (
                <Document file={pdfFile}>
                  <Page pageNumber={1} />
                </Document>
              )}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
