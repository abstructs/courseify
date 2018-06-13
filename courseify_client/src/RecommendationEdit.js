// import React, { Component } from 'react';
// import './App.css';
// import axios from 'axios';
// import Auth from './Auth';
// import $ from 'jquery';
// // import { Redirect } from 'react-router';

// axios.defaults.headers.common['Authorization'] = Auth().headers()['Authorization'];

// class RecommendationEdit extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             recommendation: {
//                 title: "",
//                 author: "",
//                 url: "",
//                 description: ""
//             }
//         }
//     }

//     handleSubmit(e) {
//         axios.post("http://localhost:3000/api/v1/recommendations", this.state.recommendation)
//         .then(res => {
//             $('#recommendModal').modal('hide');
//         })
//         .catch(err => console.error(err));
//     }
    
//     handleInputChange(event) {  
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;

//         this.setState(prevState => ({
//             // ...prevState,
//             recommendation: {
//                 ...prevState.recommendation,
//                 [name]: value
//             }
//         }));
//     } 

//     render() {
//         return (
//             <div>
//                 <button type="button" className="text-light nav-link btn" style={{width: "250px", backgroundColor: "#ff6000"}} data-toggle="modal" data-target="#recommendModal">
//                     Recommend Something
//                 </button>

//                 <div className="modal fade" id="recommendModal" tabIndex="-1" role="dialog" aria-labelledby="recommendModalLabel" aria-hidden="true">
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header border-0">
//                                 <h5 className="modal-title" id="recommendModalLabel">Recommend Something</h5>
//                                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 <form>
//                                     <div className="form-row mb-3">
//                                         <label className="" htmlFor="title">Title*</label>
//                                         <input onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.title} name="title" type="text" placeholder="Title" className="form-control" />
//                                     </div>
//                                     <div className="form-row mb-3">
//                                         <label className="" htmlFor="author">Author*</label>
//                                         <input onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.author} name="author" type="text" placeholder="Author" className="form-control" />
//                                     </div>
//                                     <div className="form-row mb-3">
//                                         <label className="" htmlFor="url">URL*</label>
//                                         <input onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.url} name="url" type="text" placeholder="URL" className="form-control" />
//                                     </div>
//                                     <div className="form-row">
//                                         <label className="" htmlFor="description">Description*</label>
//                                         <textarea onChange={this.handleInputChange.bind(this)} value={this.state.recommendation.description} name="description" className="form-control" placeholder="Description"></textarea>
//                                     </div>
//                                 </form>
//                             </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                                 <button type="button" className="btn text-light" style={{width: "250px", backgroundColor: "#ff6000"}} onClick={this.handleSubmit.bind(this)}>Make Recommendation</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default RecommendationEdit;

// <div class="dropdown-menu">
//   <form class="px-4 py-3">
//     <div class="form-group">
//       <label for="exampleDropdownFormEmail1">Email address</label>
//       <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
//     </div>
//     <div class="form-group">
//       <label for="exampleDropdownFormPassword1">Password</label>
//       <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
//     </div>
//     <div class="form-check">
//       <input type="checkbox" class="form-check-input" id="dropdownCheck">
//       <label class="form-check-label" for="dropdownCheck">
//         Remember me
//       </label>
//     </div>
//     <button type="submit" class="btn btn-primary">Sign in</button>
//   </form>
//   <div class="dropdown-divider"></div>
//   <a class="dropdown-item" href="#">New around here? Sign up</a>
//   <a class="dropdown-item" href="#">Forgot password?</a>
// </div>