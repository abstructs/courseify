import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './Auth';
import { Redirect } from 'react-router';
import teacherImage from './images/laptop.jpeg';

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xl-5 mt-4 mr-auto pl-5 pr-5">
                <form>
                    <div className="form-row mb-4">
                        <div className="col-md-4">
                            <label for="first_name">First name</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.first_name} type="text" className="form-control" name="first_name" placeholder="First Name" required />
                        </div>
                            
                        <div className="col-md-4">
                            <label for="last_name">Last Name</label>
                            <input onChange={this.props.handleUserInfoChange} type="text" className="form-control" name="last_name" placeholder="Last Name" required />
                        </div>

                        <div className="col-md-4">
                            <label for="headline">Headline</label>
                            <input onChange={this.props.handleUserInfoChange} type="text" className="form-control" name="headline" placeholder="Job Title" required />
                        </div> 
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-6">
                            <label for="country">Country</label>
                            <input onChange={this.props.handleUserInfoChange} type="text" className="form-control" name="country" placeholder="Country" required />
                        </div>
                                
                        <div className="col-md-6">
                            <label for="school">Education</label>
                            <input onChange={this.props.handleUserInfoChange} type="text" className="form-control" name="school" placeholder="School" required />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label for="industry">Industry</label>
                            <input onChange={this.props.handleUserInfoChange} type="text" className="form-control" name="industry" placeholder="Industry" required />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label for="summary">Summary</label>
                            <textarea onChange={this.props.handleUserInfoChange} className="form-control" name="summary" placeholder="Summary" required />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xl-4 mt-4 mr-auto text-center">
                {/* <h2 className="text-light font-weight-light p-auto">Andrew Wilson</h2> */}
                <p className="d-inline pr-3"><b>0</b> recommendations</p>
                <p className="d-inline pr-3"><b>0</b> followers</p>
                <p className="d-inline pr-3"><b>0</b> following</p>

            </div>
        );
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            save: false,

            // for profile edit
            new_user_info: {
                first_name: "test",
                last_name: "", 
                headline: "",
                education: "",
                industry: "",
                country: "",
                summary: ""
            },

            // user info
            user_info: {}
        }
    }

    componentWillMount() {
        this.setUserInfo();
    }

    setUserInfo() {
        axios.get("http://localhost:3000/api/v1/profile", { headers: Auth().headers() })
        .then(res => {
            this.setState({
                user_info: res.data.user,
                new_user_info: res.data.user
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleUserInfoChange(event) {  
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            // ...prevState,
            new_user_info: {
                ...prevState.new_user_info,
                [name]: value
            }
        })); 

        // console.log(this.state)
    }

    handleSave(e) {
        axios.put("http://localhost:3000/api/v1/users/" + this.state.id, this.state.new_user_info)
        .then(res => {
            this.setUserInfo();
            this.setState({edit: !this.state.edit});
        })
        .catch(err => {} /* TODO: Error handling */);        
    }

    handleEdit(e) {
        this.setState({edit: !this.state.edit});
    }

    handleCancel(e) {
        this.setState({edit: false});
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        
        if(!isLoggedIn) {
            return <Redirect to='/'/>;
        }

        const middleSection = this.state.edit ? <ProfileEdit new_user_info={this.state.new_user_info} handleUserInfoChange={this.handleUserInfoChange.bind(this)} /> : <ProfileInfo />

        if(Object.keys(this.state.user_info).length == 0) {
            return <div>Loading</div>
        }

        return (
            <div>
                <header className="bg-dark border-0 pt-5" style={{marginBottom: "0px", height: "150px", backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
                    
                </header>
                <section>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="rounded-circle border border-white bg-dark ml-auto mr-auto p-auto text-center" style={{height: "150px", width: "150px", marginTop: "-70px"}}></div>   
                            <h2 className="text-dark text-center font-weight-light p-auto">{this.state.user_info.first_name + " " + this.state.user_info.last_name}</h2>
                            <div className="mb-2 mt-4 text-center">
                            {
                                !this.state.edit ?
                                <a href="#edit" className="btn text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleEdit.bind(this)}>Edit</a>
                                :
                                <div>
                                    <a href="#save" className="btn text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleSave.bind(this)}>Save</a>
                                    <a href="#cancel" className="btn text-white m-auto text-center btn-primary" style={{width: "250px"}} onClick={this.handleCancel.bind(this)}>Cancel</a>
                                </div>
                            }
                                {/* <a href="#edit" className="btn text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleEdit.bind(this)}>{!this.state.edit ? "Edit" : "Save"}</a> */}
                            
                            </div>
                            {/* <div className="mb-2 text-center">
                                <a href="#message" className="btn btn-primary text-white m-auto text-center" style={{width: "250px"}}>Message</a>
                            </div> */}
                        </div>
                        {middleSection}
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;