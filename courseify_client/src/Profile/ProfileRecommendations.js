import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Auth from '../Auth';
import RecommendationCard from '../Recommendation/RecommendationCard';
import CourseCard from '../Course/CourseCard';
import { Grid } from '@material-ui/core';
import SimpleSnackbar from '../Helpers/SimpleSnackbar';
// import { Redirect, matchPath } from 'react-router';
// import teacherImage from './images/laptop.jpeg';
// import $ from 'jquery';
// import swal from 'sweetalert';

{/* <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal"> */}

axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

class ProfileRecommendations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendations: [],
            message: ""
        }
    }

    componentDidMount() {
        console.log(this.props)
        axios.get(`http://localhost:3000/api/v1/recommendations?user_id=${this.props.profile.id}`)
        .then(res => {
            const { recommendations } = res.data;
            this.setState({ recommendations });

        //   console.log(this.props.profile_info);
        //   console.log(recommendations);
          
        //   this.setState({ recommendations });          
        });
    }

    showSnackbar = (message, variant) => {
        this.snackbar.handleClick(message, variant);
        // this.setState({ snackbarClicked: true, message });
    }

    render() {
        return (
            <div>
                <SimpleSnackbar onRef={ref => this.snackbar = ref} />
                {this.state.recommendations.map(recommendation => {
                    const course = recommendation.course;
                    console.log(course)
                    return <CourseCard showSnackbar={this.showSnackbar.bind(this)} current_user={this.props.current_user} course={course} />
                })}
            </div>
        );
    }
}

export default ProfileRecommendations;