import * as Cookies from 'js-cookie';

export abstract class Service {
    protected getApiUrl(): string {
        return "http://localhost:3000";
    }

    protected getToken(): string | undefined {
        return Cookies.get("token");
    }

    protected getAuthHeader(): object {
        return {
            'Authorization': `Bearer ${this.getToken()}`
        };
    }
}