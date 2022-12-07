
# What is Traccar2mqtt

  

![Build Status](https://img.shields.io/github/languages/code-size/gamebeast2k/docker_traccar2mqtt?style=for-the-badge)

![OpenIssue](https://img.shields.io/github/issues/gamebeast2k/docker_traccar2mqtt?style=for-the-badge)

![dockerbuild](https://img.shields.io/docker/cloud/automated/gamebeast/traccar2mqtt?style=for-the-badge)

  

Traccar2mqtt is a small Server written in NodeJs to use Traccar in other Programs. In my case Io.Broker

  

### Changelog

#### 0.4

- (added) New env variable added: debug (true,false)
- (added) Data example **forward_data/forward.json**  and **forward_data/event_forward.json**
- (added) Event Handler
  - new mqtt subtopic traccar/*/event
- (added) json topic to get the complete posted data
  - /traccar/*/event/json
  - /traccar/*/device/json
  - /traccar/*/position/json

- (fixed) device/state allways "online" fixed.
- (fixed) some mqtt errors.

#### 0.3

- (added) new variable (Model, uniqueid, positionid, address, Battery, distance, totaldistance, motion) special thanks to dossidr

#### 0.2

- (improvement) better mqtt connect handle

- (added) new variable geofanceID

- (added) more console output for debug

#### 0.1

- (improvement) less error prone if vars no exists on traccar  

### currently Limits

  

- [ ] no mqtt_topic_change (/traccar atm.)

- [x] only forward, no events

### Tech

  

Traccar2mqtt uses a number of open source projects to work properly:

  

*  [MQTT](https://www.npmjs.com/package/mqtt) - Node.JS client library for the MQTT protocol

*  [node.js] - evented I/O for the backend

*  [Express] - fast node.js network app framework [@tjholowaychuk]

  

If you have any improvement, ideas, issues, bugs, feature requests please submit a report at

https://github.com/gamebeast2k/docker_traccar2mqtt/issues or write a mail to info@gamebeast.de

  

The build instructions are tracked on [GitHub](https://github.com/gamebeast2k/docker_traccar2mqtt). Automated builds are hosted on [Docker Hub](https://hub.docker.com/r/gamebeast/traccar2mqtt).

  

# Setup and Starting via Docker Run

##### !!! Dont forget Setup the var.env file for your environment !!!
```sh

curl https://raw.githubusercontent.com/gamebeast2k/docker_traccar2mqtt/master/var.env.example --output var.env
docker run - 44110:80 -d --name traccar2mqtt --env-file ./var.env gamebeast/traccar2mqtt
```
The Docker is downloading images from DockerHub, starting and waiting on port 44110 TCP for data from Traccar.

  

# Setup and Starting via Docker-compose
##### !!! Dont forget Setup the var.env file for your environment !!!
```sh
curl https://raw.githubusercontent.com/gamebeast2k/docker_traccar2mqtt/master/var.env.example --output var.env
curl https://raw.githubusercontent.com/gamebeast2k/docker_traccar2mqtt/master/docker-compose.yml --output docker-compose.yml
docker-compose up
```
The the container is again downloading images from DockerHub and starting in foreground. Try -d to start in background.

## UPDATING
The Update process is pretty easy.
```sh
docker pull gamebeast/traccar2mqtt
docker restart traccar2mqtt
```
Thats all what you need to update.


## Setup Traccar

On your Traccar Setup edit **conf/traccar.xml** and add forward

``` xml

<!-- position forwarding -->

<entry  key='forward.enable'>true</entry>
<entry  key='forward.json'>true</entry>
<entry  key='forward.url'>http://traccar2mqtt_ip:80/</entry>

<!-- event forwarding -->

	<entry key="event.forward.enable">true</entry>
	<entry key='event.forward.url'>http://traccar2mqtt_ip:80/</entry>

```

**And restart Traccar Instance**

### environment vars

  
| variable | default | Comment |
| ---- | ---- | ---- |
| ${NODE_ENV] | production | no need to change |
| variable     | default     | Comment     |
| ---- | ---- | ---- |
| ${NODE_ENV] | production | no need to change |
| ${clientid} | traccar2mqtt | your mqtt ClientID (must be unique)|
| ${mqtt_username} | username | your mqtt username|
| ${mqtt_password} | password | your mqtt password|
| ${mqtt_host} | mqtt://1.2.3.4 | your mqtt ipaddr or dns-name|

  


[express]: <https://expressjs.com/>

[node.js]: <http://nodejs.org>

[@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
