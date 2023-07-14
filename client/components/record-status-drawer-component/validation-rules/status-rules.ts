export default {
    required: (value:string): boolean | string => {
        if (!value?.trim()) {
            return 'Status is required'
        }

        return true;
    },
}
