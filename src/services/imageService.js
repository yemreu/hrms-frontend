import axios from "axios";

export default class ImageService {
    
    uploadImage(data){
        return axios.post("http://localhost:8080/api/images/upload?userId=1",data);
    }
};