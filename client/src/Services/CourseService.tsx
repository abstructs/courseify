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

export interface IEditCourseForm {
    id: number,
    title: string,
    author: string,
    url: string,
    description: string,
    category: string,
    image: IImage
}

export interface ICourseFormErrors {
    title: Array<String>,
    author: Array<String>,
    url: Array<String>,
    image: Array<String>,
    description: Array<String>,
    category: Array<String>
}

export interface ICourse {
    id: number,
    user_id: number,
    title: string,
    author: string,
    url: string,
    description: string,
    category: string,
    image_url: string | null,
    created_at: string,
    updated_at: string
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

    getAll(onSuccess: (courses: ICourse[]) => void, onError: (reason: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses?category=all`)
        .then(res => res.data.courses)
        .then(onSuccess)
        .catch(onError);
    }

    getByCategory(category: string, callback: (res: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses?category=${category}`)
        .then(callback);
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
        // .then((res) => {
        //     console.log(res)
        // })
        .then(onSuccess)
        .catch(onError);
    }

    updateCourse(course: IEditCourseForm, onSuccess: (res: any) => void, onError: (reason: any) => void) {
        const formData = new FormData();

        Object.keys(course).map(key => {
            formData.append(key, course[key]);
        });

        formData.delete("image");

        if(course.image.file != null) {
            formData.append("image", course.image.file);
        }

        axios.put(`${super.getApiUrl()}/api/v1/courses/${course.id}`, formData, 
            { headers: { 'Content-Type': 'multipart/form-data', ...super.getAuthHeader() }})
        // .then((res) => {
        //     console.log(res)
        // })
        .then(onSuccess)
        .catch(onError);
    }
}