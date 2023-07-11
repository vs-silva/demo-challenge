import ValidationEngine from "../../../engines/validation-engine";

export const RequestRecordStatusRemoveValidationSchema = ValidationEngine.number().positive().required();
