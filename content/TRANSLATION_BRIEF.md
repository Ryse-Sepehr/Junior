# Translation brief (FR -> NL and EN)

Source: `content/fr.json` — an object keyed by page slug. Each page has:
`slug, seoTitle, seoDesc, h1, intro[], sections[], faq[], images[]`, sometimes `image`.
Sections: `{h, level, body[], imgs?, cta?{label, slug}, kind?, steps?}`; body items are `{p}`, `{ul:[...]}` or `{box, p}`.

For EACH assigned slug, write two files:
- `content/nl/<slug>.json`  (Dutch as used in Belgium/Flanders, formal "u", natural and fluent, not word-for-word)
- `content/en/<slug>.json`  (British English, natural marketing tone)

Rules:
- Output = the page object only (not wrapped by slug), EXACT same structure/keys/array lengths/order as the FR page.
- Translate ONLY human text: seoTitle, seoDesc, h1, h, p, ul items, box, q, a, cta.label.
- Never change: slug, level, kind, steps, imgs, images, image, cta.slug. Empty strings stay empty.
- Keep the brand "Gérard & Fils" as is. Keep phone numbers, emails, addresses, VAT number unchanged.
- "CBD / Chambre Belge des Déménageurs": NL "Belgische Kamer van Verhuizers (BKV)", EN "Belgian Chamber of Removers (CBD)".
- Brussels municipalities in NL use official Dutch names: Elsene (Ixelles), Schaarbeek, Etterbeek, Jette, Ukkel (Uccle), Vorst (Forest), Oudergem (Auderghem), Watermaal-Bosvoorde, Sint-Lambrechts-Woluwe / Sint-Pieters-Woluwe (Woluwe), Sint-Genesius-Rode (Rhode-Saint-Genèse), Anderlecht, Laken (Laeken), Brussel. Brabant wallon = Waals-Brabant, Brabant flamand = Vlaams-Brabant. In EN keep the French names (Ixelles, Uccle, ...) and "Brussels", "Walloon Brabant", "Flemish Brabant".
- Terminology NL: déménagement = verhuizing, déménageur = verhuizer, garde-meubles = meubelopslag, lift = verhuislift, devis = offerte, déchetterie = containerpark, vide-maison = woningontruiming.
- Terminology EN: déménagement = removal/move, déménageur = removal company/removers, garde-meubles = furniture storage, lift = furniture lift, devis = quote.
- Write valid UTF-8 JSON (indent 1). After writing, validate with:
  `python3 -I -c "import json,sys;[json.load(open(f)) for f in sys.argv[1:]]" content/nl/*.json content/en/*.json`
