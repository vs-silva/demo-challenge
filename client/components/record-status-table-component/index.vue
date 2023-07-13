<template>
  <div data-testid="record-status-table-component-container">

    <div class="pr-6 pl-6 pt-6" data-testid="record-status-table-component-table-header-container">
      <h4 class="d-inline-block text-h4" data-testid="record-status-table-component-table-header-title">Table Title</h4>
      <v-btn variant="outlined" class="d-inline-block float-right" data-testid="record-status-table-component-table-header-toggle"
             @click.prevent="() => emit(RecordStatusTableComponentEventTypeConstants.CREATE_ROW_CONTENT)"
      >Create</v-btn>
    </div>
    <div class="pl-4 pr-4">
      <v-table data-testid="record-status-table-component-table">
        <thead data-testid="record-status-table-component-head">
        <tr data-testid="record-status-table-component-head-row">
          <th v-for="tableHeader in recordStatusTableHeader" :key="tableHeader.toString()" class="text-left" data-testid="record-status-table-component-head-column">
            {{tableHeader}}
          </th>
        </tr>
        </thead>
        <tbody data-testid="record-status-table-component-body">
        <tr v-for="recordStatus in recordStatusTableContent" :key="recordStatus.id" :id="recordStatus.id.toString()" class="text-left" data-testid="record-status-table-component-body-row">
          <td>{{recordStatus.id}}</td>
          <td>{{recordStatus.title}}</td>
          <td>{{recordStatus.status}}</td>
          <td>
            <v-btn variant="text"
                   data-testid="record-status-table-component-body-row-edit-option"
                   @click.prevent="() => {
                     emit(RecordStatusTableComponentEventTypeConstants.EDIT_ROW_CONTENT);
                     EventBus.emit(RecordStatusStoreEventTypesConstants.RECORD_STATUS_EDIT,recordStatus);
                   }"
            >
              Edit
            </v-btn> |
            <v-btn
                variant="text"
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

</script>

<style scoped>

</style>
