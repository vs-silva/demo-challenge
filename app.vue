<template>
  <div>
    <record-status-table-component
        @create-row-content="displayDrawer = !displayDrawer"
        :recordStatusTableContent="recordStatusCollection"
    />

    <record-status-drawer-component
        :display="displayDrawer"
        :recordStatusSelectOptions="recordStatusStatesCollection as string[]"
        @create_record_status="(dto: RequestRecordStatusAddDTO) => addRecordStatus(dto)"
        @cancel_create_record_status="displayDrawer = !displayDrawer"
    />

  </div>
</template>

<script setup lang="ts">
import Store from "./client/store";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "@vue/runtime-core";

import RecordStatusTableComponent from './client/components/record-status-table-component/index.vue';
import RecordStatusDrawerComponent from './client/components/record-status-drawer-component/index.vue';
import type {RequestRecordStatusAddDTO} from "./client/integration/record-status/core/dtos/request-record-status-add.dto";
import EventBus from "./client/engines/event-bus";
import {RecordStatusStoreEventTypesConstants} from "./client/store/record-status-store/constants/record-status-store-event-types.constants";

const recordStatusStore = Store.useRecordStatusStore();
const { recordStatusCollection, recordStatusStatesCollection} = storeToRefs(recordStatusStore);
const { addRecordStatus } = recordStatusStore;

const displayDrawer = ref(false);

onBeforeMount(async () => {

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_ADD_OR_UPDATE_SUCCESS, () => {
    displayDrawer.value = !displayDrawer.value;
  });


});


</script>
