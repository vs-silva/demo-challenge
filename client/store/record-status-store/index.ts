import {ref} from "@vue/runtime-core";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";
import type {RequestRecordStatusAddDTO} from "../../integration/record-status/core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "../../integration/record-status/core/dtos/request-record-status-update.dto";
import {RequestRecordStatusAddUpdateDtoValidationSchema} from "./schema-validation/request-record-status-add-update-dto-validation.schema";
import {RequestRecordStatusRemoveValidationSchema} from "./schema-validation/request-record-status-remove-validation.schema";
import RecordStatus from "../../integration/record-status";

export const RecordStatusStoreIdentifier = 'record-status-store';

export function RecordStatusStore() {

    const recordStatusCollection = ref<RecordStatusDTO[] | null>(null);
    const validationErrorMessage = ref<string | null>(null);
    const recordStatusAdded = ref<boolean>(false);
    const recordStatusRemoved = ref<boolean>(false);
    const recordStatusUpdated = ref<boolean>(false);

    async function validateRecordStatus(dto: RequestRecordStatusAddDTO | RequestRecordStatusUpdateDTO): Promise<RequestRecordStatusAddDTO | RequestRecordStatusUpdateDTO | null> {

        try {
            validationErrorMessage.value = null;
            return await RequestRecordStatusAddUpdateDtoValidationSchema.validateAsync(dto) as RequestRecordStatusAddDTO | RequestRecordStatusUpdateDTO;
        } catch (error) {
            const {message} = (error as {details: object[], message: string});
            validationErrorMessage.value = message;
            return null;
        }
    }

    async function addRecordStatus(dto: RequestRecordStatusAddDTO): Promise<void> {

        recordStatusAdded.value = false;
        const validationResult = await validateRecordStatus(dto);

        if(!validationResult) {
            return;
        }

        const recordStatusDTO = await RecordStatus.addRecordStatus(dto);

        if(!recordStatusDTO) {
            return;
        }

        recordStatusAdded.value = true;
        recordStatusCollection.value = null;
        recordStatusCollection.value = await RecordStatus.getAllRecordStatus();
    }

    async function removeRecordStatus(id: number): Promise<void> {

        try {
            recordStatusRemoved.value = false;

            await RequestRecordStatusRemoveValidationSchema.validateAsync(id);

            const recordStatusDTO = await RecordStatus.removeRecordStatus(id);

            if(!recordStatusDTO) {
                return;
            }

            recordStatusRemoved.value = true;
            recordStatusCollection.value = null;
            recordStatusCollection.value = await RecordStatus.getAllRecordStatus();

        } catch (error) {
            const {message} = (error as {details: object[], message: string});
            validationErrorMessage.value = message;
            return;

        }

    }

    async function updateRecordStatus(dto: RequestRecordStatusUpdateDTO): Promise<void> {

        recordStatusUpdated.value = false;
        const validationResult = await validateRecordStatus(dto);

        if(!validationResult) {
            return;
        }

        const recordStatusDTO = await RecordStatus.updateRecordStatus(dto);

        if(!recordStatusDTO) {
            return;
        }

        recordStatusUpdated.value = true;
        recordStatusCollection.value = null;
        recordStatusCollection.value = await RecordStatus.getAllRecordStatus();
    }

    async function getAllRecordStatus(): Promise<void> {
        recordStatusCollection.value = await RecordStatus.getAllRecordStatus();
    }


    return {
        recordStatusCollection,
        validationErrorMessage,
        recordStatusAdded,
        recordStatusUpdated,
        validateRecordStatus,
        addRecordStatus,
        removeRecordStatus,
        updateRecordStatus,
        getAllRecordStatus
    };
}
