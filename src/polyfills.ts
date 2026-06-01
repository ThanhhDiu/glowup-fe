// Minimal polyfills for browser runtime compatibility
// Define `global` for libraries that expect Node-like environment
;(window as any).global = window as any;

// Provide a simple crypto fallback if window.crypto is missing (rare)
if (typeof (window as any).crypto === 'undefined') {
  (window as any).crypto = {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
      return arr;
    },
  };
}
