function Webchat(hostname) {
    var chat = this;

    //Start Lifecycle
    chat.socket = new WebSocket('ws://' + hostname + '/chat', 'chat');
    chat.socket.onopen = function() {
        chat.promptUsername();
    };
    
    //Get & Sent Basic Info to Server
    chat.promptUsername = function() {
        var email = prompt('What is your email?');
        var hash = md5(email.toLowerCase());
        var avatarImageURI = "https://www.gravatar.com/avatar/" + hash;
        var avatarProfile = "https://www.gravatar.com/" + hash + ".json";

        chat.start(email, avatarImageURI, avatarProfile);
    }
    
    chat.start = function(email, avatarImageURI, avatarProfile) {
        
        let json = JSON.stringify({"email":email, "avatar":avatarImageURI, "profileJSONURI": avatarProfile});
        
        chat.socket.send(json);
        show();
    }
    
    //Handle Chat Text Submission
/*    $('form').on('submit', function(e) {
         e.preventDefault();
         
         var message = $('.message-input').val();
         
         if (message.length == 0 || message.length >= 256) {
         return;
         }
         
         chat.send(message);
         $('.message-input').val('');
     });
*/
    
    //Append New Messages
    
    
    //Send New Messages to Server
    
    
    //Receive New Messages from the Server
    
}
