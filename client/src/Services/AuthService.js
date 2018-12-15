import axios from 'axios';

const Auth = () => ({
    isAuthenticated: () => {
      const token = localStorage.getItem('token');
      const current_time = new Date().getTime() / 1000;
      return token && token != "undefined" && Auth().paraseJwt().exp > current_time;
    },

    // auth should be in the form "auth": { "email": ___, "password": ___ }
    authenticate: ({ email, password }) => {
      return (
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/user_token`, { auth: { email, password }})
        .then(res => localStorage.setItem('token', res.data.jwt))
      );
    },

    headers: () => { 
      const token = localStorage.getItem('token');
      return { 'Authorization': `Bearer ${token}` }
       
    },

    paraseJwt: () => {
      try {
        const token = localStorage.getItem("token");
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
      }
      catch(error) {
        return {};
      }

    }
});

export default Auth;