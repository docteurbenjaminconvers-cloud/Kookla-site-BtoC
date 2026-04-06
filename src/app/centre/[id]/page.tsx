'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockCenters, getReviewsForCenter, calculatePack } from '@/lib/mock-data';
import type { ZoneCategory } from '@/types';

const categoryLabels: Record<ZoneCategory, string> = {
  visage: 'Visage',
  corps: 'Corps',
  jambes: 'Jambes',
  zones_intimes: 'Zones intimes',
};

const categoryOrder: ZoneCategory[] = ['visage', 'corps', 'jambes', 'zones_intimes'];

function StarIcon({ filled, className = 'h-5 w-5' }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={`${className} ${filled ? 'text-amber-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const iconClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(rating)} className={iconClass} />
      ))}
    </div>
  );
}

export default function CentreDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const center = mockCenters.find((c) => c.slug === slug);

  const [activeCategory, setActiveCategory] = useState<ZoneCategory>('visage');
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!center) {
    return (
      <>
        <Header />
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-creme px-4">
          <h1 className="font-serif text-3xl font-bold text-bordeaux-700">Centre introuvable</h1>
          <p className="mt-4 text-gray-600">Le centre que vous recherchez n&apos;existe pas ou a ete supprime.</p>
          <Link
            href="/resultats"
            className="mt-6 inline-flex items-center rounded-lg bg-bordeaux-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bordeaux-800"
          >
            Retour aux resultats
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const reviews = getReviewsForCenter(center.id);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  const zonesForCategory = center.zones.filter((z) => z.category === activeCategory);

  const initials = center.name
    .split(' ')
    .map((w) => w[0])
    .filter((c) => c && c === c.toUpperCase())
    .slice(0, 2)
    .join('');

  const subRatingLabels: { key: keyof typeof center.subRatings; label: string }[] = [
    { key: 'accueil', label: 'Accueil' },
    { key: 'proprete', label: 'Proprete' },
    { key: 'cadre', label: 'Cadre' },
    { key: 'qualite', label: 'Qualite prestation' },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-creme">
        {/* ── Section 1: Header ── */}
        <section className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm text-gray-500">
              <Link href="/" className="hover:text-bordeaux-700 transition-colors">
                Accueil
              </Link>
              <span className="mx-2">&gt;</span>
              <Link href="/resultats" className="hover:text-bordeaux-700 transition-colors">
                Resultats
              </Link>
              <span className="mx-2">&gt;</span>
              <span className="text-bordeaux-700 font-medium">{center.name}</span>
            </nav>

            {/* Name */}
            <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
              {center.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-semibold text-gray-900">{center.rating}</span>
                <StarIcon filled className="h-5 w-5" />
              </div>
              <span className="text-sm text-gray-500">({center.reviewCount} avis)</span>
            </div>

            {/* Address */}
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <svg className="h-4 w-4 flex-shrink-0 text-bordeaux-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{center.address}, {center.postalCode} {center.city}</span>
            </div>

            {/* Technologies */}
            <div className="mt-4 flex flex-wrap gap-2">
              {center.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full bg-bordeaux-50 px-3 py-1 text-xs font-medium text-bordeaux-700 ring-1 ring-inset ring-bordeaux-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Photo Gallery ── */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Desktop: 1 large + 2 smaller */}
          <div className="hidden gap-4 md:grid md:grid-cols-3 md:grid-rows-2">
            <div className="col-span-2 row-span-2 flex items-center justify-center rounded-2xl bg-bordeaux-100 shadow-sm" style={{ minHeight: 360 }}>
              <span className="font-serif text-6xl font-bold text-bordeaux-300">{initials}</span>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-bordeaux-50 shadow-sm" style={{ minHeight: 172 }}>
              <span className="font-serif text-3xl font-bold text-bordeaux-200">{initials}</span>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-accent-50 shadow-sm" style={{ minHeight: 172 }}>
              <span className="font-serif text-3xl font-bold text-accent-200">{initials}</span>
            </div>
          </div>
          {/* Mobile: single */}
          <div className="flex items-center justify-center rounded-2xl bg-bordeaux-100 shadow-sm md:hidden" style={{ minHeight: 220 }}>
            <span className="font-serif text-5xl font-bold text-bordeaux-300">{initials}</span>
          </div>
        </section>

        {/* ── Section 3: Description & Info ── */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Description + Hours */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">A propos</h2>
                <p className="mt-4 leading-relaxed text-gray-700">{center.description}</p>
              </div>

              {/* Opening hours */}
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Horaires d&apos;ouverture</h3>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {center.hours.map((h) => (
                      <tr key={h.day} className="border-b border-gray-100 last:border-0">
                        <td className="py-2.5 font-medium text-gray-700">{h.day}</td>
                        <td className="py-2.5 text-right text-gray-600">
                          {h.closed ? (
                            <span className="text-red-500 font-medium">Ferme</span>
                          ) : (
                            `${h.open} - ${h.close}`
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Quick info card */}
            <div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-5">Informations</h3>

                {/* Technologies */}
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {center.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-bordeaux-50 px-2.5 py-0.5 text-xs font-medium text-bordeaux-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Phototypes */}
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Phototypes acceptes</p>
                  <div className="flex gap-1.5">
                    {center.fitzpatrickRange.map((f) => (
                      <span key={f} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-gray-700">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Telephone</p>
                  <a href={`tel:${center.phone.replace(/\s/g, '')}`} className="text-sm font-medium text-bordeaux-700 hover:underline">
                    {center.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                  <a href={`mailto:${center.email}`} className="text-sm font-medium text-bordeaux-700 hover:underline break-all">
                    {center.email}
                  </a>
                </div>

                {/* CTA */}
                <Link
                  href={`/reservation?center=${center.id}`}
                  className="block w-full rounded-lg bg-bordeaux-700 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-bordeaux-800"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: Tarifs & Packs ── */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
              Tarifs &amp; Packs
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              En moyenne 10 a 12 seances necessaires &mdash; nos packs vous font economiser jusqu&apos;a 25%
            </p>

            {/* Category tabs */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {categoryOrder.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-bordeaux-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Price table - Desktop */}
            <div className="mt-8 hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="pb-3 text-left font-semibold text-gray-700">Zone</th>
                    <th className="pb-3 text-center font-semibold text-gray-700">Unitaire</th>
                    <th className="pb-3 text-center font-semibold text-gray-700">
                      Pack 4+1
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                        -20%
                      </span>
                    </th>
                    <th className="pb-3 text-center font-semibold text-gray-700">
                      Pack 6+2
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-bordeaux-100 px-2 py-0.5 text-[10px] font-bold text-bordeaux-700">
                        MEILLEURE OFFRE -25%
                      </span>
                    </th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {zonesForCategory.map((zone) => {
                    const unit = calculatePack(zone.priceUnit, 'unit');
                    const pack4 = calculatePack(zone.priceUnit, 'pack4');
                    const pack6 = calculatePack(zone.priceUnit, 'pack6');
                    return (
                      <tr key={zone.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-4 font-medium text-gray-900">{zone.name}</td>
                        <td className="py-4 text-center">
                          <span className="font-mono text-gray-900">{unit.pricePerSession}&nbsp;&euro;</span>
                          <span className="block text-xs text-gray-500">/seance</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-mono text-gray-900">{pack4.pricePerSession}&nbsp;&euro;</span>
                          <span className="block text-xs text-gray-500">/seance</span>
                          <span className="block text-xs text-gray-400 mt-0.5">Total : {pack4.totalPrice}&nbsp;&euro;</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-mono font-semibold text-bordeaux-700">{pack6.pricePerSession}&nbsp;&euro;</span>
                          <span className="block text-xs text-gray-500">/seance</span>
                          <span className="block text-xs text-gray-400 mt-0.5">Total : {pack6.totalPrice}&nbsp;&euro;</span>
                        </td>
                        <td className="py-4 text-right">
                          <Link
                            href={`/reservation?center=${center.id}&zone=${zone.id}`}
                            className="inline-flex items-center rounded-lg bg-bordeaux-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-bordeaux-800"
                          >
                            Reserver
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Price cards - Mobile */}
            <div className="mt-6 space-y-4 md:hidden">
              {zonesForCategory.map((zone) => {
                const unit = calculatePack(zone.priceUnit, 'unit');
                const pack4 = calculatePack(zone.priceUnit, 'pack4');
                const pack6 = calculatePack(zone.priceUnit, 'pack6');
                return (
                  <div key={zone.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      {/* Unitaire */}
                      <div className="rounded-lg bg-gray-50 p-2.5">
                        <p className="text-[10px] font-semibold uppercase text-gray-400">Unitaire</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-gray-900">{unit.pricePerSession}&nbsp;&euro;</p>
                        <p className="text-[10px] text-gray-500">/seance</p>
                      </div>
                      {/* Pack 4+1 */}
                      <div className="rounded-lg bg-accent-50 p-2.5">
                        <p className="text-[10px] font-semibold uppercase text-accent-700">Pack 4+1</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-gray-900">{pack4.pricePerSession}&nbsp;&euro;</p>
                        <p className="text-[10px] text-gray-500">/seance</p>
                        <p className="text-[10px] text-gray-400">Total {pack4.totalPrice}&nbsp;&euro;</p>
                      </div>
                      {/* Pack 6+2 */}
                      <div className="rounded-lg bg-bordeaux-50 p-2.5 ring-1 ring-bordeaux-200">
                        <p className="text-[10px] font-semibold uppercase text-bordeaux-700">Pack 6+2</p>
                        <p className="mt-1 font-mono text-sm font-semibold text-bordeaux-700">{pack6.pricePerSession}&nbsp;&euro;</p>
                        <p className="text-[10px] text-gray-500">/seance</p>
                        <p className="text-[10px] text-gray-400">Total {pack6.totalPrice}&nbsp;&euro;</p>
                      </div>
                    </div>
                    <Link
                      href={`/reservation?center=${center.id}&zone=${zone.id}`}
                      className="mt-3 block w-full rounded-lg bg-bordeaux-700 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-bordeaux-800"
                    >
                      Reserver
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 5: Reviews ── */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">Avis clients</h2>

            {reviews.length === 0 ? (
              <p className="mt-4 text-gray-500">Aucun avis pour le moment.</p>
            ) : (
              <div className="mt-8 grid gap-10 lg:grid-cols-3">
                {/* Overall rating + sub-ratings */}
                <div className="lg:col-span-1">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-5xl font-bold text-gray-900">{center.rating}</span>
                      <div>
                        <StarRating rating={center.rating} />
                        <p className="mt-1 text-sm text-gray-500">{center.reviewCount} avis</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {subRatingLabels.map(({ key, label }) => {
                        const value = center.subRatings[key];
                        return (
                          <div key={key}>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{label}</span>
                              <span className="font-medium text-gray-900">{value}/5</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-amber-400 transition-all"
                                style={{ width: `${(value / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual reviews */}
                <div className="lg:col-span-2 space-y-6">
                  {visibleReviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{review.userName}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(review.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">{review.comment}</p>
                    </div>
                  ))}

                  {reviews.length > 3 && !showAllReviews && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="inline-flex items-center rounded-lg border border-bordeaux-700 px-6 py-2.5 text-sm font-semibold text-bordeaux-700 transition-colors hover:bg-bordeaux-50"
                    >
                      Voir tous les avis
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Section 6: CTA ── */}
        <section className="bg-bordeaux-700 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
              Reservez votre seance des maintenant
            </h2>
            <Link
              href={`/reservation?center=${center.id}`}
              className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-bordeaux-700 transition-colors hover:bg-creme"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Sticky mobile CTA bar ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
        <Link
          href={`/reservation?center=${center.id}`}
          className="block w-full rounded-lg bg-bordeaux-700 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-bordeaux-800"
        >
          Prendre rendez-vous
        </Link>
      </div>
    </>
  );
}
