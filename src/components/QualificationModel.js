import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, ComposedChart, Area, PieChart, Pie, Cell
} from 'recharts';

const QualificationModel = () => {
  const [activeTab, setActiveTab] = useState('summary');

  // Population data - Scaled based on Southern Region proportions
  const years = [2021, 2026, 2031, 2036, 2041, 2046, 2051];
  const populationData = years.map((year, index) => ({
    year,
    totalPopulation: [280000, 304000, 329000, 354000, 380000, 407000, 435000][index],
    workingAgePopulation: [159600, 173280, 187530, 201780, 216600, 232000, 247950][index],
  }));

  // Model projection data for qualification needs
  const modelYears = [2024, 2026, 2031, 2035, 2041, 2046, 2050, 2051];
  const qualificationData = modelYears.map((year, index) => ({
    year,
    qualifiedWorkersNeeded: [72000, 76800, 88000, 98500, 116000, 132000, 145000, 148000][index],
    cumulativeQualifications: [0, 4800, 16000, 26500, 44000, 60000, 73000, 76000][index],
    qualificationRate: [0.55, 0.57, 0.61, 0.65, 0.71, 0.75, 0.79, 0.80][index],
    estimatedEmployment: [130909, 134700, 144200, 151500, 163400, 176000, 183500, 185000][index]
  }));

  // Workforce dynamics
  const workforceData = [2026, 2031, 2036, 2041, 2046, 2051].map((year, index) => ({
    year,
    entrants: [18000, 19000, 20500, 22000, 23000, 23500][index],
    exits: [4500, 4900, 5300, 5700, 6200, 6500][index],
    netChange: [13500, 14100, 15200, 16300, 16800, 17000][index]
  }));

  // VSP Top 10 Industries data for Southern Region
  const topIndustriesData = [
    { name: 'Health Care & Social Assistance', value: 15000, fill: '#8884d8', growth: 8000, retirements: 7000 },
    { name: 'Construction', value: 6500, fill: '#83a6ed', growth: 3000, retirements: 3500 },
    { name: 'Education & Training', value: 5300, fill: '#8dd1e1', growth: 2100, retirements: 3200 },
    { name: 'Retail Trade', value: 3800, fill: '#82ca9d', growth: 1400, retirements: 2400 },
    { name: 'Accommodation & Food Services', value: 3200, fill: '#a4de6c', growth: 1300, retirements: 1900 },
    { name: 'Professional Services', value: 2900, fill: '#ffc658', growth: 1500, retirements: 1400 },
    { name: 'Public Administration', value: 2500, fill: '#f28cb1', growth: 800, retirements: 1700 },
    { name: 'Transport & Warehousing', value: 2200, fill: '#b5a8f9', growth: 700, retirements: 1500 },
    { name: 'Manufacturing', value: 1800, fill: '#ffb347', growth: -200, retirements: 2000 },
    { name: 'Agriculture, Forestry & Fishing', value: 1600, fill: '#d0ed57', growth: 100, retirements: 1500 }
  ];

  // VSP Top 10 Occupations data for Southern Region
  const topOccupationsData = [
    { name: 'Aged & Disabled Carers', value: 2600, fill: '#8884d8', growth: 950, retirements: 1650 },
    { name: 'Registered Nurses', value: 2300, fill: '#8dd1e1', growth: 1100, retirements: 1200 },
    { name: 'Sales Assistants', value: 2200, fill: '#83a6ed', growth: 1000, retirements: 1200 },
    { name: 'Primary School Teachers', value: 1400, fill: '#a4de6c', growth: 700, retirements: 700 },
    { name: 'Commercial Cleaners', value: 1100, fill: '#d0ed57', growth: 250, retirements: 850 },
    { name: 'General Clerks', value: 1050, fill: '#82ca9d', growth: 300, retirements: 750 },
    { name: 'Secondary School Teachers', value: 1000, fill: '#f28cb1', growth: 450, retirements: 550 },
    { name: 'Receptionists', value: 980, fill: '#ffc658', growth: 450, retirements: 530 },
    { name: 'Truck Drivers', value: 920, fill: '#b5a8f9', growth: 270, retirements: 650 },
    { name: 'Child Carers', value: 850, fill: '#ffb347', growth: 500, retirements: 350 }
  ];
  
  // Gap analysis for 2035
  const gapData = [
    { name: 'Population Growth Can Provide', value: 21000 },
    { name: 'Migration Required', value: 5500 }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  // Qualification ramp-up needs (with 3-year education lag)
  const rampUpData = [2024, 2027, 2030, 2035, 2040, 2045, 2050].map((year, index) => ({
    year,
    annualQualificationsNeeded: [0, 2400, 2400, 2650, 2950, 3300, 2100][index]
  }));

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md">
          <p className="font-bold">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for industry breakdown
  const IndustryTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md">
          <p className="font-bold">{data.name}</p>
          <p>{`Total new workers needed: ${data.value.toLocaleString()}`}</p>
          <p>{`From growth: ${data.growth.toLocaleString()}`}</p>
          <p>{`From retirements: ${data.retirements.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for workforce flow
  const WorkforceTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md">
          <p className="font-bold">{`Total workers 2024-2034: ${(label === "Working Age Population" ? "130,909" : "")}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="qualification-model-container" className="bg-white text-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Southern Region Higher Education Growth Partnership (2024-2050)</h1>
        <div className="flex space-x-2">
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download CSV
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex border-b overflow-x-auto">
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('summary')}
          >
            Executive Summary
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'population' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('population')}
          >
            Population
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'qualifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('qualifications')}
          >
            Qualification Needs
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'attainment-gap' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('attainment-gap')}
          >
            Closing Attainment Gap
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'university-goal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('university-goal')}
          >
            University Qualification Goal
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'vsp-industries' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('vsp-industries')}
          >
            Top Industries (VSP)
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'vsp-occupations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('vsp-occupations')}
          >
            Top Occupations (VSP)
          </button>
          <button 
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'rampup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('rampup')}
          >
            Implementation Plan
          </button>
        </div>

        {activeTab === 'summary' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
            <div className="p-4 bg-orange-100 border-l-4 border-orange-500 mb-6">
              <h3 className="text-xl font-bold mb-2">Partnership Vision</h3>
              <p className="mb-3">
                A structured legislative model and coordinated government support will ensure this partnership delivers long-term community outcomes by investing in priority higher education infrastructure and programs to establish a network of education hubs across the Southern Region, creating education-to-job pipelines for advanced manufacturing, public infrastructure, health, education, new technology and defence sectors.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Key Findings: Higher Education Attainment</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current university qualification rate (25-35 cohort):</span> 25%</li>
                <li><span className="font-bold">Target university qualification rate (2050):</span> 55% of 25-35 age cohort</li>
                <li><span className="font-bold">University qualification gap:</span> 30 percentage points below target</li>
                <li><span className="font-bold">Currently university-qualified young adults:</span> 7,100 (of 28,400 in this age group)</li>
                <li><span className="font-bold">Target university-qualified young adults (2050):</span> 22,900 (of 41,700 projected)</li>
                <li><span className="font-bold">NEW university qualifications needed by 2050:</span> 15,800</li>
                <li><span className="font-bold">Annual NEW university qualifications required:</span> 608 per year (average)</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Overall Post-Secondary Qualification Targets</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current qualification rate (2024):</span> 55% post-secondary attainment (25% higher education, 30% VET)</li>
                <li><span className="font-bold">Target qualification rate (2050):</span> 80% post-secondary attainment</li>
                <li><span className="font-bold">Total qualifications needed by 2050:</span> 76,000 new qualifications</li>
                <li><span className="font-bold">Qualifications to close existing gap:</span> 30,400 qualifications (40% of total need)</li>
                <li><span className="font-bold">Qualifications for new workforce entrants:</span> 45,600 qualifications (60% of total need)</li>
                <li><span className="font-bold">Annual qualification production needed by 2045:</span> 3,300 per year</li>
                <li><span className="font-bold">2035 milestone target:</span> 26,500 new qualifications (10,600 for existing gap, 15,900 for new entrants)</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Priority Investments (2025-2028)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                <h4 className="text-lg font-bold mb-2">Mixed-Purpose STEM and Science Laboratories ($30M)</h4>
                <p className="mb-3">Expanding engineering education, supporting TAFE and local secondary schools, and creating a technology precinct for industry collaboration in the region.</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Will support increased university qualification attainment in STEM fields</li>
                  <li>Aligns with engineering pathways for major infrastructure projects</li>
                  <li>Public-private partnership with advanced manufacturing firms</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                <h4 className="text-lg font-bold mb-2">Advanced Technology and Design Education Hub ($5M)</h4>
                <p className="mb-3">Increasing post-secondary STEM attainment across diverse and rapidly growing communities through innovative, place-based education.</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Will address attainment gap in technology qualifications</li>
                  <li>Supports innovation and knowledge-based job creation</li>
                  <li>Enables diverse participation in high-growth technology sectors</li>
                </ul>
              </div>
<div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
                <h4 className="text-lg font-bold mb-2">Applied AI Training Centre ($5M)</h4>
                <p className="mb-3">Delivering AI-focused education and workforce programs in collaboration with local TAFEs and industry to support technology-related sectors.</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Addresses emerging high-demand field with significant job creation</li>
                  <li>Enables application of AI technologies across various sectors</li>
                  <li>Supports development of cyber security and IT workforce capabilities</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
                <h4 className="text-lg font-bold mb-2">Student Health Service Training Centre ($8M)</h4>
                <p className="mb-3">Addressing allied health workforce shortages and expanding training delivery in the region.</p>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Supports highest demand sector with 15,000 new workers needed</li>
                  <li>Enables local qualification and employment pathways</li>
                  <li>Addresses critical population health workforce needs</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Partnership Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Partnership Component</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Establish High Growth Community Partnership with legislative backing</li>
                  <li>Create governance structure with industry, education and government representation</li>
                  <li>Align CSP and Free TAFE places with regional workforce demand</li>
                  <li>Prioritize engineering, health, and technology-driven industries</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Industry Co-delivery Component</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>National Paid Placement Fund investment</li>
                  <li>Tax incentives for employer-sponsored training</li>
                  <li>Regional Priority Skills Student Visa</li>
                  <li>Undergraduate diplomas and vocational bachelor programs</li>
                  <li>Industry placements in government-backed projects</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Skills Infrastructure Component</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Mixed-Purpose STEM and Science Laboratories</li>
                  <li>Advanced Technology and Design Education Hub</li>
                  <li>Applied AI Training Centre</li>
                  <li>Student Health Service Training Centre</li>
                  <li>Additional investments in access programs</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Future Phased Investments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Asia Pacific Renewable Energy Training Centre ($5M)</h4>
                <p className="text-sm mb-2">Supporting hydrogen application workforce training for domestic use, micro-energy systems, and logistics.</p>
                <ul className="list-disc ml-6 space-y-1 text-xs">
                  <li>Supports decarbonization of the road logistics sector</li>
                  <li>Develops workforce for emerging clean energy industries</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Co-operative Placement and Innovation Hub ($3M)</h4>
                <p className="text-sm mb-2">Embedding students in critical business precincts to support industry growth and workforce integration.</p>
                <ul className="list-disc ml-6 space-y-1 text-xs">
                  <li>Increases workplace learning in high-growth sectors</li>
                  <li>Connects students with potential employers</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Scholarships for Local Participation ($3M)</h4>
                <p className="text-sm mb-2">Supporting 150 students from low SES backgrounds, women, and culturally diverse communities.</p>
                <ul className="list-disc ml-6 space-y-1 text-xs">
                  <li>Focuses on high-growth fields of technology</li>
                  <li>Provides pathways through undergraduate diplomas or bachelor's degrees</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-3">2035 University Qualification Gap Analysis</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Local Growth Can Provide', value: 4200 },
                      { name: 'Migration & Additional Programs Required', value: 1169 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#0088FE" />
                    <Cell fill="#FF8042" />
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Implementation Timeline</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">Phase</th>
                    <th className="py-2 px-4 border-b">Timeline</th>
                    <th className="py-2 px-4 border-b">University Qualification Target</th>
                    <th className="py-2 px-4 border-b">Priority Investments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Phase 1</td>
                    <td className="py-2 px-4 border-b">2025-2028</td>
                    <td className="py-2 px-4 border-b">Infrastructure development and program design</td>
                    <td className="py-2 px-4 border-b">STEM Laboratories, AI Training Centre, Health Training Centre, Tech Hub</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">Phase 2</td>
                    <td className="py-2 px-4 border-b">2029-2035</td>
                    <td className="py-2 px-4 border-b">37% attainment in 25-35 age cohort (488 per year)</td>
                    <td className="py-2 px-4 border-b">Renewable Energy Centre, Co-op Innovation Hub, Scholarship Programs</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Phase 3</td>
                    <td className="py-2 px-4 border-b">2036-2045</td>
                    <td className="py-2 px-4 border-b">45% attainment in 25-35 age cohort (600 per year)</td>
                    <td className="py-2 px-4 border-b">Continued expansion of education hubs and industry partnerships</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4 border-b">Phase 4</td>
                    <td className="py-2 px-4 border-b">2046-2050</td>
                    <td className="py-2 px-4 border-b">55% attainment in 25-35 age cohort (702 per year)</td>
                    <td className="py-2 px-4 border-b">Sustainability and excellence initiatives</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-blue-100 border-l-4 border-blue-500 mb-6">
              <h3 className="text-lg font-bold mb-2">Public–Private Partnership Opportunity</h3>
              <p className="mb-2">
                A partnership offers the opportunity to support public investments with industry co-investment. For example, the development of the STEM laboratories could involve partnership with major infrastructure project contractors or advanced manufacturing firms. Similarly, the Applied AI Training Centre and Advanced Technology Hub could be delivered with support from technology or AI-focused employers in the region.
              </p>
              <p>
                With transformative infrastructure projects and one of the fastest-growing advanced manufacturing sectors in the region, there is potential to become a hub for innovation and knowledge-based jobs. The region aspires to unlock 22,000 knowledge-worker roles for local residents through these strategic investments in higher education.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'population' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Population Projections</h2>
            
            <h3 className="text-xl font-bold mb-3">Southern Region Population (2021-2051)</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Line type="monotone" dataKey="totalPopulation" stroke="#8884d8" name="Total Population" strokeWidth={2} />
                  <Line type="monotone" dataKey="workingAgePopulation" stroke="#82ca9d" name="Working Age Population (15-60)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Working Age Population Dynamics</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workforceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="entrants" fill="#8884d8" name="New Entrants" />
                  <Bar dataKey="exits" fill="#FF8042" name="Exits (Retirements etc.)" />
                  <Bar dataKey="netChange" fill="#82ca9d" name="Net Change" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Population Analysis</h3>
              <p>The Southern Region is projected to grow from 280,000 residents in 2021 to 435,000 by 2051, representing a 55% increase over 30 years. The working age population (ages 15-60) will increase from 159,600 to 247,950 during this period, maintaining a relatively stable proportion of the total population at approximately 57%.</p>
              <p className="mt-2">According to the Victorian Skills Plan data, from 2024 to 2034, the Southern Region will need 49,708 new workers, with 18,700 coming from employment growth and 31,008 from retirements. This workforce growth will require significant investment in post-secondary qualification pathways, particularly in higher education attainment.</p>
              <p className="mt-2">Many in the region's diverse migrant communities also hold prior skills or qualifications but need accessible, supported pathways to translate them into recognized credentials to participate in the region's growth.</p>
            </div>
          </div>
        )}

        {activeTab === 'qualifications' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Qualification Needs</h2>
            
            <h3 className="text-xl font-bold mb-3">Projected Qualification Requirements</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={qualificationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="qualifiedWorkersNeeded" fill="#8884d8" name="Qualified Workers Needed" />
                  <Line yAxisId="left" type="monotone" dataKey="estimatedEmployment" stroke="#FF8042" name="Total Employment" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="qualificationRate" stroke="#82ca9d" name="Qualification Rate" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Cumulative New Qualifications Needed</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualificationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Line type="monotone" dataKey="cumulativeQualifications" stroke="#8884d8" fill="#8884d8" name="Cumulative New Qualifications" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeTab === 'university-goal' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">University Qualification Sub-Goal (25-35 Age Cohort)</h2>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">University Attainment Overview</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current university qualification rate (25-35 cohort):</span> 25%</li>
                <li><span className="font-bold">Target university qualification rate (2050):</span> 55% of 25-35 age cohort</li>
                <li><span className="font-bold">Currently university-qualified young adults:</span> 7,100 (of 28,400 in this age group)</li>
                <li><span className="font-bold">Target university-qualified young adults (2050):</span> 22,900 (of 41,700 projected)</li>
                <li><span className="font-bold">NEW university qualifications needed by 2050:</span> 15,800 (additional to existing)</li>
                <li><span className="font-bold">To close existing university attainment gap:</span> 8,500 new university qualifications</li>
                <li><span className="font-bold">For future workforce entrants:</span> 7,300 new university qualifications</li>
                <li><span className="font-bold">Annual NEW university qualifications required:</span> 608 per year (average)</li>
                <li><span className="font-bold">First phase (to 2035):</span> 486 NEW university qualifications per year</li>
                <li><span className="font-bold">Second phase (2035-2050):</span> 702 NEW university qualifications per year</li>
              </ul>
            </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Current vs. Target University Attainment</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: 'Current (2024)', value: 25 },
                        { category: 'Target (2050)', value: 55 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="value" name="University Qualification Rate (%)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">Qualification Mix Evolution</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { year: '2024', university: 25, vet: 30, noQual: 45 },
                        { year: '2035', university: 37, vet: 28, noQual: 35 },
                        { year: '2050', university: 55, vet: 25, noQual: 20 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="university" name="University Qualification" stackId="a" fill="#8884d8" />
                      <Bar dataKey="vet" name="VET Qualification" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="noQual" name="No Post-Secondary Qual" stackId="a" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Required Infrastructure to Support University Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                <h4 className="font-bold text-lg mb-2 text-blue-800">Mixed-Purpose STEM and Science Laboratories ($30M)</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Expanding engineering education, supporting TAFE and local secondary schools</li>
                  <li>Creates technology precinct for industry collaboration</li>
                  <li>Will generate approximately 180 university graduates annually</li>
                  <li>Focus on engineering pathways for major infrastructure projects</li>
                  <li>Public-private partnership opportunity with manufacturing firms</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                <h4 className="font-bold text-lg mb-2 text-green-800">Advanced Technology Hub and AI Training Centre ($10M)</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Combined will generate approximately 150 university graduates annually</li>
                  <li>Focuses on emerging technologies including applied AI</li>
                  <li>Supports diverse communities with accessible education pathways</li>
                  <li>Collaboration with industry partners in technology sectors</li>
                  <li>Articulation pathways from vocational to higher education</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attainment-gap' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Closing the Attainment Gap</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Attainment Gap Overview</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><span className="font-bold">Current qualification rate (2024):</span> 55% post-secondary attainment</li>
                <li><span className="font-bold">Target qualification rate (2050):</span> 80% post-secondary attainment</li>
                <li><span className="font-bold">Current attainment gap:</span> 25 percentage points</li>
                <li><span className="font-bold">Working age population (2024):</span> 167,000 people</li>
                <li><span className="font-bold">Currently qualified workers:</span> 91,850 (55% of working age population)</li>
                <li><span className="font-bold">Target qualified workers:</span> 133,600 (80% of working age population)</li>
                <li><span className="font-bold">Workers needing qualifications to close gap:</span> 41,750</li>
                <li><span className="font-bold">Sub-goal for age 25-35 cohort:</span> 55% university qualifications by 2050</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Closing the Gap: Existing vs. New Workers</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: '2035 Need', existingWorkers: 10600, newWorkers: 15900 },
                    { category: 'Total 2050 Need', existingWorkers: 30400, newWorkers: 45600 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="existingWorkers" name="Upskill Existing Workers" stackId="a" fill="#8884d8" />
                  <Bar dataKey="newWorkers" name="Qualify New Entrants" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-indigo-800">Strategies for Existing Workers</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Targeted upskilling programs for mid-career workers</li>
                  <li>Recognition of prior learning to accelerate qualification attainment</li>
                  <li>Industry partnerships for on-the-job qualification pathways</li>
                  <li>Flexible delivery models (evening/weekend classes, online options)</li>
                  <li>Subsidized training for priority industries and occupations</li>
                  <li>Focus on workers aged 25-45 for maximum long-term benefit</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-green-800">Strategies for New Entrants</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>School-to-work transition programs with built-in qualifications</li>
                  <li>International student pathways to employment in skill shortage areas</li>
                  <li>Skills attraction campaign targeting qualified workers from other regions</li>
                  <li>Apprenticeship and traineeship expansion in key growth industries</li>
                  <li>Career guidance emphasizing qualification pathways in schools</li>
                  <li>Skilled migration programs targeting qualified workers in high-demand fields</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vsp-industries' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Top Industries by New Workers Needed (2024-2050)</h2>
            <p className="text-gray-600 mb-4">Based on Victorian Skills Plan data for Southern Region</p>
            
            <h3 className="text-xl font-bold mb-3">Top 10 Industries by New Workers Needed</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topIndustriesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={IndustryTooltip} />
                  <Legend />
                  <Bar dataKey="value" name="Total New Workers Needed" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Breakdown of New Workers by Growth vs. Replacement</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topIndustriesData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="growth" name="From Industry Growth" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="retirements" name="From Retirements" stackId="a" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'vsp-occupations' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Top Occupations by New Workers Needed (2024-2050)</h2>
            <p className="text-gray-600 mb-4">Based on Victorian Skills Plan data for Southern Region</p>
            
            <h3 className="text-xl font-bold mb-3">Top 10 Occupations by New Workers Needed</h3>
            <div className="h-96 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topOccupationsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 220, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={200}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Total New Workers Needed" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'rampup' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Implementation Plan (2024-2050)</h2>
            
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Partnership Implementation Structure</h3>
              <p className="mb-4">
                The Higher Education Growth Partnership will be implemented through three key components, each addressing different aspects of the qualification challenge:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-blue-800 mb-2">Partnership Component</h4>
                  <p className="text-sm mb-2">Establishing a structured legislative model and governance framework</p>
                  <ul className="list-disc ml-6 text-sm space-y-1">
                    <li>High Growth Community Partnership</li>
                    <li>Aligned CSP and Free TAFE places</li>
                    <li>Coordinated government-industry collaboration</li>
                    <li>Priority industry focus</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-green-800 mb-2">Industry Co-delivery Component</h4>
                  <p className="text-sm mb-2">Building a skilled and sustainable workforce through industry collaboration</p>
                  <ul className="list-disc ml-6 text-sm space-y-1">
                    <li>National Paid Placement Fund</li>
                    <li>Tax incentives for employer-sponsored training</li>
                    <li>Regional Priority Skills Student Visa</li>
                    <li>Undergraduate diplomas and vocational bachelor programs</li>
                    <li>Industry placements in major projects</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-purple-800 mb-2">Skills Infrastructure Component</h4>
                  <p className="text-sm mb-2">Priority investments in education facilities and access programs</p>
                  <ul className="list-disc ml-6 text-sm space-y-1">
                    <li>Mixed-Purpose STEM Laboratories ($30M)</li>
                    <li>Advanced Technology Hub ($5M)</li>
                    <li>Applied AI Training Centre ($5M)</li>
                    <li>Student Health Service Training Centre ($8M)</li>
                    <li>Additional investments in access programs</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-3">Phased Implementation Timeline</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rampUpData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="annualQualificationsNeeded" fill="#8884d8" name="Annual Qualifications Needed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualificationModel;
