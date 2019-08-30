'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt')
// HTTP Options
const PORT = process.env.PORT;
const HOST = process.env.HOST_IP;
const MQTT_HOST = process.env.mqtt_host
// MQTT Options
var options={
  clientId:""+process.env.clientid,
  username:""+process.env.mqtt_username,
  password:""+process.env.mqtt_password,
  clean:false,
  debug:true};

var mqtt_client = mqtt.connect(MQTT_HOST,options);
// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/forward', (req, res) => {
  console.log("post incoming");
  res.send('not supported\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// working on POST DATA from traccar
app.post('/', function(request, response){
  console.log("post incoming");
  send2mqtt(request.body);                  
  response.send("");
});

//  setup and send to mqtt broker
function send2mqtt(json){
  mqtt_client.on("error",function(error){ 
    console.log("mqtt: Can't connect"+error)
  });
  mqtt_client.on("connect",function(){	
    console.log("mqtt: connected  "+ mqtt_client.connected); 
  })
  if (mqtt_client.connected == true){
    let cache = {};
    cache["name"]         = json.device.name;
    cache["status"]       = json.device.status;
    cache["lastUpdate"]   = json.device.lastUpdate;
    
    cache["lat"]          = json.position.latitude;
    cache["lon"]          = json.position.longitude;
    cache["altitude"]     = json.position.altitude;
    cache["course"]       = json.position.course;
    cache["speed"]        = json.position.speed;
    cache["accuracy"]     = json.position.accuracy;
    cache["network"]      = json.position.network;
    cache["deviceTime"]   = json.position.deviceTime;
    cache["batteryLevel"] = json.position.attributes.batteryLevel;
    for (var key in cache) {
      var value = ''+cache[key]
      mqtt_client.publish('traccar/'+cache["name"]+"/"+key, value,{retain:true,qos:1});
    };
  }
};
