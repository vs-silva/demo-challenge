import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import type {RecordStatusDTO} from "../core/dtos/record-status.dto";

export interface RecordStatusServiceDriverPorts {
    addRecordStatus(dto: RequestRecordStatusAddDTO): Promise<RecordStatusDTO | null>;
}
