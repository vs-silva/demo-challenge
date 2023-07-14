import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import TitleRules from "../title-rules";

describe('Title validation rules tests', () => {

    describe('required rule tests', () => {

        it('should return true if value is provided', () => {

            const fakeTitle = faker.word.words(2);

            const spy = vi.spyOn(TitleRules, 'required');
            const result = TitleRules.required(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toEqual(true);
            expect(result).toEqual(expect.any(Boolean));
        });

        it('should return string if not or empty string value is provided', () => {

            const fakeTitle = ' ';

            const spy = vi.spyOn(TitleRules, 'required');
            const result = TitleRules.required(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toBeTruthy();
            expect(result).toEqual(expect.any(String));
            expect(result.toString().length).toBeGreaterThan(0);

        });

    });

    describe('counter rule tests', () => {

        it('should return min character warning if provided string value has less than 3 letters', () => {

            const fakeTitle = 'ab';
            const expectedMinWarning = 'Min 3 characters';

            const spy = vi.spyOn(TitleRules, 'counter');
            const result = TitleRules.counter(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toBeTruthy();
            expect(result).toEqual(expect.any(String));
            expect(result.toString().length).toBeGreaterThan(0);
            expect(result).toEqual(expectedMinWarning);

        });

        it('should return max character warning if provided string value has more than 20 letters', () => {

            const fakeTitle = faker.word.words(6);
            const expectedMaxWarning = 'Max 20 characters';

            const spy = vi.spyOn(TitleRules, 'counter');
            const result = TitleRules.counter(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toEqual(expectedMaxWarning);

        });

        it('should return true if provided string value has is within the min of 3 and the max of 20 letters', () => {

            const fakeTitle = faker.word.sample(10);

            const spy = vi.spyOn(TitleRules, 'counter');
            const result = TitleRules.counter(fakeTitle);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeTitle);

            expect(result).toEqual(true);
            expect(result).toEqual(expect.any(Boolean));

        });

    });

});
