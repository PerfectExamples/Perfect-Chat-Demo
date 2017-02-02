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
    
    var user: ChatUser? = nil
    
    // The name of the super-protocol we implement.
    // This is optional, but it should match whatever the client-side WebSocket is initialized with.
    let socketProtocol: String? = "chat"
    
    // This function is called by the WebSocketHandler once the connection has been established.
    func handleSession(request: HTTPRequest, socket: WebSocket) {
        
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
                if let chatUser = self.user {
                    print("socket closed for \(chatUser.email)")
                    Chatroom.instance.leave(user: chatUser)
                }
                
                socket.close()
                return
            }
            
            // Print some information to the console for to show the incoming messages.
            print("Read msg: \(string) op: \(op) fin: \(fin)")
            
            do {
                guard fin == true, let json = try string.jsonDecode() as? [String: Any] else {return}
                self.user = try ChatUser(json: json)
                
                if let chatUser = self.user {
                    if let message = json["message"] as? String {
                        //If there's a message attached, we send it
                        Chatroom.instance.sendMessage(message, fromUser: chatUser)
                    } else {
                        //Otherwise, they must be joining, so add them!
                        Chatroom.instance.join(user: chatUser, socket: socket)
                    }
                }
                
                
            } catch {
                print("Failed to decode JSON from Received Socket Message")
            }
            
            //Done working on this message? Loop back around and read the next message.
            self.handleSession(request: request, socket: socket)
        }
    }
}
