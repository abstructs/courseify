import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Redirect } from 'react-router';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: {
                emailErrors: [],
                passwordErrors: []
            },
            redirect: false
        }
    }

    componentDidMount() {
        console.log(this.state)
        // axios.get("http://localhost:3000/api/v1/videos.json")
        // .then(response => {
        //     console.log(response)
        //     this.setState({videos: response.data})
        // }).catch(error => console.log(error));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log(this.state)
    }

    handleSubmit(event) {
        console.log(this.state.passwordConfirmation)
        axios.post("http://localhost:3000/api/v1/users/",
        {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            }
        })
        .then(res => {
            this.setState({
                redirect: true
            })
        })
        .catch(err => {
            const errors = err.response.data.errors;
            const emailErrors = errors.email || [];
            const passwordErrors = errors.password || [];
            // console.log(emailErrors)
            this.setState({
                errors: {
                    emailErrors,
                    passwordErrors
                }
            })
        });
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
        <div className="bg-dark">
            {this.state.errors.emailErrors.map(errMsg => {
                return (
                    <div className="alert alert-danger m-0 border-0" role="alert">
                        {"Email " + errMsg}
                    </div>
            )})}
            {this.state.errors.passwordErrors.map(errMsg => {
                    return (
                        <div className="alert alert-danger m-0 border-0" role="alert">
                            {"Password " + errMsg}
                        </div>
                    );
            })}
            <h1 className="text-center text-light mb-5">SignUp</h1>
            <div className="pt-5">
                <form>
                    <div className="form-group col-md-6 offset-3">
                        <label className="text-light" htmlFor="email">Email</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="email" name="email" />
                        <br/>
                        <label className="text-light" htmlFor="password">Password</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="password" name="password" />
                        <br/>
                        <label className="text-light" htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="password" name="passwordConfirmation" />
                        <button onClick={this.handleSubmit.bind(this)} className="btn btn-primary mt-3" type="button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default SignUp;