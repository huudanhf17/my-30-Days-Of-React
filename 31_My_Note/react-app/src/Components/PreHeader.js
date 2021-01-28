import React, { Component } from "react";

class PreHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className="note-pre-header">
        <b>
          <p>{this.state.date.toLocaleTimeString()}</p>
        </b>
      </div>
    );
  }
}

export default PreHeader;
