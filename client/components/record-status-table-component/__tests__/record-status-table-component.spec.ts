import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import RecordStatusTableComponent from "../index.vue";
import type {RecordStatusDTO} from "../../../integration/record-status/core/dtos/record-status.dto";
import {RecordStatusConstants} from "../../../integration/record-status/core/constants/record-status.constants";
import {RecordStatusTableComponentEventTypeConstants} from "../constants/record-status-table-component-event-type.constants";


describe('RecordStatusTableComponent tests', () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(RecordStatusTableComponent);
    });

    const fakeRecordStatusDTOCollection: RecordStatusDTO[] = [
        <RecordStatusDTO>{
            id: faker.number.int({min: 1, max: 2}),
            title: faker.word.sample(5),
            status: RecordStatusConstants.DRAFT
        },
        <RecordStatusDTO>{
            id: faker.number.int({min: 3, max: 4}),
            title: faker.word.sample(8),
            status: RecordStatusConstants.PENDING
        },
        <RecordStatusDTO>{
            id: faker.number.int({min: 5, max: 6}),
            title: faker.word.sample(3),
            status: RecordStatusConstants.PUBLISHED
        }
    ];

    it('RecordStatusTableComponent should contain a table container', () => {

        const tableContainer = component.getByTestId('record-status-table-component-container');
        const table = component.getByTestId('record-status-table-component-table');
        const tableHead = component.getByTestId('record-status-table-component-head');
        const tableHeadRow = component.getByTestId('record-status-table-component-head-row');
        const tableBody = component.getByTestId('record-status-table-component-body');

        expect(tableContainer).toBeDefined();
        expect(table).toBeDefined();
        expect(tableHead).toBeDefined();
        expect(tableHeadRow).toBeDefined();
        expect(tableBody).toBeDefined();

    });

    it('Provided an array of string to the recordStatusTableHeader props should create columns on the table', async () =>
    {
        const fakeColumns: string[] = [
          faker.word.sample(),
          faker.word.sample(),
          faker.word.sample(),
          faker.word.sample()
        ];

        await component.rerender({
            recordStatusTableHeader: fakeColumns
        });

        const tableHeadColumns = component.getAllByTestId('record-status-table-component-head-column');
        expect(tableHeadColumns).toBeDefined();
        expect(tableHeadColumns.length).toEqual(fakeColumns.length);
    });

    it('Provided an RecordStatusDTO collection to the recordStatusTableContent props should create rows on the table body', async () => {

        await component.rerender({
            recordStatusTableContent: fakeRecordStatusDTOCollection
        });

        const tableBodyRows = component.getAllByTestId('record-status-table-component-body-row');
        expect(tableBodyRows).toBeDefined();
        expect(tableBodyRows.length).toEqual(fakeRecordStatusDTOCollection.length);

        const editOptions = component.getAllByTestId('record-status-table-component-body-row-edit-option');
        const deleteOptions = component.getAllByTestId('record-status-table-component-body-row-delete-option');
        expect(editOptions).toBeDefined();
        expect(deleteOptions).toBeDefined();

        expect(editOptions.length).toEqual(fakeRecordStatusDTOCollection.length);
        expect(deleteOptions.length).toEqual(fakeRecordStatusDTOCollection.length);

    });

    it('recordStatusTableContent should respond to a click event and emit the selected RecordStatusDTO to be edited', async () => {

        const editOptions = component.getAllByTestId('record-status-table-component-body-row-edit-option');
        expect(editOptions).toBeDefined();

        const firstEditOption = editOptions[0];
        expect(firstEditOption).toBeDefined();

        await fireEvent.click(firstEditOption);

        expect(component.emitted(RecordStatusTableComponentEventTypeConstants.EDIT_RECORD_STATUS)).toBeTruthy();
        expect(component.emitted(RecordStatusTableComponentEventTypeConstants.EDIT_RECORD_STATUS)).toEqual([[fakeRecordStatusDTOCollection[0]]]);

    });


    it('recordStatusTableContent should respond to a click event and emit the selected RecordStatusDTO to be deleted', async () => {

        const deleteOptions = component.getAllByTestId('record-status-table-component-body-row-delete-option');
        expect(deleteOptions).toBeDefined();

        const firstDeleteOption = deleteOptions[0];
        expect(firstDeleteOption).toBeDefined();

        await fireEvent.click(firstDeleteOption);

        expect(component.emitted(RecordStatusTableComponentEventTypeConstants.DELETE_RECORD_STATUS)).toBeTruthy();
        expect(component.emitted(RecordStatusTableComponentEventTypeConstants.DELETE_RECORD_STATUS)).toEqual([[fakeRecordStatusDTOCollection[0]]]);

    });

    afterAll(() => {
        component.unmount();
        cleanup();
    });

});
