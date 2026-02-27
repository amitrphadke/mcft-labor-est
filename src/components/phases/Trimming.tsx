import React, { useMemo } from 'react';

export default function Trimming({ data }: { data: any[] }) {
  const trimmingParts = useMemo(() => {
    return data.filter((row: any) => {
      return (
        row['Edge Length 1'] ||
        row['Edge Length 2'] ||
        row['Edge Width 1'] ||
        row['Edge Width 2']
      );
    });
  }, [data]);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trimming</h2>
      <p>{trimmingParts.length} parts require trimming.</p>
    </section>
  );
}
