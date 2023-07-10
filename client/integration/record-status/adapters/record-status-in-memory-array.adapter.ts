import type {RecordStatusServiceWriterDrivenPorts} from "../ports/record-status-service-writer-driven.ports";
import type {RecordStatusEntity} from "../core/entities/record-status.entity";
import type {RequestRecordStatusDTO} from "../core/dtos/request-record-status.dto";
import DataProvider from "../../../engines/data-provider";

export function RecordStatusInMemoryArrayAdapter(): RecordStatusServiceWriterDrivenPorts {

    let counter = 0;
    const engine = DataProvider;

    async function save(dto: RequestRecordStatusDTO): Promise<RecordStatusEntity | null> {

        if(dto.id) {
            return updateExistentRecordStatus(dto);
        }

        return addNewRecordStatus(dto);
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

    function addNewRecordStatus(dto: RequestRecordStatusDTO): RecordStatusEntity | null {

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

    function updateExistentRecordStatus(dto: RequestRecordStatusDTO): RecordStatusEntity | null {

        const totalRecordStatuses = engine.length;

        const entity = engine.find(entity => entity.id === dto.id);

        if(!entity) {
            return null;
        }

        entity.title = dto.title;
        entity.status = dto.status;

        if(engine.length !== totalRecordStatuses) {
            return null;
        }

        return entity;
    }


    return {
        save,
        remove
    };
}
