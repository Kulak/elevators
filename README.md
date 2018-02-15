# Elevators Project

## Overview

Nodejs is used to manage both backend and frontend project.  This simplifies installation instructions.  Use of nodejs on backend is not an endorsement of the technology, because there are equally good if not better solutions based on .NET or GO language.

A single GIT repository is used to manage both projects to simplify snapshotting of functional application state.  Usually a meta project would be setup that ties separate GIT repositories using GIT submodules feature.  GIT submodules feature complicates source code management and is a deterrant during early development stages when both backend and frontend change significantly.

## Development Environment

OS: Windows  
IDE: Visual Studio Code

## Shared Prerequisites

1. Git
2. NodeJS and NPM.  Developed with NodeJS LTS version 8.9.4 and NPM version 5.6.0.

## Frontend Prerequisites

1. Angular 5.2.4, angular-cli 1.6.8

## Prerequisites Installation

### Git Download for Windows

<https://git-scm.com/download/win>

### NodeJS Download

https://nodejs.org/en/

### Angular Download and Installation

    npm install -g @angular/cli

## Run Configuration

The project is hardcoded to run on the following ports:

TCP port 4200 serves frontend project and acts as a static web server.

TCP port 3000 serves REST API project and service as application web server without static web pages.

### Frontend Development Process

In PowerShell:

    cd frontend/
    ng serve

Changes to source code files will result in automatic recompilation and browser reload.

### Backend Development Process

In PowerShell:

    cd backend/
    npm dev

The dev script starts 2 separate windows.  One window is for TypeScript recompilation and another window is for server process reload.

## References

Resources used to create this project.

1. [WebSocket+Express Example](https://github.com/websockets/ws#expressjs-example)
2. [WebSocket+NodeJS+Express in TypeScript](https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4)
3. 