import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {cleanup, render, RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import RecordStatusTableComponent from "../record-status-table.component.vue"

describe('RecordStatusTableComponent tests', () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(RecordStatusTableComponent);
    });

    it('RecordStatusTableComponent should contain a table', () => {

        component.debug();

    });

});
