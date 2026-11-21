"use client";

import { useLayoutEffect } from "react";
import { pageShown } from "@/lib/nav";

/**
 * Tells the transition layer the moment this page is actually on screen
 * (first render, or when Next reveals a kept page), so the veil lifts only then.
 */
export default function PageShown({ path }: { path: string }) {
  useLayoutEffect(() => {
    pageShown(path);
  }, [path]);
  return null;
}
