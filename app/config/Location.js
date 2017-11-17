import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { NavLink } from 'react-router-dom'
class Location extends Component{
  static propTypes(){
    match: PropTypes.object.isRequired;
    location: PropTypes.object.isRequired;
    history: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.location.pathname != this.props.location.pathname){
      this.props.getLocation(nextProps.location.pathname)
    };

  }
  componentWillMount(){
    this.props.getLocation(this.props.location.pathname);
  }



  render(){
    const { match, location, history } = this.props
      return(
            <div></div>
      )
    }
}
const router_location = withRouter(Location)
export default router_location
