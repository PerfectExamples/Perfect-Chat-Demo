function Webchat(hostname) {
    
    //Declarations
    var chat = this;
    var username = "";
    var displayName = "";
    var avatar = "";
    
    //Start Lifecycle
    chat.socket = new WebSocket('ws://' + hostname + '/chat', 'chat');
    
    //Start Chat Sequence On New Chat
    chat.socket.onopen = function() {
        chat.promptUserInfo();
    }
    
    //Get & Send Basic Info to Server
    chat.promptUserInfo = function() {
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
    
    //Actually setup the chat window and start talking
    chat.start = function(email, avatarImageURI, name) {
        var json = JSON.stringify({"email":email, "avatar":avatarImageURI, "displayName": name});
        chat.socket.send(json);
        showChatWindow(); //This triggers the animation that shows the main window, defined in animations.js
    }
    
    //Append New Messages to the Chat Window
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
    
    //Handle Chat Text Submission
    $('form').on('submit', function(form) {
         form.preventDefault();
         
         var text = $('.sendbar-input').val();
         
         chat.appendMessage(text, avatar, true);
         chat.sendMessage(text);
         
         $('.sendbar-input').val('');
     });
};

