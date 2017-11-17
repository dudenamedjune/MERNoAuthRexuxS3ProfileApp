import React, { Component } from 'react';
import Dropzone from 'react-dropzone'



export default class FileUpload extends Component{
  constructor(props){
    super(props);
    this.state={
       files: [],
       data: []
    }
  }

  onDrop(files) {

    const reader = new FileReader();
      reader.onload = function(event){
      this.setState({files: [...this.state.files, event.target.result], data: [ ...this.state.data, files[0]]})
      this.props.stateLift(this.state.data, this.state.files)

    }.bind(this)
    reader.readAsDataURL(files[0])







    // await this.setState({files: [...this.state.files, ...array]})



 }
  render(){
    return (
       <section>
         <div className="dropzone">
           <Dropzone onDrop={this.onDrop.bind(this)}>
             <p>Try dropping some files here, or click to select files to upload.</p>
           </Dropzone>
         </div>
         <aside>
           <h2>Dropped files</h2>
           <ul>
    
             {
               this.state.files.map(f => <li><img style={{margin: "2%", maxHeight: "300px", maxWidth: "300px"}} src={f} /> </li>)
             }
           </ul>
         </aside>
       </section>
     );
  }
}
