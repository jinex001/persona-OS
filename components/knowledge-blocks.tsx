"use client";

import { useEffect, useState, type KeyboardEvent, type TouchEvent } from "react";
import { motion } from "framer-motion";
import type {
  AnswerBlock,
  ArtifactType,
  ArtifactVisual,
  DesignLog,
  DiscoveryCardData,
  EvidenceItem,
  HeroMedia,
  PerspectiveLens,
  SourceReference,
} from "@/data/portfolio-response";

const blockVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

type MotionBlockProps = {
  delay: number;
  eyebrow: string;
  children: React.ReactNode;
};

export function MotionBlock({ delay, eyebrow, children }: MotionBlockProps) {
  return (
    <motion.section
      variants={blockVariants}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay }}
      className="bg-white"
      data-state="completed"
    >
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">{eyebrow}</div>
      {children}
    </motion.section>
  );
}

type HeroMediaBlockProps = {
  media: HeroMedia;
};

export function HeroMediaBlock({ media }: HeroMediaBlockProps) {
  const isMotion = media.kind === "motion";
  const isVideo = media.kind === "video";
  const isImageBg = media.kind === "image";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative -mx-4 mt-10 h-[80vh] w-[calc(100%+2rem)] overflow-hidden bg-zinc-100 md:-mx-16 md:w-[calc(100%+8rem)]"
      style={
        isImageBg
          ? {
              backgroundImage: media.src
                ? `url(${media.src})`
                : "repeating-linear-gradient(45deg, #f4f4f2 0 2px, #ececea 2px 34px)",
              backgroundSize: media.src ? "cover" : undefined,
              backgroundPosition: "center",
            }
          : undefined
      }
      role={isImageBg && media.src ? "img" : undefined}
      aria-label={isImageBg && media.src ? media.alt ?? media.label : undefined}
    >
      {isVideo && media.src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={media.alt ?? media.label}
        />
      ) : null}

      {isMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% 20%, #e9e6ff 0%, transparent 55%), radial-gradient(1000px 700px at 80% 70%, #fdeee3 0%, transparent 55%), #f4f4f2",
          }}
        >
          <div className="hero-media-orb hero-media-orb-1 absolute bottom-[8%] left-[8%] h-[46vh] w-[46vh] rounded-full blur-[2px]" style={{ background: "radial-gradient(circle at 35% 35%, rgba(10,10,10,0.10), rgba(10,10,10,0) 70%)" }} />
          <div className="hero-media-orb hero-media-orb-2 absolute right-[12%] top-[20%] h-[30vh] w-[30vh] rounded-full blur-[2px]" style={{ background: "radial-gradient(circle at 35% 35%, rgba(10,10,10,0.10), rgba(10,10,10,0) 70%)" }} />
        </div>
      ) : null}

      {!media.src ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-zinc-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-[13px]">{media.label}</span>
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(255,255,255,0.9) 100%)" }}
      />

      <div className="relative z-[1] flex h-full items-end justify-between px-6 pb-6 md:px-14 md:pb-8">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
          {media.tag}
        </div>
        <div className="text-[11px] text-zinc-500">{media.meta}</div>
      </div>
    </motion.div>
  );
}

export function AnswerBlockRenderer({
  block,
  delay,
  onQuestionSelect,
}: {
  block: AnswerBlock;
  delay: number;
  onQuestionSelect: (question: string) => void;
}) {
  if (block.type === "summary") {
    return (
      <MotionBlock delay={delay} eyebrow={block.label}>
        <div className="max-w-3xl">
          <TypewriterText
            as="h1"
            text={block.title}
            speed={14}
            className="text-2xl font-semibold leading-tight text-black md:text-3xl"
          />
          <TypewriterText
            as="p"
            text={block.body}
            speed={18}
            className="mt-4 max-w-2xl text-base leading-7 text-black"
          />
        </div>
        {block.signals ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {block.signals.map((signal) => (
              <span key={signal} className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700">
                {signal}
              </span>
            ))}
          </div>
        ) : null}
      </MotionBlock>
    );
  }

  if (block.type === "perspectiveLens") {
    return <PerspectiveLensBlock delay={delay} title={block.title} label={block.label} lenses={block.lenses} />;
  }

  if (block.type === "designReasoning") {
    return (
      <MotionBlock delay={delay} eyebrow={block.label}>
        <TypewriterText as="h2" text={block.title} speed={14} className="text-xl font-semibold text-black" />
        <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {block.steps.map((step, index) => (
            <div key={step} className="rounded-[18px] p-1 transition hover:bg-zinc-50" data-state="related">
              <div className="text-xs font-semibold text-zinc-400">0{index + 1}</div>
              <TypewriterText as="p" text={step} speed={16} className="mt-2 text-base leading-7 text-black" />
            </div>
          ))}
        </div>
      </MotionBlock>
    );
  }

  if (block.type === "evidence") {
    return (
      <EvidenceBlock
        delay={delay}
        label={block.label}
        title={block.title}
        items={block.items}
        onQuestionSelect={onQuestionSelect}
      />
    );
  }

  if (block.type === "relatedWork") {
    return (
      <MotionBlock delay={delay} eyebrow={block.label}>
        <TypewriterText as="h2" text={block.title} speed={14} className="text-xl font-semibold text-black" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {block.cases.map((item) => (
            <article key={item.title} className="rounded-[22px] bg-zinc-100 p-5 transition hover:bg-zinc-200/70">
              <TypewriterText as="h3" text={item.title} speed={14} className="text-base font-semibold text-black" />
              <TypewriterText as="p" text={item.summary} speed={18} className="mt-3 text-sm leading-6 text-zinc-600" />
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">Outcome</div>
              <TypewriterText as="p" text={item.outcome} speed={18} className="mt-2 text-sm leading-6 text-black" />
            </article>
          ))}
        </div>
      </MotionBlock>
    );
  }

  if (block.type === "decisionLog") {
    return <DesignLogPreview delay={delay} label={block.label} log={block.log} />;
  }

  return (
    <MotionBlock delay={delay} eyebrow={block.label}>
      <TypewriterText as="h2" text={block.title} speed={14} className="text-xl font-semibold text-black" />
      <div className="mt-5 flex flex-wrap gap-2">
        {block.questions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionSelect(question)}
            className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 transition hover:bg-black hover:text-white"
            type="button"
            data-state="related"
          >
            {question}
          </button>
        ))}
      </div>
    </MotionBlock>
  );
}

export function AssemblingState({ question }: { question: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-24 max-w-3xl"
      data-state="loading"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Assembling</div>
      <h1 className="mt-4 text-2xl font-semibold text-black">Building a structured answer.</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-500">
        Mapping "{question}" into summary, reasoning, evidence, and related paths.
      </p>
      <div className="mt-7 flex gap-2">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: item * 0.18 }}
            className="size-2 rounded-full bg-zinc-400"
          />
        ))}
      </div>
    </motion.div>
  );
}

export function PerspectiveLensBlock({
  delay,
  label,
  title,
  lenses,
}: {
  delay: number;
  label: string;
  title: string;
  lenses: PerspectiveLens[];
}) {
  return (
    <MotionBlock delay={delay} eyebrow={label}>
      <TypewriterText as="h2" text={title} speed={14} className="text-xl font-semibold text-black" />
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {lenses.map((lens) => (
          <article key={lens.audience} className="rounded-[20px] bg-zinc-100 p-4 transition hover:bg-zinc-200/70">
            <div className="text-sm font-semibold text-black">{lens.audience}</div>
            <TypewriterText as="p" text={lens.takeaway} speed={18} className="mt-2 text-sm leading-6 text-zinc-600" />
          </article>
        ))}
      </div>
    </MotionBlock>
  );
}

export function EvidenceBlock({
  delay,
  label,
  title,
  items,
  onQuestionSelect,
}: {
  delay: number;
  label: string;
  title: string;
  items: EvidenceItem[];
  onQuestionSelect: (question: string) => void;
}) {
  return (
    <MotionBlock delay={delay} eyebrow={label}>
      <TypewriterText as="h2" text={title} speed={14} className="text-xl font-semibold text-black" />
      <ArtifactGallery items={items} onQuestionSelect={onQuestionSelect} />
    </MotionBlock>
  );
}

export function ArtifactGallery({
  items,
  onQuestionSelect,
}: {
  items: EvidenceItem[];
  onQuestionSelect: (question: string) => void;
}) {
  const artifacts = items.flatMap((item) =>
    item.references.map((reference) => ({
      item,
      reference,
      targetQuestion: getArtifactTargetQuestion(item, reference),
    })),
  );

  return (
    <div className="mt-6 grid gap-x-6 gap-y-9 md:grid-cols-2" data-state="artifact-gallery">
      {artifacts.map((artifact) => (
        <ArtifactCard
          key={`${artifact.item.title}-${artifact.reference.label}`}
          item={artifact.item}
          reference={artifact.reference}
          targetQuestion={artifact.targetQuestion}
          onQuestionSelect={onQuestionSelect}
        />
      ))}
    </div>
  );
}

function ArtifactCard({
  reference,
  targetQuestion,
  onQuestionSelect,
}: {
  item: EvidenceItem;
  reference: SourceReference;
  targetQuestion?: string;
  onQuestionSelect: (question: string) => void;
}) {
  const cardLabel = formatArtifactType(reference.type);
  const isFeatured = isFeaturedArtifact(reference);

  return (
    <article className={isFeatured ? "group md:col-span-2" : "group"}>
      <div className="mb-3 min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{cardLabel}</div>
        <h3 className={isFeatured ? "mt-2 text-xl font-semibold leading-7 text-black" : "mt-2 text-base font-semibold leading-6 text-black"}>
          {reference.label}
        </h3>
      </div>

      <ArtifactMedia
        isFeatured={isFeatured}
        reference={reference}
        targetQuestion={targetQuestion}
        onQuestionSelect={onQuestionSelect}
      />

      <div className="mt-3">
        {reference.href ? (
          <a
            href={reference.href}
            className="text-sm font-medium text-zinc-500 underline-offset-4 transition hover:text-black hover:underline"
          >
            View artifact &rarr;
          </a>
        ) : targetQuestion ? (
          <button
            onClick={() => onQuestionSelect(targetQuestion)}
            className="text-left text-sm font-medium text-zinc-500 underline-offset-4 transition hover:text-black hover:underline"
            type="button"
          >
            View artifact &rarr;
          </button>
        ) : (
          <span className="text-sm font-medium text-zinc-400" aria-disabled="true">
            View artifact &rarr;
          </span>
        )}
      </div>
    </article>
  );
}

function ArtifactMedia({
  isFeatured,
  reference,
  targetQuestion,
  onQuestionSelect,
}: {
  isFeatured: boolean;
  reference: SourceReference;
  targetQuestion?: string;
  onQuestionSelect: (question: string) => void;
}) {
  const visuals = getArtifactVisuals(reference);

  if (visuals.length > 1) {
    return (
      <ArtifactCarousel
        isFeatured={isFeatured}
        reference={reference}
        targetQuestion={targetQuestion}
        visuals={visuals}
        onQuestionSelect={onQuestionSelect}
      />
    );
  }

  return (
    <ArtifactSinglePreview
      isFeatured={isFeatured}
      reference={reference}
      targetQuestion={targetQuestion}
      visual={visuals[0]}
      onQuestionSelect={onQuestionSelect}
    />
  );
}

function ArtifactSinglePreview({
  isFeatured,
  reference,
  targetQuestion,
  visual,
  onQuestionSelect,
}: {
  isFeatured: boolean;
  reference: SourceReference;
  targetQuestion?: string;
  visual?: ArtifactVisual;
  onQuestionSelect: (question: string) => void;
}) {
  const preview = (
    <ArtifactPreviewFrame isFeatured={isFeatured} reference={reference} visual={visual} />
  );

  if (reference.href) {
    return (
      <a href={reference.href} className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4">
        {preview}
      </a>
    );
  }

  if (targetQuestion) {
    return (
      <button
        onClick={() => onQuestionSelect(targetQuestion)}
        className="block w-full rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
        type="button"
      >
        {preview}
      </button>
    );
  }

  return preview;
}

function ArtifactCarousel({
  isFeatured,
  reference,
  targetQuestion,
  visuals,
  onQuestionSelect,
}: {
  isFeatured: boolean;
  reference: SourceReference;
  targetQuestion?: string;
  visuals: ArtifactVisual[];
  onQuestionSelect: (question: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const activeVisual = visuals[activeIndex];
  const goToPrevious = () => setActiveIndex((current) => (current === 0 ? visuals.length - 1 : current - 1));
  const goToNext = () => setActiveIndex((current) => (current === visuals.length - 1 ? 0 : current + 1));

  function openArtifact() {
    if (!targetQuestion) return;
    onQuestionSelect(targetQuestion);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }

    if ((event.key === "Enter" || event.key === " ") && !reference.href) {
      event.preventDefault();
      openArtifact();
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX;
    setTouchStartX(null);

    if (Math.abs(deltaX) < 40) return;
    if (deltaX > 0) goToPrevious();
    else goToNext();
  }

  return (
    <div
      className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 transition group-hover:border-zinc-300"
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-label={`${reference.label} design process carousel`}
    >
      <div className="relative">
        {reference.href ? (
          <a href={reference.href} className="block focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
            <ArtifactVisualImage isFeatured={isFeatured} title={reference.label} visual={activeVisual} />
          </a>
        ) : targetQuestion ? (
          <button
            onClick={openArtifact}
            className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            type="button"
          >
            <ArtifactVisualImage isFeatured={isFeatured} title={reference.label} visual={activeVisual} />
          </button>
        ) : (
          <ArtifactVisualImage isFeatured={isFeatured} title={reference.label} visual={activeVisual} />
        )}

        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <div className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600 shadow-sm">
            {activeVisual.stage ?? `Step ${activeIndex + 1}`}
          </div>
          <div className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-500 shadow-sm">
            {activeIndex + 1}/{visuals.length}
          </div>
        </div>

        <div className="absolute inset-y-0 left-3 flex items-center">
          <button
            onClick={(event) => {
              event.stopPropagation();
              goToPrevious();
            }}
            className="flex size-9 items-center justify-center rounded-full bg-white/90 text-lg text-black shadow-sm transition hover:bg-white"
            type="button"
            aria-label="Previous artifact image"
          >
            &larr;
          </button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            onClick={(event) => {
              event.stopPropagation();
              goToNext();
            }}
            className="flex size-9 items-center justify-center rounded-full bg-white/90 text-lg text-black shadow-sm transition hover:bg-white"
            type="button"
            aria-label="Next artifact image"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white px-4 py-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-black">{activeVisual.stage ?? `Step ${activeIndex + 1}`}</div>
          {activeVisual.note ? <div className="mt-1 truncate text-xs text-zinc-500">{activeVisual.note}</div> : null}
        </div>
        <div className="flex shrink-0 gap-1.5" aria-label="Artifact image pagination">
          {visuals.map((visual, index) => (
            <button
              key={`${visual.src}-${index}`}
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(index);
              }}
              className={`size-2.5 rounded-full transition ${
                index === activeIndex ? "bg-black" : "bg-zinc-300 hover:bg-zinc-500"
              }`}
              type="button"
              aria-label={`Show ${visual.stage ?? `artifact image ${index + 1}`}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtifactPreviewFrame({
  isFeatured,
  reference,
  visual,
}: {
  isFeatured: boolean;
  reference: SourceReference;
  visual?: ArtifactVisual;
}) {
  const variant = getArtifactPreviewVariant(reference.type, reference.label);

  if (visual) {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 transition group-hover:border-zinc-300">
        <ArtifactVisualImage isFeatured={isFeatured} title={reference.label} visual={visual} />
      </div>
    );
  }

  return <ArtifactFallbackPreview isFeatured={isFeatured} variant={variant} />;
}

function ArtifactVisualImage({
  isFeatured,
  title,
  visual,
}: {
  isFeatured: boolean;
  title: string;
  visual: ArtifactVisual;
}) {
  const aspectClass = isFeatured ? "aspect-[16/10]" : "aspect-[4/3]";

  return (
    <img
      src={visual.src}
      alt={visual.alt || `${title} preview`}
      className={`${aspectClass} w-full object-cover object-top`}
      loading="lazy"
    />
  );
}

function ArtifactFallbackPreview({ isFeatured, variant }: { isFeatured: boolean; variant: string }) {
  const aspectClass = isFeatured ? "aspect-[16/10]" : "aspect-[4/3]";

  if (variant === "timeline") {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition group-hover:border-zinc-300" aria-hidden="true">
        <div className={`flex ${aspectClass} items-center gap-2`}>
          {[32, 58, 44, 70].map((width, index) => (
            <div key={index} className="flex flex-1 flex-col justify-center gap-2">
              <div className="h-px bg-zinc-300" />
              <div className="h-2 rounded-full bg-black" style={{ width: `${width}%` }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "screen") {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition group-hover:border-zinc-300" aria-hidden="true">
        <div className={`${aspectClass} rounded-md border border-zinc-200 bg-white p-3`}>
          <div className="h-3 w-20 rounded-full bg-black" />
          <div className="mt-4 grid grid-cols-[1fr_2fr] gap-3">
            <div className="h-16 rounded-md bg-zinc-200" />
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-zinc-300" />
              <div className="h-2 w-4/5 rounded-full bg-zinc-300" />
              <div className="h-8 rounded-md bg-zinc-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "log") {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition group-hover:border-zinc-300" aria-hidden="true">
        <div className="space-y-2">
          <div className="h-2 w-24 rounded-full bg-black" />
          <div className="h-2 rounded-full bg-zinc-300" />
          <div className="h-2 w-5/6 rounded-full bg-zinc-300" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-9 rounded-md bg-white ring-1 ring-zinc-200" />
            <div className="h-9 rounded-md bg-white ring-1 ring-zinc-200" />
            <div className="h-9 rounded-md bg-zinc-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition group-hover:border-zinc-300" aria-hidden="true">
      <div className={`grid ${aspectClass} grid-cols-3 gap-2`}>
        <div className="rounded-md bg-white ring-1 ring-zinc-200" />
        <div className="rounded-md bg-zinc-200" />
        <div className="rounded-md bg-white ring-1 ring-zinc-200" />
      </div>
      <div className="mt-3 h-2 w-2/3 rounded-full bg-black" />
    </div>
  );
}

function isFeaturedArtifact(reference: SourceReference) {
  return reference.label === "Current Time Timeline State";
}

function getArtifactVisuals(reference: SourceReference): ArtifactVisual[] {
  if (reference.previewImages && reference.previewImages.length > 0) return reference.previewImages;
  if (!reference.previewImage) return [];

  return [
    {
      src: reference.previewImage,
      alt: `${reference.label} preview`,
      stage: "Artifact preview",
    },
  ];
}

function getArtifactPreviewVariant(type: ArtifactType, title: string) {
  const value = `${type} ${title}`.toLowerCase();

  if (value.includes("timeline") || value.includes("flow")) return "timeline";
  if (value.includes("prototype") || value.includes("screen") || value.includes("figma")) return "screen";
  if (value.includes("log") || value.includes("note") || value.includes("rule")) return "log";

  return "map";
}

function formatArtifactType(type: ArtifactType) {
  if (type === "Figma UI / Timeline behavior") return "Figma UI / Timeline Behavior";

  return type
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getArtifactTargetQuestion(item: EvidenceItem, reference: SourceReference) {
  const value = `${item.title} ${reference.label}`.toLowerCase();

  if (value.includes("decision log #12")) return "Open Decision Log #12.";
  if (value.includes("meeting room")) return "Show me the Meeting Room App Redesign case.";

  return undefined;
}

export function DesignLogPreview({ delay, label, log }: { delay: number; label: string; log: DesignLog }) {
  return (
    <MotionBlock delay={delay} eyebrow={label}>
      <article className="rounded-[28px] bg-zinc-100 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <TypewriterText as="h2" text={log.title} speed={14} className="text-xl font-semibold text-black" />
            <TypewriterText
              as="p"
              text={log.decisionSummary}
              speed={18}
              className="mt-3 max-w-2xl text-base leading-7 text-black"
            />
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white px-3 py-1.5 text-zinc-600">{log.version}</span>
            <span className="rounded-full bg-white px-3 py-1.5 text-zinc-600">{log.date}</span>
            <span className="rounded-full bg-black px-3 py-1.5 text-white">{log.status}</span>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Why this matters</div>
            <TypewriterText as="p" text={log.whyItMatters} speed={18} className="mt-2 text-sm leading-6 text-zinc-700" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Related project</div>
            <TypewriterText as="p" text={log.relatedProject} speed={18} className="mt-2 text-sm leading-6 text-zinc-700" />
          </div>
        </div>
      </article>
    </MotionBlock>
  );
}

function TypewriterText({
  as: Component = "p",
  className,
  speed = 18,
  text,
}: {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  speed?: number;
  text: string;
}) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    setVisibleLength(0);

    if (!text) return;

    let frameId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    function tick(length: number) {
      if (cancelled) return;

      const nextLength = Math.min(text.length, length + 1);
      setVisibleLength(nextLength);

      if (nextLength >= text.length) return;

      frameId = setTimeout(() => {
        tick(nextLength);
      }, speed);
    }

    frameId = setTimeout(() => {
      tick(0);
    }, Math.min(speed * 2, 50));

    return () => {
      cancelled = true;
      if (frameId) clearTimeout(frameId);
    };
  }, [speed, text]);

  return (
    <Component className={className}>
      {text.slice(0, visibleLength)}
      {visibleLength < text.length ? <span className="inline-block w-[0.55ch] animate-pulse text-zinc-400">|</span> : null}
    </Component>
  );
}

export function DiscoveryRail({
  cards,
  onSelect,
}: {
  cards: DiscoveryCardData[];
  onSelect: (question: string) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.86 }}
      className="mt-12"
      aria-label="Discovery rail"
      data-state="related-exploration"
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Discovery Rail</div>
          <h2 className="mt-2 text-xl font-semibold text-black">Contextual next paths</h2>
        </div>
        <div className="hidden text-sm text-zinc-500 md:block">Generated from the current conversation context.</div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <DiscoveryCard key={card.id} card={card} index={index} onSelect={onSelect} />
        ))}
      </div>
    </motion.section>
  );
}

export function DiscoveryCard({
  card,
  index,
  onSelect,
}: {
  card: DiscoveryCardData;
  index: number;
  onSelect: (question: string) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
        delay: 1 + index * 0.08,
      }}
      onClick={() => onSelect(card.targetQuestion)}
      className="flex min-h-[170px] flex-col items-start justify-start rounded-[24px] bg-zinc-100 p-4 text-left transition hover:-translate-y-0.5 hover:bg-zinc-200/70 focus:outline-none focus:ring-2 focus:ring-black"
      type="button"
      data-state="related"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{card.type}</div>
      <h3 className="mt-4 text-lg font-semibold leading-6 text-black">{card.title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{card.reason}</p>
      <div className="mt-5 text-sm font-semibold text-black">Open path &rarr;</div>
    </motion.button>
  );
}
