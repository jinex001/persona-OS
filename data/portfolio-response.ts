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

export type QuestionNode = {
  id: string;
  question: string;
  intent: string;
  category: QuestionCategory;
  answerTitle: string;
  answerBlocks: AnswerBlock[];
  relatedCards: DiscoveryCardData[];
  evidenceReferences: SourceReference[];
  followUpQuestions: string[];
};

export const questionCategories: QuestionCategory[] = ["Identity", "Work", "Evidence", "Principles", "Logs"];

export const starterQuestions: Pick<QuestionNode, "id" | "question" | "intent" | "category">[] = [
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
        id: "saas-evidence-card",
        type: "Evidence",
        title: "Evidence map",
        reason: "See how process notes and artifacts support this case.",
        targetQuestion: "What proves the quality of your work?",
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

  return {
    ...fallbackQuestion,
    id: `custom-${normalized.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "question"}`,
    question: input.trim(),
  };
}
