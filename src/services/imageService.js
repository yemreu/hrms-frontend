import axios from "axios";

export default class ImageService {
    
    uploadImage(data,userId){
        return axios.post("http://localhost:8080/api/images/upload?userId="+userId,data);
    }
};