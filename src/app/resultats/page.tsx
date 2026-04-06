'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockCenters } from '@/lib/mock-data';
import { Center, LaserTechnology, FitzpatrickType } from '@/types';

const ALL_TECHNOLOGIES: LaserTechnology[] = ['Alexandrite', 'Diode', 'Nd:YAG', 'SHR'];
const ALL_FITZPATRICK: FitzpatrickType[] = ['I', 'II', 'III', 'IV', 'V', 'VI'];

type SortOption = 'pertinence' | 'prix_asc' | 'prix_desc' | 'mieux_notes';

function StarIcon({ filled, className = 'w-5 h-5' }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill={filled ? '#C47A1E' : '#d1d5db'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function getMinPrice(center: Center): number {
  if (center.zones.length === 0) return 0;
  return Math.min(...center.zones.map((z) => z.priceUnit));
}

// Simulated distance (since we don't have user geolocation)
function getDistance(center: Center): number {
  const distances: Record<string, number> = {
    '1': 2.3,
    '2': 4.8,
    '3': 12.5,
    '4': 8.1,
    '5': 15.7,
    '6': 22.4,
  };
  return distances[center.id] ?? 10;
}

export default function ResultatsPage() {
  // Filter state
  const [radius, setRadius] = useState(30);
  const [selectedTechnologies, setSelectedTechnologies] = useState<LaserTechnology[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedFitzpatrick, setSelectedFitzpatrick] = useState<FitzpatrickType[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('pertinence');

  // Mobile filter drawer
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggleTechnology(tech: LaserTechnology) {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }

  function toggleFitzpatrick(type: FitzpatrickType) {
    setSelectedFitzpatrick((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function resetFilters() {
    setRadius(30);
    setSelectedTechnologies([]);
    setMinRating(0);
    setMaxPrice(300);
    setSelectedFitzpatrick([]);
    setSortBy('pertinence');
  }

  const filteredCenters = useMemo(() => {
    let results = mockCenters.filter((center) => {
      // Radius filter
      if (getDistance(center) > radius) return false;

      // Technology filter
      if (
        selectedTechnologies.length > 0 &&
        !selectedTechnologies.some((tech) => center.technologies.includes(tech))
      ) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && center.rating < minRating) return false;

      // Price filter
      if (getMinPrice(center) > maxPrice) return false;

      // Fitzpatrick filter
      if (
        selectedFitzpatrick.length > 0 &&
        !selectedFitzpatrick.some((type) => center.fitzpatrickRange.includes(type))
      ) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'prix_asc':
        results = [...results].sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case 'prix_desc':
        results = [...results].sort((a, b) => getMinPrice(b) - getMinPrice(a));
        break;
      case 'mieux_notes':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'pertinence':
      default:
        // Default order: combination of rating and distance
        results = [...results].sort(
          (a, b) => b.rating / (getDistance(b) + 1) - a.rating / (getDistance(a) + 1)
        );
        break;
    }

    return results;
  }, [radius, selectedTechnologies, minRating, maxPrice, selectedFitzpatrick, sortBy]);

  // Shared filter panel JSX
  const filterPanel = (
    <div className="space-y-6">
      {/* Zone géographique */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-bold text-gray-900">Zone géographique</h3>
        <label className="flex items-center justify-between text-sm text-gray-600">
          <span>Rayon</span>
          <span className="font-semibold text-bordeaux-700">{radius} km</span>
        </label>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="mt-2 w-full accent-bordeaux-700"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>10 km</span>
          <span>100 km</span>
        </div>
      </div>

      {/* Technologies laser */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-bold text-gray-900">Technologies laser</h3>
        <div className="space-y-2">
          {ALL_TECHNOLOGIES.map((tech) => (
            <label key={tech} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selectedTechnologies.includes(tech)}
                onChange={() => toggleTechnology(tech)}
                className="h-4 w-4 rounded border-gray-300 text-bordeaux-700 focus:ring-bordeaux-500"
              />
              {tech}
            </label>
          ))}
        </div>
      </div>

      {/* Note minimale */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-bold text-gray-900">Note minimale</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setMinRating(minRating === star ? 0 : star)}
              className="transition-transform hover:scale-110"
              aria-label={`${star} étoile${star > 1 ? 's' : ''} minimum`}
            >
              <StarIcon filled={star <= minRating} />
            </button>
          ))}
        </div>
        {minRating > 0 && (
          <p className="mt-1 text-xs text-gray-500">{minRating}+ étoiles</p>
        )}
      </div>

      {/* Prix max par séance */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-bold text-gray-900">Prix max par séance</h3>
        <label className="flex items-center justify-between text-sm text-gray-600">
          <span>Budget max</span>
          <span className="font-semibold text-bordeaux-700">{maxPrice}&euro;</span>
        </label>
        <input
          type="range"
          min={0}
          max={300}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-2 w-full accent-bordeaux-700"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>0&euro;</span>
          <span>300&euro;</span>
        </div>
      </div>

      {/* Phototype accepté */}
      <div>
        <h3 className="mb-3 font-serif text-sm font-bold text-gray-900">Phototype accepté</h3>
        <div className="grid grid-cols-3 gap-2">
          {ALL_FITZPATRICK.map((type) => (
            <label
              key={type}
              className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedFitzpatrick.includes(type)
                  ? 'border-bordeaux-700 bg-bordeaux-700 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-bordeaux-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFitzpatrick.includes(type)}
                onChange={() => toggleFitzpatrick(type)}
                className="sr-only"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={resetFilters}
        className="w-full text-center text-sm text-bordeaux-700 underline underline-offset-2 transition-colors hover:text-bordeaux-500"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-creme">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Fil d'Ariane">
          <Link href="/" className="transition-colors hover:text-bordeaux-700">
            Accueil
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="font-medium text-gray-900">Résultats</span>
        </nav>

        {/* Header area */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl font-bold text-gray-900">
              {filteredCenters.length} centre{filteredCenters.length !== 1 ? 's' : ''} trouvé{filteredCenters.length !== 1 ? 's' : ''}
            </h1>
            {/* Mobile filter toggle */}
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-bordeaux-700 px-3 py-1.5 text-sm font-semibold text-bordeaux-700 transition-colors hover:bg-bordeaux-700 hover:text-white lg:hidden"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Filtres
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-gray-600">
              Trier par
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-bordeaux-500 focus:outline-none focus:ring-1 focus:ring-bordeaux-500"
            >
              <option value="pertinence">Pertinence</option>
              <option value="prix_asc">Prix croissant</option>
              <option value="prix_desc">Prix décroissant</option>
              <option value="mieux_notes">Mieux notés</option>
            </select>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-20 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-5 font-serif text-lg font-bold text-gray-900">Filtres</h2>
              {filterPanel}
            </div>
          </aside>

          {/* Mobile filter drawer overlay */}
          {filtersOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
          )}

          {/* Mobile filter drawer */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-[300px] max-w-[85vw] transform overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
              filtersOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-serif text-lg font-bold text-gray-900">Filtres</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-md p-1 text-gray-500 hover:text-gray-700"
                aria-label="Fermer les filtres"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              {filterPanel}
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="btn-bordeaux mt-6 w-full text-center"
              >
                Voir les résultats ({filteredCenters.length})
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {filteredCenters.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                <svg
                  className="mb-4 h-16 w-16 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <h2 className="mb-2 font-serif text-xl font-bold text-gray-900">
                  Aucun centre ne correspond à vos critères
                </h2>
                <p className="mb-6 max-w-md text-sm text-gray-500">
                  Essayez d&apos;élargir votre zone de recherche ou de modifier vos filtres pour
                  découvrir plus de centres.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-bordeaux"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              /* Cards grid */
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {filteredCenters.map((center) => (
                  <CenterCard key={center.id} center={center} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CenterCard({ center }: { center: Center }) {
  const minPrice = getMinPrice(center);
  const distance = getDistance(center);

  return (
    <div className="relative flex overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Left color bar */}
      <div className="w-1 shrink-0 bg-bordeaux-700" />

      <div className="flex flex-1 flex-col p-5">
        {/* Name + rating */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-gray-900">{center.name}</h3>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-sm font-semibold text-gray-900">{center.rating.toFixed(1)}</span>
            <StarIcon filled className="h-4 w-4" />
            <span className="text-xs text-gray-400">({center.reviewCount} avis)</span>
          </div>
        </div>

        {/* Address + distance */}
        <p className="mb-3 text-sm text-gray-500">
          {center.address}, {center.postalCode} {center.city}
          <span className="ml-2 inline-flex items-center gap-0.5 text-xs font-medium text-bordeaux-700">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            à {distance.toFixed(1)} km
          </span>
        </p>

        {/* Technologies */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {center.technologies.map((tech) => (
            <span key={tech} className="badge-bordeaux">
              {tech}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="mb-3 text-sm">
          <span className="font-mono text-lg font-bold text-bordeaux-700">
            À partir de {minPrice}&euro;
          </span>
          <span className="text-gray-500"> / séance</span>
        </p>

        {/* Next availability */}
        <div className="mb-4">
          <span className="badge-green">
            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Prochain créneau : {center.nextAvailability}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/centre/${center.slug}`}
          className="btn-bordeaux mt-auto block w-full text-center"
        >
          Voir les tarifs
        </Link>
      </div>
    </div>
  );
}
