import * as React from 'react';
import { Redirect } from 'react-router';
import { UserService } from 'src/Services/UserService';


class Logout extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        UserService.revokeToken();

        return <Redirect to={'/'} />;
    }
}

export default Logout;