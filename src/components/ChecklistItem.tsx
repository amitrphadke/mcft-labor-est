import React, { useState } from 'react';

interface ChecklistItemProps {
  question: string;
  details: string;
}

export default function ChecklistItem({ question, details, ...props }: ChecklistItemProps & { [key: string]: any }) {
  const [answer, setAnswer] = useState('no');

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800">{question}</h4>
      <p className="text-sm text-gray-600 mb-2">{details}</p>
      <div className="flex items-center space-x-4">
        <div>
          <input
            type="radio"
            id={`${question}-yes`}
            name={question}
            value="yes"
            checked={answer === 'yes'}
            onChange={() => setAnswer('yes')}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor={`${question}-yes`} className="ml-2 text-sm font-medium text-gray-700">
            Yes
          </label>
        </div>
        <div>
          <input
            type="radio"
            id={`${question}-no`}
            name={question}
            value="no"
            checked={answer === 'no'}
            onChange={() => setAnswer('no')}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor={`${question}-no`} className="ml-2 text-sm font-medium text-gray-700">
            No
          </label>
        </div>
      </div>
      {answer === 'no' && (
        <div className="mt-2">
          <textarea
            rows={2}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Comments..."
          />
        </div>
      )}
    </div>
  );
}
