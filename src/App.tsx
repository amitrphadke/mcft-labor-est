/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCsvParser } from './hooks/useCsvParser';
import Sidebar from './components/Sidebar';
import Phase1 from './components/phases/Phase1';
import Phase2 from './components/phases/Phase2';
import Pasting from './components/phases/Pasting';
import TapeRemoval from './components/phases/TapeRemoval';
import Cutting from './components/phases/Cutting';
import EdgeBanding from './components/phases/EdgeBanding';
import Trimming from './components/phases/Trimming';
import Minifix from './components/phases/Minifix';
import Assembly from './components/phases/Assembly';
import Disassembly from './components/phases/Disassembly';
import Shipping from './components/phases/Shipping';
import Installation from './components/phases/Installation';

const phases: { [key: string]: React.ComponentType } = {
  'Documentation & Setup': Phase1,
  'Part List & Cutting Diagram': Phase2,
  Pasting,
  'Tape Removal': TapeRemoval,
  Cutting,
  'Edge Banding': EdgeBanding,
  Trimming,
  Minifix,
  Assembly,
  'Disassembly & Packing': Disassembly,
  'Loading/Shipping/Unloading': Shipping,
  'Site Assembly & Installation': Installation,
};

export default function App() {
  const [activePhase, setActivePhase] = useState('Documentation & Setup');
  const { data, error, loading, parse } = useCsvParser();

  const ActiveComponent = phases[activePhase];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePhase={activePhase} setActivePhase={setActivePhase} />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Carpentry Labor Estimator</h1>
        </header>
        <ActiveComponent {...{ data, error, loading, parse }} />
      </main>
    </div>
  );
}
