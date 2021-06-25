import axios from "axios";

export default class ExperienceService {
    
    getSeekerCvExperiences(cvId){
        return axios.get("http://localhost:8080/api/experiences/get-seeker-cv-experiences?cvId=" + cvId);
    }
};