import type {RecordStatusServiceDriverPorts} from "./ports/record-status-service-driver.ports";
import type {RecordStatusServiceWriterDrivenPorts} from "./ports/record-status-service-writer-driven.ports";
import type {RecordStatusDTO} from "./core/dtos/record-status.dto";
import type {RequestRecordStatusAddDTO} from "./core/dtos/request-record-status-add.dto";

export function RecordStatusService(writer: RecordStatusServiceWriterDrivenPorts): RecordStatusServiceDriverPorts {

    async function addRecordStatus(dto: RequestRecordStatusAddDTO): Promise<RecordStatusDTO | null> {

        const entity = await writer.save(dto);

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
      addRecordStatus
    };
}
