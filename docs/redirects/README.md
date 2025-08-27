# Redirects

This folder contains redirect pages for creating short URLs.

## Current Redirects

- `/redirects/meet/` → Notion calendar booking page

## Adding a New Redirect

1. Create a new folder with your desired short name (e.g., `cv`, `linkedin`, etc.)
2. Copy the `_template.html` file to the new folder as `index.html`
3. Replace `TARGET_URL_HERE` with your destination URL
4. Run `quarto render` to update the site

## Example

To create `rrmaximiliano.github.io/redirects/cv/`:

```bash
mkdir redirects/cv
cp redirects/_template.html redirects/cv/index.html
# Edit redirects/cv/index.html to replace TARGET_URL_HERE with your CV URL
quarto render
```

## Usage

- Local: `http://localhost:5555/redirects/meet/`
- Production: `https://rrmaximiliano.github.io/redirects/meet/`

Note: These work with your existing GitHub Pages setup and don't require any additional configuration.
