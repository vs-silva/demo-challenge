import {describe, expect, it, vi} from "vitest";
import {faker} from "@faker-js/faker";
import {ref} from "@vue/runtime-core";
import {RecordStatusDrawerComponentComposables} from "../record-status-drawer-component.composables";



describe('RecordStatusDrawerComponentComposables tests', () => {

    describe('useClearRefString tests', () => {

        it('useClearRefString should set the value of a ref string to an empty string', () => {

            const fakeRefString = ref(faker.word.sample(10));
            const expected = '';

            const spy = vi.spyOn(RecordStatusDrawerComponentComposables, 'useClearRefString');
            RecordStatusDrawerComponentComposables.useClearRefString(fakeRefString);

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(fakeRefString);

            expect(fakeRefString.value).toEqual(expected);

        });

    });

});
