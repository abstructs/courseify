import { Service } from './Service';
import axios, { AxiosResponse } from 'axios';
import * as Cookies from 'js-cookie';

export interface IUserForm {
    email: string,
    username: string,
    password: string,
    password_confirmation: string
}

export class UserService extends Service {

    constructor() {
        super();
    }

    private storeToken(token: string): void {
        Cookies.set("token", token);
    }

    public isAuthenticated(): boolean {
        return Cookies.get("token") != null;
    }

    public signup(userForm: IUserForm, onSuccess: (res: AxiosResponse) => void, onReject: (reason: any) => void) {
        const payload = {
            user: {
                ...userForm
            }
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/`, payload)
        .then(res => {
            if(res.data) {
                this.storeToken(res.data.token);
            }
            
            return res;
        })
        .then(onSuccess)
        .catch(onReject);
    }

}