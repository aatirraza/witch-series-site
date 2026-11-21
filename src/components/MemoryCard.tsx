"use client";

import { useEffect, useRef, useState } from "react";
import { MEMORY_UI } from "../../data/descent";
import { bindMemory, type MemoryContent } from "@/lib/memory";

export default function MemoryCard() {
  const [content, setContent] = useState<MemoryContent | null>(null);
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bindMemory((c, focus) => {
      returnTo.current = focus;
      setContent(c);
      setOpen(true);
      setTimeout(() => closeBtn.current?.focus(), 50);
    });
    return () => bindMemory(null);
  }, []);

  const close = () => {
    setOpen(false);
    returnTo.current?.focus?.({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);

  return (
    <div
      className="mem"
      id="mem"
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mh"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="mbox">
        <button className="mx" ref={closeBtn} type="button" aria-label={MEMORY_UI.close} onClick={close}>
          ×
        </button>
        <div
          className={"mimg" + (content?.contain ? " contain" : "")}
          id="mimg"
          style={content ? { backgroundImage: `url(${content.image})` } : undefined}
        ></div>
        <div className="mtxt">
          <div className="kicker" id="mk">
            {content?.kicker ?? MEMORY_UI.recovered}
          </div>
          <h4 id="mh">{content?.title}</h4>
          <div id="mq">{content?.quote && <q>{content.quote}</q>}</div>
          <p id="mp">{content?.text}</p>
          <div className="mcount" id="mc">
            {content?.count}
          </div>
        </div>
      </div>
    </div>
  );
}
