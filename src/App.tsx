import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SessionCard from './components/SessionCard';
import SessionDetail from './components/SessionDetail';
import { sessions } from './data/sessions';
import { ArrowUpDown } from 'lucide-react';

function SessionList() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Helper function to parse French dates
  const parseFrenchDate = (dateStr: string): Date => {
    const months: { [key: string]: number } = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
      'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    
    const parts = dateStr.split(' ');
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    
    return new Date(year, month, day);
  };

  // Sort sessions based on current sort order
  const sortedSessions = [...sessions].sort((a, b) => {
    const dateA = parseFrenchDate(a.date);
    const dateB = parseFrenchDate(b.date);
    
    if (sortOrder === 'desc') {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  return (
    <>
      {/* Introduction */}
      <div className="text-center mb-12">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Je suis Mileva, ici je consigne fidèlement nos sessions de réflexion à l'Académie Olympia.
        </p>
      </div>

      {/* Sessions List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
        <div className="col-span-full flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span>Sessions de réflexion</span>
            <div className="flex-1 ml-4 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </h3>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-sm font-medium">
              {sortOrder === 'desc' ? 'Plus récent d\'abord' : 'Plus ancien d\'abord'}
            </span>
          </button>
        </div>
        
        {sortedSessions.map((session) => (
          <SessionCard
            key={session.id}
            {...session}
          />
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<SessionList />} />
          <Route path="/sessions/:id" element={<SessionDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;