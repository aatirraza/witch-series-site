"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { go } from "@/lib/nav";
import { setPendingSeries } from "@/lib/series";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  /** Open the library on this series tab the next time the visitor arrives there. */
  series?: number;
};

/** An internal link that plays the veil transition, like the original hash links. */
export default function VeilLink({ href, series, onClick, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (series !== undefined) setPendingSeries(series);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(href);
  };
  return <Link href={href} scroll={false} onClick={handle} {...rest} />;
}
