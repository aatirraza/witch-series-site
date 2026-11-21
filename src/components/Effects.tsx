"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ROUTES } from "../../data/site";
import Grimoire from "./Grimoire";
import { startFx } from "@/lib/fx";
import { bindHistory, bindNav, trackClick } from "@/lib/nav";
import { bindSecretTriggers } from "@/lib/secrets";
import { bindSoundKick } from "@/lib/sound";
import { initSpellFx } from "@/lib/spells";
import { bindToast } from "@/lib/toast";

/**
 * The full-screen layers shared by every page: the ember canvas, the cursor
 * wisp, the page-change veil, the frost tint and the toast. Also starts the
 * frame loop and the sound kick after mount.
 */
export default function Effects() {
  const fx = useRef<HTMLCanvasElement>(null);
  const wisp = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [toastContent, setToastContent] = useState<ReactNode>(null);
  const [toastOn, setToastOn] = useState(false);

  useEffect(() => {
    startFx(fx.current!, wisp.current!);
    bindSoundKick();
    initSpellFx();
    bindSecretTriggers();
    bindHistory();
    const down = (e: PointerEvent) => trackClick(e.clientX, e.clientY);
    document.addEventListener("pointerdown", down, true);
    return () => document.removeEventListener("pointerdown", down, true);
  }, []);

  useEffect(() => {
    bindNav(veil.current!, (href) => router.push(href, { scroll: false }));
    // Fetch every page ahead of time so the swap under the veil is instant.
    ROUTES.forEach((r) => router.prefetch(r.path));
  }, [router]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    bindToast((c) => {
      setToastContent(c);
      setToastOn(true);
      clearTimeout(t);
      t = setTimeout(() => setToastOn(false), 3400);
    });
    return () => {
      bindToast(null);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <canvas id="fx" ref={fx} aria-hidden="true" />
      <div id="wisp" ref={wisp} aria-hidden="true" />
      <div id="veil" ref={veil} aria-hidden="true" />
      <div id="frost" aria-hidden="true" />
      <Grimoire />
      <div className={"toast" + (toastOn ? " on" : "")} role="status" aria-live="polite">
        {toastContent}
      </div>
    </>
  );
}
