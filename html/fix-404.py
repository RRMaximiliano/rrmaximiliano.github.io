# Post-render (see _quarto.yml): GitHub Pages serves docs/404.html at whatever path was
# missing, e.g. /research/old-paper/. Quarto writes the font URLs in html/head.html as
# page-relative ("./fonts/..."), which would then point inside the missing folder;
# make them absolute so the 404 page keeps its fonts at any depth.
from pathlib import Path

page = Path("docs/404.html")
if page.exists():
    html = page.read_text(encoding="utf-8")
    fixed = html.replace("url(./fonts/", "url(/fonts/")
    if fixed != html:
        page.write_text(fixed, encoding="utf-8")
