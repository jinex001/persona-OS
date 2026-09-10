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

export const starterQuestions: Pick<QuestionNode, "id" | "question" | "intent" | "category">[] = [
  {
    id: "lee-heemoon",
    question: "Show me the Lee Heemoon case.",
    intent: "Lee Heemoon — designing and maintaining an evolving digital home for a genre-defying artist.",
    category: "Work",
  },
  {
    id: "jira-automation",
    question: "Show me the AI Workflow case.",
    intent: 'Turning Design System Changes into Engineering Work Automation — "Figma" → "Jira"',
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
    id: "meeting-room-redesign",
    question: "Show me the Meeting Room App Redesign case.",
    intent: "Open a product-shaped case study about live meeting room availability.",
    category: "Work",
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
  {
    id: "saas-admin-redesign",
    question: "Show me the SaaS Admin Redesign case.",
    intent: "Open a structural refactoring case study about a complex SaaS admin interface.",
    category: "Work",
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
        id: "identity-evidence",
        type: "evidence",
        label: "Evidence",
        title: "Proof patterns",
        items: coreEvidence,
      },
      {
        id: "related-identity-work",
        type: "relatedWork",
        label: "Related Work",
        title: "Where this shows up",
        cases: [
          {
            title: "Meeting Room App Redesign",
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
            summary: "A structural refactoring of a complex Workspace Manager admin interface without changing its underlying business logic.",
            outcome: "A clearer responsibility hierarchy across global, navigation, page, filter, and data layers.",
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
      {
        id: "identity-next",
        type: "nextQuestions",
        label: "Next Questions",
        title: "Suggested next explorations",
        questions: [
          "How has your design philosophy changed?",
          "Show me the Meeting Room App Redesign case.",
          "What proves the quality of your work?",
        ],
      },
    ],
    relatedCards: [
      {
        id: "identity-ask-philosophy",
        type: "Ask",
        title: "Design philosophy",
        reason: "This continues from identity into principles and judgment.",
        targetQuestion: "How has your design philosophy changed?",
      },
      {
        id: "identity-case-room",
        type: "Case",
        title: "Meeting Room App Redesign",
        reason: "A concrete case makes the identity claims inspectable.",
        targetQuestion: "Show me the Meeting Room App Redesign case.",
      },
      {
        id: "identity-log-12",
        type: "Design Log",
        title: "Decision Log #12",
        reason: "Shows why this system uses blocks instead of chat paragraphs.",
        targetQuestion: "Open Decision Log #12.",
      },
      {
        id: "identity-evidence-proof",
        type: "Evidence",
        title: "Proof of quality",
        reason: "Moves from claims to artifacts, process notes, and outcomes.",
        targetQuestion: "What proves the quality of your work?",
      },
    ],
    evidenceReferences: coreEvidence.flatMap((item) => item.references),
    followUpQuestions: [
      "How has your design philosophy changed?",
      "Show me the Meeting Room App Redesign case.",
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
    question: "Show me the Meeting Room App Redesign case.",
    intent: "Open a case study about a tablet-based room display, real-time availability, and admin-defined room rules.",
    category: "Work",
    answerTitle: "Meeting Room App Redesign",
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
        title: "Lee Heemoon",
        reason: "See a content-and-identity system alongside this state-driven one.",
        targetQuestion: "Show me the Lee Heemoon case.",
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
        questions: ["Show me the Meeting Room App Redesign case.", "Open Decision Log #12."],
      },
    ],
    relatedCards: [
      {
        id: "evidence-case",
        type: "Case",
        title: "Meeting Room App Redesign",
        reason: "A case gives evidence more context and consequence.",
        targetQuestion: "Show me the Meeting Room App Redesign case.",
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
    followUpQuestions: ["Show me the Meeting Room App Redesign case.", "Open Decision Log #12."],
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
    intent: "Open a structural refactoring case study about reorganizing a complex SaaS admin interface without changing its underlying business logic.",
    category: "Work",
    answerTitle: "SaaS Admin Redesign",
    heroMedia: {
      kind: "image",
      label: "Cover image placeholder · 1920 × 1080 recommended",
      tag: "Evidence · Cover Image",
      meta: "16:9 · edge-to-edge · caption optional",
    },
    answerBlocks: [
      {
        id: "saas-summary",
        type: "summary",
        label: "Case Summary",
        title: "The problem wasn't the functionality. It was how the functionality was structured.",
        body:
          "The Workspace Manager admin interface had accumulated multiple responsibilities within the same visual hierarchy: global navigation, page actions, filters, tabs, search, and data tables all competed within one flat structure. The redesign was scoped as structural refactoring rather than functional redesign. Business logic, data models, and filter behavior stayed untouched; what changed was the architecture through which users understand and interact with that functionality.",
        signals: ["SaaS admin UX", "Information architecture", "Structural refactoring", "Progressive disclosure"],
      },
      {
        id: "saas-reasoning",
        type: "designReasoning",
        label: "Design Reasoning",
        title: "Structural decisions",
        steps: [
          "Separate interface responsibility into distinct layers: global, navigation, page context, query and filtering, and data.",
          "Move application-wide actions (organization switcher, notifications, help, changelog) into a dedicated global header, away from page layouts.",
          "Reorganize sidebar navigation into collapsible groups (Setup, Management, Analysis) with collapsed and full-width states.",
          "Unify the main content area around a single card: page title, tabs, and primary actions positioned above the data.",
          "Reorder filters by frequency: search and date range stay primary; building, floor, and department move into a collapsible advanced section.",
          "Integrate the data table directly with its filter layer and remove duplicate result-count displays.",
        ],
      },
      {
        id: "saas-evidence",
        type: "evidence",
        label: "Evidence",
        title: "Structural decisions and artifacts",
        items: [
          {
            title: "Sidebar Navigation",
            detail: "Collapsible navigation groups organized into higher-level categories, with a minimized and full-width state to let navigation scale as functionality grows.",
            references: [{ label: "Navigation restructuring", detail: "Setup, Management, and Analysis groups with preserved expand/collapse state.", type: "artifact" }],
          },
          {
            title: "Global Header",
            detail: "Application-wide actions separated from page-specific functionality so users can distinguish global controls from page controls.",
            references: [{ label: "Global actions", detail: "Organization switcher, notifications, help, and changelog moved out of individual page layouts.", type: "artifact" }],
          },
          {
            title: "Page Layout & Content Container",
            detail: "A unified card container establishes a predictable page anatomy: where the user is, what actions are available, how the view is configured, and where data appears.",
            references: [{ label: "Content container", detail: "Tabs moved above the data card; titles and primary actions (Export, Add Booking) placed at the page context level.", type: "artifact" }],
          },
          {
            title: "Filter & Search Hierarchy",
            detail: "Filtering controls reorganized by frequency and importance to reduce default complexity while keeping advanced filtering available.",
            references: [{ label: "Progressive disclosure", detail: "Search and date range as primary controls; secondary filters collapsed into an advanced section.", type: "process note" }],
          },
          {
            title: "Data Table Integration",
            detail: "Filtering and resulting data treated as one continuous task; the column selector moved into the table header and redundant result counts removed.",
            references: [{ label: "Implementation scope", detail: "Jira-documented scope confirming business logic, data model, and existing functionality were preserved.", type: "process note" }],
          },
        ],
      },
      {
        id: "saas-lens",
        type: "perspectiveLens",
        label: "Perspective Lens",
        title: "How the case reads by audience",
        lenses: [
          {
            audience: "Recruiter",
            takeaway: "Shows the ability to bring order to a genuinely complex enterprise admin surface without inventing new scope.",
          },
          {
            audience: "Design Director",
            takeaway: "Demonstrates architectural judgment: separating scope and responsibility instead of solving complexity by adding new behavior.",
          },
          {
            audience: "Engineering Manager",
            takeaway: "Shows respect for existing business logic, data models, and fetch behavior while still improving the interface materially.",
          },
          {
            audience: "Potential Client",
            takeaway: "Communicates that meaningful redesign doesn't always require rebuilding functionality, which lowers delivery risk.",
          },
          {
            audience: "Future Self",
            takeaway: "Keeps the case honest by documenting only the verified outcome: a new interface architecture, not unverified efficiency claims.",
          },
        ],
      },
      {
        id: "saas-next",
        type: "nextQuestions",
        label: "Next Questions",
        title: "Continue exploring",
        questions: ["Show me the Meeting Room App Redesign case.", "What proves the quality of your work?"],
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
        title: "Meeting Room App Redesign",
        reason: "Compare with another structural, state-driven redesign.",
        targetQuestion: "Show me the Meeting Room App Redesign case.",
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
        title: "Lee Heemoon",
        reason: "See a content-and-identity system alongside this admin-interface case.",
        targetQuestion: "Show me the Lee Heemoon case.",
      },
    ],
    evidenceReferences: [
      { label: "Navigation restructuring", detail: "Setup, Management, and Analysis groups with preserved expand/collapse state.", type: "artifact" },
      { label: "Global actions", detail: "Organization switcher, notifications, help, and changelog moved out of individual page layouts.", type: "artifact" },
      { label: "Content container", detail: "Tabs moved above the data card; titles and primary actions placed at the page context level.", type: "artifact" },
      { label: "Progressive disclosure", detail: "Search and date range as primary controls; secondary filters collapsed into an advanced section.", type: "process note" },
      { label: "Implementation scope", detail: "Jira-documented scope confirming business logic, data model, and existing functionality were preserved.", type: "process note" },
    ],
    followUpQuestions: ["Show me the Meeting Room App Redesign case.", "What proves the quality of your work?"],
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
        questions: ["Show me the SaaS Admin Redesign case.", "Show me the Meeting Room App Redesign case."],
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
        title: "Meeting Room App Redesign",
        reason: "See a product-shaped case alongside this workflow-shaped one.",
        targetQuestion: "Show me the Meeting Room App Redesign case.",
      },
      {
        id: "jira-case-heemoon",
        type: "Case",
        title: "Lee Heemoon",
        reason: "See ongoing product ownership alongside this hackathon prototype.",
        targetQuestion: "Show me the Lee Heemoon case.",
      },
    ],
    evidenceReferences: [
      { label: "Trigger logic", detail: "Conceptual gate between design iteration and engineering-ready change.", type: "process note" },
      { label: "Ticket context model", detail: "Structured fields connecting design rationale to engineering scope.", type: "process note" },
      { label: "Critical-path prototype", detail: "Tested whether a design-system action could become a useful engineering task without a manual handoff.", type: "prototype" },
    ],
    followUpQuestions: ["Show me the SaaS Admin Redesign case.", "Show me the Meeting Room App Redesign case."],
  },
  {
    id: "lee-heemoon",
    question: "Show me the Lee Heemoon case.",
    intent: "Lee Heemoon — designing and maintaining an evolving digital home for a genre-defying artist.",
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
