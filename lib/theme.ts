/**
 * Thème clair / sombre sans dépendance.
 * Préférence enregistrée dans localStorage (« theme » : light | dark) ; à défaut, préférence système.
 */
export const THEME_STORAGE_KEY = "theme";

/**
 * Script exécuté dans <head> avant l'affichage (rendu serveur, contenu statique) :
 * pose la classe `dark` sans flash. Aucune donnée externe n'y est injectée.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;
