import { useMemo, useState } from "react";
import { showcaseData, type CodeSample, type Pipeline, type PnlPoint } from "./data/showcaseData";
import LiveTradingPage from "./LiveTradingPage";

type SectionKey = "live" | "dashboard" | "pipelines" | "architecture" | "samples";

const sections: { key: SectionKey; label: string }[] = [
  { key: "live", label: "Live Trading" },
  { key: "dashboard", label: "Dashboard" },
  { key: "pipelines", label: "Pipelines" },
  { key: "architecture", label: "Architecture" },
  { key: "samples", label: "Code Samples" }
];

const numberFormatter = new Intl.NumberFormat("en-US");

function TrendChart({ points }: { points: PnlPoint[] }) {
  const values = points.map((point) => point.equity);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - ((point.equity - min) / spread) * 86 - 7;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="trend-panel" aria-label="Mock portfolio equity curve">
      <div className="trend-meta">
        <span>Mock P&amp;L</span>
        <strong>{numberFormatter.format(values[values.length - 1] ?? 0)}</strong>
      </div>
      <svg viewBox="0 0 100 100" role="img" aria-label="Equity curve chart">
        <defs>
          <linearGradient id="equityFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2f80ed" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#2f80ed" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={`0,100 ${path} 100,100`} fill="url(#equityFill)" stroke="none" />
        <polyline points={path} fill="none" stroke="#2f80ed" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="trend-axis">
        <span>{points[0]?.label}</span>
        <span>{points[points.length - 1]?.label}</span>
      </div>
    </div>
  );
}

function MetricGrid() {
  return (
    <div className="metric-grid">
      {showcaseData.scaleMetrics.map((metric) => (
        <article className={`metric-card tone-${metric.tone}`} key={metric.id}>
          <span>{metric.label}</span>
          <strong>{metric.display}</strong>
          <p>{metric.context}</p>
        </article>
      ))}
    </div>
  );
}

function StrategyGrid() {
  return (
    <div className="strategy-grid">
      {showcaseData.strategyCards.map((strategy) => (
        <article className="strategy-card" key={strategy.name}>
          <div>
            <h3>{strategy.name}</h3>
            <span>{strategy.status}</span>
          </div>
          <dl>
            <div><dt>P&amp;L</dt><dd>{strategy.pnl}</dd></div>
            <div><dt>Win</dt><dd>{strategy.winRate}</dd></div>
            <div><dt>DD</dt><dd>{strategy.maxDrawdown}</dd></div>
            <div><dt>Trades</dt><dd>{numberFormatter.format(strategy.trades)}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function PipelineCard({ pipeline }: { pipeline: Pipeline }) {
  return (
    <article className="pipeline-card">
      <div className="pipeline-heading">
        <div>
          <h3>{pipeline.title}</h3>
          <p>{pipeline.summary}</p>
        </div>
        <div className="pipeline-stats">
          {pipeline.stats.map((stat) => (
            <span key={`${pipeline.id}-${stat.label}`}>
              <strong>{stat.value}</strong>
              {stat.label}
            </span>
          ))}
        </div>
      </div>
      <div className="stage-row">
        {pipeline.stages.map((stage) => (
          <section className="stage" key={`${pipeline.id}-${stage.label}`}>
            <span>{stage.metric}</span>
            <h4>{stage.label}</h4>
            <p>{stage.detail}</p>
          </section>
        ))}
      </div>
    </article>
  );
}

function DashboardSection() {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p>Systems at scale</p>
          <h2>Read-only operating view seeded with sanitized evidence</h2>
        </div>
        <span className="timestamp">Generated {showcaseData.generatedAt}</span>
      </div>
      <MetricGrid />
      <div className="dashboard-grid">
        <TrendChart points={showcaseData.pnlSeries} />
        <div className="lifecycle-panel">
          <div className="panel-title">
            <p>Trade lifecycle</p>
            <h3>Backtest/live vocabulary parity</h3>
          </div>
          <ol className="lifecycle-list">
            {showcaseData.lifecycle.map((step) => (
              <li className={`state-${step.state}`} key={step.label}>
                <span>{step.label}</span>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <StrategyGrid />
    </section>
  );
}

function PipelinesSection() {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p>Processing flows</p>
          <h2>Evidence-backed pipelines without implementation leakage</h2>
        </div>
      </div>
      <div className="pipeline-stack">
        {showcaseData.pipelines.map((pipeline) => (
          <PipelineCard pipeline={pipeline} key={pipeline.id} />
        ))}
      </div>
      <div className="benchmark-grid">
        {showcaseData.benchmarks.map((benchmark) => (
          <article className="benchmark-card" key={benchmark.id}>
            <h3>{benchmark.title}</h3>
            <div className="benchmark-bars">
              <span style={{ width: "42%" }}>{benchmark.baseline}</span>
              <strong style={{ width: `${Math.min(94, 32 + benchmark.speedup / 2)}%` }}>{benchmark.optimized}</strong>
            </div>
            <p><b>{benchmark.speedup.toFixed(2)}x</b> speedup. {benchmark.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <p>Architecture story</p>
          <h2>Database-centered contracts, thin orchestration, measured tradeoffs</h2>
        </div>
      </div>
      <div className="architecture-grid">
        <article className="principles-panel">
          <h3>Design philosophy</h3>
          <ul>
            {showcaseData.architecturePrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </article>
        <article className="browser-panel">
          <h3>Parquet/data browser mock</h3>
          <table>
            <thead>
              <tr><th>Dataset</th><th>Partition</th><th>Rows</th><th>Size</th></tr>
            </thead>
            <tbody>
              {showcaseData.browserRows.map((row) => (
                <tr key={`${row.dataset}-${row.partition}`}>
                  <td>{row.dataset}</td>
                  <td>{row.partition}</td>
                  <td>{row.rows}</td>
                  <td>{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
      <div className="schema-grid">
        {showcaseData.schemaSamples.map((sample) => (
          <article className="schema-card" key={sample.table}>
            <span>{sample.table}</span>
            <h3>{sample.purpose}</h3>
            <ul>
              {sample.fields.map((field) => <li key={field}>{field}</li>)}
            </ul>
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
    <section className="page-section">
      <div className="section-header">
        <div>
          <p>Sanitized excerpts</p>
          <h2>Reusable primitives make the system scalable</h2>
        </div>
      </div>
      <div className="sample-layout">
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

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>("live");

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">Fenrir portfolio demo</span>
          <h1>Trading infrastructure showcase</h1>
          <p>{showcaseData.sourceNote}</p>
        </div>
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

      {activeSection === "live" && <LiveTradingPage />}
      {activeSection === "dashboard" && <DashboardSection />}
      {activeSection === "pipelines" && <PipelinesSection />}
      {activeSection === "architecture" && <ArchitectureSection />}
      {activeSection === "samples" && <SamplesSection />}
    </main>
  );
}


