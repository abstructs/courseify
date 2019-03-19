import { Service } from './Service';
import axios, { AxiosResponse } from 'axios';
import * as Cookies from 'js-cookie';
import { IImage, ICourse } from './CourseService';

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

export interface IEditUserForm {
    id: number,
    // email: string,
    banner_url: string | null,
    first_name: string,
    last_name: string,
    education: string,
    headline: string,
    country: string,
    industry: string,
    summary: string,
    banner: IImage
}

export interface IUserFormErrors {
    id: number,
    email: string,
    // username: string,
    first_name: string,
    last_name: string,
    education: string,
    headline: string,
    country: string,
    industry: string,
    summary: string,
    // banner_url: string
}

export interface IUserEditFormErrors {
    first_name: Array<String>,
    last_name: Array<String>,
    education: Array<String>,
    headline: Array<String>,
    country: Array<String>,
    industry: Array<String>,
    summary: Array<String>
}

export interface IUserProfile {
    id: number,
    banner_url: string | null,
    first_name: string,
    last_name: string,
    education: string,
    headline: string,
    country: string,
    industry: string,
    summary: string,
    following: Array<IUser>,
    followers: Array<IUser>
}

export interface IRecommendation {
    id: number,
    user_id: number,
    course_id: number,
    course: ICourse
}

export interface IUser {
    id: number,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    education: string,
    headline: string,
    country: string,
    industry: string,
    summary: string,
    banner_url: string | null,
    image: IImage,
    current_user_followed: boolean,
    followers: Array<IUser>,
    following: Array<IUser>,
    recommendations: Array<IRecommendation>
}

export interface ICurrentUser {
    id: number
}

export class UserService extends Service {

    constructor() {
        super();
    }

    public getOne(username: string, onSuccess: (user: IUser) => void, onError: () => void) {
        console.log("get called");

        axios.get(`${super.getApiUrl()}/api/v1/users/${username}`, 
            { headers: { ...super.getAuthHeader() }})
        .then(res => {
            return res;
        })
        .then(res => res.data.user)
        .then(onSuccess)
        .catch(onError);
    }

    public getCurrentUserProfile(onSuccess: (user: IUser) => void, onError: () => void) {
        console.log(super.getAuthHeader());
        axios.post(`${super.getApiUrl()}/api/v1/users/profile`, {},
            { headers: { ...super.getAuthHeader() }})
        .then(res => {
            return res;
        })
        .then(res => res.data.user)
        .then(onSuccess)
        .catch(onError);
    }

    public getAll(callback: (users: Array<IUser>) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/users`,
            { headers: { ...super.getAuthHeader() }})
        .then(res => {
            const users: Array<IUser> = res.data.users;
            
            callback(users);
        })
    }

    private storeToken(token: string): void {
        const today = new Date();
        const oneWeek = new Date(new Date().setDate(today.getDate() + 7));

        Cookies.set("token", token, {
            expires: oneWeek,
            path: ''
        });
    }

    public static revokeToken() {
        Cookies.remove("token");
    }

    public isAuthenticated(): boolean {
        return Cookies.get("token") != null;
    }

    private getParsedJwt(): object | null {
        const token = super.getToken();
        
        if(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');

            return JSON.parse(window.atob(base64));
        }

        return null;
    }


    public getCurrentUser(): ICurrentUser | null {
        const parsedJwt = this.getParsedJwt();

        if(parsedJwt) {
            try {
                return {
                    id: parsedJwt['sub']["user"]['id']
                }
            } catch(e) {
                UserService.revokeToken();
            } 
        }

        console.log
        
        return null;
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

    follow(userId: number, onSuccess: () => void, onError: () => void) { 
        axios.post(`${super.getApiUrl()}/api/v1/users/follow/${userId}`, {},
            { headers: { ...super.getAuthHeader() }})
        .then(onSuccess)
        .catch(onError);
    }

    unfollow(userId: number, onSuccess: () => void, onError: () => void) { 
        axios.delete(`${super.getApiUrl()}/api/v1/users/unfollow/${userId}`,
            { headers: { ...super.getAuthHeader() }})
        .then(onSuccess)
        .catch(onError);
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

    updateUser(user: IEditUserForm, onSuccess: (res: any) => void, onError: (reason: any) => void) {
        const formData = new FormData();

        Object.keys(user).map(key => {
            formData.append(key, user[key]);
        });

        formData.delete("banner");

        if(user.banner.file != null) {
            formData.append("banner", user.banner.file);
        }
        
        axios.put(`${super.getApiUrl()}/api/v1/users/${user.id}`, formData, 
            { headers: { 'Content-Type': 'multipart/form-data', ...super.getAuthHeader() }})
        .then(onSuccess)
        .catch(onError);
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

    public deleteBanner(userId: number, onSuccess: () => void, onError: () => void) {
        axios.delete(`${super.getApiUrl()}/api/v1/users/${userId}/banner`, 
            { headers: { 'Content-Type': 'multipart/form-data', ...super.getAuthHeader() }})
        .then(onSuccess)
        .catch(onError);
    }

}