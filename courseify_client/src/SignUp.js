import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
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
        axios.post("http://localhost:3000/api/v1/users/",
        {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        return (
        <div className="bg-dark pt-5">
            <h1 className="text-center text-light mb-5">SignUp</h1>
            <div className="">
                <form>
                    <div className="form-group col-md-6 offset-3">
                        <label className="text-light" htmlFor="email">Email</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="email" name="email" />
                        <br/>
                        <label className="text-light" htmlFor="password">Password</label>
                        <input onChange={this.handleInputChange.bind(this)} className="form-control" type="password" name="password" />
                        <input onClick={this.handleSubmit.bind(this)} className="btn btn-primary mt-3" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default SignUp;