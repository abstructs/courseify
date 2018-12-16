import { Validator } from '../Validator';
import { ILoginForm } from 'src/Services/UserService';

export interface ILoginFormErrors {
    email: Array<String>,
    password: Array<String>
}

export class LoginValidator extends Validator<ILoginForm, ILoginFormErrors> {

    private getEmail: () => string;
    private getPassword: () => string;

    constructor(getForm: () => ILoginForm) {
        super();

        this.getEmail = () => getForm().email;
        this.getPassword = () => getForm().password;
    }


    private getEmailErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.isAValidEmail(this.getEmail())) {
            errors.push("Invalid email");
        }

        return errors;
    }

    private getPasswordErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getPassword(), 6, 20)) {
            errors.push("Invalid password");
        }

        return errors;
    }

    public getErrors(): ILoginFormErrors {
        return {
            email: this.getEmailErrors(),
            password: this.getPasswordErrors()
        }
    }
}