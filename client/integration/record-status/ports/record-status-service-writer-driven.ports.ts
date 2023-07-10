import type {RecordStatusEntity} from "../core/entities/record-status.entity";
import type {RequestRecordStatusDTO} from "../core/dtos/request-record-status.dto";

export interface RecordStatusServiceWriterDrivenPorts {
    save(dto: RequestRecordStatusDTO): Promise<RecordStatusEntity | null>;
    remove(id: number): Promise<RecordStatusEntity | null>;
}
