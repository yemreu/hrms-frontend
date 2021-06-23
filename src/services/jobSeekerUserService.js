import axios from 'axios';

export default class JobSeekerUserService {
    
    getJobSeekerUsers(){
        return axios.get("http://localhost:8080/api/users/job-seekers/get-all");
    }
};
