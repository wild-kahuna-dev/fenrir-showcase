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
    detail: "Jobs enter through a shared config/result boundary, which keeps ingestion, filtering, backtests, and live bots easy to add without bespoke UI paths.",
    metric: "one runner"
  },
  {
    title: "Vectorized research path",
    detail: "Historical bars and indicators are prepared once, persisted behind stable contracts, and reused across many strategy refinement passes.",
    metric: "343M+ rows"
  },
  {
    title: "Live recompute loop",
    detail: "The live path narrows symbols first, then repeatedly recomputes indicators and strategy conditions from fresh bars for selected candidates.",
    metric: "250 bars"
  }
];

const pipelineFlow = [
  { step: "01", title: "Ingest", body: "Download market data, normalize source records, and write durable parquet/database artifacts." },
  { step: "02", title: "Filter", body: "Reduce broad symbol sets into smaller watchlists before expensive analysis or live subscriptions." },
  { step: "03", title: "Backtest", body: "Run strategy/date/symbol workers through shared signal and lifecycle contracts." },
  { step: "04", title: "Operate", body: "Schedule jobs, start bots, route live bars, and persist run summaries for review." }
];

const architectureCards = [
  {
    title: "Database-centered contracts",
    body: "Configuration, run state, strategy versions, filtering results, and lifecycle outcomes are treated as durable records rather than transient process memory."
  },
  {
    title: "Thin orchestration",
    body: "Jobs coordinate validation, partitioning, execution, and persistence while pushing reusable parsing, time handling, and DB result shaping into shared utilities."
  },
  {
    title: "Backtest/live parity",
    body: "Backtests and live trading do not run at the same cadence, but they share signal names, decision states, and trade lifecycle vocabulary."
  },
  {
    title: "Auditable iteration",
    body: "Strategy changes are versioned, pipeline outputs are persisted, and project records capture why a direction changed before implementation continues."
  }
];

const architectureFlow = ["Job config", "Validated model", "Worker plan", "DB/parquet artifacts", "Run summary"];

const aboutFeatures = [
  "Scheduled data preparation and market-open filtering",
  "Vectorized research and backtest refinement over large historical datasets",
  "Live bot orchestration with shared websocket intake and bot-owned state",
  "Database-first contracts for jobs, strategies, results, and lifecycle state",
  "Cortex-backed project memory for efficient LLM handoffs and lower-token context retrieval"
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
        <h1 id="home-title">Private trading infrastructure, shown safely.</h1>
        <p>
          Fenrir is the portfolio face of my private st-engine project: a database-centered trading platform for market-data ingestion,
          vectorized research and backtesting, strategy refinement, scheduled jobs, live bot orchestration, and execution monitoring.
          This demo uses sanitized data and architecture views to show the engineering scale without exposing private source code.
        </p>
        <div className="home-actions" aria-label="Landing page actions">
          <button className="primary" type="button" onClick={() => onNavigate("live")}>Live Trading</button>
          <button type="button" onClick={() => onNavigate("pipelines")}>Pipelines</button>
          <button type="button" onClick={() => onNavigate("architecture")}>Architecture</button>
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
        <h2 id="pipelines-title">Generic jobs make new data and analysis flows cheap to add.</h2>
        <p>
          The system separates job contracts, partition plans, vectorized computation, and persistence. That lets ingestion,
          filtering, backtesting, and live operations reuse the same orchestration shape while scaling different workloads.
        </p>
      </div>

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
  return (
    <section className="showcase-page" aria-labelledby="architecture-title">
      <div className="showcase-hero compact-hero">
        <span className="section-kicker">Architecture</span>
        <h2 id="architecture-title">Durable contracts keep a complex trading system understandable.</h2>
        <p>
          Fenrir favors database-backed state, thin orchestration, explicit model boundaries, and auditable run summaries.
          The goal is not a clever demo path; it is repeatable engineering across research, backtest, and live execution.
        </p>
      </div>

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
        <h2 id="about-title">A private platform for research, automation, and live trading operations.</h2>
        <p>
          st-engine is the private backend. Fenrir is the portfolio-safe showcase layer: it explains the architecture,
          data volume, live behavior, and LLM-assisted project memory without publishing the source repository.
        </p>
      </div>

      <div className="about-layout">
        <article className="about-panel">
          <h3>What the system demonstrates</h3>
          <ul>
            {aboutFeatures.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </article>
        <article className="about-panel accent-panel">
          <span>Showcase boundary</span>
          <p>
            The site intentionally uses sanitized symbols, mock identifiers, rewritten excerpts, and architecture diagrams.
            It is built to communicate engineering scale to startups and hiring teams without leaking strategy logic or private code.
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
