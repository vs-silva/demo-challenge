import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import RecordStatusDrawerComponent from "../index.vue";

describe('RecordStatusDrawerComponent tests', () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(RecordStatusDrawerComponent);
    });

    const fakeSelectOptions = [
        faker.word.sample(4),
        faker.word.sample(5),
        faker.word.sample(6)
    ];

    it('should contain component container', () => {
        const drawerContainer = component.getByTestId('record-status-drawer-component-container');
        const drawer = component.getByTestId('record-status-drawer-component');

        expect(drawerContainer).toBeDefined();
        expect(drawer).toBeDefined();
    });

    it('should contain a form to create and edit recordStatus', () => {

        const drawerForm = component.getByTestId('record-status-drawer-form');
        const idField = component.getByTestId('record-status-drawer-form-id-field');
        const titleField = component.getByTestId('record-status-drawer-form-title-field');
        const statusSelect = component.getByTestId('record-status-drawer-form-status-select-field');
        const drawerSubmitOption = component.getByTestId('record-status-drawer-form-submit-option');

        expect(drawerForm).toBeDefined();
        expect(idField).toBeDefined();
        expect(titleField).toBeDefined();
        expect(statusSelect).toBeDefined();
        expect(drawerSubmitOption).toBeDefined();

    });

    it('should receive an string[] with options for the select component', async () => {

        await component.rerender({
            recordStatusSelectOptions: fakeSelectOptions
        });

    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });
});
