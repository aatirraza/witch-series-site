"use client";

/**
 * The "memory card" dialog shared by the Descent (memories) and The Book Match
 * (shelf cleared). Mounted once in the layout, outside the pages, as in the original.
 */

export type MemoryContent = {
  /** Background image URL. */
  image: string;
  /** Show the image whole on grey instead of cropped. */
  contain: boolean;
  kicker: string;
  title: string;
  quote?: string;
  text: string;
  count: string;
};

type Opener = (content: MemoryContent, returnFocus: HTMLElement | null) => void;

let opener: Opener | null = null;

export function bindMemory(fn: Opener | null) {
  opener = fn;
}

/** Open the card. `returnFocus` gets focus back when it closes. */
export function openMemory(content: MemoryContent, returnFocus: HTMLElement | null) {
  opener?.(content, returnFocus);
}
