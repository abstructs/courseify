import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import { Redirect, matchPath } from 'react-router';
import teacherImage from '../images/laptop.jpeg';
// import $ from 'jquery';
import swal from 'sweetalert';

import ProfileEdit from './ProfileEdit';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowing from './ProfileFollowing';
import ProfileInfo from './ProfileInfo';
import ProfileRecommendation from './ProfileRecommendation';

// , ProfileFollowers, ProfileFollowing, ProfileInfo, ProfileRecommendation }

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        // const is_profile = 
        const parsedJwt = Auth().paraseJwt();

        this.state = {
            current_user_id: parsedJwt ? parsedJwt.sub.user.id : -1,
            is_current_user_profile: false,
            edit: false,
            save: false,
            follow_info: {
                is_following: false,
                id: -1
            },

            // tab logic
            tab: "info",
            // for profile edit
            new_profile_info: {},

            // user info
            profile_info: {}
        }
    }

    // EFFECTS: Gets the parameters from the url react router style
    getMatch() {
        return matchPath(this.props.history.location.pathname, {
            path: '/people/:id',
            exact: true,
            strict: false
        });
    }

    componentWillMount() {
        this.setUserInfo();
    }

    incrementRecommendations(num) {
        this.setState(prevState => ({
            profile_info: {
                ...prevState.profile_info,
                recommendationsCount: this.state.profile_info.recommendationsCount + num
            }
        }));
    }

    // EFFECTS: Manages the data set on the profile page depending on if it's the current users profile or another user's
    setUserInfo() {
        
        const url = this.getMatch() ? "http://localhost:3000/api/v1/users/" + this.getMatch().params.id : 
                                      "http://localhost:3000/api/v1/profile";

        // const data = this.getMatch() ? {} : { headers: Auth().headers() };
        axios.get(url)
        .then(res => {
            const profile_info = res.data.user;
            const is_current_user_profile = res.data.user.id === this.state.current_user_id;
            const new_profile_info = is_current_user_profile ? profile_info : [];
            const follow_info = profile_info.follow_info;
            console.log(res)

            this.setState({ profile_info, new_profile_info, is_current_user_profile, follow_info });

            
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
            new_profile_info: {
                ...prevState.new_profile_info,
                [name]: value
            }
        })); 

        // console.log(this.state)
    }

    handleSave(e) {
        axios.put("http://localhost:3000/api/v1/users/" + this.state.current_user_id, this.state.new_profile_info)
        .then(res => swal({
                title: "Success",
                text: "The new profile is looking sexy ;)!",
                icon: "success"
            })
        )
        .then(_ => this.setUserInfo())
        .then(_ => this.setState({edit: !this.state.edit}))
        .catch(err => {
            swal({
                title: "Something went wrong!",
                // text: "Please check the error messages!",
                text: "Todo: error message here",
                icon: "error",
                dangerMode: true
                // text: err.response.data
            })
        });        
    }

    handleEdit(e) {
        this.setState({edit: !this.state.edit});
    }

    handleCancel(e) {
        this.setState({edit: false});
    }

    handleFollow(e) {
        if(this.state.is_current_user_profile) return;
        axios.post("http://localhost:3000/api/v1/follows", { followed_id: this.state.profile_info.id })
        .then(res => {
            this.setState(prevState => ({
                follow_info: {
                    ...prevState.follow_info,
                    is_following: true
                }
            }))
        })
        .then(res => {
            this.setUserInfo();
        })
    }

    handleUnfollow(e) {
        if(this.state.is_current_user_profile) return;
        axios.delete("http://localhost:3000/api/v1/follows/" + this.state.follow_info.follow_id)
        .then(res => {
            this.setState(prevState => ({
                follow_info: {
                    ...prevState.follow_info,
                    is_following: false
                }
            }))
        })
        .then(res => {
            this.setUserInfo();
        })
    }

    render() {
        const isLoggedIn = Auth().isAuthenticated();
        
        if(!isLoggedIn && !this.getMatch()) {
            return <Redirect to='/'/>;
        }

        if(Object.keys(this.state.profile_info).length == 0) {
            return <div>Loading</div>
        }

        const middleSection = this.state.edit ? <ProfileEdit new_user_info={this.state.new_profile_info} handleUserInfoChange={this.handleUserInfoChange.bind(this)} /> : <ProfileInfo user_info={this.state.profile_info}/>;

        const editFunctions = !this.state.edit ? (this.state.tab == "info" ? <a href="#edit" className="btn m-2 text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleEdit.bind(this)}>Edit</a> : <div></div>)
                                              :
                                                <div>
                                                    <a href="#save" className="btn text-white m-auto text-center" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleSave.bind(this)}>Save</a>
                                                    <a href="#cancel" className="btn text-white m-2 text-center btn-primary" style={{width: "250px"}} onClick={this.handleCancel.bind(this)}>Cancel</a>
                                                </div>;
        const otherFunctions = <div>
                                <div className="mb-2 text-center">
                                    {
                                        this.state.follow_info.is_following ?
                                        <a onClick={ this.handleUnfollow.bind(this) } href="#" className="btn text-white m-auto text-center" style={{backgroundColor: "#ff6000", width: "250px"}}>Unfollow</a>
                                        :
                                        <a onClick={this.handleFollow.bind(this)} href="#" className="btn text-white m-auto text-center" style={{backgroundColor: "#ff6000", width: "250px"}}>Follow</a>
                                    }
                                    

                                </div>
                                {/* <div className="mb-2 text-center">
                                    <a href="#message" className="btn btn-primary text-white m-auto text-center" style={{width: "250px"}}>Message</a>
                                </div> */}
                               </div>;

        const content = () => {
            switch(this.state.tab) {
                case "info":
                    return middleSection;
                case "recommendations":
                    return <ProfileRecommendation incrementRecommendations={this.incrementRecommendations.bind(this)} profile_info={this.state.profile_info} />;
                case "following":
                    return <ProfileFollowing profile_info={this.state.profile_info} />;
                case "followers":
                    return <ProfileFollowers profile_info={this.state.profile_info} />;
                default:
                    return <div>Something went wrong :(.</div>;
            }
        }

        if(!this.state.profile_info) {
            return <div>Loading</div>;
        }

        return (
            <div>
                <header className="bg-dark border-0 pt-5" style={{marginBottom: "0px", height: "150px", backgroundImage: "url(" + teacherImage +")", backgroundPosition: "250px 660px"}}>
                    
                </header>
                <section>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="rounded-circle border border-white bg-dark ml-auto mr-auto p-auto text-center" style={{height: "150px", width: "150px", marginTop: "-70px"}}></div>   
                                <h2 className="text-dark text-center font-weight-light p-auto">{this.state.profile_info.first_name + " " + this.state.profile_info.last_name}</h2>
                                <div className="mb-2 mt-4 text-center">
                                { isLoggedIn ? (this.state.is_current_user_profile ? editFunctions : otherFunctions) : <div></div> }
                            </div>

                        </div>  
                        <div className  ="col-xl-5 m-4 text-center text-justify">
                            <ul className="nav nav-tabs nav-fill mb-4">
                                <li name="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "info" ? "active" : "")} onClick={() => {this.setState({tab: "info"})}}>Info</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "recommendations" ? "active" : "")} onClick={() => {this.setState({tab: "recommendations"})}}>Recommendations ({this.state.profile_info.recommendationsCount || 0})</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "followers" ? "active" : "")} onClick={() => {this.setState({tab: "followers"})}}>Followers ({this.state.profile_info.followerCount || 0})</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className={"nav-link " + (this.state.tab == "following" ? "active" : "")} onClick={() => {this.setState({tab: "following"})}}>Following ({this.state.profile_info.followingCount || 0})</a>
                                </li>
                            </ul>
                            {content()}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProfileContainer;