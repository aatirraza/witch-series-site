"use client";

import { useRef, useState } from "react";
import { CONTACT } from "../../../data/pages";
import { EMAIL } from "../../../data/site";

export default function EmailCard() {
  const mail = useRef<HTMLElement>(null);
  const [label, setLabel] = useState(CONTACT.copy);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setLabel(CONTACT.copied);
    } catch {
      // No clipboard access: select the address so the visitor can copy it.
      const r = document.createRange();
      r.selectNodeContents(mail.current!);
      const s = getSelection()!;
      s.removeAllRanges();
      s.addRange(r);
      setLabel(CONTACT.selected);
    }
    // As in the original, every click schedules its own reset.
    setTimeout(() => setLabel(CONTACT.copy), 2200);
  };

  return (
    <div className="cc">
      <div className="kicker">{CONTACT.bookings}</div>
      <code id="mail" ref={mail}>
        {EMAIL}
      </code>
      <button className="btn" id="copy" type="button" onClick={copy}>
        {label}
      </button>
    </div>
  );
}
