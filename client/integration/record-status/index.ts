import {RecordStatusService} from "./record-status.service";
import {RecordStatusInMemoryArrayWriterAdapter} from "./adapters/record-status-in-memory-array-writer.adapter";
import {RecordStatusInMemoryArrayReaderAdapter} from "./adapters/record-status-in-memory-array-reader.adapter";

export default RecordStatusService(RecordStatusInMemoryArrayWriterAdapter(), RecordStatusInMemoryArrayReaderAdapter());
