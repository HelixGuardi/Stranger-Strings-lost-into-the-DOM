class Enemy {

    constructor(orientation) {
        this.node = document.createElement("img");
        this.node.src = "../Resources/personajes/Demogorgon-canal-alpha.png";

        gameBoxNode.append(this.node);

        if(orientation === "left" ){
            this.x = -56;
        } else if (orientation === "right") {
            this.x = 496;
        }
        // this.x = this.enemySpawnPosition();
        this.y = 250;
        this.w = 50;
        this.h = 80;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.node.style.position = "absolute";
    
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    
        this.speed = 1.2;
        this.orientation = orientation;
    }

    enemyMovement() {
        if(this.orientation === "left") {
            this.x += this.speed;
            this.node.style.left = `${this.x}px`;
        } else if(this.orientation === "right") {
            this.x -= this.speed;
            this.node.style.left = `${this.x}px`;
        }
    }

}