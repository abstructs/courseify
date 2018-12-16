export abstract class Validator<S, E> {
    protected hasMinLength(input: string, min: number): boolean {
        return input.length >= min;
    }

    protected hasMaxLength(input: string, max: number): boolean {
        return input.length <= max;
    }

    protected inRange(input: string, min: number, max: number): boolean {
        return this.hasMinLength(input, min) && this.hasMaxLength(input, max);
    }

    protected isAValidEmail(email: string): boolean {
        const emailRegex: RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegex.test(email);
    }

    protected matches(input1: string, input2: string): boolean {
        return input1 == input2;
    }

    protected isEmpty(input: string): boolean {
        return input.trim().length == 0;
    }

    protected isImageType(imageUrl: string): boolean {
        return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(imageUrl);
    }

    protected isValidUrl(url: string): boolean {
        const urlRegex: RegExp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        return !urlRegex.test(url);
    }

    public abstract getErrors(): E;
}