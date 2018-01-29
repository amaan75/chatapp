import React, {Component} from 'react';
import {OrderedMap} from 'immutable';
import {ObjectId} from '../helpers/objectid'
import avatar from '../images/avatar.jpg';
import classNames from 'classnames';
import _ from 'lodash';


export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            newMessage: 'Hello there...',
        };
        this._onResize = this._onResize.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    _onResize() {

        this.setState({height: window.innerHeight})
        console.log(`window is resizing`);
    }

    componentDidMount() {
        console.log(`componentDidMount store  = ${this.props.store}`);

        window.addEventListener(`resize`, this._onResize);
        this.addTestMessages();
    }

    handleSend() {
        const {newMessage} = this.state;
        const {store} = this.props;

        const messageId = new ObjectId().toString();
        const channel = store.getActiveChannel();
        const channelId = _.get(channel, '_id', null);

        const message = {
            _id: messageId,
            channelId: channelId,
            body: newMessage,
            author: 'Amaan',
            avatar: avatar,
            me: true,
        }


    }

    addTestMessages() {

        const {store} = this.props;


        //some new test messages
        for (let i = 0; i < 100; i++) {

            let isMe = false;
            if (i % 2 === 0) {
                isMe = true;
            }
            const newMsg = {
                _id: `${i}`,
                author: `Author ${i}`,
                body: `Message body ${i}`,
                avatar: avatar,
                me: isMe
            };

            store.addMessage(i, newMsg);
        }


        for (let c = 0; c < 10; c++) {
            const newChannel = {
                _id: `${c}`,
                title: `Channel title ${c}`,
                lastMessage: `hey there ${c}`,
                members: new OrderedMap({
                    '2': true,
                    '3': true,
                }),
                messages: new OrderedMap({
                    '5': true,
                    '6': true,
                    '7': true,
                }),
            };

            const msgId = `${c}`;
            const moreMsgId = `${c + 1}`;
            newChannel.messages = newChannel.messages.set(msgId, true);
            newChannel.messages = newChannel.messages.set(moreMsgId, true);
            store.addChannel(c, newChannel);
        }
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount`);
        window.removeEventListener(`resize`, this._onResize);

    }

    render() {
        const {height} = this.state;

        const style = {
            height: height
        };

        const {store} = this.props;
        const channels = store.getChannels();
        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel);//store.getMessages();
        const members = store.getMembersFromChannel(activeChannel);

        // if (activeChannel) {
        //   console.log(`The active channel is ${activeChannel}`);
        //   console.log(`Messages in channel${activeChannel._id} and messages are${messages}`)
        //}

        return (<div style={style} className="app-messenger">
            <div className="header">
                <div className="left">
                    <div className="actions">
                        <button>New Message</button>
                    </div>
                </div>
                <div className="content">
                    <h2>Amaan</h2>
                </div>
                <div className="right">

                    <div className="user-bar">
                        <div className="profile-name">Amaanullah</div>
                        <div className="profile-image"><img src={avatar} alt="empty avatar"/></div>
                    </div>

                </div>
            </div>
            <div className="main">
                <div className="sidebar-left">
                    {//main-sidebar-left
                    }
                    <div className="channels">

                        {channels.map((channel, key) => {
                            return (
                                <div onClick={(key) => {
                                    store.setActiveChannel(channel._id);
                                    console.log(`The chanel id is ${channel._id}`);
                                }} key={key} className="channel">
                                    <div className="user-image">
                                        <img src={avatar} alt="empty avatar"/>
                                    </div>
                                    <div className="channel-info">
                                        <h2>{channel.title}</h2>
                                        <p>{channel.lastMessage}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="content">

                    <div className="messages">

                        {
                            messages.map((message, index) => {
                                return (<div key={index} className={classNames('message', {'me': message.me})}>
                                    <div className="message-user-image">
                                        <img src={message.avatar} alt="empty avatar"/>
                                    </div>
                                    <div className="message-body">
                                        <div className="message-author">
                                            {
                                                `${message.me
                                                    ? "you"
                                                    : message.author} said:`
                                            }
                                        </div>
                                        <div className="message-text">
                                            <p>{message.body}</p>
                                        </div>
                                    </div>
                                </div>);
                            })
                        }

                    </div>
                    <div className="messenger-input">
                        <div className="text-input">
                            <textarea onChange={(event) => {
                                this.setState({newMessage: _.get(event, 'target.value')});
                            }} value={this.state.newMessage} placeholder="Write your message"/>
                        </div>
                        <div className="actions">
                            <button onClick={this.handleSend} className="send">Send</button>
                        </div>
                    </div>
                </div>
                <div className="sidebar-right">

                    <h2 className="title">Members</h2>
                    {                    //main-sidebar-right
                    }
                    <div className="members">

                        {members.map((member, key) => {
                            return (
                                <div className="member">
                                    <div className="user-image">
                                        <img src={avatar} alt="empty avatar"/>
                                    </div>
                                    <div className="member-info">
                                        <h2>{member.name}</h2>
                                        <p>Joined: 3 days ago</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>)
    }
}
