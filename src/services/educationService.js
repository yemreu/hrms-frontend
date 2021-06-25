import axios from "axios";

export default class EducationService {
    
    getSeekerCvEducations(cvId){
        return axios.get("http://localhost:8080/api/educations/get-seeker-cv-educations?cvId=" + cvId);
    }
};