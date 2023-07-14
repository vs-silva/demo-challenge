<template>

  <v-container>
    <main-page />
  </v-container>

</template>

<script setup lang="ts">
import {useHead} from "unhead";

useHead({
  bodyAttrs: {
    class: 'bg-blue-lighten-5'
  },
});

import MainPage from './client/pages/main-page/index.vue';
</script>
