import { Service } from './Service';
import axios, { AxiosResponse } from 'axios';
import * as Cookies from 'js-cookie';

export interface ISignupForm {
    email: string,
    username: string,
    password: string,
    password_confirmation: string
}

export interface ILoginForm {
    email: string,
    password: string
}

export interface IUser {
    id: number,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    education: string,
    country: string,
    industry: string,
    summary: string
}

export class UserService extends Service {

    constructor() {
        super();
    }

    public getAll(callback: (users: Array<IUser>) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/users`)
        .then(res => {
            const users: Array<IUser> = res.data.users;
            
            callback(users);
        })
    }

    private storeToken(token: string): void {
        Cookies.set("token", token);
    }

    public static revokeToken() {
        Cookies.remove("token");
    }

    public isAuthenticated(): boolean {
        return Cookies.get("token") != null;
    }

    public usernameTaken(username: string, callback: (usernameTaken: boolean) => void) {
        const payload = {
            user: {
                username
            }
        }

        axios.post(`${super.getApiUrl()}/api/v1/users/username_taken`, payload)
        .then(res => {
            if(res.data) {
                callback(res.data.username_taken);
            }
        });
    }

    public emailTaken(email: string, callback: (emailTaken: boolean) => void) {
        const payload = {
            user: {
                email
            }
        }

        axios.post(`${super.getApiUrl()}/api/v1/users/email_taken`, payload)
        .then(res => {
            if(res.data) {
                callback(res.data.email_taken);
            }
        });
    }

    public authenticate(loginForm: ILoginForm, onSuccess: (res: AxiosResponse) => void, onReject: (reason: any) => void) {
        const payload = {
            auth: {
                ...loginForm
            }
        }

        axios.post(`${super.getApiUrl()}/api/v1/users/user_token`, payload)
        .then(res => {
            if(res.data) {
                this.storeToken(res.data.jwt);
            }
            
            return res;
        })
        .then(onSuccess)
        .catch(onReject);

    }

    public signup(signupForm: ISignupForm, onSuccess: (res: AxiosResponse) => void, onReject: (reason: any) => void) {
        const payload = {
            user: {
                ...signupForm
            }
        }

        axios.post(`${super.getApiUrl()}/api/v1/users/`, payload)
        .then(res => {
            if(res.data) {
                this.storeToken(res.data.jwt);
            }
            
            return res;
        })
        .then(onSuccess)
        .catch(onReject);
    }

}