'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockCenters, calculatePack } from '@/lib/mock-data';

export default function ScanPayPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-creme flex items-center justify-center"><div className="text-bordeaux-700 font-serif text-xl">Chargement...</div></div>}>
      <ScanPayPage />
    </Suspense>
  );
}

function ScanPayPage() {
  const searchParams = useSearchParams();
  const centerId = searchParams.get('center') || '1';
  const center = mockCenters.find(c => c.id === centerId) || mockCenters[0];

  const [selectedZone, setSelectedZone] = useState<string>('');
  const [packType, setPackType] = useState<'unit' | 'pack4' | 'pack6'>('unit');
  const [useKCoins, setUseKCoins] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const zone = center.zones.find(z => z.id === selectedZone);
  const pack = zone ? calculatePack(zone.priceUnit, packType) : null;
  const kcoinsDiscount = useKCoins && pack ? Math.min(20, pack.totalPrice - 1) : 0;
  const total = pack ? pack.totalPrice - kcoinsDiscount : 0;

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-xl text-bordeaux-700 mb-2">Paiement confirmé !</h1>
          <p className="text-sm text-gray-600 mb-4">
            Votre paiement de <strong className="font-mono">{total.toFixed(2)}€</strong> a été effectué avec succès.
          </p>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-left mb-6">
            <div className="font-semibold">{center.name}</div>
            <div className="text-gray-500">{zone?.name} — {packType === 'unit' ? '1 séance' : packType === 'pack4' ? 'Pack 4+1' : 'Pack 6+2'}</div>
          </div>
          <Link href="/" className="btn-bordeaux inline-block w-full text-center">Terminé</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creme">
      {/* Mobile-optimized header */}
      <div className="bg-bordeaux-700 text-white px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif text-lg font-bold">Kookla</span>
            <span className="text-bordeaux-200 text-xs">Scan & Pay</span>
          </div>
          <h1 className="font-semibold">{center.name}</h1>
          <p className="text-sm text-bordeaux-200">{center.address}, {center.city}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Step 1: Select treatment */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="font-semibold text-sm text-gray-700 mb-3">1. Choisissez votre soin</h2>
          <select
            value={selectedZone}
            onChange={e => setSelectedZone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent"
          >
            <option value="">Sélectionner une zone...</option>
            {center.zones.map(z => (
              <option key={z.id} value={z.id}>{z.name} — {z.priceUnit}€/séance</option>
            ))}
          </select>
        </div>

        {/* Step 2: Select pack */}
        {zone && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="font-semibold text-sm text-gray-700 mb-3">2. Choisissez votre formule</h2>
            <div className="space-y-2">
              {(['unit', 'pack4', 'pack6'] as const).map(pt => {
                const p = calculatePack(zone.priceUnit, pt);
                const labels = { unit: 'Unitaire', pack4: 'Pack 4+1 (−20%)', pack6: 'Pack 6+2 (−25%)' };
                const badges = { unit: null, pack4: 'Populaire', pack6: 'Meilleure valeur' };
                return (
                  <button
                    key={pt}
                    onClick={() => setPackType(pt)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors relative ${
                      packType === pt
                        ? pt === 'pack6' ? 'border-bordeaux-700 bg-bordeaux-50' : pt === 'pack4' ? 'border-accent bg-accent-50' : 'border-bordeaux-700 bg-bordeaux-50'
                        : 'border-gray-200'
                    }`}
                  >
                    {badges[pt] && (
                      <span className={`absolute -top-2 right-2 text-[10px] ${pt === 'pack6' ? 'badge-bordeaux' : 'badge-accent'}`}>
                        {badges[pt]}
                      </span>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium">{labels[pt]}</div>
                        <div className="text-xs text-gray-500">{p.sessions} séance{p.sessions > 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold">{p.totalPrice}€</div>
                        {p.sessions > 1 && <div className="text-xs text-gray-500">{p.pricePerSession}€/séance</div>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: KCoins */}
        {pack && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="inline-block w-5 h-5 bg-amber-400 rounded-full text-white text-xs text-center leading-5 mr-1">K</span>
                <strong className="text-amber-800">20 KCoins disponibles</strong>
              </div>
              <button
                onClick={() => setUseKCoins(!useKCoins)}
                className={`relative w-11 h-6 rounded-full transition-colors ${useKCoins ? 'bg-amber-500' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${useKCoins ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
            {useKCoins && (
              <div className="text-xs text-green-700 font-semibold mt-1">−{kcoinsDiscount}€ appliqués</div>
            )}
          </div>
        )}

        {/* Total & Pay */}
        {pack && (
          <div className="space-y-3">
            <div className="bg-bordeaux-700 text-white rounded-xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total à payer</span>
                <span className="font-mono text-2xl font-bold">{total.toFixed(2)}€</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentDone(true)}
              className="btn-bordeaux w-full text-lg py-4"
            >
              Payer {total.toFixed(2)}€
            </button>

            <p className="text-xs text-center text-gray-400">
              Paiement sécurisé par Stripe • Kookla Protection incluse
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
