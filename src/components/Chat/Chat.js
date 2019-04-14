import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';

class Chat extends Component {
  changeInputMessage = e => {
    this.setState({ messageInput: e.target.value });
  };

  createUUID = (() => {
    let ctr = 0;
    return () => {
      return `msg_${ctr++}`;
    };
  })();

  sendMessageOnEnter = e => {
    console.log(e.key);
    if (e.key === 'Enter') {
      const messages = this.state.messages;
      messages.push({ text: this.state.messageInput });
      this.setState({
        messages,
        messageInput: ''
      });
    }
  };

  state = { messages: [], messageInput: '' };

  render() {
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {this.state.messages.map(msg => (
              <Message text={msg.text} key={this.createUUID()} />
            ))}
          </div>
        </div>
        <input
          className="input-message"
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
          value={this.state.messageInput}
        />
      </div>
    );
  }
}

export default Chat;
