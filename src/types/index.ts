export type LaserTechnology = 'Alexandrite' | 'Diode' | 'Nd:YAG' | 'SHR';

export type FitzpatrickType = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

export type TreatmentType = 'laser' | 'electrique';

export type ZoneCategory = 'visage' | 'corps' | 'jambes' | 'zones_intimes';

export interface Zone {
  id: string;
  name: string;
  category: ZoneCategory;
  priceUnit: number;
}

export interface Pack {
  type: 'unit' | 'pack4' | 'pack6';
  label: string;
  sessions: number;
  discount: number;
  pricePerSession: number;
  totalPrice: number;
}

export interface Center {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  subRatings: {
    accueil: number;
    proprete: number;
    cadre: number;
    qualite: number;
  };
  technologies: LaserTechnology[];
  fitzpatrickRange: FitzpatrickType[];
  photos: string[];
  hours: { day: string; open: string; close: string; closed?: boolean }[];
  zones: Zone[];
  nextAvailability: string;
  description: string;
}

export interface Review {
  id: string;
  centerId: string;
  userName: string;
  date: string;
  rating: number;
  comment: string;
  subRatings: {
    accueil: number;
    proprete: number;
    cadre: number;
    qualite: number;
  };
}

export interface CartItem {
  zone: Zone;
  packType: 'unit' | 'pack4' | 'pack6';
  sessions: number;
  pricePerSession: number;
  totalPrice: number;
  discount: number;
}

export interface KCoinMovement {
  id: string;
  type: 'inscription' | 'parrainage' | 'utilisation' | 'expiration';
  amount: number;
  date: string;
  description: string;
}

export interface Reservation {
  id: string;
  centerId: string;
  centerName: string;
  zones: { name: string; packLabel: string; sessionsUsed: number; sessionsTotal: number }[];
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalPaid: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  fitzpatrick?: FitzpatrickType;
  kcoins: number;
  referralCode: string;
  reservations: Reservation[];
  kcoinHistory: KCoinMovement[];
}
