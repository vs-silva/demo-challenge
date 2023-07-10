import type {RecordStatusServiceReaderDrivenPorts} from "../ports/record-status-service-reader-driven.ports";
import type {RecordStatusEntity} from "../core/entities/record-status.entity";
import DataProvider from "../../../engines/data-provider";

export function RecordStatusInMemoryArrayReaderAdapter(): RecordStatusServiceReaderDrivenPorts {

    const engine = DataProvider;

    async function get(): Promise<RecordStatusEntity[] | null> {

        const entities = engine;

        if(!entities.length) {
            return null;
        }

        return entities;

    }

    async function getById(id: number): Promise<RecordStatusEntity | null> {

        const entity = engine.find(entity => entity.id === id);

        if(!entity) {
            return null;
        }

        return entity;
    }

    return {
      get,
      getById
    };
}
