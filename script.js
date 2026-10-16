// Inhalte stehen in daten.js. Hier nur Darstellung und Verhalten.

const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const MATCH_GRACE_MS = 2 * 60 * 60 * 1000;
const SVG_NS = "http://www.w3.org/2000/svg";

const SPONSOR_TIER_ORDER = ["main", "premium", "partner"];
const SPONSOR_TIER_LABELS = {
  main: "Hauptpartner",
  premium: "Premiumpartner",
  partner: "Partner"
};

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector(".sr-only").textContent = open ? "Menü schließen" : "Menü öffnen";
  menu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });
}

function filled(value) {
  return String(value ?? "").trim() !== "";
}

function icon(name) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("viewBox", "0 0 24 24");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", `#i-${name}`);
  svg.append(use);
  return svg;
}

function isLivePermalink(url) {
  return /^https?:\/\//i.test(String(url ?? "").trim());
}

function formatKickoff(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return { long: "", time: "", short: "" };
  }

  const berlin = { timeZone: "Europe/Berlin" };
  const long = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...berlin
  }).format(date);
  const time = new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    ...berlin
  }).format(date);
  const short = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...berlin
  }).format(date);

  return { long, time, short };
}

function setText(node, value) {
  if (node) node.textContent = value;
}

function isUpcomingMatch(match, now = Date.now()) {
  if (!match?.matchConfirmed) return false;
  if (![match.homeTeam, match.awayTeam, match.kickoff, match.venue].every(filled)) return false;
  const kickoff = new Date(match.kickoff).getTime();
  return !Number.isNaN(kickoff) && kickoff + MATCH_GRACE_MS > now;
}

function renderMatchStrip(match) {
  const strip = document.querySelector("[data-match-strip]");
  if (!strip) return;

  const upcoming = isUpcomingMatch(match);
  strip.classList.toggle("has-match", upcoming);
  strip.querySelector("[data-strip-meta]").hidden = !upcoming;

  if (!upcoming) return;

  const kickoff = formatKickoff(match.kickoff);
  setText(strip.querySelector("[data-strip-kicker]"), "Nächstes Spiel");
  setText(strip.querySelector("[data-strip-title]"), `${match.homeTeam} vs ${match.awayTeam}`);
  setText(strip.querySelector("[data-strip-detail]"), `${kickoff.long} · ${kickoff.time} Uhr`);
  setText(strip.querySelector("[data-strip-date]"), `${kickoff.short}, ${kickoff.time} Uhr`);
  setText(strip.querySelector("[data-strip-venue]"), match.venue);
}

function formatNewsDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin"
  }).format(date);
}

function isVisibleSocialPost(post) {
  return Boolean(
    post &&
    post.hidden !== true &&
    filled(post.title) &&
    filled(post.publishedAt) &&
    !Number.isNaN(new Date(post.publishedAt).getTime())
  );
}

function selectSocialPosts(posts) {
  return posts
    .filter(isVisibleSocialPost)
    .sort((a, b) => {
      if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    })
    .slice(0, 3);
}

function previewCaption(text, limit = 140) {
  const caption = String(text ?? "").trim();
  if (caption.length <= limit) return caption;
  const cut = caption.slice(0, limit - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > 72 ? cut.slice(0, space) : cut).trim()}…`;
}

function platformLabel(platform) {
  if (String(platform).toLowerCase() === "instagram") return "Instagram";
  return filled(platform) ? String(platform) : "";
}

function createReelBadge() {
  const badge = document.createElement("span");
  badge.className = "news-reel";
  badge.setAttribute("aria-label", "Reel");
  badge.append(icon("play"));
  return badge;
}

function createPostMedia(post) {
  const media = document.createElement("div");
  media.className = "news-media";

  const fallback = document.createElement("div");
  fallback.className = "news-media-fallback";
  fallback.setAttribute("aria-hidden", "true");
  fallback.innerHTML = '<span class="news-media-bar"></span><span class="news-media-label">Bild folgt</span>';
  media.append(fallback);

  if (filled(post.image)) {
    const image = document.createElement("img");
    image.src = post.image;
    image.alt = "";
    image.width = 960;
    image.height = 540;
    image.loading = "lazy";
    image.addEventListener("load", () => media.classList.add("has-image"));
    image.addEventListener("error", () => {
      media.classList.remove("has-image");
      image.remove();
    });
    media.append(image);
  }

  if (post.type === "reel") media.append(createReelBadge());

  return media;
}

function renderSocialPosts(posts) {
  const section = document.querySelector("[data-news]");
  const grid = document.querySelector("[data-news-grid]");
  if (!section || !grid) return;

  const visible = selectSocialPosts(posts || []);
  const hasInstagram = isLivePermalink(links?.instagram);
  grid.replaceChildren();
  grid.hidden = !visible.length;
  section.hidden = !visible.length && !hasInstagram;
  if (!visible.length) return;

  grid.dataset.count = String(visible.length);

  visible.forEach((post, index) => {
    const isLead = visible.length !== 2 && index === 0;
    const live = isLivePermalink(post.permalink);
    const article = document.createElement("article");
    article.className = isLead ? "news-item news-item--lead" : "news-item";
    article.dataset.postId = post.id || "";

    const link = document.createElement("a");
    link.href = live ? post.permalink : "#aktuelles";
    link.dataset.socialLink = "";
    link.dataset.live = String(live);
    if (live) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    link.append(createPostMedia(post));

    const body = document.createElement("div");
    body.className = "news-body";

    const meta = document.createElement("p");
    meta.className = "news-meta";
    const time = document.createElement("time");
    time.dateTime = post.publishedAt;
    time.textContent = formatNewsDate(post.publishedAt);
    meta.append(time);

    const platform = platformLabel(post.platform);
    if (platform) {
      const label = document.createElement("span");
      label.className = "news-category";
      label.textContent = platform;
      meta.append(label);
    }

    const title = document.createElement("h3");
    title.className = "news-title";
    title.textContent = post.title;
    body.append(meta, title);

    const caption = previewCaption(post.caption);
    if (caption) {
      const excerpt = document.createElement("p");
      excerpt.className = "news-excerpt";
      excerpt.textContent = caption;
      body.append(excerpt);
    }

    link.append(body);
    article.append(link);
    grid.append(article);
  });
}

function initSocialFeed() {
  const grid = document.querySelector("[data-news-grid]");
  grid?.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-social-link]");
    if (link && link.dataset.live !== "true") event.preventDefault();
  });
  renderSocialPosts(socialPosts);
}

// Alle Instagram-Links der Seite (Aktuelles, Kontakt, Footer) kommen aus links.instagram.
function renderInstagramLinks() {
  const live = isLivePermalink(links?.instagram);
  const handle = filled(links?.instagramHandle) ? links.instagramHandle.trim() : "Instagram";

  document.querySelectorAll("[data-instagram]").forEach((link) => {
    link.hidden = !live;
    const item = link.closest("li");
    if (item) item.hidden = !live;
    if (!live) return;
    link.href = links.instagram.trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.querySelectorAll("[data-instagram-handle]").forEach((node) => setText(node, handle));
  });
}

function selectActiveTeams(items) {
  return items
    .filter((team) => team?.active === true && filled(team.name) && filled(team.id))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function sharedTeamPhoto(visible) {
  const images = [...new Set(visible.map((team) => team.image).filter(filled))];
  if (images.length === 1) return images[0];
  if (images.length > 1) return "";
  return teamPhoto;
}

function sharedDetailsHref(visible) {
  const urls = [...new Set(visible.map((team) => team.detailsHref).filter(isLivePermalink))];
  return urls.length === 1 ? urls[0] : "";
}

function trainingLines(times) {
  if (!Array.isArray(times)) return [];
  return times.map((entry) => {
    if (typeof entry === "string") return entry.trim();
    return [entry?.weekday, entry?.day, entry?.time, entry?.note]
      .filter(filled)
      .join(" · ");
  }).filter(filled);
}

function appendFact(list, label, value) {
  const isNode = value instanceof Node;
  const isList = Array.isArray(value) && value.length > 0;
  if (!isNode && !isList && !filled(value)) return;

  const row = document.createElement("div");
  row.className = "team-fact";
  const term = document.createElement("dt");
  term.textContent = label;
  const detail = document.createElement("dd");

  if (isList) {
    const items = document.createElement("ul");
    value.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      items.append(item);
    });
    detail.append(items);
  } else if (isNode) {
    detail.append(value);
  } else {
    detail.textContent = value;
  }

  row.append(term, detail);
  list.append(row);
}

function phoneHref(value) {
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

function contactNode(contact) {
  if (!filled(contact)) return null;
  const value = contact.trim();
  const link = document.createElement("a");
  if (value.includes("@")) {
    link.href = `mailto:${value}`;
    link.textContent = value;
    return link;
  }
  if (/^\+?[\d\s/()-]{6,}$/.test(value)) {
    link.href = phoneHref(value);
    link.textContent = value;
    return link;
  }
  return value;
}

function createFupaLink(href) {
  const fupa = document.createElement("a");
  fupa.className = "team-fupa";
  fupa.href = href;
  fupa.target = "_blank";
  fupa.rel = "noopener noreferrer";
  fupa.textContent = "Kader auf FuPa";
  fupa.append(icon("arrow-up-right"));
  return fupa;
}

function createTeamEntry(team, sharedHref) {
  const entry = document.createElement("article");
  entry.className = "team-entry";
  entry.dataset.teamId = team.id;

  const title = document.createElement("h3");
  title.textContent = team.name;
  entry.append(title);

  if (filled(team.league)) {
    const league = document.createElement("p");
    league.className = "team-league";
    league.textContent = team.league;
    entry.append(league);
  }

  const facts = document.createElement("dl");
  facts.className = "team-facts";
  appendFact(facts, "Trainer", team.coachName);
  appendFact(facts, "Kontakt", contactNode(team.coachContact));
  appendFact(facts, "Training", trainingLines(team.trainingTimes));
  appendFact(facts, "Trainingsort", team.trainingVenue);
  if (facts.children.length) entry.append(facts);

  if (filled(team.description)) {
    const description = document.createElement("p");
    description.className = "team-desc";
    description.textContent = team.description;
    entry.append(description);
  }

  if (!sharedHref && isLivePermalink(team.detailsHref)) {
    entry.append(createFupaLink(team.detailsHref));
  }

  return entry;
}

function renderTeams(items) {
  const section = document.querySelector("[data-teams]");
  const layout = document.querySelector("[data-teams-layout]");
  if (!section || !layout) return;

  const visible = selectActiveTeams(items);
  layout.replaceChildren();

  if (!visible.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  const photo = sharedTeamPhoto(visible);
  const sharedHref = sharedDetailsHref(visible);

  if (filled(photo)) {
    const media = document.createElement("div");
    media.className = "teams-media";
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    image.width = 1920;
    image.height = 1079;
    image.loading = "lazy";
    image.decoding = "async";
    media.append(image);
    layout.append(media);
  }

  const roster = document.createElement("div");
  roster.className = "teams-roster";
  roster.dataset.count = String(visible.length);
  visible.forEach((team) => roster.append(createTeamEntry(team, sharedHref)));

  const overlay = document.createElement("div");
  overlay.className = "teams-overlay";
  overlay.append(roster);

  if (sharedHref) {
    const cta = document.createElement("div");
    cta.className = "teams-cta";
    cta.append(createFupaLink(sharedHref));
    overlay.append(cta);
  }

  layout.append(overlay);
}

function renderClub(data) {
  const section = document.querySelector("[data-club]");
  const inner = document.querySelector("[data-club-inner]");
  if (!section || !inner) return;

  const paragraphs = (data?.paragraphs || []).map((text) => String(text).trim()).filter(filled);
  const facts = (data?.facts || []).filter((fact) => filled(fact?.label) && filled(fact?.value));
  const heading = filled(data?.heading) ? data.heading.trim() : "";
  inner.replaceChildren();

  if (!heading && !paragraphs.length && !facts.length && !filled(data?.year)) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  const layout = document.createElement("div");
  layout.className = "club-layout";

  const copy = document.createElement("div");
  copy.className = "club-copy";

  if (filled(data.eyebrow)) {
    const kicker = document.createElement("p");
    kicker.className = "club-kicker";
    kicker.textContent = data.eyebrow;
    copy.append(kicker);
  }

  if (heading) {
    const title = document.createElement("h2");
    title.id = "club-title";
    const lines = (data.headingLines || []).map((line) => String(line).trim()).filter(filled);
    if (lines.length) {
      lines.forEach((line) => {
        const span = document.createElement("span");
        span.textContent = line;
        title.append(span);
      });
    } else {
      title.textContent = heading;
    }
    copy.append(title);
  }

  paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.className = "club-text";
    paragraph.textContent = text;
    copy.append(paragraph);
  });

  if (copy.childNodes.length) layout.append(copy);

  if (filled(data.year) || filled(data.logo)) {
    const mark = document.createElement("div");
    mark.className = "club-mark";
    mark.setAttribute("aria-hidden", "true");

    if (filled(data.logo)) {
      const logo = document.createElement("img");
      logo.className = "club-logo";
      logo.src = data.logo;
      logo.alt = "";
      logo.width = 88;
      logo.height = 88;
      mark.append(logo);
    }

    if (filled(data.year)) {
      const year = document.createElement("p");
      year.className = "club-year";
      year.textContent = data.year;
      mark.append(year);
    }

    layout.append(mark);
  }

  if (facts.length) {
    const list = document.createElement("ul");
    list.className = "club-facts";
    facts.forEach((fact) => {
      const item = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = fact.label;
      item.append(label, ` · ${fact.value}`);
      list.append(item);
    });
    layout.append(list);
  }

  inner.append(layout);
}

function normalizeSponsorTier(tier) {
  const value = String(tier ?? "").trim().toLowerCase();
  return SPONSOR_TIER_ORDER.includes(value) ? value : "partner";
}

function createSponsorName(name) {
  const label = document.createElement("span");
  label.className = "sponsor-name";
  label.textContent = name;
  return label;
}

function createSponsorSlot(sponsor) {
  const frame = document.createElement("span");
  frame.className = "sponsor-frame";

  if (filled(sponsor.logo)) {
    const image = document.createElement("img");
    image.src = sponsor.logo;
    image.alt = sponsor.name;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.remove();
      if (!frame.querySelector(".sponsor-name")) frame.append(createSponsorName(sponsor.name));
    });
    frame.append(image);
  } else {
    frame.append(createSponsorName(sponsor.name));
  }

  if (!filled(sponsor.href)) {
    const slot = document.createElement("div");
    slot.className = "sponsor-slot";
    slot.append(frame);
    return slot;
  }

  const link = document.createElement("a");
  link.className = "sponsor-slot";
  link.href = sponsor.href.trim();
  if (isLivePermalink(sponsor.href)) {
    link.target = "_blank";
    link.rel = "noopener";
  }
  link.append(frame);
  return link;
}

// Ohne Partner bleibt die Section sichtbar und wirbt nur für eine Partnerschaft.
function renderSponsors(items) {
  const section = document.querySelector("[data-sponsors]");
  const board = document.querySelector("[data-sponsors-board]");
  if (!section || !board) return;

  const visible = (items || []).filter((item) => (
    item?.active === true && filled(item.id) && filled(item.name)
  ));

  board.replaceChildren();
  board.hidden = !visible.length;
  section.classList.toggle("is-empty", !visible.length);
  section.querySelectorAll("[data-sponsors-filled]").forEach((node) => { node.hidden = !visible.length; });
  section.querySelectorAll("[data-sponsors-empty]").forEach((node) => { node.hidden = Boolean(visible.length); });

  if (!visible.length) return;

  const grouped = { main: [], premium: [], partner: [] };
  visible.forEach((item) => grouped[normalizeSponsorTier(item.tier)].push(item));

  SPONSOR_TIER_ORDER.forEach((tier) => {
    const entries = grouped[tier].sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    if (!entries.length) return;

    const group = document.createElement("div");
    group.className = `sponsor-tier sponsor-tier--${tier}`;
    group.dataset.count = String(entries.length);
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", SPONSOR_TIER_LABELS[tier]);
    entries.forEach((item) => group.append(createSponsorSlot(item)));
    board.append(group);
  });
}

function createContactLine(kind, value) {
  const link = document.createElement("a");
  link.className = "join-line";
  link.href = kind === "mail" ? `mailto:${value}` : phoneHref(value);
  link.append(icon(kind));
  const text = document.createElement("span");
  text.textContent = value;
  link.append(text);
  return link;
}

function renderContacts(items, place) {
  const list = document.querySelector("[data-contacts]");
  if (!list) return;
  list.replaceChildren();

  (items || []).filter((item) => filled(item?.topic)).forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "join-contact";

    const topic = document.createElement("h3");
    topic.textContent = item.topic.trim();
    entry.append(topic);

    const known = [item.name, item.phone, item.email].some(filled);
    if (!known) {
      const pending = document.createElement("p");
      pending.className = "join-pending";
      pending.textContent = "Ansprechpartner folgt";
      entry.append(pending);
    }

    if (filled(item.name)) {
      const name = document.createElement("p");
      name.className = "join-name";
      name.textContent = item.name.trim();
      entry.append(name);
    }
    if (filled(item.phone)) entry.append(createContactLine("phone", item.phone.trim()));
    if (filled(item.email)) entry.append(createContactLine("mail", item.email.trim()));

    list.append(entry);
  });

  const lines = [place?.name, place?.street, place?.city].filter(filled).map((line) => line.trim());
  if (lines.length) {
    const entry = document.createElement("div");
    entry.className = "join-contact";
    const topic = document.createElement("h3");
    topic.textContent = "Sportplatz";
    const address = document.createElement("address");
    address.className = "join-address";
    lines.forEach((line, index) => {
      if (index) address.append(document.createElement("br"));
      address.append(line);
    });
    entry.append(topic, address);

    const query = encodeURIComponent(lines.join(", "));
    const route = document.createElement("a");
    route.className = "join-line";
    route.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    route.target = "_blank";
    route.rel = "noopener noreferrer";
    route.append(icon("pin"));
    const label = document.createElement("span");
    label.textContent = "Route planen";
    route.append(label);
    entry.append(route);

    list.append(entry);
  }
}

// Navigationslinks auf ausgeblendete Bereiche ebenfalls ausblenden.
function syncNavigation() {
  document.querySelectorAll("nav a[href*='#']").forEach((link) => {
    const id = link.getAttribute("href").split("#")[1];
    const target = id ? document.getElementById(id) : null;
    if (target) link.hidden = target.hidden;
  });
}

renderMatchStrip(nextMatch);
initSocialFeed();
renderInstagramLinks();
renderTeams(teams);
renderClub(club);
renderSponsors(sponsors);
renderContacts(contacts, venue);
syncNavigation();

if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target && !target.hidden) target.scrollIntoView();
}
