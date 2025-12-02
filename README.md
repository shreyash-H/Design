# Ayurveda 3D Portfolio — Deploy Ready

This project is a Vite + React app showcasing a 3D-enabled portfolio for an Ayurvedic practitioner.
It includes a react-three-fiber scene, interactive hotspots, GLTF-safe loading with fallbacks, and a responsive HTML overlay.

## What's included
- `src/components/Ayurveda3DPortfolio3D.jsx` — Complete single-file 3D component (scene + hotspots + UI).
- `src/App.jsx`, `src/main.jsx`, `src/index.css` — App bootstrap and minimal styling.
- `public/models/README.txt` — Where to place GLB/GLTF icon models (optional).
- `package.json` — Dependencies and scripts (dev/build/preview).

## Prepare models (optional but recommended)
Place optimized GLB/GLTF icon files in `public/models/`:
- `public/models/leaf.glb`
- `public/models/mortar.glb`
- `public/models/calendar.glb`

If you do not add models, the app will use procedural fallback icons bundled in the code.

## Local development
1. Unzip the project.
2. `cd ayurveda-3d-portfolio`
3. `npm install`
4. `npm run dev`
5. Open the local URL printed by Vite (e.g. `http://localhost:5173`)

## Build for production
1. `npm run build`
2. The production-ready files will appear in the `dist/` folder. Serve them with any static host.

## Deploy to Vercel (recommended)
1. Create a Vercel account and install Vercel CLI or use the web UI.
2. Import the project from GitHub (or drag & drop the project files).
3. Build command: `npm run build`
4. Output directory: `dist`
Vercel will auto-detect and deploy from the `dist` folder. No environment variables are required.

## Deploy to Netlify
1. Create a Netlify account.
2. Drag & drop the `dist/` folder in **Sites > New site from drag & drop**, OR connect a Git repo.
3. If connecting Git, set Build command: `npm run build`, Publish directory: `dist`.

## Notes & recommendations
- Keep GLB models small (< 300 KB) and compressed (draco) for faster loads. If you use a CDN, ensure proper CORS headers.
- For better performance, replace `Sparkles` or reduce particle count on mobile.
- Consider adding an ErrorBoundary + Suspense placeholder for each model (already present) and a lazy-loading strategy for non-critical assets.
- Tailwind: the demo uses minimal CSS for quick preview. If you want Tailwind, I can provide `tailwind.config.js` and setup instructions.

## Need help?
I can:
- Create a GitHub repo and push the code as a ready repo (you'll just need to provide a GitHub token or I can give instructions).
- Prepare a CodeSandbox project for a live URL.
- Add polished GLB icons and optimized thumbnails for the detail cards.

Enjoy — let me know which of the optional items you'd like me to do next!
