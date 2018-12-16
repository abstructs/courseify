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

    public abstract getErrors(): E;
}