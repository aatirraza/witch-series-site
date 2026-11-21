# The Witch Series — L.S. Gagnon

The author site for L.S. Gagnon's books: The Witch Series, Thea the Little Witch, The Warlock Series and The Little Cowboy.

Built with Next.js (App Router), TypeScript and plain CSS.

## Run it

```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Where things are

- `data/` — all site content: books, cast, colour worlds, Descent threads and scenes, spells and secrets, page copy.
- `src/app/` — one folder per page: `/`, `/descent`, `/play`, `/books`, `/cast`, `/trailer`, `/about`, `/contact`. Any unknown address shows the home page.
- `src/components/` — the page components, the shared header, footer, Grimoire, character sheet viewer and memory card.
- `src/lib/` — browser-only engines: embers and cursor wisp (`fx`), sound and the generative score (`sound`), page transitions (`nav`), The Book Match (`match`), the Descent (`descent`), spells and secrets.
- `src/app/globals.css` — the site stylesheet, plus two marked sections at the end: quirks-mode parity and the split page veil.
- `public/` — images (`img/`, `d/`) and the music box audio.

Visitor progress is kept in `localStorage` under `ws_mbest`, `ws_mdone`, `ws_secrets`, `ws_mems`, `ws_threads` and `ws_sound`.
