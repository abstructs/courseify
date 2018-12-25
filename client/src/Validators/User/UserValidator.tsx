import { Validator } from '../Validator';
import { IEditUserForm, IUserEditFormErrors } from 'src/Services/UserService';

export class UserValidator extends Validator<IEditUserForm, IUserEditFormErrors> {

    private getFirstName: () => string;
    private getLastName: () => string;
    private getEducation: () => string;
    private getHeadline: () => string;
    private getCountry: () => string;
    private getIndustry: () => string;
    private getSummary: () => string;

    constructor(getForm: () => IEditUserForm) {
        super();

        this.getFirstName = () => getForm().first_name;
        this.getLastName = () => getForm().last_name;
        this.getEducation = () => getForm().education;
        this.getHeadline = () => getForm().headline;
        this.getCountry = () => getForm().country;
        this.getIndustry = () => getForm().industry;
        this.getSummary = () => getForm().summary;

        // id: number,
        // email: string,
        // // username: string,
        // first_name: string,
        // last_name: string,
        // education: string,
        // headline: string,
        // country: string,
        // industry: string,
        // summary: string,
    }


    private getFirstNameErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getFirstName())) {
            errors.push("Invalid first name");
        }

        return errors;
    }

    private getLastNameErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getLastName())) {
            errors.push("Invalid last name");
        }

        return errors;
    }

    private getEducationErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getEducation())) {
            errors.push("Invalid education");
        }

        return errors;
    }

    private getHeadlineErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getHeadline())) {
            errors.push("Invalid headline");
        }

        return errors;
    }

    private getIndustryErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getIndustry())) {
            errors.push("Invalid industry");
        }

        return errors;
    }

    private getCountryErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getCountry())) {
            errors.push("Invalid country");
        }

        return errors;
    }

    private getSummaryErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getSummary())) {
            errors.push("Invalid summary");
        }

        return errors;
    }

    public getErrors(): IUserEditFormErrors {
        return {
            first_name: this.getFirstNameErrors(),
            last_name: this.getLastNameErrors(),
            education: this.getEducationErrors(),
            headline: this.getHeadlineErrors(),
            country: this.getCountryErrors(),
            industry: this.getIndustryErrors(),
            summary: this.getSummaryErrors()
        }
    }
}