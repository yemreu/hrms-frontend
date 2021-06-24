import axios from "axios";

export default class CvLanguageService {
    
    getSeekerCvLanguages(cvId){
        return axios.get("http://localhost:8080/api/cv-languages/get-seeker-cv-languages?cvId=" + cvId);
    }
};