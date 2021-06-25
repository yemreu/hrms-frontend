import axios from "axios";

export default class VerificationService {
    
    verify(token){
        return axios.put("http://localhost:8080/api/users/verify",token);
    }
};