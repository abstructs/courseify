import axios from 'axios';

const Auth = () => ({
    isAuthenticated: () => {
      const token = localStorage.getItem('token');
      const current_time = new Date().getTime() / 1000;
      return token && Auth().paraseJwt(token).exp > current_time;
    },

    // auth should be in the form "auth": { "email": ___, "password": ___ }
    authenticate: ({ email, password }) => {
      return axios.post("http://localhost:3000/api/v1/users/user_token", { auth: { email, password }});
    },

    headers: () => { 
      const token = localStorage.getItem('token');
      return { 'Authorization': `Bearer ${token}` }
       
    },

    paraseJwt: () => {
      var token = localStorage.getItem("token");
      if(!token) {
        return false;
      }
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
})

export default Auth;