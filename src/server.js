'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt')
// HTTP Options
const PORT = 80;
const HOST = process.env.HOST_IP;
const MQTT_HOST = process.env.mqtt_host
// MQTT Options
var options={
  clientId:""+process.env.clientid,
  username:""+process.env.mqtt_username,
  password:""+process.env.mqtt_password,
  clean:false,
  debug:false};

var mqtt_client = mqtt.connect(MQTT_HOST,options);
// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('get not supported\n');
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
    if(typeof json.device.name                      != "undefined"){ cache["name"]         = json.device.name.replace(" ","_"); }
    if(typeof json.device.status                    != "undefined"){ cache["status"]       = json.device.status; }
    if(typeof json.device.lastUpdate                != "undefined"){ cache["lastUpdate"]   = json.device.lastUpdate; }
    
    if(typeof json.position.latitude                != "undefined"){ cache["lat"]          = json.position.latitude; }
    if(typeof json.position.longitude               != "undefined"){ cache["lon"]          = json.position.longitude; }
    if(typeof json.position.altitude                != "undefined"){ cache["altitude"]     = json.position.altitude; }
    if(typeof json.position.course                  != "undefined"){ cache["course"]       = json.position.course; }
    if(typeof json.position.speed                   != "undefined"){ cache["speed"]        = json.position.speed; }
    if(typeof json.position.accuracy                != "undefined"){ cache["accuracy"]     = json.position.accuracy; }
    if(typeof json.position.network                 != "undefined"){ cache["network"]      = json.position.network; }
    if(typeof json.position.deviceTime              != "undefined"){ cache["deviceTime"]   = json.position.deviceTime; }
    if(typeof json.position.attributes.batteryLevel != "undefined"){ cache["batteryLevel"] = json.position.attributes.batteryLevel; }
    for (var key in cache) {
      var value = ''+cache[key]
      mqtt_client.publish('traccar/'+cache["name"]+"/"+key, value,{retain:true,qos:1});
    };
  }
};
