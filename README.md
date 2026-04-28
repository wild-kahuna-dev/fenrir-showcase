# Fenrir Systems Showcase

A standalone, sanitized portfolio demo for explaining Fenrir architecture and scale without exposing the private engine repository.

## What It Shows

- Live trading orchestration with a shared market-data stream and independent bot state.
- Pipeline views for ingestion, filtering, vectorized backtesting, and live analysis jobs.
- Architecture views for database-centered contracts, parity, observability, and project memory.
- Sanitized code patterns that show reuse and scalability without exposing cloneable internals.

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

The generated `dist` folder is the deployable static site.

## GitHub Pages

Do not publish the repository root as a static Pages source. The source `index.html` is a Vite entrypoint that loads `/src/main.tsx`, which GitHub Pages cannot serve as a browser module.

Use the included GitHub Actions workflow instead:

1. In GitHub, set Pages source to **GitHub Actions**.
2. Push to `main` or run **Deploy Fenrir Showcase** manually.
3. The workflow builds the Vite app and deploys `dist` with the correct JavaScript/CSS assets, favicon, custom domain, and `.nojekyll` marker.
