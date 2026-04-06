'use client';

import Link from 'next/link';
import { mockUser, mockKCoinHistory } from '@/lib/mock-data';

export default function KCoinsPage() {
  return (
    <div>
      <h2 className="font-serif text-xl text-bordeaux-700 mb-6">Mon solde KCoins</h2>

      {/* Balance card */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-lg">K</div>
          <div>
            <div className="font-mono text-3xl font-bold text-amber-800">{mockUser.kcoins} KCoins</div>
            <div className="text-sm text-amber-700">= {mockUser.kcoins}€ de réduction</div>
          </div>
        </div>
        <div className="text-xs text-amber-600 mt-3">
          Vos KCoins expirent le 15 janvier 2027
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold">Historique des mouvements</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {mockKCoinHistory.map(movement => (
            <div key={movement.id} className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  movement.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {movement.amount > 0 ? '+' : '−'}
                </div>
                <div>
                  <div className="text-sm font-medium">{movement.description}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(movement.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <span className={`font-mono font-bold ${movement.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {movement.amount > 0 ? '+' : ''}{movement.amount} KCoins
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/dashboard/parrainage" className="btn-accent inline-flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Parrainer un(e) ami(e) — gagnez 10 KCoins
      </Link>
    </div>
  );
}
