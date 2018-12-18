import * as React from 'react';
import LandingPage from '../containers/LandingPage';

interface PropsType {
  isAuthenticated: Boolean;
}

class HomeContainer extends React.Component<PropsType, {}> {

  constructor(props: PropsType) {
    super(props);
  }

  render(): React.ReactNode {
    return <LandingPage />;
  }
}

export default HomeContainer;