import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {RecordStatusConstants} from "../core/constants/record-status.constants";
import RecordStatus from "../index";
import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import type {RecordStatusDTO} from "../core/dtos/record-status.dto";

describe('RecordStatus service tests', () => {

    const statusRegex = /^(draft|published|pending)$/i;

    describe('addRecordStatus port tests', () => {

        it('addRecordStatus should take a RequestRecordStatusAddDTO, add it to the data provider and return RecordStatusDTO', async () => {

            const fakeRecordDTO: RequestRecordStatusAddDTO = {
                title: faker.word.words(10),
                status: RecordStatusConstants.DRAFT
            };

            const spy = vi.spyOn(RecordStatus, 'addRecordStatus');
            const result = await RecordStatus.addRecordStatus(fakeRecordDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeRecordDTO);

            expect(result).not.toBeNull();

            expect(result).toStrictEqual(expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            }));

        });

    });


});
