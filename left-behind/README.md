# Left Behind — NASA's lost machines on the Moon & Mars

Scroll-driven 3D storytelling site: **React 18 + Vite + Three.js + @react-three/fiber + drei**.

Features: labelled maria, craters and landing sites (IAU names), 3D spacecraft models, rim-lit atmospheres, bump-mapped terrain, cinematic camera fly-through, hover popups + click-to-jump on every beacon, procedural ambient
soundtrack (Web Audio, toggle top-right), real planet maps with automatic fallback, keyboard navigation.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in /dist
```

## Host on GitHub Pages (free)
1. Create a new GitHub repo and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push again (or run the workflow from the **Actions** tab). The included workflow
   (`.github/workflows/deploy.yml`) builds and publishes the site.
4. Your site appears at `https://<your-username>.github.io/<repo-name>/`.

`vite.config.js` uses `base: './'`, so it works on project URLs with no extra setup.
(Netlify, Vercel and Cloudflare Pages also work: build command `npm run build`, output `dist`.)

## Customize
- Story + planet layout: `src/data/chapters.js`
- Planet maps: drop `moon.jpg` / `mars.jpg` (2:1 equirectangular) into `src/assets/textures/`. See `CREDITS.md`.
- Look & feel: `src/styles.css`
- Sound: `src/utils/ambient.js`

## Structure
`components/` Scene, Planet, Marker (hover/click), CameraRig, Hud, Chapter · `hooks/useActiveChapter.js` · `utils/` textures, ambient, scroll
