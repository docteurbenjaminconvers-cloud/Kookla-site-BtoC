'use client';

import Link from 'next/link';

export default function DashboardOverview() {
  const stats = [
    { label: 'Réservations à venir', value: '1', color: 'bg-bordeaux-100 text-bordeaux-700' },
    { label: 'KCoins disponibles', value: '20', color: 'bg-amber-100 text-amber-700' },
    { label: 'Avis laissés', value: '2', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${s.color} font-mono font-bold text-lg mb-2`}>
              {s.value}
            </div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="font-serif text-lg text-bordeaux-700 mb-4">Prochaine réservation</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Centre Laser Étoile</div>
            <div className="text-sm text-gray-500">15 avril 2026 à 14h00</div>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="badge-bordeaux text-xs">Jambes complètes</span>
              <span className="badge-bordeaux text-xs">Aisselles</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Jambes : 3/8 séances • Aisselles : 3/5 séances
            </div>
          </div>
          <Link href="/dashboard/reservations" className="btn-outline text-sm py-2 px-4 text-center">
            Voir détails
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/resultats" className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-bordeaux-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-bordeaux-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="font-semibold">Réserver une séance</div>
          <div className="text-xs text-gray-500 mt-1">Trouver un centre près de chez vous</div>
        </Link>

        <Link href="/dashboard/parrainage" className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="font-semibold">Parrainer un(e) ami(e)</div>
          <div className="text-xs text-gray-500 mt-1">Gagnez 10 KCoins par filleul(e)</div>
        </Link>
      </div>
    </div>
  );
}
