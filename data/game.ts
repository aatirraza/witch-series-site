export type MatchLevel = {
  /** Pairs */
  p: number;
  /** Columns */
  c: number;
  /** Name */
  n: string;
};

export const MATCH_LEVELS: MatchLevel[] = [
  {
    "p": 6,
    "c": 4,
    "n": "Shelf one"
  },
  {
    "p": 8,
    "c": 4,
    "n": "Shelf two"
  },
  {
    "p": 12,
    "c": 6,
    "n": "Shelf three"
  }
];

/** Book keys left out of the match deck (duplicate covers). */
export const MATCH_EXCLUDE = ["c2"];

export const GAME = {
  kicker: "A game for readers of every age",
  title: { text: "The Book ", em: "Match" },
  lede: "Every one of L.S. Gagnon's books is hiding on this shelf, twice. Turn the covers two at a time and find every matching pair.",
  rules: [
    "Turn over any two cards.",
    "If the covers match, they stay face up.",
    "Find every pair to clear the shelf. Three shelves, from easy to hard.",
  ],
  shelvesLabel: "Shelves",
  cardsLabel: "Book cards",
  stats: { shelf: "Shelf", pairs: "Pairs", moves: "Moves", best: "Best", noBest: "–" },
  reset: "Start again",
  next: "Next shelf",
  cardBack: "LSG",
  levelLabel: (n: string, pairs: number, cleared: boolean) => `${n}, ${pairs} pairs${cleared ? ", cleared" : ""}`,
  cardLabel: (i: number, title: string | null, matched: boolean) =>
    `Card ${i + 1}${title ? ": " + title : ", face down"}${matched ? ", matched" : ""}`,
  start: "Turn over any two cards to begin.",
  pairFound: "Pair found: ",
  pairFrom: (series: string) => `, from ${series}. `,
  seeOnAmazon: "See it on Amazon",
  shelfCleared: "Shelf cleared. ",
  allCleared: "You cleared every shelf. ",
  seeAllBooks: "See all of L.S. Gagnon’s books",
  win: {
    kicker: (level: string) => `${level} cleared`,
    title: (last: boolean) => (last ? "The whole library, matched" : "Every pair found"),
    text: (pairs: number, moves: number, last: boolean) =>
      `You matched ${pairs} books in ${moves} moves.` +
      (last ? " Every one of them is waiting on the Books page." : " The next shelf has more books to find."),
    count: (first: boolean, best: number) => (first ? "First time clearing this shelf" : `Your best: ${best} moves`),
  },
};
