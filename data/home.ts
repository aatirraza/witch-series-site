/** A heading with an italic flame-coloured ending: `text` then `<em>em</em>`. */
export type Rich = { text: string; em: string };

export const DOOR = {
  label: "Open the door to the world of Witch: A New Beginning",
  over: "The books of",
  name: { text: "L.S. ", em: "Gagnon" } as Rich,
  sealText: "IT WAS A DAY · IT WAS AN HOUR · IT WAS EVERYTHING ·",
  sealMark: "LSG",
  /** Symbol rows on each door leaf: [top, bottom]. */
  runes: {
    l: ["✦ ☽ ✶ ☉ ✦", "✧ ☾ ✷ ✦ ✧"],
    r: ["✦ ☉ ✶ ☽ ✦", "✧ ✦ ✷ ☾ ✧"],
  },
  button: "Open the door",
  small: "Sixteen books are waiting for you",
  reclose: "Close the door",
};

export const HERO = {
  kicker: "Author · Pastry chef · Storyteller",
  name: "L.S. Gagnon",
  sub: "Four series, sixteen books",
  lede: "From Salem's witches and warlocks to a little witch and a little cowboy for the youngest readers, L.S. Gagnon has built four worlds one book at a time, in English and in Spanish.",
  primary: { label: "Explore the library", path: "/books" },
  secondary: { label: "Her story", path: "/about" },
  hintBold: "Move your light",
  hint: " across the street to see what Salem forgot.",
  circleText:
    "The Witch Series · Thea the Little Witch · The Warlock Series · The Little Cowboy · L.S. Gagnon ·",
  coverAlt: (title: string) => `Cover of ${title} by L.S. Gagnon`,
  badgeBold: "16 books",
  badge: "4 series · English and Spanish",
};

export const PROUD = {
  kicker: "A body of work",
  title: { text: "Sixteen books. ", em: "Every one of them hers." } as Rich,
  lede: "Written around full working days as an executive and a pastry chef, with four dogs at her feet. This is what she has built.",
  stats: [
    { n: 16, label: "Books published", small: "From picture books to dark fantasy" },
    { n: 4, label: "Series", small: "Two for older readers, two for the youngest" },
    { n: 2, label: "Languages", small: "English and Spanish editions" },
    { n: 1, label: "Film trailer", small: "Witch: A New Beginning, on screen" },
  ],
};

export const AWARDS = {
  kicker: "Award-winning author",
  title: { text: "Three awards. ", em: "A long road to every one." } as Rich,
  quote: "“Cruel words only serve as fuel.”",
  quoteBy: "— L.S. Gagnon",
  items: [
    {
      img: "/img/award_acci.png",
      alt: "Winner, Authors Connect Community International (ACCI) award seal",
      b: "Winner",
      name: "Authors Connect Community International",
    },
    {
      img: "/img/award_impact.png",
      alt: "Winner, International Impact Book Awards seal",
      b: "Winner",
      name: "International Impact Book Awards",
    },
    {
      img: "/img/award_bookfest.png",
      alt: "The BookFest Award Winner seal",
      b: "Award Winner",
      name: "The BookFest",
    },
  ],
};

export const WORLDS_BLOCK = {
  kicker: "Her worlds",
  title: { text: "Four worlds, ", em: "one storyteller" } as Rich,
  lede: "Witches and warlocks for older readers, and picture books for the youngest ones. Choose a world to see every book in it.",
};

export const JOURNEY = {
  kicker: "Her journey",
  title: { text: "How she ", em: "got here" } as Rich,
  chapters: [
    { b: "California", p: "Where her story starts." },
    { b: "Massachusetts", p: "Where she made her home, with her husband and four dogs." },
    { b: "One visit to Salem", p: "The trip that set The Witch Series in motion." },
    { b: "Sixteen books", p: "Four series for readers of every age, in English and in Spanish." },
    { b: "On screen", p: "Witch: A New Beginning becomes a cinematic film trailer." },
  ],
  pressBefore: "Her story has been featured in ",
  pressBetween: " and ",
  pressAfter: ".",
};

export const FILM = {
  kicker: "Now becoming a film",
  title: { text: "Witch: A New Beginning, ", em: "on screen" } as Rich,
  lede: "Her first Witch book is being made into a 90-second cinematic trailer, with sixteen characters designed from the pages of the book.",
  primary: { label: "Meet the cast", path: "/cast" },
  secondary: { label: "The look of the trailer", path: "/trailer" },
  /** Indexes into CAST shown in the fan. */
  fan: [0, 1, 2, 3, 4],
};

export const BANNERS = [
  {
    path: "/descent",
    bg: "/d/stake.jpg",
    kicker: "The Descent",
    title: { text: "Follow Thea's memories ", em: "back to 1692" } as Rich,
    lede: "An interactive journey through the world of the Witch Series: three threads, sixteen places, fifteen lost memories.",
    button: "Begin the descent",
  },
  {
    path: "/play",
    bg: "/d/bakery.jpg",
    kicker: "Play",
    title: { text: "The Book ", em: "Match" } as Rich,
    lede: "Turn the covers and find every matching pair of L.S. Gagnon's books. Three shelves, for readers of every age.",
    button: "Play the game",
  },
];

export const AUTHOR_BLOCK = {
  img: "/img/b_au.jpg",
  width: 600,
  height: 670,
  alt: "L.S. Gagnon holding copies of her books",
  kicker: "The author",
  title: { text: "L.S. ", em: "Gagnon" } as Rich,
  lede: "A Massachusetts author, executive and pastry chef with sixteen books to her name, and readers from the youngest to the oldest.",
  links: [
    { label: "Read her story", path: "/about" },
    { label: "Book an event", path: "/contact" },
  ],
};

export const SERIES_COUNT = (n: number) => `${n} ${n > 1 ? "books" : "book"}`;
