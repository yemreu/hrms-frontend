import axios from "axios";

export default class UserService {

    updateEmail(data){
        return axios.put("http://localhost:8080/api/users/update-email",data);
    }

    updatePassword(data){
        return axios.put("http://localhost:8080/api/users/update-password",data);
    }
};
