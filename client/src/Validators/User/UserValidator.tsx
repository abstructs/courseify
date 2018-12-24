import { Validator } from '../Validator';
import { IUser, IUserEditForm, IUserEditFormErrors } from 'src/Services/UserService';

export interface IEditUserFormErrors {

}

export class UserValidator extends Validator<IUserEditForm, IEditUserFormErrors> {

    constructor(getForm: () => IUser) {
        super();

    }

    public getErrors(): IUserEditFormErrors {
        return {
        }
    }
}