'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/rechercher', label: 'Trouver un centre' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-2xl font-bold text-bordeaux-700">
              Kookla
            </span>
            <span className="hidden text-[10px] font-sans text-gray-500 sm:block">
              The Operating System for Aesthetics
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-gray-700 transition-colors hover:text-bordeaux-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/connexion"
              className="font-sans text-sm text-gray-700 transition-colors hover:text-bordeaux-700"
            >
              Connexion
            </Link>
            <Link
              href="/reserver"
              className="inline-flex items-center rounded-lg bg-bordeaux-700 px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-bordeaux-800"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile slide-in drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="font-serif text-xl font-bold text-bordeaux-700">
            Kookla
          </span>
          <button
            type="button"
            className="rounded-md p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 font-sans text-sm text-gray-700 transition-colors hover:bg-creme hover:text-bordeaux-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <hr className="my-3 border-gray-200" />

          <Link
            href="/connexion"
            className="rounded-md px-3 py-2 font-sans text-sm text-gray-700 transition-colors hover:bg-creme hover:text-bordeaux-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Connexion
          </Link>

          <Link
            href="/reserver"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-bordeaux-700 px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-bordeaux-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Réserver
          </Link>
        </nav>
      </div>
    </header>
  );
}
