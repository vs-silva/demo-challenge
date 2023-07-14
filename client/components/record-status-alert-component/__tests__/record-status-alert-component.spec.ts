import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {cleanup, render, RenderResult} from "@testing-library/vue";
import {faker} from "@faker-js/faker";
import RecordStatusAlertComponent from "../index.vue";
import type {RecordStatusAlertComponentDTO} from "../dto/record-status-alert-component.dto";
import {RecordStatusAlertComponentConstants} from "../constants/record-status-alert-component.constants";

describe('RecordStatusAlertComponent tests', () => {

    let component: RenderResult;

    beforeAll(() => {
        component = render(RecordStatusAlertComponent);
    });

    it('it should contain a component container',() => {
        const alertContainer = component.getByTestId('record-status-alert-component-container');
        const alert = component.getByTestId('record-status-alert-component');

        expect(alertContainer).toBeDefined();
        expect(alert).toBeDefined();

    });

    it('Title and text should not contain any content', () => {
        const title = component.getByTestId('record-status-alert-component-title');
        const text = component.getByTestId('record-status-alert-component-text');

        expect(title).toBeDefined();
        expect(text).toBeDefined();

        expect(title.textContent).toBeFalsy();
        expect(text.textContent).toBeFalsy();
    });

    it('Title and text should contain content when RecordStatusAlertComponentDTO is provided',  async () => {

        const fakeAlertDTO = <RecordStatusAlertComponentDTO>{
            text: faker.word.sample(3),
            title: faker.word.sample( 2),
            type: RecordStatusAlertComponentConstants.SUCCESS
        };

        await component.rerender({
            alertType: fakeAlertDTO
        });

        const title = component.getByTestId('record-status-alert-component-title');
        const text = component.getByTestId('record-status-alert-component-text');

        expect(title).toBeDefined();
        expect(text).toBeDefined();

        expect(title.textContent).toBeTruthy();
        expect(text.textContent).toBeTruthy();

        expect(title.textContent).toEqual(fakeAlertDTO.title);
        expect(text.textContent).toEqual(fakeAlertDTO.text);

    });


    afterAll(() => {
        component.unmount();
        cleanup();
    });
});
