import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import PrivateMessage from '../Messages/PrivateMessage.jsx';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
    };
  }

  render() {
    let { signedIn, user, handleLogout } = this.props;
    if (signedIn) {
      var { id, username, rank, credit, avatarUrl } = user;
    } else {
      var username = '';
      var credit = 0;
      var rank = 0;
    }

    return (
      <nav id="mysidenav_lft" className="sidenav" style={{ width: '250px' }}>
        <div className="profile-box">
          {signedIn ? (
            <div className="media">
              <a className="pull-left pt-2">
                <img
                  className="rounded-circle"
                  src={avatarUrl}
                  style={{ width: '70px', height: '70px' }}
                />
              </a>
              <div className="media-body">
                <h5 className="media-heading">
                  Welcome <span>{username}</span>
                </h5>
                <small>{rank} Rank</small>
                <br />
                <small>{credit} Credits</small>
              </div>
            </div>
          ) : (
            <div className="media">
              <a className="pull-left pt-2">
                <img className="rounded-circle" src="http://via.placeholder.com/40x40" />
              </a>
              <div className="media-body">
                <h5 className="media-heading">Please</h5>
                <h5>Login</h5>
              </div>
            </div>
          )}
        </div>
        <div className="accordion" id="accordion_sidenav_lft">
          {signedIn ? (
            <div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <Link to="/">
                    <div>
                      <i className="fas fa-list" />
                      Question List
                    </div>
                  </Link>
                </div>
              </div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <Link to="/createQuestion">
                    <div>
                      <i className="fas fa-question" />
                      Ask Question
                    </div>
                  </Link>
                </div>
              </div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <Link to="/profileUser">
                    <div>
                      <i className="fas fa-user" />
                      Profile
                    </div>
                  </Link>
                </div>
              </div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <div>
                    <i className="fas fa-envelope" />
                    Messages
                    {0 > 0 && <span className="label">New</span>}
                  </div>
                </div>
              </div>
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.setState({ showMessage: true });
                    }}
                  >
                    <span>Create Message</span>
                    {this.state.showMessage && (
                      <PrivateMessage userId={id} notify={this.props.notify} />
                    )}
                  </li>
                  <Link to="/messages/unread" style={{ cursor: 'pointer' }}>
                    <li className="list-group-item">
                      <span>Unread</span>
                    </li>
                  </Link>
                  <Link to="/messages/inbox" style={{ cursor: 'pointer' }}>
                    <li className="list-group-item">
                      <span>Inbox</span>
                    </li>
                  </Link>
                  <Link to="/messages/sent" style={{ cursor: 'pointer' }}>
                    <li className="list-group-item">
                      <span>Sent</span>
                    </li>
                  </Link>
                </ul>
              </div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <Link to="/notifications">
                    <div>
                      <i className="fas fa-bell" />
                      Notifications
                    </div>
                  </Link>
                </div>
              </div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <Link
                    to="/"
                    onClick={e => {
                      handleLogout();
                    }}
                  >
                    <div>
                      <i className="fas fa-sign-out-alt" />
                      Log Out
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <LinkContainer to="/">
                    <div>
                      <i className="fas fa-list" />
                      Question List
                    </div>
                  </LinkContainer>
                </div>
              </div>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div className="card-header">
                  <LinkContainer to="/login">
                    <div>
                      <i className="fas fa-sign-in-alt" />
                      Login
                    </div>
                  </LinkContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
