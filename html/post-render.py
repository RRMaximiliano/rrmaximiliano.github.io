# Post-render (see _quarto.yml). Runs after every render, on the files in docs/.
from pathlib import Path

DOCS = Path("docs")

# 1. GitHub Pages serves docs/404.html at whatever path was missing, e.g. /research/old-paper/.
#    Quarto writes the font URLs in html/head.html as page-relative ("./fonts/..."), which would
#    then point inside the missing folder; make them absolute so the 404 page keeps its fonts.
page = DOCS / "404.html"
if page.exists():
    html = page.read_text(encoding="utf-8")
    fixed = html.replace("url(./fonts/", "url(/fonts/")
    if fixed != html:
        page.write_text(fixed, encoding="utf-8")

# 2. A note at the very top of every page's source, for anyone who views it.
NOTE = """<!--
  Hi! You're reading the source.
  The repo is public: https://github.com/RRMaximiliano/rrmaximiliano.github.io
  So are my Stata ados: https://github.com/RRMaximiliano
-->
"""
for f in DOCS.rglob("*.html"):
    if f.parts[1] in ("go", "site_libs", "files"):   # redirects and library files: leave alone
        continue
    html = f.read_text(encoding="utf-8")
    if "Hi! You're reading the source." in html[:400]:
        continue
    lower = html[:200].lower()
    if lower.startswith("<!doctype html>"):
        end = len("<!doctype html>")
        html = html[:end] + "\n" + NOTE + html[end:].lstrip("\n")
        f.write_text(html, encoding="utf-8")
