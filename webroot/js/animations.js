/*
 Author: Ryan M. Collins
 Description: Perfect Chat
 Version: 1.0
 License: See license file
 */

var chatWindow = document.querySelector('.chat-window')

function showChatWindow() {
  dynamics.animate(chatWindow, {
   opacity: 1,
   scale: 1
  }, {
   type: dynamics.spring,
   frequency: 200,
   friction: 270,
   duration: 800
  })
}
