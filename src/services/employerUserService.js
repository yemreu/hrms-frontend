import axios from "axios";

export default class EmployerUserService {
    
    getEmployerUsers(){
        return axios.get("http://localhost:8080/api/users/employers/get-all");
    }

    register(data){
        return axios.post("http://localhost:8080/api/users/employers/register",data);
    }

    verify(companyId){
        return axios.put("http://localhost:8080/api/users/employers/verify?companyId=" + companyId);
    }
};
