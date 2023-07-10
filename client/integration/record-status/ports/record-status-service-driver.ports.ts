import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import type {RecordStatusDTO} from "../core/dtos/record-status.dto";
import type {RequestRecordStatusUpdateDTO} from "../core/dtos/request-record-status-update.dto";

export interface RecordStatusServiceDriverPorts {
    addRecordStatus(dto: RequestRecordStatusAddDTO): Promise<RecordStatusDTO | null>;
    removeRecordStatus(id: number): Promise<RecordStatusDTO | null>;
    updateRecordStatus(dto: RequestRecordStatusUpdateDTO): Promise<RecordStatusDTO | null>;
    getAllRecordStatus():Promise<RecordStatusDTO[] | null>;
    getRecordStatusById(id: number): Promise<RecordStatusDTO | null>;
}
