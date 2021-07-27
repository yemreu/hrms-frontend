import axios from "axios";

export default class EmployerUserService {
    
    getEmployerUsers(){
        return axios.get("http://localhost:8080/api/users/employers/get-all");
    }

    getEmployerUser(userId){
        return axios.get("http://localhost:8080/api/users/employers/get-employer-user?userId=" + userId);
    }

    register(data){
        return axios.post("http://localhost:8080/api/users/employers/register",data);
    }

    verify(companyId){
        return axios.put("http://localhost:8080/api/users/employers/verify?companyId=" + companyId);
    }

    update(data){
        return axios.post("http://localhost:8080/api/users/employers/update-employer-profile",data);
    }

    getEmployerUserProfileUpdates(){
        return axios.get("http://localhost:8080/api/users/employers/get-employer-profile-updates");
    }

    approveProfileUpdate(profileUpdateId){
        return axios.put("http://localhost:8080/api/users/employers/approve-profile-update?profileUpdateId=" + profileUpdateId);
    }

    existsEmployerUserProfileUpdate(userId){
        return axios.get("http://localhost:8080/api/users/employers/exists-employer-profile-update?userId=" + userId);
    }
};
