import {RecordStatusService} from "./record-status.service";
import {RecordStatusInMemoryArrayAdapter} from "./adapters/record-status-in-memory-array.adapter";

export default RecordStatusService(RecordStatusInMemoryArrayAdapter());
