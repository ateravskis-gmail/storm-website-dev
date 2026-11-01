# Compost Sock drawing demo

Ten-second silent loop, 1600 × 900 at 30 fps. Select Sediment Controls → Compost Sock, click the start point, extend a blue line as the measurement reaches 128 ft, then double-click to finish in green. The completed line holds before a soft reset.

The map viewport is held fixed and cropped to focus on the drawing action. Interface overlays come from the supplied screenshots; the cursor, growing stroke, and live measurement are animated.

- `compost-drawing.mp4`: compatible website video.
- `compost-drawing.webm`: compact website video.
- `compost-drawing.gif`: animated preview.
- `poster.png`: static fallback.
- `index.html`: preview with play/pause and reduced-motion support.

Preview at `/demos/compost-drawing/index.html` when running the website.

```html
<video autoplay muted loop playsinline controls width="1600" height="900"
  style="width:100%;height:auto" poster="/demos/compost-drawing/poster.png"
  aria-label="Drawing a 128-foot Compost Sock on a construction plan">
  <source src="/demos/compost-drawing/compost-drawing.webm" type="video/webm">
  <source src="/demos/compost-drawing/compost-drawing.mp4" type="video/mp4">
</video>
```

Disable autoplay for visitors who prefer reduced motion, as shown in the preview page. Prepared locally; not deployed or inserted into the homepage.

Regenerate with `scripts/render-compost-drawing.py SOURCE_DIRECTORY`. Supply before.png, menu.png, drawing.png, and after.png at their original resolution. Requires Pillow and imageio-ffmpeg.
