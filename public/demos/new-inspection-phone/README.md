# New inspection report — phone demo

20-second seamless loop, 800 × 1100, 30 fps, silent. iPhone-style device mockup with touch indicators.

Sequence: Storm Business Park → New Inspection Report → Weekly → expand and collapse forecast → add rain gauge photo → type `0.75" of rain in rain gauge` → Save Photo → attached thumbnail.

Files: MP4 (H.264), WebM (VP9), GIF (480 × 660), poster PNG, and standalone HTML preview. Use object-fit: contain in the existing 16:10 feature video area for consistent website sizing.

Rebuild: run `scripts/render-new-inspection-phone.py` with a folder containing normalized source screenshots named projects, report, weekly, forecast, photo, caption, saved, and lower (PNG). Source screenshots are user-provided; the displayed report and weather values are demonstration data from those screenshots.
