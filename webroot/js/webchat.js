function Webchat(hostname) {
    var chat = this;
    var username = "";
    var displayName = "";
    var avatar = "";

    //Start Lifecycle
    chat.socket = new WebSocket('ws://' + hostname + '/chat', 'chat');
    chat.socket.onopen = function() {
        chat.promptUsername();
    }
    
    //Get & Sent Basic Info to Server
    chat.promptUsername = function() {
        while (!username) {
            username = prompt('What is your gravatar email? (anything but blank works)');
        }
        
        while (!displayName) {
            displayName = prompt('What do you want to be called?');
        }
        
        var hash = md5(username.toLowerCase());
        avatar = "https://www.gravatar.com/avatar/" + hash;

        chat.start(username, avatar, displayName);
    }
    
    chat.start = function(email, avatarImageURI, name) {
        
        var json = JSON.stringify({"email":email, "avatar":avatarImageURI, "displayName": name});
        
        chat.socket.send(json);
        show();
    }
    
    //Handle Chat Text Submission
    $('form').on('submit', function(e) {
         e.preventDefault();
         
        var text = $('.sendbar-input').val();
 
        chat.appendMessage(text, avatar, true);
        chat.sendMessage(text);
        $('.sendbar-input').val('');
     });
    
    //Append New Messages
    chat.appendMessage = function(message, avatar, selfSent) {
        
        var messageSection = document.querySelector('.messages');
        
        var div = document.createElement('div');
        div.className = 'message';
        
        var image = document.createElement('img');
        image.className = 'avatar';
        image.src = avatar;
        image.alt = 'Avatar';
        
        var span = document.createElement('span');
        span.innerHTML = message;
        
        if (selfSent) {
            div.className += ' self';
        }
        
        div.appendChild(image);
        div.appendChild(span);
        
        messageSection.appendChild(div);
        messageSection.scrollTop = messageSection.scrollHeight;
    }
    
    //Send New Messages to Server
    chat.sendMessage = function(message) {
        var json = JSON.stringify({"email": username, "avatar": avatar, "displayName": displayName, "message": message});
        console.log(json);
        chat.socket.send(json);
    }
    
    //Receive New Messages from the Server
    chat.socket.onmessage = function(received) {
        var jsonAry = JSON.parse(received.data);
        var message = jsonAry["message"];
        var avatar = jsonAry["avatar"];
        var selfSent = false;
        chat.appendMessage(message, avatar, selfSent);
    }
};
