import React from 'react';
import { Settings as SettingsIcon, LineChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isSettings = location.pathname === '/settings';

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3 text-xl font-bold text-slate-800">
              <LineChart className="text-blue-600" size={28} />
              <span>Analyse Forex</span>
            </Link>
            <Link
              to={isSettings ? '/' : '/settings'}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title={isSettings ? 'Retour aux actualités' : 'Paramètres'}
            >
              <SettingsIcon size={24} />
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          Analyse en temps réel des actualités forex avec intelligence artificielle
        </div>
      </footer>
    </div>
  );
};