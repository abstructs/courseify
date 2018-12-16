export abstract class Validator<S, E> {
    protected minLength(input: string, min: number): boolean {
        return input.length >= min;
    }

    protected maxLength(input: string, max: number): boolean {
        return input.length <= max;
    }

    protected inRange(input: string, min: number, max: number): boolean {
        return this.minLength(input, min) && this.maxLength(input, max);
    }

    protected validEmail(email: string): boolean {
        const emailRegex: RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegex.test(email);
    }

    protected match(input1: string, input2: string): boolean {
        return input1 == input2;
    }

    protected required(input: string): boolean {
        return input.trim().length > 0;
    }

    public abstract getErrors(): E;
}