import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import ConfigurationTable from '../ConfigurationTable';
import OperationTable from '../OperationTable';

const initialConfig = {
  tapeRemoval: {
    'Pull the plywood sheet from drying rack': { C: 2, H: 2, 'C+H': 1 },
    'Remove abro tapes from on its sides': { C: 10, H: 10, 'C+H': 5 },
    'Put Sheet back on rack': { C: 2, H: 2, 'C+H': 1 },
  },
};

export default function TapeRemoval() {
  const [config, setConfig] = useState(initialConfig);
  const [sheetCount, setSheetCount] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFile(event.target.files[0]);
    }
  };

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    let count = 0;
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfjs.getDocument(URL.createObjectURL(pdfFile!)).promise.then(pdf => pdf.getPage(i));
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item: any) => item.str).join(' ');
      const match = text.match(/Standard Panel \d+ \/ (\d+)/);
      if (match) {
        count = Math.max(count, parseInt(match[1], 10));
      }
    }
    setSheetCount(count);
  };
  // TODO: Get sheet count from cutting diagram PDF
  

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tape Removal</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Configuration</h3>
        <ConfigurationTable config={config} setConfig={setConfig} />
        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Operations</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Cutting Diagram PDF</label>
          <input type="file" accept=".pdf" onChange={onFileChange} className="mt-1" />
        </div>
        {pdfFile && (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(sheetCount), (el, index) => (
              <div key={`page_${index + 1}`}>
                <Page pageNumber={index + 1} />
              </div>
            ))}
          </Document>
        )}
        <p>Sheet Count: {sheetCount}</p>
        <OperationTable data={[]} config={config} sheetCount={sheetCount} />
      </div>
    </section>
  );
}
