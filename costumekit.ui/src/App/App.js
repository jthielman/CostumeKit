import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import OneOutfit from '../components/pages/OneOutfit/OneOutfit';
import Garments from '../components/pages/Garments/Garments';

// const PublicRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: true,
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavbar authed={authed} />
          <Switch>
            <PrivateRoute path="/" exact component={Home} authed={authed} />
            <PrivateRoute path="/outfit/:outfitId" exact component={OneOutfit} authed={authed} />
            <Route path="/garments" exact component={Garments} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
