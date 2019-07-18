import { Link } from "react-router-dom";
import React, { Component } from "react";

export class SessionsContainer extends Component {
  render() {
    const userSessions = this.props.currentSessions;
    let renderSessions = userSessions.map(session => {
      return (
        <div className={`card`} key={session.id}>
          <Link to={`/sessions/${session.id}`}>{session.name}</Link>
        </div>
      );
    });

    return (
      <div>
        {renderSessions}
      </div>
    );
  }
}

export default SessionsContainer;
