var pin = document.querySelector('#projects-teaser')

function horizontalBounce() {
  // The bounce animation will return to the original state
  // In this case, it will go from 0deg to -45deg to 0deg
  dynamics.animate(pin, {
    rotateZ: 0
  }, {
    type: dynamics.bounce,
    duration: 3100,
    complete: verticalBounce
  })
}

function verticalBounce() {
  // We animate the two elements (svg, pin) independently
  dynamics.animate(pin, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 0
  })

  // Use the delay option to delay your animations
  dynamics.animate(pin, {
    translateY: -30
  }, {
    type: dynamics.forceWithGravity,
    bounciness: 0,
    duration: 500,
    delay: 150
  })

  dynamics.animate(pin, {
    scaleY: 0.8
  }, {
    type: dynamics.bounce,
    duration: 800,
    bounciness: 200,
    delay: 650,
    complete: horizontalBounce
  })
}

// Start the horizontal bounce first!
horizontalBounce()