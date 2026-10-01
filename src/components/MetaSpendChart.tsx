"use client";

import { useState } from "react";
import { metaMonthly } from "@/data/deck";

const inr = (v: number) => "₹" + v.toLocaleString("en-IN");

export default function MetaSpendChart() {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...metaMonthly.map((m) => m.spend));
  const cur = active === null ? null : metaMonthly[active];

  return (
    <figure>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <figcaption className="max-w-md">
          <p className="text-lg font-medium tracking-tight">Monthly Meta spend, Jan 2025 – Sep 2026</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-accent" />No lead recorded</span>
            <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-fg" />Leads recorded</span>
          </div>
        </figcaption>
        <div className="min-h-[4.5rem] text-right" aria-live="polite">
          <p className="text-sm text-muted">{cur ? cur.month : "Spent with no lead recorded"}</p>
          <p className={`figure mt-1 text-4xl ${!cur || !cur.leads ? "text-accent" : ""}`}>
            {cur ? (cur.spend === 0 ? "No spend" : (cur.exact ? "" : "≈") + inr(cur.spend)) : "₹7,41,739"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {cur
              ? cur.spend === 0
                ? "Account paused"
                : cur.leads
                  ? cur.leadCount !== undefined
                    ? `${cur.leadCount} lead${cur.leadCount === 1 ? "" : "s"} recorded`
                    : "Leads recorded"
                  : "No lead recorded"
              : "49.7% of all Meta spend"}
          </p>
        </div>
      </div>

      <div
        className="mt-8 flex h-64 items-end gap-[3px] border-b border-fg sm:gap-1.5 md:h-80"
        onMouseLeave={() => setActive(null)}
      >
        {metaMonthly.map((m, i) => {
          const h = m.spend === 0 ? 0.6 : (m.spend / max) * 100;
          return (
            <button
              key={m.month}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${m.month}: ${m.spend === 0 ? "no spend" : inr(m.spend)}, ${m.leads ? "leads recorded" : "no lead recorded"}`}
              className="group flex h-full flex-1 items-end"
            >
              <span
                className={`block w-full rounded-t-[3px] transition-opacity ${
                  m.spend === 0 ? "bg-line" : m.leads ? "bg-fg" : "bg-accent"
                } ${active !== null && active !== i ? "opacity-25" : ""}`}
                style={{ height: `${h}%` }}
              />
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-sm text-muted">
        <span>Jan 2025</span>
        <span>Jan 2026</span>
        <span>Sep 2026</span>
      </div>
      <p className="mt-6 text-xs text-muted">
        Source: Meta Ads Manager. Values marked ≈ are read from the audit&apos;s chart; the rest are
        stated in the audit.
      </p>
    </figure>
  );
}
