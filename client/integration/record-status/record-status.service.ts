import type {RecordStatusServiceDriverPorts} from "./ports/record-status-service-driver.ports";
import type {RecordStatusServiceWriterDrivenPorts} from "./ports/record-status-service-writer-driven.ports";
import type {RecordStatusServiceReaderDrivenPorts} from "./ports/record-status-service-reader-driven.ports";
import type {RecordStatusDTO} from "./core/dtos/record-status.dto";
import type {RequestRecordStatusAddDTO} from "./core/dtos/request-record-status-add.dto";
import type {RequestRecordStatusUpdateDTO} from "./core/dtos/request-record-status-update.dto";

export function RecordStatusService(writer: RecordStatusServiceWriterDrivenPorts, reader: RecordStatusServiceReaderDrivenPorts): RecordStatusServiceDriverPorts {

    async function addRecordStatus(dto: RequestRecordStatusAddDTO): Promise<RecordStatusDTO | null> {

        if(!dto.title.trim() || !dto.status.trim()) {
            return null;
        }

        const entity = await writer.save({
            title: dto.title,
            status: dto.status
        });

        if(!entity) {
            return null;
        }

        return <RecordStatusDTO> {
          id: entity.id,
          status: entity.status,
          title: entity.title
        };
    }

    async function removeRecordStatus(id: number): Promise<RecordStatusDTO | null> {

        if(!id.toString().trim() || !(id > 0)) {
            return null;
        }

        const entity = await writer.remove(id);

        if(!entity) {
            return null;
        }

        return <RecordStatusDTO> {
            id: entity.id,
            status: entity.status,
            title: entity.title
        };

    }

    async function updateRecordStatus(dto: RequestRecordStatusUpdateDTO): Promise<RecordStatusDTO | null> {

        if(!dto.id.toString().trim() || !dto.title.trim() || !dto.status.trim()) {
            return null;
        }

        const entity = await writer.save({
            id: dto.id,
            title: dto.title,
            status: dto.status
        });

        if(!entity) {
            return null;
        }

        return <RecordStatusDTO> {
            id: entity.id,
            status: entity.status,
            title: entity.title
        };

    }

    async function getAllRecordStatus(): Promise<RecordStatusDTO[] | null> {

        const entities = await reader.get();

        if(!entities) {
            return null;
        }

        return entities.map(entity => (<RecordStatusDTO>{
            id: entity.id,
            title: entity.title,
            status: entity.status
        }));
    }

    async function getRecordStatusById(id: number): Promise<RecordStatusDTO | null> {

        const entity = await reader.getById(id);

        if(!entity) {
            return null;
        }

        return <RecordStatusDTO> {
            id: entity.id,
            status: entity.status,
            title: entity.title
        };
    }

    return {
      addRecordStatus,
      removeRecordStatus,
      updateRecordStatus,
      getAllRecordStatus,
      getRecordStatusById
    };
}
