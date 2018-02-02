# CodeceptJS - Project1

End-to-end testing with WebDriver, Page Object Pattern, Docker 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes. 

## CodeceptJS Installing and Running

### CodeceptJS - Installation.

```javascript 
npm install codeceptjs@1.1.1 
npm install webdriverio 
npm install selenium-webdriver 
npm install selenium-standalone@latest 
selenium-standalone install
selenium-standalone start
npm install co
```

###CodeceptJS - Change Global and Local Env. 
For Local Installation add parameter --dev-save to npm
For Global Installation add parameter -g to npm

##For One Browser Run

- Execute "runStepsChromeBrowser" in package.json file

##For Multiple Browser Run (Chrome,Firefox)

- Delete "desiredCapabilities", "chromeOptions", "args", "host", "port", "method" parameters in codecept.json file 
- Execute "runStepsLocalMultipleBrowser" in package.json file

## Docker Installation and Running

* Helper Tools for Docker: (Not needed these tools but useful for management Docker)
Install Docker Quickstart Terminal, Kitematic

###Docker Compose File
In docker-compose.yml file
Chrome and Firefox hub link to node .
Session and Instance of hub set to 5
Ports for Browsers: Chrome: 5900 Firefox: 5901 settings are available

###For Docker Run

* Default codecept.json file running on chrome browser. For docker multiple browser and hub please add new parameter.

Add below parameter in codecept.json file
"host": "192.168.99.100",
"port": 4444,
"method" : "GET",
  
* After these settings , before running test with docker:

- Go to project file where docker-compose.yml
- Up Docker with "docker-compose up -d"
- Check State of node and hubs with "docker-compose ps"
- Check docker ps or point directly to your browser and open http://localhost:4444/grid/console or http://192.168.99.100:4444/grid/console.Selenium grid console.
- Open 2 VNC Viewer for Chrome and Firefox Node
- Type 192.168.99.100.5901 in VNC Server for Mozilla , Password: secret, Connect it
- Type 192.168.99.100.5900 in VNC Server for Chrome , Password: secret, Connect it 
- Execute "runStepsMultipleDocker" in package.json file

##Project 1 - Test 3
- Before test execution . Please set current Yamaha product count in project1_test.js . Because count may change daybyday




