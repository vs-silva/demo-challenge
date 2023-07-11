// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@invictus.codes/nuxt-vuetify'],
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  vuetify: {
    moduleOptions: {
      treeshaking: true,
      useIconCDN: true,
      styles: true,
      autoImport: true
    }
  }
});
