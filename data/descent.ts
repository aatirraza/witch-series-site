export type Hotspot = {
  x: number;
  y: number;
  /** Label */
  t: string;
  /** Image: /d/<im>.jpg, or /img/<im>.jpg when sheet is true */
  im: string;
  /** Show the image contained on grey */
  c?: boolean;
  sheet?: boolean;
  h: string;
  q?: string;
  p: string;
};

export type Scene = {
  img: string;
  loc: string;
  year: number | string;
  k: string;
  h: string;
  p: string;
  hots?: Hotspot[];
};

export type Thread = {
  id: string;
  name: string;
  who: string;
  /** RGB triplet */
  tc: string;
  cover: string;
  line: string;
  scenes: Scene[];
};

export const THREADS: Thread[] = [
  {
    "id": "thea",
    "name": "The witch who forgot",
    "who": "Thea",
    "tc": "217,142,50",
    "cover": "bakery",
    "line": "Follow Thea through the life she thinks is hers: the bakery, her apartment, a mirror that shows a stranger.",
    "scenes": [
      {
        "img": "salem-aerial",
        "loc": "Salem, Massachusetts",
        "year": 2026,
        "k": "Witch season",
        "h": "A town that remembers everything",
        "p": "Thousands of tourists in pointed hats, tents of trinkets, and one shy baker who has no idea what she is."
      },
      {
        "img": "bakery",
        "loc": "Norm's bakery",
        "year": 2026,
        "k": "Her ordinary afternoon",
        "h": "Cake boxes, flour and a novel",
        "p": "She spends her days behind the counter and her breaks inside the same author’s books.",
        "hots": [
          {
            "x": 57,
            "y": 70,
            "t": "The novel",
            "im": "p_novel",
            "c": true,
            "h": "His latest novel",
            "p": "A navy cover with a gold hourglass. The author’s photo on the back looks like someone she should know."
          },
          {
            "x": 13,
            "y": 24,
            "t": "The door bell",
            "im": "p_bell",
            "c": true,
            "h": "The brass bell",
            "p": "It rings every time a tourist walks in. One afternoon it rings and the whole shop goes quiet."
          }
        ]
      },
      {
        "img": "thea-apartment",
        "loc": "Third-floor apartment",
        "year": 2026,
        "k": "Home",
        "h": "Small, warm and hers",
        "p": "One bedroom, a living room, a small kitchen. Everything in it is ordinary, and that is how she likes it.",
        "hots": [
          {
            "x": 56,
            "y": 34,
            "t": "The bookshelf",
            "im": "thea-apartment",
            "h": "A shelf of borrowed lives",
            "p": "Novel after novel, read until the spines went soft. She has never asked herself why she needs the stories so much."
          }
        ]
      },
      {
        "img": "mirror-room",
        "loc": "The mill house",
        "year": 2026,
        "k": "The mirror",
        "h": "A face she doesn’t recognise",
        "p": "In a room she has never seen, an old gilded mirror shows her someone else.",
        "hots": [
          {
            "x": 58,
            "y": 42,
            "t": "The mirror",
            "im": "p_mirror",
            "c": true,
            "h": "The gilded mirror",
            "q": "Who are you?",
            "p": "A hairline crack runs across the glass as she asks."
          }
        ]
      },
      {
        "img": "memory-space",
        "loc": "Inside a memory",
        "year": "????",
        "k": "Where memories go",
        "h": "Floating, unreadable, hers",
        "p": "Every bubble holds a moment that was taken from her. None of them will open. Not yet.",
        "hots": [
          {
            "x": 31,
            "y": 56,
            "t": "A memory",
            "im": "memory-space",
            "h": "A bubble that won’t break",
            "p": "For a second she sees candlelight and a wedding ring. Then it is gone."
          }
        ]
      }
    ]
  },
  {
    "id": "james",
    "name": "The man who waited",
    "who": "James",
    "tc": "212,175,55",
    "cover": "mill-floor",
    "line": "Follow the author who walked into her bakery: his ship, his mansion, a painting he will not take down.",
    "scenes": [
      {
        "img": "pirate-ship",
        "loc": "Salem harbour",
        "year": 2026,
        "k": "The old ship",
        "h": "Moored, closed, watching",
        "p": "A wooden ship turned floating restaurant. Some nights the lanterns burn long after closing.",
        "hots": [
          {
            "x": 31,
            "y": 64,
            "t": "A lantern",
            "im": "p_lantern",
            "c": true,
            "h": "A ship’s lantern",
            "p": "It has been lit on this pier for longer than anyone in Salem can remember."
          }
        ]
      },
      {
        "img": "gate",
        "loc": "The mill house",
        "year": 2026,
        "k": "Behind the iron gate",
        "h": "A house too large for one man",
        "p": "Tall black gates, a drive of fallen leaves, and windows that are always lit."
      },
      {
        "img": "mill-floor",
        "loc": "The sitting room",
        "year": 2026,
        "k": "By the fire",
        "h": "He knows her. She doesn’t know him.",
        "p": "A fireplace, a red sofa and a man who looks at her as if he has done it for centuries.",
        "hots": [
          {
            "x": 37,
            "y": 76,
            "t": "His words",
            "im": "mill-floor",
            "h": "What he tells her",
            "q": "I’ll die with you, Thea.",
            "p": "He says it on his knees, holding her, as if it is the oldest promise he has."
          }
        ]
      },
      {
        "img": "mill-bedroom",
        "loc": "The master bedroom",
        "year": 2026,
        "k": "Above the bed",
        "h": "The painting",
        "p": "A garden, a flower in her hair, a ring on her hand. It has hung here a very long time.",
        "hots": [
          {
            "x": 33,
            "y": 30,
            "t": "The painting",
            "im": "p_painting",
            "c": true,
            "h": "The wedding painting",
            "p": "The woman in the painting has Thea’s face. The paint is centuries old."
          }
        ]
      },
      {
        "img": "lakeside-stable",
        "loc": "The lake",
        "year": 2026,
        "k": "The old stable",
        "h": "What it costs him",
        "p": "A beam, a rope and a broken window over the water.",
        "hots": [
          {
            "x": 14,
            "y": 20,
            "t": "The rope",
            "im": "p_rope",
            "c": true,
            "h": "The rope on the beam",
            "p": "Some of the men who hunt her will do anything to make him talk."
          }
        ]
      }
    ]
  },
  {
    "id": "past",
    "name": "The erased past",
    "who": "1692",
    "tc": "110,160,215",
    "cover": "stake",
    "line": "Fall back to 1692: a trial, a cellar, a coffin and the night Salem called for fire.",
    "scenes": [
      {
        "img": "delia-house",
        "loc": "Salem Village",
        "year": 1692,
        "k": "Delia’s house",
        "h": "The one who guards her",
        "p": "Bare walls, a long table, a single candle. Delia has kept Thea’s secret longer than anyone alive.",
        "hots": [
          {
            "x": 57,
            "y": 58,
            "t": "Delia",
            "im": "5fd1b1f1",
            "sheet": true,
            "h": "Delia",
            "p": "Her oldest friend. The scars on her arms run from wrist to elbow, and she never explains them."
          }
        ]
      },
      {
        "img": "courtroom-1600s",
        "loc": "The meeting house",
        "year": 1692,
        "k": "The trial",
        "h": "A judge in shadow",
        "p": "Rows of benches, a high bench, and a verdict decided before the trial began.",
        "hots": [
          {
            "x": 50,
            "y": 44,
            "t": "The judge",
            "im": "89e588d3",
            "sheet": true,
            "h": "The judge",
            "p": "Black robes, a white wig, a face kept in shadow. He is not on the side they think."
          }
        ]
      },
      {
        "img": "cellar-1600s",
        "loc": "The cellar",
        "year": 1692,
        "k": "Below the meeting house",
        "h": "Ropes, a pole, a barrel",
        "p": "Where accused women were questioned until they said what the town wanted.",
        "hots": [
          {
            "x": 59,
            "y": 70,
            "t": "The barrel",
            "im": "p_barrel",
            "c": true,
            "h": "The water barrel",
            "p": "Hands on the rim. The water closes over. It is the memory she fights hardest to keep away."
          }
        ]
      },
      {
        "img": "forest-cottage",
        "loc": "The forest",
        "year": 1692,
        "k": "A cottage alone",
        "h": "Candles on the floor",
        "p": "A ring of candles around a lone figure goes out one by one, until one circle of light is left.",
        "hots": [
          {
            "x": 50,
            "y": 66,
            "t": "The candles",
            "im": "forest-cottage",
            "h": "The candle ring",
            "p": "Each flame that goes out takes something with it. A name. A face. A wedding."
          }
        ]
      },
      {
        "img": "coffin-pov",
        "loc": "Unmarked ground",
        "year": 1692,
        "k": "The last light",
        "h": "A lid closing",
        "p": "Rough pine boards, a strip of sky, falling leaves. Then nothing.",
        "hots": [
          {
            "x": 50,
            "y": 44,
            "t": "The coffin",
            "im": "p_coffin",
            "c": true,
            "h": "The coffin",
            "p": "Hand-sawn planks and square nails. Somebody made sure she would not be found."
          }
        ]
      },
      {
        "img": "stake",
        "loc": "The clearing",
        "year": 1692,
        "k": "The night of the fire",
        "h": "Burn her",
        "p": "Fog, a ring of lanterns and a stake on a pyre of dry branches. Every story here begins and ends with one ember.",
        "hots": [
          {
            "x": 50,
            "y": 40,
            "t": "The stake",
            "im": "p_stakep",
            "c": true,
            "h": "The stake",
            "q": "Burn her!",
            "p": "The crowd never sees her face. Three hundred years later, she still can’t remember theirs."
          }
        ]
      }
    ]
  }
];

export const MEM_TOTAL = THREADS.reduce(
  (a, t) => a + t.scenes.reduce((b, s) => b + (s.hots ? s.hots.length : 0), 0),
  0,
);

/** Interface copy for the shared memory card dialog. */
export const MEMORY_UI = {
  close: "Close",
  recovered: "Memory recovered",
};

export const DESCENT = {
  introBg: "/d/memory-space.jpg",
  introSteps: [25, 50, 75, 100],
  introStart: "Recovering memory 0%",
  introPct: (n: number) => `Recovering memory ${n}%`,
  /** Log lines: bold label, then text. The first is shown before loading starts. */
  logStart: { b: "Location:", t: " searching…" },
  logs: [
    { b: "Location:", t: " Salem, Massachusetts" },
    { b: "Year:", t: " 2026" },
    { b: "Memories:", t: " sealed" },
    { b: "Thread:", t: " found" },
  ],
  title: "The Descent",
  lede: "Thea's memories were taken from her. Choose a thread and follow it back through three hundred years, from the streets of Salem to the night of the fire. Find what she lost along the way.",
  begin: "Begin the descent",
  note: "Scroll to travel. Click the lights to recover memories.",
  pick: {
    kicker: "Choose a thread",
    title: { text: "Three ways ", em: "back to her" },
    lede: "Every thread ends in the same place. Each one carries memories the others don't.",
  },
  followed: "Followed",
  places: (n: number) => `${n} places`,
  memoriesOf: (got: number, n: number) => `${got} of ${n} memories`,
  hint: "Scroll to travel",
  hud: { location: "Location", year: "Year", memories: "Memories", startLoc: "Salem", startYear: "2026" },
  hudMem: (got: number, total: number) => `${got} / ${total}`,
  allThreads: "All threads",
  end: {
    kicker: "Thread complete",
    allFound: "Every memory on this thread recovered",
    someFound: (got: number, n: number) => `You recovered ${got} of ${n} memories`,
    allText: "The rest of her story is in the book.",
    someText: "Scroll back up to find the lights you missed, or follow another thread.",
    next: "Follow another thread",
    readBook: "Read book one",
  },
  memoryLabel: (t: string) => `Memory: ${t}`,
  memoryKicker: (fresh: boolean) => (fresh ? "Memory recovered" : "A memory you found"),
  memoryCount: (got: number, total: number) => `${got} of ${total} memories recovered`,
  /** Toast when the last memory is found: before, bold, after. */
  allRecovered: (total: number) => ({ before: "All ", b: `${total} memories`, after: " recovered. Thea remembers." }),
  defaultGlow: "230,128,46",
};
