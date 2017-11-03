import React from 'react';
import { Link } from 'react-router-dom';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

// React-Redux connect() boilerplate
// NOTE: you may have to modify the filepath for ChangeActions
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';

class TesterOtionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.goToCreatorProfile = this.goToCreatorProfile.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  goToCreatorProfile() {
    this.props.history.push(`/profile/:${this.props.option.CrId}`);
  }

  render() {
    return (
      <div>
        <img src={this.props.option.thumbnail} alt="" style={tempImgStyle}/>
        <p>Option Name: {this.props.option.name}</p>
        <p>Assigned On: {new Date(this.props.option.assignedAt.slice(0, 19)).toString().slice(0, 24)}</p>
        <p>Created On: {new Date(this.props.option.createdAt.slice(0, 19)).toString().slice(0, 24)}</p>
        <span><p>Created by: </p><p onClick={this.goToCreatorProfile}>{this.props.option.CrName}</p></span>
      </div>
    )
  }
}

const tempImgStyle = {
  height: '50%',
  width: '50%'
}

// React-Redux connect() boilerplate
// 1. Include the properties in the Store you want this component to have access to
// 2. Change the Component name at the very end to the one in the current file
const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
  testerQueue: state.testerQueue,
  router: state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TesterOtionEntry));
