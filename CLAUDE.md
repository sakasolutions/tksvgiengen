# TKSV Giengen — Vereinswebsite (ehrenamtlich)

## Status

**Ehrenamtliches Projekt von SAKA Solutions.** Erste von maximal zwei kostenlosen Vereinsarbeiten pro Jahr.

Der TKSV Giengen ist ein echter Verein, keine Konzeptseite. Alle Inhalte müssen stimmen — Mannschaften, Spieltermine, Ansprechpartner und Sponsoren werden vom Verein geliefert und nicht erfunden.

## Warum ehrenamtlich

Kein Gefallen, sondern der tragfähigste Akquisekanal für einen Ein-Personen-Betrieb ohne Lust auf Kaltakquise:

- Gute Arbeit wird gesehen, ohne dass etwas verkauft werden muss.
- Der Verein teilt die Seite in seinen Kanälen, es spricht sich im Ort herum.
- **Der eigentliche Wert ist der Sponsorenbereich.** Das sind Betriebe, die nachweislich Geld für Sichtbarkeit ausgeben — eine vorqualifizierte Liste, die in keinem Branchenverzeichnis steht. Als derjenige, der die Vereinsseite gemacht hat, ist man dort kein Fremder mehr.

## Regeln für ehrenamtliche Projekte

- **Maximal zwei pro Jahr.** In einer Stadt dieser Größe spricht sich „macht Websites umsonst" schneller herum als jede Referenz. Vorbereiteter Satz für Anfrage Nummer drei: *„Ich mache zwei im Jahr, die sind vergeben."*
- **Umfang vorher schriftlich festhalten.** Bei bezahlten Projekten begrenzt der Preis den Rahmen, bei kostenlosen fehlt diese Grenze. Richtwert: feste Seitenzahl, ein Abstimmungstermin, eine Korrekturrunde.
- **Nicht zwei gleichzeitig**, solange Ihdina bis Rajab Vorrang hat.
- **Fußzeilen-Hinweis ist Pflicht**, siehe unten.

## OFFEN

- [ ] **„Website von SAKA Solutions" mit Link in den Footer.** Steht aktuell nicht drin. Das ist die einzige Gegenleistung des Projekts — ohne den Hinweis ist die Arbeit im Wortsinn umsonst. Mit dem Verein abstimmen, das ist bei Vereinsseiten völlig üblich.
- [ ] Klären, ob das Projekt offiziell mit dem Verein läuft oder bisher auf Verdacht gebaut wurde.
- [ ] Echte Inhalte vom Verein einholen: Mannschaften, Spielplan, Ansprechpartner, Sponsorenlogos.
- [ ] Impressum und Datenschutz — ein Verein braucht beides, die Verantwortung liegt beim Vorstand.
- [ ] Veröffentlichung klären: eigene Domain des Vereins oder GitHub Pages.

## Diese Seite

- **Aufbau:** `index.html`, `styles.css`, `script.js`, Bilder in `assets/`. Kein Framework, kein Build-Schritt.
- **Abschnitte:** `#start` · `#aktuelles` · `#mannschaften` · `#spiele` · `#verein` · `#sponsoren`
- **H1:** `#HedefŞampiyonluk` — türkisch für „Ziel Meisterschaft". Passt zum Verein, sollte aber für Suchmaschinen durch eine Zeile ergänzt werden, die „TKSV Giengen" und „Fußball" enthält.
- **Titel:** „TKSV Giengen | Fußball in Giengen"

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
- 2026-09-24: Als Repo gesichert. Festgelegt, dass ehrenamtliche Vereinsprojekte auf zwei pro Jahr begrenzt bleiben und der Fußzeilen-Hinweis Pflicht ist.
