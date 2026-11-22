const pageRoot = "https://dannyhsuc10.github.io/";
const sourceRoot = "https://github.com/DannyHsuC10/";
const toolUrl = (tool) => tool.url || (tool.repository ? pageRoot + tool.repository + "/" : "");

const iconPaths = {
  design: '<path d="M3 20 20 3v17H3Zm7-3h7v-7m-3-1 2 2m-6 2 2 2"/>',
  model: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm-8 4.5 8 4.5 8-4.5M12 12v9"/>',
  simulate: '<path d="M2 13h4l3-7 5 13 3-7h5"/>',
  optimize: '<path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 3v6m8 0v6m-6 0v6" stroke-width="2.5"/>',
  validate: '<path d="M12 3 4 6v5c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function link(text, url, className, label) {
  const node = element("a", className, text);
  node.href = url;
  if (label) node.setAttribute("aria-label", label);
  return node;
}

function renderWorkflow() {
  const toolsById = new Map(toolCatalog.map((tool) => [tool.id, tool]));
  const workflow = document.querySelector("#workflow-grid");

  for (const stage of workflowStages) {
    const node = element("li", "stage");
    const header = element("div", "stage-header");
    const icon = element("span", "stage-icon");
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + iconPaths[stage.icon] + '</svg>';
    header.append(icon, element("h3", "", stage.title));

    const links = element("div", "stage-links");
    for (const [id, label] of stage.tools) {
      const tool = toolsById.get(id);
      if (tool && toolUrl(tool)) links.append(link(label || tool.title, toolUrl(tool)));
    }
    node.append(header, links);
    workflow.append(node);
  }
}

function createPreview(tool) {
  if (tool.image) {
    const image = element("img", "tool-preview tool-image");
    image.src = tool.image;
    image.alt = tool.imageAlt || "";
    image.loading = "lazy";
    image.width = 660;
    image.height = 240;
    return image;
  }

  const canvas = element("canvas", "tool-preview");
  canvas.width = 660;
  canvas.height = 240;
  canvas.setAttribute("aria-hidden", "true");
  drawToolPreview(canvas, tool.preview);
  return canvas;
}

function createCard(tool) {
  const card = element("article", "tool-card");
  const content = element("div", "card-content");
  const meta = element("div", "card-meta");
  const status = element("span", "status", tool.status);
  status.dataset.status = tool.status;
  meta.append(element("span", "category", tool.category), status);

  const keywords = element("ul", "keywords");
  keywords.setAttribute("aria-label", "Keywords");
  for (const keyword of tool.keywords) keywords.append(element("li", "", keyword));

  const actions = element("div", "card-actions");
  const url = toolUrl(tool);
  if (url) {
    const action = tool.action || "Open tool";
    actions.append(link(action, url, "button button-primary", action + " " + tool.title));
  }
  if (tool.repository) {
    actions.append(link("GitHub", sourceRoot + tool.repository, "button button-secondary", tool.title + " on GitHub"));
  }
  if (!actions.childElementCount) actions.append(element("span", "result-count", "Page unavailable"));

  content.append(meta, element("h3", "", tool.title), element("p", "", tool.description), keywords, actions);
  card.append(createPreview(tool), content);
  return card;
}

function prepareLibrary() {
  const search = document.querySelector("#search");
  const category = document.querySelector("#category");
  const status = document.querySelector("#status");
  const filters = document.querySelector("#filters");
  const count = document.querySelector("#result-count");
  const emptyState = document.querySelector("#empty-state");
  const grid = document.querySelector("#tool-grid");

  for (const value of [...new Set(toolCatalog.map((tool) => tool.category))].sort()) {
    category.add(new Option(value, value));
  }
  for (const value of ["Released", "In Development", "Planned"]) {
    status.add(new Option(value, value));
  }

  const entries = toolCatalog.map((tool) => ({
    tool,
    card: createCard(tool),
    searchText: [tool.title, tool.description, tool.category, tool.status, tool.repository, ...tool.keywords]
      .join(" ").toLowerCase(),
  }));
  grid.append(...entries.map(({card}) => card));

  function filterTools() {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const {tool, card, searchText} of entries) {
      const matches = (!category.value || category.value === tool.category)
        && (!status.value || status.value === tool.status)
        && terms.every((term) => searchText.includes(term));
      card.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = visible === entries.length
      ? visible + (visible === 1 ? " tool" : " tools")
      : visible + " of " + entries.length + " tools";
    emptyState.hidden = visible > 0;
  }

  filters.addEventListener("submit", (event) => event.preventDefault());
  filters.addEventListener("input", filterTools);
  document.querySelector("#clear-filters").addEventListener("click", () => {
    filters.reset();
    filterTools();
    search.focus();
  });
  filterTools();
}

drawFormulaCar(document.querySelector("#hero-drawing"));
renderWorkflow();
prepareLibrary();
