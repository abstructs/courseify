import { Service } from './Service';
import axios from 'axios';
import { IUser } from './UserService';

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

export interface IRecommendation {
    id: number,
    user_id: number,
    course_id: number,
    user: IUser
}

export interface ICourse {
    id: number,
    user_id: number,
    title: string,
    author: string,
    image: IImage,
    url: string,
    description: string,
    category: string,
    image_url: string | null,
    created_at: string,
    updated_at: string,
    current_user_recommended: boolean,
    recommendations: Array<IRecommendation>
}

export interface IImage {
    fileName: string,
    imageUrl: string,
    file: File | null
}

export enum Category {
    All = "all",
    ComputerScience = "computer_science",
    DataScience = "data_science"
}

export class CourseService extends Service {

    constructor() {
        super();
    }

    getOne(courseId: number, onSuccess: (course: ICourse) => void, onError: (reason: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses/${courseId}`, 
        { headers: { ...super.getAuthHeader() }})
        .then(res => res.data.course)
        .then(onSuccess)
        .then(onError);
    }

    getAll(onSuccess: (courses: ICourse[]) => void, onError: (reason: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses?category=all`, 
        { headers: { ...super.getAuthHeader() }})
        .then(res => res.data.courses)
        .then(onSuccess)
        .catch(onError);
    }

    getByCategory(category: Category, onSuccess: (courses: ICourse[]) => void, onError: (reason: any) => void) {
        axios.get(`${super.getApiUrl()}/api/v1/courses?category=${category}`, 
        { headers: { ...super.getAuthHeader() }})
        .then(res => { 
            console.log("hi")
            console.log(res.data);
            return res.data.courses;
        })
        .then(onSuccess)
        .catch(onError);
    }

    recommendCourse(courseId: number, onSuccess: () => void, onError: () => void) {
        const payload = {
            course_id: courseId
        }

        axios.post(`${super.getApiUrl()}/api/v1/recommendations`, payload, 
        { headers: { ...super.getAuthHeader() } })
        .then(onSuccess)
        .then(onError);
    } 

    unrecommendCourse(courseId: number, onSuccess: () => void, onError: () => void) {
        axios.delete(`${super.getApiUrl()}/api/v1/recommendations/${courseId}`, { headers: { ...super.getAuthHeader() } })
        .then(onSuccess)
        .then(onError);
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

    updateCourse(course: IEditCourseForm, onSuccess: (course: IEditCourseForm) => void, onError: (reason: any) => void) {
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
        .then(() => onSuccess(course))
        .catch(onError);
    }

    deleteCourse(courseId: number, onSuccess: (res: any) => void, onError: (reason: any) => void) {
        axios.delete(`${super.getApiUrl()}/api/v1/courses/${courseId}`, 
            { headers: { 'Content-Type': 'multipart/form-data', ...super.getAuthHeader() }})
        .then(onSuccess)
        .catch(onError);
    }
}