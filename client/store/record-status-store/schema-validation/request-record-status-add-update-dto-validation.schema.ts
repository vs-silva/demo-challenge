import ValidationEngine from "../../../engines/validation-engine";
import {RecordStatusConstants} from "../../../integration/record-status/core/constants/record-status.constants";

export const RequestRecordStatusAddUpdateDtoValidationSchema = ValidationEngine.object({
    title: ValidationEngine.string().min(3).max(20).alphanum().required(),
    status: ValidationEngine.string().valid(`${RecordStatusConstants.DRAFT}`, `${RecordStatusConstants.PUBLISHED}`, `${RecordStatusConstants.PENDING}`).required(),
    id: ValidationEngine.number().positive().optional()
});
