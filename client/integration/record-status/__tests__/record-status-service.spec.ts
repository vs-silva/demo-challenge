import {describe, expect, it, vi, beforeEach} from "vitest";
import {faker} from "@faker-js/faker";
import {RecordStatusConstants} from "../core/constants/record-status.constants";
import RecordStatus from "../index";
import type {RequestRecordStatusAddDTO} from "../core/dtos/request-record-status-add.dto";
import type {RecordStatusDTO} from "../core/dtos/record-status.dto";
import type {RequestRecordStatusUpdateDTO} from "../core/dtos/request-record-status-update.dto";

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

    describe('updateRecordStatus port tests', () => {

        it('updateRecordStatus should take a RequestRecordStatusUpdateDTO update an existent RecordStatus on the DataProvider and return RecordStatusDTO', async () => {

            const fakeRecordDTO: RequestRecordStatusAddDTO = {
                title: faker.word.words(10),
                status: RecordStatusConstants.DRAFT
            };

            const createdRecordStatus = await RecordStatus.addRecordStatus(fakeRecordDTO);

            expect(createdRecordStatus).toBeTruthy();

            const fakeUpdateRecordStatusDTO: RequestRecordStatusUpdateDTO = {
                id: createdRecordStatus?.id as number,
                title: faker.word.words(5),
                status: RecordStatusConstants.PUBLISHED
            };

            const spy = vi.spyOn(RecordStatus, 'updateRecordStatus');
            const result = await RecordStatus.updateRecordStatus(fakeUpdateRecordStatusDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeUpdateRecordStatusDTO);

            expect(result).toStrictEqual(expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            }));

        });

        it('updateRecordStatus should return null if required RequestRecordStatusUpdateDTO fields are not provided', async () => {

            const fakeUpdateRecordStatusDTO: RequestRecordStatusUpdateDTO = {
                id: 1,
                title: faker.word.words(5),
                status: ' '
            };

            const spy = vi.spyOn(RecordStatus, 'updateRecordStatus');
            const result = await RecordStatus.updateRecordStatus(fakeUpdateRecordStatusDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeUpdateRecordStatusDTO);

            expect(result).toBeNull();
        });

        it('updateRecordStatus should return null if non existent RecordStatus id is provided in the RequestRecordStatusUpdateDTO', async () => {

            const fakeUpdateRecordStatusDTO: RequestRecordStatusUpdateDTO = {
                id: faker.number.int({min: 999, max: 9999}),
                title: faker.word.words(5),
                status: RecordStatusConstants.PUBLISHED
            };

            const spy = vi.spyOn(RecordStatus, 'updateRecordStatus');
            const result = await RecordStatus.updateRecordStatus(fakeUpdateRecordStatusDTO);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeUpdateRecordStatusDTO);

            expect(result).toBeNull();
        });

    });

    describe('getAllRecordStatus port tests', () => {

        beforeEach(async  () => {
            const result = await RecordStatus.getAllRecordStatus();

            if(!result) {
                return;
            }

            for (const recordStatusDTO of result) {
                await RecordStatus.removeRecordStatus(recordStatusDTO.id);
            }
        });

        it('getAllRecordStatus it should return a collection of RecordStatusDTOs', async () => {

            const fakeRecordDTO: RequestRecordStatusAddDTO = {
                title: faker.word.words(10),
                status: RecordStatusConstants.DRAFT
            };

            await RecordStatus.addRecordStatus(fakeRecordDTO);

            const spy = vi.spyOn(RecordStatus, 'getAllRecordStatus');
            const result = await RecordStatus.getAllRecordStatus();

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith();

            expect(result).toBeTruthy();

            expect(result).toStrictEqual(expect.arrayContaining(<RecordStatusDTO[]>[expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            })]));

        });

        it('getAllRecordStatus it should return null if no item exist in the data provider', async () => {

            const spy = vi.spyOn(RecordStatus, 'getAllRecordStatus');
            const result = await RecordStatus.getAllRecordStatus();

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith();

            expect(result).toBeNull();

        });

    });

    describe('getRecordStatusById port tests', () => {

        it('getRecordStatusById it should take a RecordStatus id and return a RecordStatusDTO', async () => {

            const fakeRecordDTO: RequestRecordStatusAddDTO = {
                title: faker.word.words(10),
                status: RecordStatusConstants.DRAFT
            };

            const createdRecordStatus = await RecordStatus.addRecordStatus(fakeRecordDTO);

            const spy = vi.spyOn(RecordStatus, 'getRecordStatusById');
            const result = await RecordStatus.getRecordStatusById(createdRecordStatus?.id as number);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(createdRecordStatus?.id as number);

            expect(result).toBeTruthy();

            expect(result).toStrictEqual(expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            }));

        });

        it('getRecordStatusById it should return null if no item exist in the data provider with the provided fake id', async () => {

            const fakeId = faker.number.int({min: 999, max: 9999});

            const spy = vi.spyOn(RecordStatus, 'getRecordStatusById');
            const result = await RecordStatus.getRecordStatusById(fakeId);

            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith(fakeId);

            expect(result).toBeNull();

        });

    });

});
