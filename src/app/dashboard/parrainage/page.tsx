'use client';

import { useState } from 'react';
import { mockUser } from '@/lib/mock-data';

export default function ParrainagePage() {
  const [copied, setCopied] = useState(false);
  const referralLink = `kookla.fr/r/${mockUser.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${referralLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h2 className="font-serif text-xl text-bordeaux-700 mb-6">Parrainage</h2>

      {/* Referral link */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h3 className="font-semibold mb-2">Votre lien de parrainage</h3>
        <p className="text-sm text-gray-600 mb-4">
          Gagnez <strong className="text-amber-600">10 KCoins (10€)</strong> dès que votre filleul(e) effectue sa 1ère réservation
        </p>
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 font-mono text-sm truncate">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              copied ? 'bg-green-500 text-white' : 'btn-bordeaux'
            }`}
          >
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="font-mono text-2xl font-bold text-bordeaux-700">5</div>
          <div className="text-xs text-gray-500 mt-1">Filleuls invités</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="font-mono text-2xl font-bold text-green-600">2</div>
          <div className="text-xs text-gray-500 mt-1">Filleuls convertis</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="font-mono text-2xl font-bold text-amber-600">20</div>
          <div className="text-xs text-gray-500 mt-1">KCoins gagnés</div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold mb-4">Partagez votre lien</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://wa.me/?text=Découvre Kookla pour ton épilation laser ! Utilise mon lien : https://${referralLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=Découvre Kookla&body=Découvre Kookla pour ton épilation laser ! Utilise mon lien : https://${referralLink}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 bg-bordeaux-700 text-white rounded-lg text-sm font-medium hover:bg-bordeaux-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copied ? 'Copié !' : 'Copier le lien'}
          </button>
        </div>
      </div>
    </div>
  );
}
