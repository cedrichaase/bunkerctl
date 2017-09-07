# bunkerctl

## Overview

_bunkerctl_ is an Angular application that ties together custom built, mostly home automation related web services
for cross-platform use on both mobile and desktop devices.
It was built for use in a rehearsal room situated in a refurbished fallout shelter (thus, _bunker_ ctl), but it may be used in any other environment
as well.

All of these services are intended to be run on a local network only - thus, right now, none of them implement any
kind of security measures.

As of now, bunkerctl provides integration with the following services:

### [nodergb-server](https://github.com/cedrichaase/nodergb-server)

A service that allows direct control of RGB LED strips hooked up to an _esp8266_ microcontroller running the [nodergb](https://github.com/cedrichaase/nodergb) software
or any other microcontroller that provides the same interface. 

<img width="1440" alt="screen shot 2017-09-07 at 14 33 48" src="https://user-images.githubusercontent.com/13900565/30163544-a90c7fce-93d9-11e7-95ea-e799278adac2.png">

### [nodergb-realtime-client](https://github.com/cedrichaase/nodergb-realtime-client)

A service that stores and runs arbitrary python programs that allow for convenient and dynamic control of
RGB LED strips through [nodergb-server](https://github.com/cedrichaase/nodergb-server).

<img width="1440" alt="screen shot 2017-09-07 at 14 32 09" src="https://user-images.githubusercontent.com/13900565/30163545-a90d8400-93d9-11e7-8abe-1ca130cfa88c.png">

### [tradfri-esp](https://github.com/cedrichaase/tradfri-esp-service)

A simple web service for controlling an IKEA Tradfri remote hooked up to an _ESP8266_ microcontroller
as described on [this](https://www.heise.de/make/artikel/Ikea-Tradfri-Anleitung-fuer-ein-ESP8266-Lampen-Gateway-3598411.html)
 (german) website.

<img width="1440" alt="screen shot 2017-09-07 at 14 32 15" src="https://user-images.githubusercontent.com/13900565/30163542-a90be1cc-93d9-11e7-8ddd-bafcd95fb3b1.png">


### [pi-weather](https://github.com/thefork/pi-weather)

A service that monitors, stores and provides temperature and humidity data.

<img width="1440" alt="screen shot 2017-09-07 at 14 32 18" src="https://user-images.githubusercontent.com/13900565/30163543-a90c7100-93d9-11e7-888b-01fe8d3e86d6.png">


## Development

### develop

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
Use the `--env` option to select an environment to build the application for.

### deploy

Edit the `HOST` variable in `deploy.sh` to point to the address of the host you want to deploy
the application on, then run the script to deploy to `/var/www/bunkerctl` on that host.
