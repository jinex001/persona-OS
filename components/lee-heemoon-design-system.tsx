// Specimen of the Lee Heemoon design system, rendered with the site's own tokens and fonts.
// Values come from the system's tokens.json (extracted from the live leeheemoon.com code).

const HEEMOON_BLUE = "#0106c7";

const ICON_GLYPHS = [
  { char: "", label: "Prev" },
  { char: "", label: "Next" },
  { char: "", label: "Go to" },
  { char: "", label: "Back" },
  { char: "", label: "Title" },
  { char: "", label: "EN" },
  { char: "", label: "KR" },
];

const COLOURS = [
  { name: "heemoon-blue", value: "#0106C7", note: "The one brand colour", swatch: HEEMOON_BLUE, ink: "#ffffff" },
  { name: "white", value: "#FFFFFF", note: "Text on blue · 11.3:1", swatch: "#ffffff", ink: "#000000" },
  { name: "black", value: "#000000", note: "Project ground · nav text", swatch: "#000000", ink: "#ffffff" },
  { name: "glass-nav", value: "58% white", note: "Nav pill · 18px blur", swatch: "rgba(255,255,255,0.58)", ink: "#000000" },
];

export const LEE_HEEMOON_SYSTEM_STATS = [
  { value: "1", label: "Brand colour" },
  { value: "11", label: "Text styles" },
  { value: "7", label: "Radii" },
  { value: "8", label: "Components" },
];

const COMPONENTS = [
  "NavBar",
  "AlbumTitle",
  "ArrowButtons",
  "BackButton",
  "ProjectCard",
  "RelatedCard",
  "SlideCaption",
  "TeaserCarousel",
];

function Icon({ char, className = "" }: { char: string; className?: string }) {
  return (
    <span aria-hidden="true" className={`font-heemoon-icons leading-none ${className}`}>
      {char}
    </span>
  );
}

function PanelLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
      <span className="text-black">{index}</span>
      <span>{children}</span>
    </div>
  );
}

export function LeeHeemoonDesignSystem() {
  return (
    <div className="space-y-12">
      <dl className="grid grid-cols-2 gap-px bg-black ring-1 ring-black md:grid-cols-4">
        {LEE_HEEMOON_SYSTEM_STATS.map((stat) => (
          <div key={stat.label} className="bg-white p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">{stat.label}</dt>
            <dd className="mt-2 font-title text-5xl font-semibold leading-none tracking-[-0.04em] text-black">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section>
        <PanelLabel index="A">Colour — blue speaks, images do the rest</PanelLabel>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {COLOURS.map((colour, index) => (
            <div
              key={colour.name}
              className={`flex flex-col justify-between p-4 ring-1 ring-inset ring-black/10 ${index === 0 ? "min-h-[180px] sm:col-span-2 lg:col-span-2 lg:row-span-2" : "min-h-[110px]"}`}
              style={{
                background:
                  colour.name === "glass-nav"
                    ? `linear-gradient(${colour.swatch}, ${colour.swatch}), linear-gradient(120deg, #9fa3b5, #c9b6c3)`
                    : colour.swatch,
                color: colour.ink,
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{colour.name}</span>
              <span>
                <span className={`block font-title font-semibold tracking-[-0.03em] ${index === 0 ? "text-4xl md:text-5xl" : "text-xl"}`}>
                  {colour.value}
                </span>
                <span className="mt-1 block text-xs opacity-80">{colour.note}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <PanelLabel index="B">Shape — blocks square, images round</PanelLabel>
        <div className="grid gap-6 md:grid-cols-2">
          <figure>
            <div className="flex aspect-[4/3] flex-col justify-end gap-2.5 bg-zinc-100 p-5">
              <div className="self-start px-[5px] py-[5px] font-title text-xl font-medium leading-[26px] text-white" style={{ background: HEEMOON_BLUE }}>
                Part 3. Minyo Samcheolli
              </div>
              <div className="font-nanum-r max-w-sm p-[5px] text-base leading-normal text-white [word-break:keep-all]" style={{ background: HEEMOON_BLUE }}>
                <strong className="italic">내가 배운 이 소리는 어디에서 왔을까?</strong>
              </div>
            </div>
            <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              radius-none · text always sits on a blue bar
            </figcaption>
          </figure>
          <figure>
            <div className="flex aspect-[4/3] flex-col items-start justify-end bg-black p-5">
              <img
                src="/case-studies/lee-heemoon/obsg-project-overview.jpg"
                alt="OBSG project image on a rounded project-wheel card"
                className="aspect-square w-1/2 rounded-[20px] object-cover"
              />
              <div className="mt-[5px] flex items-center gap-2">
                <Icon char={""} className="text-lg text-white" />
                <span className="font-nanum-eb rounded-[5px] bg-white px-2.5 py-[5px] text-xl leading-none" style={{ color: HEEMOON_BLUE }}>
                  깊은 사랑 시리즈
                </span>
              </div>
            </div>
            <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              radius-card 20px · images and cards round
            </figcaption>
          </figure>
        </div>
      </section>

      <section>
        <PanelLabel index="C">Type & icons — Poppins, NanumSquareRound, and an icon font</PanelLabel>
        <div className="grid gap-px bg-black ring-1 ring-black md:grid-cols-3">
          <div className="bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Latin UI · Poppins</div>
            <div className="mt-6 font-title text-4xl font-medium leading-tight text-black">Aa Part 1.</div>
            <div className="mt-2 font-title text-sm font-semibold uppercase text-black">What&apos;s new? · Projects</div>
          </div>
          <div className="bg-white p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">Korean · NanumSquareRound</div>
            <div className="font-nanum-eb mt-6 text-4xl leading-tight text-black">가나 깊은사랑</div>
            <div className="font-nanum-r mt-2 text-sm text-black [word-break:keep-all]">경기민요의 시간을 거슬러 오른다.</div>
          </div>
          <div className="p-5 text-white" style={{ background: HEEMOON_BLUE }}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Icon font · Heemoon</div>
            <ul className="mt-6 grid grid-cols-4 gap-2">
              {ICON_GLYPHS.map((glyph) => (
                <li key={glyph.label} className="flex flex-col items-center gap-1.5">
                  <span className="flex size-10 items-center justify-center bg-white/10 ring-1 ring-inset ring-white/30">
                    <Icon char={glyph.char} className="text-lg" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">{glyph.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <PanelLabel index="D">Components — 8, documented from the live pages</PanelLabel>
        <div className="relative overflow-hidden px-3 py-8" style={{ background: "linear-gradient(120deg, #9fa3b5, #c9b6c3)" }}>
          <div className="mx-auto flex h-[60px] max-w-3xl items-center justify-between overflow-hidden rounded-[50px] bg-white/[0.58] pl-5 shadow-[0_0_5px_rgba(0,0,0,0.1)] backdrop-blur-[18px]">
            <img src="/case-studies/lee-heemoon/lee-heemoon-wordmark.svg" alt="Lee Heemoon" className="h-4 md:h-5" />
            <div className="hidden gap-6 md:flex">
              {["What's new?", "Projects", "About"].map((item, index) => (
                <span key={item} className="flex flex-col items-center gap-[3px] font-title text-sm font-semibold uppercase leading-[14px] text-black">
                  {item}
                  <span className="h-[3px] w-[30px]" style={{ background: index === 0 ? HEEMOON_BLUE : "transparent" }} />
                </span>
              ))}
            </div>
            <span className="flex h-full items-center rounded-r-[50px] pl-3 pr-5 font-title text-[11px] text-white" style={{ background: HEEMOON_BLUE }}>
              © Ewon art
            </span>
          </div>
          <div className="absolute right-3 top-3 hidden flex-col gap-[5px] md:flex">
            {["", ""].map((char) => (
              <span key={char} className="flex size-[30px] items-center justify-center text-sm text-white shadow-[0_0_5px_rgba(0,0,0,0.1)]" style={{ background: HEEMOON_BLUE }}>
                <Icon char={char} />
              </span>
            ))}
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {COMPONENTS.map((component) => (
            <li key={component} className="rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-black ring-1 ring-inset ring-black">
              {component}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** Compact visual for the Services page: the same system, condensed to one panel. */
export function LeeHeemoonSystemTile({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden p-6 text-white md:p-8" style={{ background: HEEMOON_BLUE }}>
      <div className="flex items-start justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">
        <span>Colour</span>
        <span>Type</span>
        <span>Icons</span>
      </div>
      <div>
        <div className="font-title text-[clamp(40px,7vw,88px)] font-semibold leading-[0.9] tracking-[-0.04em]">#0106C7</div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-nanum-eb rounded-[5px] bg-white px-2.5 py-[5px] text-lg leading-none" style={{ color: HEEMOON_BLUE }}>
            깊은 사랑 시리즈
          </span>
          {["", "", "", ""].map((char) => (
            <span key={char} className="flex size-[30px] items-center justify-center bg-white text-sm" style={{ color: HEEMOON_BLUE }}>
              <Icon char={char} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
