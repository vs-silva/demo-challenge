<template>
  <div class="record-status-table-component-container" data-testid="record-status-table-component-container">

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
                   @click.prevent="() => emit(RecordStatusTableComponentEventTypeConstants.EDIT_RECORD_STATUS, recordStatus)"
            >
              Edit
            </v-btn> |
            <v-btn variant="text"
                   data-testid="record-status-table-component-body-row-delete-option"
                   @click.prevent="() => emit(RecordStatusTableComponentEventTypeConstants.DELETE_RECORD_STATUS, recordStatus)"
            >
              Delete
            </v-btn>
          </td>

        </tr>
      </tbody>
    </v-table>

  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";
import { RecordStatusTableComponentEventTypeConstants} from "./constants/record-status-table-component-event-type.constants";

  const emit = defineEmits([RecordStatusTableComponentEventTypeConstants.EDIT_RECORD_STATUS, RecordStatusTableComponentEventTypeConstants.DELETE_RECORD_STATUS]);

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
