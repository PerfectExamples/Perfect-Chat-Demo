//
//  Handlers.swift
//  Perfect-Chat-Demo
//
//  Created by Ryan Collins on 1/27/17.
//
//

import Foundation
import PerfectLib
import PerfectHTTP
import PerfectHTTPServer
import PerfectWebSockets

func chatHandler(data: [String:Any]) throws -> RequestHandler {
    return {
        request, response in
        
        // Provide your closure which will return the service handler.
        WebSocketHandler(handlerProducer: {
        (request: HTTPRequest, protocols: [String]) -> WebSocketSessionHandler? in
        
        // Check to make sure the client is requesting our "echo" service.
        guard protocols.contains("chat") else {
        return nil
        }
        
        // Return our service handler.
        return ChatHandler()
        }).handleRequest(request: request, response: response)
        
    }
}

class ChatHandler: WebSocketSessionHandler {
    
    // The name of the super-protocol we implement.
    // This is optional, but it should match whatever the client-side WebSocket is initialized with.
    let socketProtocol: String? = "chat"
    
    // This function is called by the WebSocketHandler once the connection has been established.
    func handleSession(request: HTTPRequest, socket: WebSocket) {
        
        var user: ChatUser? = nil
        
        // Read a message from the client as a String.
        // Alternatively we could call `WebSocket.readBytesMessage` to get the data as a String.
        socket.readStringMessage {
            // This callback is provided:
            //  the received data
            //  the message's op-code
            //  a boolean indicating if the message is complete
            // (as opposed to fragmented)
            string, op, fin in

            // The data parameter might be nil here if either a timeout
            // or a network error, such as the client disconnecting, occurred.
            // By default there is no timeout.
            guard let string = string else {
                // This block will be executed if, for example, the browser window is closed.
                socket.close()
                return
            }
            
            // Print some information to the console for informational purposes.
            print("Read msg: \(string) op: \(op) fin: \(fin)")
            
            do {
                guard fin == true, let json = try string.jsonDecode() as? [String: Any] else {return}
                user = try ChatUser(json: json)
                
                if let message = json["message"] as? String {
                    print(message)
                } else {
                    if user != nil {
                       Chatroom.instance.join(user: user!, socket: socket)
                    }
                }
            } catch {
                print("Failed to decode JSON from Received Socket Message")
            }
            
            // Echo the data received back to the client.
            // Pass true for final. This will usually be the case, but WebSockets has
            // the concept of fragmented messages.
            // For example, if one were streaming a large file such as a video,
            // one would pass false for final.
            // This indicates to the receiver that there is more data to come in
            // subsequent messages but that all the data is part of the same logical message.
            // In such a scenario one would pass true for final only on the last bit of the video.
//            socket.sendStringMessage(string: string, final: true) {
//                
//                // This callback is called once the message has been sent.
//                // Recurse to read and echo new message.
//                self.handleSession(request: request, socket: socket)
//            }
        }
    }
}
