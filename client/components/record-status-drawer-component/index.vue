<template>
  <div data-testid="record-status-drawer-component-container">
    <v-layout>
      <v-navigation-drawer v-model="props.display" location="right" temporary data-testid="record-status-drawer-component">

        <v-form data-testid="record-status-drawer-form" @submit.prevent="async (event) => {

           const {valid, errors} = await event;

           //@ts-ignore
           if(!valid) {
             return;
           }

           if(!recordStatusId) {
             emit(RecordStatusDrawerComponentEventTypeConstants.CREATE_RECORD_STATUS, <RequestRecordStatusAddDTO>{
               title: recordStatusTitle,
               status: recordSelectedStatus
             });
             return;
           }

           emit(RecordStatusDrawerComponentEventTypeConstants.EDIT_RECORD_STATUS, <RequestRecordStatusUpdateDTO>{
               id: parseInt(recordStatusId),
               title: recordStatusTitle,
               status: recordSelectedStatus
             });
        }">

          <v-text-field
              v-model="recordStatusId"
              label="Id"
              :readonly="true"
              data-testid="record-status-drawer-form-id-field"
          ></v-text-field>

          <v-text-field
              v-model="recordStatusTitle"
              :rules="recordStatusTitleRules"
              :counter="20"
              label="Title"
              required
              data-testid="record-status-drawer-form-title-field"
          ></v-text-field>

          <v-select
              v-model="recordSelectedStatus"
              :items="props.recordStatusSelectOptions"
              label="Status"
              required
              data-testid="record-status-drawer-form-status-select-field"
          ></v-select>

          <v-btn type="submit" block class="mt-2" data-testid="record-status-drawer-form-submit-option">Submit</v-btn>
        </v-form>

      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script setup lang="ts">

import {ref} from "@vue/runtime-core";
import {RecordStatusDrawerComponentEventTypeConstants} from "./constants/record-status-drawer-component-event-type.constants";
import type {RequestRecordStatusAddDTO} from "../../integration/record-status/core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "../../integration/record-status/core/dtos/request-record-status-update.dto";

const recordStatusId = ref<string | null>(null);
const recordStatusTitle = ref('');
const recordSelectedStatus = ref('');

const recordStatusTitleRules = ref([]);

const emit = defineEmits([
  RecordStatusDrawerComponentEventTypeConstants.CREATE_RECORD_STATUS,
  RecordStatusDrawerComponentEventTypeConstants.EDIT_RECORD_STATUS,
]);

const props = defineProps({
  display: {
    type: Boolean,
    required: false,
    default: () => false
  },
  recordStatusSelectOptions: {
    type: Array,
    required: false,
    default: () => []
  }
});

</script>

<style scoped>

</style>
