<template>
  <div data-testid="main-page-container">
    <v-sheet class="d-flex justify-center pt-10 bg-blue-lighten-5">

      <record-status-table-component
        :record-status-table-header="recordStatusDataColumns as string[]"
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
          :alertType="alertTypeDTO"
      />

    </v-sheet>

  </div>
</template>

<script setup lang="ts">
import Store from "../../store";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "@vue/runtime-core";

import EventBus from "../../engines/event-bus";
import {RecordStatusStoreEventTypesConstants} from "../../store/record-status-store/constants/record-status-store-event-types.constants";
import {RecordStatusAlertComponentConstants} from "../../components/record-status-alert-component/constants/record-status-alert-component.constants";

import RecordStatusTableComponent from '../../components/record-status-table-component/index.vue';
import RecordStatusDrawerComponent from '../../components/record-status-drawer-component/index.vue';
import RecordStatusDialogComponent from '../../components/record-status-dialog-component/index.vue';
import RecordStatusAlertComponent from '../../components/record-status-alert-component/index.vue';

import type {RequestRecordStatusUpdateDTO} from "../../integration/record-status/core/dtos/request-record-status-update.dto";
import type {RequestRecordStatusAddDTO} from "../../integration/record-status/core/dtos/request-record-status-add.dto";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";
import type {RecordStatusAlertComponentDTO} from "../../components/record-status-alert-component/dto/record-status-alert-component.dto";

const recordStatusStore = Store.useRecordStatusStore();

const {
  recordStatusDataColumns,
  recordStatusCollection,
  recordStatusStatesCollection,
} = storeToRefs(recordStatusStore);

const {
  addRecordStatus,
  updateRecordStatus,
  removeRecordStatus
} = recordStatusStore;

const displayDrawer = ref(false);
const displayModal = ref(false);
const displayDialog = ref(false);
const alertTypeDTO = ref< RecordStatusAlertComponentDTO | null>(null);

function toggleDisplayDrawer(): void {
  displayDrawer.value = !displayDrawer.value;
}

function toggleDisplayModal(): void {
  displayModal.value = !displayModal.value;
}

function toggleDisplayDialog(): void {
  displayDialog.value = !displayDialog.value;
}

function showAlert(dto: RecordStatusAlertComponentDTO): void {

  alertTypeDTO.value = <RecordStatusAlertComponentDTO>{
    type: dto.type,
    title: dto.title,
    text: dto.text
  };
}

onBeforeMount(async () => {

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_ADD_SUCCESS, () => {
    toggleDisplayDrawer();

    showAlert({
      type: RecordStatusAlertComponentConstants.SUCCESS,
      title: 'Success add',
      text: 'Record Status added with success'
    });

  });

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_UPDATE_SUCCESS, () => {
    toggleDisplayDrawer();

    showAlert({
      type: RecordStatusAlertComponentConstants.SUCCESS,
      title: 'Success update',
      text: 'Record Status updated with success'
    });

  });

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_REMOVE_SUCCESS, () => {
    toggleDisplayDialog();

    showAlert({
      type: RecordStatusAlertComponentConstants.SUCCESS,
      title: 'Success remove',
      text: 'Record Status removed with success'
    });
  });

});

</script>

<style scoped>

</style>
