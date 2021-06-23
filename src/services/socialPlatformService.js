import axios from "axios";

export default class SocialPlatformService {
    
    getSocialPlatforms(){
        return axios.get("http://localhost:8080/api/social-platforms/get-all");
    }
};
