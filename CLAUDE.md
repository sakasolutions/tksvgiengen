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

- [ ] **„Website von SAKA Solutions" mit Link in den Footer.** Steht aktuell nicht drin. Das ist die einzige Gegenleistung des Projekts — ohne den Hinweis ist die Arbeit im Wortsinn umsonst. Mit dem Verein abstimmen, das ist bei Vereinsseiten völlig üblich.
- [ ] Echte Inhalte vom Verein einholen: Mannschaften, Spielplan, Ansprechpartner, Sponsorenlogos.
- [ ] **Impressum und Datenschutz** — ein Verein braucht beides. Die Verantwortung liegt beim Vorstand, also bei ihm selbst.
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
- 2026-09-24: Als Repo gesichert. Geklärt: Sinan ist selbst im Vorstand, der Vorstand weiß Bescheid. Festgehalten, dass der eigene Verein nicht gegen das Ehrenamts-Kontingent zählt und dass beim Sponsorenkontakt nicht verkauft wird.
