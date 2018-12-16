import { Validator } from './Validator';
import { IUserForm, IUserFormErrors } from '../User/SignUp';

export class UserValidator extends Validator {

    private getEmail: () => string;
    private getUsername: () => string;
    private getPassword: () => string;
    private getPasswordConfirmation: () => string;

    constructor(form: IUserForm) {
        super();

        this.getEmail = () => form.email;
        this.getUsername = () => form.username;
        this.getPassword = () => form.password;
        this.getPasswordConfirmation = () => form.passwordConfirmation;
    }

    private getUsernameErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getUsername(), 1, 20)) {
            errors.push("Please enter a username between 1 and 20 characters.");
        }

        return errors;
    }

    private getEmailErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.validEmail(this.getEmail())) {
            errors.push("Please enter a valid email.");
        }

        return errors;
    }

    private getPasswordErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getPassword(), 6, 20)) {
            errors.push("Please enter a password between 6 and 20 characters..");
        }

        return errors;
    }

    private getPasswordConfirmationErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.match(this.getPassword(), this.getPasswordConfirmation())) {
            errors.push("Passwords should match.");
        }

        return errors;
    }

    public getErrors(): IUserFormErrors {
        return {
            email: this.getEmailErrors(),
            username: this.getUsernameErrors(),
            password: this.getPasswordErrors(),
            passwordConfirmation: this.getPasswordConfirmationErrors()
        }
    }
}