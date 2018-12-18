import { Service } from './Service';
import axios from 'axios';

export class RecommendationService extends Service {
    constructor() {
        super();
    }

    getAll(callback: (res: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/recommendations`)
        .then(res => {
            // console.log(res);
        })
    }
}