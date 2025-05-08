import React from 'react';
import QualificationModel from './components/QualificationModel';
import './index.css';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Southern Region Qualification Attainment Model</h1>
          <p className="text-sm md:text-base mt-2">Interactive visualization of qualification needs (2024-2050)</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <QualificationModel />
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-300 mt-10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">&copy; 2025 Southern Region Workforce Development</p>
              <p className="text-sm text-gray-500 mt-1">Data sources: VIF2023 Projections, VSP Data 2024-2034</p>
            </div>
            <div className="flex space-x-6">
              <a href="#accessibility" className="text-blue-600 hover:text-blue-800">Accessibility</a>
              <a href="#data" className="text-blue-600 hover:text-blue-800">Data Sources</a>
              <a href="#contact" className="text-blue-600 hover:text-blue-800">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
