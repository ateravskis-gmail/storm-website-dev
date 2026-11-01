# Mobile Weekly inspection demo

16-second silent loop at 800 × 1100 and 30 fps, composited into an iPhone-style mockup. Touch indicators show expanding the Braden Road Compost Sock, adding the photo, typing “Compost sock is installed in accordance with SWPPP.”, saving, and selecting Pass.

MP4 and WebM are website exports; GIF is a 480 × 660 looping preview. The Inspect it step now uses this version. index.html provides a standalone preview with playback controls and reduced-motion support.

Regenerate with scripts/render-inspection-phone.py and a directory containing collapsed.png (1280×1981), expanded.png (1193×2048), photo.png (1179×2048), caption.png (1172×2048), and pass.png (1182×2048). Requires Pillow, numpy, imageio-ffmpeg. Screenshots are cropped and aligned for the demonstration; the mockup and touch indicators are drawn programmatically.
