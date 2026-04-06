import { Center, Review, Zone, Reservation, KCoinMovement, User } from '@/types';

export const allZones: Zone[] = [
  // Visage
  { id: 'visage-complet', name: 'Visage complet', category: 'visage', priceUnit: 80 },
  { id: 'levre-superieure', name: 'Lèvre supérieure', category: 'visage', priceUnit: 35 },
  { id: 'menton', name: 'Menton', category: 'visage', priceUnit: 40 },
  { id: 'joues', name: 'Joues', category: 'visage', priceUnit: 45 },
  { id: 'nuque', name: 'Nuque', category: 'visage', priceUnit: 50 },
  // Corps
  { id: 'aisselles', name: 'Aisselles', category: 'corps', priceUnit: 55 },
  { id: 'bras', name: 'Bras', category: 'corps', priceUnit: 90 },
  { id: 'dos', name: 'Dos', category: 'corps', priceUnit: 150 },
  { id: 'torse', name: 'Torse', category: 'corps', priceUnit: 140 },
  // Jambes
  { id: 'jambes-completes', name: 'Jambes complètes', category: 'jambes', priceUnit: 180 },
  { id: 'demi-jambes', name: 'Demi-jambes', category: 'jambes', priceUnit: 110 },
  { id: 'cuisses', name: 'Cuisses', category: 'jambes', priceUnit: 120 },
  { id: 'genoux', name: 'Genoux', category: 'jambes', priceUnit: 40 },
  { id: 'pieds', name: 'Pieds', category: 'jambes', priceUnit: 35 },
  // Zones intimes
  { id: 'maillot', name: 'Maillot', category: 'zones_intimes', priceUnit: 60 },
  { id: 'maillot-bresilien', name: 'Maillot brésilien', category: 'zones_intimes', priceUnit: 80 },
  { id: 'maillot-integral', name: 'Maillot intégral', category: 'zones_intimes', priceUnit: 100 },
];

export const mockCenters: Center[] = [
  {
    id: '1',
    name: 'Centre Laser Étoile',
    slug: 'centre-laser-etoile-paris',
    address: '45 Avenue des Champs-Élysées',
    city: 'Paris',
    postalCode: '75008',
    lat: 48.8698,
    lng: 2.3075,
    phone: '01 42 56 78 90',
    email: 'contact@laser-etoile.fr',
    rating: 4.9,
    reviewCount: 234,
    subRatings: { accueil: 4.8, proprete: 5.0, cadre: 4.9, qualite: 4.9 },
    technologies: ['Alexandrite', 'Diode', 'Nd:YAG'],
    fitzpatrickRange: ['I', 'II', 'III', 'IV', 'V', 'VI'],
    photos: ['/images/center-1.jpg', '/images/center-1b.jpg'],
    hours: [
      { day: 'Lundi', open: '09:00', close: '19:00' },
      { day: 'Mardi', open: '09:00', close: '19:00' },
      { day: 'Mercredi', open: '09:00', close: '19:00' },
      { day: 'Jeudi', open: '09:00', close: '20:00' },
      { day: 'Vendredi', open: '09:00', close: '19:00' },
      { day: 'Samedi', open: '10:00', close: '17:00' },
      { day: 'Dimanche', open: '', close: '', closed: true },
    ],
    zones: allZones,
    nextAvailability: 'Demain 14h00',
    description: 'Centre laser haut de gamme au cœur de Paris. Équipé des dernières technologies pour tous les phototypes. Notre équipe de médecins esthétiques vous accompagne pour des résultats optimaux.',
  },
  {
    id: '2',
    name: 'Clinique Lumière Lyon',
    slug: 'clinique-lumiere-lyon',
    address: '12 Rue de la République',
    city: 'Lyon',
    postalCode: '69002',
    lat: 45.7640,
    lng: 4.8357,
    phone: '04 78 12 34 56',
    email: 'contact@lumiere-lyon.fr',
    rating: 4.7,
    reviewCount: 189,
    subRatings: { accueil: 4.6, proprete: 4.8, cadre: 4.7, qualite: 4.8 },
    technologies: ['Diode', 'SHR'],
    fitzpatrickRange: ['I', 'II', 'III', 'IV'],
    photos: ['/images/center-2.jpg'],
    hours: [
      { day: 'Lundi', open: '08:30', close: '18:30' },
      { day: 'Mardi', open: '08:30', close: '18:30' },
      { day: 'Mercredi', open: '08:30', close: '18:30' },
      { day: 'Jeudi', open: '08:30', close: '18:30' },
      { day: 'Vendredi', open: '08:30', close: '18:30' },
      { day: 'Samedi', open: '09:00', close: '16:00' },
      { day: 'Dimanche', open: '', close: '', closed: true },
    ],
    zones: allZones.map(z => ({ ...z, priceUnit: Math.round(z.priceUnit * 0.85) })),
    nextAvailability: 'Mercredi 10h30',
    description: 'La Clinique Lumière propose des traitements d\'épilation laser de pointe dans un cadre moderne et accueillant au centre de Lyon.',
  },
  {
    id: '3',
    name: 'Institut Laser Bordeaux',
    slug: 'institut-laser-bordeaux',
    address: '8 Place des Quinconces',
    city: 'Bordeaux',
    postalCode: '33000',
    lat: 44.8465,
    lng: -0.5734,
    phone: '05 56 78 90 12',
    email: 'contact@laser-bordeaux.fr',
    rating: 4.8,
    reviewCount: 156,
    subRatings: { accueil: 4.9, proprete: 4.7, cadre: 4.8, qualite: 4.8 },
    technologies: ['Alexandrite', 'Nd:YAG', 'SHR'],
    fitzpatrickRange: ['I', 'II', 'III', 'IV', 'V'],
    photos: ['/images/center-3.jpg'],
    hours: [
      { day: 'Lundi', open: '09:00', close: '18:00' },
      { day: 'Mardi', open: '09:00', close: '18:00' },
      { day: 'Mercredi', open: '09:00', close: '18:00' },
      { day: 'Jeudi', open: '09:00', close: '19:00' },
      { day: 'Vendredi', open: '09:00', close: '18:00' },
      { day: 'Samedi', open: '09:30', close: '15:00' },
      { day: 'Dimanche', open: '', close: '', closed: true },
    ],
    zones: allZones.map(z => ({ ...z, priceUnit: Math.round(z.priceUnit * 0.90) })),
    nextAvailability: 'Jeudi 16h00',
    description: 'L\'Institut Laser Bordeaux combine expertise médicale et technologies de dernière génération pour une épilation définitive en toute sécurité.',
  },
  {
    id: '4',
    name: 'Laser & Beauté Marseille',
    slug: 'laser-beaute-marseille',
    address: '23 La Canebière',
    city: 'Marseille',
    postalCode: '13001',
    lat: 43.2965,
    lng: 5.3698,
    phone: '04 91 23 45 67',
    email: 'contact@laser-marseille.fr',
    rating: 4.6,
    reviewCount: 142,
    subRatings: { accueil: 4.5, proprete: 4.7, cadre: 4.5, qualite: 4.7 },
    technologies: ['Diode', 'Nd:YAG'],
    fitzpatrickRange: ['I', 'II', 'III', 'IV', 'V', 'VI'],
    photos: ['/images/center-4.jpg'],
    hours: [
      { day: 'Lundi', open: '09:00', close: '18:00' },
      { day: 'Mardi', open: '09:00', close: '18:00' },
      { day: 'Mercredi', open: '09:00', close: '18:00' },
      { day: 'Jeudi', open: '09:00', close: '18:00' },
      { day: 'Vendredi', open: '09:00', close: '18:00' },
      { day: 'Samedi', open: '10:00', close: '16:00' },
      { day: 'Dimanche', open: '', close: '', closed: true },
    ],
    zones: allZones.map(z => ({ ...z, priceUnit: Math.round(z.priceUnit * 0.80) })),
    nextAvailability: 'Vendredi 11h00',
    description: 'Spécialiste de l\'épilation laser pour tous les phototypes, y compris les peaux foncées. Technologies adaptées au climat méditerranéen.',
  },
  {
    id: '5',
    name: 'DermaLaser Toulouse',
    slug: 'dermalaser-toulouse',
    address: '5 Place du Capitole',
    city: 'Toulouse',
    postalCode: '31000',
    lat: 43.6047,
    lng: 1.4442,
    phone: '05 61 34 56 78',
    email: 'contact@dermalaser-toulouse.fr',
    rating: 4.8,
    reviewCount: 98,
    subRatings: { accueil: 4.9, proprete: 4.8, cadre: 4.7, qualite: 4.9 },
    technologies: ['Alexandrite', 'Diode', 'SHR'],
    fitzpatrickRange: ['I', 'II', 'III', 'IV'],
    photos: ['/images/center-5.jpg'],
    hours: [
      { day: 'Lundi', open: '08:00', close: '18:00' },
      { day: 'Mardi', open: '08:00', close: '18:00' },
      { day: 'Mercredi', open: '08:00', close: '18:00' },
      { day: 'Jeudi', open: '08:00', close: '19:00' },
      { day: 'Vendredi', open: '08:00', close: '18:00' },
      { day: 'Samedi', open: '09:00', close: '14:00' },
      { day: 'Dimanche', open: '', close: '', closed: true },
    ],
    zones: allZones.map(z => ({ ...z, priceUnit: Math.round(z.priceUnit * 0.88) })),
    nextAvailability: 'Lundi 09h30',
    description: 'DermaLaser Toulouse offre un environnement médical certifié avec des praticiens expérimentés pour une épilation laser durable.',
  },
  {
    id: '6',
    name: 'Centre Épilation Nantes',
    slug: 'centre-epilation-nantes',
    address: '18 Rue Crébillon',
    city: 'Nantes',
    postalCode: '44000',
    lat: 47.2133,
    lng: -1.5534,
    phone: '02 40 12 34 56',
    email: 'contact@epilation-nantes.fr',
    rating: 4.5,
    reviewCount: 76,
    subRatings: { accueil: 4.4, proprete: 4.6, cadre: 4.5, qualite: 4.5 },
    technologies: ['Diode', 'SHR'],
    fitzpatrickRange: ['I', 'II', 'III'],
    photos: ['/images/center-6.jpg'],
    hours: [
      { day: 'Lundi', open: '09:00', close: '18:00' },
      { day: 'Mardi', open: '09:00', close: '18:00' },
      { day: 'Mercredi', open: '09:00', close: '18:00' },
      { day: 'Jeudi', open: '09:00', close: '18:00' },
      { day: 'Vendredi', open: '09:00', close: '18:00' },
      { day: 'Samedi', open: '10:00', close: '15:00' },
      { day: 'Dimanche', open: '', close: '', closed: true },
    ],
    zones: allZones.map(z => ({ ...z, priceUnit: Math.round(z.priceUnit * 0.82) })),
    nextAvailability: 'Mardi 15h00',
    description: 'Un centre moderne et chaleureux à Nantes, spécialisé dans l\'épilation laser pour peaux claires à mates.',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1', centerId: '1', userName: 'Sophie M.', date: '2026-03-15', rating: 5,
    comment: 'Excellent centre ! L\'équipe est très professionnelle et les résultats sont visibles dès la 3ème séance. Je recommande vivement.',
    subRatings: { accueil: 5, proprete: 5, cadre: 5, qualite: 5 },
  },
  {
    id: 'r2', centerId: '1', userName: 'Marie L.', date: '2026-03-10', rating: 5,
    comment: 'Très satisfaite de mon pack jambes complètes. Le personnel est à l\'écoute et le cadre est très agréable.',
    subRatings: { accueil: 5, proprete: 5, cadre: 5, qualite: 4 },
  },
  {
    id: 'r3', centerId: '1', userName: 'Camille D.', date: '2026-02-28', rating: 4,
    comment: 'Bon rapport qualité-prix. Les séances sont rapides et efficaces. Seul bémol : les créneaux le samedi sont difficiles à obtenir.',
    subRatings: { accueil: 4, proprete: 5, cadre: 4, qualite: 5 },
  },
  {
    id: 'r4', centerId: '1', userName: 'Léa R.', date: '2026-02-20', rating: 5,
    comment: 'J\'ai fait le maillot intégral et les aisselles. Résultats impressionnants après 5 séances. Aucune douleur grâce à la technologie Diode.',
    subRatings: { accueil: 5, proprete: 5, cadre: 5, qualite: 5 },
  },
  {
    id: 'r5', centerId: '2', userName: 'Julie B.', date: '2026-03-12', rating: 4,
    comment: 'Très bon centre à Lyon. Les prix sont corrects et les résultats au rendez-vous.',
    subRatings: { accueil: 4, proprete: 5, cadre: 4, qualite: 5 },
  },
  {
    id: 'r6', centerId: '2', userName: 'Emma G.', date: '2026-03-01', rating: 5,
    comment: 'Personnel adorable et résultats visibles rapidement. Je suis à ma 6ème séance et c\'est quasi terminé !',
    subRatings: { accueil: 5, proprete: 5, cadre: 5, qualite: 5 },
  },
  {
    id: 'r7', centerId: '3', userName: 'Inès K.', date: '2026-03-08', rating: 5,
    comment: 'Le meilleur centre laser de Bordeaux ! Cadre magnifique et équipe au top.',
    subRatings: { accueil: 5, proprete: 5, cadre: 5, qualite: 5 },
  },
  {
    id: 'r8', centerId: '3', userName: 'Clara V.', date: '2026-02-15', rating: 4,
    comment: 'Bonne expérience globale. Le pack 6+2 est vraiment avantageux.',
    subRatings: { accueil: 5, proprete: 4, cadre: 5, qualite: 4 },
  },
];

export const mockReservations: Reservation[] = [
  {
    id: 'res1', centerId: '1', centerName: 'Centre Laser Étoile',
    zones: [
      { name: 'Jambes complètes', packLabel: 'Pack 6+2', sessionsUsed: 3, sessionsTotal: 8 },
      { name: 'Aisselles', packLabel: 'Pack 4+1', sessionsUsed: 3, sessionsTotal: 5 },
    ],
    date: '2026-04-15', time: '14:00', status: 'upcoming', totalPaid: 1285,
  },
  {
    id: 'res2', centerId: '1', centerName: 'Centre Laser Étoile',
    zones: [
      { name: 'Maillot brésilien', packLabel: 'Pack 4+1', sessionsUsed: 4, sessionsTotal: 5 },
    ],
    date: '2026-03-20', time: '10:30', status: 'completed', totalPaid: 256,
  },
  {
    id: 'res3', centerId: '2', centerName: 'Clinique Lumière Lyon',
    zones: [
      { name: 'Lèvre supérieure', packLabel: 'Unitaire', sessionsUsed: 1, sessionsTotal: 1 },
    ],
    date: '2026-02-10', time: '16:00', status: 'completed', totalPaid: 30,
  },
];

export const mockKCoinHistory: KCoinMovement[] = [
  { id: 'k1', type: 'inscription', amount: 10, date: '2026-01-15', description: 'Bonus inscription' },
  { id: 'k2', type: 'parrainage', amount: 10, date: '2026-02-01', description: 'Parrainage de Marie L.' },
  { id: 'k3', type: 'utilisation', amount: -10, date: '2026-02-10', description: 'Réservation #res3' },
  { id: 'k4', type: 'parrainage', amount: 10, date: '2026-03-05', description: 'Parrainage de Julie B.' },
];

export const mockUser: User = {
  id: 'u1',
  name: 'Sophie Martin',
  email: 'sophie.martin@email.com',
  fitzpatrick: 'II',
  kcoins: 20,
  referralCode: 'SOPHIE2026',
  reservations: mockReservations,
  kcoinHistory: mockKCoinHistory,
};

export function calculatePack(priceUnit: number, type: 'unit' | 'pack4' | 'pack6') {
  switch (type) {
    case 'unit':
      return { sessions: 1, discount: 0, pricePerSession: priceUnit, totalPrice: priceUnit };
    case 'pack4':
      const p4 = Math.round(priceUnit * 0.80);
      return { sessions: 5, discount: 20, pricePerSession: p4, totalPrice: p4 * 5 };
    case 'pack6':
      const p6 = Math.round(priceUnit * 0.75);
      return { sessions: 8, discount: 25, pricePerSession: p6, totalPrice: p6 * 8 };
  }
}

export function getCenterBySlug(slug: string): Center | undefined {
  return mockCenters.find(c => c.slug === slug);
}

export function getCenterById(id: string): Center | undefined {
  return mockCenters.find(c => c.id === id);
}

export function getReviewsForCenter(centerId: string): Review[] {
  return mockReviews.filter(r => r.centerId === centerId);
}
