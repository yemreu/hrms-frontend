import axios from "axios";

export default class JobTitleService {
    
    getJobTitles(){
        return axios.get("http://localhost:8080/api/job-titles/get-all");
    }

    addTitle(data){
        return axios.post("http://localhost:8080/api/job-titles/add",data);
    }
};
