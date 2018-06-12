import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Auth from './Auth';
import { Redirect, matchPath } from 'react-router';
import teacherImage from './images/laptop.jpeg';
import $ from 'jquery';
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
            url: ""
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
        .then(res => {
            $(`#recommendation-modal-${this.state.id}`).modal('hide');
            this.setState({ ...new_data });
        })
        // e.preventDefault();
        // e.stopPropagation();
        // console.log("update")
        // return false;
    }

    handleDelete(e) {
        axios.delete(`http://localhost:3000/api/v1/recommendations/${this.state.id}`)
        .then(res => {
            $(`#recommendation-modal-${this.state.id}`).modal('hide');
        })
    }

    render() {
        // onClick={this.handleDropdown.bind(this)} 
        return (
            <div className="m-2">
                {this.state.title} by {this.state.author}. 
                <button type="button" data-toggle="dropdown" className="btn btn-light dropdown-toggle ml-4"   aria-haspopup="true" aria-expanded="false">
                                
                </button>
                <div className="p-4 dropdown-menu recommendation-dropdown">
                    <p className="text-center">Actions</p>
                    {/* <button className="btn btn-orange text-light m-2">Update</button> */}
                    {/* <button type="button" className="text-light m-2 btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendationModal">Update</button> */}
                    <button type="button" className="btn btn-orange text-light" data-toggle="modal" data-target={`#recommendation-modal-${this.state.id}`}>Update</button>
                    <button className="btn btn-danger text-light m-2">Delete</button>
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
                                <button type="submit" onClick={this.handleUpdate.bind(this)} className="btn text-light m-2 btn-orange">Update</button>
                                <button className="btn btn-danger m-2">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ProfileRecommendation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendations: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/profile/${this.props.profile_info.id}/recommendations`)
        .then(res => {
          const recommendations = res.data.recommendations;

          console.log(this.props.profile_info)
          
          this.setState({ recommendations });          
        })
    }

    render() {
        return (
            <div>
                <div>

                </div>
                {this.state.recommendations.map(recommendation => {
                    // return <div key={recommendation.id}>{recommendation.title} by {recommendation.author}.</div>;
                    return <Recommendation key={recommendation.id} recommendation={recommendation} />
                })}
            </div>
        );
    }
}

class ProfileFollowing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            following: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile_info.id}/following/`)
        .then(res => {
            const following = res.data.following;
            console.log(following)

            this.setState({ following });
        })
    }

    render() {
        return (
            <div>
                {this.state.following.map(follow => {
                    return <div><a href={`/people/${follow.id}`}>{follow.email}</a></div>;
                })}
            </div>
        );
    }
}

class ProfileFollowers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/users/${this.props.profile_info.id}/followers/`)
        .then(res => {
            const followers = res.data.followers;

            console.log(followers);

            this.setState({ followers });
        })
    }

    render() {
        return (
            <div>{this.state.followers.map(follow => {
                return <div><a href={`/people/${follow.id}`}>{follow.email}</a></div>;
            })}</div>
        );
    }
}

class ProfileEdit extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        return (
            <div className="">
                <form>
                    <div className="form-row mb-4">
                        <div className="col-md-4">
                            <label for="first_name">First name</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.first_name} type="text" className="form-control" name="first_name" placeholder="First Name" required />
                        </div>
                            
                        <div className="col-md-4">
                            <label for="last_name">Last Name</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.last_name} type="text" className="form-control" name="last_name" placeholder="Last Name" required />
                        </div>

                        <div className="col-md-4">
                            <label for="headline">Headline</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.headline} type="text" className="form-control" name="headline" placeholder="Job Title" required />
                        </div> 
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-6">
                            <label for="country">Country</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.country} type="text" className="form-control" name="country" placeholder="Country" required />
                        </div>
                                
                        <div className="col-md-6">
                            <label for="education">Education</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.education} type="text" className="form-control" name="education" placeholder="Education" required />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label for="industry">Industry</label>
                            <input onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.industry} type="text" className="form-control" name="industry" placeholder="Industry" required />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col-md-12">
                            <label for="summary">Summary</label>
                            <textarea onChange={this.props.handleUserInfoChange} value={this.props.new_user_info.summary} className="form-control" name="summary" placeholder="Summary" required />
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
            <div>
                {/* <h2 className="text-light font-weight-light p-auto">Andrew Wilson</h2> */}
                {/* <div className="text-center "> */}
                    {/* <p className="d-inline pr-3"><b>0</b> recommendations</p>
                    <p className="d-inline pr-3"><b>0</b> followers</p>
                    <p className="d-inline pr-3"><b>0</b> following</p> */}
                {/* </div> */}
                {/* <br/>
                <br/> */}
                <p className=""><b><i>{this.props.user_info.headline}</i></b> in <b><i>{this.props.user_info.country}</i></b>.</p>
                <p>Involved in <b><i>{this.props.user_info.industry}</i></b>.</p>
                <p className="">Attended <b><i>{this.props.user_info.education}</i></b>.</p>
                <p className="" style={{whiteSpace: "pre-wrap"}}><i>{this.props.user_info.summary}</i></p>
            </div>
        );
    }
}

class Profile extends Component {
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
                    return <ProfileRecommendation profile_info={this.state.profile_info} />;
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

export default Profile;