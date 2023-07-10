import type {RecordStatusServiceWriterDrivenPorts} from "../ports/record-status-service-writer-driven.ports";
import type {RecordStatusEntity} from "../core/entities/record-status.entity";
import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import DataProvider from "../../../engines/data-provider";

export function RecordStatusInMemoryArrayAdapter(): RecordStatusServiceWriterDrivenPorts {

    let counter = 0;
    const engine = DataProvider;

    async function save(dto: RequestRecordStatusAddDTO): Promise<RecordStatusEntity | null> {

        const totalRecordStatuses = engine.length;

        const entity: RecordStatusEntity = {
            id: counter++,
            title: dto.title,
            status: dto.status
        }

        engine.push(entity);

        if(engine.length === totalRecordStatuses) {
            return null;
        }

        return entity;

    }

    async function remove(id: number): Promise<RecordStatusEntity | null> {

        const totalRecordStatuses = engine.length;

        const entity = engine.find(entity => entity.id === id);

        if(!entity) {
            return null;
        }

        const index = engine.findIndex(entity => entity.id === id);
        engine.splice(index,1);

        if(engine.length === totalRecordStatuses) {
            return null;
        }

        return entity;
    }

    return {
        save,
        remove
    };
}
