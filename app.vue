<template>
  <div>
    <record-status-drawer-component :display="displayDrawer"/>

  </div>
</template>

<script setup lang="ts">
import Store from "./client/store";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "@vue/runtime-core";

import RecordStatusDrawerComponent from './client/components/record-status-drawer-component/index.vue';

const recordStatusStore = Store.useRecordStatusStore();
const { recordStatusCollection } = storeToRefs(recordStatusStore);
const { getAllRecordStatus } = recordStatusStore;

const displayDrawer = ref(true);

onBeforeMount(async () => {
  await getAllRecordStatus();

  console.log(recordStatusCollection.value);
});

</script>
