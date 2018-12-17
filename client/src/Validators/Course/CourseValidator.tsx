import { Validator } from '../Validator';
import { IAddCourseForm, ICourseFormErrors } from 'src/Services/CourseService';

// export interface IAddCourseForm {
//     title: string,
//     author: string,
//     courseUrl: string,
//     description: string,
//     category: string
// }

export class CourseValidator extends Validator<IAddCourseForm, ICourseFormErrors> {

    private getTitle: () => string;
    private getAuthor: () => string;
    private getCourseUrl: () => string;
    private getImageFileName: () => string;
    private getDescription: () => string;
    private getCategory: () => string;

    constructor(getForm: () => IAddCourseForm) {
        super();

        this.getTitle = () => getForm().title;
        this.getAuthor = () => getForm().author;
        this.getCourseUrl = () => getForm().url;
        this.getImageFileName = () => getForm().image.fileName;
        this.getCategory = () => getForm().category;
        this.getDescription = () => getForm().description;
    }


    private getTitleErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getTitle(), 5, 30)) {
            errors.push("Title must be 5 to 30 characters long");
        }

        return errors;
    }

    private getAuthorErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getAuthor(), 1, 20)) {
            errors.push("Invalid author");
        }

        return errors;
    }

    private getCourseUrlErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isValidUrl(this.getCourseUrl())) {
            errors.push("Not a valid url");
        }

        return errors;
    }

    private getImageErrors(): Array<String> {
        const errors = new Array<String>();

        if(!this.isEmpty(this.getImageFileName()) && !super.isImageType(this.getImageFileName())) {
            errors.push("Invalid file type");
        }

        return errors;
    }

    private getDescriptionErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getDescription(), 1, 20)) {
            errors.push("Invalid description");
        }

        return errors;
    }

    private getCategoryErrors(): Array<String> {
        const errors = new Array<String>();

        if(super.isEmpty(this.getCategory())) {
            errors.push("Invalid category");
        }

        return errors;
    }

    public getErrors(): ICourseFormErrors {
        return {
            title: this.getTitleErrors(),
            author: this.getAuthorErrors(),
            url: this.getCourseUrlErrors(),
            description: this.getDescriptionErrors(),
            image: this.getImageErrors(),
            category: this.getCategoryErrors()
        }
    }
}