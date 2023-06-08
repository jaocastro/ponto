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
}


export default new TimesheetService()
