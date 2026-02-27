import React from 'react';

const phases = [
  'Documentation & Setup',
  'Part List & Cutting Diagram',
  'Pasting',
  'Tape Removal',
  'Cutting',
  'Edge Banding',
  'Trimming',
  'Minifix',
  'Assembly',
  'Disassembly & Packing',
  'Loading/Shipping/Unloading',
  'Site Assembly & Installation',
];

export default function Sidebar({ activePhase, setActivePhase }: { activePhase: string, setActivePhase: (phase: string) => void }) {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          {phases.map((phase) => (
            <li key={phase} className="mb-2">
              <button
                onClick={() => setActivePhase(phase)}
                className={`w-full text-left p-2 rounded-md ${activePhase === phase ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                {phase}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
