<template>
  <div data-testid="record-status-alert-component-container">

    <v-snackbar
        v-if="props.alertType"
        v-model="props.display"
        close-delay="3000"
        :color="props.alertType.type"
    >
      <h1>{{alertType?.title}}</h1>
      <p>{{alertType?.text}}</p>
    </v-snackbar>

  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import type {RecordStatusAlertComponentDTO} from "./dto/record-status-alert-component.dto";

const props = defineProps({
  display: {
    type: Boolean,
    required: false,
    default: () => false
  },
  alertType: {
    type: Object as PropType<RecordStatusAlertComponentDTO | null>,
    required: false,
    default: () => null
  }
});

</script>

<style scoped>

</style>
