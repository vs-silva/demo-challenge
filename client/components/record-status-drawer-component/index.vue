<template>
  <div data-testid="record-status-drawer-component-container">
    <v-layout>
      <v-navigation-drawer
          v-model="display"
          location="right"
          temporary
          data-testid="record-status-drawer-component"
          class="pa-4"
          @update:modelValue="handleModelUpdate"
      >

        <v-form ref="form"  data-testid="record-status-drawer-form" @submit.prevent="async (event) => {

          const {valid} = await event;

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
              :disabled="true"
              single-line
              density="compact"
              variant="underlined"
              data-testid="record-status-drawer-form-id-field"
          ></v-text-field>

          <v-text-field
              v-model="recordStatusTitle"
              :rules="recordStatusTitleRules"
              label="Title"
              variant="underlined"
              type="input"
              hint="Please insert a title"
              single-line
              density="compact"
              clearable
              data-testid="record-status-drawer-form-title-field"
              class="mb-4"
          ></v-text-field>

          <v-select
              v-model="recordSelectedStatus"
              :items="props.recordStatusSelectOptions"
              label="Status"
              density="compact"
              :rules="recordStatusOptionRules"
              data-testid="record-status-drawer-form-status-select-field"
              variant="underlined"
              class="mb-4"
          ></v-select>

          <v-btn
              type="submit"
              color="success"
              inline-block
              data-testid="record-status-drawer-form-submit-option"
              size="small"
              variant="outlined"
              class="text-sm-caption"
          >Submit</v-btn>

          <v-btn
              color="error"
              inline-block
              data-testid="record-status-drawer-form-cancel-option"
              size="small"
              variant="outlined"
              class="float-right text-sm-caption"
              @click.prevent="handleCancel"
          >Cancel</v-btn>

        </v-form>

      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref, watch} from "@vue/runtime-core";
import EventBus from "../../engines/event-bus";
import {RecordStatusDrawerComponentEventTypeConstants} from "./constants/record-status-drawer-component-event-type.constants";
import {RecordStatusStoreEventTypesConstants} from "../../store/record-status-store/constants/record-status-store-event-types.constants";
import type {RequestRecordStatusAddDTO} from "../../integration/record-status/core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "../../integration/record-status/core/dtos/request-record-status-update.dto";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";
import TitleRules from './validation-rules/title-rules';
import StatusRules from './validation-rules/status-rules';

const form = ref();
const display = ref(false);
const recordStatusId = ref('');
const recordStatusTitle = ref('');
const recordSelectedStatus = ref('');

const recordStatusTitleRules = ref([
  TitleRules.required,
  TitleRules.counter,
]);

const recordStatusOptionRules = ref([
  StatusRules.required,
]);


const emit = defineEmits([
  RecordStatusDrawerComponentEventTypeConstants.CREATE_RECORD_STATUS,
  RecordStatusDrawerComponentEventTypeConstants.EDIT_RECORD_STATUS,
  RecordStatusDrawerComponentEventTypeConstants.CANCEL_CREATE_RECORD_STATUS
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

watch(
    () => props.display,
    () => display.value = props.display
);

function clearFormFields(): void {
  recordStatusId.value = '';
  recordStatusTitle.value = '';
  recordSelectedStatus.value = '';
}

function resetForm(): void {
  form.value.reset();
  form.value.resetValidation();
}

function handleCancel(): void {
  resetForm();
  clearFormFields();
  emit(RecordStatusDrawerComponentEventTypeConstants.CANCEL_CREATE_RECORD_STATUS);
}

function handleModelUpdate() {
  handleCancel();
}

onBeforeMount(() => {
  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_ADD_SUCCESS, () => {
    clearFormFields();
    resetForm();
  });

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_UPDATE_SUCCESS, () => {
    clearFormFields();
    resetForm();
  });

  EventBus.on(RecordStatusStoreEventTypesConstants.RECORD_STATUS_EDIT, (payload) => {
    const recordStatusDTO = payload as RecordStatusDTO;
    recordStatusId.value = recordStatusDTO.id.toString();
    recordStatusTitle.value = recordStatusDTO.title;
    recordSelectedStatus.value = recordStatusDTO.status;
  });
});

</script>

<style scoped>

</style>
