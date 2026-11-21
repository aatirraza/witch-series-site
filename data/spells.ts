export type SpellId = "wall" | "lords" | "summon" | "vanish" | "freeze" | "forget";

export type Spell = { id: SpellId; n: string; l: string };

export const SPELLS: Spell[] = [
  {
    "id": "wall",
    "n": "Wall!",
    "l": "Her first spell: a word that throws a grown woman across the room."
  },
  {
    "id": "lords",
    "n": "Time to play, my lords.",
    "l": "A ring of gold sparks spins in her open hand, then breaks."
  },
  {
    "id": "summon",
    "n": "Summon",
    "l": "A book leaves its place and flies to her hand."
  },
  {
    "id": "vanish",
    "n": "Vanish",
    "l": "Delia’s blue dust. Things simply stop being there."
  },
  {
    "id": "freeze",
    "n": "The frozen hour",
    "l": "Time stops like the sand in the captain’s hourglass. Click to let it go."
  },
  {
    "id": "forget",
    "n": "Forget",
    "l": "Words leave her mind from the edges inward."
  }
];

export type SecretId = "wall" | "lords" | "thea" | "hold" | "book3" | "dbl" | "ember";

export type Secret = { id: SecretId; n: string; h: string };

export const SECRETS: Secret[] = [
  {
    "id": "wall",
    "n": "The word she shouted",
    "h": "Some spells are spoken. Try typing the first one."
  },
  {
    "id": "lords",
    "n": "What she says before the fire",
    "h": "Type the last thing Thea says in the trailer."
  },
  {
    "id": "thea",
    "n": "Her name",
    "h": "Say her name and listen."
  },
  {
    "id": "hold",
    "n": "The frozen hour",
    "h": "On the night street at the top, hold still and press for two seconds."
  },
  {
    "id": "book3",
    "n": "The book that vanished",
    "h": "Knock three times on the book that floats on the home page."
  },
  {
    "id": "dbl",
    "n": "A book to her hand",
    "h": "In the library, double-click any cover."
  },
  {
    "id": "ember",
    "n": "The first ember",
    "h": "Every story here starts with one ember. It is hiding at the very bottom."
  }
];

export const GRIMOIRE = {
  button: "Grimoire",
  buttonCount: (n: number, total: number) => `${n} / ${total}`,
  kicker: "Thea's grimoire",
  title: "Spells from the book",
  epigraph: "It was a day, it was an hour, it was everything within my power.",
  close: "Close the grimoire",
  label: "Grimoire",
  cast: "Cast",
  secretsLabel: "Hidden secrets",
  secretsCount: (n: number, total: number) => `${n} of ${total}`,
  unknown: "An unknown secret",
  /** Toast: before, bold name, after. */
  found: (name: string, n: number, total: number) => ({ before: "Secret found: ", b: name, after: ` · ${n} of ${total}` }),
};

/** Typed words that cast spells (the original keeps the last 12 characters typed). */
export const TYPED = { wall: "wall", lords: "my lords", thea: "thea", forget: "forget", memory: 12 };
