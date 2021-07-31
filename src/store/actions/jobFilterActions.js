export const FILTER_JOB = "FILTER_JOB";
export const RESET_FILTER = "RESET_FILTER";

export function filterJob(filter){
    return {
        type: FILTER_JOB,
        payload: filter
    }
};

export function resetFilter(){
    return {
        type: RESET_FILTER,
        payload: {}
    }
};