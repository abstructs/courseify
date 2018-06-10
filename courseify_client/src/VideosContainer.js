import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar.js';
import Auth from './Auth';
import { Redirect } from 'react-router';

class VideosContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            active_video_id: 1
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/videos.json", { headers: Auth().headers() })
        .then(response => {
            console.log(response)
            this.setState({videos: response.data})
        }).catch(error => console.log(error));
    }

    render() {
        if(!Auth().isAuthenticated()) {
            return <Redirect to='/'/>;
        }

        return (
        <div className="bg-light">
            {/* <Navbar/> */}
            <div className="container">
                <div className="row">
                    <div className="offset-7">
                        <br/>
                        <h1 class="text-dark text-right font-weight-light">Videos</h1>
                        <hr/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
            
            <div className="container">
                <div className="row">
                    <div id="side-menu" className="bg-light col-md-4 text-light">
                        {this.state.videos.map(video => {
                            return (
                                <div>
                                    <button className={"btn btn-lg btn-block " + (video.id == this.state.active_video_id ? "btn-outline-info" : "btn-outline-dark")}>
                                        <small className="font-weight-light">Title: {video.title}</small>
                                        <br/>
                                        <small className="font-weight-light">Description: {video.description}</small>
                                        
                                        {/* <div>{video.description}</div> */}
                                    </button>
                                    <br/>
                                </div>
                            );
                        })}
                    </div>
                    <div id="player" className="col-md-8x bg-light">
                        <video width="100%" height="100%" controls>
                            <source src="movie.mp4" type="video/mp4"/>
                            <source src="movie.ogg" type="video/ogg"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default VideosContainer;