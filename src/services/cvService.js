import axios from "axios";

export default class CvService {
    
    getSeekerCv(userId){
        return axios.get("http://localhost:8080/api/cvs/get-cv?userId=" + userId);
    }
};
