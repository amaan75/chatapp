import React, {Component} from 'react';
import avatar from '../images/avatar.jpg';
import classNames from 'classnames';

export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            messages: []
        }
        this._onResize = this._onResize.bind(this);
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

    addTestMessages() {

        let {messages} = this.state;

        for (let i = 0; i < 100; i++) {

            let isMe = false;
            if (i % 2 == 0) {
                isMe = true;
            }
            const newMsg = {
                author: `Author ${i}`,
                body: `Message body ${i}`,
                avatar: avatar,
                me: isMe
            }

            messages.push(newMsg);
        }
        this.setState({messages: messages});

    }

    componentWillUnmount() {
        console.log(`componentWillUnmount`);
        window.removeEventListener(`resize`, this._onResize);

    }

    render() {
        const {height, messages} = this.state;

        const style = {
            height: height
        }
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
                    //main-sidebar-left
                    <div className="channels">
                        <div className="channel">
                            <div className="user-image">
                                <img src={avatar} alt="empty avatar"/>
                            </div>
                            <div className="channel-info">
                                <h2>Amaanullah</h2>
                                <p>hello</p>
                            </div>
                        </div>

                        <div className="channel">
                            <div className="user-image">
                                <img src={avatar} alt="empty avatar"/>
                            </div>
                            <div className="channel-info">
                                <h2>Amaanullah</h2>
                                <p>hello</p>
                            </div>
                        </div>

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
                            <textarea placeholder="Write your message"/>
                        </div>
                        <div className="actions">
                            <button className="send">Send</button>
                        </div>
                    </div>
                </div>
                <div className="sidebar-right">

                    <h2 className="title">Members</h2>
                    //main-sidebar-right
                    <div className="members">

                        //first member
                        <div className="member">
                            <div className="user-image">
                                <img src={avatar} alt="empty avatar"/>
                            </div>
                            <div className="member-info">
                                <h2>Muhammad Amaanullah</h2>
                                <p>Joined: 2 days ago</p>
                            </div>
                        </div>

                        //second member
                        <div className="member">
                            <div className="user-image">
                                <img src={avatar} alt="empty avatar"/>
                            </div>
                            <div className="member-info">
                                <h2>Muhammad Amaanullah</h2>
                                <p>Joined: 2 days ago</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>)
    }
}
