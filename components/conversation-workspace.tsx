"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnswerBlockRenderer, HeroMediaBlock } from "@/components/knowledge-blocks";
import {
  resolveQuestion,
  starterQuestions,
  type QuestionNode,
} from "@/data/portfolio-response";

type ComposerState = "idle" | "disabled";
type TreeNode = QuestionNode & {
  instanceId: string;
  state: "current" | "answered";
};

const AUTO_COLLAPSE_MS = 10000;

export function ConversationWorkspace() {
  const [activeQuestion, setActiveQuestion] = useState<QuestionNode | null>(null);
  const [history, setHistory] = useState<TreeNode[]>([]);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [composerState, setComposerState] = useState<ComposerState>("idle");
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answerTopRef = useRef<HTMLDivElement | null>(null);
  const hasConversation = activeQuestion !== null;

  const knowledgeMapGroups = useMemo(() => {
    const workCases = starterQuestions.filter((starter) => starter.category === "Work");

    return [
      {
        label: "Start",
        items: [{ id: "start", label: "Design philosophy", question: null as string | null }],
      },
      {
        label: "Identity",
        items: [{ id: "who-are-you", label: "Who are you", question: "Who are you?" as string | null }],
      },
      {
        label: "Services",
        items: [
          { id: "studio-services", label: "What I can build for you", question: "What can you build for me?" as string | null },
        ],
      },
      {
        label: "Works",
        items: workCases.map((starter) => ({
          id: starter.id,
          label: starter.question,
          question: starter.question as string | null,
        })),
      },
    ];
  }, []);

  useEffect(() => {
    if (!isTreeOpen || history.length === 0) return;
    if (collapseTimer.current) clearTimeout(collapseTimer.current);

    collapseTimer.current = setTimeout(() => {
      setIsTreeOpen(false);
    }, AUTO_COLLAPSE_MS);

    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, [isTreeOpen, history.length, activeQuestion?.id]);

  useEffect(() => {
    if (!activeQuestion || !answerTopRef.current) return;

    answerTopRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [activeQuestion]);

  function goHome() {
    setActiveQuestion(null);
    setComposerState("idle");
    setIsTreeOpen(true);
  }

  function activateQuestion(questionText: string) {
    const trimmed = questionText.trim();
    if (!trimmed || composerState === "disabled") return;

    const activeElement = document.activeElement as HTMLElement | null;
    activeElement?.blur();

    const resolved = resolveQuestion(trimmed);
    setIsTreeOpen(true);
    setComposerState("disabled");
    setActiveQuestion(resolved);
    setHistory((current) => {
      const answered = current.map((node) => ({ ...node, state: "answered" as const }));
      return [
        ...answered,
        {
          ...resolved,
          question: trimmed,
          instanceId: `${resolved.id}-${Date.now()}`,
          state: "current",
        },
      ];
    });
  }

  function handlePresentationComplete() {
    if (!answerTopRef.current) {
      setComposerState("idle");
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        answerTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setComposerState("idle");
      });
    });
  }

  return (
    <main className="min-h-screen bg-white text-ink">
      {hasConversation ? (
        <button
          onClick={goHome}
          className="fixed left-4 top-4 z-30 flex items-center gap-1.5 rounded-full bg-white/78 px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-[0_12px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl transition hover:bg-white hover:text-black md:left-7 md:top-7"
          type="button"
          aria-label="Back to start"
        >
          <span aria-hidden="true">←</span> Back
        </button>
      ) : null}

      <FloatingQuestionTree
        groups={knowledgeMapGroups}
        activeQuestionId={activeQuestion?.id ?? null}
        isHome={!hasConversation}
        isOpen={isTreeOpen}
        onSelectQuestion={activateQuestion}
        onGoHome={goHome}
        onToggle={() => setIsTreeOpen((current) => !current)}
      />

      <section className="main-content min-h-screen min-w-0 px-5 pt-6 md:px-8 lg:px-10">
        {hasConversation ? <div ref={answerTopRef} className="answer-top-anchor" /> : null}
        <AnimatePresence mode="wait">
          {!hasConversation ? (
            <OpeningWorkspace key="opening" onSelectQuestion={activateQuestion} />
          ) : null}
        </AnimatePresence>

        {hasConversation ? (
          <AnswerWorkspace
            key={activeQuestion.id}
            question={activeQuestion}
            onPresentationComplete={handlePresentationComplete}
            onSelectQuestion={activateQuestion}
          />
        ) : null}
      </section>
    </main>
  );
}

const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EDITORIAL_EASE, delay },
  };
}

function OpeningWorkspace({ onSelectQuestion }: { onSelectQuestion: (question: string) => void }) {
  const workCases = starterQuestions.filter((starter) => starter.category === "Work");
  const servicesQuestion = starterQuestions.find((starter) => starter.category === "Services")?.question ?? "What can you build for me?";
  const identityQuestion = starterQuestions.find((starter) => starter.category === "Identity")?.question ?? "Who are you?";

  return (
    <div className="mx-auto max-w-[1440px] pb-10">
      <motion.div
        {...fadeUp(0.05)}
        className="mt-14 flex items-end justify-between gap-6 border-b-2 border-black pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black md:mt-16"
      >
        <span>Jinwh — Studio of One</span>
        <span className="hidden md:inline">Berlin</span>
        <span className="hidden md:inline">Brand · Product · Code</span>
        <span>Vol. 2026</span>
      </motion.div>

      <h1 className="mt-6 font-title text-[clamp(52px,14.5vw,224px)] font-semibold uppercase leading-[0.86] tracking-[-0.045em] text-black">
        <HeroLine index="01" delay={0.15}>
          Identity<span className="text-[#ff1744]">.</span>
        </HeroLine>
        <HeroLine index="02" delay={0.3}>
          Product<span className="text-[#ff1744]">.</span>
        </HeroLine>
        <HeroLine index="03" delay={0.45}>
          <span className="bg-black px-[0.05em] text-[#39ff14]">Code.</span>
        </HeroLine>
      </h1>

      <div className="mt-10 grid gap-8 border-t border-black pt-6 md:grid-cols-12">
        <motion.p
          {...fadeUp(0.7)}
          className="font-serif text-3xl italic leading-[1.08] text-black md:col-span-6 md:text-5xl"
        >
          A studio of one — from the first mark to the shipped product.
        </motion.p>
        <motion.div {...fadeUp(0.85)} className="md:col-span-5 md:col-start-8">
          <p className="text-base leading-7 text-zinc-700">
            Independent designer in Berlin. I shape the brand, design the product, and build it with AI-assisted code — so
            nothing gets lost between agency, designer, and developer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSelectQuestion(servicesQuestion)}
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff1744] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              What I can build for you →
            </button>
            <button
              type="button"
              onClick={() => onSelectQuestion(identityQuestion)}
              className="rounded-full px-6 py-3 text-sm font-semibold text-black ring-2 ring-inset ring-black transition hover:bg-black hover:text-white focus:outline-none focus:ring-offset-2"
            >
              Who I am
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div {...fadeUp(1)} className="mt-16 grid gap-3 md:grid-cols-12">
        <EditorialFigure
          className="md:col-span-7"
          aspect="aspect-[4/3]"
          number="01"
          caption="Build — Artist's Digital Archive, live since 2024"
          video="/case-studies/lee-heemoon/lee-heemoon-360-carousel.mp4"
          image="/case-studies/lee-heemoon/lee-heemoon-360-carousel-poster.jpg"
          alt="The Lee Heemoon website's 360-degree Projects carousel rotating between project cards"
          onClick={() => onSelectQuestion("Show me the Artist's Digital Archive case.")}
        />
        <div className="grid gap-3 md:col-span-5">
          <EditorialFigure
            aspect="aspect-[16/10]"
            number="02"
            caption="Product — SaaS Admin Redesign"
            image="/case-studies/saas-admin-redesign/hero-poster.jpg"
            alt="LIZ Smart Office floorplan and resource-management interface"
            onClick={() => onSelectQuestion("Show me the SaaS Admin Redesign case.")}
          />
          <EditorialFigure
            aspect="aspect-[16/10]"
            number="03"
            caption="Product — Filter-First Matching"
            image="/case-studies/coach-finder-filter/hero.jpg"
            alt="Coach-finder app home screen with filter pills"
            onClick={() => onSelectQuestion("Show me the Filter-First Matching case.")}
          />
        </div>
      </motion.div>

      <section className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mt-24 w-screen bg-black px-5 py-20 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Manifesto</div>
          <p className="mt-8 font-serif text-[clamp(40px,6.6vw,108px)] leading-[1.02] tracking-[-0.01em]">
            Design is <Highlighter color="#ff1744">not presentation.</Highlighter> Design is the starting point for{" "}
            <Highlighter color="#39ff14">finding the right solution.</Highlighter>
          </p>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-end justify-between gap-4 border-b-2 border-black pb-3">
          <h2 className="font-title text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.035em] text-black md:text-7xl">
            Selected work
          </h2>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
            Index — {String(workCases.length).padStart(2, "0")}
          </span>
        </div>
        <ol>
          {workCases.map((work, index) => (
            <li key={work.id}>
              <button
                type="button"
                onClick={() => onSelectQuestion(work.question)}
                className="group grid w-full grid-cols-12 items-center gap-x-4 gap-y-4 border-b border-black px-1 py-6 text-left transition-colors hover:bg-[#39ff14] focus:outline-none focus-visible:bg-[#39ff14] md:px-3 md:py-8"
                data-state="related"
              >
                <span className="col-span-2 self-start pt-1 text-sm font-semibold tabular-nums text-black md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 md:col-span-6">
                  <span className="block font-title text-2xl font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-black transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                    {work.title ?? work.question}
                  </span>
                  <span className="mt-2 block font-serif text-lg italic leading-snug text-zinc-600 group-hover:text-black md:text-xl">
                    {work.cardDescription ?? work.intent}
                  </span>
                </span>
                <span className="hidden text-[11px] font-semibold uppercase leading-5 tracking-[0.14em] text-zinc-600 group-hover:text-black md:col-span-2 md:block">
                  {work.tags?.slice(0, 2).join(" / ")}
                </span>
                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-black md:col-span-1 md:block">
                  {work.year}
                </span>
                <span className="col-span-12 overflow-hidden md:col-span-2">
                  <WorkThumbnail src={work.thumbnail} label={work.thumbnailLabel ?? work.title ?? ""} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24 grid gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={() => onSelectQuestion(servicesQuestion)}
          className="group flex min-h-[320px] flex-col justify-between bg-[#ff1744] p-6 text-left text-white transition hover:bg-black md:col-span-2 md:p-10"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Services</span>
          <span>
            <span className="block font-title text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.035em] md:text-7xl">
              A brand, a product, an idea?
            </span>
            <span className="mt-4 block font-serif text-2xl italic md:text-3xl">See what I can build for you →</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelectQuestion(identityQuestion)}
          className="flex min-h-[320px] flex-col justify-between bg-zinc-100 p-6 text-left text-black transition hover:bg-zinc-200 md:p-10"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Identity</span>
          <span className="font-serif text-3xl italic leading-[1.05] md:text-5xl">Who is behind the studio →</span>
        </button>
      </section>

      <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t-2 border-black pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
        <span>© 2026 Jinwh — Studio of One</span>
        <span>Berlin</span>
      </footer>
    </div>
  );
}

function HeroLine({ index, delay, children }: { index: string; delay: number; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EDITORIAL_EASE, delay }}
        className="flex items-start gap-[0.12em]"
      >
        <span className="mt-[0.5em] font-sans text-[11px] font-semibold tracking-normal md:mt-[0.4em] md:text-sm">{index}</span>
        <span>{children}</span>
      </motion.span>
    </span>
  );
}

function Highlighter({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundSize: "100% 0.07em",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 92%",
      }}
    >
      {children}
    </span>
  );
}

function EditorialFigure({
  className = "",
  aspect,
  number,
  caption,
  image,
  video,
  alt,
  onClick,
}: {
  className?: string;
  aspect: string;
  number: string;
  caption: string;
  image: string;
  video?: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <figure className={className}>
      <button type="button" onClick={onClick} className={`group relative block w-full overflow-hidden bg-zinc-100 ${aspect}`}>
        {video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
          />
        ) : (
          <img
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            src={image}
            alt={alt}
          />
        )}
      </button>
      <figcaption className="mt-2 flex gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
        <span className="text-black">Fig. {number}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function WorkThumbnail({ src, label }: { src?: string; label: string }) {
  if (!src) {
    return (
      <span className="flex aspect-[4/3] items-center justify-center bg-black p-3 text-center font-title text-lg font-semibold uppercase leading-tight tracking-[-0.02em] text-[#39ff14] md:text-base">
        {label}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
    />
  );
}

function AnswerWorkspace({
  onPresentationComplete,
  question,
  onSelectQuestion,
}: {
  onPresentationComplete: () => void;
  question: QuestionNode;
  onSelectQuestion: (question: string) => void;
}) {
  const answerBlocks = useMemo(
    () => question.answerBlocks.filter((block) => block.type !== "perspectiveLens"),
    [question.answerBlocks],
  );

  useEffect(() => {
    onPresentationComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  return (
    <div className="mx-auto max-w-5xl pb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="flex justify-end"
      >
        <div className="relative mr-1 rounded-[3px] bg-black px-5 py-4 text-sm text-white md:mr-5 md:min-w-[300px]">
          {question.question}
          <div className="absolute bottom-[-9px] right-0 h-0 w-0 border-l-[14px] border-t-[14px] border-l-transparent border-t-black" />
        </div>
      </motion.div>

      {question.heroMedia ? <HeroMediaBlock media={question.heroMedia} /> : null}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        className="mt-12 max-w-2xl"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{question.category} / Intent</div>
        <h1 className="mt-3 text-2xl font-semibold text-black md:text-3xl">{question.answerTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{question.intent}</p>
      </motion.div>

      <div className="mt-10 space-y-10">
        {answerBlocks.map((block) => (
          <div key={block.id} className={block.type === "serviceStack" ? "" : "max-w-4xl"}>
            <AnswerBlockRenderer block={block} delay={0.18} onQuestionSelect={onSelectQuestion} currentQuestionId={question.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingQuestionTree({
  groups,
  activeQuestionId,
  isHome,
  isOpen,
  onSelectQuestion,
  onGoHome,
  onToggle,
}: {
  groups: { label: string; items: { id: string; label: string; question: string | null }[] }[];
  activeQuestionId: string | null;
  isHome: boolean;
  isOpen: boolean;
  onSelectQuestion: (question: string) => void;
  onGoHome: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="fixed right-4 top-4 z-30 md:right-7 md:top-7">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.aside
            key="question-tree-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100vh-32px)] w-[min(340px,calc(100vw-32px))] overflow-y-auto rounded-[26px] bg-white/78 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-black">Knowledge Map</div>
                <p className="mt-2 text-xs leading-5 text-zinc-500">Explore any part of Portfolio OS.</p>
              </div>
              <button
                onClick={onToggle}
                className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-200"
                type="button"
              >
                Hide
              </button>
            </div>

            <nav className="mt-6 space-y-5" aria-label="Site navigation">
              {groups.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-2 px-2">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{group.label}</div>
                    <div className="h-px flex-1 bg-zinc-200/80" />
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {group.items.map((item) => {
                      const isCurrent = item.question === null ? isHome : item.id === activeQuestionId;

                      return (
                        <button
                          key={item.id}
                          onClick={() => (item.question === null ? onGoHome() : onSelectQuestion(item.question))}
                          className={`group block w-full rounded-[18px] px-3 py-2.5 text-left text-sm transition ${
                            isCurrent ? "bg-black text-white" : "bg-white/55 text-zinc-700 hover:bg-zinc-100"
                          }`}
                          type="button"
                          data-state={isCurrent ? "current" : "default"}
                        >
                          <span className="flex items-start gap-2">
                            <span
                              className={`mt-1.5 size-2 rounded-full ${
                                isCurrent ? "bg-white" : "bg-zinc-300 group-hover:bg-zinc-500"
                              }`}
                            />
                            <span>
                              <span className="block leading-5">{item.label}</span>
                              {isCurrent ? <span className="mt-1 block text-[11px] text-white/60">You are here</span> : null}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.aside>
        ) : (
          <motion.button
            key="question-tree-handle"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={onToggle}
            className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_12px_35px_rgba(0,0,0,0.16)]"
            type="button"
          >
            Knowledge Map
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
