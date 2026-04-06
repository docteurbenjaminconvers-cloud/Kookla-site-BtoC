'use client';

import { useState } from 'react';

export default function ParametresPage() {
  const [name, setName] = useState('Sophie Martin');
  const [email, setEmail] = useState('sophie.martin@email.com');
  const [fitzpatrick, setFitzpatrick] = useState('II');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="font-serif text-xl text-bordeaux-700 mb-6">Paramètres</h2>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold mb-4">Informations personnelles</h3>
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phototype Fitzpatrick</label>
            <select
              value={fitzpatrick}
              onChange={e => setFitzpatrick(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent"
            >
              <option value="I">I — Peau très claire, brûle toujours</option>
              <option value="II">II — Peau claire, brûle facilement</option>
              <option value="III">III — Peau intermédiaire, bronze graduellement</option>
              <option value="IV">IV — Peau mate, bronze facilement</option>
              <option value="V">V — Peau foncée, bronze très facilement</option>
              <option value="VI">VI — Peau très foncée, ne brûle jamais</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className={`transition-colors ${saved ? 'bg-green-500 text-white px-6 py-3 rounded-lg font-semibold' : 'btn-bordeaux'}`}
          >
            {saved ? 'Sauvegardé !' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold mb-2">Données personnelles</h3>
        <p className="text-sm text-gray-500 mb-4">
          Conformément au RGPD, vous pouvez exporter ou supprimer vos données à tout moment.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline text-sm py-2 px-4">
            Exporter mes données
          </button>
          <button className="text-sm py-2 px-4 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}
