export type QuestionCategory = "Identity" | "Work" | "Evidence" | "Principles" | "Logs";

export type QuestionState = "current" | "answered" | "related" | "loading" | "disabled";

export type DiscoveryType = "Ask" | "Case" | "Design Log" | "Evidence" | "Explore";

export type ArtifactType =
  | "artifact"
  | "metric"
  | "screenshot"
  | "process note"
  | "prototype"
  | "Figma UI / Timeline behavior"
  | "State map"
  | "Timeline diagram"
  | "Prototype screen"
  | "Design log"
  | "Figma frame"
  | "Decision log"
  | "Rule model"
  | "UX flow"
  | "System map";

export type ArtifactVisual = {
  src: string;
  alt: string;
  stage?: string;
  note?: string;
};

export type SourceReference = {
  label: string;
  detail: string;
  type: ArtifactType;
  href?: string;
  previewImage?: string;
  previewImages?: ArtifactVisual[];
  /** Render this artifact at full gallery width instead of the default half-width card. */
  featured?: boolean;
  /** "contain" preserves the full, uncropped screenshot (for dense/tall UI); default remains "cover". */
  fit?: "cover" | "contain";
};

export type EvidenceItem = {
  title: string;
  detail: string;
  references: SourceReference[];
};

export type PerspectiveLens = {
  audience: "Recruiter" | "Design Director" | "Engineering Manager" | "Potential Client" | "Future Self";
  takeaway: string;
};

export type CaseStudy = {
  title: string;
  summary: string;
  outcome: string;
};

export type DesignLog = {
  title: string;
  version: string;
  date: string;
  status: "Draft" | "Active" | "Resolved";
  decisionSummary: string;
  whyItMatters: string;
  relatedProject: string;
  lens: PerspectiveLens[];
};

export type CareerTimelineEntry = {
  id: string;
  year: string;
  chapterLabel: string;
  headline?: string;
  emphasis?: boolean;
  entries: {
    company: string;
    context?: string;
    narrative: string;
  }[];
  tags?: string[];
  tagGroups?: string[][];
  links?: { label: string; targetQuestion: string }[];
  /** For creativeTrack entries only: id of the primaryTrack entry this should render alongside. */
  alignAfter?: string;
};

export type AnswerBlock =
  | {
      id: string;
      type: "summary";
      label: string;
      title: string;
      body: string;
      signals?: string[];
    }
  | {
      id: string;
      type: "perspectiveLens";
      label: string;
      title: string;
      lenses: PerspectiveLens[];
    }
  | {
      id: string;
      type: "designReasoning";
      label: string;
      title: string;
      steps: string[];
    }
  | {
      id: string;
      type: "careerEvolution";
      label: string;
      title: string;
      introLines: string[];
      fastPathLabel: string;
      primaryTrack: CareerTimelineEntry[];
      creativeTrack: CareerTimelineEntry[];
      mergeHeadline: string;
      mergeFallback: string;
      aiHeadline: string;
      aiLinkLabel: string;
      aiLinkTargetQuestion?: string;
      endingHeadline: string;
    }
  | {
      id: string;
      type: "evidence";
      label: string;
      title: string;
      items: EvidenceItem[];
    }
  | {
      id: string;
      type: "relatedWork";
      label: string;
      title: string;
      cases: CaseStudy[];
    }
  | {
      id: string;
      type: "decisionLog";
      label: string;
      log: DesignLog;
    }
  | {
      id: string;
      type: "nextQuestions";
      label: string;
      title: string;
      questions: string[];
    };

export type DiscoveryCardData = {
  id: string;
  type: DiscoveryType;
  title: string;
  reason: string;
  targetQuestion: string;
};

export type HeroMedia = {
  kind: "image" | "video" | "motion";
  label: string;
  tag: string;
  meta: string;
  src?: string;
  poster?: string;
  alt?: string;
};

export type QuestionNode = {
  id: string;
  question: string;
  intent: string;
  category: QuestionCategory;
  answerTitle: string;
  heroMedia?: HeroMedia;
  answerBlocks: AnswerBlock[];
  relatedCards: DiscoveryCardData[];
  evidenceReferences: SourceReference[];
  followUpQuestions: string[];
};

export const questionCategories: QuestionCategory[] = ["Identity", "Work", "Evidence", "Principles", "Logs"];

export const starterQuestions: (Pick<QuestionNode, "id" | "question" | "intent" | "category"> & {
  /** Short, one-line version of the description shown on the Work starter-path card. Falls back to `intent`. */
  cardDescription?: string;
  /** Tags shown on Work starter-path cards only. Card shows the first 2 plus a "+N" overflow badge. */
  tags?: string[];
})[] = [
  {
    id: "saas-admin-redesign",
    question: "Show me the SaaS Admin Redesign case.",
    intent: "A structural case study about turning a growing workplace-management admin surface into one coherent configuration system.",
    cardDescription: "Turning workplace configuration into one coherent system.",
    tags: ["B2B SaaS", "Enterprise UX", "Information Architecture"],
    category: "Work",
  },
  {
    id: "meeting-room-redesign",
    question: "Show me the Connected Experience Design case.",
    intent: "Open a case study about a tablet-based room display, real-time availability, and admin-defined room rules.",
    cardDescription: "Real-time room availability on a tablet display.",
    tags: ["Workplace UX", "Tablet interface", "Timeline design"],
    category: "Work",
  },
  {
    id: "jira-automation",
    question: "Show me the AI Workflow case.",
    intent: 'Turning Design System Changes into Engineering Work Automation — "Figma" → "Jira"',
    cardDescription: "Turning Figma design-system changes into Jira tickets.",
    tags: ["Workflow automation", "Design systems", "Design-to-engineering handoff"],
    category: "Work",
  },
  {
    id: "lee-heemoon",
    question: "Show me the Artist's Digital Archive case.",
    intent: "Designing and maintaining an evolving digital home for a genre-defying artist.",
    cardDescription: "An evolving digital home for a genre-defying artist.",
    tags: ["UX/UI Design", "Art Direction", "Interaction Design"],
    category: "Work",
  },
  {
    id: "who-are-you",
    question: "Who are you?",
    intent: "Build a first identity map from role, judgment, proof, and next paths.",
    category: "Identity",
  },
  {
    id: "design-philosophy",
    question: "How has your design philosophy changed?",
    intent: "Understand the principles behind the work, not just the output.",
    category: "Principles",
  },
  {
    id: "evidence",
    question: "What proves the quality of your work?",
    intent: "Review artifacts, process notes, and credibility signals.",
    category: "Evidence",
  },
  {
    id: "decision-log-12",
    question: "Open Decision Log #12.",
    intent: "Inspect a decision log and its evaluation lenses.",
    category: "Logs",
  },
];

const sharedLens: PerspectiveLens[] = [
  {
    audience: "Recruiter",
    takeaway: "Quickly understands the role fit: product designer, systems thinker, and builder.",
  },
  {
    audience: "Design Director",
    takeaway: "Sees judgment through framing, tradeoffs, information hierarchy, and decision quality.",
  },
  {
    audience: "Engineering Manager",
    takeaway: "Sees collaboration awareness: implementation, constraints, and prototype-shaped thinking.",
  },
  {
    audience: "Potential Client",
    takeaway: "Understands the business value: less ambiguity, faster alignment, and clearer decisions.",
  },
  {
    audience: "Future Self",
    takeaway: "Checks whether the system remains maintainable as cases, logs, and evidence grow.",
  },
];

const coreEvidence: EvidenceItem[] = [
  {
    title: "Case documentation",
    detail: "Projects are recorded as problem frames, constraints, decisions, tradeoffs, and outcomes.",
    references: [
      {
        label: "Case archive",
        detail: "Structured case records for product and workflow redesign work.",
        type: "artifact",
      },
    ],
  },
  {
    title: "Design logs",
    detail: "Process is captured as durable reasoning, not only final screens.",
    references: [
      {
        label: "Decision Log #12",
        detail: "Why Portfolio OS treats answers as structured knowledge blocks.",
        type: "process note",
      },
    ],
  },
  {
    title: "Prototype evidence",
    detail: "Ideas are tested in product-shaped prototypes before they become polished artifacts.",
    references: [
      {
        label: "Interactive prototype",
        detail: "Conversation workspace with generated knowledge blocks and contextual discovery.",
        type: "prototype",
      },
    ],
  },
];

const decisionLog12: DesignLog = {
  title: "Decision Log #12",
  version: "v0.1",
  date: "2026-07-07",
  status: "Active",
  decisionSummary: "Answers should render as structured knowledge blocks instead of chat paragraphs.",
  whyItMatters:
    "The portfolio becomes inspectable: people can evaluate claims, evidence, reasoning, and next paths without scanning a long chat transcript.",
  relatedProject: "Portfolio OS",
  lens: sharedLens,
};

export const questionBank: QuestionNode[] = [
  {
    id: "who-are-you",
    question: "Who are you?",
    intent: "Explain identity through role, values, operating model, and proof.",
    category: "Identity",
    answerTitle: "Identity map",
    answerBlocks: [
      {
        id: "identity-summary",
        type: "summary",
        label: "Identity Summary",
        title: "I build products where complex thinking becomes usable.",
        body:
          "I am a senior product designer and builder working across product strategy, interface systems, and AI-enabled workflows. My work is less about presenting finished screens and more about helping teams find the right problem, make better decisions, and turn ambiguity into usable systems.",
        signals: ["Product strategy", "UX/UI", "Design systems", "AI workflows"],
      },
      {
        id: "what-i-design-for",
        type: "summary",
        label: "What I Design For",
        title: "Clarity before polish.",
        body:
          "I design for decision quality: the moment when a team understands what matters, what can be ignored, and what should happen next.",
      },
      {
        id: "identity-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "How different readers should evaluate this answer",
        lenses: sharedLens,
      },
      {
        id: "how-i-think",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "How I think",
        steps: [
          "Start from the question someone is really asking.",
          "Separate claims, context, examples, evidence, and next paths.",
          "Shape the response as an object someone can inspect.",
          "Use motion to reveal structure in the order understanding forms.",
        ],
      },
      {
        id: "career-evolution",
        type: "careerEvolution",
        label: "The Evolution",
        title: "Career evolution",
        introLines: ["I didn't start as a product designer.", "I became one."],
        fastPathLabel: "Prefer the short version? \u2192 Now: Product \u00d7 Systems \u00d7 Craft + AI",
        primaryTrack: [
          {
            id: "shoop",
            year: "2013",
            chapterLabel: "Visual \u2192 Digital",
            entries: [
              {
                company: "Shoop",
                context: "Germany's cashback online portal",
                narrative:
                  "Brand identity, interface design and digital product began to converge \u2014 the start of a shift from visual design toward digital product design.\n\nI actually started out making marketing and sales design assets. It was a platform redesign project that changed that \u2014 working with the customer team to research real user feedback and translate it into design decisions. That's where I first felt the pull of UX/UI.",
              },
            ],
          },
          {
            id: "zyseme",
            year: "2016",
            chapterLabel: "Interaction",
            entries: [
              {
                company: "ZyseME",
                context: "Digital measurement software",
                narrative:
                  "I led the corporate identity for ZyseME itself, a startup brand at the time.\n\nData became part of the experience. Worked with a data analyst on a survey-based custom shirt sizing tool, and designed plugin-style software for e-commerce integration.",
              },
            ],
          },
          {
            id: "product-2018",
            year: "2018",
            chapterLabel: "Product",
            headline: "Interfaces became journeys.",
            entries: [
              {
                company: "Simplesurance",
                context: "Short-term freelance engagement",
                narrative: "Insurance comparison experiences and animation-driven interactions.",
              },
              {
                company: "Prodigy A.I / Luna Card",
                narrative: "A mobile-native app pairing digital loan UX with physical card design.",
              },
            ],
          },
          {
            id: "pyrexx",
            year: "2018\u20132023",
            chapterLabel: "Complexity",
            headline: "Analog processes became digital systems.",
            emphasis: true,
            entries: [
              {
                company: "Pyrexx",
                narrative:
                  "Started as a freelancer redesigning the company homepage with the marketing team, and building out design guidelines. That work turned into a full-time role, where I began building the SaaS admin product \u2014 the transition from interface design toward complex product systems.",
              },
            ],
            tags: ["SaaS", "Admin Interfaces", "Dashboards", "Data Management", "Design Systems"],
          },
          {
            id: "liz-smart-office",
            year: "2023\u20132026",
            chapterLabel: "Systems",
            emphasis: true,
            entries: [
              {
                company: "Liz Smart Office",
                context: "B2B SaaS workplace management platform",
                narrative: "Designing systems behind workplace experiences.",
              },
            ],
            tagGroups: [
              ["Desk", "Room", "Parking", "Resources"],
              ["B2B SaaS", "Product UX", "Admin Interfaces", "Design Systems", "Physical \u00d7 Digital"],
            ],
            links: [
              { label: "Explore the Design System \u2192", targetQuestion: "How has your design philosophy changed?" },
              { label: "Explore the Meeting Room Experience \u2192", targetQuestion: "Show me the Meeting Room App Redesign case." },
            ],
          },
        ],
        creativeTrack: [
          {
            id: "lee-heemoon-career",
            year: "2020\u2013Present",
            chapterLabel: "Creative Practice",
            alignAfter: "pyrexx",
            entries: [
              {
                company: "Lee Heemoon",
                context: "Artist archive",
                narrative:
                  "Designed and developed the artist's personal archive, evolving the visual direction over multiple years \u2014 the continuing creative side of the practice.",
              },
            ],
          },
          {
            id: "manon",
            year: "2025",
            chapterLabel: "Creative Practice",
            alignAfter: "liz-smart-office",
            entries: [
              {
                company: "Manon Brasserie",
                context: "Digital creative direction",
                narrative: "Website structure, layout and seasonal visual direction.",
              },
            ],
          },
        ],
        mergeHeadline: "Product \u00d7 Systems \u00d7 Craft",
        mergeFallback: "Two paths, one practice.",
        aiHeadline: "Product \u00d7 Systems \u00d7 Craft + AI",
        aiLinkLabel: "See how \u2192 AI Lab",
        aiLinkTargetQuestion: "Show me the AI Workflow case.",
        endingHeadline: "I design products by understanding the system behind the interface.",
      },
      {
        id: "related-identity-work",
        type: "relatedWork",
        label: "Related Work",
        title: "Where this shows up",
        cases: [
          {
            title: "Connected Experience Design",
            summary: "A tablet-based room display redesigned for real-time availability and admin-defined room rules.",
            outcome: "Clearer room state, distance-readable status, and less coordination friction in shared workplaces.",
          },
          {
            title: "AI Workflow Mapping",
            summary: "A system for translating ambiguous work into promptable, inspectable flows.",
            outcome: "Reusable workflow patterns and faster prototype cycles.",
          },
          {
            title: "SaaS Admin Redesign",
            summary: "Turning a growing workplace-management admin surface — structure, floorplan, resources, and booking rules — into one configuration system.",
            outcome: "A shared configuration grammar across resource types and a floorplan that doubles as an operational interface.",
          },
          {
            title: "AI Workflow",
            summary: "A hackathon prototype connecting Figma design-system changes to structured Jira engineering tickets.",
            outcome: "A tested workflow architecture for how design intent should cross the boundary into engineering work.",
          },
          {
            title: "Design for an Artist",
            summary: "An ongoing Webflow product for a genre-defying artist, designed around Project as the primary unit instead of genre.",
            outcome: "A 360° project navigation system that doubles as artist metaphor, still designed, built, and maintained today.",
          },
        ],
      },
    ],
    relatedCards: [],
    evidenceReferences: coreEvidence.flatMap((item) => item.references),
    followUpQuestions: [
      "How has your design philosophy changed?",
      "Show me the Connected Experience Design case.",
      "Open Decision Log #12.",
    ],
  },
  {
    id: "design-philosophy",
    question: "How has your design philosophy changed?",
    intent: "Explain the shift from presentation to problem finding and decision quality.",
    category: "Principles",
    answerTitle: "Design philosophy",
    answerBlocks: [
      {
        id: "philosophy-summary",
        type: "summary",
        label: "Summary",
        title: "Design became less about presentation and more about finding the right solution.",
        body:
          "Earlier in my career, design often meant making the interface clearer or more polished. Now I treat design as the work of discovering the right problem, making tradeoffs visible, and helping teams decide with more confidence.",
        signals: ["Problem framing", "Decision quality", "Systems thinking"],
      },
      {
        id: "philosophy-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "The operating shift",
        steps: [
          "Move upstream from screens to questions.",
          "Make constraints visible before committing to form.",
          "Use prototypes as thinking tools, not only validation tools.",
          "Document decisions so the system can improve over time.",
        ],
      },
      {
        id: "philosophy-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "Who benefits from this philosophy",
        lenses: sharedLens,
      },
      {
        id: "philosophy-log",
        type: "decisionLog",
        label: "Decision Log",
        log: decisionLog12,
      },
    ],
    relatedCards: [
      {
        id: "philosophy-log-card",
        type: "Design Log",
        title: "Decision Log #12",
        reason: "The philosophy is encoded in the block-based answer model.",
        targetQuestion: "Open Decision Log #12.",
      },
      {
        id: "philosophy-evidence-card",
        type: "Evidence",
        title: "Evidence patterns",
        reason: "Review how philosophy becomes observable through artifacts.",
        targetQuestion: "What proves the quality of your work?",
      },
      {
        id: "philosophy-explore-card",
        type: "Explore",
        title: "AI workflow",
        reason: "Explore how structured thinking becomes an AI-assisted workflow.",
        targetQuestion: "How do you use AI in your workflow?",
      },
    ],
    evidenceReferences: [decisionLog12].flatMap((log) => [
      {
        label: log.title,
        detail: log.decisionSummary,
        type: "process note" as const,
      },
    ]),
    followUpQuestions: ["Open Decision Log #12.", "What proves the quality of your work?"],
  },
  {
    id: "meeting-room-redesign",
    question: "Show me the Connected Experience Design case.",
    intent: "Open a case study about a tablet-based room display, real-time availability, and admin-defined room rules.",
    category: "Work",
    answerTitle: "Connected Experience Design",
    heroMedia: {
      kind: "image",
      label: "Cover image placeholder · 1920 × 1080 recommended",
      tag: "Evidence · Cover Image",
      meta: "16:9 · edge-to-edge · caption optional",
    },
    answerBlocks: [
      {
        id: "room-summary",
        type: "summary",
        label: "Case Summary",
        title: "A tablet-based room display redesigned into a live coordination interface.",
        body:
          "Meeting Room App is installed outside company meeting rooms so employees can instantly understand whether a room is available, unavailable, or currently booked. The redesign evolved the product from a simple red/green room signal into a timeline-based interface that could explain bookings, available slots, buffer time, and admin-defined unavailable periods.",
        signals: ["Workplace UX", "Tablet interface", "Room state logic", "Timeline design"],
      },
      {
        id: "room-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "Case logic",
        steps: [
          "Design room availability as a visible workplace signal, not only as booking data.",
          "Make status readable from a distance through strong color and screen-state feedback.",
          "Separate meeting bookings from admin-defined unavailable time.",
          "Use the timeline to explain what is happening now, what happens next, and why a room may be unavailable.",
          "Keep instant reservation lightweight so people can make quick hallway decisions.",
        ],
      },
      {
        id: "room-evidence",
        type: "evidence",
        label: "Evidence",
        title: "Artifacts and signals",
        items: [
          {
            title: "Room State System",
            detail: "A room-state model defining available, occupied, booked, blocked, buffer, and admin-controlled unavailable periods.",
            references: [{ label: "State taxonomy", detail: "Availability states separated by meeting data and operational rules.", type: "artifact" }],
          },
          {
            title: "Timeline Logic",
            detail: "A timeline structure showing meetings, available slots, blocked time, and rule-based unavailable periods.",
            references: [{ label: "Timeline model", detail: "Structure for showing current state, next events, buffers, and blocked periods.", type: "artifact" }],
          },
          {
            title: "Hardware-Aware Status Design",
            detail: "A visual system designed for both screen UI and physical tablet-frame lighting.",
            references: [{ label: "Status display", detail: "Screen and frame-light behavior for distance-readable availability.", type: "prototype" }],
          },
          {
            title: "Admin Rule Handling",
            detail: "Design logic for showing unavailable periods created by admin settings rather than actual meetings.",
            references: [{ label: "Admin rules", detail: "Examples include blocking the last 10 minutes of every hour or full room blocks for operations.", type: "process note" }],
          },
          {
            title: "Current Time Timeline State",
            detail:
              "Introduced after first-version customer feedback that users needed to identify the current time slot more accurately.",
            references: [
              {
                label: "Current Time Timeline State",
                detail:
                  "Admin-defined booking buffers make the room temporarily not bookable. A highlighted timeline frame helps users identify the current time slot.",
                type: "Figma UI / Timeline behavior",
                href: "/artifacts/meeting-room-current-time-timeline-state",
                previewImage: "/artifacts/meeting-room-timeline-booking-buffer-current.png",
                previewImages: [
                  {
                    src: "/artifacts/meeting-room-timeline-booking-buffer-current.png",
                    alt: "Meeting Room App timeline showing the current booking buffer state before a meeting",
                    stage: "Booking buffer",
                    note: "Current slot is blocked by buffer logic before the scheduled meeting.",
                  },
                  {
                    src: "/artifacts/meeting-room-timeline-meeting-current.png",
                    alt: "Meeting Room App timeline showing an active meeting as not bookable",
                    stage: "Meeting in progress",
                    note: "Current meeting is highlighted while the room remains not bookable.",
                  },
                  {
                    src: "/artifacts/meeting-room-timeline-available-current.png",
                    alt: "Meeting Room App timeline showing the current available slot",
                    stage: "Available slot",
                    note: "Current available period is highlighted and supports instant reservation.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "room-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "How the case reads by audience",
        lenses: [
          {
            audience: "Recruiter",
            takeaway: "Shows the ability to explain a real workplace UX problem clearly and turn complex product logic into understandable user flows.",
          },
          {
            audience: "Design Director",
            takeaway: "Demonstrates system thinking, information hierarchy, state design, and judgment around visibility, ambiguity, and interaction cost.",
          },
          {
            audience: "Engineering Manager",
            takeaway: "Clarifies edge cases such as admin-blocked time, configurable colors, timeline states, and distinction between booking data and availability rules.",
          },
          {
            audience: "Potential Client",
            takeaway: "Communicates business value: fewer room conflicts, faster decisions, clearer room usage, and less coordination friction in shared workplaces.",
          },
          {
            audience: "Future Self",
            takeaway: "Keeps the case scalable by separating hardware behavior, room state logic, admin rules, and user-facing timeline design.",
          },
        ],
      },
    ],
    relatedCards: [
      {
        id: "room-ask-thinking",
        type: "Ask",
        title: "How I think",
        reason: "Connect this case back to the reusable thinking model.",
        targetQuestion: "Who are you?",
      },
      {
        id: "room-evidence",
        type: "Evidence",
        title: "Room artifacts",
        reason: "Inspect the proof behind the case story.",
        targetQuestion: "What proves the quality of your work?",
      },
      {
        id: "room-case-saas",
        type: "Case",
        title: "SaaS Admin Redesign",
        reason: "Compare with another structural, responsibility-driven redesign.",
        targetQuestion: "Show me the SaaS Admin Redesign case.",
      },
      {
        id: "room-case-heemoon",
        type: "Case",
        title: "Artist's Digital Archive",
        reason: "See a content-and-identity system alongside this state-driven one.",
        targetQuestion: "Show me the Artist's Digital Archive case.",
      },
    ],
    evidenceReferences: [
      { label: "State taxonomy", detail: "Availability states separated by meeting data and operational rules.", type: "artifact" },
      { label: "Timeline model", detail: "Structure for showing current state, next events, buffers, and blocked periods.", type: "artifact" },
      { label: "Status display", detail: "Screen and frame-light behavior for distance-readable availability.", type: "prototype" },
      { label: "Admin rules", detail: "Examples include blocking the last 10 minutes of every hour or full room blocks for operations.", type: "process note" },
      {
        label: "Current Time Timeline State",
        detail:
          "Admin-defined booking buffers make the room temporarily not bookable. A highlighted timeline frame helps users identify the current time slot.",
        type: "Figma UI / Timeline behavior",
        href: "/artifacts/meeting-room-current-time-timeline-state",
        previewImage: "/artifacts/meeting-room-timeline-booking-buffer-current.png",
        previewImages: [
          {
            src: "/artifacts/meeting-room-timeline-booking-buffer-current.png",
            alt: "Meeting Room App timeline showing the current booking buffer state before a meeting",
            stage: "Booking buffer",
            note: "Current slot is blocked by buffer logic before the scheduled meeting.",
          },
          {
            src: "/artifacts/meeting-room-timeline-meeting-current.png",
            alt: "Meeting Room App timeline showing an active meeting as not bookable",
            stage: "Meeting in progress",
            note: "Current meeting is highlighted while the room remains not bookable.",
          },
          {
            src: "/artifacts/meeting-room-timeline-available-current.png",
            alt: "Meeting Room App timeline showing the current available slot",
            stage: "Available slot",
            note: "Current available period is highlighted and supports instant reservation.",
          },
        ],
      },
    ],
    followUpQuestions: ["What proves the quality of your work?", "How has your design philosophy changed?"],
  },
  {
    id: "evidence",
    question: "What proves the quality of your work?",
    intent: "Surface proof, artifacts, and evaluation signals.",
    category: "Evidence",
    answerTitle: "Evidence map",
    answerBlocks: [
      {
        id: "evidence-summary",
        type: "summary",
        label: "Summary",
        title: "The work should be evaluated through decisions, artifacts, and outcomes.",
        body:
          "A portfolio claim is only useful when someone can inspect what led to it. Evidence should include artifacts, decision logs, prototypes, process notes, and outcome signals.",
      },
      {
        id: "evidence-items",
        type: "evidence",
        label: "Evidence",
        title: "Evidence references",
        items: coreEvidence,
      },
      {
        id: "evidence-next",
        type: "nextQuestions",
        label: "Next Questions",
        title: "Ways to inspect the evidence",
        questions: ["Show me the Connected Experience Design case.", "Open Decision Log #12."],
      },
    ],
    relatedCards: [
      {
        id: "evidence-case",
        type: "Case",
        title: "Connected Experience Design",
        reason: "A case gives evidence more context and consequence.",
        targetQuestion: "Show me the Connected Experience Design case.",
      },
      {
        id: "evidence-log",
        type: "Design Log",
        title: "Decision Log #12",
        reason: "Decision logs make the reasoning behind evidence visible.",
        targetQuestion: "Open Decision Log #12.",
      },
    ],
    evidenceReferences: coreEvidence.flatMap((item) => item.references),
    followUpQuestions: ["Show me the Connected Experience Design case.", "Open Decision Log #12."],
  },
  {
    id: "decision-log-12",
    question: "Open Decision Log #12.",
    intent: "Open a full decision log preview with perspective-based evaluation.",
    category: "Logs",
    answerTitle: "Decision Log #12",
    answerBlocks: [
      {
        id: "log-preview",
        type: "decisionLog",
        label: "Design Log Preview",
        log: decisionLog12,
      },
      {
        id: "log-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "Decision evaluation",
        lenses: sharedLens,
      },
      {
        id: "log-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "Why the block model won",
        steps: [
          "Plain chat hides structure inside paragraphs.",
          "Portfolio readers evaluate different evidence at different speeds.",
          "Blocks let the answer expose claims, reasoning, evidence, and next paths separately.",
          "The model can scale into cases, logs, and source references.",
        ],
      },
    ],
    relatedCards: [
      {
        id: "log-identity",
        type: "Ask",
        title: "Return to identity",
        reason: "See the decision log applied to the first answer.",
        targetQuestion: "Who are you?",
      },
      {
        id: "log-principles",
        type: "Explore",
        title: "Design philosophy",
        reason: "Connect this decision to the broader design principle.",
        targetQuestion: "How has your design philosophy changed?",
      },
    ],
    evidenceReferences: [
      {
        label: decisionLog12.title,
        detail: decisionLog12.decisionSummary,
        type: "process note",
      },
    ],
    followUpQuestions: ["Who are you?", "How has your design philosophy changed?"],
  },
  {
    id: "saas-admin-redesign",
    question: "Show me the SaaS Admin Redesign case.",
    intent: "A structural case study about turning a growing workplace-management admin surface into one coherent configuration system.",
    category: "Work",
    answerTitle: "SaaS Admin Redesign",
    heroMedia: {
      kind: "video",
      src: "/case-studies/saas-admin-redesign/hero.mp4",
      poster: "/case-studies/saas-admin-redesign/hero-poster.jpg",
      label: "Floorplan and resource-management — interaction recording",
      tag: "Evidence · Floorplan & Resource Management",
      meta: "loop · muted · autoplay",
      alt: "Recording of the LIZ Smart Office floorplan and resource-management experience: placing, moving, and inspecting resources directly on the office layout",
    },
    answerBlocks: [
      {
        id: "saas-summary",
        type: "summary",
        label: "Case Summary",
        title: "The problem wasn't the screens. It was the structure behind them.",
        body:
          "I redesigned the administration experience of LIZ Smart Office, a workplace-management platform, to make complex configuration easier to understand, manage, and scale. As the product grew, new resource types and settings were added over time, and the interface stopped communicating the underlying structure clearly. Rather than redesigning individual screens, I focused on the system itself — how administrators understand workplace structure, configure physical spaces, manage resources, and define booking behaviour.",
        signals: ["B2B SaaS", "Enterprise UX", "Admin UX", "Information Architecture", "Design Systems", "Complex Workflows"],
      },
      {
        id: "saas-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "Structural decisions",
        steps: [
          "Make the workplace hierarchy — building, floor, resource — visible as one navigable structure instead of scattering it across separate screens.",
          "Treat the floorplan as an operational interface, not a static diagram, so resources can be located, selected, and edited in physical context.",
          "Move floorplan configuration into direct manipulation: define the usable area and place resources directly on it.",
          "Establish one shared configuration grammar — enable, booking range, booking period — across every resource type, layering in resource-specific behaviour only where it applies.",
          "Keep common configuration immediate and push advanced controls, like timeslot details, behind progressive disclosure.",
          "Replace numeric booking forms with a visual timeslot editor driven by editable presets rather than static filters.",
          "Document component behaviour — selected vs. configured states, pill states, system feedback — as reusable interaction rules, not one-off UI.",
        ],
      },
      {
        id: "saas-evidence-structure",
        type: "evidence",
        label: "Decision 01",
        title: "Make the system structure visible",
        items: [
          {
            title: "Building → Floor → Resource",
            detail:
              "Before designing screens, I needed to clarify the mental model: buildings contain floors, floors contain resources, and resources carry their own capabilities and configuration rules. Instead of distributing these relationships across separate administration screens, I introduced a hierarchical Structure view that administrators can expand in place. The goal wasn't to reduce clicks — it was to make the relationship between objects visible, so administrators can predict where information lives before interacting with the interface.",
            references: [
              {
                label: "Structure view",
                detail: "A hierarchical view connects buildings, floors and resources while surfacing key capacity and sensor information directly in context.",
                type: "screenshot",
                featured: true,
                fit: "contain",
                previewImages: [
                  { src: "/case-studies/saas-admin-redesign/structure.png", alt: "Structure screen showing a nested list of buildings, floors, and resources with capacity and sensor counts." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "saas-evidence-floorplan-connection",
        type: "evidence",
        label: "Decision 02",
        title: "Connect data structure with physical space",
        items: [
          {
            title: "Structural and spatial models, held together",
            detail:
              "A workplace isn't only a database — administrators also think spatially. A desk belongs to a floor in the system (Building → Floor → Resource), but it also occupies a position in the physical office (Floorplan → Position → Resource). Instead of forcing administrators to choose one model, the floorplan became an operational interface: resources can be located, selected, moved, edited and reset directly on the floorplan while staying connected to the resource list.",
            references: [
              {
                label: "Overview screen",
                detail: "Resource list and floorplan operate as two representations of the same underlying workplace data.",
                type: "screenshot",
                featured: true,
                fit: "contain",
                previewImages: [
                  { src: "/case-studies/saas-admin-redesign/overview.png", alt: "Resource list beside a floorplan, with a desk selected and a contextual menu showing move, edit and reset options." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "saas-evidence-direct-manipulation",
        type: "evidence",
        label: "Decision 03",
        title: "Turn floorplan setup into direct manipulation",
        items: [
          {
            title: "Configuring the space where it exists",
            detail:
              "Configuring a floorplan previously required translating between abstract settings and the physical office. I moved the interaction closer to the object being configured: the administrator defines the usable floorplan area and places resources directly within it. This closes the gap between \"where is this resource stored in the system?\" and \"where is this resource actually located?\" — bringing the interface closer to the administrator's real-world mental model.",
            references: [
              {
                label: "Floorplan editing",
                detail: "Direct spatial configuration reduces the distance between system configuration and the physical workplace it represents.",
                type: "screenshot",
                featured: true,
                fit: "contain",
                previewImages: [
                  { src: "/case-studies/saas-admin-redesign/floorplan-editing.png", alt: "Floorplan editing mode with a drawable area outlined in dashed blue, a desk context menu open, and an upload floorplan control." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "saas-evidence-configuration-model",
        type: "evidence",
        label: "Decision 04",
        title: "Create one configuration model for different resource types",
        items: [
          {
            title: "Desk, Flexdesk, Meeting room, Parking, Phone booth, Sickday",
            detail:
              "The platform supports multiple workplace resources that behave differently, but share many configuration concepts. Instead of designing every resource independently, I looked for the common grammar: enable the resource, define its booking range, define its booking period, then layer in resource-specific behaviour — meeting rooms, for example, can additionally support recurring bookings, web meeting integration, and timeslot configuration. The same resources settings screen applies that grammar across every type, with resource-specific options appearing only when relevant.",
            references: [
              {
                label: "Resource configuration",
                detail: "The Resources settings screen applies the same configuration grammar across every resource type.",
                type: "screenshot",
                featured: true,
                fit: "contain",
                previewImages: [
                  { src: "/case-studies/saas-admin-redesign/resource-configuration.png", alt: "Organisation settings resources tab showing booking configuration for Desk, Flexdesk, Meeting room, Parking, Phone booth and Sickday." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "saas-progressive-complexity",
        type: "summary",
        label: "Decision 05",
        title: "Progressive complexity instead of permanent complexity",
        body:
          "Enterprise administrators need powerful configuration, but that doesn't mean every option should be visible at once. Basic configuration stays directly accessible, while advanced controls such as Timeslot details — visible as a link on the resources screen above — reveal deeper configuration only when required. Common decisions stay immediate; advanced decisions stay available without dominating the interface.",
      },
      {
        id: "saas-evidence-booking-rules",
        type: "evidence",
        label: "Decision 06",
        title: "Make booking rules tangible",
        items: [
          {
            title: "Presets are accelerators, not filters",
            detail:
              "Booking configuration becomes difficult when administrators have to reason about time in the abstract. Instead of forms and numeric inputs, I designed a visual timeslot editor: administrators start from a preset (whole day, morning, afternoon, or a fixed duration) and then modify individual generated slots. Selecting a preset doesn't merely filter the interface — it generates an editable configuration model, combining speed for common cases with control for exceptions.",
            references: [
              {
                label: "Timeslot configuration",
                detail: "Presets generate an editable booking structure, combining speed for common configurations with control for exceptional cases.",
                type: "screenshot",
                featured: true,
                fit: "contain",
                previewImages: [
                  { src: "/case-studies/saas-admin-redesign/timeslot-configuration.png", alt: "Meeting room timeslot configuration with preset buttons and a generated grid of editable 60-minute booking slots." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "saas-evidence-behaviour",
        type: "evidence",
        label: "Decision 07",
        title: "Design behaviour, not just components",
        items: [
          {
            title: "Selected vs. configured — two states, one control",
            detail:
              "The redesign also required reusable interaction rules, not just visual components. In the weekday selector, only one weekday represents the current editing context, but configuration exists independently for every weekday — a small indicator shows that a weekday already holds configured access even when it isn't currently selected. The system defines default, hover, active and disabled states for controls, plus feedback for destructive actions, unavailable configurations, successful changes, and warnings.",
            references: [
              {
                label: "Component behaviour specification",
                detail: "Interaction states were defined as reusable behavioural rules rather than isolated visual components.",
                type: "Rule model",
                featured: true,
                fit: "contain",
                previewImages: [
                  { src: "/case-studies/saas-admin-redesign/component-behaviour-spec.png", alt: "Design specification sheet documenting timeslot preset and weekday selector behaviour, pill states, and system feedback messages." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "saas-outcome",
        type: "summary",
        label: "System Outcome",
        title: "From individual settings to a configuration system",
        body:
          "Structure shows how the workplace is organised. The floorplan shows where resources exist physically. Resources define what can be booked. Booking rules define how it can be booked. Interaction patterns keep those behaviours consistent across the product. The result isn't simply a collection of redesigned screens — it is a shared configuration language for the workplace platform.",
        signals: ["Structure", "Floorplan", "Resources", "Booking Rules", "Interaction Patterns"],
      },
      {
        id: "saas-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "How the case reads by audience",
        lenses: [
          {
            audience: "Recruiter",
            takeaway: "Shows the ability to bring order to a genuinely complex enterprise admin surface by treating navigation, spatial configuration and booking rules as one system.",
          },
          {
            audience: "Design Director",
            takeaway: "Demonstrates systems thinking and judgment: finding a shared configuration grammar across resource types instead of solving each screen in isolation.",
          },
          {
            audience: "Engineering Manager",
            takeaway: "Shows interaction states — selected vs. configured, presets vs. generated data, progressive disclosure — documented as reusable behavioural rules rather than one-off UI.",
          },
          {
            audience: "Potential Client",
            takeaway: "Communicates that meaningful enterprise redesign can come from clarifying structure, not just adding features — which lowers delivery risk.",
          },
          {
            audience: "Future Self",
            takeaway: "Keeps the case honest by documenting only what the real screens show: no invented metrics, no unverified adoption or efficiency claims.",
          },
        ],
      },
      {
        id: "saas-next",
        type: "nextQuestions",
        label: "Next Questions",
        title: "Continue exploring",
        questions: ["Show me the Connected Experience Design case.", "What proves the quality of your work?"],
      },
    ],
    relatedCards: [
      {
        id: "saas-ask-thinking",
        type: "Ask",
        title: "How I think",
        reason: "Connect this case back to the reusable thinking model.",
        targetQuestion: "Who are you?",
      },
      {
        id: "saas-case-room",
        type: "Case",
        title: "Connected Experience Design",
        reason: "Compare with another structural, state-driven redesign.",
        targetQuestion: "Show me the Connected Experience Design case.",
      },
      {
        id: "saas-case-jira",
        type: "Case",
        title: "AI Workflow",
        reason: "See a workflow-shaped case alongside this interface-shaped one.",
        targetQuestion: "Show me the AI Workflow case.",
      },
      {
        id: "saas-evidence-card",
        type: "Evidence",
        title: "Evidence map",
        reason: "See how process notes and artifacts support this case.",
        targetQuestion: "What proves the quality of your work?",
      },
      {
        id: "saas-case-heemoon",
        type: "Case",
        title: "Artist's Digital Archive",
        reason: "See a content-and-identity system alongside this admin-interface case.",
        targetQuestion: "Show me the Artist's Digital Archive case.",
      },
    ],
    evidenceReferences: [
      { label: "Structure view", detail: "A hierarchical view connects buildings, floors and resources with capacity and sensor information.", type: "screenshot" },
      { label: "Overview screen", detail: "Resource list and floorplan operate as two representations of the same workplace data.", type: "screenshot" },
      { label: "Floorplan editing", detail: "Direct spatial configuration for placing and adjusting resources on the office layout.", type: "screenshot" },
      { label: "Resource configuration", detail: "One configuration grammar applied across every resource type.", type: "screenshot" },
      { label: "Timeslot configuration", detail: "Editable booking slots generated from presets.", type: "screenshot" },
      { label: "Component behaviour specification", detail: "Reusable interaction rules for selectors, pills, and system feedback.", type: "Rule model" },
    ],
    followUpQuestions: ["Show me the Connected Experience Design case.", "What proves the quality of your work?"],
  },
  {
    id: "jira-automation",
    question: "Show me the AI Workflow case.",
    intent: 'Turning Design System Changes into Engineering Work Automation — "Figma" → "Jira"',
    category: "Work",
    answerTitle: "AI Workflow",
    heroMedia: {
      kind: "image",
      label: "Cover image placeholder · 1920 × 1080 recommended",
      tag: "Evidence · Cover Image",
      meta: "16:9 · edge-to-edge · caption optional",
    },
    answerBlocks: [
      {
        id: "jira-summary",
        type: "summary",
        label: "Case Summary",
        title: "What if a change in the design system could initiate the development workflow itself?",
        body:
          "Design systems evolve continuously, but the engineering workflow around them stays manual: a designer updates a component, and someone still has to notice, explain, and create a Jira ticket by hand. During a hackathon I prototyped a workflow connecting Figma design-system updates directly to structured Jira tickets, treating the design system as a source of product events rather than an endpoint.",
        signals: ["Workflow automation", "Design systems", "Design-to-engineering handoff", "Hackathon prototype"],
      },
      {
        id: "jira-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "From design change to development task",
        steps: [
          "Reframe the Figma design system as a source of product events, not just where components are designed.",
          "Distinguish design activity from implementation-ready change, so experimentation doesn't create ticket noise.",
          "Translate a qualifying change into structured implementation context: what changed, why, where, what needs implementation, and what's affected.",
          "Generate a Jira ticket that preserves that context and a direct reference back to the Figma source.",
          "Keep automation scoped to coordination, not decision-making — priority and implementation strategy stay human calls.",
        ],
      },
      {
        id: "jira-evidence",
        type: "evidence",
        label: "Evidence",
        title: "Workflow architecture",
        items: [
          {
            title: "Trigger Design",
            detail: "Not every Figma change should create a ticket. The workflow needed a clear signal distinguishing in-progress design activity from an implementation-ready change.",
            references: [{ label: "Trigger logic", detail: "Conceptual gate between design iteration and engineering-ready change.", type: "process note" }],
          },
          {
            title: "Information Contract",
            detail: "A useful ticket had to answer what changed, why, where in Figma, what needs implementation, and what else is affected — designed as a structured handoff rather than a free-text note.",
            references: [{ label: "Ticket context model", detail: "Structured fields connecting design rationale to engineering scope.", type: "process note" }],
          },
          {
            title: "Hackathon Scope",
            detail: "Built to test the critical path — Figma change to structured Jira issue — rather than production-ready infrastructure.",
            references: [{ label: "Critical-path prototype", detail: "Tested the highest-risk assumption: can a design-system action become a useful engineering task without a manual handoff.", type: "prototype" }],
          },
        ],
      },
      {
        id: "jira-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "How the case reads by audience",
        lenses: [
          {
            audience: "Design Director",
            takeaway: "Shows systems thinking about where design intent leaks at tool boundaries, not just interface craft.",
          },
          {
            audience: "Engineering Manager",
            takeaway: "Demonstrates designing an information contract that gives engineering structured context instead of fragmented handoffs.",
          },
          {
            audience: "Potential Client",
            takeaway: "Signals a bias toward reducing coordination overhead between disciplines, not just producing more screens.",
          },
          {
            audience: "Recruiter",
            takeaway: "A concise hackathon story that reads clearly even without deep workflow-tooling background.",
          },
          {
            audience: "Future Self",
            takeaway: "Marked explicitly as a hackathon prototype — conceptual scope and open evidence gaps are stated rather than implied as shipped.",
          },
        ],
      },
      {
        id: "jira-next",
        type: "nextQuestions",
        label: "Next Questions",
        title: "Continue exploring",
        questions: ["Show me the SaaS Admin Redesign case.", "Show me the Connected Experience Design case."],
      },
    ],
    relatedCards: [
      {
        id: "jira-ask-thinking",
        type: "Ask",
        title: "How I think",
        reason: "Connect this case back to the reusable thinking model.",
        targetQuestion: "Who are you?",
      },
      {
        id: "jira-case-saas",
        type: "Case",
        title: "SaaS Admin Redesign",
        reason: "Compare with another systems-level, structure-first case.",
        targetQuestion: "Show me the SaaS Admin Redesign case.",
      },
      {
        id: "jira-case-room",
        type: "Case",
        title: "Connected Experience Design",
        reason: "See a product-shaped case alongside this workflow-shaped one.",
        targetQuestion: "Show me the Connected Experience Design case.",
      },
      {
        id: "jira-case-heemoon",
        type: "Case",
        title: "Artist's Digital Archive",
        reason: "See ongoing product ownership alongside this hackathon prototype.",
        targetQuestion: "Show me the Artist's Digital Archive case.",
      },
    ],
    evidenceReferences: [
      { label: "Trigger logic", detail: "Conceptual gate between design iteration and engineering-ready change.", type: "process note" },
      { label: "Ticket context model", detail: "Structured fields connecting design rationale to engineering scope.", type: "process note" },
      { label: "Critical-path prototype", detail: "Tested whether a design-system action could become a useful engineering task without a manual handoff.", type: "prototype" },
    ],
    followUpQuestions: ["Show me the SaaS Admin Redesign case.", "Show me the Connected Experience Design case."],
  },
  {
    id: "lee-heemoon",
    question: "Show me the Artist's Digital Archive case.",
    intent: "Designing and maintaining an evolving digital home for a genre-defying artist.",
    category: "Work",
    answerTitle: "Design for an Artist",
    heroMedia: {
      kind: "video",
      src: "/case-studies/lee-heemoon/lee-heemoon-360-carousel.mp4",
      poster: "/case-studies/lee-heemoon/lee-heemoon-360-carousel-poster.jpg",
      label: "360° Projects carousel — interaction recording",
      tag: "Evidence · 360° Projects Carousel",
      meta: "loop · muted · autoplay",
      alt: "The Lee Heemoon website's 360-degree Projects carousel rotating between project cards",
    },
    answerBlocks: [
      {
        id: "heemoon-summary",
        type: "summary",
        label: "Case Summary",
        title: "One artist. Many identities. One evolving digital system.",
        body:
          "Lee Heemoon's practice moves between Korean traditional music, contemporary performance, pop culture, fashion, and collaborations — often building an entirely new identity from one project to the next. The challenge wasn't to design an artist website; it was to create a digital system that could hold many different artistic identities without reducing them to conventional genre categories. Designed and built directly in Webflow with Ewon Art Company since 2024, and still in active use.",
        signals: ["UX/UI Design", "Art Direction", "Information Architecture", "Interaction Design", "Webflow Development", "Ongoing Ownership"],
      },
      {
        id: "heemoon-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "No genres. Just projects.",
        steps: [
          "Make Project — not genre, medium, or format — the primary organizing unit of the system.",
          "Let a single Project contain a performance, an album, a collaboration, or several of these at once, so different bodies of work can coexist without a fixed hierarchy.",
          "Treat the 360° carousel as navigation and artist metaphor at the same time: different directions, different identities, one artist at the center.",
          "Let the newest project take the primary carousel position for promotional visibility, while every earlier project stays reachable in the same continuous structure.",
          "Design Project as a flexible content container — OBSG holds Concerts and Albums together — so future projects can mix content types without rebuilding the architecture.",
        ],
      },
      {
        id: "heemoon-evidence-carousel",
        type: "evidence",
        label: "Evidence",
        title: "Why 360°?",
        items: [
          {
            title: "Navigation as artist metaphor",
            detail: "Lee Heemoon continuously moves between genres, characters, and artistic identities. Individual projects can look radically different from one another, yet all originate from — and return to — the same artist. The 360° movement turns that idea into interaction, functioning as navigation and artist metaphor simultaneously.",
            references: [
              {
                label: "360° Projects carousel",
                detail: "Circular carousel with the active project centered and surrounding projects in perspective; persistent navigation stays available underneath.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/projects-360-carousel.jpg", alt: "Lee Heemoon website Projects page showing the 360-degree carousel with OBSG centered" },
                ],
              },
            ],
          },
          {
            title: "Latest first ≠ everything else hidden",
            detail: "Ewon Art needed the site to support an ongoing promotional cycle: whenever a new project launches, it should be the first thing visitors encounter. The newest project becomes the carousel's initial focal point, while previous projects remain fully accessible within the same continuous structure — business priority and artist structure coexisting rather than competing.",
            references: [
              {
                label: "Business requirement",
                detail: "Promotional priority incorporated without changing the underlying information architecture.",
                type: "process note",
              },
            ],
          },
        ],
      },
      {
        id: "heemoon-evidence-project",
        type: "evidence",
        label: "Evidence",
        title: "Project as an expandable content system",
        items: [
          {
            title: "OBSG — one Project, multiple content types",
            detail: "Once inside a project, the system adapts to the content rather than forcing every project into the same template. For OBSG, live performances (Concerts) and releases (Albums) coexist within the same project space, and each album can expand into its own detailed experience. Project functions as a flexible content container, not a fixed page template.",
            references: [
              {
                label: "OBSG project overview",
                detail: "Project description, Concerts, and Albums living inside one Project, with persistent navigation.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/obsg-project-overview.jpg", alt: "OBSG project overview page listing Concerts and Albums" },
                ],
              },
              {
                label: "Live Webflow implementation",
                detail: "The actual production build in a desktop browser, confirming the structure ships as designed.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/obsg-desktop-browser.jpg", alt: "OBSG project structure rendered live in a desktop browser" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "heemoon-evidence-discovery",
        type: "evidence",
        label: "Evidence",
        title: "Connected discovery: Project → Album → Related → Listen",
        items: [
          {
            title: "Album detail as part of a connected ecosystem",
            detail: "Individual album pages were designed as part of a connected content ecosystem rather than isolated destinations — album identity, editorial description, and a direct path to streaming platforms.",
            references: [
              {
                label: "DOHWA album detail",
                detail: "Album identity, editorial description, and streaming links (Spotify, Apple Music, Genie, Bugs, Melon, VIBE).",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/dohwa-album-detail.jpg", alt: "DOHWA album detail page with editorial description and streaming platform links" },
                ],
              },
              {
                label: "Related works",
                detail: "Adjacent OBSG releases surfaced below the album, giving visitors another path into the artist's work instead of ending the experience at the bottom of the page.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/dohwa-related-works.jpg", alt: "Related Works section showing adjacent OBSG album releases" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "heemoon-evidence-homepage",
        type: "evidence",
        label: "Evidence",
        title: "What's New: current activity first",
        items: [
          {
            title: "Homepage as a changing entry point",
            detail: "Rather than a static introduction to the artist, the homepage functions as a What's New space: current performances, releases, and media take over most of the screen while persistent navigation stays available. This pairs with the carousel's \"latest first\" logic — current activity leads, the archive stays one step away.",
            references: [
              {
                label: "What's New / Homepage",
                detail: "Featured current media taking over the screen with persistent navigation intact.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/whats-new-homepage.jpg", alt: "What's New homepage with featured current media and persistent navigation" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "heemoon-evidence-system",
        type: "evidence",
        label: "Evidence",
        title: "System continuity: different worlds, one navigation",
        items: [
          {
            title: "Persistent navigation across different visual worlds",
            detail: "Projects can use dramatically different artwork, imagery, and visual identity — OBSG's saturated blue, DOHWA's editorial monochrome. The persistent navigation and contact system provide a stable layer across those different worlds, so projects can change while the system stays recognizable.",
            references: [
              {
                label: "Contact",
                detail: "Minimal contact experience with the same persistent navigation and visual system.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/contact-persistent-nav.jpg", alt: "Contact page with persistent navigation and a single email call-to-action" },
                ],
              },
              {
                label: "About",
                detail: "Artist biography and press interview, sharing the same navigation and visual system as every other project world.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/about-artist-bio.jpg", alt: "About page with artist biography and a Chosun Daily interview link" },
                ],
              },
            ],
          },
          {
            title: "Responsive design: desktop ↔ mobile",
            detail: "Mobile was part of the original design scope, not an automatic Webflow reflow. The same project hierarchy, navigation, and content relationships carry over to mobile: OBSG's quote, description, Concerts, and Albums sections stack into a single scrolling column instead of desktop's side-by-side rows; DOHWA's album detail keeps its editorial description and streaming links, and Related Works becomes a swipeable single-column sequence instead of a four-across grid. The persistent navigation collapses into a compact bottom bar that stays available throughout.",
            references: [
              {
                label: "OBSG — mobile",
                detail: "Quote and description, Concerts, and Albums stacked into one scrolling column.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/obsg-mobile-overview.jpg", alt: "OBSG project page on mobile showing the quote, description, and start of Concerts", stage: "Overview" },
                  { src: "/case-studies/lee-heemoon/obsg-mobile-concerts-albums.jpg", alt: "OBSG project page on mobile scrolled to Concerts and the start of Albums", stage: "Concerts → Albums" },
                  { src: "/case-studies/lee-heemoon/obsg-mobile-concert-gallery.jpg", alt: "OBSG concert photo gallery on mobile", stage: "Concert gallery" },
                ],
              },
              {
                label: "DOHWA — mobile",
                detail: "Artist portrait, album detail, and Related Works as a single-column sequence.",
                type: "screenshot",
                previewImages: [
                  { src: "/case-studies/lee-heemoon/dohwa-mobile-artist-portrait.jpg", alt: "DOHWA project page on mobile showing the artist portrait transitioning into album detail", stage: "Artist portrait" },
                  { src: "/case-studies/lee-heemoon/dohwa-mobile-album-detail.jpg", alt: "DOHWA album detail description on mobile", stage: "Album detail" },
                  { src: "/case-studies/lee-heemoon/dohwa-mobile-related-works.jpg", alt: "DOHWA Related Works section on mobile as a single-column sequence", stage: "Related Works" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "heemoon-ownership",
        type: "summary",
        label: "Ownership",
        title: "Designed, built, and maintained",
        body:
          "I designed and built the website directly in Webflow and have continued managing it in collaboration with Ewon Art since 2024. New projects, performances, albums, and promotional priorities continue to enter the system — the website functions as an evolving publishing platform rather than a finished, one-off deliverable.",
        signals: ["2024 — Present", "Ewon Art Company, Korea", "Design → Build → Launch → Maintain → Evolve"],
      },
      {
        id: "heemoon-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "How the case reads by audience",
        lenses: [
          {
            audience: "Recruiter",
            takeaway: "Shows more than visual website design: UX thinking, information architecture, responsive design, stakeholder collaboration, implementation, and ongoing ownership in one project.",
          },
          {
            audience: "Design Director",
            takeaway: "The strongest evidence is the connection between concept and interaction — the artist's multiple identities becoming a project-based taxonomy, then a 360° spatial navigation.",
          },
          {
            audience: "Engineering Manager",
            takeaway: "Demonstrates that the designer also implemented and maintains the production system in Webflow, without overstating engineering complexity beyond what the evidence supports.",
          },
          {
            audience: "Potential Client",
            takeaway: "Translates brand identity, content complexity, and a real business requirement (promotional priority) into a maintainable production website.",
          },
          {
            audience: "Future Self",
            takeaway: "The architecture stays scalable — new projects can be added without inventing new top-level categories or restructuring the site.",
          },
        ],
      },
      {
        id: "heemoon-next",
        type: "nextQuestions",
        label: "Next Questions",
        title: "Continue exploring",
        questions: ["Show me the SaaS Admin Redesign case.", "Show me the AI Workflow case.", "Who are you?"],
      },
    ],
    relatedCards: [
      {
        id: "heemoon-ask-thinking",
        type: "Ask",
        title: "How I think",
        reason: "Connect this case back to the reusable thinking model.",
        targetQuestion: "Who are you?",
      },
      {
        id: "heemoon-case-saas",
        type: "Case",
        title: "SaaS Admin Redesign",
        reason: "Compare with a structure-first, information-architecture case.",
        targetQuestion: "Show me the SaaS Admin Redesign case.",
      },
      {
        id: "heemoon-case-jira",
        type: "Case",
        title: "AI Workflow",
        reason: "See a workflow-automation case alongside this product-ownership one.",
        targetQuestion: "Show me the AI Workflow case.",
      },
    ],
    evidenceReferences: [
      { label: "360° Projects carousel", detail: "Circular carousel with the active project centered; persistent navigation stays available underneath.", type: "screenshot" },
      { label: "OBSG project overview", detail: "Project description, Concerts, and Albums living inside one Project.", type: "screenshot" },
      { label: "DOHWA album detail", detail: "Album identity, editorial description, and streaming platform links.", type: "screenshot" },
      { label: "Related works", detail: "Adjacent OBSG releases surfaced below the album.", type: "screenshot" },
      { label: "What's New / Homepage", detail: "Featured current media with persistent navigation.", type: "screenshot" },
      { label: "Contact", detail: "Minimal contact experience with the same persistent navigation system.", type: "screenshot" },
    ],
    followUpQuestions: ["Show me the SaaS Admin Redesign case.", "Show me the AI Workflow case.", "Who are you?"],
  },
];

export const fallbackQuestion: QuestionNode = {
  id: "custom-exploration",
  question: "Custom exploration",
  intent: "Answer an open question with the available static knowledge model.",
  category: "Principles",
  answerTitle: "Custom exploration",
  answerBlocks: [
    {
      id: "custom-summary",
      type: "summary",
      label: "Summary",
      title: "This prototype can route custom questions into a structured answer shell.",
      body:
        "A real AI layer would retrieve the relevant cases, logs, and evidence. In this static v0.1, custom prompts demonstrate the same presentation model with a generic but inspectable response.",
      signals: ["Static mock", "Structured response", "Future retrieval layer"],
    },
    {
      id: "custom-lens",
      type: "perspectiveLens",
      label: "Perspective Lens",
      title: "How to evaluate this response shell",
      lenses: sharedLens,
    },
    {
      id: "custom-next",
      type: "nextQuestions",
      label: "Next Questions",
      title: "More grounded paths",
      questions: ["Who are you?", "What proves the quality of your work?", "Open Decision Log #12."],
    },
  ],
  relatedCards: [
    {
      id: "custom-identity",
      type: "Ask",
      title: "Who are you?",
      reason: "Return to the strongest static identity response.",
      targetQuestion: "Who are you?",
    },
    {
      id: "custom-evidence",
      type: "Evidence",
      title: "Evidence map",
      reason: "Move from a custom prompt to proof and artifacts.",
      targetQuestion: "What proves the quality of your work?",
    },
  ],
  evidenceReferences: [],
  followUpQuestions: ["Who are you?", "What proves the quality of your work?"],
};

export function resolveQuestion(input: string): QuestionNode {
  const normalized = input.trim().toLowerCase();
  const exact = questionBank.find((node) => node.question.toLowerCase() === normalized);
  if (exact) return exact;

  const starter = starterQuestions.find((node) => node.question.toLowerCase() === normalized);
  if (starter) {
    return questionBank.find((node) => node.id === starter.id) ?? fallbackQuestion;
  }

  if (normalized.includes("who") || normalized.includes("identity")) return questionBank[0];
  if (normalized.includes("philosophy") || normalized.includes("principle")) return questionBank[1];
  if (normalized.includes("meeting") || normalized.includes("case")) return questionBank[2];
  if (normalized.includes("evidence") || normalized.includes("prove") || normalized.includes("proof")) return questionBank[3];
  if (normalized.includes("log") || normalized.includes("decision")) return questionBank[4];
  if (normalized.includes("saas") || normalized.includes("admin") || normalized.includes("workspace manager")) {
    return questionBank.find((node) => node.id === "saas-admin-redesign") ?? fallbackQuestion;
  }
  if (normalized.includes("jira") || normalized.includes("automation") || normalized.includes("hackathon")) {
    return questionBank.find((node) => node.id === "jira-automation") ?? fallbackQuestion;
  }
  if (normalized.includes("heemoon") || normalized.includes("hee-moon") || normalized.includes("webflow") || normalized.includes("ewon")) {
    return questionBank.find((node) => node.id === "lee-heemoon") ?? fallbackQuestion;
  }

  return {
    ...fallbackQuestion,
    id: `custom-${normalized.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "question"}`,
    question: input.trim(),
  };
}
