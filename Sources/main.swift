//
//  Shipment.swift
//  MultipleServerInstances
//
//  Created by Ryan Collins on 1/10/17.
//
//  Modified from the Perfect Template Project

import PerfectLib
import PerfectHTTP
import PerfectHTTPServer

// Configuration data for two example servers.
// This example configuration shows how to launch one or more servers
// using a configuration dictionary.

let port = 8181

let routes = [
    ["method":"get", "uri":"/**", "handler":PerfectHTTPServer.HTTPHandler.staticFiles,
				 "documentRoot":"./webroot",
				 "allowResponseFilters":true],
]

let config = [
    "servers": [
        // Configuration data for one server which:
        //	* Serves only public API routes
        [
            "name":"Chat",
            "port":port,
            "routes": routes,
            ]
    ]
]

do {
    // Launch the servers based on the configuration data.
    try HTTPServer.launch(configurationData: config)
} catch {
    fatalError("\(error)") // fatal error launching one of the servers
}

