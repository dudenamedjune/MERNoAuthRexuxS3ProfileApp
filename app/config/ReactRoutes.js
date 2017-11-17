import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link, NavLink, Switch, Redirect
} from 'react-router-dom'

import Location from './Location';
import Login from '../components/Login';
import Home from '../components/Home';
// const showMainNav = {
//   "/": true,
//   "/LogIn": true,
//   "/SignUp": true
//
// }

export default class Routes extends Component {
  constructor(props){
    super(props);
    this.state = {

      location: String
    }

    this.getLocation = this.getLocation.bind(this);
  }


  getLocation(location){
    if(this.state.location != location){
        this.setState({location})
    }

  }

  render(){
    return(

      <Router>

            <div className="container">
                <Location getLocation={this.getLocation} />

              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/" >Home</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/edit">Edit</NavLink>
                </li>

              </ul>
              <Switch>
                <Route path="/edit" component={Login} />
                <Route path="/" component={Home} />
              </Switch>

            </div>

      </Router>

    )
  }
}





// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>
//
//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )
//
// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )
