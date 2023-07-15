import {Ref} from "@vue/reactivity";


function useClearRefString(refString: Ref<string>): void {
    refString.value = '';
}



export const RecordStatusDrawerComponentComposables = {
    useClearRefString
} as const;
