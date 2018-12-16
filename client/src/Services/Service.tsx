export abstract class Service {
    getApiUrl(): string {
        return "http://localhost:3000";
    }

    getHeaders(): object {
        return {};
    }
}