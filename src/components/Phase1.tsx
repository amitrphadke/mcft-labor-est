import React from 'react';
import FileUpload from './FileUpload';
import ChecklistItem from './ChecklistItem';

const checklistItems = [
  {
    question: 'Diagram readability on 10 inch tablet.',
    details: 'Does all views clear from PDF provided? Dimensions lines clear? Dimensions Readable?',
  },
  {
    question: 'Article space fitment.',
    details: 'Whether the article fits in given area.?',
  },
  {
    question: 'Construction Readiness.',
    details: 'Are all expected measurements available on design when carpenter start building?',
  },
  {
    question: 'Numerical Correctness.',
    details: 'Does parts list delivered matches with the design dimensions?',
  },
  { question: 'Look', details: 'Are parts drawn is in normal proportion?' },
  { question: 'Stability', details: 'Is thickness or width good for strength?' },
  {
    question: 'Construction viability',
    details: 'Can the back used for Caracas will hold the screw? Are doors designed fair in length and width and thickness?',
  },
];

export default function Phase1() {
  return (
    <section id="phase1">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Phase 1: Design Review and Sign Off</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <FileUpload label="7 views of the article" />
          <FileUpload label="Master part list in PDF format" />
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Review Checklist</h3>
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <ChecklistItem key={item.question} question={item.question} details={item.details} />
          ))}
        </div>

        <div className="mt-6">
          <label htmlFor="misc-comments" className="block text-sm font-medium text-gray-700">
            Miscellaneous Comments
          </label>
          <textarea
            id="misc-comments"
            rows={4}
            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Any other comments..."
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Off
          </button>
        </div>
      </div>
    </section>
  );
}
