import { useMemo, useState } from "react";
import fenrirMark from "./assets/fenrir.png";
import { showcaseData, type CodeSample } from "./data/showcaseData";
import LiveTradingPage from "./LiveTradingPage";

type SectionKey = "home" | "live" | "pipelines" | "architecture" | "samples" | "about";

const sections: { key: SectionKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "live", label: "Live Trading" },
  { key: "pipelines", label: "Pipelines" },
  { key: "architecture", label: "Architecture" },
  { key: "samples", label: "Code Samples" },
  { key: "about", label: "About" }
];

const pipelineHighlights = [
  {
    title: "Generic job contract",
    detail: "Jobs are defined in the database with config, schedules, and model bindings. New workflows plug into an existing execution system instead of creating new entry points.",
    metric: "shared lifecycle"
  },
  {
    title: "Vectorized research path",
    detail: "Historical data is processed once, stored in parquet, and reused across strategy refinement passes. Compute is amortized across iterations.",
    metric: "parquet reuse"
  },
  {
    title: "Live recompute loop",
    detail: "Live trading recomputes indicators and conditions from fresh bars instead of relying on stale precomputed signals.",
    metric: "fresh bars"
  }
];

const pipelineFlow = [
  { step: "01", title: "Ingest", body: "Download and normalize market data. Persist as parquet and database artifacts." },
  { step: "02", title: "Filter", body: "Reduce large symbol sets into small candidate pools for analysis and live execution." },
  { step: "03", title: "Backtest", body: "Execute strategy workers across symbol/date partitions using shared contracts." },
  { step: "04", title: "Operate", body: "Schedule jobs, run bots, process live data, and persist execution summaries." }
];

const jobLifecycle = ["Register", "Validate", "Execute", "Persist", "Notify", "Chain"];

const scaleReasons = [
  "New jobs require configuration, not infrastructure",
  "Execution lifecycle is shared across all workloads",
  "Persistence is standardized through database contracts",
  "Parallel workloads use partitioned execution plans",
  "Results are shaped consistently for API and UI consumption"
];

const architectureCards = [
  {
    title: "Database-centered contracts",
    body: "Jobs, strategies, filtering results, and trading state are stored as durable records. The database acts as the system control plane."
  },
  {
    title: "Thin orchestration",
    body: "Services coordinate execution, but do not own state. Orchestration logic is minimal and driven by database records."
  },
  {
    title: "Backtest / live parity",
    body: "Backtests and live trading share signal structures, decision states, and lifecycle events. Timing differs, behavior does not."
  },
  {
    title: "Auditable iteration",
    body: "Strategy versions, job executions, and results are persisted. Every change leaves a trail for analysis and refinement."
  }
];

const architectureFlow = ["Postgres", "FastAPI", "Job daemon", "Docker workers", "Fenrir mobile"];

const architectureDiagramNodes = [
  {
    id: "mobile",
    title: "Fenrir mobile app",
    detail: "React Native operations surface"
  },
  {
    id: "api",
    title: "FastAPI control layer",
    detail: "Jobs, charts, bots, notifications"
  },
  {
    id: "db",
    title: "Postgres control plane",
    detail: "job, strategy, trading, cortex schemas"
  },
  {
    id: "daemon",
    title: "Master orchestrator",
    detail: "Poll schedules, claim work, chain dependents"
  },
  {
    id: "workers",
    title: "Docker job workers",
    detail: "Python, process pools, ML libraries"
  },
  {
    id: "storage",
    title: "Local parquet + backups",
    detail: "Hot, warm, shared data tiers"
  },
  {
    id: "cortex",
    title: "Cortex RAG layer",
    detail: "Docs, chunks, symbols, relationships"
  },
  {
    id: "streams",
    title: "Market + broker streams",
    detail: "Websocket intake, REST reconciliation"
  }
];

const architectureGroups = [
  {
    title: "Control Plane",
    body: "Postgres schemas manage jobs, strategies, trading lifecycle, and system state."
  },
  {
    title: "Execution Plane",
    body: "Python workers execute jobs, analysis, backtests, and live trading logic."
  },
  {
    title: "Data Plane",
    body: "Parquet storage handles high-volume historical and analysis data."
  },
  {
    title: "Interface Layer",
    body: "FastAPI and mobile UI expose control, monitoring, and workflows."
  }
];

const architectureReasons = [
  "State is centralized and versioned",
  "Execution is decoupled from persistence",
  "Contracts enforce consistent data shapes",
  "Jobs reuse a shared lifecycle",
  "Results are always persisted and queryable"
];

const architectureConstraints = [
  "Single websocket connection for market data",
  "Local-first compute (no cloud dependency)",
  "High data volume handled via parquet",
  "Parallel execution using worker partitioning",
  "Persistent state required for recovery and auditability"
];

const architectureTradeoffs = [
  "Parquet over database for performance",
  "Centralized stream over per-bot connections",
  "Recompute in live trading over precomputed signals",
  "Database contracts over in-memory state"
];

const aboutFeatures = [
  "End-to-end ownership across data, API, database, workers, mobile UI, and automation",
  "Realtime decision systems with broker and market-data constraints",
  "Durable Postgres contracts for jobs, strategies, trading state, and lifecycle records",
  "Local-first data architecture using parquet for high-volume research artifacts",
  "Cortex-backed LLM/RAG workflows for project memory and lower-token handoffs"
];

const homeTeasers: {
  title: string;
  copy: string;
  cta: string;
  section: SectionKey;
}[] = [
  {
    title: "Realtime Trading",
    copy: "One market-data stream feeds multiple independent decision engines.",
    cta: "View live flow ->",
    section: "live"
  },
  {
    title: "Architecture",
    copy: "Contracts, not code branches, keep the system stable under iteration.",
    cta: "Break it down ->",
    section: "architecture"
  },
  {
    title: "Pipelines",
    copy: "New research, filtering, and backtest workflows plug into a shared execution lifecycle.",
    cta: "See the lifecycle ->",
    section: "pipelines"
  }
];

type HomeLandingProps = {
  onNavigate: (section: SectionKey) => void;
};

function HomeLanding({ onNavigate }: HomeLandingProps) {
  return (
    <section className="home-landing" aria-labelledby="home-title">
      <div className="home-graphic" aria-hidden="true">
        <div className="home-orbit orbit-one" />
        <div className="home-orbit orbit-two" />
        <div className="home-mark-core">
          <img src={fenrirMark} alt="" />
        </div>
        <div className="home-flow-line line-a" />
        <div className="home-flow-line line-b" />
      </div>

      <div className="home-copy">
        <span className="section-kicker">Fenrir portfolio demo</span>
        <h1 id="home-title">Production trading infrastructure.<br />Built end-to-end by one engineer.</h1>
        <p>
          A private system for realtime execution, research, and automation — shown without exposing source code or proprietary strategy logic.
        </p>
        <div className="home-actions" aria-label="Landing page actions">
          <button className="primary" type="button" onClick={() => onNavigate("live")}>View Live Trading</button>
          <button type="button" onClick={() => onNavigate("architecture")}>See Architecture</button>
          <button className="text-link" type="button" onClick={() => onNavigate("pipelines")}>Explore Pipelines</button>
        </div>

        <div className="home-teasers" aria-label="Showcase paths">
          {homeTeasers.map((card) => (
            <button type="button" key={card.title} onClick={() => onNavigate(card.section)}>
              <h2>{card.title}</h2>
              <p>{card.copy}</p>
              <span>{card.cta}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PipelinesSection() {
  return (
    <section className="showcase-page" aria-labelledby="pipelines-title">
      <div className="showcase-hero compact-hero">
        <span className="section-kicker">Pipeline design</span>
        <h2 id="pipelines-title">New workflows don’t require new infrastructure.</h2>
        <p>
          Jobs are registered, validated, executed, and persisted through a shared contract. Research, filtering, backtesting,
          and live operations all reuse the same lifecycle.
        </p>
      </div>

      <div className="job-lifecycle-strip" aria-label="Job lifecycle">
        {jobLifecycle.map((step, index) => (
          <span key={step}>
            {step}
            {index < jobLifecycle.length - 1 && <i aria-hidden="true">-&gt;</i>}
          </span>
        ))}
      </div>
      <p className="pipeline-caption">Every job follows the same lifecycle. No custom orchestration required.</p>

      <div className="insight-grid three-up">
        {pipelineHighlights.map((item) => (
          <article className="insight-card" key={item.title}>
            <span>{item.metric}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="process-strip" aria-label="Pipeline flow">
        {pipelineFlow.map((item) => (
          <article key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <section className="pipeline-scale" aria-labelledby="pipeline-scale-title">
        <div>
          <h3 id="pipeline-scale-title">Why this system moves fast</h3>
          <p>
            Heavy workloads are partitioned and executed in parallel, allowing large-scale filtering and backtesting
            without blocking orchestration.
          </p>
        </div>
        <ul>
          {scaleReasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      </section>

      <div className="evidence-grid">
        {showcaseData.benchmarks.map((benchmark) => (
          <article className="evidence-card" key={benchmark.id}>
            <span>{benchmark.speedup.toFixed(2)}x</span>
            <h3>{benchmark.title}</h3>
            <p>{benchmark.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const diagramNode = (id: string) => {
    const node = architectureDiagramNodes.find((item) => item.id === id);
    if (!node) {
      return null;
    }
    return (
      <article className={`diagram-node node-${node.id}`} key={node.id}>
        <h3>{node.title}</h3>
        <p>{node.detail}</p>
      </article>
    );
  };

  return (
    <section className="showcase-page" aria-labelledby="architecture-title">
      <div className="showcase-hero compact-hero">
        <span className="section-kicker">Architecture</span>
        <h2 id="architecture-title">Complex systems stay stable when contracts define behavior.</h2>
        <p>
          State lives in the database. Execution is orchestrated through thin services. The system is designed for repeatable behavior
          across research, backtesting, and live trading.
        </p>
      </div>

      <section className="architecture-structure" aria-labelledby="architecture-structure-title">
        <h3 id="architecture-structure-title">System structure</h3>
        <div>
          {architectureGroups.map((group) => (
            <article key={group.title}>
              <span>{group.title}</span>
              <p>{group.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="architecture-flow" aria-label="Architecture contract flow">
        {architectureFlow.map((node) => <span key={node}>{node}</span>)}
      </div>

      <div className="insight-grid two-up">
        {architectureCards.map((card) => (
          <article className="insight-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>

      <section className="architecture-list-section" aria-labelledby="architecture-reasons-title">
        <h3 id="architecture-reasons-title">Why this system doesn’t collapse under change</h3>
        <ul>
          {architectureReasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      </section>

      <article className="architecture-diagram">
        <div>
          <span>System map</span>
          <h3>Control, execution, and data boundaries</h3>
        </div>
        <div className="architecture-map" aria-label="Architecture system map">
          <div className="map-flow">
            <div className="diagram-column">{diagramNode("mobile")}</div>
            <div className="diagram-column">{diagramNode("api")}</div>
            <div className="diagram-column">{diagramNode("db")}</div>
            <div className="diagram-column">{diagramNode("daemon")}</div>
            <div className="diagram-column">{diagramNode("workers")}</div>
          </div>
          <div className="map-branches">
            {diagramNode("streams")}
            {diagramNode("storage")}
            {diagramNode("cortex")}
          </div>
        </div>
        <p>A local-first system where control, execution, and data layers are explicitly separated but tightly coordinated.</p>
      </article>

      <div className="architecture-bottom-grid">
        <section className="architecture-list-section" aria-labelledby="architecture-constraints-title">
          <h3 id="architecture-constraints-title">Designed under real constraints</h3>
          <ul>
            {architectureConstraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
          </ul>
        </section>

        <section className="architecture-list-section" aria-labelledby="architecture-tradeoffs-title">
          <h3 id="architecture-tradeoffs-title">Tradeoffs</h3>
          <ul>
            {architectureTradeoffs.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}
          </ul>
        </section>
      </div>
    </section>
  );
}

function SamplesSection() {
  const [activeId, setActiveId] = useState(showcaseData.codeSamples[0]!.id);
  const activeSample = useMemo<CodeSample>(() => {
    return showcaseData.codeSamples.find((sample) => sample.id === activeId) ?? showcaseData.codeSamples[0]!;
  }, [activeId]);

  return (
    <section className="showcase-page" aria-labelledby="samples-title">
      <div className="showcase-hero compact-hero">
        <span className="section-kicker">Sanitized patterns</span>
        <h2 id="samples-title">Small excerpts, focused on reusable engineering shape.</h2>
        <p>
          These examples are rewritten to show boundary design, orchestration style, and contract testing without exposing private
          repository code, strategy thresholds, provider credentials, or cloneable implementation details.
        </p>
      </div>

      <div className="sample-layout refined-samples">
        <div className="sample-tabs" role="tablist" aria-label="Code samples">
          {showcaseData.codeSamples.map((sample) => (
            <button
              className={sample.id === activeId ? "active" : ""}
              key={sample.id}
              onClick={() => setActiveId(sample.id)}
              type="button"
            >
              {sample.title}
            </button>
          ))}
        </div>
        <article className="code-panel">
          <div>
            <span>{activeSample.language}</span>
            <h3>{activeSample.title}</h3>
          </div>
          <pre><code>{activeSample.code}</code></pre>
        </article>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="showcase-page" aria-labelledby="about-title">
      <div className="showcase-hero compact-hero">
        <span className="section-kicker">About st-engine / Fenrir</span>
        <h2 id="about-title">This started as a trading engine.<br />It became a systems engineering proving ground.</h2>
        <p>
          st-engine is a private platform for market-data ingestion, research, backtesting, live bot orchestration, scheduling,
          mobile operations, and LLM-assisted project memory.
        </p>
      </div>

      <div className="about-layout">
        <article className="about-panel">
          <h3>What the system proves</h3>
          <ul>
            {aboutFeatures.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </article>
        <article className="about-panel accent-panel">
          <span>Showcase boundary</span>
          <p>
            Fenrir shows the architecture, flow, and operational behavior without publishing private source code, credentials,
            production identifiers, or strategy logic.
          </p>
        </article>
      </div>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>("home");

  return (
    <main className="app-shell">
      <header className="app-header">
        <button className="brand-lockup" type="button" onClick={() => setActiveSection("home")} aria-label="Fenrir showcase home">
          <img src={fenrirMark} alt="" />
          <span>Fenrir</span>
        </button>
        <nav aria-label="Showcase sections">
          {sections.map((section) => (
            <button
              className={section.key === activeSection ? "active" : ""}
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      {activeSection === "home" && <HomeLanding onNavigate={setActiveSection} />}
      {activeSection === "live" && <LiveTradingPage />}
      {activeSection === "pipelines" && <PipelinesSection />}
      {activeSection === "architecture" && <ArchitectureSection />}
      {activeSection === "samples" && <SamplesSection />}
      {activeSection === "about" && <AboutSection />}
    </main>
  );
}
