import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bordeaux-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="font-serif text-2xl font-bold text-white">
              Kookla
            </Link>
            <p className="mt-3 text-sm text-gray-300">
              La marketplace de l&apos;épilation laser en France. Comparez, réservez et payez en ligne.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/resultats" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Trouver un centre
                </Link>
              </li>
              <li>
                <Link href="/comment-ca-marche" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

          {/* Professionnels */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400">
              Professionnels
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/centre" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Rejoindre Kookla
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Espace centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-gray-400">
              Légal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-sm text-gray-300 hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Kookla. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
