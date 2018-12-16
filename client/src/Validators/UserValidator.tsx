import { Validator } from './Validator';
import { IUserForm } from 'src/Services/UserService';

export interface IUserFormErrors {
    email: Array<String>,
    username: Array<String>,
    password: Array<String>
}

export class UserValidator extends Validator {

    private getEmail: () => string;
    private getUsername: () => string;
    private getPassword: () => string;
    private getpassword_confirmation: () => string;

    constructor(getForm: () => IUserForm) {
        super();

        this.getEmail = () => getForm().email;
        this.getUsername = () => getForm().username;
        this.getPassword = () => getForm().password;
        this.getpassword_confirmation = () => getForm().password_confirmation;
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

        if(!super.match(this.getPassword(), this.getpassword_confirmation())) {
            errors.push("Passwords should match.");
        }

        return errors;
    }

    public getErrors(): IUserFormErrors {
        return {
            email: this.getEmailErrors(),
            username: this.getUsernameErrors(),
            password: this.getPasswordErrors()
        }
    }
}