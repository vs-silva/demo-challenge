import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/vue";
import RecordStatusDialogComponent from "../index.vue";
import {RecordStatusDialogComponentEventTypeConstants} from "../constants/record-status-dialog-component-event-type.constants";

describe('RecordStatusDialogComponent test', () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(RecordStatusDialogComponent);
    });

    it('should contain a component container', () => {

        const dialogContainer = component.getByTestId('record-status-dialog-component-container');
        const dialog = component.getByTestId('record-status-dialog-component');
        expect(dialogContainer).toBeDefined();
        expect(dialog).toBeDefined();

    });

    it('should contain a delete option', () => {
        const deleteOption = component.getByTestId('record-status-dialog-component-delete-option');
        expect(deleteOption).toBeDefined();
    });

    it('delete option should emit on click event', async () => {
        const deleteOption = component.getByTestId('record-status-dialog-component-delete-option');
        expect(deleteOption).toBeDefined();

        await fireEvent.click(deleteOption);
        expect(component.emitted(RecordStatusDialogComponentEventTypeConstants.DELETE_RECORD_STATUS)).toBeTruthy();
    });

    it('delete option should emit null if no RecordStatusDTO has been set', async () => {
        const deleteOption = component.getByTestId('record-status-dialog-component-delete-option');
        expect(deleteOption).toBeDefined();

        await fireEvent.click(deleteOption);
        expect(component.emitted(RecordStatusDialogComponentEventTypeConstants.DELETE_RECORD_STATUS)).toEqual([[null], [null]]);
    });

    it('should contain a cancel option', () => {
        const cancelOption = component.getByTestId('record-status-dialog-component-cancel-option');
        expect(cancelOption).toBeDefined();
    });

    it('cancel option should emit on click event', async () => {
        const cancelOption = component.getByTestId('record-status-dialog-component-cancel-option');
        expect(cancelOption).toBeDefined();

        await fireEvent.click(cancelOption);
        expect(component.emitted(RecordStatusDialogComponentEventTypeConstants.CANCEL_DELETE_RECORD_STATUS)).toBeTruthy();
        expect(component.emitted(RecordStatusDialogComponentEventTypeConstants.DELETE_RECORD_STATUS)).toEqual([[null], [null]]);
    });

    afterAll(() => {
        component.unmount();
        cleanup();
    });

});
