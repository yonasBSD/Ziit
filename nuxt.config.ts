// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-09",
  devtools: { enabled: false },
  modules: ["@nuxtjs/sitemap", "nuxt-cron", "@vite-pwa/nuxt"],
  ssr: true,
  runtimeConfig: {
    pasetoKey: process.env.NUXT_PASETO_KEY,
    githubClientId: process.env.NUXT_GITHUB_CLIENT_ID,
    githubClientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
    githubRedirectUri: process.env.NUXT_GITHUB_REDIRECT_URI,
    corsOrigin: process.env.NUXT_HOST || "same-origin",
    disableRegistering: process.env.NUXT_DISABLE_REGISTRATION,
  },
  nitro: {
    preset: "bun",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      title: "Ziit",
    },
  },
  cron: {
    runOnInit: true,
    timeZone: "UTC+0",
    jobsDir: "cron",
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
  sitemap: {
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.9,
      changefreq: "weekly",
    },
    urls: [
      {
        loc: "/stats",
        lastmod: new Date().toISOString(),
        priority: 1,
        changefreq: "daily",
      },
    ],
  },
  pwa: {
    manifest: {
      name: "Ziit",
      short_name: "Ziit",
      theme_color: "#191919",
      background_color: "#191919",
      display: "standalone",
      orientation: "portrait",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});