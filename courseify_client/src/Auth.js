import axios from 'axios';

const Auth = () => ({
    isAuthenticated: () => localStorage.getItem('token') !== null,

    // auth should be in the form "auth": { "email": ___, "password": ___ }
    authenticate: ({ email, password }) => {
      return axios.post("http://localhost:3000/api/v1/users/user_token", { auth: { email, password }});
    },

    headers: () => { 
      const token = localStorage.getItem('token');
      return { 'Authorization': `Bearer ${token}` }
       
    }
})

export default Auth;