# Go Links

This folder contains redirect pages for creating short "go links" - a common pattern for internal short URLs.

## Current Go Links

- `/go/meet/` → Notion calendar booking page

## Adding a New Go Link

1. Create a new folder with your desired short name (e.g., `cv`, `linkedin`, etc.)
2. Copy the `_template.html` file to the new folder as `index.html`
3. Replace `TARGET_URL_HERE` with your destination URL
4. Run `quarto render` to update the site

## Example

To create `rrmaximiliano.github.io/go/cv/`:

```bash
mkdir go/cv
cp go/_template.html go/cv/index.html
# Edit go/cv/index.html to replace TARGET_URL_HERE with your CV URL
quarto render
```

## Usage

- Local: `http://localhost:5555/go/meet/`
- Production: `https://rrmaximiliano.github.io/go/meet/`

Note: These work with your existing GitHub Pages setup and don't require any additional configuration.
