import {describe, it, expect, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {createPinia, setActivePinia} from "pinia";
import Store from "../../index";
import {storeToRefs} from "pinia";
import {RecordStatusConstants} from "../../../integration/record-status/core/constants/record-status.constants";
import type {RequestRecordStatusAddDTO} from "../../../integration/record-status/core/dtos/request-record-status-add.dto";
import {RecordStatusDTO} from "~/client/integration/record-status/core/dtos/record-status.dto";

describe('RecordStatusStore tests', () => {

    setActivePinia(createPinia());
    const recordStatusStore = Store.useRecordStatusStore();
    const { recordStatusCollection } = storeToRefs(recordStatusStore);

    const statusRegex = /^(draft|published|pending)$/i;

    describe('validateRecordStatus tests', () => {

        const { validateRecordStatus } = recordStatusStore;
        const { validationErrorMessage } = storeToRefs(recordStatusStore);

        const fakeDTO = <RequestRecordStatusAddDTO>{
            title: faker.word.sample(10),
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

            expect(validationErrorMessage.value).toBeNull()

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

        const { recordStatusAdded } = storeToRefs(recordStatusStore);

        it('addRecordStatus should contain a validateRecordStatus method', () => {

            const { addRecordStatus } = recordStatusStore;

            expect(addRecordStatus).not.toBeNull();
            expect(addRecordStatus).toBeDefined();
            expect(addRecordStatus).toBeInstanceOf(Function);

        });

        it('addRecordStatus should add a new RecordStatus', async () => {

            expect(recordStatusCollection.value).toBeNull();

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.sample(10),
                status: RecordStatusConstants.DRAFT
            };

            const spy = vi.fn(addRecordStatus);
            await spy(fakeAddDTO);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeAddDTO);
            expect(recordStatusAdded.value).toBeTruthy();

            expect(recordStatusCollection.value).toStrictEqual(expect.objectContaining(<RecordStatusDTO[]>[expect.objectContaining(<RecordStatusDTO>{
                id: expect.any(Number),
                title: expect.any(String),
                status: expect.stringMatching(statusRegex)
            })]));

        });

    });


    describe('removeRecordStatus tests', () => {

        const { addRecordStatus, removeRecordStatus } = recordStatusStore;

        it('removeRecordStatus should remove a RecordStatus', async () => {

            const initialCollectionAmount = recordStatusCollection.value?.length as number | 0;

            const fakeAddDTO = <RequestRecordStatusAddDTO>{
                title: faker.word.sample(4),
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

            const finalCollectionAmount = recordStatusCollection.value?.length as number | 0;
            expect(finalCollectionAmount).toEqual(initialCollectionAmount);

        });

    });





});
