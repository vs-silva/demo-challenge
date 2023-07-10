import type {RecordStatusEntity} from "../core/entities/record-status.entity";

export interface RecordStatusServiceReaderDrivenPorts {
    get(): Promise<RecordStatusEntity[] | null>;
    getById(id: number): Promise<RecordStatusEntity | null>;
}
