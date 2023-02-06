// index.js

const express = require('express');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let subscribers = [];

function events(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    response.writeHead(200, headers);
    
    const subscriberId = uuid.v4();  
    const data = `data: ${JSON.stringify({id: subscriberId})}\n\n`;
  
    response.write(data);
  
    const subscriber = {
      id: subscriberId,
      response
    };
  
    subscribers.push(subscriber);
  
    request.on('close', () => {
      console.log(`${subscriberId} Connection closed`);
      subscribers = subscribers.filter(sub => sub.id !== subscriberId);
    });
}
  
async function sendEvent(request, response, next) {
    const data = request.body;
    subscribers.forEach(subscriber => subscriber.response.write(`data: ${JSON.stringify(data)}\n\n`));

    response.json({success: true});
}

app.get('/events', events);
app.post('/send-event', sendEvent);

app.listen(3000, () => {
    console.log('Events service started at http://localhost:3000')
});