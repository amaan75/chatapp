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

}