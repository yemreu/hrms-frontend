import axios from "axios";

export default class JobService {
    
    getActiveJobs(){
        return axios.get("http://localhost:8080/api/jobs/get-active-jobs");
    }

    getActiveJobsWithLastApplicationDate(date){
        return axios.get("http://localhost:8080/api/jobs/get-active-jobs-with-last-application-date?date=" + date);
    }

    getEmployerActiveJobs(userId){
        return axios.get("http://localhost:8080/api/jobs/get-employer-active-jobs?userId=" + userId);
    }

    deactivateJob(jobId){
        return axios.put("http://localhost:8080/api/jobs/deactivate-job",jobId);
    }
};
