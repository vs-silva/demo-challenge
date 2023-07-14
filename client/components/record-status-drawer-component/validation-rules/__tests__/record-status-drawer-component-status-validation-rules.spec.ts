import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import Status from "../status-rules";

describe('Status validation rules tests', () => {

    describe('required rule tests', () => {

        it('should return true if value is provided', () => {

            const fakeTitle = faker.word.words(2);

            const spy = vi.spyOn(Status, 'required');
            const result = Status.required(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toEqual(true);
            expect(result).toEqual(expect.any(Boolean));
        });

        it('should return string if not or empty string value is provided', () => {

            const fakeTitle = ' ';

            const spy = vi.spyOn(Status, 'required');
            const result = Status.required(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toBeTruthy();
            expect(result).toEqual(expect.any(String));
            expect(result.toString().length).toBeGreaterThan(0);

        });

    });
});
