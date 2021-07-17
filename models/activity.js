import {Http} from "../utils/http";

class Activity {
    static activityName = 'a-2'

    static async getHomeLocationD() {
        return await Http.request({
            url: `activity/name/${Activity.activityName}`,
        })
    }
}

export {
    Activity
}