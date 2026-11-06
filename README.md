# MyDigital Build-a-thon

Landing page for the **MyDigital × KrackedDevs Build-a-thon**: a learn-build-ship hackathon with no winners (everybody wins), 17–19 November 2026 at MITEC, Kuala Lumpur, in conjunction with Smart Nation.

Built with React, TypeScript, Vite and Tailwind CSS v4, styled after [rakyatdigital.gov.my](https://rakyatdigital.gov.my/), with animated backgrounds and text from [React Bits](https://reactbits.dev/).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/data.ts` | Event content: registration link, nav, sessions, syllabus modules, FAQ, logo paths |
| `src/sections/` | One file per page section (Hero, Format, Syllabus, Sessions, Show & Tell, Certificate, FAQ/closing) |
| `src/ui/` | Shared primitives, footer organiser logos, and the sample Certificate of Shipping |
| `src/components/backgrounds/` | React Bits backgrounds: Web Threads, Topography, Sliced Waves, Gradient ASCII |
| `src/components/text/` | React Bits Depth Text (hero title) |
| `public/logos/` | Official MyDIGITAL, KrackedDevs, ILMUchat and ILMUcode logos |
| `public/illustrations/` | Card and Show & Tell illustrations (WebP) |
| `design/` | Source illustrations, alternates and the Gemini generation scripts |

## Notes

- `REGISTER_URL` in `src/data.ts` points to the Builder Hub event page; all Reserve / Register buttons open it in a new tab.
- `React.StrictMode` is intentionally off: the React Bits WebGL backgrounds call `loseContext()` on unmount, and StrictMode's dev double-mount would leave them blank.
- Illustrations were generated with Gemini (`gemini-3-pro-image`). The scripts in `design/` read `GEMINI_API_KEY` from the environment.
