# Déménagement Gérard & Fils — nouveau site

Refonte du site www.demenagementgerardetfils.be : même arborescence, même contenu, nouvelle mise en forme, en **FR / NL / EN**.

## Stack
- Next.js 15 (App Router, export statique) · TypeScript · Tailwind CSS v4
- Structure **shadcn** (`components.json`, `lib/utils.ts`, `components/ui/`)
- GSAP (menu pliant `FolioFoldMenu`) · Framer Motion (intro, révélations, FAQ, galerie) · lucide-react

## Pourquoi `components/ui`
Le CLI shadcn installe et met à jour ses composants dans le dossier défini par `aliases.ui` (`@/components/ui`).
Garder les composants « de base » (comme `folio-fold-menu.tsx`) dans ce dossier permet :
- d’ajouter d’autres composants shadcn plus tard sans conflit (`npx shadcn add button`) ;
- de séparer les briques génériques (`components/ui`) des sections propres au site (`components/site`) ;
- de garder les imports `@/components/ui/...` attendus par les exemples shadcn.

Installation from scratch (si besoin) :
```bash
npx create-next-app@latest --ts --tailwind --app
npx shadcn@latest init
npm i gsap framer-motion lucide-react
```

## Arborescence
```
app/(fr)/…            FR : mêmes URL que le site actuel (/demenagement-piano/, …)
app/(nl)/nl/…         NL : /nl/…
app/(en)/en/…         EN : /en/…
components/ui/        folio-fold-menu.tsx (+ démo)
components/site/      en-tête, pied de page, accueil, pages, formulaire, galerie
content/fr.json       contenu repris du site actuel (28 pages)
content/nl|en/*.json  traductions (même structure)
lib/site.ts           navigation, textes d’interface, photos par page
public/media|video    vraies photos et vidéos de chantier (optimisées)
```

## Photos
Uniquement des photos et vidéos réelles de chantiers Gérard & Fils. Les quelques photos de banque d’images
du site actuel sont remplacées automatiquement par de vraies photos (voir `replace` dans `lib/site.ts`).
La vidéo d’accueil (`public/video/hero.mp4`) est un montage de vraies photos de chantier.

## Formulaire de devis
Netlify Forms (formulaire `devis`). Les demandes arrivent dans Netlify → Forms ; activer une notification
e-mail vers info@demenagementgerardetfils.be.

## Commandes
```bash
npm run dev     # développement
npm run build   # export statique dans out/
```
