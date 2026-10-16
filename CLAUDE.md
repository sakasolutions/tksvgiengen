# TKSV Giengen — Vereinswebsite (ehrenamtlich)

## Status

**Vereinsarbeit, kein Kundenprojekt.** Sinan ist selbst im Vorstand des TKSV Giengen, der gesamte Vorstand weiß Bescheid. Freigaben, Inhalte und Veröffentlichung entscheidet er mit — die übliche Wartezeit bei Vereinsprojekten entfällt.

**Zählt nicht gegen das Ehrenamts-Kontingent.** Der eigene Verein ist Vereinsarbeit. Ein kostenloses Projekt für einen *fremden* Verein wäre eine Akquise-Investition — davon maximal zwei pro Jahr.

Der TKSV Giengen ist ein echter Verein, keine Konzeptseite. Alle Inhalte müssen stimmen — Mannschaften, Spieltermine, Ansprechpartner und Sponsoren werden vom Verein geliefert und nicht erfunden.

## Warum ehrenamtlich

Kein Gefallen, sondern der tragfähigste Akquisekanal für einen Ein-Personen-Betrieb ohne Lust auf Kaltakquise:

- Gute Arbeit wird gesehen, ohne dass etwas verkauft werden muss.
- Der Verein teilt die Seite in seinen Kanälen, es spricht sich im Ort herum.
- **Der eigentliche Wert ist der Sponsorenbereich.** Das sind Betriebe, die nachweislich Geld für Sichtbarkeit ausgeben — eine vorqualifizierte Liste, die in keinem Branchenverzeichnis steht.

### Grenze beim Sponsorenkontakt

Als Vorstandsmitglied ist Sinan für die Sponsoren jemand mit Amt, nicht der Dienstleister von außen. **Dort wird nicht verkauft.** Die Vereinsseite wird gut gemacht, die Sponsorenlogos sehen ordentlich aus, und wer von sich aus fragt, bekommt eine Antwort. Das Amt verschafft Anwesenheit, keine Verkaufslizenz — und genau bei diesen Leuten wiegt der Ruf am schwersten.

## Regeln für ehrenamtliche Projekte

- **Maximal zwei pro Jahr.** In einer Stadt dieser Größe spricht sich „macht Websites umsonst" schneller herum als jede Referenz. Vorbereiteter Satz für Anfrage Nummer drei: *„Ich mache zwei im Jahr, die sind vergeben."*
- **Umfang vorher schriftlich festhalten.** Bei bezahlten Projekten begrenzt der Preis den Rahmen, bei kostenlosen fehlt diese Grenze. Richtwert: feste Seitenzahl, ein Abstimmungstermin, eine Korrekturrunde.
- **Nicht zwei gleichzeitig**, solange Ihdina bis Rajab Vorrang hat.
- **Fußzeilen-Hinweis ist Pflicht**, siehe unten.

## OFFEN

- [x] **„Website von SAKA Solutions" mit Link in den Footer.** Steht drin, verlinkt auf saka-it.de/webdesign. Zusätzlich im Impressum unter „Gestaltung und Umsetzung". Mit dem Vorstand noch kurz bestätigen.
- [ ] **Impressum und Datenschutz mit Vereinsdaten füllen.** Seiten stehen, alle Lücken sind rot markiert (`class="placeholder"`): Vereinsname laut Satzung, Anschrift, vertretungsberechtigter Vorstand, Registergericht und VR-Nummer, Kontakt, Hosting-Anbieter, Bildnachweis, Grundlage für die Mannschaftsfotos. Die Verantwortung liegt beim Vorstand, also bei ihm selbst. Texte sind keine Rechtsberatung, vor dem Ausfüllen einmal gegenlesen.
- [ ] Echte Inhalte in `daten.js` eintragen: Instagram-Link, Ansprechpartner, Sportplatz-Adresse, Trainingszeiten und Trainer, Sponsoren mit Logos.
- [ ] Veröffentlichung klären: Läuft aktuell öffentlich über GitHub Pages aus `main` (https://sakasolutions.github.io/tksvgiengen/). Jeder Push auf `main` geht sofort live. Bei eigener Domain: `og:url`, `og:image`, JSON-LD-Adressen umstellen, `canonical`, `robots.txt` und `sitemap.xml` ergänzen.

## Diese Seite

- **Aufbau:** `index.html`, `impressum.html`, `datenschutz.html`, `styles.css`, `script.js`, `daten.js`, Bilder in `assets/`. Kein Framework, kein Build-Schritt.
- **Inhalte pflegen:** nur in `daten.js`. Anleitung steht oben in der Datei. Leere Felder blendet die Seite aus, ohne Instagram-Link verschwindet „Aktuelles" samt Menüpunkt, ohne Sponsoren zeigt der Bereich nur „Partner werden". Kein Admin-Panel, bewusst.
- **Abschnitte:** `#start` · `#aktuelles` · `#mannschaften` · `#spiele` · `#verein` · `#sponsoren` · `#kontakt`
- **Hero:** statisch, Mannschaftsfoto läuft per `mask-image` nach unten aus, Text liegt im Verlauf. Darunter der Spielbalken: zeigt ein eingetragenes Spiel bis zwei Stunden nach Anpfiff, sonst den Link zum Spielplan.
- **H1:** `#HedefŞampiyonluk`, türkisch für „Ziel Meisterschaft". Ergänzt durch die Zeile „TKSV Giengen · Fußball seit 1986" darüber.
- **Titel:** „TKSV Giengen | Fußball in Giengen"
- **Bilder:** Originale (`hero1.png`, `logo/logo.png`) bleiben als Quelle im Repo, ausgeliefert werden die verkleinerten Fassungen (`hero-800/1200/1920.webp`, `hero-1600.jpg`, `logo/logo-256.png`, `og-image.jpg`). Bei neuem Mannschaftsfoto alle neu erzeugen, z. B. `cwebp -q 78 -resize 1920 0`.
- **Cache:** Nach Änderungen an CSS oder JS die `?v=`-Nummer in allen drei HTML-Dateien hochzählen.

## Stil-Regeln des Inhabers (Sinan, SAKA Solutions)

- Ruhig und seriös statt verspielt. Keine Laufbänder, nichts Schwebendes, keine Hover-Effekte mit Anheben oder Zoomen.
- Farben nie selbst erfinden: aus Vereinsfarben oder einer Vorlage ableiten.
- Kein `repeat(auto-fit, minmax(…))` als Standardraster — Raster bewusst setzen, mit Hierarchie.
- Fotos nicht in abgerundete Kästen sperren; Hero-Foto läuft per `mask-image` in den Hintergrund aus.
- Keine Strich-Icons in getönten Quadraten. Icons als SVG-Sprite mit `<use>`.
- Handy zuerst prüfen: bei 375 px darf nichts breiter als der Bildschirm sein.
- Sprache: Deutsch, echte Texte, kein Lorem ipsum.

## Arbeitsweise

- **Zu Beginn:** `git pull`.
- **Diese Datei ist das gemeinsame Gedächtnis.** Grundsätzliche Entscheidungen unten mit Datum eintragen und zusammen mit der Änderung committen.

## Entscheidungen & Verlauf

- 2026-09-14: Erste Fassung der Seite gebaut.
- 2026-09-24: Als Repo gesichert. Geklärt: Sinan ist selbst im Vorstand, der Vorstand weiß Bescheid. Festgehalten, dass der eigene Verein nicht gegen das Ehrenamts-Kontingent zählt und dass beim Sponsorenkontakt nicht verkauft wird.
- 2026-10-17: Seite fertig gebaut. Hero-Slider entfernt, statischer Hero mit Mannschaftsfoto und neutralem Text. Inhalte nach `daten.js` ausgelagert, damit Sinan selbst pflegen kann (kein Panel). Erfundene Beispiel-Posts und „Partner folgt"-Platzhalter entfernt. Neu: Kontaktbereich „Komm vorbei. Mach mit.", Footer mit SAKA-Hinweis, Impressum, Datenschutz, Icon-Sprite, Vorschaubild für WhatsApp, Favicons aus dem echten Wappen. Bilder von 4,2 MB auf unter 300 KB. Behoben: Hover mit Anheben (Stilregel), mobiles Menü war durch `backdrop-filter` am Header auf 140 px abgeschnitten. Geprüft bei 320, 375, 768 und 1440 px.
