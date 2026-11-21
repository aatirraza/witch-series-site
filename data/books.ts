export type Book = {
  title: string;
  /** Cover file: /img/b_<key>.jpg */
  key: string;
  url: string;
  /** Extra text after the series name, e.g. " (Spanish edition)" */
  suffix?: string;
};

export type Series = {
  name: string;
  blurb: string;
  books: Book[];
};

export const SERIES: Series[] = [
  {
    "name": "The Witch Series",
    "blurb": "Witches, warlocks and three hundred years of secrets in modern-day Salem.",
    "books": [
      {
        "title": "Witch: A New Beginning",
        "key": "w1",
        "url": "https://www.amazon.com/Witch-New-Beginning-Book-ebook/dp/B014G0HFBG"
      },
      {
        "title": "Witch: The Spell Within",
        "key": "w2",
        "url": "https://www.amazon.com/Witch-Spell-Within-Book-ebook/dp/B014G0HAH0"
      },
      {
        "title": "Witch: The Secret of the Leaves",
        "key": "w3",
        "url": "https://www.amazon.com/Witch-Secret-Leaves-3/dp/0996230548"
      },
      {
        "title": "Witch: The Final Chapter",
        "key": "w4",
        "url": "https://www.amazon.com/Witch-Final-Chapter-Book-ebook/dp/B014RGHG54"
      }
    ]
  },
  {
    "name": "Thea the Little Witch",
    "blurb": "Picture books about a little witch learning to believe, share and be brave.",
    "books": [
      {
        "title": "Into the Forest",
        "key": "l1",
        "url": "https://www.amazon.com/Thea-Little-Witch-Into-Forest/dp/0996230599"
      },
      {
        "title": "The Search for Santa",
        "key": "l2",
        "url": "https://www.amazon.com/Search-Santa-Thea-Little-Witch/dp/0996770747"
      },
      {
        "title": "The Power of Believing",
        "key": "l3",
        "url": "https://www.amazon.com/Thea-Little-Witch-Power-Believing/dp/0996770704"
      },
      {
        "title": "Thea Goes to School",
        "key": "l4",
        "url": "https://www.amazon.com/Thea-Goes-School-Little-Witch/dp/0996770712"
      },
      {
        "title": "The Meaning of Sharing",
        "key": "l5",
        "url": "https://www.amazon.com/Meaning-Sharing-Thea-Little-Witch/dp/0996770720"
      },
      {
        "title": "The Search for Coco",
        "key": "l6",
        "url": "https://a.co/d/ahOCXDn"
      }
    ]
  },
  {
    "name": "The Warlock Series",
    "blurb": "Darker tales from the same world of witches and warlocks.",
    "books": [
      {
        "title": "Warlock: Descension into Darkness",
        "key": "k1",
        "url": "http://www.amazon.com/Warlock-Descension-Into-Darkness/dp/0996770739"
      },
      {
        "title": "Warlock: Three Days in Hell",
        "key": "k2",
        "url": "https://a.co/d/6kD5fm8"
      },
      {
        "title": "Warlock: The Darkness of Pain",
        "key": "k3",
        "url": "https://a.co/d/6UpA35Q"
      },
      {
        "title": "Warlock: The Keeper of the Gates",
        "key": "k4",
        "url": "https://www.amazon.com/gp/product/099677078X"
      }
    ]
  },
  {
    "name": "The Little Cowboy",
    "blurb": "A boy, a horse and a secret, in English and in Spanish.",
    "books": [
      {
        "title": "A Boy, a Horse and a Secret",
        "key": "c1",
        "url": "https://www.amazon.com/Boy-Horse-Secret-Little-Cowboy-ebook/dp/B0GQ787L5H"
      },
      {
        "title": "Un Niño, un Caballo y un Secreto",
        "key": "c2",
        "url": "https://www.amazon.com/Nino-Caballo-Secreto-Charrito-Spanish-ebook/dp/B0GQ68MGXD",
        "suffix": " (Spanish edition)"
      }
    ]
  }
];

export const coverSrc = (key: string) => `/img/b_${key}.jpg`;

/** Covers that rotate on the home page altar: [key, title, series]. */
export const ROTATING_COVERS: { key: string; title: string; series: string }[] = [
  {
    "key": "w1",
    "title": "Witch: A New Beginning",
    "series": "The Witch Series"
  },
  {
    "key": "l1",
    "title": "Into the Forest",
    "series": "Thea the Little Witch"
  },
  {
    "key": "k1",
    "title": "Warlock: Descension into Darkness",
    "series": "The Warlock Series"
  },
  {
    "key": "c1",
    "title": "A Boy, a Horse and a Secret",
    "series": "The Little Cowboy"
  }
];

/** Intrinsic size of every cover file. */
export const COVER_SIZE = { width: 520, height: 780 };
