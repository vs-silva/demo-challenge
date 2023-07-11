import {ref} from "@vue/runtime-core";
import type {RecordStatusDTO} from "../../integration/record-status/core/dtos/record-status.dto";
import type {RequestRecordStatusAddDTO} from "../../integration/record-status/core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "../../integration/record-status/core/dtos/request-record-status-update.dto";
import {RequestRecordStatusAddUpdateDtoValidationSchema} from "./schema-validation/request-record-status-add-update-dto-validation.schema";
import {RequestRecordStatusIdValidationSchema} from "./schema-validation/request-record-status-id-validation.schema";
import RecordStatus from "../../integration/record-status";

export const RecordStatusStoreIdentifier = 'record-status-store';

export function RecordStatusStore() {

    const recordStatusCollection = ref<RecordStatusDTO[] | null>(null);
    const recordStatus = ref<RecordStatusDTO | null>(null);
    const recordStatusEdit = ref<RecordStatusDTO | null>(null);
    const validationErrorMessage = ref<string | null>(null);
    const recordStatusAdded = ref<boolean>(false);
    const recordStatusRemoved = ref<boolean>(false);
    const recordStatusUpdated = ref<boolean>(false);

    async function validateRecordStatus(dto: RequestRecordStatusAddDTO | RequestRecordStatusUpdateDTO): Promise<RequestRecordStatusAddDTO | RequestRecordStatusUpdateDTO | null> {

        try {
            validationErrorMessage.value = null;
            return await RequestRecordStatusAddUpdateDtoValidationSchema.validateAsync(dto) as RequestRecordStatusAddDTO | RequestRecordStatusUpdateDTO;
        } catch (error) {
            handleValidationError(error as {details: object[], message: string});
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

            await RequestRecordStatusIdValidationSchema.validateAsync(id);

            const recordStatusDTO = await RecordStatus.removeRecordStatus(id);

            if(!recordStatusDTO) {
                return;
            }

            recordStatusRemoved.value = true;
            recordStatusCollection.value = null;
            recordStatusCollection.value = await RecordStatus.getAllRecordStatus();

        } catch (error) {
            handleValidationError(error as {details: object[], message: string});
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

    async function getRecordStatusById(id: number):Promise<void> {

        try {
            await RequestRecordStatusIdValidationSchema.validateAsync(id);
            recordStatus.value = await RecordStatus.getRecordStatusById(id);
        } catch (error) {
            recordStatus.value = null;
            handleValidationError(error as {details: object[], message: string});
        }

    }

    function handleValidationError(error: {details: object[], message: string}): void {
        const {message} = error;
        validationErrorMessage.value = message;
        return;
    }

    function enableRecordStatusEdit(dto: RecordStatusDTO): void {
        recordStatusEdit.value = dto;
    }

    return {
        recordStatusCollection,
        recordStatus,
        recordStatusEdit,
        validationErrorMessage,
        recordStatusAdded,
        recordStatusUpdated,
        validateRecordStatus,
        addRecordStatus,
        removeRecordStatus,
        updateRecordStatus,
        getAllRecordStatus,
        getRecordStatusById,
        enableRecordStatusEdit
    };
}
