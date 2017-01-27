var chatWindow = document.querySelector('.chat-window')

function show() {
  // The bounce animation will return to the original state
  // In this case, it will go from 0deg to -45deg to 0deg
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
