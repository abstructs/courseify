import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Auth from './Auth';

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
        const payload = {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            }
        }
        
        axios.post("http://localhost:3000/api/v1/users/", payload)
        .then(res => Auth().authenticate(payload.user))
        .then(res => localStorage.setItem('token', res.data.jwt))
        .then(res => this.setState({redirect: true}))
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
        <div className="bg-light">
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
            <br/>
            <h1 className="text-center text-dark">Sign Up</h1>
            <p className="text-center text-dark">Ready to get this party rolling?... Oh yeah, if you're already a member hit <a href="/login">this</a>.</p>
            <div className="pt-2">
                <form>
                    <div className="form-group col-md-6 m-auto">
                        <label className="text-dark" htmlFor="email">Email</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="email" name="email" />
                        <br/>
                        <label className="text-dark" htmlFor="password">Password</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="password" name="password" />
                        <br/>
                        <label className="text-dark" htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="password" name="passwordConfirmation" />
                        <button onClick={this.handleSubmit.bind(this)} className="btn mt-3 pr-5 pl-5 text-white" style={{backgroundColor: "#ff6000"}} type="button">Join</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default SignUp;