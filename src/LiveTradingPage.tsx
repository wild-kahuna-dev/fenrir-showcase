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
    title: "Refresh broad market data",
    detail: "Morning jobs download bars, refresh market context, and make sure the day starts with current inputs."
  },
  {
    number: "02",
    title: "Reduce before live trading",
    detail: "Filters compress the day from a broad symbol catalog into a small set worth watching at market open."
  },
  {
    number: "03",
    title: "Recompute from fresh bars",
    detail: "Selected symbols warm recent bars, vectorize indicators, and recalculate strategy-specific conditions every few seconds."
  },
  {
    number: "04",
    title: "Rank, execute, and manage risk",
    detail: "Independent bots rank their own signals, submit demo-safe orders, then track exits, P&L, and risk state."
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
  { value: "250", label: "recent bars vectorized per selected symbol" },
  { value: "9", label: "symbols routed across bot-owned subscriptions" },
  { value: "3", label: "isolated bots recomputing rankings and risk state" }
];

const engineeringNotes = [
  {
    title: "Backtests preprocess; live trading recomputes",
    detail: "Historical refinement benefits from vectorized feature frames that are prepared once and reused across many runs. Live trading is different: fresh bars change the decision surface, so selected symbols are recalculated repeatedly during the session."
  },
  {
    title: "Indicators first, strategy conditions second",
    detail: "Each live pass warms roughly 250 recent bars per selected symbol, normalizes the bar frame, vectorizes technical indicators, then evaluates strategy-owned custom conditions against the latest rows before ranking signals."
  },
  {
    title: "One stream, isolated bot state",
    detail: "The brokerage data provider allows a single websocket connection. A shared bar manager handles intake and normalization, while each bot owns its subscription map, candidate ranking, open-position state, and risk exits."
  },
  {
    title: "Contract parity without identical timing",
    detail: "Backtests and live trading share signal names, decision states, lifecycle events, and risk vocabulary. The computation timing differs, but the persisted language stays comparable enough for audits and refinement feedback."
  }
];

export default function LiveTradingPage() {
  return (
    <section className="live-page" aria-labelledby="live-title">
      <section className="live-section live-landing" aria-label="Live trading landing">
        <div className="landing-copy">
          <span className="section-kicker">Fenrir live execution</span>
          <h2 id="live-title">Narrow the market before realtime decisions.</h2>
          <p>
            Morning jobs refresh broad market context and reduce the candidate set. Once live, independent bots
            recompute indicators from fresh bars, score strategy conditions, and turn ranked signals into orders and exits.
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
          <span className="section-kicker">One clean path</span>
          <h2>Narrowed symbols keep live recomputation small.</h2>
          <p>Heavy historical processing belongs to backtesting. The live path stays fast by reducing the symbol set first.</p>
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
          <h2>Market-open logs show concurrent bot analysis.</h2>
          <p>Static Eastern-time logs show the full flow without rushing the reader or exposing production identifiers.</p>
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
          <h2>One market-data stream serves independent bots.</h2>
          <p>The stream is shared because it has to be. Subscriptions, positions, and risk decisions stay isolated.</p>
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
          <h2>The deeper implementation choices.</h2>
          <p>These are the details that keep the demo honest without exposing strategy logic or private source code.</p>
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
