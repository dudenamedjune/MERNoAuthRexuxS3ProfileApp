import React, { Component } from "react";

export default class ProfileCard extends Component{
  constructor(props){
    super(props);
    this.state={

    }
    this.profileModal = this.profileModal.bind(this);
  }
  componentDidMount(){
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  }
  profileModal(){
    return(
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.props.name}'s Profile</h5>
              <img style={{borderRadius: "50%", maxHeight: "100px"}} src={this.props.url || null } />
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.discription}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render(){
    return(

      <div key={this.props.id} className="container  padd" >
        <div className="list-group">
          <a href="#" data-toggle="modal" data-target="#exampleModal" className="list-group-item"><img style={{borderRadius: "50%", maxHeight: "100px"}} src={this.props.url || null } />
            <h4 className="list-group-item-heading">{this.props.name} </h4>
            <p className="list-group-item-text" style={{color: "black"}}>Click For discription</p>

          </a>
        </div>
          {this.profileModal()}
    </div>
      )
  }
}
