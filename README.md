# FSAE Design Platform

An English directory of Formula SAE engineering tools, organized by engineering workflow and tool category. The site runs on GitHub Pages with plain HTML, CSS, and JavaScript.

## Preview locally

Open `index.html` directly, or serve the repository root:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000/`.

## Add or update a tool

1. Edit `toolCatalog` in `catalog.js`. Give the tool a unique `id`, title, description, category, keywords, and a status of `Released`, `In Development`, or `Planned`.
2. Use the GitHub repository name as `repository` to generate the public Pages and repository links. Set `url` to override the Pages URL, or omit both fields while a project has no public page.
3. Choose an existing `preview` drawing, or add a local image and set `image` to its relative path and `imageAlt` to a short description. The built-in drawings illustrate each tool's function.
4. Optionally add the tool's ID and link label to one or more stages in `workflowStages`.

Keep data compatibility notes tied to a known import or export format. For example, Track Data Tools exports track CSV for LapSimLab. Suspension Statics also imports version 1 Kinematics project JSON. Consult the linked tools for their supported formats and coordinate conventions.

## Deploy

The existing GitHub Actions workflow, `.github/workflows/static.yml`, deploys the repository root to GitHub Pages on pushes to `main`. The Pages source should be **GitHub Actions**.
