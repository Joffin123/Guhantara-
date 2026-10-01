import MetaSpendChart from "./MetaSpendChart";
import { Eyebrow, Figures, Header, Section, SlidesLink } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-white">
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        src="/media/film-1-landscape.mp4"
        poster="/media/film-1-landscape.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
      <div className="wrap pb-12 pt-32 md:pb-16">
        <p className="text-sm text-white/70">Performance audit · September 2026</p>
        <h1 className="display mt-5 max-w-[12ch] text-[clamp(3.25rem,10vw,8.5rem)]">The account, opened up.</h1>
        <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-white/80 md:col-span-6 md:text-xl">
            A full audit of Guhantara&apos;s brand, website, Meta and Google accounts — and what
            ₹45.65 lakh actually bought between January 2025 and September 2026.
          </p>
          <div className="flex flex-wrap items-end gap-3 md:col-span-6 md:justify-end">
            <a href="#finding" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-night transition hover:bg-white/85">
              Read the findings
            </a>
            <a href="#films" className="rounded-full px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/35 transition hover:ring-white">
              Watch the films
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Finding() {
  return (
    <Section id="finding">
      <Eyebrow>The finding</Eyebrow>
      <p className="headline mt-8 max-w-[22ch] text-[clamp(2rem,5vw,4.25rem)] text-balance">
        Guhantara has the demand of a category leader, the positioning of a commodity, and{" "}
        <span className="text-accent">no way to tell which of its rupees worked.</span>
      </p>

      <div className="mt-20 md:mt-28">
        <Figures
          items={[
            { label: "Total media spend", value: "₹45.65L", note: "Meta ₹14.94L + Google ₹30.72L" },
            { label: "Meta leads recorded", value: "1,259", note: "Blended cost per lead ₹1,186" },
            { label: "Bookings attributed", value: "Zero", note: "Not none sold — none traceable.", accent: true },
          ]}
        />
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Rooms were booked and day-outs were sold across these 21 months. Nothing in either account
        can tell you which advert produced a single one of them.
      </p>
    </Section>
  );
}

export function Business() {
  const ratings = [
    { src: "Thrillophilia", rating: 4.2, reviews: "18,670" },
    { src: "Google", rating: 3.7, reviews: "21,392" },
    { src: "TripAdvisor", rating: 3.2, reviews: "317" },
  ];
  const loop = [
    ["Discount to fill", "Weekdays 25% off, weekends 15% off, with struck-through prices in the booking engine."],
    ["Volume arrives", "Peak days fill past the point where the experience holds together."],
    ["The rating drops", "Overcrowding and hygiene complaints put 15% of reviewers at two stars or below."],
    ["Persuasion costs more", "A shopper who reads 3.7 stars needs more convincing, so every booking costs more."],
  ];
  return (
    <Section id="business" tint>
      <Header
        n="01"
        label="The business problem"
        title="The awareness is already won. The reputation is being lost."
        intro={
          <>
            Roughly 25 times the reviewed footfall of its nearest neighbours on Kanakapura Road — and
            3,289 Google reviewers rate it two stars or less. The complaints are all one complaint:
            too many people on peak days.
          </>
        }
        slides={{ from: 5, count: 6 }}
      />

      <ul className="mt-16 divide-y divide-line border-y border-line">
        {ratings.map((r) => (
          <li key={r.src} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 py-6 md:grid-cols-[12rem_1fr_6rem_8rem]">
            <span className="text-lg">{r.src}</span>
            <span className="order-last col-span-2 h-1 overflow-hidden rounded-full bg-line md:order-none md:col-span-1">
              <span className="block h-full rounded-full bg-fg" style={{ width: `${(r.rating / 5) * 100}%` }} />
            </span>
            <span className="figure text-right text-3xl">{r.rating}</span>
            <span className="hidden text-right text-sm text-muted md:block">{r.reviews} reviews</span>
          </li>
        ))}
      </ul>

      <div className="mt-28">
        <h3 className="headline max-w-xl text-3xl md:text-4xl">The loop the business is stuck in</h3>
        <ol className="mt-10 grid gap-x-10 md:grid-cols-4">
          {loop.map(([t, d], i) => (
            <li key={t} className="border-t border-fg py-6">
              <span className="text-sm tabular-nums text-muted">0{i + 1}</span>
              <p className="mt-3 text-xl font-medium tracking-tight">{t}</p>
              <p className="mt-2 leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed">
          A costlier booking argues for a deeper discount. The rating isn&apos;t only an operations
          problem — <span className="text-accent">it&apos;s a line item in the media budget.</span>
        </p>
      </div>
    </Section>
  );
}

export function MetaHighlights() {
  const rows = [
    { value: "33.72%", label: "Paid clicks that reach the page", note: "Two in three never arrive. The floor is 60–70%.", accent: true },
    { value: "₹789 / ₹1,458", label: "Cost per lead, women vs men", note: "Women are 1.85× more efficient, on 27% of the budget." },
    { value: "₹929 / ₹2,064", label: "Cost per lead, Instagram vs Facebook", note: "Instagram brings 79% of leads on 62% of spend." },
    { value: "133.33%", label: "Landing rate in October 2025", note: "More people arrived than clicked. Arithmetically impossible." },
    { value: "₹67,188", label: "Spent on placements with zero leads", note: "Audience Network, Threads and five others. Off in an afternoon." },
    { value: "₹427", label: "Facebook Stories cost per lead", note: "The cheapest lead in the account — on 1.1% of budget." },
  ];
  return (
    <Section id="meta">
      <Header
        n="02"
        label="The Meta account"
        title="Half the budget ran blind."
        intro={
          <>
            ₹7,41,739 ran across ten months in which not one lead was recorded. In the months that
            were tracked, the same account delivered leads at ₹597 each. The tracking changed, not
            the media.
          </>
        }
        slides={{ from: 11, count: 14 }}
      />
      <div className="mt-16">
        <MetaSpendChart />
      </div>
      <dl className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label} className="border-b border-line py-8 sm:pr-10">
            <dt className="text-sm text-muted">{r.label}</dt>
            <dd className={`figure mt-4 text-4xl md:text-[2.75rem] ${r.accent ? "text-accent" : ""}`}>{r.value}</dd>
            <p className="mt-3 leading-relaxed text-muted">{r.note}</p>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function GoogleHighlights() {
  const proofs = [
    { big: "0.9% → 67.4%", t: "A sliver of spend claims most of the conversions", d: "Demand Gen takes 0.9% of spend and reports 67.4% of all conversions, at ₹0.80 each." },
    { big: "34,488", t: "One month holds two thirds of the history", d: "March 2026 alone reports 67.2% of every conversion the account has ever recorded." },
    { big: "102.9%", t: "More conversions than clicks", d: "April 2026: 142 conversions from 118 clicks." },
    { big: "₹1", t: "The revenue column isn't revenue", d: "In most months the conversion value is a copy of the conversion count." },
  ];
  return (
    <Section id="google" dark>
      <Header
        dark
        n="03"
        label="The Google account"
        title="51,289 conversions. None of them are bookings."
        intro="₹30.72L spent — two thirds of all media — at a reported ₹59.89 per conversion, for a day-out ticket that sells for ₹1,499."
        slides={{ from: 25, count: 10 }}
      />
      <ol className="mt-16 border-t border-white/15">
        {proofs.map((p, i) => (
          <li key={p.big} className="grid gap-4 border-b border-white/15 py-8 md:grid-cols-12 md:items-baseline md:gap-10">
            <span className="text-sm tabular-nums text-white/45 md:col-span-1">Proof {i + 1}</span>
            <span className="figure whitespace-nowrap text-[clamp(2.5rem,4.4vw,3.5rem)] md:col-span-4">{p.big}</span>
            <div className="md:col-span-7">
              <p className="text-xl font-medium tracking-tight">{p.t}</p>
              <p className="mt-2 leading-relaxed text-white/60">{p.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
        Both platforms produce impossible numbers in the same months. That isn&apos;t a coincidence —
        it points at the website and the tracking they share.
      </p>
    </Section>
  );
}

export function Chain() {
  const steps = [
    { t: "The ad", d: "Meta or Google, tagged" },
    { t: "guhantara.com", d: "Both pixels fire" },
    { t: "Book Now", d: "The visitor clicks through" },
    { t: "Redirect", d: "To a different booking domain", broken: true },
    { t: "The booking", d: "Invisible — no pixel, no attribution", ghost: true },
  ];
  const gaps = [
    ["No attribution", "Phone and WhatsApp enquiries aren't tied to the campaign that caused them."],
    ["No lead quality", "1,259 Meta leads exist as a number and nothing else."],
    ["No repeat business", "Last year's happy corporate buyer isn't held anywhere that prompts a call."],
    ["No audiences", "Retargeting and lookalikes need a list. It lives in people's phones."],
  ];
  return (
    <Section id="tracking">
      <Header
        n="04"
        label="Tracking and CRM"
        title="The chain breaks at the exact moment money changes hands."
        intro="The pixel can't follow the visitor to the booking domain, so every completed booking goes unattributed — and Meta and Google optimise for the last thing they can see: a page view."
        slides={{ from: 35, count: 11 }}
      />

      <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.t} className={`p-6 ${s.broken ? "bg-accent text-white" : "bg-bg"} ${s.ghost ? "text-muted" : ""}`}>
            <span className={`text-sm tabular-nums ${s.broken ? "text-white/75" : "text-muted"}`}>0{i + 1}</span>
            <p className={`mt-6 text-lg font-medium tracking-tight ${s.ghost ? "line-through decoration-1" : ""}`}>{s.t}</p>
            <p className={`mt-1 text-sm ${s.broken ? "text-white/80" : "text-muted"}`}>{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl leading-relaxed text-muted">
        <span className="font-medium text-fg">The fix:</span> keep the booking inside the website —
        embed the Djubo widget, or fall back to cross-domain tracking plus a server-side purchase event.
      </p>

      <div className="mt-28 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="headline text-3xl md:text-4xl">There is no CRM. Here&apos;s what that costs.</h3>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 md:col-span-8">
          {gaps.map(([t, d]) => (
            <li key={t} className="border-t border-line py-6">
              <p className="text-lg font-medium tracking-tight">{t}</p>
              <p className="mt-1 leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Website() {
  const faults = [
    "Day-out page times out while ads run to it",
    "One URL serves day-out and rooms alike",
    "Logo cut out and pasted onto the header",
    "Nothing signals India's only cave resort",
    "Room types, rates and inclusions are hard to find",
    "One page for every campaign, never tested",
  ];
  const pages = [
    ["Day-out", "Highest volume — fix first", "Price per head, timings, activities, drive time, what children get. Book or WhatsApp above the fold."],
    ["Stay", "Highest ticket", "Real interior photographs, rates, which rooms are underground. The descent as the hero."],
    ["Corporate offsite", "Fills weekdays", "The 700-seat amphitheatre, conference space, a sample day plan, per-head pricing."],
    ["Weddings & events", "Highest value per booking", "Capacity, per-plate rates, the venues by name, real event photography."],
  ];
  return (
    <Section id="website" tint>
      <Header
        n="05"
        label="Website and landing pages"
        title="Ads are running to a page that doesn't load."
        intro="Every rupee of media was spent sending people to one website. It's the least-examined asset in the operation — and the first thing to fix. It costs nothing, and loses money every day it runs."
        slides={{ from: 46, count: 10 }}
      />
      <ul className="mt-16 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {faults.map((f, i) => (
          <li key={f} className="flex gap-4 border-b border-line py-5">
            <span className="text-sm tabular-nums text-muted">0{i + 1}</span>
            <span className={i === 0 ? "font-medium text-accent" : ""}>{f}</span>
          </li>
        ))}
      </ul>

      <h3 className="headline mt-28 max-w-xl text-3xl md:text-4xl">Four landing pages, one for each buyer.</h3>
      <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map(([t, tag, d]) => (
          <div key={t} className="border-t border-fg py-6">
            <p className="text-xl font-medium tracking-tight">{t}</p>
            <p className="mt-1 text-sm text-accent">{tag}</p>
            <p className="mt-4 leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Brand() {
  const territories = [
    { k: "One", name: "The Other Bangalore", line: "Bangalore, but underground.", d: "The city's opposite, 35 km away. Cool, dark, quiet. The cave as relief, not novelty." },
    { k: "Two", name: "India's First", line: "There is only one.", d: "Own the history. A piece of Karnataka engineering nobody has repeated in over a decade." },
    { k: "Three", name: "Descend", line: "Go down.", d: "The going-under is the experience: the threshold, the temperature drop, the tunnel, the amphitheatre.", rec: true },
  ];
  return (
    <Section id="brand">
      <Header
        n="06"
        label="Creative and brand"
        title="Selling its amenities. Giving away its architecture."
        intro="The ads lead with price, the website with a discount code, and guests come for the rain dance. Ten metres underground, the tunnel trek and a 700-seat amphitheatre are the only things no rival can copy — and they're almost absent from the advertising."
        slides={{ from: 56, count: 6 }}
      />
      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
        {territories.map((t) => (
          <div key={t.name} className={`flex flex-col p-8 ${t.rec ? "bg-night text-white" : "bg-bg"}`}>
            <div className="flex items-center justify-between text-sm">
              <span className={t.rec ? "text-white/55" : "text-muted"}>Territory {t.k.toLowerCase()}</span>
              {t.rec && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">Recommended</span>}
            </div>
            <p className="headline mt-10 text-4xl">{t.name}</p>
            <p className={`mt-4 leading-relaxed ${t.rec ? "text-white/65" : "text-muted"}`}>{t.d}</p>
            <p className="mt-auto pt-10 text-xl">&ldquo;{t.line}&rdquo;</p>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed">
        Descend, with India&apos;s First as the proof. It gives a content engine that works from day
        one — a guest filming their first descent is making the ad.
      </p>
    </Section>
  );
}

export function Weekday() {
  const buyers = [
    ["Corporate teams", "A weekday offsite package, per head, with venue, activities and a facilitator."],
    ["Remote and hybrid workers", "A work-from-the-cave day pass: quiet space, connectivity, lunch, a spa slot."],
    ["Couples on flexible leave", "A midweek stay framed as the quiet version, not the discounted one."],
    ["Retirees and wellness seekers", "A weekday spa-and-stay built around Agastya Kuteera."],
    ["Event and wedding planners", "A weekday site visit and a weekday function rate."],
  ];
  return (
    <Section id="weekday" tint>
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow n="07">The weekday problem</Eyebrow>
          <h2 className="headline mt-6 text-[clamp(2.1rem,4.6vw,3.75rem)] text-balance">
            Weekdays are empty because the audience is at work.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            A 25% weekday discount hasn&apos;t solved it, and never will. The answer is a different
            buyer, not a bigger discount — and two rules: add value instead of cutting price, and
            measure weekday and weekend separately.
          </p>
          <div className="mt-8">
            <SlidesLink from={62} count={3} />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-sm text-muted">Five buyers who are free on a Tuesday</p>
          <ol className="mt-4 border-t border-fg">
            {buyers.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line py-6">
                <span className="text-sm tabular-nums text-muted">{i + 1}</span>
                <div>
                  <p className="text-lg font-medium tracking-tight">{t}</p>
                  <p className="mt-1 leading-relaxed text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

export function Plan() {
  const phases = [
    { k: "Days 1–30", t: "Fix", s: "Make the numbers real", items: ["One pixel, one dataset", "Day-out page loading", "Separate URLs for day-out and rooms", "Separate Meta ad account", "Google conversions rebuilt", "CRM live, with a named owner", "Booking tracked end to end"] },
    { k: "Days 31–60", t: "Build", s: "Point the money at the right people", items: ["Four landing pages live", "Budget reweighted to women and Instagram", "Feed budget into Reels and Stories", "Corporate campaign and page launched", "Creative cadence begins"] },
    { k: "Days 61–90", t: "Prove", s: "Report on bookings, not clicks", items: ["First clean month of cost per booking", "Weekday and weekend reported separately", "Lead-to-booking rates baselined", "Brand territory applied", "Spend target set on real data"] },
  ];
  const months = [
    { m: "M1", b: 23, cpl: "₹482" },
    { m: "M2", b: 29, cpl: "₹431" },
    { m: "M3", b: 50, cpl: "₹381" },
    { m: "M4", b: 69, cpl: "₹354" },
    { m: "M5", b: 120, cpl: "₹311" },
    { m: "M6", b: 155, cpl: "₹284" },
  ];
  return (
    <Section id="plan">
      <Header
        n="08"
        label="The plan"
        title="Ninety days to numbers you can trust."
        intro="No spend-reduction promise on day one. We commit to a target at day 60, once a month of clean data exists."
        slides={{ from: 67, count: 6 }}
      />
      <div className="mt-16 grid gap-x-10 md:grid-cols-3">
        {phases.map((p) => (
          <div key={p.k} className="border-t border-fg py-6">
            <div className="flex items-baseline justify-between">
              <p className="headline text-4xl">{p.t}</p>
              <p className="text-sm tabular-nums text-muted">{p.k}</p>
            </div>
            <p className="mt-2 font-medium">{p.s}</p>
            <ul className="mt-6 space-y-2.5 text-muted">
              {p.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-fg/40" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-28 grid gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <Eyebrow>Six months, if the measurement holds</Eyebrow>
          <p className="headline mt-6 text-3xl md:text-4xl">Bookings ×6.6. Cost per lead −41%.</p>
          <p className="mt-5 leading-relaxed text-muted">
            Spend roughly doubles, from ₹2.7L to ₹5.6L a month, while cost per booking falls from
            about ₹11,500 to about ₹3,600. Funnel rates are planning assumptions, re-baselined after
            one clean month.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="flex h-56 items-end gap-3 border-b border-fg">
            {months.map((m, i) => (
              <div key={m.m} className="flex h-full flex-1 flex-col justify-end">
                <span className="figure mb-2 text-xl">{m.b}</span>
                <div
                  className={`rounded-t-sm ${i === months.length - 1 ? "bg-accent" : "bg-fg"}`}
                  style={{ height: `${(m.b / 155) * 78}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-3 text-sm text-muted">
            {months.map((m) => (
              <div key={m.m} className="flex-1">
                <p className="text-fg">{m.m}</p>
                <p className="tabular-nums">{m.cpl}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Planned bookings per month, with blended cost per lead.</p>
        </div>
      </div>
    </Section>
  );
}

export function Close() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/film-3-landscape.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/50 to-night" />
      <div className="wrap py-32 md:py-48">
        <h2 className="display max-w-[16ch] text-[clamp(2.5rem,7vw,6rem)]">
          You already have the demand. Now build a way to see it.
        </h2>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/70">
          21 months, ₹45.65 lakh, 21,392 reviews and a cave nobody else in India has. Three things
          unlock everything else: a territory decision, account access, and a name for the CRM.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-white/50">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-sm">
        <p>Guhantara · Performance audit · September 2026</p>
        <p>Prepared by Alttred Nexxus</p>
      </div>
    </footer>
  );
}
