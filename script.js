const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const hero = document.querySelector("[data-hero]");
const heroViewport = document.querySelector("[data-hero-viewport]");
const heroPager = document.querySelector("[data-hero-pager]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const HERO_INTERVAL = 7000;
const TKSV_CREST = "assets/logo/logo.png";
const OPPONENT_CREST_PLACEHOLDER = "assets/logo/opponent-placeholder.svg";

// Später durch Admin-Daten ersetzen.
const nextMatch = {
  matchConfirmed: true,
  homeTeam: "TKSV Giengen",
  awayTeam: "Gegner folgt",
  kickoff: "2026-09-20T15:00:00+02:00",
  venue: "Spielort folgt",
  isHome: true,
  competition: "Kreisliga B4",
  homeCrest: "",
  awayCrest: "",
  note: "",
  ctaHref: "#spiele"
};

// Später durch Admin-Daten ersetzen.
const TEAM_PHOTO = "assets/hero1.png";
const teams = [
  {
    id: "aktive",
    name: "Aktive",
    shortName: "Aktive",
    category: "Herren",
    league: "Kreisliga B4",
    image: "",
    description: "",
    coachName: "",
    coachContact: "",
    trainingTimes: [],
    trainingVenue: "",
    detailsHref: "https://www.fupa.net/club/tksv-giengen",
    active: true,
    order: 1
  },
  {
    id: "reserve",
    name: "Reserve",
    shortName: "Reserve",
    category: "Herren",
    league: "Kreisliga B4 Reserve",
    image: "",
    description: "",
    coachName: "",
    coachContact: "",
    trainingTimes: [],
    trainingVenue: "",
    detailsHref: "https://www.fupa.net/club/tksv-giengen",
    active: true,
    order: 2
  }
];
// Später durch Admin-Daten ersetzen. Weitere Eckdaten in `facts` ergänzen.
const club = {
  eyebrow: "TKSV Giengen",
  heading: "Seit 1986 in Giengen",
  headingLines: ["Seit 1986", "in Giengen"],
  year: "1986",
  paragraphs: [
    "Seit 1986 gehört der TKSV zum Fußball in Giengen. Auf und neben dem Platz wird der Verein von Spielern, Verantwortlichen und Unterstützern getragen.",
    "Sportlicher Ehrgeiz, Zusammenhalt und ein aktives Vereinsleben bestimmen unseren gemeinsamen Weg."
  ],
  facts: [
    { label: "Gegründet", value: "1986" },
    { label: "Heimat", value: "Giengen" },
    { label: "Vereinsfarben", value: "Rot / Weiß" }
  ],
  logo: ""
};

const SPONSOR_TIER_ORDER = ["main", "premium", "partner"];
const SPONSOR_TIER_LABELS = {
  main: "Hauptpartner",
  premium: "Premiumpartner",
  partner: "Partner"
};

// Layout-Platzhalter. Durch echte Partner ersetzen; ein leeres Array blendet die Section aus.
const sponsors = [
  {
    id: "placeholder-main",
    name: "Hauptpartner folgt",
    logo: "",
    href: "",
    tier: "main",
    active: true,
    order: 1
  },
  {
    id: "placeholder-premium-1",
    name: "Premiumpartner folgt",
    logo: "",
    href: "",
    tier: "premium",
    active: true,
    order: 1
  },
  {
    id: "placeholder-premium-2",
    name: "Premiumpartner folgt",
    logo: "",
    href: "",
    tier: "premium",
    active: true,
    order: 2
  },
  {
    id: "placeholder-partner-1",
    name: "Partner folgt",
    logo: "",
    href: "",
    tier: "partner",
    active: true,
    order: 1
  },
  {
    id: "placeholder-partner-2",
    name: "Partner folgt",
    logo: "",
    href: "",
    tier: "partner",
    active: true,
    order: 2
  },
  {
    id: "placeholder-partner-3",
    name: "Partner folgt",
    logo: "",
    href: "",
    tier: "partner",
    active: true,
    order: 3
  },
  {
    id: "placeholder-partner-4",
    name: "Partner folgt",
    logo: "",
    href: "",
    tier: "partner",
    active: true,
    order: 4
  }
];

const socialPosts = [
  {
    id: "post-1",
    platform: "instagram",
    type: "image",
    image: "",
    title: "Auswärtssieg!",
    caption: "Unsere erste Mannschaft gewinnt beim SV Elchingen souverän mit 5:0.",
    publishedAt: "2026-09-13T18:00:00+02:00",
    permalink: "#",
    pinned: true,
    hidden: false
  },
  {
    id: "post-2",
    platform: "instagram",
    type: "image",
    image: "",
    title: "Neuigkeiten vom TKSV",
    caption: "Aktuelle Meldungen und Einblicke aus unserem Vereinsleben.",
    publishedAt: "2026-09-10T18:00:00+02:00",
    permalink: "#",
    pinned: false,
    hidden: false
  },
  {
    id: "post-3",
    platform: "instagram",
    type: "reel",
    image: "",
    title: "Auf und neben dem Platz",
    caption: "Folgt dem TKSV Giengen und bleibt immer auf dem Laufenden.",
    publishedAt: "2026-09-07T18:00:00+02:00",
    permalink: "#",
    pinned: false,
    hidden: false
  }
];

let visibleSlides = [];
let heroDots = [];
let heroIndex = 0;
let heroTimer = null;
let heroPaused = false;
let swipeStartX = null;

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector(".sr-only").textContent = open ? "Menü schließen" : "Menü öffnen";
  menu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}

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

function filled(value) {
  return String(value ?? "").trim() !== "";
}

function isConfirmedMatch(match) {
  return Boolean(
    match?.matchConfirmed &&
    filled(match.homeTeam) &&
    filled(match.awayTeam) &&
    filled(match.kickoff) &&
    filled(match.venue)
  );
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

function crestSource(isClub, provided) {
  if (isClub) return { src: TKSV_CREST, placeholder: false };
  if (filled(provided)) return { src: provided, placeholder: false };
  return { src: OPPONENT_CREST_PLACEHOLDER, placeholder: true };
}

function applyCrest(img, source, teamName) {
  if (!img) return;
  img.hidden = false;
  img.classList.toggle("is-placeholder", source.placeholder);
  img.alt = source.placeholder ? "Wappen folgt" : teamName;
  img.src = source.src;
  img.onerror = () => {
    if (img.getAttribute("src") === OPPONENT_CREST_PLACEHOLDER) return;
    img.onerror = null;
    img.src = OPPONENT_CREST_PLACEHOLDER;
    img.classList.add("is-placeholder");
    img.alt = "Wappen folgt";
  };
}

function renderMatchPreview(match) {
  const slide = document.querySelector("[data-match-slide]");
  const confirmed = isConfirmedMatch(match);
  const kickoff = formatKickoff(match.kickoff);

  if (slide) {
    slide.hidden = !confirmed;
    if (!confirmed) {
      slide.classList.remove("is-active");
      slide.setAttribute("inert", "");
      slide.setAttribute("aria-hidden", "true");
    }
  }

  if (confirmed && slide) {
    const fixture = slide.querySelector("[data-match-fixture]");
    const competition = slide.querySelector("[data-match-competition]");
    const note = slide.querySelector("[data-match-note]");
    const cta = slide.querySelector("[data-match-cta]");
    const homeIsClub = Boolean(match.isHome);
    const awayIsClub = !homeIsClub;

    setText(slide.querySelector("[data-match-side]"), match.isHome ? "Heimspiel" : "Auswärtsspiel");
    setText(slide.querySelector("[data-match-home]"), match.homeTeam);
    setText(slide.querySelector("[data-match-away]"), match.awayTeam);
    setText(slide.querySelector("[data-match-kickoff]"), `${kickoff.long} · ${kickoff.time} Uhr`);
    setText(slide.querySelector("[data-match-venue]"), match.venue);

    fixture?.classList.add("has-crests");
    applyCrest(
      slide.querySelector("[data-match-home-crest]"),
      crestSource(homeIsClub, match.homeCrest),
      match.homeTeam
    );
    applyCrest(
      slide.querySelector("[data-match-away-crest]"),
      crestSource(awayIsClub, match.awayCrest),
      match.awayTeam
    );

    if (competition) {
      competition.hidden = !filled(match.competition);
      setText(competition, match.competition);
    }
    if (note) {
      note.hidden = !filled(match.note);
      setText(note, match.note);
    }
    if (cta) cta.href = filled(match.ctaHref) ? match.ctaHref : "#spiele";
  }

  const title = document.querySelector("[data-strip-title]");
  const detail = document.querySelector("[data-strip-detail]");
  const date = document.querySelector("[data-strip-date]");
  const venue = document.querySelector("[data-strip-venue]");

  if (!confirmed) {
    setText(title, "Termin folgt");
    setText(detail, "Der nächste bestätigte Spieltermin erscheint hier.");
    setText(date, "Datum offen");
    setText(venue, "Spielort offen");
    return;
  }

  setText(title, `${match.homeTeam} vs ${match.awayTeam}`);
  setText(detail, `${kickoff.long} · ${kickoff.time} Uhr`);
  setText(date, `${kickoff.short}, ${kickoff.time} Uhr`);
  setText(venue, match.venue);
}

function prefersReducedMotion() {
  return reduceMotion.matches;
}

function showHeroSlide(nextIndex) {
  if (!visibleSlides.length) return;
  heroIndex = (nextIndex + visibleSlides.length) % visibleSlides.length;

  visibleSlides.forEach((slide, index) => {
    const active = index === heroIndex;
    slide.classList.toggle("is-active", active);
    slide.toggleAttribute("inert", !active);
    slide.setAttribute("aria-hidden", String(!active));
  });

  heroDots.forEach((dot, index) => {
    const active = index === heroIndex;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-selected", String(active));
  });

  const current = visibleSlides[heroIndex];
  const matchSlide = Boolean(current?.hasAttribute("data-match-slide"));
  const strip = document.querySelector(".match-strip");

  hero.dataset.heroTheme = current?.classList.contains("hero-slide--join") ? "join" : "dark";
  hero.classList.toggle("is-match-slide", matchSlide);

  if (strip) {
    strip.toggleAttribute("inert", matchSlide);
    strip.setAttribute("aria-hidden", String(matchSlide));
  }
}

function stopHeroTimer() {
  window.clearInterval(heroTimer);
  heroTimer = null;
}

function startHeroTimer() {
  stopHeroTimer();
  if (heroPaused || prefersReducedMotion() || visibleSlides.length < 2) return;
  heroTimer = window.setInterval(() => {
    showHeroSlide(heroIndex + 1);
  }, HERO_INTERVAL);
}

function pauseHero() {
  heroPaused = true;
  stopHeroTimer();
}

function resumeHero() {
  heroPaused = false;
  startHeroTimer();
}

function buildPager() {
  if (!heroPager) return;
  heroPager.replaceChildren();

  visibleSlides.forEach((slide, index) => {
    const label = slide.getAttribute("data-hero-label") || `Folie ${index + 1}`;
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", slide.id);
    button.setAttribute("aria-label", `Folie ${index + 1}: ${label}`);
    button.setAttribute("aria-selected", "false");
    button.dataset.heroDot = "";
    button.textContent = String(index + 1);
    button.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroTimer();
    });
    heroPager.append(button);
  });

  heroDots = [...heroPager.querySelectorAll("[data-hero-dot]")];
}

function initHeroSlider() {
  if (!hero || !heroViewport) return;

  renderMatchPreview(nextMatch);
  visibleSlides = [...document.querySelectorAll("[data-hero-slide]")].filter((slide) => !slide.hidden);
  buildPager();
  showHeroSlide(0);

  hero.addEventListener("mouseenter", pauseHero);
  hero.addEventListener("mouseleave", resumeHero);
  hero.addEventListener("focusin", pauseHero);
  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) resumeHero();
  });

  heroViewport.addEventListener("touchstart", (event) => {
    pauseHero();
    swipeStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  heroViewport.addEventListener("touchend", (event) => {
    if (swipeStartX == null) return;
    const distance = event.changedTouches[0].clientX - swipeStartX;
    swipeStartX = null;
    if (Math.abs(distance) > 48) showHeroSlide(heroIndex + (distance < 0 ? 1 : -1));
    resumeHero();
  }, { passive: true });

  hero.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showHeroSlide(heroIndex + 1);
      startHeroTimer();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showHeroSlide(heroIndex - 1);
      startHeroTimer();
    }
  });

  reduceMotion.addEventListener("change", () => {
    if (prefersReducedMotion()) stopHeroTimer();
    else startHeroTimer();
  });

  startHeroTimer();
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

function isLivePermalink(url) {
  return /^https?:\/\//i.test(String(url ?? "").trim());
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
  badge.setAttribute("aria-hidden", "true");
  badge.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 6.5v11l10-5.5Z"/></svg>';
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
    image.addEventListener("load", () => media.classList.add("has-image"));
    image.addEventListener("error", () => {
      media.classList.remove("has-image");
      image.remove();
    });
    media.append(image);
  }

  if (post.type === "reel") {
    const reel = createReelBadge();
    reel.setAttribute("aria-label", "Reel");
    reel.removeAttribute("aria-hidden");
    media.append(reel);
  }

  return media;
}

function renderSocialPosts(posts) {
  const section = document.querySelector("[data-news]");
  const grid = document.querySelector("[data-news-grid]");
  if (!section || !grid) return;

  const visible = selectSocialPosts(posts);
  grid.replaceChildren();

  if (!visible.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
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

function selectActiveTeams(items) {
  return items
    .filter((team) => team?.active === true && filled(team.name) && filled(team.id))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function sharedTeamPhoto(visible) {
  const images = [...new Set(visible.map((team) => team.image).filter(filled))];
  if (images.length === 1) return images[0];
  if (images.length > 1) return "";
  return TEAM_PHOTO;
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
    link.href = `tel:${value.replace(/[^\d+]/g, "")}`;
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
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("viewBox", "0 0 24 24");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M7 17 17 7M8 7h9v9");
  icon.append(path);
  fupa.append(icon);
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
    image.alt = "Mannschaft des TKSV Giengen";
    image.width = 1932;
    image.height = 1086;
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
    link.rel = "noopener noreferrer";
  }
  link.append(frame);
  return link;
}

function renderSponsors(items) {
  const section = document.querySelector("[data-sponsors]");
  const board = document.querySelector("[data-sponsors-board]");
  if (!section || !board) return;

  const visible = (items || []).filter((item) => (
    item?.active === true && filled(item.id) && filled(item.name)
  ));

  board.replaceChildren();

  if (!visible.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
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

initHeroSlider();
initSocialFeed();
renderTeams(teams);
renderClub(club);
renderSponsors(sponsors);

if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target && !target.hidden) target.scrollIntoView();
}
