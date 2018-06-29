import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import RecommendationCard from '../Recommendation/RecommendationCard';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
// import $ from 'jquery';
// import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileRecommendations extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            recommendations: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/v1/profile/${this.props.profile.id}/recommendations`)
        .then(res => {
          const recommendations = res.data.recommendations;

          console.log(this.props.profile_info)
          
          this.setState({ recommendations });          
        })
    }

    render() {
        return (
            <div className="card-group justify-content-center">
                {this.state.recommendations.map(recommendation => {
                    return <div>hi</div>;
                })}
            </div>
        );
    }
}

export default ProfileRecommendations;