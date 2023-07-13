<template>
  <div data-testid="record-status-table-component-container" class="w-50 elevation-1">

    <div data-testid="record-status-table-component-table-header-container" class="border border-b-0 bg-white pa-4">
      <h4 class="d-inline-block text-h4" data-testid="record-status-table-component-table-header-title">Table Title</h4>
      <v-btn variant="outlined" class="d-inline-block float-right" data-testid="record-status-table-component-table-header-toggle"
             @click.prevent="() => emit(RecordStatusTableComponentEventTypeConstants.CREATE_ROW_CONTENT)"
      >Create</v-btn>
    </div>
    <div class="border" >
      <v-table data-testid="record-status-table-component-table" >
        <thead data-testid="record-status-table-component-head">
        <tr data-testid="record-status-table-component-head-row">
          <th v-for="(tableHeader, index) in recordStatusTableHeader" :key="tableHeader.toString()" :class="`text-left ${ recordStatusTableHeader.length -1 !== index ? 'border-e-sm' : '' }`" data-testid="record-status-table-component-head-column">
            {{tableHeader}}
          </th>
        </tr>
        </thead>
        <tbody data-testid="record-status-table-component-body">
        <tr v-for="recordStatus in recordStatusTableContent" :key="recordStatus.id" :id="recordStatus.id.toString()" class="text-left" data-testid="record-status-table-component-body-row">
          <td class="border-e-sm">{{recordStatus.id}}</td>
          <td class="border-e-sm">{{recordStatus.title}}</td>
          <td class="border-e-sm">
            <v-chip :color="setStatusColor(recordStatus.status)">
              {{recordStatus.status}}
            </v-chip>
          </td>
          <td class="pa-0">
            <v-btn variant="plain"
                   color="blue"
                   class="pa-0"
                   data-testid="record-status-table-component-body-row-edit-option"
                   @click.prevent="() => {
                     emit(RecordStatusTableComponentEventTypeConstants.EDIT_ROW_CONTENT);
                     EventBus.emit(RecordStatusStoreEventTypesConstants.RECORD_STATUS_EDIT,recordStatus);
                   }"
            >
              Edit
            </v-btn> |
            <v-btn
                variant="plain"
                color="blue"
                data-testid="record-status-table-component-body-row-delete-option"
                @click.prevent="() => {
                     emit(RecordStatusTableComponentEventTypeConstants.DELETE_ROW_CONTENT)
                     EventBus.emit(RecordStatusStoreEventTypesConstants.RECORD_STATUS_DELETE,recordStatus);
                }">Delete</v-btn>
          </td>

        </tr>
        </tbody>
      </v-table>
    </div>

  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import EventBus from "../../engines/event-bus";
import { RecordStatusTableComponentEventTypeConstants} from "./constants/record-status-table-component-event-type.constants";
import {RecordStatusStoreEventTypesConstants} from "../../store/record-status-store/constants/record-status-store-event-types.constants";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";

  const emit = defineEmits([
    RecordStatusTableComponentEventTypeConstants.CREATE_ROW_CONTENT,
    RecordStatusTableComponentEventTypeConstants.EDIT_ROW_CONTENT,
    RecordStatusTableComponentEventTypeConstants.DELETE_ROW_CONTENT]);

  defineProps({
    recordStatusTableHeader: {
      type: Array<String>,
      required: false,
      default: () => <string[]>[]
    },
    recordStatusTableContent: {
      type: Array as PropType<RecordStatusDTO[] | null>,
      required: false,
      default: () => null
    }
  });

  function setStatusColor(status: string): string {

    const options =  {
      pending: 'pink',
      draft: 'default',
      published: 'success'
    } as const;

    //@ts-ignore
    return options[status] as string; // TODO: check why this is complaining
  }

</script>

<style scoped>

</style>
