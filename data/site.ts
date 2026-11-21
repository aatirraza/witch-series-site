export type Route = {
  path: string;
  label: string;
  /** Browser tab title; the home page uses the site name alone. */
  title: string;
};

export const SITE_NAME = "L.S. Gagnon";

export const ROUTES: Route[] = [
  { path: "/", label: "Home", title: "L.S. Gagnon" },
  { path: "/descent", label: "The Descent", title: "The Descent" },
  { path: "/play", label: "Play", title: "The Book Match" },
  { path: "/books", label: "Books", title: "Books" },
  { path: "/cast", label: "The cast", title: "The cast" },
  { path: "/trailer", label: "The trailer", title: "The trailer" },
  { path: "/about", label: "About", title: "About" },
  { path: "/contact", label: "Contact", title: "Contact" },
];

export const routeTitle = (path: string) =>
  ROUTES.find((r) => r.path === path)?.title ?? SITE_NAME;

export type ExtLink = { label: string; href: string };

export const SOCIAL: ExtLink[] = [
  { label: "TikTok", href: "https://www.tiktok.com/@l.s.gagnon" },
  { label: "Facebook", href: "http://www.facebook.com/TheWitchSeries" },
  { label: "Instagram", href: "http://Www.Instagram.com/TheWitchSeries" },
  { label: "Twitter", href: "http://www.twitter.com/TheWitchSeries" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCRhRJX3CNnaHh-3VlhPASoQ" },
];

/** The footer leaves Twitter out. */
export const FOOTER_SOCIAL = SOCIAL.filter((s) => s.label !== "Twitter");

export const STORES: ExtLink[] = [
  { label: "Amazon", href: "https://www.amazon.com/L.S.-Gagnon/e/B00Y1OT8PE" },
  {
    label: "Kindle",
    href: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Ddigital-text&field-keywords=l.s.+gagnon",
  },
  {
    label: "Barnes & Noble",
    href: "https://www.barnesandnoble.com/s/%22L.S.+Gagnon%22?Ns=P_Sales_Rank%7C0&Ntk=P_key_Contributor_List&Ntx=mode+matchall",
  },
];

export const BOOK_ONE_URL = "https://www.amazon.com/Witch-New-Beginning-Book-ebook/dp/B014G0HFBG";

export const EMAIL = "TheWitchSeries@aol.com";

export const PRESS = [
  {
    href: "https://www.heraldnews.com/news/20171003/experience-with-bullying-fuels-fall-river-authors-creative-spark",
    name: "The Herald News",
    src: "The Herald News · 2017",
    title: "A profile of the Fall River author and the experiences behind her writing",
    go: "Read the article ↗",
  },
  {
    href: "http://www.bullieskeepout.com/rising-above-bullying-the-story-of-l-s-gagnon/",
    name: "BulliesKeepOut",
    src: "BulliesKeepOut",
    title: "An interview with L.S. Gagnon about rising above hard times",
    go: "Read the interview ↗",
  },
];

export const FOOTER = {
  about:
    "The official home of L.S. Gagnon's books: The Witch Series, The Warlock Series, Thea the Little Witch and The Little Cowboy.",
  explore: "Explore",
  exploreLinks: [
    { path: "/", label: "Home" },
    { path: "/descent", label: "The Descent" },
    { path: "/play", label: "Play the game" },
    { path: "/books", label: "Books" },
    { path: "/cast", label: "The cast" },
    { path: "/trailer", label: "The trailer" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ],
  series: "The series",
  follow: "Follow",
  copyright: "© L.S. Gagnon",
  emberLabel: "A single ember",
  note: "Trailer character designs shown for the author's review.",
};

export const UI = {
  menu: "Menu",
  soundOn: "Sound on",
  soundOff: "Sound off",
};
