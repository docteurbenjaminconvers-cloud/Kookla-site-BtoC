'use client';

const myReviews = [
  {
    id: '1',
    centerName: 'Centre Laser Étoile',
    date: '2026-03-15',
    rating: 5,
    comment: 'Excellent centre ! L\'équipe est très professionnelle et les résultats sont visibles dès la 3ème séance.',
  },
  {
    id: '2',
    centerName: 'Clinique Lumière Lyon',
    date: '2026-02-10',
    rating: 4,
    comment: 'Très bon centre à Lyon. Les prix sont corrects et les résultats au rendez-vous.',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function AvisPage() {
  return (
    <div>
      <h2 className="font-serif text-xl text-bordeaux-700 mb-6">Mes avis</h2>

      <div className="space-y-4">
        {myReviews.map(review => (
          <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{review.centerName}</h3>
                <div className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold mb-2">Réservations sans avis</h3>
        <p className="text-sm text-gray-500 mb-4">Partagez votre expérience pour aider d&apos;autres clientes</p>
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Centre Laser Étoile</div>
            <div className="text-xs text-gray-500">Séance du 20 mars 2026</div>
          </div>
          <button className="btn-bordeaux text-sm py-2 px-4">Laisser un avis</button>
        </div>
      </div>
    </div>
  );
}
