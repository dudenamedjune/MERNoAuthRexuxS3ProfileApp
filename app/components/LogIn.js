
// Import FirebaseAuth and firebase.
import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import * as actions from '../../actions';
import Name from './Name';
import AWS from 'aws-sdk'
import FileUpload from './DropZone';
import {fireKey, amazon} from '../../keys';
const {accessKeyId, secretAccessKey} = amazon;

// Configure Firebase.
const config = {
  apiKey: fireKey.apiKey,
  authDomain: "keystokes-7af94.firebaseapp.com",
  databaseURL: "https://keystokes-7af94.firebaseio.com",
  projectId: "keystokes-7af94",
  storageBucket: "",
  messagingSenderId: "983598569320"
};
firebase.initializeApp(config);

function uploadToS3(file, info, email, callback ) {
  const BUCKET_NAME = 'keystoke'
  let s3bucket = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    console.log(file)
    var params = {
     Bucket: BUCKET_NAME,
     Key: `${email}/${info.name}`,
     Body: file,
    };
    s3bucket.upload(params, function (err, data) {
     if (err) {
      console.log('error in callback');
      console.log(err);
     }
     console.log('success');
    callback(data);
    });
  });
 }


class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      discription: "",
     files: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.stateLift = this.stateLift.bind(this);
  }

  componentDidMount(){
    console.log(this.props)
  }
  stateLift(data, dataURL){



    this.setState({data, dataURL});
}

handleSubmit(event){
event.preventDefault();
const { _id, email } = this.props.userInfo;
const info = this.state.data[0];
const { name, discription } = this.state;
const authAction = this.props.auth;
console.log(info)
const reader = new FileReader();
reader.onload = function(event){
  uploadToS3(event.target.result, info, email, (response) => {
    axios.put(`/api/profile/${_id}`, { name, discription, imageURL: response.Location})
    .then( response => authAction(response.data))
  });
}

reader.readAsArrayBuffer(this.state.data[0]);



}

  render() {
    // Configure FirebaseUI.
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      callbacks: {
         signInSuccess: (info) => {
           console.log(info)
           const { email, displayName, photoURL } = info;
           axios.get(`/api/profile`, {params:{ email, displayName, photoURL}})
           .then(response =>{ this.props.auth(response.data) })
          // axios.post('/api/profile',{name: displayName, email, imageURL: photoURL} ).then( response => console.log(response));
          // this.props.auth({ email, displayName, photoURL, signedIn: true });


         }
       },
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: [
              'public_profile',
              'email'
            ]
        }
      ]
    };
    return (

        <div>
          {
            this.props.userInfo === false
            ?
            <div>
              <h1>Edit Profile</h1>
              <p>Please sign-in:</p>
              <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            :
            <div>
            <Name name={this.props.userInfo.name} url={this.props.userInfo.imageURL} />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" onChange={(event) => this.setState({name: event.target.value})} value={this.state.name} required placeholder="John Doe"/> {' '}
                </div>
                <div className="form-group">
                  <label htmlFor="discription">Discription</label>
                  <textarea type="text" className="form-control" id="name" onChange={(event) => this.setState({discription: event.target.value})} value={this.state.discription} required placeholder="Let the world know how awesome you are"/> {' '}
                </div>

                <FileUpload stateLift={this.stateLift}/>

               <button className="btn btn-outline-primary" type="submit">
                Submit
              </button>
              </form>
            </div>
          }

    </div>



    );
  }
}
function mapStateToProps(state, ownProps) {

  // const expanded = state.selectedLibraryId === ownProps.library.id;
  //
  return { userInfo: state.userInfo };
}

export default connect(mapStateToProps, actions)(SignInScreen);
