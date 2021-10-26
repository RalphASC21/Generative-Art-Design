
// CONSTRUCTORS ESSENTIALLY DO THE SAME THINGS JUST FOR DIFFERENT SHAPES

class Layer { //constructor creates snowflakes with designs that have different layers 
  constructor() {
    this.sides = SIDES
    this.numShapes = this.sides
    this.angle = 360 / this.numShapes //sides of the main hexagon
    this.stepsOut = 8
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut
    this.thinStroke = 1 // size of stroke lines
    this.thickStroke = 3 //size of stroke lines
    this.layerColor = getRandomFromPalette() //calls random generated color pallete, that has x amount of colors
  } //^^ not exactly random
}

class Circles extends Layer { //constroctor creates circles of different sizes colors in different positions
  constructor() {
    super()
    this.shapeSize = (CRYSTAL_SIZE / 2) * 0.93
    this.position = (CRYSTAL_SIZE / 2) - (this.shapeSize / 2)
  }

  render() {  //essentially displayes the shapes
    noFill()
    stroke(this.layerColor)
    strokeWeight(1)
    push() //only things within this will have the for loop and use a certain position or shape size
    //translate(width/2, height/2)
    for (let i = 0; i <= this.numShapes; i++) { // loops through an "i" amount of things
      ellipse(this.position, 0, this.shapeSize, this.shapeSize)
      rotate(this.angle)
    }
    pop()
  }
}

class SimpleLines extends Layer { //creates different layers within the snowflake
  constructor() {
    super()
    this.numSteps = randomSelectTwo() ? this.stepsOut : int(this.stepsOut * 1.25)
    this.step = (CRYSTAL_SIZE / 2) / this.numSteps
    this.start = floor(random(0, this.numSteps))
    this.stop = floor(random(this.start, this.numSteps + 1))
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2
    this.angle = 360 / this.numShapes
  }

  render() {
    noFill()
    stroke(this.layerColor)
    strokeWeight(this.weight)
    push()
      //translate(width/2, height/2)
      for (let i = 0; i < this.numShapes; i++) {
        line(this.start * this.step, 0, this.stop * this.step, 0)  
        rotate(this.angle)
      }
    pop()
  }
}

class OutlineShape extends Layer {
  constructor () {
    super()
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke
    this.hexagonTrue = randomSelectTwo()
  }

  render () {
    stroke(this.layerColor)
    strokeWeight(this.weight)
    push()
    //translate(width/2, height/2)
    if (this.hexagonTrue) {
      hexagon(0, 0, CRYSTAL_SIZE / 2)
    } else {
      ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
    }
    pop()
  }
}

class DottedLines extends Layer {   ///constructor creates dotted lines on snowflake                        
  constructor () {
    super()
    this.numShapes = randomSelectTwo() ? this.sides : this.sides * 2
    this.angle = 360 / this.numShapes
    this.shapeSize = 3
    this.centerOffset = this.singleStep
  }

  render () {
    fill(this.layerColor)
    noStroke()
    push()
    //translate(width / 2, height / 2)
    for(let i = 0; i <= this.numShapes; i++) {
      for(let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
        rect(x, 0, this.shapeSize, this.shapeSize)
      }
      rotate(this.angle)
    }
    pop()
  }
}

class CenteredShape extends Layer {             //centers shapes          
  constructor () {
    super()
    this.randomShape = random(1)
    this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut - 2)) * this.singleStep
  }

  render () {
    fill(this.layerColor)
    noStroke()
    push()
   // translate(width / 2, height / 2)
    if (this.randomShape < 0.1) {
      rect(0, 0, this.shapeSize * 2, this.shapeSize * 2)
    } else if (this.randomShape >= 0.1 && this.randomShape < 0.6) {
      ellipse(0, 0, this.shapeSize * 2, this.shapeSize * 2)
    } else if (this.randomShape >= 0.6) {
      rotate(this.angle / 2) 
      hexagon(0, 0, this.shapeSize)
    }
    pop()
  }
}

class RingOfShapes extends Layer {       // creates a ring of different shapes             
  constructor () {
    super()
    this.steps = floor(random(1, this.stepsOut))
    this.center = this.steps * this.singleStep
    this.randomShape = random(1)
    this.direction = randomSelectTwo() // used for triangle only
    this.fillColor = randomSelectTwo() ? this.layerColor : color(0, 1)
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke

    if (this.steps < this.stepsOut / 2) {
      this.radius = floor(random(1, this.steps)) * this.singleStep
    } else if (this.steps > this.stepsOut / 2) {
      this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
    } else {
      this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep
    }
  }

  render () {
    stroke(this.layerColor)
    fill(this.fillColor)
    strokeWeight(this.weight)
    push()
    //translate(width / 2, height / 2)
    for (let i = 0; i < this.numShapes; i++) {
      if (this.randomShape < 0.33) {
        ellipse(0, this.center, this.radius, this.radius)
      } else if (this.randomShape >= 0.33 && this.randomShape < 0.66) {
        rect(0, this.center, this.radius, this.radius)
      } else if (this.randomShape >= 0.66) {
        myTriangle(this.center, this.radius, this.direction)
      }
      rotate(this.angle)
    }
    pop()
  }
}

class SteppedHexagons extends Layer {       // Creates hexagons          
  constructor () {
    super()
    this.numSteps = randomSelectTwo() ? this.stepsOut : this.stepsOut * 1.25
    this.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
    this.singleStep = ((CRYSTAL_SIZE / 2) - this.centerOffset) / this.numSteps
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke
  }

  render () {
    stroke(this.layerColor)
    noFill()
    strokeWeight(this.weight)
    push()
    //translate(width / 2, height / 2)
    rotate(this.angle / 2) 
    for (let i = 1; i < this.numSteps + 1; i++) {
      hexagon(0, 0, this.centerOffset + (i * this.singleStep))
    }
    pop()
  }
}










