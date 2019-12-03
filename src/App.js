import React, { Component } from 'react';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './App.css';
import 'antd/dist/antd.css';
import NewConversation from './components/newConversation';
import { List, Avatar } from 'antd';

 const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: '',
    };
  }
  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
    } = this.state;

    return (
      <div className="App">
        <aside className="sidebar left-sidebar">
          <NewConversation />
          <List
            style={{marginLeft:'15%'}}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={ <Avatar style={{ backgroundColor: '#87d068' }} icon="user" /> }
                  title={<a href="https://ant.design">{item.title}</a>}
                />
              </List.Item>
            )}
          />,
        </aside>
        <section className="chat-screen">
          <header className="chat-header"></header>
          <ul className="chat-messages"></ul>
          <footer className="chat-footer">
            <form className="message-form">
              <input
                type="text"
                name="newMessage"
                className="message-input"
                placeholder="Type your message and hit ENTER to send"
              />
            </form>
          </footer>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </div>
    );
  }
}

export default App;