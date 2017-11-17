import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ProfileCard from './ProfileCard';

// export for app.js
 class Home extends Component{
constructor(props){
  super(props);
  this.state={

  }
  this.renderProfile = this.renderProfile.bind(this);
}
componentWillMount(){
  this.props.getProfiles();
}

renderProfile(profile){
  const {name, discription, _id, imageURL} = profile;
  return (
    <ProfileCard key={_id} name={name} discription={discription} url={imageURL} />
  )
}
render(){
  return(
    <div>{this.props.profiles != null && this.props.profiles.map(this.renderProfile)}</div>
  );
}

}
function mapStateToProps(state, ownProps) {
const { profiles } = state;
  // const expanded = state.selectedLibraryId === ownProps.library.id;
  return { profiles }
}

export default connect(mapStateToProps, actions)(Home);
