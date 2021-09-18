import axios from "axios"
import { TOKEN_CYBERSOFT, DOMAIN, ACCESS_TOKEN  } from "../Util/setting"

export class baseService {

    get = (url) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                'TokenCybersoft': TOKEN_CYBERSOFT,
            }
        })
    }

    post = (url, data) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: data,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                'TokenCybersoft': TOKEN_CYBERSOFT,
            }
        })
    }

    put = (url, data) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: data,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                'TokenCybersoft': TOKEN_CYBERSOFT,
            }
        })
    }

    delete = (url) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                'TokenCybersoft': TOKEN_CYBERSOFT,
            }
        })
    }
}