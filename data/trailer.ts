import type { Rich } from "./home";

export const TRAILER = {
  worlds: {
    kicker: "Colour and light",
    title: { text: "Six worlds of ", em: "colour and light" } as Rich,
    lede: "The trailer moves through six colour worlds, and the shift between them tells the audience where they are: safe, enchanted, erased, hunted or burning. Open one to let its light fall across the page.",
  },
  mood: {
    kicker: "Look and feel",
    title: { text: "The world of ", em: "the film" } as Rich,
  },
};

export type MoodTile = {
  /** grid-area letter */
  area: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  objectPosition?: string;
  credit?: string;
};

/** In the original's DOM order. */
export const MOOD: MoodTile[] = [
  { area: "a", src: "/img/mood_a.jpg", width: 715, height: 1000, alt: "An autumn cemetery path covered in orange leaves", caption: "Salem in the fall" },
  { area: "b", src: "/img/mood_b.jpg", width: 672, height: 1000, alt: "Old stone streets in fog under lamplight", caption: "Fog and lamplight" },
  { area: "c", src: "/img/mood_c.jpg", width: 736, height: 547, alt: "Puritan women standing in a circle, seen from above", caption: "The 1600s, watching" },
  { area: "d", src: "/img/mood_d.jpg", width: 500, height: 371, alt: "Figures dancing around a bonfire at night", caption: "Fire and ritual" },
  {
    area: "g",
    src: "/img/mood_g.jpg",
    width: 563,
    height: 1000,
    alt: "Black skirt and buckled combat boots among pumpkins",
    caption: "Thea's boots",
    objectPosition: "center 30%",
    credit: "Photo: Vasilina Sokolova",
  },
  { area: "h", src: "/img/mood_h.jpg", width: 735, height: 676, alt: "A reader inside a ring of candles", caption: "Candlelit magic" },
  { area: "i", src: "/img/mood_i.jpg", width: 668, height: 1000, alt: "A woman in a 17th-century dress walking toward a dark forest", caption: "Alone in the woods" },
  { area: "f", src: "/img/mood_f.jpg", width: 564, height: 728, alt: "An Entering Salem road sign at the edge of the woods", caption: "Arriving in Salem" },
  { area: "e", src: "/img/mood_e.jpg", width: 736, height: 981, alt: "A lantern-lit Salem sign with pumpkins", caption: "Witch season" },
];
