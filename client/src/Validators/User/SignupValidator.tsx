import { Validator } from '../Validator';
import { ISignupForm, UserService } from 'src/Services/UserService';

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

    private userService: UserService;

    constructor(getForm: () => ISignupForm) {
        super();

        this.getEmail = () => getForm().email;
        this.getUsername = () => getForm().username;
        this.getPassword = () => getForm().password;
        this.getPasswordConfirmation = () => getForm().password_confirmation;

        this.userService = new UserService();
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

    public getAsyncEmailError(callback: (emailErrors: Array<String>) => void) {
        this.userService.emailTaken(this.getEmail(), (emailTaken: boolean) => {
            const errors = new Array<String>();

            if(emailTaken) {
                errors.push("Email already in use");
            }

            callback(errors);
        });
    }

    public getAsyncUsernameError(callback: (usernameErrors: Array<String>) => void) {
        this.userService.usernameTaken(this.getUsername(), (usernameTaken: boolean) => {
            const errors = new Array<String>();

            if(usernameTaken) {
                errors.push("Username already in use");
            }

            callback(errors);
        });
    }

    public getErrors(): ISignupFormErrors {
        return {
            email: this.getEmailErrors(),
            username: this.getUsernameErrors().concat(),
            password: this.getPasswordErrors()
        }
    }
}