# Chat Demo

<p align="center">
    <a href="http://perfect.org/get-involved.html" target="_blank">
        <img src="http://perfect.org/assets/github/perfect_github_2_0_0.jpg" alt="Get Involved with Perfect!" width="854" />
    </a>
</p>

<p align="center">
    <a href="https://github.com/PerfectlySoft/Perfect" target="_blank">
        <img src="http://www.perfect.org/github/Perfect_GH_button_1_Star.jpg" alt="Star Perfect On Github" />
    </a>  
    <a href="http://stackoverflow.com/questions/tagged/perfect" target="_blank">
        <img src="http://www.perfect.org/github/perfect_gh_button_2_SO.jpg" alt="Stack Overflow" />
    </a>  
    <a href="https://twitter.com/perfectlysoft" target="_blank">
        <img src="http://www.perfect.org/github/Perfect_GH_button_3_twit.jpg" alt="Follow Perfect on Twitter" />
    </a>  
    <a href="http://perfect.ly" target="_blank">
        <img src="http://www.perfect.org/github/Perfect_GH_button_4_slack.jpg" alt="Join the Perfect Slack" />
    </a>
</p>

<p align="center">
    <a href="https://developer.apple.com/swift/" target="_blank">
        <img src="https://img.shields.io/badge/Swift-3.0-orange.svg?style=flat" alt="Swift 3.0">
    </a>
    <a href="https://developer.apple.com/swift/" target="_blank">
        <img src="https://img.shields.io/badge/Platforms-OS%20X%20%7C%20Linux%20-lightgray.svg?style=flat" alt="Platforms OS X | Linux">
    </a>
    <a href="http://perfect.org/licensing.html" target="_blank">
        <img src="https://img.shields.io/badge/License-Apache-lightgrey.svg?style=flat" alt="License Apache">
    </a>
    <a href="http://twitter.com/PerfectlySoft" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-@PerfectlySoft-blue.svg?style=flat" alt="PerfectlySoft Twitter">
    </a>
    <a href="http://perfect.ly" target="_blank">
        <img src="http://perfect.ly/badge.svg" alt="Slack Status">
    </a>
</p>

This repository holds a project designed to show you how to setup and use web sockets. 

In this example, we designed a real-time chat service.

The objects are separated by function:

- ChatUser is the model for a user
- ChatroomService is both the model for the chatroom itself, and the underlying data handler. This is accomplished by using only initialized variables in the class, as well as creating an instance of the class held by itself `static let instance = Chatroom()`. In practice this is commonly referred to as creating a "singleton" (meaning that there is only ever one instance of the class used). Many people also call this a data service. Since you never need to initialize an instance of it, you can simply refer to the class.instance to use the shared resources, i.e. `Chatroom.instance.sendMessage(message, fromUser: chatUser)`.
- The socket handler that handles each socket, contained in Handlers.swift, along with the request handler for the /chat route that initially spawns it. 

## Compatibility with Swift

The master branch of this project currently compiles with **Xcode 8.2** or the **Swift 3.0.2** toolchain on Ubuntu.

## Demo server:

A live demo of this runs currently at: [http://chatserver-758198327.us-east-1.elb.amazonaws.com](http://chatserver-758198327.us-east-1.elb.amazonaws.com)

## Building & Running

The following will clone and build an empty starter project and launch the server on port 8181.

```
git clone https://github.com/PerfectExamples/Perfect-Chat-Demo.git
cd Perfect-Chat-Demo
swift build
.build/debug/Perfect-Chat-Demo
```

You should see the following output:

```
[INFO] Starting HTTP server Chat on 0.0.0.0:8181
```

This means the server is running and waiting for connections. Access the API routes at [http://0.0.0.0:8181/](http://0.0.0.0:8181/). Hit control-c to terminate the server.

### IMPORTANT NOTE ABOUT XCODE

If you choose to generate an Xcode Project, you **MUST** change to the executable target **AND** setup a custom working directory wherever you cloned the project. 

![Proper Xcode Setup](https://github.com/PerfectExamples/Perfect-Chat-Demo/raw/master/Supporting/xcode.png)

## Testing

The API routes at [http://localhost:8080/](http://127.0.0.1:8080/) are:

- /
- /chat

### /

The base route is simply the public facing website that provides the chat interface to the user, and then interacts with the websocket through javascript. 

At first connection, the server will prompt you for your Gravatar associated email, and then whatever you would like to be called. **ANYTHING** will work in the first prompt if you do not have a Gravatar account. Simply type anything that is not blank and it will assign you a generic avatar image. Whoever you put in the second box will become your name in the chat. 

The reason for the second prompt is that while the Gravatar API allows any host to pull an image, the Gravatar profile API has CORS policy that forbids localhosts from retrieving information. Since this project is meant to run locally as an example, we simply cannot connect to the profile API to pull a displayName. 

### /chat

Chat is the route that is used to create a new websocket connection with a client. This is only for the socket, and visiting it in a browser or performing a normal HTTP get request will result in a 400 (Bad Request) error. 

## Issues

We are transitioning to using JIRA for all bugs and support related issues, therefore the GitHub issues has been disabled.

If you find a mistake, bug, or any other helpful suggestion you'd like to make on the docs please head over to [http://jira.perfect.org:8080/servicedesk/customer/portal/1](http://jira.perfect.org:8080/servicedesk/customer/portal/1) and raise it.

A comprehensive list of open issues can be found at [http://jira.perfect.org:8080/projects/ISS/issues](http://jira.perfect.org:8080/projects/ISS/issues)



## Further Information
For more information on the Perfect project, please visit [perfect.org](http://perfect.org).
