# Fenrir Systems Showcase

A standalone, sanitized portfolio demo for explaining Fenrir architecture and scale without exposing the private engine repository.

## What It Shows

- Read-only mock P&L and strategy performance dashboard.
- Data pipeline scale cards from sanitized evidence gathered during the project deep dive.
- Pipeline flow views for quote ingestion, filtering, backtesting, and parquet layout decisions.
- Trade lifecycle, simplified schema samples, and short rewritten code excerpts.

## Redaction Boundary

The app uses fake symbols, generic strategy names, rewritten code samples, and no live execution IDs, credentials, private paths, or proprietary strategy thresholds. The scale numbers are demonstration evidence; the surrounding labels and examples are intentionally sanitized.

## Run Locally

```powershell
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Build

```powershell
npm run build
```

The generated `dist` folder is suitable for static hosting such as GitHub Pages.
