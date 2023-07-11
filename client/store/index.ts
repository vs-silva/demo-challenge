import {defineStore} from "pinia";
import {RecordStatusStore, RecordStatusStoreIdentifier} from "./record-status-store";

export default {
    useRecordStatusStore: defineStore(RecordStatusStoreIdentifier, RecordStatusStore)
};
