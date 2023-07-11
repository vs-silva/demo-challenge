import ValidationEngine from "../../../engines/validation-engine";
export const RequestRecordStatusIdValidationSchema = ValidationEngine.number().positive().required();
