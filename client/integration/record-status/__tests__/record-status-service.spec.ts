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

        it('addRecordStatus should return null if required fields in RequestRecordStatusAddDTO are empty or not provided', async () => {

            const fakeRecordDTO: RequestRecordStatusAddDTO = {
                title: '   ',
                status: RecordStatusConstants.DRAFT
            };

            const spy = vi.spyOn(RecordStatus, 'addRecordStatus');
            const result = await RecordStatus.addRecordStatus(fakeRecordDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeRecordDTO);

            expect(result).toBeNull();

        });

    });

    describe('removeRecordStatus port tests', () => {

        it('removeRecordStatus should take an RecordStatus id and return RecordStatusDTO if the entity is found and successfully removed from the data provider', async () => {

            const fakeRecordDTO: RequestRecordStatusAddDTO = {
                title: faker.word.words(10),
                status: RecordStatusConstants.DRAFT
            };

            const createdRecordStatus = await RecordStatus.addRecordStatus(fakeRecordDTO);

            expect(createdRecordStatus).toBeTruthy();

            const spy = vi.spyOn(RecordStatus, 'removeRecordStatus');
            const result = await RecordStatus.removeRecordStatus(createdRecordStatus?.id as number);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(createdRecordStatus?.id as number);

            expect(result).toStrictEqual(expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            }));

        });

        it('removeRecordStatus should return null if no RecordStatus id is provided or a falsy id "0" is provided', async () => {

            const fakeRecordStatusId = 0;

            const spy = vi.spyOn(RecordStatus, 'removeRecordStatus');
            const result = await RecordStatus.removeRecordStatus(fakeRecordStatusId);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeRecordStatusId);

            expect(result).toBeNull();

        });

    });


});
