import { Service } from './Service';
import axios from 'axios';

export interface IAddCourseForm {
    title: string,
    author: string,
    url: string,
    description: string,
    category: string,
    image: IImage
}

export interface IImage {
    fileName: string,
    imageUrl: string,
    file: File | null
}

export class CourseService extends Service {

    constructor() {
        super();
    }

    getAll(callback: (res: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses`)
        .then(res => {
            console.log(res);
        })
    }

    addCourse(course: IAddCourseForm, onSuccess: (res: any) => void, onError: (reason: any) => void) {
        const formData = new FormData();

        Object.keys(course).map(key => {
            formData.append(key, course[key]);
        });

        formData.delete("image");

        if(course.image.file != null) {
            formData.append("image", course.image.file);
        }

        axios.post(`${super.getApiUrl()}/api/v1/courses/`, formData, 
            { headers: { 'Content-Type': 'multipart/form-data', ...super.getAuthHeader() }})
        .then((res) => {
            console.log(res)
        })
        .then(onSuccess)
        .catch(onError);
    }
}