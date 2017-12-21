//import WebSocket from 'uws';
const WebSocket = require('uws');

const ws = new WebSocket('ws://localhost:3000/');


ws.on('open',()=>{
  console.log('Connected to sevrer');
  ws.send('this is amaanullah client2');

    //listen for new message
    ws.on('message',(message)=>{
      console.log(message);
    })
})
