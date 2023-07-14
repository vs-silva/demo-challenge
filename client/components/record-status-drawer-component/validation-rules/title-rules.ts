export default {
    required: (value:string): boolean | string => {
        if (!value?.trim()) {
            return 'Title is required'
        }

        return true;
    },
    counter: (value:string): boolean | string => {

        if(value.length < 3)
        {
            return 'Min 3 characters';
        }

        return value.length <= 20 || 'Max 20 characters';
    },
};
