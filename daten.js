/* ==========================================================================
   TKSV Giengen: Inhalte der Website

   Hier stehen alle Inhalte, die sich ändern. Am Aufbau der Seite muss
   dafür nichts angefasst werden.

   So geht's:
   - Nur den Text zwischen den Anführungszeichen ändern: "so".
   - Leere Felder ("") werden auf der Seite einfach weggelassen.
   - Nach jedem Eintrag in einer Liste steht ein Komma, nach dem letzten nicht.
   - Bilder in den passenden Ordner unter assets/ legen und den Pfad eintragen.
   - Nach dem Speichern die Seite im Browser neu laden und kurz durchklicken.
   ========================================================================== */


/* --- Links ----------------------------------------------------------------
   Instagram erscheint unter „Aktuelles“, im Kontakt und im Footer, sobald
   die Adresse eingetragen ist. Ohne Adresse wird „Aktuelles“ ausgeblendet. */
const links = {
  instagram: "",        // z. B. "https://www.instagram.com/vereinsname/"
  instagramHandle: "",  // z. B. "@vereinsname"
  fupa: "https://www.fupa.net/club/tksv-giengen",
  fussballDe: "https://www.fussball.de/verein/tuerk-ksv-giengen-wuerttemberg/-/id/00ES8GNB3G00001NVV0AG08LVUPGND5I"
};


/* --- Nächstes Spiel (freiwillig) ------------------------------------------
   Erscheint im Balken unter dem Hero, bis zwei Stunden nach Anpfiff.
   Danach zeigt der Balken automatisch wieder den Link zum Spielplan.
   Wer das nicht pflegen will, lässt matchConfirmed einfach auf false. */
const nextMatch = {
  matchConfirmed: false,
  homeTeam: "",                          // z. B. "TKSV Giengen"
  awayTeam: "",                          // z. B. "SV Musterhausen"
  kickoff: "",                           // Format: "2026-10-25T15:00:00+02:00" (Winterzeit: +01:00)
  venue: ""                              // z. B. "Sportplatz Giengen"
};


/* --- Mannschaften ---------------------------------------------------------
   Trainingszeiten als Liste, z. B. ["Dienstag · 19:00 Uhr", "Donnerstag · 19:00 Uhr"].
   Kontakt kann eine Telefonnummer oder E-Mail-Adresse sein. */
const teamPhoto = "assets/hero-1920.webp";
const teams = [
  {
    id: "aktive",
    name: "Aktive",
    league: "Kreisliga B4",
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
    league: "Kreisliga B4 Reserve",
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


/* --- Verein ---------------------------------------------------------------- */
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


/* --- Sponsoren --------------------------------------------------------------
   Logo-Dateien nach assets/sponsoren/ legen (am besten PNG oder SVG mit
   transparentem Hintergrund, ca. 600 px breit).
   tier: "main" = Hauptpartner (groß), "premium" = Premiumpartner, "partner" = Partner.
   order: Reihenfolge innerhalb der Stufe.
   Zum Pausieren active auf false setzen, statt den Eintrag zu löschen.

   Vorlage zum Kopieren:
   {
     id: "musterbau",
     name: "Musterbau GmbH",
     logo: "assets/sponsoren/musterbau.png",
     href: "https://www.musterbau.de",
     tier: "partner",
     active: true,
     order: 1
   },
*/
const sponsors = [
];


/* --- Ansprechpartner ------------------------------------------------------
   Erscheinen im Bereich „Komm vorbei. Mach mit.“ Leere Felder werden
   weggelassen. Ein Eintrag ganz ohne Name, Telefon und E-Mail zeigt „folgt“. */
const contacts = [
  { topic: "Mitspielen & Training", name: "", phone: "", email: "" },
  { topic: "Sponsoring & Partner", name: "", phone: "", email: "" },
  { topic: "Verein allgemein", name: "", phone: "", email: "" }
];

const venue = {
  name: "",     // z. B. "Sportplatz …"
  street: "",
  city: ""      // z. B. "89537 Giengen an der Brenz"
};


/* --- Beiträge unter „Aktuelles“ (freiwillig) --------------------------------
   Normalerweise reicht der Instagram-Link oben. Wer einzelne Beiträge
   hervorheben will, trägt sie hier ein (höchstens drei werden gezeigt).
   permalink ist der Link zum Instagram-Beitrag, image ein Bild unter assets/.

   Vorlage zum Kopieren:
   {
     id: "heimsieg-oktober",
     platform: "instagram",
     type: "image",
     image: "assets/aktuelles/heimsieg.webp",
     title: "Heimsieg!",
     caption: "Kurzer Text zum Beitrag.",
     publishedAt: "2026-10-12T18:00:00+02:00",
     permalink: "https://www.instagram.com/p/…/",
     pinned: false,
     hidden: false
   },
*/
const socialPosts = [
];
