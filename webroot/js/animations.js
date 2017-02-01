var chatWindow = document.querySelector('.chat-window')

function show() {
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
