import BaseService from "@/network/base-service";

class UserService extends BaseService {
    constructor() {
        super(`Account`)
    }

    getUser(){
        return JSON.parse(localStorage.getItem('access_user'))
    }

    hasUser(){
        return !!localStorage.getItem('access_user')
    }

    setUser(user){
        localStorage.setItem('access_user', JSON.stringify(user))
    }

    logout(){
        localStorage.clear()
    }
}


export default new UserService()
