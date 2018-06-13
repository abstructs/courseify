import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
import $ from 'jquery';
import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class Recommendation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title : "",
            author: "",
            description: "",
            url: "",
            deleted: false
        }
    }

    componentWillMount() {
        this.setState({
            ...this.props.recommendation
        })
        // console.log(this.props.recommendation);
    }

    handleRecommendationChange(event) {  
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleUpdate(e) {
        const new_data = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            url: this.state.url
        }
        
        axios.put(`http://localhost:3000/api/v1/recommendations/${this.state.id}`, new_data)
        .then(res => this.setState({ ...new_data }))
        .then(_ => 
            swal({
                    title: "Success",
                    text: "Update totally went through :)",
                    icon: "success",
                    timer: 3000
            })
        )
        .then(_ => $(`#recommendation-modal-${this.state.id}`).modal('hide'));
        // e.preventDefault();
        // e.stopPropagation();
        // console.log("update")
        // return false;
    }

    handleDelete(e) {
        swal({
            title: "Are you sure?",
            text: "Once it's gone... It's gone.",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then(willDelete => {
            if(willDelete) {
                axios.delete(`http://localhost:3000/api/v1/recommendations/${this.state.id}`)
                .then(res => {
                    swal("Poof! It's been deleted", {
                        icon: "success",
                    })
                    .then(_ => $(`#recommendation-modal-${this.state.id}`).modal('hide'))
                    .then(_ => { 
                        this.props.incrementRecommendations(-1);
                        this.setState({ deleted: true });
                    });
                })
            } else {
                swal("It's all good, it's safe!");
            }
        })
        console.log("run")

    }

    render() {
        if(this.state.deleted) return <div></div>;
        // onClick={this.handleDropdown.bind(this)} 
        return (
            <div className="">
                <div className="card m-2" style={{width: "16rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">By {this.state.author}</h6>
                        <p className="card-text">{this.state.description}</p>

                        <button type="button" data-toggle="dropdown" className="btn btn-light dropdown-toggle ml-4" aria-haspopup="true" aria-expanded="false">Options</button>
                        <a href={this.state.url} target="__blank" className="btn btn-orange text-light">Check It Out</a>

                        <div className="p-4 dropdown-menu recommendation-dropdown">
                            <p className="text-center">Actions</p>
                            {/* <button className="btn btn-orange text-light m-2">Update</button> */}
                            {/* <button type="button" className="text-light m-2 btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendationModal">Update</button> */}
                            <button type="button" className="btn btn-orange text-light" data-toggle="modal" data-target={`#recommendation-modal-${this.state.id}`}>Update</button>
                            <button onClick={this.handleDelete.bind(this)} className="btn btn-danger text-light m-2">Delete</button>
                        </div>
                    </div>
                </div>



                <div className="modal fade" id={`recommendation-modal-${this.state.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Change Your Recommendation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form >
                                    <div className="form-group">
                                        <label className="mr-auto">Title</label>
                                        <input id={`title_${this.state.id}`} name="title" type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleRecommendationChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Author</label>
                                        <input id={`author_${this.state.id}`} name="author" type="text" className="form-control" placeholder="Author" value={this.state.author} onChange={this.handleRecommendationChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Link</label>
                                        <input id={`url_${this.state.id}`} name="url" type="text" className="form-control" placeholder="Link" value={this.state.url} onChange={this.handleRecommendationChange.bind(this)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea id={`description_${this.state.id}`} name="description" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleRecommendationChange.bind(this)} required></textarea>
                                    </div>
                                    {/* <div className="form-check">
                                        <input id={`description_${this.state.id}`} type="checkbox" className="form-check-input" />
                                        <label className="form-check-label">
                                        Remember me
                                        </label>
                                    </div> */}
                                    {/* <button type="submit" onClick={this.handleUpdate.bind(this)} className="btn text-light mr-2 btn-orange">Update</button>
                                    <button className="btn btn-danger">Delete</button> */}
                                </form> 
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary m-2" data-dismiss="modal">Close</button>
                                <button type="button" onClick={this.handleUpdate.bind(this)} className="btn text-light m-2 btn-orange">Save</button>
                                <button type="button" onClick={this.handleDelete.bind(this)} className="btn btn-danger m-2">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recommendation;