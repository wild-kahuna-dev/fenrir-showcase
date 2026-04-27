export type ScaleMetric = {
  id: string;
  label: string;
  value: number;
  display: string;
  context: string;
  tone: "blue" | "green" | "amber" | "red" | "steel";
};

export type PipelineStage = {
  label: string;
  detail: string;
  metric: string;
};

export type Pipeline = {
  id: string;
  title: string;
  summary: string;
  stages: PipelineStage[];
  stats: { label: string; value: string }[];
};

export type Benchmark = {
  id: string;
  title: string;
  baseline: string;
  optimized: string;
  speedup: number;
  note: string;
};

export type StrategyCard = {
  name: string;
  status: string;
  pnl: string;
  winRate: string;
  maxDrawdown: string;
  trades: number;
  exposure: string;
};

export type PnlPoint = {
  label: string;
  equity: number;
  drawdown: number;
};

export type LifecycleStep = {
  label: string;
  detail: string;
  state: "complete" | "active" | "queued";
};

export type BrowserRow = {
  dataset: string;
  partition: string;
  rows: string;
  size: string;
  freshness: string;
};

export type SchemaSample = {
  table: string;
  purpose: string;
  fields: string[];
};

export type CodeSample = {
  id: string;
  title: string;
  language: string;
  code: string;
};

export type ShowcaseData = {
  generatedAt: string;
  sourceNote: string;
  scaleMetrics: ScaleMetric[];
  pnlSeries: PnlPoint[];
  strategyCards: StrategyCard[];
  pipelines: Pipeline[];
  benchmarks: Benchmark[];
  lifecycle: LifecycleStep[];
  browserRows: BrowserRow[];
  schemaSamples: SchemaSample[];
  codeSamples: CodeSample[];
  architecturePrinciples: string[];
};

const storedProcedureSample = `CREATE OR REPLACE FUNCTION demo.persist_batch(p_payload jsonb)
RETURNS jsonb AS $$
DECLARE
    v_batch_id uuid := (p_payload ->> 'batch_id')::uuid;
BEGIN
    PERFORM demo.validate_batch_contract(p_payload);

    INSERT INTO demo.batch_result(batch_id, summary, row_count)
    SELECT v_batch_id, p_payload -> 'summary', (p_payload ->> 'row_count')::bigint;

    RETURN jsonb_build_object(
        'batch_id', v_batch_id,
        'status', 'persisted'
    );
END;
$$ LANGUAGE plpgsql;`;

const reactContractSample = `export type PipelineSummary = {
  pipelineId: string;
  status: 'queued' | 'running' | 'complete' | 'failed';
  processedRows: number;
  persistedRows: number;
  durationSeconds: number;
};

export async function fetchPipelineSummary(id: string): Promise<PipelineSummary> {
  const response = await api.get<PipelineSummary>(\`/demo/pipelines/\${id}\`);
  return response.data;
}`;

const pythonOrchestrationSample = `class DemoBacktestJob(BaseJob):
    async def run_async(self) -> dict[str, Any]:
        config = DemoBacktestConfig.model_validate(self.config)
        run = await self.registry.create_run(config)

        batches = self.partition_plan(config.symbols, config.trade_days)
        results = await self.executor.run_batches(batches)

        return await self.registry.complete_run(
            run_id=run.run_id,
            summary=BacktestSummary.from_results(results),
        )`;

const testHarnessSample = `def test_pipeline_summary_contract(sample_summary: dict[str, Any]) -> None:
    parsed = PipelineSummary.model_validate(sample_summary)

    assert parsed.processed_rows >= parsed.persisted_rows
    assert parsed.duration_seconds > 0
    assert parsed.status == 'complete'`;

export const showcaseData: ShowcaseData = {
  generatedAt: "2026-04-27T17:25:00-05:00",
  sourceNote: "Sanitized portfolio data seeded from Cortex-backed architecture review. Symbols, strategies, identifiers, and snippets are demo-only.",
  scaleMetrics: [
    {
      id: "quote-source-rows",
      label: "Quote rows scanned",
      value: 343521362,
      display: "343.5M",
      context: "Historical quote benchmark source rows",
      tone: "blue"
    },
    {
      id: "filtering-symbol-days",
      label: "Symbol-days filtered",
      value: 2984750,
      display: "2.98M",
      context: "250-day universe run across 11,939 symbols",
      tone: "green"
    },
    {
      id: "analysis-count",
      label: "Backtest analyses",
      value: 1021834,
      display: "1.02M",
      context: "Orchestrated worker output for one large run",
      tone: "amber"
    },
    {
      id: "trade-count",
      label: "Trades simulated",
      value: 20362,
      display: "20,362",
      context: "Persisted trades from sanitized backtest evidence",
      tone: "steel"
    }
  ],
  pnlSeries: [
    { label: "D-29", equity: 100000, drawdown: 0.0 },
    { label: "D-26", equity: 100850, drawdown: -0.4 },
    { label: "D-23", equity: 101420, drawdown: -0.2 },
    { label: "D-20", equity: 100980, drawdown: -0.8 },
    { label: "D-17", equity: 102360, drawdown: -0.1 },
    { label: "D-14", equity: 103250, drawdown: 0.0 },
    { label: "D-11", equity: 102740, drawdown: -0.5 },
    { label: "D-8", equity: 104180, drawdown: -0.1 },
    { label: "D-5", equity: 105620, drawdown: 0.0 },
    { label: "D-2", equity: 105210, drawdown: -0.4 },
    { label: "D-0", equity: 106480, drawdown: 0.0 }
  ],
  strategyCards: [
    {
      name: "Momentum Reversion Demo",
      status: "paper parity",
      pnl: "+6.4%",
      winRate: "58.2%",
      maxDrawdown: "-2.1%",
      trades: 812,
      exposure: "31%"
    },
    {
      name: "Opening Range Demo",
      status: "backtest only",
      pnl: "+3.8%",
      winRate: "54.7%",
      maxDrawdown: "-1.6%",
      trades: 436,
      exposure: "18%"
    },
    {
      name: "Liquidity Pullback Demo",
      status: "candidate review",
      pnl: "+9.1%",
      winRate: "61.0%",
      maxDrawdown: "-3.4%",
      trades: 1094,
      exposure: "42%"
    }
  ],
  pipelines: [
    {
      id: "quote-ingestion",
      title: "Quote Ingestion Benchmark",
      summary: "Compares provider REST retrieval against a heavier flatfile path while preserving contract-level parity checks.",
      stats: [
        { label: "source rows", value: "343.5M" },
        { label: "demo quotes", value: "2.78M" },
        { label: "cohort", value: "95 symbols" },
        { label: "speedup", value: "140.97x" }
      ],
      stages: [
        { label: "Cohort", detail: "Sanitized symbol universe selected from DB state", metric: "95 symbols" },
        { label: "Fetch", detail: "Provider pages streamed through bounded workers", metric: "115 pages" },
        { label: "Normalize", detail: "Quote records shaped into the shared parquet contract", metric: "2.78M rows" },
        { label: "Compare", detail: "REST path measured against flatfile baseline", metric: "6.1s" }
      ]
    },
    {
      id: "filtering",
      title: "Filtering Pipeline",
      summary: "Database-centered candidate generation with large symbol-day coverage and lean persisted artifacts.",
      stats: [
        { label: "source symbols", value: "11,939" },
        { label: "trade days", value: "250" },
        { label: "symbol-days", value: "2.98M" },
        { label: "persisted", value: "23,140" }
      ],
      stages: [
        { label: "Universe", detail: "Daily symbol availability and price context loaded in chunks", metric: "11,939 symbols" },
        { label: "Metrics", detail: "Vectorized quote/bar features computed outside the UI", metric: "8+8 workers" },
        { label: "Screen", detail: "Candidates narrowed before expensive downstream testing", metric: "23,140 rows" },
        { label: "Persist", detail: "Results stored as DB contracts for replayable handoffs", metric: "JSONB boundary" }
      ]
    },
    {
      id: "backtest",
      title: "Backtest Orchestration",
      summary: "Runs strategy/date/symbol workers through a parity-focused execution path shared with live concepts.",
      stats: [
        { label: "workers", value: "9,405" },
        { label: "analyses", value: "1.02M" },
        { label: "trades", value: "20,362" },
        { label: "duration", value: "6,524s" }
      ],
      stages: [
        { label: "Plan", detail: "Partition symbols, dates, and strategy versions", metric: "9,405 workers" },
        { label: "Evaluate", detail: "Shared signal and execution contracts produce analysis rows", metric: "1.02M" },
        { label: "Simulate", detail: "Trade lifecycle modeled without live broker writes", metric: "20,362 trades" },
        { label: "Summarize", detail: "Run-level stats persisted for comparison dashboards", metric: "parity report" }
      ]
    }
  ],
  benchmarks: [
    {
      id: "quote-rest-flatfile",
      title: "REST quote retrieval vs flatfile path",
      baseline: "859.8s",
      optimized: "6.1s",
      speedup: 140.97,
      note: "Kept as a showcase result because the simpler source path materially reduced benchmark time."
    },
    {
      id: "bar-1day-layout",
      title: "1Day parquet layout write/read",
      baseline: "legacy layout",
      optimized: "partitioned layout",
      speedup: 46.38,
      note: "Useful as an architecture tradeoff: excellent full-read behavior, moderate symbol-read gains."
    },
    {
      id: "bar-1min-layout",
      title: "1Min parquet layout write/read",
      baseline: "legacy layout",
      optimized: "partitioned layout",
      speedup: 13.17,
      note: "Good enough to show measured decision-making without pretending every benchmark is a universal win."
    }
  ],
  lifecycle: [
    { label: "Candidate", detail: "Filtering output becomes a reviewable strategy candidate", state: "complete" },
    { label: "Signal", detail: "Entry requirements resolve from stored strategy contracts", state: "complete" },
    { label: "Order", detail: "Execution model creates a simulated order intent", state: "active" },
    { label: "Fill", detail: "Backtest and live paths share lifecycle vocabulary", state: "queued" },
    { label: "Close", detail: "Exit reason and P&L are persisted for replay", state: "queued" }
  ],
  browserRows: [
    { dataset: "quotes", partition: "demo/2026/Q1/ALFA", rows: "412,908", size: "38 MB", freshness: "seeded" },
    { dataset: "bars_1min", partition: "demo/2026/Q1/BRVO", rows: "97,310", size: "11 MB", freshness: "seeded" },
    { dataset: "filtering_metrics", partition: "demo/watchlist/run-0427", rows: "23,140", size: "6 MB", freshness: "seeded" },
    { dataset: "backtest_trades", partition: "demo/batch/parity", rows: "20,362", size: "4 MB", freshness: "seeded" }
  ],
  schemaSamples: [
    {
      table: "demo.pipeline_run",
      purpose: "Run registry and audit boundary",
      fields: ["run_id uuid", "pipeline_code text", "status_code text", "config jsonb", "summary jsonb"]
    },
    {
      table: "demo.filtering_symbol",
      purpose: "Candidate symbol-day output",
      fields: ["run_id uuid", "trade_date date", "symbol text", "score numeric", "metrics jsonb"]
    },
    {
      table: "demo.trade_lifecycle",
      purpose: "Backtest/live vocabulary parity",
      fields: ["trade_id uuid", "strategy_code text", "opened_at timestamptz", "closed_at timestamptz", "state text"]
    }
  ],
  codeSamples: [
    { id: "stored-procedure", title: "Stored procedure style", language: "sql", code: storedProcedureSample },
    { id: "react-contract", title: "React API contract", language: "ts", code: reactContractSample },
    { id: "python-orchestration", title: "Python orchestration pattern", language: "py", code: pythonOrchestrationSample },
    { id: "test-harness", title: "Contract test harness", language: "py", code: testHarnessSample }
  ],
  architecturePrinciples: [
    "Database records are the system contract, not an afterthought.",
    "Backtest and live paths share vocabulary so parity can be explained and audited.",
    "Pipeline stages persist concise summaries instead of exposing proprietary internals.",
    "Benchmarks are shown with tradeoffs, including cases where a measured path is not universally better."
  ]
};
