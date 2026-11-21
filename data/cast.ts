export type Look = {
  label?: string;
  tag: string;
  /** Sheet file: /img/<img>.jpg, portrait: /img/<img>_p.jpg */
  img: string;
  opt?: string;
  role: string;
  look: string;
  ward: string;
  shots: string;
  note?: string;
};

export type Character = {
  name: string;
  group: string;
  epi: string;
  looks: Look[];
};

export const CAST: Character[] = [
  {
    "name": "Thea",
    "group": "The leads",
    "epi": "The witch who forgot",
    "looks": [
      {
        "label": "Present day",
        "tag": "WI-Thea",
        "img": "5fe2c780",
        "role": "The heroine. A shy young woman at a Salem bakery who has no idea she is a five-hundred-year-old witch whose memories were taken from her.",
        "look": "Looks about 20, softly curvy and kept subtle, as the book describes. Warm brown eyes, a thin nose, freckles, and a tangled mass of long brown curls.",
        "ward": "A loose patterned wool sweater, a dark brown tiered skirt and black combat-style boots, following the author's direction: loose clothes, mostly a dark skirt, boots.",
        "shots": "2, 8, 10, 15, 16, 20–23, 52, 54, 59"
      },
      {
        "label": "At the bakery",
        "tag": "WI-Thea-Bakery",
        "img": "7ae2eea2",
        "role": "Thea at work in Norm's bakery, where the trailer's ordinary world lives.",
        "look": "The same Thea, same face and hair.",
        "ward": "Her everyday outfit with a faded red-and-cream gingham apron, lightly dusted with flour.",
        "shots": "8, 10–15, 20, 37, 59"
      },
      {
        "label": "At the stake",
        "tag": "WI-Thea-Stake",
        "img": "8aac57d5",
        "role": "Thea three centuries ago, condemned as a witch. The image the trailer opens and closes on.",
        "look": "The same face, with very long hair in a loosening braid, soot on her skin, wrists bound with rope.",
        "ward": "A taupe linen chemise, a black laced bodice, a brown wool skirt over a ragged underskirt, a striped tie-on pocket and worn boots.",
        "shots": "3, 56, 57, 58"
      },
      {
        "label": "The reflection",
        "tag": "WI-Thea-Gown",
        "img": "fdf34064",
        "role": "The night Delia transforms her, and Thea sees herself as the witch she once was.",
        "look": "The same face, her curls brushed out and swept back, a single daisy above her left ear.",
        "ward": "An ivory gown from the wedding painting: a corset bodice, a ruffled off-the-shoulder lace neckline, sheer bishop sleeves, a lace skirt and pearl buttons down the back.",
        "shots": "50"
      }
    ]
  },
  {
    "name": "James",
    "group": "The leads",
    "epi": "The husband she cannot remember",
    "looks": [
      {
        "label": "Present day",
        "tag": "WI-James",
        "img": "e5981da5",
        "role": "Thea's favourite author, and the husband she cannot remember. He has loved her for three hundred years.",
        "look": "Looks about 21, with dark, overgrown hair over his forehead, thick low brows and blue eyes, blue only for Thea, as the book tells us. A faint, old scar crosses the bridge of his nose.",
        "ward": "A washed black denim work jacket, a black knit polo, chocolate-brown trousers and black leather boots.",
        "shots": "12–14, 43, 45, 52, 53",
        "note": "Wardrobe suggested: the book leaves it open."
      },
      {
        "label": "First meeting",
        "tag": "WI-James-Cap",
        "img": "f809f85c",
        "role": "The moment he walks into the bakery and back into her life.",
        "look": "The same James.",
        "ward": "His everyday look with a plain washed-black baseball cap, as in the book's first meeting.",
        "shots": "12–14"
      },
      {
        "label": "The judge",
        "tag": "WI-James-Judge",
        "img": "89e588d3",
        "role": "Her husband forced to sit in judgement at her witch trial, secretly on her side.",
        "look": "The same face beneath a powdered white periwig.",
        "ward": "A black judicial robe over a black coat, white linen bands, black breeches and stockings, buckled shoes.",
        "shots": "27",
        "note": "On screen his face is kept in shadow."
      }
    ]
  },
  {
    "name": "Delia",
    "group": "The leads",
    "epi": "Her guard for four hundred years",
    "looks": [
      {
        "label": "Present day",
        "tag": "WI-Delia",
        "img": "5fd1b1f1",
        "role": "Thea's best friend and secret guard. Fierce, loyal and theatrical.",
        "look": "Slim, with long black hair and dark eyes ringed in smudged eyeliner. Healed burn scars run from wrist to elbow: she once took Thea's place at the stake.",
        "ward": "A long black dress, layered silver necklaces and heeled black boots.",
        "shots": "17, 20, 24, 25, 26, 49"
      },
      {
        "label": "At her booth",
        "tag": "WI-Delia-Hat",
        "img": "8d1b4900",
        "role": "Delia selling potions and sun catchers at her Salem street booth.",
        "look": "The same Delia.",
        "ward": "Her black dress with the book's enormous black velvet hat, embroidered with gold stars and silver moons.",
        "shots": "49"
      }
    ]
  },
  {
    "name": "Cory",
    "group": "The boys",
    "epi": "The leader of the boys",
    "looks": [
      {
        "label": "Option A",
        "tag": "WI-Cory · Option A",
        "img": "1bcdc262",
        "opt": "Option A",
        "role": "The steady, level-headed leader of the boys who guard Thea. Blades slide from his sleeves in the bakery fight.",
        "look": "Rugged and lived-in: tall, blue eyes, wavy brown hair, a moustache and light stubble.",
        "ward": "A worn camel moleskin flight jacket with a buckled collar, a plaid flannel shirt, cream pleated trousers and brown boots.",
        "shots": "38",
        "note": "Two options for Cory: please choose A or B."
      },
      {
        "label": "Option B",
        "tag": "WI-Cory · Option B",
        "img": "6436bee1",
        "opt": "Option B",
        "role": "The steady, level-headed leader of the boys who guard Thea. Blades slide from his sleeves in the bakery fight.",
        "look": "Dashing and warm: tall, blue eyes, thick swept-back brown hair, a short beard and an easy smile.",
        "ward": "The same camel moleskin flight jacket, plaid flannel shirt, cream pleated trousers and brown boots.",
        "shots": "38",
        "note": "Two options for Cory: please choose A or B."
      }
    ]
  },
  {
    "name": "Joshua",
    "group": "The boys",
    "epi": "The gentle one",
    "looks": [
      {
        "tag": "WI-Joshua",
        "img": "f9ac8808",
        "role": "The soft-hearted one of the boys. His weapon is the bow.",
        "look": "Tall and gangly, a redhead with a kind face, freckles, green eyes and a full copper beard.",
        "ward": "A moss-green field jacket with a brown corduroy collar, a rust sweater, dark jeans and brown boots.",
        "shots": "39",
        "note": "Wardrobe suggested."
      }
    ]
  },
  {
    "name": "Fish",
    "group": "The boys",
    "epi": "The joker",
    "looks": [
      {
        "tag": "WI-Fish",
        "img": "c2a5d8cd",
        "role": "The cheeky one of the group. Hooks on thin wire shoot from his sleeves, which is how he got his name.",
        "look": "A boyish face, messy dirty-blond hair, green eyes and a devilish smirk.",
        "ward": "A faded denim jacket over a grey hoodie, black jeans and black boots.",
        "shots": "40",
        "note": "Wardrobe suggested."
      }
    ]
  },
  {
    "name": "Javier",
    "group": "The boys",
    "epi": "The charmer",
    "looks": [
      {
        "tag": "WI-Javier",
        "img": "6e13c592",
        "role": "The charmer of the boys, built like a wrestler. He fights with a spinning chain net.",
        "look": "Latino, with a mohawk, short stubble and a big, confident smile.",
        "ward": "An oxblood-red work jacket over a black T-shirt, dark trousers and black boots.",
        "shots": "41",
        "note": "Wardrobe suggested."
      }
    ]
  },
  {
    "name": "Samuel",
    "group": "The boys",
    "epi": "He runs up walls",
    "looks": [
      {
        "tag": "WI-Samuel",
        "img": "db48e14f",
        "role": "The best jumper of the boys, who runs up walls and flips through the fight.",
        "look": "Slim and sporty, with close-cropped black hair, brown eyes and a neat beard.",
        "ward": "A navy zip jacket over a grey henley, dark utility trousers and light trainers.",
        "shots": "42",
        "note": "Look and wardrobe suggested: the book gives no description."
      }
    ]
  },
  {
    "name": "Helena",
    "group": "The council",
    "epi": "Calm and quietly powerful",
    "looks": [
      {
        "tag": "WI-Helena",
        "img": "61720c32",
        "role": "A witch of the council.",
        "look": "Young-looking, with long, straight, pale golden-blonde hair and a knowing half-smile.",
        "ward": "A long emerald-green wool coat over a cream high-neck blouse, a charcoal skirt and black boots.",
        "shots": "47",
        "note": "Wardrobe suggested."
      }
    ]
  },
  {
    "name": "Amanda",
    "group": "The council",
    "epi": "Trusts no one easily",
    "looks": [
      {
        "tag": "WI-Amanda",
        "img": "691aaca4",
        "role": "A witch of the council, and Helena's sister.",
        "look": "Long, dark-brunette waves and a cool, guarded gaze.",
        "ward": "A long aubergine wool coat over a black laced high-neck blouse, a grey skirt and black boots.",
        "shots": "47",
        "note": "Look suggested: the book gives no description."
      }
    ]
  },
  {
    "name": "Sharron",
    "group": "The council",
    "epi": "Her mother’s dearest friend",
    "looks": [
      {
        "tag": "WI-Sharron",
        "img": "f22415d1",
        "role": "Thea's mother's dearest friend, warm, wise and always truthful.",
        "look": "Petite, with round tortoiseshell glasses on a chain and a big, tangled mass of curly hair like Thea's, streaked with grey.",
        "ward": "A schoolteacher's mustard cardigan over a cream blouse, a brown tweed skirt and lace-up boots.",
        "shots": "47"
      }
    ]
  },
  {
    "name": "Vera",
    "group": "The council",
    "epi": "The eldest of the council",
    "looks": [
      {
        "tag": "WI-Vera",
        "img": "ff0ed4da",
        "role": "The eldest witch of the council, dignified and carrying a hidden grief.",
        "look": "Silver hair in a low bun and a weathered, haunted face.",
        "ward": "A slate blue-grey wool coat over a long dark-grey dress, black shoes and a simple wedding band.",
        "shots": "47",
        "note": "Look suggested."
      }
    ]
  },
  {
    "name": "The silhouette",
    "group": "The villain",
    "epi": "Never lit, never named",
    "looks": [
      {
        "tag": "WI-Simon",
        "img": "2212ec79",
        "role": "The power behind everything.",
        "look": "Tall and angular, with slicked-back dark hair and a long, high-collared black coat.",
        "ward": "A long black wool overcoat over dark clothes and black shoes.",
        "shots": "35, 36",
        "note": "On screen he is only ever a backlit silhouette and a hand. This sheet keeps him consistent."
      }
    ]
  },
  {
    "name": "The warlocks",
    "group": "Groups",
    "epi": "Simon’s men",
    "looks": [
      {
        "tag": "WI-Warlocks",
        "img": "598092d8",
        "role": "Simon's men, kept alive for centuries. When they die, they turn to dust.",
        "look": "Five distinct men with pale, grey-toned skin and cold, dead-eyed stares.",
        "ward": "Worn, dusty, old-fashioned coats and jackets in black and charcoal, dark trousers and scuffed boots.",
        "shots": "37, 44"
      }
    ]
  },
  {
    "name": "The 1600s crowd",
    "group": "Groups",
    "epi": "The town that called for fire",
    "looks": [
      {
        "tag": "WI-Crowd",
        "img": "60170aaf",
        "role": "The townspeople at the witch trial and the stake, including the two hunters who accuse Thea.",
        "look": "Seven villagers of mixed ages, fearful, suspicious or hostile.",
        "ward": "Period working clothes in earthy wool and linen: jerkins, breeches, coifs, aprons, a cloak and a tall buckled hat.",
        "shots": "3, 9, 27"
      }
    ]
  }
];

export const portraitSrc = (img: string) => `/img/${img}_p.jpg`;
export const sheetSrc = (img: string) => `/img/${img}.jpg`;

/** Intrinsic size of every portrait file. */
export const PORTRAIT_SIZE = { width: 500, height: 624 };

/** Interface copy for the cast ring and the character sheet viewer. */
export const CAST_UI = {
  openCard: (name: string) => `Open ${name}`,
  prev: "Previous character",
  next: "Next character",
  openFront: "Open this card",
  close: "Close",
  looks: "Looks",
  look: "Look",
  wardrobe: "Wardrobe",
  shots: "Trailer shots",
  prevSheet: "← Previous",
  nextSheet: "Next →",
  sheetAlt: (name: string, label?: string) => `${name}${label ? " — " + label : ""} character sheet`,
  sheetEp: (epi: string, label?: string) => `${epi}${label ? " · " + label : ""}`,
};
