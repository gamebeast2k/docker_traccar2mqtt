# What is Traccar2mqtt

![Build Status](https://img.shields.io/github/languages/code-size/gamebeast2k/docker_traccar2mqtt)

Traccar2mqtt is a small Server written in NodeJs to use Traccar in other Programms. In my case Io.Broker

  -  

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

