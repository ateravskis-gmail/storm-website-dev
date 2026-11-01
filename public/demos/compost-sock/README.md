# Compost Sock drag-and-drop demo

An eight-second, silent 1600 × 900 loop at 30 fps. The cursor picks up Compost Sock (128.04 ft), drags it into SF-1 Linear Controls, and reveals its populated row beneath Fiber Roll. Its location is “Along Braden Road near #172-#173”; the existing 227.78 ft Compost Sock remains in the Map BMPs tray. The final state holds before a soft reset.

- `compost-sock.webm`: compact website version.
- `compost-sock.mp4`: broadly compatible website version.
- `compost-sock.gif`: looping preview, 960 × 540.
- `poster.png`: static initial frame.
- `index.html`: standalone preview with pause/play and reduced-motion support.

Preview on the local website at `/demos/compost-sock/index.html`.

## Website embed

```html
<video autoplay muted loop playsinline controls
  width="1600" height="900"
  style="width:100%;height:auto"
  poster="/demos/compost-sock/poster.png"
  aria-label="Compost Sock is dragged into SF-1 Linear Controls, adding 128.04 feet and implementation details.">
  <source src="/demos/compost-sock/compost-sock.webm" type="video/webm">
  <source src="/demos/compost-sock/compost-sock.mp4" type="video/mp4">
</video>
```

For reduced-motion visitors, disable autoplay and show the poster until they choose Play, as demonstrated in `index.html`. Use MP4/WebM for the website; the GIF is larger and less crisp. These files are prepared locally and have not been deployed or added to the homepage.

To regenerate, run `scripts/render-compost-demo.py` with the before and after screenshot paths using Python with Pillow and imageio-ffmpeg installed.
