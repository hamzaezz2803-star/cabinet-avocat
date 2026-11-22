# Règles de sécurité

Source de référence : `README-securite.md` (règles globales). Ce fichier les applique au site du cabinet.
Un cabinet d'avocats est tenu au **secret professionnel** : la confidentialité est une exigence métier, pas une option.

## 1. Périmètre du site

- Site vitrine public, sans compte utilisateur ni espace client. Aucune authentification n'est à créer.
- Seule donnée personnelle collectée : la **demande de rendez-vous** (formulaire de contact).
- Si un espace client est ajouté plus tard : service d'authentification éprouvé (Supabase Auth, Auth.js...), session en cookie httpOnly/Secure/SameSite, MFA pour l'administration, RLS en base. Jamais de système maison.

## 2. Secrets et variables d'environnement

- Secrets dans `.env.local` (dev) et dans l'hébergeur (prod). Jamais dans Git (`.env*` est ignoré, sauf `.env.example`).
- `.env.example` liste les variables **sans valeur**.
- Aucune clé secrète ne porte le préfixe `NEXT_PUBLIC_`.
- Tout module qui lit une clé secrète commence par `import "server-only";` (voir `lib/server/*`).
- Une clé exposée (commit, capture, message) est **régénérée immédiatement**.

## 3. Formulaire de contact

Implémenté en Server Action (`app/actions/contact.ts`). Chaque soumission suit cet ordre :

1. **Champ piège (honeypot)** invisible : s'il est rempli, on répond « succès » sans rien envoyer.
2. **Contrôle de durée** : soumission en moins de 3 s après l'affichage = robot, même traitement.
3. **Limitation de débit** par IP (fenêtre glissante, `lib/server/rate-limit.ts`). En production multi-instance, remplacer le stockage mémoire par Upstash Redis ou équivalent.
4. **Validation zod côté serveur** (`lib/validation/contact.ts`), même schéma que côté client : longueurs maximales, e-mail, téléphone, liste fermée de domaines, consentement obligatoire.
5. **Normalisation** : suppression des caractères de contrôle, `trim`, aucune interprétation HTML.
6. **Envoi** par l'API du fournisseur e-mail via `fetch` côté serveur. Le contenu est échappé avant insertion dans le HTML de l'e-mail.
7. Réponse générique au navigateur : jamais de pile d'appels, de message du fournisseur ni de détail technique.

Règles complémentaires :
- Le formulaire rappelle de **ne pas joindre de pièces ni de détails confidentiels** avant la signature d'une convention : le premier contact sert à fixer un rendez-vous.
- Pas d'envoi de fichiers par le site. Si cela devient nécessaire : type et taille vérifiés, stockage privé, liens signés à durée limitée.
- Ajouter Cloudflare Turnstile si du spam passe malgré le honeypot et la limitation.

## 4. XSS, CSRF, injections

- Jamais de `dangerouslySetInnerHTML` avec un contenu externe. Seule exception : le JSON-LD statique, généré depuis `lib/site-config.ts` et sérialisé avec échappement de `<`.
- Les Server Actions de Next.js vérifient l'en-tête `Origin` (protection CSRF native). Ne pas désactiver `serverActions.allowedOrigins` sans raison.
- Aucune requête SQL. Si une base est ajoutée : client officiel ou requêtes paramétrées.
- Aucun identifiant ou droit lu depuis l'URL ou un champ de formulaire.

## 5. En-têtes HTTP (définis dans `next.config.ts`)

- `Content-Security-Policy` stricte : `default-src 'self'`, `img-src 'self' data: blob:`, `font-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`.
  - `script-src 'unsafe-inline'` est conservé pour garder les pages **statiques** (les nonces imposent un rendu dynamique). Réévaluer avec l'option SRI expérimentale de Next.js si le niveau d'exigence augmente.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` : caméra, micro, géolocalisation, paiement, USB désactivés.
- `X-Frame-Options: DENY` (doublon de `frame-ancestors` pour les anciens navigateurs).
- `poweredByHeader: false`.

## 6. Ressources tierces

- Polices **auto-hébergées** via `next/font` ; photos stockées dans `public/images`. Aucune requête vers un domaine tiers au chargement : aucune adresse IP de visiteur n'est transmise à un tiers.
- Pas d'outil d'analyse ni de cookie non essentiel. Si un outil est ajouté : chargement **après consentement** uniquement, bandeau « Accepter » / « Refuser » de même importance, politique de cookies mise à jour.

## 7. Données personnelles (loi 09-08, RGPD si clients européens)

- Minimisation : nom, e-mail, téléphone (facultatif), domaine, message. Rien d'autre.
- Case de consentement **non pré-cochée**, distincte de toute communication marketing (il n'y en a pas).
- Aucune donnée du formulaire conservée par le site : elle est transmise par e-mail au cabinet puis gérée dans ses outils.
- Déclaration à la **CNDP** avant mise en production avec de vraies demandes.
- Politique de confidentialité listant les sous-traitants réels (hébergeur, fournisseur e-mail).

## 8. Journalisation

- Jamais de nom, e-mail, téléphone ou message dans les logs. Utiliser `maskEmail` / `maskPhone` de `lib/server/mask.ts` si un identifiant est nécessaire.
- Les erreurs serveur sont journalisées avec un code court, pas avec les données saisies.

## 9. Dépendances

- `npm audit` avant chaque mise en production : corriger toute vulnérabilité élevée ou critique.
- Dependabot ou Renovate activé sur le dépôt.
- Toute nouvelle dépendance est justifiée (voir `frontend-architecture.md`).

## Checklist avant mise en production

- [ ] Aucun secret dans le code ni dans l'historique Git.
- [ ] Variables `CONTACT_*` et `RESEND_API_KEY` définies chez l'hébergeur.
- [ ] Formulaire testé : honeypot, limitation de débit, erreurs de validation, envoi réel.
- [ ] En-têtes vérifiés (securityheaders.com ou `curl -I`).
- [ ] `npm audit` sans vulnérabilité élevée ou critique.
- [ ] Politique de confidentialité et démarche CNDP à jour.
