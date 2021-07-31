import { FILTER_JOB, RESET_FILTER } from "../actions/jobFilterActions";
import { jobFilter } from "../initialStates/jobFilter";

const initialState = {
    jobFilter: jobFilter
}

export default function jobFilterReducer(state = initialState,{type,payload}) {
    switch (type) {
        case FILTER_JOB:
            return {
                ...state,
                jobFilter: payload
            }   
        case RESET_FILTER:
            return {
                ...state,
                jobFilter: {}
            } 
        default:
            return state;
    }
};
