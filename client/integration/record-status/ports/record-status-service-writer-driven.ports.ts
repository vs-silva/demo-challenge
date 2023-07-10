import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import type {RecordStatusEntity} from "../core/entities/record-status.entity";

export interface RecordStatusServiceWriterDrivenPorts {
    save(dto: RequestRecordStatusAddDTO): Promise<RecordStatusEntity | null>;
    remove(id: number): Promise<RecordStatusEntity | null>;
}
