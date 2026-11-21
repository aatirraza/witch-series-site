import type { Rich } from "./home";

/** The banner at the top of each inner page. */
export type PageHead = {
  bg: string;
  crumb: string;
  title: Rich;
  lede: string;
};

export const CRUMB_HOME = "Home";

export const HEADS: Record<"books" | "cast" | "trailer" | "about" | "contact", PageHead> = {
  books: {
    bg: "/img/mood_a.jpg",
    crumb: "Books",
    title: { text: "The ", em: "library" },
    lede: "Sixteen books by L.S. Gagnon across four series, in paperback and Kindle.",
  },
  cast: {
    bg: "/img/mood_h.jpg",
    crumb: "The cast",
    title: { text: "Draw a card, ", em: "summon a soul" },
    lede: "Every character designed for the Witch: A New Beginning trailer. Spin the circle, then open a card to see the full character sheet.",
  },
  trailer: {
    bg: "/img/mood_d.jpg",
    crumb: "The trailer",
    title: { text: "The ", em: "trailer" },
    lede: "A 90-second cinematic trailer for Witch: A New Beginning, in production now.",
  },
  about: {
    bg: "/img/mood_f.jpg",
    crumb: "About",
    title: { text: "L.S. ", em: "Gagnon" },
    lede: "The author of The Witch Series, Thea the Little Witch, The Warlock Series and The Little Cowboy.",
  },
  contact: {
    bg: "/img/mood_e.jpg",
    crumb: "Contact",
    title: { text: "Send an ", em: "owl" },
    lede: "For book signings, school visits, interviews and events, write to L.S. Gagnon directly.",
  },
};

export const LIBRARY = {
  featured: {
    key: "w1",
    alt: "Cover of Witch: A New Beginning",
    kicker: "Start here · The Witch Series, book one",
    title: "Witch: A New Beginning",
    text: "Thea bakes cakes for Salem's tourists and hides behind loose clothes and tangled hair. Then her favourite author walks into the bakery, and three hundred years of memories begin to wake.",
    buy: { label: "Buy on Amazon", href: "https://www.amazon.com/Witch-New-Beginning-Book-ebook/dp/B014G0HFBG" },
    cast: { label: "Meet the cast", path: "/cast" },
  },
  tabsLabel: "Series",
  coverAlt: (title: string) => `Cover of ${title}`,
  buy: "Buy on Amazon",
  storesIntro: "Find all of L.S. Gagnon's books:",
  /** The store links under the shelf use slightly longer labels than elsewhere. */
  stores: [
    { label: "Amazon author page", href: "https://www.amazon.com/L.S.-Gagnon/e/B00Y1OT8PE" },
    {
      label: "Kindle",
      href: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Ddigital-text&field-keywords=l.s.+gagnon",
    },
    {
      label: "Barnes & Noble",
      href: "https://www.barnesandnoble.com/s/%22L.S.+Gagnon%22?Ns=P_Sales_Rank%7C0&Ntk=P_key_Contributor_List&Ntx=mode+matchall",
    },
  ],
};

export const ABOUT = {
  portrait: { src: "/img/b_au.jpg", width: 600, height: 670, alt: "L.S. Gagnon holding copies of The Witch Series" },
  kicker: "Her story",
  paragraphs: [
    "Originally from California, L.S. Gagnon made her home in Massachusetts, where a visit to Salem set The Witch Series in motion.",
    "She lives there with her husband and four dogs, and works as an executive and a pastry chef, which may be why Thea's bakery smells so real. Her dream is to write full-time.",
  ],
  facts: ["4 series", "16 books", "English and Spanish editions", "Massachusetts"],
  press: {
    kicker: "In the press",
    title: { text: "Stories ", em: "about her" } as Rich,
  },
};

export const CONTACT = {
  bookings: "Bookings and events",
  copy: "Copy email",
  copied: "Copied",
  selected: "Selected, press copy",
  follow: "Follow the series",
  buy: "Buy the books",
};
