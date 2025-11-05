// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-11-05",

  devtools: { enabled: true },

  // Enable SSG (Static Site Generation) - Tauri requires this
  ssr: false,

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  vite: {
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://v2.tauri.app/reference/environment-variables/
    envPrefix: ["VITE_", "TAURI_"],
    server: {
      // Tauri requires a consistent port
      strictPort: true,
    },
  },

  ignore: ["**/src-tauri/**"],
});
