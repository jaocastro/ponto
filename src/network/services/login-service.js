import BaseService from "@/network/base-service.js";
import TokenService from "@/utils/token-service.js";
import UserService from "@/network/services/user-service.js";

class LoginService extends BaseService {
    constructor() {
        super(``)
    }

    login(payload) {
        return this.post({route: 'Accounts', body: payload})
            .then(res => {
                TokenService.setToken(res.data.accessToken)
                UserService.setUser(res.data.name)
                return res
            })
    }

}

export default new LoginService()
