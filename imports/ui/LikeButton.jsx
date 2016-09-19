import React, { Component } from 'react';


export default class LikeButton extends Component {

  constructor(props) {
    super(props);
    this.state = { liked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ liked: !this.state.liked });
  }

  render() {
    const text = this.state.liked ? 'liked' : 'have not like';
    return (
      <p className="expamle-react" onClick = { this.handleClick }>
        Do you like me ? I know that you {text} me, clik me to change your mind!
      </p>
    );
  }
}
