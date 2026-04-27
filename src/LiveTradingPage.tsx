import fenrirMark from "./assets/fenrir.png";

const sessionFlow = [
  {
    phase: "01",
    title: "Morning scheduler",
    detail: "Downloads fresh bars, refreshes datasets, and opens the day with current market context."
  },
  {
    phase: "02",
    title: "Market-open filtering",
    detail: "Narrows thousands of symbols into bot-owned candidate sets before live analysis begins."
  },
  {
    phase: "03",
    title: "Master orchestrator",
    detail: "Starts independent child bots and keeps lifecycle state visible without centralizing decisions."
  },
  {
    phase: "04",
    title: "Realtime execution",
    detail: "Second bars become signals, signals are ranked, and risk exits are managed continuously."
  }
];

const botLanes = [
  {
    name: "Bot A",
    focus: "Momentum candidates",
    symbols: "ALFA, BRVO, CYGN",
    state: "Analyzing"
  },
  {
    name: "Bot B",
    focus: "Opening range",
    symbols: "DRFT, ECHO, FUSE",
    state: "Ranking"
  },
  {
    name: "Bot C",
    focus: "Liquidity pullbacks",
    symbols: "GLEN, HEXT, IRIS",
    state: "Risk loop"
  }
];

const proofSlides = [
  {
    metric: "1 socket",
    label: "Shared market-data connection",
    detail: "The provider allows one websocket connection, so Fenrir centralizes bar intake and routes subscriptions by bot."
  },
  {
    metric: "3 bots",
    label: "Independent execution state",
    detail: "Each child bot owns candidate ranking, trade intent, open positions, and exits."
  },
  {
    metric: "Seconds",
    label: "Realtime analysis cadence",
    detail: "Fresh second-level bars feed repeated signal checks without rebuilding the research stack."
  },
  {
    metric: "Same contracts",
    label: "Backtest/live parity",
    detail: "Backtests and live trading share signal vocabulary, lifecycle states, and persisted run summaries."
  }
];

const detailPanels = [
  {
    title: "Why a shared websocket manager?",
    body: "The data provider constraint is one connection. Fenrir turns that limit into a clean boundary: one socket ingests second bars, a shared manager normalizes updates, and a subscription router maps symbols back to the bots that requested them."
  },
  {
    title: "Why independent child bots?",
    body: "The master orchestrator starts and observes bots, but each bot owns its strategy context, symbol set, signal ranking, position state, and risk exits. A failure or noisy candidate set stays contained."
  },
  {
    title: "How does research feed live trading?",
    body: "Morning jobs download bars and filtering jobs reduce the universe before market open. The live bots subscribe only to the symbols that survived that preparation, so realtime work stays focused."
  },
  {
    title: "Where does risk management happen?",
    body: "Bots track open positions, unrealized P&L, exit reasons, and brokerage responses continuously. Sell decisions are part of the same runtime loop as entries, not an afterthought."
  }
];

export default function LiveTradingPage() {
  return (
    <section className="live-page" aria-labelledby="live-trading-title">
      <div className="live-hero">
        <div className="live-copy">
          <span className="section-kicker">Live trading orchestration</span>
          <h2 id="live-trading-title">Batch research feeds real-time execution.</h2>
          <p>
            Fenrir turns morning data preparation into focused live trading: the scheduler refreshes bars,
            filtering narrows the universe, and a master orchestrator launches independent bots that trade
            from shared second-bar market data.
          </p>
          <div className="hero-proof">
            <strong>343M+</strong>
            <span>market-data rows processed before realtime decisions stay lean.</span>
          </div>
        </div>

        <div className="identity-panel" aria-label="Fenrir identity mark">
          <img src={fenrirMark} alt="Fenrir mark" />
          <span>One socket. Three bots. Shared bars. Independent execution.</span>
        </div>
      </div>

      <div className="session-flow" aria-label="Live trading workflow">
        {sessionFlow.map((stage) => (
          <article className="session-stage" key={stage.phase}>
            <span>{stage.phase}</span>
            <h3>{stage.title}</h3>
            <p>{stage.detail}</p>
          </article>
        ))}
      </div>

      <div className="live-system-map">
        <div className="map-label">Master trading orchestrator</div>
        <div className="bot-lanes">
          {botLanes.map((bot) => (
            <article className="bot-lane" key={bot.name}>
              <div>
                <h3>{bot.name}</h3>
                <span>{bot.state}</span>
              </div>
              <p>{bot.focus}</p>
              <small>{bot.symbols}</small>
            </article>
          ))}
        </div>

        <div className="socket-strip" aria-label="Shared websocket and bar routing">
          <div className="socket-node primary">
            <span>Single websocket</span>
            <strong>Provider connection</strong>
          </div>
          <div className="socket-node">
            <span>Shared bar manager</span>
            <strong>Second-bar normalization</strong>
          </div>
          <div className="socket-node">
            <span>Subscription router</span>
            <strong>Bot-owned symbol sets</strong>
          </div>
        </div>

        <div className="runtime-row">
          <span>Analyze latest bars</span>
          <span>Generate signals</span>
          <span>Rank opportunities</span>
          <span>Execute and manage exits</span>
        </div>
      </div>

      <div className="proof-carousel" aria-label="Live trading proof points">
        {proofSlides.map((slide) => (
          <article className="proof-slide" key={slide.label}>
            <strong>{slide.metric}</strong>
            <h3>{slide.label}</h3>
            <p>{slide.detail}</p>
          </article>
        ))}
      </div>

      <div className="detail-accordion" aria-label="Live trading design details">
        {detailPanels.map((panel, index) => (
          <details key={panel.title} open={index === 0}>
            <summary>{panel.title}</summary>
            <p>{panel.body}</p>
          </details>
        ))}
      </div>
    </section>
  );
}