class Hero {

  constructor() {
    // here we have all the properties of the hero
    // we start with the image and we insert the image to the gamebox
    this.node = document.createElement("img");
    this.node.src = "../Resources/personajes/Dustin-canal-aplha.png";

    gameBoxNode.append(this.node);

    this.x = 100;
    this.y = 250;
    this.w = 65;
    this.h = 75;

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";

    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.gravitySpeed = 5;
    this.speed = 25;
  }

  // here we have all the methods of the Hero
  gravityEffect() {
    if (this.y < 250) {
      this.y += this.gravitySpeed;
      this.node.style.top = `${this.y}px`;
    }
  }

  jump() {
    if(this.y === 250) {
        let jumpIntervalId = setInterval(() => {
            this.y -= 17;
            this.node.style.top = `${this.y}px`;
          }, 10);
      
          setTimeout(() => {
            clearInterval(jumpIntervalId);
          }, 100);
    }
  }

  movement(direction) {
    if(direction === "right") {
      this.x += this.speed;
      this.node.style.left = `${this.x}px`;
      // console.log(this.x);
    } else if (direction === "left") {
      this.x -= this.speed;
      this.node.style.left = `${this.x}px`;
      // console.log(this.x);
    }
  }
}
