import {describe, it, expect, vi, beforeEach} from "vitest";
import {faker} from "@faker-js/faker";
import {createPinia, setActivePinia} from "pinia";
import Store from "../../index";
import {storeToRefs} from "pinia";
import {RecordStatusConstants} from "../../../integration/record-status/core/constants/record-status.constants";
import type {RequestRecordStatusAddDTO} from "../../../integration/record-status/core/dtos/request-record-status-add.dto";
import type {RecordStatusDTO} from "../../../integration/record-status/core/dtos/record-status.dto";
import type {RequestRecordStatusUpdateDTO} from "../../../integration/record-status/core/dtos/request-record-status-update.dto";

describe('RecordStatusStore tests', () => {

    setActivePinia(createPinia());
    const recordStatusStore = Store.useRecordStatusStore();
    const { recordStatusCollection, validationErrorMessage } = storeToRefs(recordStatusStore);

    const statusRegex = /^(draft|published|pending)$/i;

    describe('validateRecordStatus tests', () => {

        const { validateRecordStatus } = recordStatusStore;

        const fakeDTO = <RequestRecordStatusAddDTO>{
            title: faker.word.sample(7),
            status: RecordStatusConstants.DRAFT
        };

        it('RecordStatusStore should contain a validateRecordStatus method', () => {

            const { validateRecordStatus } = recordStatusStore;

            expect(validateRecordStatus).not.toBeNull();
            expect(validateRecordStatus).toBeDefined();
            expect(validateRecordStatus).toBeInstanceOf(Function);

        });

        it('validateRecordStatus should return provided dto if validation has passed successfully', async () => {

            const spy = vi.fn(validateRecordStatus);
            const result = await spy(fakeDTO);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeDTO);

            expect(result?.title).toEqual(fakeDTO.title);
            expect(result?.status).toEqual(fakeDTO.status);

            expect(validationErrorMessage.value).toBeNull();

            expect(result).toStrictEqual(expect.objectContaining(<RequestRecordStatusAddDTO>{
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            }));

        });

        it('validateRecordStatus should return error Object if validation fails', async () => {


            fakeDTO.status = faker.word.words();

            const spy = vi.fn(validateRecordStatus);
            const result = await spy(fakeDTO);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeDTO);

            expect(result).toBeNull();
            expect(validationErrorMessage.value).not.toBeNull();

        });

    });

    describe('addRecordStatus tests', () => {

        const { addRecordStatus } = recordStatusStore;

        it('RecordStatusStore should contain a addRecordStatus method', () => {

            const { addRecordStatus } = recordStatusStore;

            expect(addRecordStatus).not.toBeNull();
            expect(addRecordStatus).toBeDefined();
            expect(addRecordStatus).toBeInstanceOf(Function);

        });

        it('addRecordStatus should add a new RecordStatus', async () => {

            expect(recordStatusCollection.value).toBeNull();

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.words(1),
                status: RecordStatusConstants.DRAFT
            };

            const spy = vi.fn(addRecordStatus);
            await spy(fakeAddDTO);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeAddDTO);

            expect(recordStatusCollection.value).toStrictEqual(expect.objectContaining(<RecordStatusDTO[]>[expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            })]));

        });

    });


    describe('removeRecordStatus tests', () => {

        const { addRecordStatus, removeRecordStatus } = recordStatusStore;

        it('RecordStatusStore should contain a removeRecordStatus method', () => {

            expect(removeRecordStatus).not.toBeNull();
            expect(removeRecordStatus).toBeDefined();
            expect(removeRecordStatus).toBeInstanceOf(Function);

        });


        it('removeRecordStatus should remove a RecordStatus', async () => {

            const initialCollectionAmount = recordStatusCollection.value?.length as number | 0;

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.words(1),
                status: RecordStatusConstants.PUBLISHED
            };

            await addRecordStatus(fakeAddDTO);
            const postAddCollectionAmount = recordStatusCollection.value?.length as number;
            expect(postAddCollectionAmount).toBeGreaterThan(initialCollectionAmount);

            const recordStatusDTO = (recordStatusCollection.value as RecordStatusDTO[])[0];

            expect(recordStatusDTO).toBeTruthy();
            expect(recordStatusDTO.id).toBeDefined();

            const spy = vi.fn(removeRecordStatus);
            await spy(recordStatusDTO.id);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(recordStatusDTO.id);

            expect(validationErrorMessage.value).toBeNull();

            const finalCollectionAmount = recordStatusCollection.value?.length as number | 0;
            expect(finalCollectionAmount).toEqual(initialCollectionAmount);

        });

        it('removeRecordStatus should return if invalid id is provided', async () => {

            const fakeId = -faker.number.int();

            const spy = vi.fn(removeRecordStatus);
            await spy(fakeId);

            expect(validationErrorMessage.value).not.toBeNull();

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeId);

        });

    });

    describe('updateRecordStatus tests', () => {

        const { addRecordStatus, updateRecordStatus, removeRecordStatus } = recordStatusStore;

        beforeEach(async () => {

            const recordStatusDTOCollection = recordStatusCollection.value;

            if(!recordStatusDTOCollection) {
               return;
            }

            for (const recordStatusDTO of recordStatusDTOCollection) {
                await removeRecordStatus(recordStatusDTO.id);
            }
        });

        it('RecordStatusStore should contain a updateRecordStatus method', () => {

            expect(updateRecordStatus).not.toBeNull();
            expect(updateRecordStatus).toBeDefined();
            expect(updateRecordStatus).toBeInstanceOf(Function);

        });

        it('updateRecordStatus should update a RecordStatus', async () => {

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.sample(4),
                status: RecordStatusConstants.PUBLISHED
            };

            await addRecordStatus(fakeAddDTO);
            const recordStatusDTO = (recordStatusCollection.value as RecordStatusDTO[])[0];
            recordStatusDTO.status = RecordStatusConstants.DRAFT;

            const spy = vi.fn(updateRecordStatus);
            await spy(recordStatusDTO);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(recordStatusDTO);

            const updatedRecordStatusDTO = (recordStatusCollection.value as RecordStatusDTO[])[0];
            expect(updatedRecordStatusDTO.status).toEqual(RecordStatusConstants.DRAFT);

        });

        it('updateRecordStatus should not update RecordStatus if validation fails', async () => {

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.sample(5),
                status: RecordStatusConstants.PUBLISHED
            };

            await addRecordStatus(fakeAddDTO);

            const recordStatusDTO = (recordStatusCollection.value as RecordStatusDTO[])[0];

            const fakeUpdateDTO = <RequestRecordStatusUpdateDTO>{
                id: recordStatusDTO.id,
                title: faker.word.sample(2),
                status: faker.word.sample()
            };

            const spy = vi.fn(updateRecordStatus);
            await spy(fakeUpdateDTO);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeUpdateDTO);
            expect(spy).toReturn();

            expect(validationErrorMessage.value).toBeTruthy();

            expect(recordStatusDTO.id).toEqual(fakeUpdateDTO.id);
            expect(recordStatusDTO.title).toEqual(fakeAddDTO.title);
            expect(recordStatusDTO.title).not.toEqual(fakeUpdateDTO.title);
            expect(recordStatusDTO.status).toEqual(fakeAddDTO.status);
            expect(recordStatusDTO.status).not.toEqual(fakeUpdateDTO.status);

        });

    });


    describe('getAllRecordStatus tests', () => {

        const { addRecordStatus, removeRecordStatus, getAllRecordStatus } = recordStatusStore;

        beforeEach(async () => {

            const recordStatusDTOCollection = recordStatusCollection.value;

            if(!recordStatusDTOCollection) {
                return;
            }

            for (const recordStatusDTO of recordStatusDTOCollection) {
                await removeRecordStatus(recordStatusDTO.id);
            }
        });

        it('RecordStatusStore should contain a updateRecordStatus method', () => {

            expect(getAllRecordStatus).not.toBeNull();
            expect(getAllRecordStatus).toBeDefined();
            expect(getAllRecordStatus).toBeInstanceOf(Function);

        });

        it('getAllRecordStatus should return null if no data exists in the DataProvider', async () => {
            await getAllRecordStatus();
            expect(recordStatusCollection.value).toBeNull();
        });

        it('getAllRecordStatus should return a RecordStatusDTOCollection if data exists in the DataProvider', async () => {

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.sample(5),
                status: RecordStatusConstants.PUBLISHED
            };

            await addRecordStatus(fakeAddDTO);

            await getAllRecordStatus();
            expect(recordStatusCollection.value).not.toBeNull();

            expect(recordStatusCollection.value).toStrictEqual(expect.objectContaining(<RecordStatusDTO[]>[expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            })]));

        });

    });


    describe('getRecordStatusById tests', () => {

        const { recordStatus } = storeToRefs(recordStatusStore);
        const { addRecordStatus, removeRecordStatus, getRecordStatusById } = recordStatusStore;

        beforeEach(async () => {
            const recordStatusDTOCollection = recordStatusCollection.value;

            if(!recordStatusDTOCollection) {
                return;
            }

            for (const recordStatusDTO of recordStatusDTOCollection) {
                await removeRecordStatus(recordStatusDTO.id);
            }
        });

        it('RecordStatusStore should contain a updateRecordStatus method', () => {

            expect(getRecordStatusById).not.toBeNull();
            expect(getRecordStatusById).toBeDefined();
            expect(getRecordStatusById).toBeInstanceOf(Function);

        });

        it('updateRecordStatus should return RecordStatus with the provided id', async () => {

            expect(recordStatusCollection.value).toBeNull();
            expect(recordStatus.value).toBeNull();

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.sample(5),
                status: RecordStatusConstants.PUBLISHED
            };

            await addRecordStatus(fakeAddDTO);
            const recordStatusDTO = (recordStatusCollection.value as RecordStatusDTO[])[0];

            const spy = vi.fn(getRecordStatusById);
            await spy(recordStatusDTO.id);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(recordStatusDTO.id);

            expect(recordStatus.value).not.toBeNull();

        });

        it('updateRecordStatus should return not RecordStatus if provided id does not exist on data provider', async () => {

            const fakeId = faker.number.int({min:999, max: 9999});
            await getRecordStatusById(fakeId);
            expect(recordStatus.value).toBeNull();

        });

    });



});
