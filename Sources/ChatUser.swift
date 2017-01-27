//
//  ChatUser.swift
//  Perfect-Chat-Demo
//
//  Created by Ryan Collins on 1/27/17.
//
//

import Foundation

enum UserError: Error {
    case failedToCreate
}

class ChatUser: Hashable {
    
    var email: String
    var avatarURI: String
    var displayName: String
    
    init(json: [String: Any]) throws {
        
        guard let userEmail = json["email"] as? String, let avatarURL = json["avatar"] as? String, let name = json["displayName"] as? String else { throw UserError.failedToCreate }
        
        self.email = userEmail
        self.avatarURI = avatarURL
        self.displayName = name
    }
    
    //Plain == make a bot!
    init() {
        self.email = "nil"
        self.displayName = "Bot"
        self.avatarURI = "http://en.gravatar.com/avatar/0"
    }
    
    var hashValue: Int {
        return email.hashValue
    }
    
    static func == (lhs: ChatUser, rhs: ChatUser) -> Bool {
        return lhs.email == rhs.email
    }
}
