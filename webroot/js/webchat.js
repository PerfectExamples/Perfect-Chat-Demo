function Webchat(hostname) {
    var chat = this;

    //Start Lifecycle
    chat.socket = new WebSocket('ws://' + hostname + '/chat', 'chat');
    chat.socket.onopen = function() {
        chat.promptUsername();
    };
    
    //Get & Sent Basic Info to Server
    chat.promptUsername = function() {
        while (!email) {
            var email = prompt('What is your gravatar email? (anything but blank works)');
        }
        
        while (!displayName) {
            var displayName = prompt('What do you want to be called?');
        }
        
        var hash = md5(email.toLowerCase());
        var avatarImageURI = "https://www.gravatar.com/avatar/" + hash;

        chat.start(email, avatarImageURI, displayName);
    }
    
    chat.start = function(email, avatarImageURI, name) {
        
        let json = JSON.stringify({"email":email, "avatar":avatarImageURI, "displayName": name});
        
        chat.socket.send(json);
        show();
    }
    
    //Handle Chat Text Submission
    $('form').on('submit', function(e) {
         e.preventDefault();
         
        //Do Stuff
     });
    
    //Append New Messages
    chat.appendMessage = function(message, avatar, selfSent) {
        
        var messageSection = document.querySelector('.messages');
        
        var div = document.createElement('div');
        div.className = 'message';
        
        if (selfSent) {
            div.className += 'self';
        }
        
        var image = document.createElement('img');
        image.className = 'avatar';
        image.src = avatar;
        image.alt = 'Avatar';
        
        var span = document.createElement('span');
        span.innerHTML = message;
        
        div.appendChild(image);
        div.appendChild(span);
        
        messageSection.appendChild(div);
    }
    
    //Send New Messages to Server
    
    
    //Receive New Messages from the Server
    chat.socket.onmessage = function(received) {
        var jsonAry = JSON.parse(received.data);
        var message = jsonAry["message"];
        var avatar = jsonAry["avatar"];
        var selfSent = false;
        chat.appendMessage(message, avatar, selfSent);
    }
}
