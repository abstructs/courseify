import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import $ from 'jquery';
import swal from 'sweetalert';
// import { Redirect } from 'react-router';

const initialState = {
    recommendation: {
        title: "",
        author: "",
        url: "",
        description: ""
    },
    formErrors: {
        title: "",
        author: "",
        url: "",
        description: ""
    }
}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class RecommendationCreateModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = initialState;

    }

    handleSubmit(e) {
        axios.post("http://localhost:3000/api/v1/recommendations", this.state.recommendation)
        .then( _ => this.setState({ ...initialState }))
        .then(_ => {
            swal({
                title: "Success",
                text: "Your recommendation is out there and helping others!",
                icon: "success"
            })
        })
        .then(_ => $('#recommendModal').modal('hide'))
        .catch(err => {
            this.setState(prevState => ({
                formErrors: {
                    ...prevState.formErrors,
                    title: this.validateTitle(),
                    author: this.validateAuthor(),
                    url: this.validateUrl(),
                    description: this.validateDescription()
                }
            }));

            swal({
                title: "Something went wrong!",
                text: "Please check the error messages!",
                icon: "error",
                dangerMode: true
                // text: err.response.data
            })
        });
    }

    validateTitle() {
        let error = "";
        if(this.state.recommendation.title == "") {
            error = "Title can't be blank.";
        }

        return error;
    }

    validateAuthor() {
        let error = "";
        if(this.state.recommendation.author == "") {
            error = "Author can't be blank.";
        }

        return error;
    }

    validateUrl() {
        let error = "";
        if(this.state.recommendation.url == "") {
            error = "Url can't be blank.";
        }

        return error;
    }

    validateDescription() {
        let error = "";
        if(this.state.recommendation.description == "") {
            error = "Description can't be blank.";
        }

        return error;
    }
    
    
    handleInputChange(event) {  
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            // ...prevState,
            recommendation: {
                ...prevState.recommendation,
                [name]: value
            }
        }));
    } 

    render() {
        return (
            <div>
                <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal">
                    Recommend Something
                </button>

                <div className="modal fade" id="recommendModal" tabIndex="-1" role="dialog" aria-labelledby="recommendModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h5 className="modal-title" id="recommendModalLabel">Recommend Something</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-row mb-3">
                                        <label className="" htmlFor="title">Title*</label>
                                        <input onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.title} name="title" type="text" placeholder="Title" className={`form-control ${this.state.formErrors.title != "" && "border-danger"}`} />
                                        {<small className="m-1 text-danger">{this.state.formErrors.title}</small>}
                                    </div>
                                    <div className="form-row mb-3">
                                        <label className="" htmlFor="author">Author*</label>
                                        <input onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.author} name="author" type="text" placeholder="Author" className={`form-control ${this.state.formErrors.author != "" && "border-danger"}`} />
                                        {<small className="m-1 text-danger">{this.state.formErrors.author}</small>}
                                    </div>
                                    <div className="form-row mb-3">
                                        <label className="" htmlFor="url">URL*</label>
                                        <input onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.url} name="url" type="text" placeholder="URL" className={`form-control ${this.state.formErrors.url != "" && "border-danger"}`} />
                                        {<small className="m-1 text-danger">{this.state.formErrors.url}</small>}
                                    </div>
                                    <div className="form-row">
                                        <label className="" htmlFor="description">Description*</label>
                                        <textarea onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.description} name="description" className={`form-control ${this.state.formErrors.description != "" && "border-danger"}`} placeholder="Description"></textarea>
                                        {<small className="m-1 text-danger">{this.state.formErrors.description}</small>}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn text-light" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleSubmit.bind(this)}>Make Recommendation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendationCreateModal;