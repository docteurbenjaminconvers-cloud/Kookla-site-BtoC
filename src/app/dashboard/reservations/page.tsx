'use client';

import { useState } from 'react';
import { mockReservations } from '@/lib/mock-data';

export default function ReservationsPage() {
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');

  const upcoming = mockReservations.filter(r => r.status === 'upcoming');
  const history = mockReservations.filter(r => r.status !== 'upcoming');

  return (
    <div>
      <h2 className="font-serif text-xl text-bordeaux-700 mb-4">Mes réservations</h2>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('upcoming')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'upcoming' ? 'bg-bordeaux-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          À venir ({upcoming.length})
        </button>
        <button
          onClick={() => setTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'history' ? 'bg-bordeaux-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Historique ({history.length})
        </button>
      </div>

      <div className="space-y-4">
        {(tab === 'upcoming' ? upcoming : history).map(res => (
          <div key={res.id} className={`bg-white rounded-xl border border-gray-100 p-6 ${res.status === 'cancelled' ? 'opacity-60' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-semibold text-lg">{res.centerName}</h3>
                <div className="text-sm text-gray-500">
                  {new Date(res.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {res.time}
                </div>
              </div>
              <div className="flex gap-2">
                {res.status === 'upcoming' && (
                  <span className="badge-green text-xs">À venir</span>
                )}
                {res.status === 'completed' && (
                  <span className="badge bg-gray-100 text-gray-600 text-xs">Terminée</span>
                )}
                {res.status === 'cancelled' && (
                  <span className="badge bg-red-100 text-red-600 text-xs">Annulée</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {res.zones.map(zone => (
                <div key={zone.name} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{zone.name}</span>
                    <span className="text-xs text-gray-500">{zone.packLabel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-bordeaux-700 rounded-full transition-all"
                        style={{ width: `${(zone.sessionsUsed / zone.sessionsTotal) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-gray-600 whitespace-nowrap">
                      {zone.sessionsUsed}/{zone.sessionsTotal} séances
                    </span>
                  </div>
                  {res.status === 'upcoming' && zone.sessionsUsed < zone.sessionsTotal && (
                    <div className="text-xs text-gray-500 mt-1">
                      Prochaine séance recommandée : dans 4 à 6 semaines
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <span className="font-mono text-sm text-gray-500">Total payé : {res.totalPaid}€</span>
              {res.status === 'upcoming' && (
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Annuler la réservation
                </button>
              )}
            </div>
          </div>
        ))}

        {(tab === 'upcoming' ? upcoming : history).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Aucune réservation {tab === 'upcoming' ? 'à venir' : 'dans l\'historique'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
