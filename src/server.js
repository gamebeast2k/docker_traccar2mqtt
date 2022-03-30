'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt')
// HTTP Options
const PORT = 80;
const HOST = process.env.HOST_IP;
const MQTT_HOST = process.env.mqtt_host
// MQTT Options
var options = {

  clientId: "" + process.env.clientid,
  username: "" + process.env.mqtt_username,
  password: "" + process.env.mqtt_password,
  clean: false,
  reconnectPeriod: 1 * 1000,
};

console.log("mqtt: connecting  " + MQTT_HOST);
var mqtt_client = mqtt.connect(MQTT_HOST, options);

mqtt_client.on("error", function (error) {
  console.log("mqtt: Can't connect" + error)
});
mqtt_client.on("connect", function () {
  console.log("mqtt: connected  " + mqtt_client.connected);
});
mqtt_client.on('disconnect', function () {
  console.log('mqtt client disconnected');
});
mqtt_client.on('close', function () {
  console.log('mqtt client closed');
});

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
app.post('/', function (request, response) {
  console.log("post incoming");
  if (process.env.debug == "true") {
    console.log(request.body); // PRINT json data from Traccar (carefully with privacy!)
  }
  send2mqtt(request.body);
  response.send("");
});

//  setup and send to mqtt broker
function send2mqtt(json) {

  if (mqtt_client.connected == true) {  // mqtt connected?
    let cache = {};
    if (typeof json.event != "undefined") {
      console.log("Processing->event")
      cache["event/json"] = JSON.stringify(json.event);
      if (typeof json.event.eventTime != "undefined") { cache["event/eventTime"] = json.event.eventTime; }
      if (typeof json.event.type != "undefined") { cache["event/type"] = json.event.type; }
      if (typeof json.event.positionId != "undefined") { cache["event/positionId"] = json.event.positionId; }
      if (typeof json.event.geofenceId != "undefined") { cache["event/geofenceId"] = json.event.geofenceId; }
      if (typeof json.event.maintenanceId != "undefined") { cache["event/maintenanceId"] = json.event.maintenanceId; }
     }

    if (typeof json.device != "undefined") {
      console.log("Processing->device")
      cache["device/json"] = JSON.stringify(json.device);
      if (typeof json.device.name != "undefined") { cache["name"] = json.device.name.replace(" ", "_"); }
      if (typeof json.device.status != "undefined") { cache["status"] = json.device.status; }
      if (typeof json.device.geofenceIds != "undefined") { cache["geofenceIds"] = json.device.geofenceIds.toString(); }
      if (typeof json.device.lastUpdate != "undefined") { cache["lastUpdate"] = json.device.lastUpdate; }
      if (typeof json.device.model != "undefined") { cache["model"] = json.device.model; }
      if (typeof json.device.uniqueid != "undefined") { cache["uniqueid"] = json.device.uniqueid; }
      if (typeof json.device.positionid != "undefined") { cache["positionid"] = json.device.positionid; }
    }

    if (typeof json.position != "undefined") {
      console.log("Processing->position")
      cache["position/json"] = JSON.stringify(json.position);
      if (typeof json.position.latitude != "undefined") { cache["lat"] = json.position.latitude; }
      if (typeof json.position.longitude != "undefined") { cache["lon"] = json.position.longitude; }
      if (typeof json.position.altitude != "undefined") { cache["altitude"] = json.position.altitude; }
      if (typeof json.position.course != "undefined") { cache["course"] = json.position.course; }
      if (typeof json.position.speed != "undefined") { cache["speed"] = json.position.speed; }
      if (typeof json.position.accuracy != "undefined") { cache["accuracy"] = json.position.accuracy; }
      if (typeof json.position.network != "undefined") { cache["network"] = json.position.network; }
      if (typeof json.position.deviceTime != "undefined") { cache["deviceTime"] = json.position.deviceTime; }
      if (typeof json.position.address != "undefined") { cache["address"] = json.position.address; }
      if (typeof json.position.attributes.BATTERY != "undefined") { cache["BATTERY"] = json.position.attributes.BATTERY; }
      if (typeof json.position.attributes.distance != "undefined") { cache["distance"] = json.position.attributes.distance; }
      if (typeof json.position.attributes.totalDistance != "undefined") { cache["totalDistance"] = json.position.attributes.totalDistance; }
      if (typeof json.position.attributes.motion != "undefined") { cache["motion"] = json.position.attributes.motion; }
      if (typeof json.position.attributes.batteryLevel != "undefined") { cache["batteryLevel"] = json.position.attributes.batteryLevel; }
    }

    for (var key in cache) {
      var value = '' + cache[key]
      mqtt_client.publish('traccar/' + cache["name"] + "/" + key, value, { retain: true, qos: 1 });
    };
  }
};
