# Weekly inspection demo

16-second silent loop, 1600 × 900, 30 fps. Expands the Braden Road Compost Sock, shows its 128.04 ft quantity and installation specs, adds the supplied photo, types “Installed according to specifications.”, saves the photo, and selects Pass. The green completed state holds before a soft reset.

- weekly-inspection.mp4: website video with broad compatibility.
- weekly-inspection.webm: alternative website video.
- weekly-inspection.gif: looping preview at 960 × 540.
- poster.png: static fallback.
- index.html: preview with pause/play and reduced-motion support.

Preview locally at `/demos/weekly-inspection/index.html`.

```html
<video autoplay muted loop playsinline controls width="1600" height="900"
  style="width:100%;height:auto" poster="/demos/weekly-inspection/poster.png"
  aria-label="Weekly inspection: review the Compost Sock specifications, add a captioned photo, and select Pass">
  <source src="/demos/weekly-inspection/weekly-inspection.webm" type="video/webm">
  <source src="/demos/weekly-inspection/weekly-inspection.mp4" type="video/mp4">
</video>
```

Disable autoplay for reduced-motion visitors, as demonstrated in the preview page. Prepared locally; not deployed or inserted into the homepage.

Source screenshots are composited into a fixed viewport, with animated disclosure, cursor, caption typing, and status transitions. The photo selection/camera step is condensed to the supplied photo preview. Regenerate using scripts/render-weekly-inspection.py with normalized screenshots; see its source for crop dimensions.
