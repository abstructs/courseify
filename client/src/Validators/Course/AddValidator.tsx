import { Validator } from '../Validator';
import { IAddCourseForm } from 'src/Services/CourseService';

export interface ICourseAddFormErrors {
    title: Array<String>,
    author: Array<String>,
    courseUrl: Array<String>,
    image: Array<String>,
    description: Array<String>,
    category: Array<String>
}

// export interface IAddCourseForm {
//     title: string,
//     author: string,
//     courseUrl: string,
//     description: string,
//     category: string
// }

export class AddValidator extends Validator<IAddCourseForm, ICourseAddFormErrors> {

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
        this.getCourseUrl = () => getForm().courseUrl;
        this.getImageFileName = () => getForm().image.fileName;
        this.getCategory = () => getForm().category;
        this.getDescription = () => getForm().description;
    }


    private getTitleErrors(): Array<String> {
        const errors = new Array<String>();

        if(!super.inRange(this.getTitle(), 1, 20)) {
            errors.push("Invalid title");
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

        if(super.isEmpty(this.getCourseUrl())) {
            errors.push("Url cannot be empty");
        }

        return errors;
    }

    private getImageErrors(): Array<String> {
        const errors = new Array<String>();

        console.log(this.getImageFileName());

        if(!super.isImageType(this.getImageFileName())) {
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

    public getErrors(): ICourseAddFormErrors {
        return {
            title: this.getTitleErrors(),
            author: this.getAuthorErrors(),
            courseUrl: this.getCourseUrlErrors(),
            description: this.getDescriptionErrors(),
            image: this.getImageErrors(),
            category: this.getCategoryErrors()
        }
    }
}