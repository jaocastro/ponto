import axios from '@/plugins/axios'

class BaseService {
    constructor(resource) {
        this.http = axios
        this.resource = resource
    }

    get(route, params = {}, headers = {}) {
        route = route ? `${this.resource}/${route}` : this.resource
        let config = { params: params, headers: headers}
        return axios.get(route, config)
    }

    post({route = '', body, config = {}}) {
        route = route ? `${this.resource}/${route}` : this.resource
        return axios.post(route, body, config)
    }

    put({route = '', body, config = {}}) {
        route = route ? `${this.resource}/${route}` : this.resource
        return axios.put(route, body, config)
    }

    delete(route, params) {
        route = route ? `${this.resource}/${route}` : this.resource
        return axios.delete(route, {params})
    }

    create(payload) {
        return this.post({body: payload})
            .then(res => {
                return res
            })
    }

    update(payload, id) {
        return this.put({route: id, body: payload})
            .then(res => {
                return res
            })
    }

    getAll(filters = {}, withRelation = []) {
        filters.with = withRelation
        return this.get('', filters)
            .then(res => {
                return res
            })
    }

    show(id, withRelation = []) {
        return this.get(id, {with: withRelation})
            .then(res => {
                return res
            })
    }

    getCustomConfig(route, config = {}) {
        route = route ? `${this.resource}/${route}` : this.resource
        return axios.get(route, config)
    }
}

export default BaseService

