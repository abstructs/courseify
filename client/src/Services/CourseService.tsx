import { Service } from './Service';
import axios from 'axios';

export class CourseService extends Service {
    constructor() {
        super();
    }

    getAll(callback: (res: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses`)
        .then(res => {
            console.log(res);
        })
    }
}