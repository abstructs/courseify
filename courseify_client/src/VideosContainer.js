import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class VideosContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/videos.json")
        .then(response => {
            console.log(response)
            this.setState({videos: response.data})
        }).catch(error => console.log(error));
    }

    render() {
        return (
        <div>
            <div className="Videos-header">
            <h1>Videos</h1>
            </div>
        </div>
        );
    }
}

export default VideosContainer;