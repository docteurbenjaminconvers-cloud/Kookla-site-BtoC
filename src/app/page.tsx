'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ZONES = [
  'Visage',
  'Jambes complètes',
  'Demi-jambes',
  'Maillot',
  'Maillot brésilien',
  'Maillot intégral',
  'Aisselles',
  'Bras',
  'Dos',
  'Torse',
  'Cuisses',
  'Genoux',
  'Pieds',
  'Lèvre supérieure',
  'Menton',
  'Joues',
  'Nuque',
];

const FAQ_ITEMS = [
  {
    q: "Combien de séances faut-il pour une épilation définitive ?",
    a: "En moyenne 8 à 12 séances espacées de 4 à 6 semaines sont nécessaires pour obtenir une réduction permanente significative de la pilosité. Le nombre exact dépend de la zone traitée, de votre type de peau et de la densité de vos poils.",
  },
  {
    q: "Est-ce que l'épilation laser fait mal ?",
    a: "La sensation varie selon les zones et la sensibilité de chacun. La plupart des patientes décrivent un léger picotement comparable à un élastique sur la peau. Les technologies récentes intègrent des systèmes de refroidissement qui réduisent considérablement l'inconfort.",
  },
  {
    q: "Quels sont les phototypes compatibles ?",
    a: "Les technologies modernes permettent de traiter tous les phototypes (I à VI). Les lasers Nd:YAG sont particulièrement adaptés aux peaux foncées, tandis que les lasers Alexandrite conviennent mieux aux peaux claires. Votre centre vous orientera vers la technologie la plus adaptée.",
  },
  {
    q: "Peut-on s'épiler au laser en été ?",
    a: "Il est recommandé d'éviter l'exposition solaire 2 à 4 semaines avant et après chaque séance. Si vous êtes bronzé(e), il est préférable d'attendre que votre bronzage s'estompe. Certaines technologies permettent néanmoins un traitement sur peau légèrement hâlée.",
  },
  {
    q: "Quelle est la politique d'annulation ?",
    a: "Vous pouvez annuler gratuitement jusqu'à 48h avant votre séance. En cas d'annulation tardive ou de non-présentation, des frais peuvent s'appliquer selon la politique du centre partenaire.",
  },
  {
    q: "Qu'est-ce que les KCoins ?",
    a: "Les KCoins sont des crédits fidélité Kookla. Vous recevez 10 KCoins à l'inscription et pouvez en gagner davantage à chaque réservation. Ils sont utilisables comme réduction sur vos prochaines séances.",
  },
];

export default function Home() {
  const router = useRouter();
  const [typeSoin, setTypeSoin] = useState('laser');
  const [zones, setZones] = useState<string[]>([]);
  const [localisation, setLocalisation] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function toggleZone(zone: string) {
    setZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('type', typeSoin);
    if (zones.length > 0) params.set('zones', zones.join(','));
    if (localisation) params.set('lieu', localisation);
    router.push(`/resultats?${params.toString()}`);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* ===================== HERO ===================== */}
        <section className="bg-gradient-to-b from-creme to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Trouvez votre centre d&apos;épilation laser
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comparez, réservez et payez en 2&nbsp;minutes. Sans engagement.
            </p>

            {/* Search Card */}
            <form
              onSubmit={handleSearch}
              className="mt-10 mx-auto max-w-3xl rounded-2xl bg-white p-6 sm:p-8 shadow-lg text-left"
            >
              {/* Step 1 — Type de soin */}
              <fieldset>
                <legend className="font-sans text-sm font-semibold text-gray-800 mb-3">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-bordeaux-700 text-xs font-bold text-white">
                    1
                  </span>
                  Type de soin
                </legend>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'laser', label: 'Laser' },
                    { value: 'electrique', label: 'Épilation électrique' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                        typeSoin === opt.value
                          ? 'border-bordeaux-700 bg-bordeaux-50 text-bordeaux-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="typeSoin"
                        value={opt.value}
                        checked={typeSoin === opt.value}
                        onChange={() => setTypeSoin(opt.value)}
                        className="sr-only"
                      />
                      <span
                        className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          typeSoin === opt.value
                            ? 'border-bordeaux-700'
                            : 'border-gray-300'
                        }`}
                      >
                        {typeSoin === opt.value && (
                          <span className="h-2 w-2 rounded-full bg-bordeaux-700" />
                        )}
                      </span>
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Step 2 — Zones */}
              <fieldset className="mt-6">
                <legend className="font-sans text-sm font-semibold text-gray-800 mb-3">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-bordeaux-700 text-xs font-bold text-white">
                    2
                  </span>
                  Zones à épiler
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ZONES.map((zone) => {
                    const checked = zones.includes(zone);
                    return (
                      <label
                        key={zone}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          checked
                            ? 'border-bordeaux-700 bg-bordeaux-50 text-bordeaux-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleZone(zone)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            checked
                              ? 'border-bordeaux-700 bg-bordeaux-700'
                              : 'border-gray-300'
                          }`}
                        >
                          {checked && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        {zone}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Step 3 — Localisation */}
              <fieldset className="mt-6">
                <legend className="font-sans text-sm font-semibold text-gray-800 mb-3">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-bordeaux-700 text-xs font-bold text-white">
                    3
                  </span>
                  Localisation
                </legend>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                    placeholder="Ville ou code postal"
                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-bordeaux-700 focus:outline-none focus:ring-1 focus:ring-bordeaux-700"
                  />
                </div>
              </fieldset>

              {/* CTA */}
              <button
                type="submit"
                className="btn-bordeaux mt-8 w-full sm:w-auto"
              >
                Rechercher
              </button>
            </form>
          </div>
        </section>

        {/* ============= COMMENT CA MARCHE ============= */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Comment ça marche
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bordeaux-700 text-lg font-bold text-white">
                  1
                </span>
                <div className="mt-5 text-gray-400">
                  {/* Body outline icon */}
                  <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM8 9.5c0-.5.5-1.5 4-1.5s4 1 4 1.5v1c0 .5-.2 1-.5 1.3L14 14l.5 7.5h-1L12 16l-1.5 5.5h-1L10 14l-1.5-2.2c-.3-.3-.5-.8-.5-1.3v-1z" />
                  </svg>
                </div>
                <h3 className="mt-3 font-sans text-lg font-semibold text-gray-900">
                  Sélectionnez vos zones
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Utilisez notre Silhouette Interactive pour choisir vos zones
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bordeaux-700 text-lg font-bold text-white">
                  2
                </span>
                <div className="mt-5 text-gray-400">
                  {/* Building icon */}
                  <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <h3 className="mt-3 font-sans text-lg font-semibold text-gray-900">
                  Choisissez votre centre
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Comparez prix, technologies et disponibilités
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bordeaux-700 text-lg font-bold text-white">
                  3
                </span>
                <div className="mt-5 text-gray-400">
                  {/* Credit card icon */}
                  <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <h3 className="mt-3 font-sans text-lg font-semibold text-gray-900">
                  Payez en ligne
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Recevez votre confirmation instantanément
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= SOCIAL PROOF ============= */}
        <section className="bg-creme py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              <div>
                <p className="font-mono text-4xl sm:text-5xl font-bold text-bordeaux-700">
                  57%
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  de nos clientes reviennent pour une 2ème zone
                </p>
              </div>
              <div>
                <p className="font-mono text-4xl sm:text-5xl font-bold text-bordeaux-700">
                  451&euro;
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  de panier moyen — janvier 2026
                </p>
              </div>
              <div>
                <p className="font-mono text-4xl sm:text-5xl font-bold text-bordeaux-700">
                  100%
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Paiement sécurisé Stripe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============= CTA CENTRE PARTENAIRE ============= */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Vous êtes un centre laser&nbsp;?
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Rejoignez Kookla gratuitement et accédez à des milliers de clientes
            </p>
            <button
              type="button"
              onClick={() => router.push('/centre')}
              className="btn-outline mt-8"
            >
              Rejoindre Kookla gratuitement
            </button>
          </div>
        </section>

        {/* ============= FAQ ACCORDION ============= */}
        <section className="bg-creme py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              Questions fréquentes
            </h2>

            <div className="mt-10 space-y-3">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-xl bg-white border border-gray-100 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="font-sans text-sm font-semibold text-gray-900 pr-4">
                        {item.q}
                      </span>
                      <svg
                        className={`h-5 w-5 shrink-0 text-bordeaux-700 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
