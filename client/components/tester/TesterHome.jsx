import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';
import TesterVideo from './TesterVideo.jsx';
import TesterOptionEntry from './TesterOptionEntry.jsx';
import { Button, FormControl, FormGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TesterHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: 0
    }
  }

  componentWillMount() {
    axios.post('/api/tester/getOptionsForTester', {
      id: this.props.loggedInUser.id,
      mode: 'queue'
    })
      .then(res => {
        let queue = res.data;
        console.log('queue:', queue);
        if (queue.length > 0) this.props.actions.populateTesterQueue(queue);
      })
      .catch(err => {
        console.log('Error fetching Tester Queue from database:', err);
      });

    axios.get('/api/getCreditBalance')
    .then((res) => {
      console.log('res from credit balance', res)
      this.setState({
        credits: res.data
      })
    })
  }

  render() {
    return (
      <div className="TesterHomeContainer">
        <h1>Welcome Back to Emolytics!</h1><br/>
        <h3>Queue Quick Look</h3><br/>
        {this.props.testerQueue.slice(0, 3).map((option, i) => {
          return (
            <Link onClick={() => {
              this.props.actions.changeTesterOption(option);
            }} key={JSON.stringify(option.name)+i} to={`/video/${option.id}`}>
              <Col className='testerOptionListEntry' md={3}>
                <TesterOptionEntry
                  option={option}
                  index={i}
                />
              </Col>
            </Link>
          )
        })}
        <Button className="addEntityButton">Credits: {this.state.credits || 0}</Button>
      </div>
    )
  }
};

const creditDisplayStyle = {
  textAlign: "center",
  float: "right",
  padding: "10px"
}

const mapStateToProps = (state) => {
  return ({
    loggedInUser: state.loggedInUser,
    testerQueue: state.testerQueue,
    router: state.router
  })
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TesterHome);
