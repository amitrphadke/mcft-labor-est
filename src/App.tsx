/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Carpentry Labor Estimator</h1>
      </header>
      <main>
        <Phase1 />
        <hr className="my-12" />
        <Phase2 />
      </main>
    </div>
  );
}
