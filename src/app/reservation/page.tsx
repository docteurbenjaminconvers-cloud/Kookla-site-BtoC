'use client';

import { Suspense, useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SilhouetteSelector from '@/components/SilhouetteSelector';
import { mockCenters, calculatePack, allZones } from '@/lib/mock-data';
import type { ZoneCategory } from '@/types';

export default function ReservationPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-creme flex items-center justify-center"><div className="text-bordeaux-700 font-serif text-xl">Chargement...</div></div>}>
      <ReservationPage />
    </Suspense>
  );
}

const categoryLabels: Record<ZoneCategory, string> = {
  visage: 'Visage',
  corps: 'Corps',
  jambes: 'Jambes',
  zones_intimes: 'Zones intimes',
};

const categoryOrder: ZoneCategory[] = ['visage', 'corps', 'jambes', 'zones_intimes'];

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const practitioners = ['Dr. Martin', 'Dr. Dubois', 'Dr. Laurent'];

function getAvailableDays(): Date[] {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 1; i <= 21; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

function ReservationPage() {
  const searchParams = useSearchParams();
  const centerId = searchParams.get('center') || '1';
  const center = mockCenters.find(c => c.id === centerId) || mockCenters[0];

  const [step, setStep] = useState(1);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [packChoices, setPackChoices] = useState<Record<string, 'unit' | 'pack4' | 'pack6'>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPractitioner, setSelectedPractitioner] = useState(practitioners[0]);
  const [useKCoins, setUseKCoins] = useState(false);
  const [addProtection, setAddProtection] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const availableDays = useMemo(getAvailableDays, []);

  const selectedZoneObjects = useMemo(() =>
    allZones.filter(z => selectedZones.includes(z.id))
      .map(z => {
        const centerZone = center.zones.find(cz => cz.id === z.id);
        return centerZone || z;
      }),
    [selectedZones, center.zones]
  );

  const cartItems = useMemo(() =>
    selectedZoneObjects.map(zone => {
      const packType = packChoices[zone.id] || 'unit';
      const pack = calculatePack(zone.priceUnit, packType);
      return { zone, ...pack, packType };
    }),
    [selectedZoneObjects, packChoices]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const kcoinsDiscount = useKCoins ? Math.min(20, subtotal - 1) : 0;
  const protectionPrice = addProtection ? 9.90 : 0;
  const total = subtotal - kcoinsDiscount + protectionPrice;

  const toggleZone = (id: string) => {
    setSelectedZones(prev =>
      prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]
    );
  };

  const setPackChoice = (zoneId: string, pack: 'unit' | 'pack4' | 'pack6') => {
    setPackChoices(prev => ({ ...prev, [zoneId]: pack }));
  };

  const stepLabels = ['Soins', 'Packs', 'Créneau', 'Récapitulatif', 'Paiement'];

  const calendarMonth = new Date();
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const isAvailable = (day: number) => {
    const d = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
    return availableDays.some(ad =>
      ad.getDate() === d.getDate() && ad.getMonth() === d.getMonth() && ad.getFullYear() === d.getFullYear()
    );
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-creme">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i + 1 < step ? 'bg-green-500 text-white' :
                    i + 1 === step ? 'bg-bordeaux-700 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs mt-1 hidden sm:block ${i + 1 === step ? 'text-bordeaux-700 font-semibold' : 'text-gray-500'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {stepLabels.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded ${
                  i + 1 <= step ? 'bg-bordeaux-700' : 'bg-gray-200'
                }`} />
              ))}
            </div>
          </div>

          <h2 className="text-sm text-gray-500 mb-1">{center.name}</h2>

          {/* Step 1 — Sélection des soins */}
          {step === 1 && (
            <div>
              <h1 className="font-serif text-2xl text-bordeaux-700 mb-6">Sélectionnez vos zones</h1>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="flex justify-center">
                  <SilhouetteSelector
                    selectedZones={selectedZones}
                    onToggleZone={toggleZone}
                    className="max-w-[240px]"
                  />
                </div>
                <div>
                  {categoryOrder.map(cat => {
                    const zonesInCat = allZones.filter(z => z.category === cat);
                    return (
                      <div key={cat} className="mb-4">
                        <h3 className="font-semibold text-sm text-gray-700 mb-2 uppercase tracking-wide">
                          {categoryLabels[cat]}
                        </h3>
                        <div className="space-y-1">
                          {zonesInCat.map(zone => {
                            const centerZone = center.zones.find(cz => cz.id === zone.id);
                            const price = centerZone?.priceUnit || zone.priceUnit;
                            const isSelected = selectedZones.includes(zone.id);
                            return (
                              <button
                                key={zone.id}
                                onClick={() => toggleZone(zone.id)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                                  isSelected
                                    ? 'bg-bordeaux-100 text-bordeaux-700 border border-bordeaux-300'
                                    : 'bg-white hover:bg-gray-50 border border-gray-100'
                                }`}
                              >
                                <span>{zone.name}</span>
                                <span className="font-mono text-xs">{price}€</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedZones.length > 0 && (
                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-sm mb-2">{selectedZones.length} zone(s) sélectionnée(s)</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedZoneObjects.map(z => (
                      <span key={z.id} className="badge-bordeaux text-xs">
                        {z.name} — {z.priceUnit}€
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedZones.length === 0}
                  className="btn-bordeaux disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Choix du pack */}
          {step === 2 && (
            <div>
              <h1 className="font-serif text-2xl text-bordeaux-700 mb-6">Choisissez vos packs</h1>
              <p className="text-sm text-gray-600 mb-6">
                En moyenne 10 à 12 séances nécessaires — nos packs vous font économiser jusqu&apos;à 25%
              </p>
              <div className="space-y-4">
                {selectedZoneObjects.map(zone => {
                  const unit = calculatePack(zone.priceUnit, 'unit');
                  const pack4 = calculatePack(zone.priceUnit, 'pack4');
                  const pack6 = calculatePack(zone.priceUnit, 'pack6');
                  const current = packChoices[zone.id] || 'unit';

                  return (
                    <div key={zone.id} className="bg-white rounded-xl border border-gray-100 p-4">
                      <h3 className="font-semibold text-bordeaux-700 mb-3">{zone.name}</h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {/* Unitaire */}
                        <button
                          onClick={() => setPackChoice(zone.id, 'unit')}
                          className={`p-3 rounded-lg border-2 text-left transition-colors ${
                            current === 'unit' ? 'border-bordeaux-700 bg-bordeaux-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xs text-gray-500 mb-1">Unitaire</div>
                          <div className="font-mono text-lg font-bold">{unit.pricePerSession}€</div>
                          <div className="text-xs text-gray-500">1 séance</div>
                        </button>

                        {/* Pack 4+1 */}
                        <button
                          onClick={() => setPackChoice(zone.id, 'pack4')}
                          className={`p-3 rounded-lg border-2 text-left transition-colors relative ${
                            current === 'pack4' ? 'border-accent bg-accent-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="absolute -top-2 right-2 badge-accent text-[10px]">Populaire</span>
                          <div className="text-xs text-gray-500 mb-1">Pack 4+1 (−20%)</div>
                          <div className="font-mono text-lg font-bold">{pack4.pricePerSession}€<span className="text-xs font-normal text-gray-500">/séance</span></div>
                          <div className="text-xs text-gray-500">{pack4.sessions} séances — {pack4.totalPrice}€</div>
                          <div className="text-xs text-green-600 font-semibold mt-1">
                            Économie : {unit.pricePerSession * 5 - pack4.totalPrice}€
                          </div>
                        </button>

                        {/* Pack 6+2 */}
                        <button
                          onClick={() => setPackChoice(zone.id, 'pack6')}
                          className={`p-3 rounded-lg border-2 text-left transition-colors relative ${
                            current === 'pack6' ? 'border-bordeaux-700 bg-bordeaux-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span className="absolute -top-2 right-2 badge-bordeaux text-[10px]">Meilleure valeur</span>
                          <div className="text-xs text-gray-500 mb-1">Pack 6+2 (−25%)</div>
                          <div className="font-mono text-lg font-bold">{pack6.pricePerSession}€<span className="text-xs font-normal text-gray-500">/séance</span></div>
                          <div className="text-xs text-gray-500">{pack6.sessions} séances — {pack6.totalPrice}€</div>
                          <div className="text-xs text-green-600 font-semibold mt-1">
                            Économie : {unit.pricePerSession * 8 - pack6.totalPrice}€
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border-2 border-bordeaux-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total panier</span>
                  <span className="font-mono text-2xl text-bordeaux-700 font-bold">{subtotal.toFixed(2)}€</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(1)} className="btn-outline">Précédent</button>
                <button onClick={() => setStep(3)} className="btn-bordeaux">Suivant</button>
              </div>
            </div>
          )}

          {/* Step 3 — Choix du créneau */}
          {step === 3 && (
            <div>
              <h1 className="font-serif text-2xl text-bordeaux-700 mb-6">Choisissez votre créneau</h1>

              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
                <h3 className="font-semibold text-center mb-4">
                  {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                </h3>
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
                    <div key={d} className="font-semibold text-gray-500 py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const available = isAvailable(day);
                    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                    const selected = selectedDate && isSameDay(selectedDate, date);
                    return (
                      <button
                        key={day}
                        disabled={!available}
                        onClick={() => { setSelectedDate(date); setSelectedTime(''); }}
                        className={`py-2 rounded text-sm transition-colors ${
                          selected ? 'bg-bordeaux-700 text-white font-bold' :
                          available ? 'bg-bordeaux-50 text-bordeaux-700 hover:bg-bordeaux-100' :
                          'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
                  <h3 className="font-semibold mb-3">
                    Horaires disponibles — {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                          selectedTime === t
                            ? 'bg-bordeaux-700 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTime && (
                <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
                  <h3 className="font-semibold mb-3">Praticienne</h3>
                  <select
                    value={selectedPractitioner}
                    onChange={e => setSelectedPractitioner(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent"
                  >
                    {practitioners.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(2)} className="btn-outline">Précédent</button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-bordeaux disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Récapitulatif + KCoins */}
          {step === 4 && (
            <div>
              <h1 className="font-serif text-2xl text-bordeaux-700 mb-6">Récapitulatif</h1>

              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
                <h3 className="font-semibold text-lg mb-4">{center.name}</h3>
                <div className="text-sm text-gray-600 mb-4">
                  {selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {selectedTime} — {selectedPractitioner}
                </div>

                <div className="divide-y">
                  {cartItems.map(item => (
                    <div key={item.zone.id} className="flex justify-between py-3">
                      <div>
                        <div className="font-medium">{item.zone.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.packType === 'unit' ? '1 séance' :
                           item.packType === 'pack4' ? 'Pack 4+1 (5 séances)' :
                           'Pack 6+2 (8 séances)'}
                        </div>
                      </div>
                      <div className="font-mono font-semibold">{item.totalPrice}€</div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span className="font-mono">{subtotal.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              {/* KCoins */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-amber-800">
                      <span className="inline-block w-5 h-5 bg-amber-400 rounded-full text-white text-xs text-center leading-5 mr-2">K</span>
                      Vous avez 20 KCoins = −20€
                    </div>
                    <div className="text-xs text-amber-700 mt-1">
                      Appliquer vos crédits fidélité sur cette réservation
                    </div>
                  </div>
                  <button
                    onClick={() => setUseKCoins(!useKCoins)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${useKCoins ? 'bg-amber-500' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${useKCoins ? 'left-6' : 'left-0.5'}`} />
                  </button>
                </div>
                {useKCoins && (
                  <div className="mt-2 text-sm text-green-700 font-semibold">
                    −{kcoinsDiscount}€ appliqués
                  </div>
                )}
              </div>

              {/* Protection */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addProtection}
                    onChange={e => setAddProtection(e.target.checked)}
                    className="mt-1 w-4 h-4 text-bordeaux-700 rounded focus:ring-bordeaux-500"
                  />
                  <div>
                    <div className="font-semibold">Kookla Protection — 9,90€</div>
                    <div className="text-xs text-gray-500">Annulation flexible jusqu&apos;à 24h avant la séance. Remboursement intégral.</div>
                  </div>
                </label>
              </div>

              {/* Total */}
              <div className="bg-bordeaux-700 text-white rounded-xl p-6 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Sous-total</span>
                    <span className="font-mono">{subtotal.toFixed(2)}€</span>
                  </div>
                  {useKCoins && (
                    <div className="flex justify-between text-sm text-amber-300">
                      <span>KCoins</span>
                      <span className="font-mono">−{kcoinsDiscount.toFixed(2)}€</span>
                    </div>
                  )}
                  {addProtection && (
                    <div className="flex justify-between text-sm opacity-80">
                      <span>Kookla Protection</span>
                      <span className="font-mono">+9,90€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/20">
                    <span>Total TTC</span>
                    <span className="font-mono">{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="btn-outline">Précédent</button>
                <button onClick={() => setStep(5)} className="btn-bordeaux">Confirmer et payer</button>
              </div>
            </div>
          )}

          {/* Step 5 — Paiement */}
          {step === 5 && !paymentDone && (
            <div>
              <h1 className="font-serif text-2xl text-bordeaux-700 mb-6">Paiement sécurisé</h1>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-semibold">Carte bancaire</span>
                      <span className="text-xs text-gray-400 ml-auto">Paiement sécurisé par Stripe</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titulaire de la carte</label>
                        <input
                          type="text"
                          placeholder="Sophie Martin"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bordeaux-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setPaymentDone(true)}
                      className="btn-bordeaux w-full mt-6 text-lg py-4"
                    >
                      Confirmer et payer {total.toFixed(2)}€
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-4 h-fit">
                  <h3 className="font-semibold mb-3">Résumé</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">{center.name}</div>
                    {cartItems.map(item => (
                      <div key={item.zone.id} className="flex justify-between">
                        <span className="text-gray-600">{item.zone.name}</span>
                        <span className="font-mono">{item.totalPrice}€</span>
                      </div>
                    ))}
                    {useKCoins && (
                      <div className="flex justify-between text-amber-600">
                        <span>KCoins</span>
                        <span className="font-mono">−{kcoinsDiscount.toFixed(2)}€</span>
                      </div>
                    )}
                    {addProtection && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Protection</span>
                        <span className="font-mono">9,90€</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="font-mono text-bordeaux-700">{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button onClick={() => setStep(4)} className="btn-outline">Précédent</button>
              </div>
            </div>
          )}

          {/* Confirmation */}
          {step === 5 && paymentDone && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl text-bordeaux-700 mb-3">Réservation confirmée !</h1>
              <p className="text-gray-600 mb-6">
                Un email de confirmation a été envoyé à <strong>sophie.martin@email.com</strong>
              </p>

              <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-md mx-auto mb-8 text-left">
                <h3 className="font-semibold mb-3">Détails de la réservation</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Centre</span>
                    <span className="font-medium">{center.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">
                      {selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Heure</span>
                    <span className="font-mono font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Praticienne</span>
                    <span className="font-medium">{selectedPractitioner}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Total payé</span>
                    <span className="font-mono text-bordeaux-700">{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <Link href="/" className="btn-bordeaux inline-block">
                Retour à l&apos;accueil
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
