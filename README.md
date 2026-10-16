# Voltline Power demo site (placeholder company)

Open `index.html` directly, or run `python3 -m http.server` here and visit http://localhost:8000.
No build step or dependencies. Fonts load from Google Fonts with a system fallback.

## Where to edit things
| What | File |
|---|---|
| Company name, nav labels, video paths | `js/config.js` |
| Email, WhatsApp number, phone, address, WhatsApp message, email subject | `js/data.js` -> `contact` |
| Products, industries, projects, lifecycle stages, FAQ | `js/data.js` |
| Colours, spacing, motion | `css/styles.css` (tokens at top) |
| One component per section | `js/components/` |

## Images (none are bundled)
Every image slot shows a labelled placeholder naming the file it expects, e.g.
`assets/images/products/power-transformers.jpg`. To use a real photo, add the file and set that item's
`image` in `js/data.js` (e.g. `image: 'assets/images/products/power-transformers.jpg'`). Use only photos you
own or are licensed to use. If a file fails to load, the placeholder reappears.

## Transformer video
- Original (untouched): `source/original-gemini_generated_video_565394af.mp4`
- Used by the site: `assets/videos/transformer-animation.mp4`, a lossless copy of the original video stream
  (decoded frames are identical; audio removed; metadata moved to the front for fast start).
- The file is H.264 with **no alpha channel**, so it is not transparent. The page background (`--paper: #FCFCFC`)
  is matched to the clip's own near-white background so no frame or container is needed.
  A faint edge of 1-2 levels out of 255 may be visible on some displays.
- Both placements use one component and one file. No controls, no play/pause UI. Plays muted, looping,
  inline, only while on screen. With "reduce motion" enabled it shows the still poster frame instead.
- For true transparency you would need an alpha-capable source (e.g. WebM VP9 with alpha plus an HEVC-alpha
  MOV for Safari) rendered from the original 3D/animation project, not derived from this MP4.

## Contact form
Front-end validation only. There is no backend, so nothing is sent. After a valid submit the form says so and
offers an "open in your email app" link with the details prefilled. To send for real, post the form values to a
service such as Formspree, EmailJS or your own endpoint inside `initContact()` in `js/components/contact.js`.
- For true transparency you would need an alpha-capable source (e.g. WebM VP9 with alpha plus an HEVC-alpha
  MOV for Safari) rendered from the original 3D/animation project, not derived from this MP4.

## Contact form
Front-end validation only. There is no backend, so nothing is sent. After a valid submit the form says so and
offers an "open in your email app" link with the details prefilled. To send for real, post the form values to a
service such as Formspree, EmailJS or your own endpoint inside `initContact()` in `js/components/contact.js`.
