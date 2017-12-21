import {OrderedMap} from 'immutable'

export default class Store {
    constructor() {
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.user = {
            _id: 0,
            name: 'Amaanullah',
            created: new Date(),
        }
    }


    addMessage(index, message = {}) {
        this.messages = this.messages.set(index, message);
    }

    getMessages() {
        return this.messages.valueSeq();
    }


    addChannel(index, channel = {}) {
        this.channels = this.channels.set(index, channel);
    }

    getChannel() {
        return this.channels.valueSeq();
    }
}