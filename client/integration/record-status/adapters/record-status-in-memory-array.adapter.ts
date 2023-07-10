import type {RecordStatusServiceWriterDrivenPorts} from "../ports/record-status-service-writer-driven.ports";
import type {RecordStatusEntity} from "../core/entities/record-status.entity";
import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import DataProvider from "../../../engines/data-provider";

export function RecordStatusInMemoryArrayAdapter(): RecordStatusServiceWriterDrivenPorts {

    let counter = 0;
    const engine = DataProvider;

    async function save(dto: RequestRecordStatusAddDTO): Promise<RecordStatusEntity | null> {

        const totalRecordStatuses = engine.length;

        const recordStatusEntity: RecordStatusEntity = {
            id: counter++,
            title: dto.title,
            status: dto.status
        }

        engine.push(recordStatusEntity);

        if(engine.length === totalRecordStatuses) {
            return null;
        }

        return recordStatusEntity;

    }

    return {
        save
    };
}
