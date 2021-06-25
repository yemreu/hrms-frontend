import axios from "axios";

export default class SocialLinkService {
    
    getSeekerCvSocialLinks(cvId){
        return axios.get("http://localhost:8080/api/social-links/get-seeker-cv-social-links?cvId=" + cvId);
    }
};