# Elevators Project

## Overview

Nodejs is used to manage both backend and frontend project.  This simplifies installation instructions.  Use of nodejs on the backend is not an endorsement of the technology, because there are equally good if not better solutions based on .NET or GO language.

A single GIT repository is used to manage both projects to simplify snapshotting of functional application state.

## Development Environment

OS: Windows  
IDE: Visual Studio Code


## Getting the Porject

Install shared prerequisites:

1. [Git for Windows](https://git-scm.com/download/win)
2. [NodeJS and NPM](https://nodejs.org/en/).  Developed with NodeJS LTS version 8.9.4 and NPM version 5.6.0.

Install global frontend prerequisite:

    npm install -g @angular/cli

Load project and its dependencies:

    git clone https://github.com/Kulak/elevators.git

    cd backend
    npm install

    cd ../frontend
    npm install

## Running the Project

The project was developed on Windows and in PowerShell.

It is recommended that you 1st start backend, because processes started
in the separate windows on Windows.  Frontend development process blocks
powershell until frontend server application quits.

### Backend Development Process

Backend development process is started with commands:

    cd backend
    npm run dev

Thhis will start 2 background applications.  

First background application is a TypeScript compiler `tsc`,
which watches for changes in the source code and compiles the code.

Second background application is `nodemon` which starts nodejs and monitores for changes in the JavaScript source code.  It restarts application if changes is found or application has crashed.

**ATTENTION**

The backend project file is targeting Windows and PowerShell syntax in the following line:

    "dev": "start tsc --watch && start nodemon"

If running on Linux equvalent might be (not tested):

    "dev": "tsc --watch & nodemon"

### Frontend Development Process

Frontend development is standard angular development process:

    cd frontend
    ng serve

Changes to the source code files result in automatic recompilation and 
browser refresh.

## Run Configuration

The project is hardcoded to run on the following ports:

TCP port 4200 serves frontend project and acts as a static web server.  To display frontend application webbrowser go to:

    http://localhost:4200

TCP port 3000 serves REST API project and acts as application web server without static web pages.

## Architecture Notes

The project has a clear split between backend and frontend.  Backend is not given responsibility of servicing frontend files.  Thus, it is not a monolitic backend application approach.  The separation is a natural one and has multiple advantages:

1. deployment is flexible, because frontend application can now be served by providers oriented on serving static web pages.  For example, it can be loaded on Google Cloud on the storage block.  Google storage block can serve a website content as long as it is 100% static content.  Google storage block provides a free tier for this functionality.
2. backend API application can be loaded on a dedicated application server.
3. development process can take advantage of angular rapid development process with `ng serve` command.

Drawbacks:

1. [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Design Model

The current design model acommodates the following concepts:

1. Building can have 1 or more sets of elevators.
2. Each set of elevators serves certain range of floors.
   For example, the could be 1st set serving floors 1 to 10 and 2nd set
   serving floors 10 to 20.

**ATTENTION**

While the model has started with the multiple sets, only one set has been fully implemented.  Thus, the current simulation can only simulate a building with only one set of elevators.   This applies to both backend and frontend.

## Backend Design and Implementation

The backend application serves status of elevators, which is largely target floor, current floor and doors closed and opened.

Backend implements the following calls:

1. GET method returns elevators state.  This call is not used by frontend.  Early versions of the code used this call.
2. Web Socket returns status of elevators with every change.  This is the primary method of providing elevators status to the frontend.
3. POST method allows to set elevator target floor.  That's the only way frontend can change simulation in any significant way.

The design on the backend uses services model.

### Notable 3rd Party Packages on the Backend

1. `body-parser` middleware for ExpressJS web server.  This simplifies handling of JSON data in POST message body.
2. `ws` package for nodejs to simplify web socket handling and to keep it compatible with expressjs.

### Backend Directory Structure

    dist/ - contains TypeScript compilation results
    node_modules/ - npm files
    src/ - source code
    src/index.ts - application entry point
    model/ - is suspposed to hold internal model files, but see services comment below.
    model/wire/ - holds structures that are used to send data to web browser.
        It holds communication format and nothing else.
        The reason it is under model, is because most people expect model to 
        be used for communication.
    services/ - holds individual services

Relationship between model and services.  A small service under services/ directory would consist of one file and might even define its model inside the service file.  A more complicated service would have a directory dedicated to it with model files placed under that service's directory.

Given that model is usually service specific, role of the dedicated model/ directory is reduced.  One could use it for application wide model used by more than one service.

## Frontend Design and Implementation

Frontend largely follows standard angular design and uses angular technology if one is available.

Frontend application relies on web browser implementation of websockets.  No custom library was used.

### Frontend Directory Structure

Frontend directory structure and content organization is 100% determinted by standard angular tools used to generate angular project.

UI components and services have corresponding dedicated directories.

### Building Frontend Service

Building provides access to API exposed in backend application.  Its URLs are hardcoded to use localhost and hardcoded port.

### Messages Frontend Service

Messages frontend service accumulates important user level messages.  It is currently application wide.

The thought behind this service and UI presentation is "iTunes like".  The might be a background task running and user needs to be notified of the background status without keeping user on the specific UI screen.

The UI design targets "read only" experience to prevent accidental commands to elevators.  To make a change to elevator, user is required to enter a dialog window (designers like to call it directed user flow) dedicated to the change.  User is given a choice to back out without a change or to accept the change.

Dialog window has limitations to process the change request:

* there is limited screen space to report issues
* it may take time to proccess the request
* it will complicate dialog state management after accept is clicked to account for: wait for status, display error message, reenable window after error, close window on success.

Thus, reporting of the issued command is delegated to the main application window.  The main application window has enough user space for reporting and user is not locked into waiting action.

### Notable 3rd Party Packages on the Backend

[Angular Material](https://material.angular.io/) is used.

## Test Cases

Unfortunately, there are none.

The application was tested by leaving 1st and 2nd elevators to run using backend people simulation.

3rd elevator was used to test sending change floor command to the elevator.

## Issues

Wire backend vs frontend method difference is not desired.

## References

An incomplete list of resources used to create this project.

1. [WebSocket+Express Example](https://github.com/websockets/ws#expressjs-example)
2. [WebSocket+NodeJS+Express in TypeScript](https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4)
3. [NodeJS API: setInterfal](https://nodejs.org/dist/latest-v8.x/docs/api/all.html#timers_setinterval_callback_delay_args)
4. [ws: a Node.js WebSocket library](https://github.com/websockets/ws)
5. [Simple WebSocket Client](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo) Chrome Extension
6. [Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
7. [Websocket with Observable](https://stackoverflow.com/questions/44060315/reconnecting-a-websocket-in-angular-and-rxjs/44067972#44067972) for Angular version of Observable using rxjs.
8. [Angular 4.3 HttpClient (Accessing REST Web Services With Angular)](https://codingthesmartway.com/angular-4-3-httpclient-accessing-rest-web-services-with-angular/)
9. [How to Receive a POST Request in Node.js](https://www.twilio.com/blog/2016/07/how-to-receive-a-post-request-in-node-js.html)
10. [HttpClient](https://angular.io/guide/http) Angular Documentation
11. [Dialog in Angular Material](https://material.angular.io/components/dialog/overview#configuring-dialog-content-via-code-entrycomponents-code-)