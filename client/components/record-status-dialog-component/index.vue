<template>
  <div data-testid="record-status-dialog-component-container">

    <div class="text-center">
      <v-dialog
          v-model="props.display"
          persistent
          width="auto"
      >

        <v-card>

          <v-card-text>
            <p class="font-weight-medium text-center text-capitalize">
              Confirm delete
            </p>

            <v-list v-if="recordStatusDTO" :items="Object.entries(recordStatusDTO).map((key) => ({
              title: `${key[0].toString()} : ${key[1].toString()}`
            }))" class="text-capitalize"></v-list>

          </v-card-text>

          <v-card-actions>
            <v-btn color="error"
                   inline-block
                   @click.prevent="() => emit(RecordStatusDialogComponentEventTypeConstants.DELETE_RECORD_STATUS, recordStatusDTO)"
            >Delete</v-btn>
            <v-btn
                color="blue-grey-lighten-1"
                inline-block
                @click.prevent="() => {
                  emit(RecordStatusDialogComponentEventTypeConstants.CANCEL_DELETE_RECORD_STATUS);
                }"
            >Cancel</v-btn>

          </v-card-actions>

        </v-card>

      </v-dialog>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "@vue/runtime-core";
import EventBus from "../../engines/event-bus";
import {RecordStatusStoreEventTypesConstants} from "../../store/record-status-store/constants/record-status-store-event-types.constants";
import {RecordStatusDialogComponentEventTypeConstants} from "./constants/record-status-dialog-component-event-type.constants";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";

const emit = defineEmits([
  RecordStatusDialogComponentEventTypeConstants.CANCEL_DELETE_RECORD_STATUS,
  RecordStatusDialogComponentEventTypeConstants.DELETE_RECORD_STATUS,
]);

const props = defineProps({
  display: {
    type: Boolean,
    required: false,
    default: () => false
  }
});

const recordStatusDTO = ref<RecordStatusDTO | null>(null);

onBeforeMount(() => {
  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_DELETE, (payload) => {
    recordStatusDTO.value = payload as RecordStatusDTO;
  });
});


</script>

<style scoped>

</style>
