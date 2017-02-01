//
//  ChatroomService.swift
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

class Chatroom {
    
    //This line makes this a singleton, where you only use one shared instance of this class across the whole project. Singletons are VERY useful as a dataservice where data moves in and out, but needs to be shown in many places. 
    static let instance = Chatroom()
    
    private var _chats = [ChatUser: WebSocket]()
    let bot = ChatUser()
    
    func join(user: ChatUser, socket: WebSocket) {
        _chats[user] = socket
        sendMessage("\(user.displayName) Joined", fromUser: bot)
    }
    
    func leave(user: ChatUser) {
        _chats.removeValue(forKey: user)
        sendMessage("\(user.displayName) Left", fromUser: bot)
    }
    
    func sendMessage(_ message: String, fromUser user: ChatUser) {
        
        let json = ["user": user.displayName, "message": "\(user.displayName): \(message)", "avatar": user.avatarURI]
        
        do {
            let final = try json.jsonEncodedString()
            for (username, socket) in _chats {
                if username != user {
                    socket.sendStringMessage(string: final, final: true) {
                        print("message: \(final) was sent by user: \(user.displayName)")
                    }
                }
            }
        } catch {
            print("Failed to send message")
        }
        
    }
}
