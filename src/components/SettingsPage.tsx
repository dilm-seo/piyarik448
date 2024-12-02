import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { Save, Key, Thermometer, Cpu } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, setSettings } = useSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Paramètres</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
              <Key size={16} />
              Clé API OpenAI
            </label>
            <input
              type="password"
              id="apiKey"
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="sk-..."
            />
            <p className="mt-1 text-sm text-slate-500">
              Votre clé API sera stockée localement dans votre navigateur
            </p>
          </div>

          <div>
            <label htmlFor="model" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
              <Cpu size={16} />
              Modèle
            </label>
            <select
              id="model"
              value={settings.model}
              onChange={(e) => setSettings({ ...settings, model: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>

          <div>
            <label htmlFor="temperature" className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
              <Thermometer size={16} />
              Température : {settings.temperature}
            </label>
            <input
              type="range"
              id="temperature"
              min="0"
              max="2"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-slate-500 mt-1">
              <span>Plus Précis</span>
              <span>Plus Créatif</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save size={20} className="mr-2" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};