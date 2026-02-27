import React, { useMemo } from 'react';

export default function EdgeBanding({ data }: { data: any[] }) {
  const edgeBandingParts = useMemo(() => {
    return data.filter((row: any) => {
      return (
        row['Edge Length 1'] ||
        row['Edge Length 2'] ||
        row['Edge Width 1'] ||
        row['Edge Width 2']
      );
    });
  }, [data]);

  const pass1Parts = useMemo(() => {
    return edgeBandingParts.filter((row: any) => {
      return (
        (row['Edge Length 1'] && !row['Edge Width 1'] && !row['Edge Width 2']) ||
        (row['Edge Length 2'] && !row['Edge Width 1'] && !row['Edge Width 2']) ||
        (row['Edge Width 1'] && !row['Edge Length 1'] && !row['Edge Length 2']) ||
        (row['Edge Width 2'] && !row['Edge Length 1'] && !row['Edge Length 2'])
      );
    });
  }, [edgeBandingParts]);

  const pass2Parts = useMemo(() => {
    return edgeBandingParts.filter((row: any) => {
      return (
        (row['Edge Length 1'] && row['Edge Width 1']) ||
        (row['Edge Length 1'] && row['Edge Width 2']) ||
        (row['Edge Length 2'] && row['Edge Width 1']) ||
        (row['Edge Length 2'] && row['Edge Width 2'])
      );
    });
  }, [edgeBandingParts]);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edge Banding</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Single Pass Parts</h3>
          <p>{pass1Parts.length} parts</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Double Pass Parts</h3>
          <p>{pass2Parts.length} parts</p>
        </div>
      </div>
    </section>
  );
}
