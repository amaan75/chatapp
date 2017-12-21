import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {
  version
} from '../package.json';
import WebSocketServer, {
  Server
} from 'uws';



const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
  exposedHeaders: "*"
}));

app.use(bodyParser.json({
  limit: '50mb'
}));

app.get(`/`, (req, res) => {
  res.json({
    version: version
  })
})

app.wss = new Server({

  server: app.server
});

let clients = [];

app.wss.on('connection', (connection) => {


  //generating userId for client
  const userId = clients.length + 1;
  connection.userId = userId;


  // creating new client and adding it to clients array
  const newClient = {
    ws: connection,
    userId: userId,
  }
  clients.push(newClient);


  console.log(`new client with userId:${userId}`);

  //listen for new message from client

  connection.on('message', (message) => {
    console.log(`new message from client${userId}:${message}`);

    // sending a message back to client.
    connection.send(`Welcome to amaanullah server`);
  });

  // on client disconnect
  connection.on('close', () => {
    console.log(`Client with ID ${userId} disconnected`);

    clients = clients.filter((client) => client.userId !== userId)
  });

});


app.get(`/api/all_connection`, (req, res) => {
  return res.json({
    people: clients,
  })
})


//check the number of people in server every 3 seconds and print their ids
setInterval(() => {
  console.log(` ${clients.length} people are connected to the server`);
  if (clients.length > 0) {
    clients.forEach((client) => {
      console.log(`Client Id: ${client.userId}`);

      //sending new message to the clients from  server
      const msg = `hey ${client.userId} you have a new message`;
      client.ws.send(msg);

    })
  }
}, 3000);



app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
