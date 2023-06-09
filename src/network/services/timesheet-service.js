import BaseService from "@/network/base-service";

class TimesheetService extends BaseService {
    constructor() {
        super(`Timesheet`)
    }

    getTimesheet() {
        return this.get('', )
            .then(res => {
                return res
            })
    }

    _currentId() {
        return localStorage.getItem('id')
    }
    putTimesheet(body) {
       return this.put({
            ...body, route: this._currentId()
        })
    }
}


export default new TimesheetService()
