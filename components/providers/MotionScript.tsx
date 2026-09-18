const STORAGE_KEY = "prish.motion";

/**
 * Sets <html data-motion="full|reduced"> before first paint, from the same inputs
 * MotionPrefs uses after hydration (localStorage override, then the OS setting). Lets CSS
 * hold hero pieces at opacity 0 for the entrance animation without a flash on repeat
 * visits — and, if JS never arrives, `motion-fallback` in globals.css shows them anyway.
 */
export function MotionScript() {
  const js = `(function(){try{var o=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var r=o==="reduce"?true:o==="full"?false:matchMedia("(prefers-reduced-motion: reduce)").matches;document.documentElement.dataset.motion=r?"reduced":"full"}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
