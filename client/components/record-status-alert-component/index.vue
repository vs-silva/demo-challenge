<template>
  <div data-testid="record-status-alert-component-container">

    <v-snackbar
        data-testid="record-status-alert-component"
        class="text-center ma-2"
        v-model="display"
        :color="props.alertType?.type"
        :timeout="1000"
        variant="outlined"
        @update:modelValue="() => {
          display = false;
        }"
    >
      <h1 class="text-sm-caption" data-testid="record-status-alert-component-title">{{alertType?.title}}</h1>
      <p class="text-sm-caption" data-testid="record-status-alert-component-text">{{alertType?.text}}</p>
    </v-snackbar>

  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import type {RecordStatusAlertComponentDTO} from "./dto/record-status-alert-component.dto";
import {ref, watch} from "@vue/runtime-core";

const display = ref(false);

const props = defineProps({
  alertType: {
    type: Object as PropType<RecordStatusAlertComponentDTO | null>,
    required: false,
    default: () => null
  }
});

watch(
    () => props.alertType,
    () => {
      if(props.alertType) {
        display.value = true;
      }
    }
);

</script>

<style scoped>

</style>
