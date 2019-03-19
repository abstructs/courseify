import * as Cookies from 'js-cookie';

export abstract class Service {
    protected getApiUrl(): string {
        return "";
    }

    protected getToken(): string | undefined {
        return Cookies.get("token");
    }

    protected getAuthHeader(): object {
        return {
            'Authorization': `${this.getToken()}`
        };
    }
}