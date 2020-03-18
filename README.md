# What is Traccar2mqtt

![Build Status](https://img.shields.io/github/languages/code-size/gamebeast2k/docker_traccar2mqtt?style=for-the-badge)
![OpenIssue](https://img.shields.io/github/issues/gamebeast2k/docker_traccar2mqtt?style=for-the-badge)
![dockerbuild](https://img.shields.io/docker/cloud/automated/gamebeast/traccar2mqtt?style=for-the-badge)

Traccar2mqtt is a small Server written in NodeJs to use Traccar in other Programms. In my case Io.Broker

### Changelog
#### 0.1
- (emprovment) less error prone if vars no exsist on traccar
#### 0.2
- (emprovment) better mqtt connect handle
- (added) new variable geofanceID
- (added) more console output for debug

#### 0.3
- (added) new variable (Model, uniqueid, positionid, address, Battery, distance, totaldistance, motion) special thanks to dossidr

### currently Limits

- no mqtt_topic_change (/traccar atm.)
- only forward no events
### Tech

Traccar2mqtt uses a number of open source projects to work properly:

* [MQTT](https://www.npmjs.com/package/mqtt) - Node.JS client library for the MQTT protocol
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

If you have any improvement, ideas, issues, bugs, feature requests please submit a report at
https://github.com/gamebeast2k/docker_traccar2mqtt/issues

The build instructions are tracked on [GitHub](https://github.com/gamebeast2k/docker_traccar2mqtt). Automated builds are hosted on [Docker Hub](https://hub.docker.com/r/gamebeast/traccar2mqtt).
##### !!! Dont forget Setup the var.env file for your environment !!!
```
$ curl https://raw.githubusercontent.com/gamebeast2k/docker_traccar2mqtt/master/var.env --output docker-compose.yml
```
### running
```sh
$ docker run - 44110:80 -d --env-file ./var.env gamebeast/traccar2mqtt
```
### docker-compose
```sh
$ curl https://raw.githubusercontent.com/gamebeast2k/docker_traccar2mqtt/master/docker-compose.yml --output docker-compose.yml
$ docker-compose up
```
### Setup Traccar
On your Traccar Setup edit **conf/traccar.xml** and add folled
``` xml
<!-- position forwarding -->
<entry key='forward.enable'>true</entry>
<entry key='forward.json'>true</entry>
<entry key='forward.url'>http://traccar2mqtt_ip:80/</entry>
```
**And restart Traccar Instance**
### environment vars

| variable | default | Comment
| ------ | ------ | ------|
| ${NODE_ENV] | production | no need to change |
| ${clientid} | traccar2mqtt | your mqtt ClientID (must be unique)|
| ${mqtt_username} | username | your mqtt username|
| ${mqtt_password} | password | your mqtt password|
| ${mqtt_host} | mqtt://1.2.3.4 | your mqtt ipaddr/dns-name|


   [express]: <https://expressjs.com/>
   [node.js]: <http://nodejs.org>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>

