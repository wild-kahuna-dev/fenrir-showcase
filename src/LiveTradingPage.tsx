const reductionSteps = [
  { label: "Market data catalog", value: "30K", detail: "symbols scanned before open" },
  { label: "Tradable today", value: "329", detail: "active symbols after availability checks" },
  { label: "Live screen", value: "19", detail: "symbols with enough setup quality" },
  { label: "Watchlist", value: "9", detail: "symbols selected for realtime analysis" },
  { label: "Live loops", value: "3", detail: "bots with independent decision state" }
];

const flowSteps = [
  {
    number: "01",
    title: "Prepare the market before open",
    detail: "Scheduled jobs refresh symbols, bars, quotes, market context, and strategy-specific filter inputs before the live session begins."
  },
  {
    number: "02",
    title: "Compress the search space",
    detail: "Database-backed filters reduce thousands of possible symbols into a watchlist small enough for low-latency recomputation."
  },
  {
    number: "03",
    title: "Recompute on fresh bars",
    detail: "The bar manager warms recent history, merges websocket second bars, aligns multiple timeframes, and feeds strategy analysis every cycle."
  },
  {
    number: "04",
    title: "Decide, execute, and contain risk",
    detail: "Each bot evaluates entry/exit gates, max positions, account blockers, cooldowns, sizing, stop loss, take profit, partial exits, and session governors."
  }
];

const botSubscriptions = [
  { bot: "Bot A", focus: "Momentum setup", symbols: "ALFA, BRVO, CYGN" },
  { bot: "Bot B", focus: "Opening range", symbols: "DRFT, ECHO, FUSE" },
  { bot: "Bot C", focus: "Pullback setup", symbols: "GLEN, HEXT, IRIS" }
];

const replayRows = [
  { time: "09:30:00 ET", source: "scheduler", tag: "start", detail: "market-open filtering run claimed; mode=active" },
  { time: "09:31:48 ET", source: "symbol-filter", tag: "reduce", detail: "catalog scan: 30K symbols to 329 tradable candidates" },
  { time: "09:31:53 ET", source: "setup-screen", tag: "reduce", detail: "live setup filter: 329 to 19 symbols in 0.8s" },
  { time: "09:31:54 ET", source: "watchlist", tag: "reduce", detail: "watchlist pass: 19 to 9 selected symbols" },
  { time: "09:32:02 ET", source: "live-control", tag: "bots", detail: "3 independent bots initialized; shared stream manager ready" },
  { time: "09:32:06 ET", source: "bar-manager", tag: "warm", detail: "warm load ALFA, BRVO, CYGN, DRFT, ECHO, FUSE, GLEN, HEXT, IRIS; 250 x 1Min bars" },
  { time: "09:32:08 ET", source: "stream-router", tag: "route", detail: "single websocket subscribed; routing bars by bot-owned symbol maps" },
  { time: "09:32:12 ET", source: "bot-a.analysis", tag: "recalc", detail: "ALFA indicators vectorized; momentum conditions evaluated; action=hold" },
  { time: "09:32:13 ET", source: "bot-b.analysis", tag: "recalc", detail: "DRFT opening-range frame refreshed; setup score=12.40; action=hold" },
  { time: "09:32:14 ET", source: "bot-c.analysis", tag: "recalc", detail: "GLEN pullback conditions evaluated; liquidity gate passed; action=hold" },
  { time: "09:32:16 ET", source: "bot-a.analysis", tag: "signal", detail: "BRVO final=medium_buy strength=24.80 after condition recompute" },
  { time: "09:32:17 ET", source: "bot-b.analysis", tag: "recalc", detail: "ECHO latest bars normalized; range-break condition not confirmed" },
  { time: "09:32:18 ET", source: "bot-c.analysis", tag: "signal", detail: "HEXT final=weak_buy strength=18.10; queued behind stronger candidates" },
  { time: "09:32:19 ET", source: "bot-a.decision", tag: "order", detail: "BRVO action=buy reason=entry_signal qty=demo score=24.80" },
  { time: "09:32:21 ET", source: "bot-b.analysis", tag: "signal", detail: "FUSE final=medium_buy strength=29.35 after range recompute" },
  { time: "09:32:22 ET", source: "bot-c.analysis", tag: "recalc", detail: "IRIS latest bar lowered score; action=hold" },
  { time: "09:32:23 ET", source: "bot-b.decision", tag: "order", detail: "FUSE action=buy reason=ranked_signal qty=demo score=29.35" },
  { time: "09:32:25 ET", source: "risk-loop", tag: "risk", detail: "BRVO position opened; tracking exits, P&L, and broker response" },
  { time: "09:32:26 ET", source: "risk-loop", tag: "risk", detail: "FUSE position opened; stop/take-profit guards armed" },
  { time: "09:32:31 ET", source: "bar-manager", tag: "route", detail: "second-bar update fanout complete for 9 symbols across 3 bot subscription maps" }
];

const scaleStats = [
  { value: "250", label: "recent bars warmed and aligned per selected symbol" },
  { value: "9", label: "symbols routed through one shared stream" },
  { value: "3", label: "bots with isolated candidates, positions, and risk state" }
];

const engineeringNotes = [
  {
    title: "Backtests preprocess; live trading adapts",
    detail: "Historical refinement can precompute reusable feature frames. The live path cannot assume yesterday's surface still applies, so each selected symbol is recalculated from current bars during the session."
  },
  {
    title: "Indicators feed strategy-owned conditions",
    detail: "Each pass normalizes bars, aligns timeframes, vectorizes technical indicators, evaluates strategy-specific conditions, then persists comparable signal and lifecycle vocabulary for audit."
  },
  {
    title: "One stream, many independent decision loops",
    detail: "Provider limits make a shared websocket practical. The shared bar manager handles intake and normalization, while each bot owns its candidate set, subscription map, rankings, positions, pending orders, and exits."
  },
  {
    title: "Risk is part of the decision engine",
    detail: "The bot does more than chase signals: it checks trading windows, pending orders, max open positions, account protections, re-entry cooldowns, profit/loss tiers, drawdown governors, and broker reconciliation."
  }
];

export default function LiveTradingPage() {
  return (
    <section className="live-page" aria-labelledby="live-title">
      <section className="live-section live-landing" aria-label="Live trading landing">
        <div className="landing-copy">
          <span className="section-kicker">Fenrir live execution</span>
          <h2 id="live-title">Realtime market decisions across parallel bot loops.</h2>
          <p>
            st-engine uses a shared market-data websocket to feed multiple independent trading bots. The architecture narrows the market
            before open, routes fresh bars through a shared manager, then lets each bot recompute indicators, score complex strategy
            conditions, rank candidates, manage broker state, and make risk-aware decisions in parallel.
          </p>
          <div className="landing-actions" aria-label="Live trading actions">
            <a href="#live-flow">View the flow</a>
            <a href="#session-replay">Read the session</a>
          </div>
        </div>

        <div className="reduction-visual" aria-label="Symbol reduction and execution flow">
          {reductionSteps.map((step, index) => (
            <article className="reduction-node" key={step.label}>
              <span>{step.label}</span>
              <strong>{step.value}</strong>
              <p>{step.detail}</p>
              {index < reductionSteps.length - 1 && <i aria-hidden="true">&rarr;</i>}
            </article>
          ))}
        </div>
      </section>

      <section className="live-section flow-section" id="live-flow" aria-label="Live trading workflow">
        <div className="section-lead">
          <span className="section-kicker">Realtime path</span>
          <h2>Fast decisions start with ruthless reduction.</h2>
          <p>The live loop is quick because the expensive work happens upstream: broad scans become focused watchlists before websocket-driven recomputation begins.</p>
        </div>
        <div className="flow-ladder">
          {flowSteps.map((step) => (
            <article className="flow-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="live-section replay-section" id="session-replay" aria-label="Sanitized live session replay">
        <div className="section-lead">
          <span className="section-kicker">Sanitized session log</span>
          <h2>Market-open logs show the system thinking in parallel.</h2>
          <p>Sanitized Eastern-time logs show the sequence: scheduled filtering, stream startup, bar warming, per-bot analysis, ranking, order intent, and risk tracking.</p>
        </div>
        <div className="replay-grid">
          <div className="log-panel" aria-label="Static live session log">
            <div className="log-header">
              <span>live-session.demo</span>
              <strong>static ET session sample</strong>
            </div>
            <div className="log-window">
              <div className="log-track">
                {replayRows.map((row) => (
                  <div className={`log-row tag-${row.tag}`} key={`${row.time}-${row.source}-${row.detail}`}>
                    <span>{row.time}</span>
                    <strong>{row.source}</strong>
                    <em>{row.tag}</em>
                    <p>{row.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="scale-panel" aria-label="Live trading scale proof points">
            {scaleStats.map((stat) => (
              <article key={stat.value}>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="live-section socket-section" id="socket-routing" aria-label="Shared stream and bot-owned subscriptions">
        <div className="section-lead">
          <span className="section-kicker">Shared feed, isolated decisions</span>
          <h2>One websocket does the intake; each bot owns the judgment.</h2>
          <p>The hard part is not opening a stream. The hard part is routing one stream into isolated, auditable decision loops without mixing candidates, positions, or risk state.</p>
        </div>
        <div className="socket-diagram">
          <div className="socket-path">
            <div>
              <span>Single websocket</span>
              <strong>Provider stream</strong>
            </div>
            <div>
              <span>Shared bar manager</span>
              <strong>Second-bar normalization</strong>
            </div>
            <div>
              <span>Subscription router</span>
              <strong>Bot-owned symbol map</strong>
            </div>
          </div>
          <div className="subscription-grid">
            {botSubscriptions.map((bot) => (
              <article key={bot.bot}>
                <span>{bot.bot}</span>
                <h3>{bot.focus}</h3>
                <p>{bot.symbols}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="live-section notes-section" aria-label="Engineering notes">
        <div className="section-lead">
          <span className="section-kicker">Engineering notes</span>
          <h2>The technical depth behind the live demo.</h2>
          <p>The page is sanitized, but the implementation shape is real: websocket intake, bar alignment, typed analysis DTOs, database persistence, broker reconciliation, and stateful risk controls.</p>
        </div>
        <div className="engineering-notes">
          {engineeringNotes.map((note) => (
            <article key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
