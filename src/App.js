import React, { Component } from 'react';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './App.css';
import 'antd/dist/antd.css';
import Register from './components/register';
import NewConversation from './components/newConversation';
import Messaing from './components/messaging';
import { List, Avatar,Button,Icon } from 'antd';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      clientList:[
        {
          title:'Public Room',
        },
        {
          title:'Private Channel Test'
        }
      ],
      clientRoom:null,
      roomUsers: [],
      roomName: null,
    };
    this.chatbox = React.createRef();
    this.socket = require('socket.io-client')('http://localhost:3001/');
  }

  usernameCallback = (username) =>{
    this.setState({userId:username});
    this.socket.emit('new_user',{
      userId:username
    });

    this.socket.on('new_user',(data)=>{
      console.log(data);
      this.chatbox.current.children[2].children[0].innerHTML+=`
      <div class="container darker" style='padding:10px 0px 0px 0px'>
        <p style='margin-left:5%'>User ${data.username} logged in Public Room</p>
      </div>`;
    })
  }

  clientCallback = (client) =>{
    console.log(client);
    this.setState({clientRoom:client.client});
    this.setState({clientList:[...this.state.clientList,{
      title:client.client
    }]})
  }

  messageCallback = (data) =>{
    console.log(data);
    if(data.username===this.state.userId){
      this.chatbox.current.children[2].children[0].innerHTML+=`
      <div class="container darker">
        <i class='far fa-user-circle' style='font-size:35px;color:coral;float:right'></i>
        <p>${data.message}</p>
        <span class="time-left">Me</span>
      </div>`;
    } else {
      this.chatbox.current.children[2].children[0].innerHTML+=`   
      <div class="container">
      <i class='far fa-user-circle' style='font-size:35px;color:coral;float:left'></i>
        <p style='margin:7px 0px 1em 10%'>   ${data.message}</p>
        <span class="time-right">${data.username}</span>
      </div>`;
    }
  }

  openChatbox = () => {
    const node = this.chatbox;
    if(node.current.hidden === false) {
      node.current.hidden = true;
    } else {
      node.current.hidden = false;
    }
  }

  closeChatbox = () => {
    const node = this.chatbox;
    node.current.hidden = true;;
  }

  render() {

    return (
      
      <div className="App">

        <div className="sidebar left-sidebar">
          {!this.state.userId ? (
             <React.Fragment>
               <Register username={this.usernameCallback}/>
             </React.Fragment>
            ):(   
              <React.Fragment>     
            <NewConversation clientCallback={this.clientCallback} chatbox={this.myRef}/>
            <List
            style={{margin:'15% 0% 0% 10%'}}
            itemLayout="horizontal"
            dataSource={this.state.clientList}
            renderItem={item => (
              <List.Item onClick={()=>this.openChatbox(item.title)} style={{cursor: 'pointer'}}>
                <List.Item.Meta
                  avatar={ <Avatar style={{ backgroundColor: '#87d068' } } icon="user" /> }
                  title={item.title}
                />
              </List.Item>
            )}
          />
          </React.Fragment>  
          )}
        </div>
        
        <div className="chat-screen">
              <div style={{width:'123%',margin:'42% 22% 22% 22%'}}>
            <h1 style={{color: 'rgba(175, 0, 0, 55)',fontStyle:'italic'}}>{this.state.userId && <h1 style={{color: 'rgba(175, 0, 0, 55)',fontStyle:'italic'}}>Hi, {this.state.userId}!</h1>}Welcome To Hubouts</h1>
                <h4 style={{color: 'rgba(135, 0, 0, 55)',fontStyle:'italic'}}>Get started by messaging a friend</h4>
              </div>
        </div>
        
        <div className="sidebar right-sidebar" ref = {this.chatbox} hidden='true'>
          <div style = {{margin:'1% 1% 0% 0%'}}>
            <Button type="primary" shape="circle" htmlType="submit" className="login-form-button" style={{float:'right'}} onClick={()=>this.closeChatbox()}>
              <Icon type="close-circle" style={{fontSize:'215%'}}/>
            </Button>
          </div>
          
          <div>
            <h4 style={{marginBottom:'0px'}}><Icon type="message" style={{fontSize:'18px',marginRight:'3%'}} />
              Public Room
            </h4>
          </div>
          
          <div style={{overflowY:'overlay',overflowX:'hidden', height:'80%', margin:'0% 3% 5% 0%'}}>
            <div style={{margin:"0% -15% 0% 4%"}}>

            </div>
          </div>

          <div className="messaging" style={{marginTop:'3%'}}>
            <Messaing  client={this.state.clientRoom} user={this.state.userId} messageCallback={this.messageCallback} socket={this.socket}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;