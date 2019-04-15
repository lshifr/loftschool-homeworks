import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';

class Chat extends Component {
  state = { messages: [], messageInput: '' };

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
    if (e.key === 'Enter') {
      const { messages, messageInput } = this.state;
      this.setState({
        messages: [...messages, { text: messageInput }],
        messageInput: ''
      });
    }
  };

  render() {
    const { messages, messageInput } = this.state;
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {messages.map(msg => (
              <Message text={msg.text} key={this.createUUID()} />
            ))}
          </div>
        </div>
        <input
          className="input-message"
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
          value={messageInput}
        />
      </div>
    );
  }
}

export default Chat;
