import axios from "axios";

export default class JobService {
    
    getActiveJobs(){
        return axios.get("http://localhost:8080/api/jobs/get-active-jobs");
    }

    getInActiveJobs(){
        return axios.get("http://localhost:8080/api/jobs/get-inactive-jobs");
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

    activateJob(jobId){
        return axios.put("http://localhost:8080/api/jobs/activate-job?id=" + jobId);
    }

    addJob(data){
        return axios.post("http://localhost:8080/api/jobs/add",data);
    }

    getJob(jobId){
        return axios.get("http://localhost:8080/api/jobs/get-job?jobId=" + jobId);
    }

    addToFavorite(data){
        return axios.post("http://localhost:8080/api/jobs/add-to-favorite",data);
    }

    getFilteredJobWithPagination(data,activePage,pageSize){
        return axios.post("http://localhost:8080/api/jobs/get-job-filtered-with-pagination?activePage=" + activePage + "&pageSize=" + pageSize,data);
    }
};
