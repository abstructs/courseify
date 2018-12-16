import { Validator } from '../Validator';
import { ISignupForm } from 'src/Services/UserService';

export interface ISignupFormErrors {
    email: Array<String>,
    username: Array<String>,
    password: Array<String>
}

export class SignupValidator extends Validator<ISignupForm, ISignupFormErrors> {

    private getEmail: () => string;
    private getUsername: () => string;
    private getPassword: () => string;
    private getPasswordConfirmation: () => string;

    constructor(getForm: () => ISignupForm) {
        super();

        this.getEmail = () => getForm().email;
        this.getUsername = () => getForm().username;
        this.getPassword = () => getForm().password;
        this.getPasswordConfirmation = () => getForm().password_confirmation;
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

        if(!super.match(this.getPassword(), this.getPasswordConfirmation())) {
            errors.push("Passwords should match.");
        }

        return errors;
    }

    public getErrors(): ISignupFormErrors {
        return {
            email: this.getEmailErrors(),
            username: this.getUsernameErrors(),
            password: this.getPasswordErrors()
        }
    }
}