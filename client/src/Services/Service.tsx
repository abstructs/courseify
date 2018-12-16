import * as Cookies from 'js-cookie';

export abstract class Service {
    getApiUrl(): string {
        return "http://localhost:3000";
    }

    private getToken(): string | undefined {
        return Cookies.get("token");
    }

    getAuthHeader(): object {
        return {
            'Authorization': `Bearer ${this.getToken()}`
        };
    }
}