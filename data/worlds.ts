export type World = {
  /** Name */
  n: string;
  /** Where it appears in the trailer */
  w: string;
  /** Feel */
  f: string;
  /** Swatches */
  sw: string[];
  /** RGB triplet for --glow */
  glow: string;
  /** Ember palette */
  em: string[];
  /** Card background */
  bg: string;
};

export const WORLDS: World[] = [
  {
    "n": "Ember Black",
    "w": "Cold open, title, end card",
    "f": "Near-monochrome, with one sliver of firelight.",
    "sw": [
      "#0B0A0A",
      "#2A2624",
      "#6B6460",
      "#C2410C",
      "#F59E0B"
    ],
    "glow": "245,158,11",
    "em": [
      "#F59E0B",
      "#EA580C",
      "#FDE68A"
    ],
    "bg": "radial-gradient(60% 60% at 50% 100%,#C2410C,#2A2624 55%,#0B0A0A)"
  },
  {
    "n": "Salem Autumn",
    "w": "The ordinary world",
    "f": "Warm, natural and safe; honey light through windows.",
    "sw": [
      "#8C4A1F",
      "#D98E32",
      "#E8C590",
      "#F3E6D0",
      "#4A5A3C"
    ],
    "glow": "217,142,50",
    "em": [
      "#D98E32",
      "#E8C590",
      "#8C4A1F"
    ],
    "bg": "radial-gradient(70% 60% at 70% 20%,#E8C590,#D98E32 40%,#8C4A1F 75%,#4A5A3C)"
  },
  {
    "n": "Crystal & Memory",
    "w": "The magic wakes",
    "f": "Green-gold and bioluminescent; memories drift in deep blue.",
    "sw": [
      "#0E3B2E",
      "#2FBF71",
      "#E3B341",
      "#3A7BD5",
      "#6D5BFF"
    ],
    "glow": "47,191,113",
    "em": [
      "#2FBF71",
      "#E3B341",
      "#3A7BD5"
    ],
    "bg": "radial-gradient(40% 40% at 50% 45%,#2FBF71,#0E3B2E 60%),linear-gradient(0deg,#3A7BD5 0%,transparent 40%)"
  },
  {
    "n": "The Erased Past",
    "w": "Delia, the 1600s, the erasure",
    "f": "Cold blue night lit by candles; the past fades to sepia.",
    "sw": [
      "#0D1B2A",
      "#1B3A57",
      "#A9B7C1",
      "#F2A65A",
      "#7A6A55"
    ],
    "glow": "110,160,215",
    "em": [
      "#A9B7C1",
      "#3A7BD5",
      "#F2A65A"
    ],
    "bg": "radial-gradient(14% 14% at 30% 60%,#F2A65A,transparent),radial-gradient(12% 12% at 70% 55%,#F2A65A,transparent),linear-gradient(180deg,#1B3A57,#0D1B2A)"
  },
  {
    "n": "The Hunt",
    "w": "Montage peak, the council",
    "f": "Hard red and black, symmetrical, with gold sparks.",
    "sw": [
      "#0A0A0A",
      "#3B0A0A",
      "#8B1A1A",
      "#B45309",
      "#D4AF37"
    ],
    "glow": "200,50,35",
    "em": [
      "#D4AF37",
      "#8B1A1A",
      "#B45309"
    ],
    "bg": "linear-gradient(90deg,#0A0A0A,#3B0A0A 30%,#8B1A1A 50%,#3B0A0A 70%,#0A0A0A)"
  },
  {
    "n": "The Reckoning",
    "w": "The drop, the cliffhanger, the title",
    "f": "Black and fire only, lit by a single source.",
    "sw": [
      "#050505",
      "#1C2733",
      "#7C2D12",
      "#EA580C",
      "#FDE68A"
    ],
    "glow": "234,88,12",
    "em": [
      "#EA580C",
      "#FDE68A",
      "#7C2D12"
    ],
    "bg": "radial-gradient(circle at 50% 45%,transparent 18%,#EA580C 21%,#7C2D12 26%,transparent 34%),linear-gradient(#1C2733,#050505)"
  }
];
