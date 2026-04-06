'use client';

import { useState, useCallback } from 'react';

interface Zone {
  id: string;
  label: string;
  /** SVG element type for the clickable hotspot */
  shape: 'ellipse' | 'rect' | 'path';
  attrs: Record<string, string | number>;
}

interface SilhouetteSelectorProps {
  selectedZones: string[];
  onToggleZone: (zoneId: string) => void;
  className?: string;
}

const ZONES: Zone[] = [
  // --- Face area ---
  {
    id: 'visage-complet',
    label: 'Visage complet',
    shape: 'ellipse',
    attrs: { cx: 100, cy: 42, rx: 18, ry: 22 },
  },
  {
    id: 'levre-superieure',
    label: 'Lèvre supérieure',
    shape: 'rect',
    attrs: { x: 93, y: 46, width: 14, height: 5, rx: 2 },
  },
  {
    id: 'menton',
    label: 'Menton',
    shape: 'ellipse',
    attrs: { cx: 100, cy: 60, rx: 10, ry: 5 },
  },
  {
    id: 'joues',
    label: 'Joues',
    shape: 'ellipse',
    attrs: { cx: 100, cy: 40, rx: 17, ry: 12 },
  },
  // --- Neck ---
  {
    id: 'nuque',
    label: 'Nuque',
    shape: 'rect',
    attrs: { x: 91, y: 64, width: 18, height: 12, rx: 4 },
  },
  // --- Upper body ---
  {
    id: 'aisselles',
    label: 'Aisselles',
    shape: 'ellipse',
    attrs: { cx: 100, cy: 112, rx: 38, ry: 8 },
  },
  {
    id: 'torse',
    label: 'Torse',
    shape: 'rect',
    attrs: { x: 72, y: 100, width: 56, height: 60, rx: 8 },
  },
  {
    id: 'dos',
    label: 'Dos',
    shape: 'rect',
    attrs: { x: 72, y: 100, width: 56, height: 80, rx: 6 },
  },
  // --- Arms ---
  {
    id: 'bras',
    label: 'Bras',
    shape: 'path',
    attrs: {
      d: [
        // Left arm
        'M 62,108 Q 46,140 42,190 Q 40,200 36,210',
        'L 42,212 Q 48,200 50,190 Q 54,150 68,116 Z',
        // Right arm
        'M 138,108 Q 154,140 158,190 Q 160,200 164,210',
        'L 158,212 Q 152,200 150,190 Q 146,150 132,116 Z',
      ].join(' '),
    },
  },
  // --- Bikini variants ---
  {
    id: 'maillot',
    label: 'Maillot classique',
    shape: 'path',
    attrs: {
      d: 'M 84,195 Q 88,190 100,188 Q 112,190 116,195 L 114,210 Q 108,214 100,215 Q 92,214 86,210 Z',
    },
  },
  {
    id: 'maillot-bresilien',
    label: 'Maillot brésilien',
    shape: 'path',
    attrs: {
      d: 'M 86,192 Q 92,187 100,185 Q 108,187 114,192 L 112,214 Q 106,218 100,219 Q 94,218 88,214 Z',
    },
  },
  {
    id: 'maillot-integral',
    label: 'Maillot intégral',
    shape: 'path',
    attrs: {
      d: 'M 82,190 Q 90,182 100,180 Q 110,182 118,190 L 116,218 Q 108,224 100,225 Q 92,224 84,218 Z',
    },
  },
  // --- Legs ---
  {
    id: 'cuisses',
    label: 'Cuisses',
    shape: 'path',
    attrs: {
      d: [
        // Left thigh
        'M 78,220 Q 74,250 72,290 L 82,290 Q 84,250 88,220 Z',
        // Right thigh
        'M 122,220 Q 126,250 128,290 L 118,290 Q 116,250 112,220 Z',
      ].join(' '),
    },
  },
  {
    id: 'genoux',
    label: 'Genoux',
    shape: 'ellipse',
    attrs: { cx: 100, cy: 308, rx: 30, ry: 12 },
  },
  {
    id: 'demi-jambes',
    label: 'Demi-jambes',
    shape: 'path',
    attrs: {
      d: [
        // Left lower leg
        'M 72,320 Q 70,360 68,400 L 78,400 Q 80,360 82,320 Z',
        // Right lower leg
        'M 128,320 Q 130,360 132,400 L 122,400 Q 120,360 118,320 Z',
      ].join(' '),
    },
  },
  {
    id: 'jambes-completes',
    label: 'Jambes complètes',
    shape: 'path',
    attrs: {
      d: [
        // Left full leg
        'M 78,215 Q 72,280 70,340 Q 68,380 66,410',
        'L 80,410 Q 82,380 84,340 Q 86,280 88,215 Z',
        // Right full leg
        'M 122,215 Q 128,280 130,340 Q 132,380 134,410',
        'L 120,410 Q 118,380 116,340 Q 114,280 112,215 Z',
      ].join(' '),
    },
  },
  // --- Feet ---
  {
    id: 'pieds',
    label: 'Pieds',
    shape: 'path',
    attrs: {
      d: [
        // Left foot
        'M 66,410 Q 62,420 58,430 Q 56,436 60,438 L 80,438 Q 84,436 82,430 Q 80,420 80,410 Z',
        // Right foot
        'M 120,410 Q 116,420 118,430 Q 116,436 120,438 L 140,438 Q 144,436 142,430 Q 140,420 134,410 Z',
      ].join(' '),
    },
  },
];

/** Minimalist female silhouette outline (front view) */
const BODY_OUTLINE_PATH = [
  // Head
  'M 100,18',
  'Q 120,18 122,38',
  'Q 124,55 118,62',
  // Neck
  'Q 114,68 112,72',
  'L 112,78',
  // Right shoulder
  'Q 130,82 140,96',
  // Right arm
  'Q 150,112 156,150',
  'Q 160,180 164,210',
  // Right hand
  'Q 166,220 162,226',
  'Q 158,230 154,224',
  'Q 148,200 144,180',
  'Q 140,155 136,140',
  // Right torso
  'Q 132,160 130,180',
  'Q 128,200 126,215',
  // Right leg
  'Q 130,260 132,300',
  'Q 134,340 136,380',
  'Q 138,400 136,415',
  // Right foot
  'Q 136,425 142,436',
  'Q 144,440 140,442',
  'L 118,442',
  'Q 114,440 116,430',
  'Q 118,420 120,415',
  // Between legs
  'Q 118,400 114,380',
  'Q 108,340 100,320',
  'Q 92,340 86,380',
  'Q 82,400 80,415',
  // Left foot
  'Q 82,420 84,430',
  'Q 86,440 82,442',
  'L 60,442',
  'Q 56,440 58,436',
  'Q 64,425 64,415',
  // Left leg
  'Q 62,400 66,380',
  'Q 68,340 70,300',
  'Q 72,260 74,215',
  // Left torso
  'Q 72,200 70,180',
  'Q 68,155 64,140',
  // Left arm
  'Q 60,155 52,180',
  'Q 48,200 46,224',
  'Q 42,230 38,226',
  'Q 34,220 36,210',
  'Q 40,180 44,150',
  'Q 50,112 60,96',
  // Left shoulder
  'Q 70,82 88,78',
  'L 88,72',
  // Back to neck and head
  'Q 86,68 82,62',
  'Q 76,55 78,38',
  'Q 80,18 100,18',
  'Z',
].join(' ');

function ZoneShape({
  zone,
  isSelected,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  zone: Zone;
  isSelected: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const fill = isSelected ? '#8B2635' : 'transparent';
  const fillOpacity = isSelected ? 0.3 : 0;
  const stroke = isHovered && !isSelected ? '#9ca3af' : 'transparent';
  const strokeWidth = isHovered && !isSelected ? 0.8 : 0;

  const common = {
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    className: 'cursor-pointer transition-all duration-200',
    onMouseEnter,
    onMouseLeave,
    onClick,
    role: 'button' as const,
    'aria-label': zone.label,
    'aria-pressed': isSelected,
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
  };

  if (zone.shape === 'ellipse') {
    return <ellipse {...common} {...(zone.attrs as Record<string, string | number>)} />;
  }
  if (zone.shape === 'rect') {
    return <rect {...common} {...(zone.attrs as Record<string, string | number>)} />;
  }
  return <path {...common} {...(zone.attrs as Record<string, string | number>)} />;
}

export default function SilhouetteSelector({
  selectedZones,
  onToggleZone,
  className = '',
}: SilhouetteSelectorProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!hoveredZone) return;
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [hoveredZone]
  );

  const hoveredLabel = ZONES.find((z) => z.id === hoveredZone)?.label ?? '';

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 200 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
      >
        {/* Body outline */}
        <path
          d={BODY_OUTLINE_PATH}
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Subtle body fill for depth */}
        <path d={BODY_OUTLINE_PATH} fill="#f9fafb" fillOpacity="0.5" />

        {/* Clickable zone hotspots */}
        {ZONES.map((zone) => (
          <ZoneShape
            key={zone.id}
            zone={zone}
            isSelected={selectedZones.includes(zone.id)}
            isHovered={hoveredZone === zone.id}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
            onClick={() => onToggleZone(zone.id)}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredZone && (
        <div
          className="pointer-events-none absolute z-10 rounded-md bg-[#8B2635] px-2.5 py-1 text-xs font-medium text-white shadow-md whitespace-nowrap transition-opacity duration-150"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 32,
            transform: 'translateX(-50%)',
          }}
        >
          {hoveredLabel}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#8B2635]" />
        </div>
      )}
    </div>
  );
}
