import { combineReducers } from "redux";
import jobFilterReducer from "./reducers/jobFilterReducer";

const rootReducer = combineReducers({
    jobFilter: jobFilterReducer
})

export default rootReducer;