export abstract class Validator {

    minLength(input: string, min: number): boolean {
        return input.length >= min;
    }

    maxLength(input: string, max: number): boolean {
        return input.length <= max;
    }

    inRange(input: string, min: number, max: number): boolean {
        return this.minLength(input, min) && this.maxLength(input, max);
    }

    validEmail(email: string): boolean {
        return email.length > 0;
    }

    match(input1: string, input2: string) {
        return input1 == input2;
    }

    required(input: string) {
        return input.trim().length > 0;
    }
}