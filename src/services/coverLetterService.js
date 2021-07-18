import axios from "axios";

export default class CoverLetterService {
    
    getCoverLetter(coverLetterId){
        return axios.get("http://localhost:8080/api/cover-letters/get-cover-letter?coverLetterId=" + coverLetterId);
    }

    getSeekerCoverLetters(userId){
        return axios.get("http://localhost:8080/api/cover-letters/get-job-seeker-cover-letters?userId=" + userId);
    }

    addCoverLetter(data){
        return axios.post("http://localhost:8080/api/cover-letters/add",data);
    }
};
