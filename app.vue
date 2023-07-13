<template>
  <v-container>

    <v-row>

      <v-col>

        <v-sheet class="d-flex justify-center pt-10 bg-blue-lighten-5">

          <record-status-table-component
              :recordStatusTableHeader="recordStatusTableHeader as string[]"
              :recordStatusTableContent="recordStatusCollection"
              @create-row-content="toggleDisplayDrawer()"
              @edit-row-content="toggleDisplayDrawer()"
              @delete-row-content="toggleDisplayDialog()"
          />

          <record-status-drawer-component
              :display="displayDrawer"
              :recordStatusSelectOptions="recordStatusStatesCollection as string[]"
              @create_record_status="(dto: RequestRecordStatusAddDTO) => addRecordStatus(dto)"
              @edit_record_status="(dto: RequestRecordStatusUpdateDTO) => updateRecordStatus(dto)"
              @cancel_create_record_status="toggleDisplayDrawer()"
          />

          <record-status-dialog-component
              :display="displayDialog"
              @cancel_delete_record_status="toggleDisplayDialog()"
              @delete_record_status="(dto: RecordStatusDTO) => removeRecordStatus(dto.id)"
          />

          <record-status-alert-component
              :display="displayAlert"
              :alertType="alertTypeDTO"
          />


        </v-sheet>

      </v-col>

    </v-row>



  </v-container>
</template>

<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: 'bg-blue-lighten-5'
  },
});

import Store from "./client/store";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "@vue/runtime-core";

import RecordStatusTableComponent from './client/components/record-status-table-component/index.vue';
import RecordStatusDrawerComponent from './client/components/record-status-drawer-component/index.vue';
import RecordStatusDialogComponent from './client/components/record-status-dialog-component/index.vue';
import RecordStatusAlertComponent from './client/components/record-status-alert-component/index.vue';

import EventBus from "./client/engines/event-bus";
import {RecordStatusStoreEventTypesConstants} from "./client/store/record-status-store/constants/record-status-store-event-types.constants";
import {RecordStatusAlertComponentConstants} from "./client/components/record-status-alert-component/constants/record-status-alert-component.constants";
import type {RequestRecordStatusAddDTO} from "./client/integration/record-status/core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "./client/integration/record-status/core/dtos/request-record-status-update.dto";
import type {RecordStatusDTO} from "./client/integration/record-status/core/dtos/record-status.dto";
import type {RecordStatusAlertComponentDTO} from "./client/components/record-status-alert-component/dto/record-status-alert-component.dto";
import {RecordStatusTableComponentColumnConstants} from "./client/components/record-status-table-component/constants/record-status-table-component-column.constants";

const recordStatusStore = Store.useRecordStatusStore();
const { recordStatusCollection, recordStatusStatesCollection} = storeToRefs(recordStatusStore);
const { addRecordStatus, updateRecordStatus, removeRecordStatus, getAllRecordStatus} = recordStatusStore;

const displayDrawer = ref(false);
const displayDialog = ref(false);
const displayAlert = ref(false);

const alertTypeDTO = ref< RecordStatusAlertComponentDTO | null>(null);

//TODO - MOve this to a store or internally within the component
const recordStatusTableHeader = ref<string[] | null>([
  RecordStatusTableComponentColumnConstants.ID,
  RecordStatusTableComponentColumnConstants.TITLE,
  RecordStatusTableComponentColumnConstants.STATUS,
  RecordStatusTableComponentColumnConstants.ACTIONS,
]);

function toggleDisplayDrawer(): void {
  displayDrawer.value = !displayDrawer.value;
}

function toggleDisplayDialog(): void {
  displayDialog.value = !displayDialog.value;
}

function showAlert(): void {

  alertTypeDTO.value = <RecordStatusAlertComponentDTO>{
    type: RecordStatusAlertComponentConstants.SUCCESS,
    title: 'yeh',
    text: 'mekie'
  };

  displayAlert.value = true;
}

onBeforeMount(async () => {

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_ADD_OR_UPDATE_SUCCESS, () => {
    toggleDisplayDrawer();
    showAlert();

  });

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_REMOVE_SUCCESS, () => {
    toggleDisplayDialog();
    showAlert();

  });

});


</script>
