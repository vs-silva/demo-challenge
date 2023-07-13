<template>
  <div>
    <record-status-table-component
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
    />

  </div>
</template>

<script setup lang="ts">
import Store from "./client/store";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "@vue/runtime-core";

import RecordStatusTableComponent from './client/components/record-status-table-component/index.vue';
import RecordStatusDrawerComponent from './client/components/record-status-drawer-component/index.vue';
import RecordStatusDialogComponent from './client/components/record-status-dialog-component/index.vue';
import EventBus from "./client/engines/event-bus";
import {RecordStatusStoreEventTypesConstants} from "./client/store/record-status-store/constants/record-status-store-event-types.constants";
import type {RequestRecordStatusAddDTO} from "./client/integration/record-status/core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "./client/integration/record-status/core/dtos/request-record-status-update.dto";

const recordStatusStore = Store.useRecordStatusStore();
const { recordStatusCollection, recordStatusStatesCollection} = storeToRefs(recordStatusStore);
const { addRecordStatus, updateRecordStatus} = recordStatusStore;

const displayDrawer = ref(false);
const displayDialog = ref(false);

function toggleDisplayDrawer(): void {
  displayDrawer.value = !displayDrawer.value;
}

function toggleDisplayDialog(): void {
  displayDialog.value = !displayDialog.value;
}

onBeforeMount(async () => {

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_ADD_OR_UPDATE_SUCCESS, () => {
    toggleDisplayDrawer();
  });

});


</script>
