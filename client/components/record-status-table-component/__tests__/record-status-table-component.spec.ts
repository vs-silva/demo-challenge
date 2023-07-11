import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {cleanup, render, RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import RecordStatusTableComponent from "../index.vue"

describe('RecordStatusTableComponent tests', () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(RecordStatusTableComponent);
    });

    it('RecordStatusTableComponent should contain a table container', () => {

        const tableContainer = component.getByTestId('record-status-table-component-container');
        expect(tableContainer).not.toBeUndefined();

        component.debug();

    });

});
