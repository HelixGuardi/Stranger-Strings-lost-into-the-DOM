class Thunder {

    constructor(posX) {
        this.node = document.createElement("img");
        this.node.src = "./Resources/animaciones/blue-thunder-effect.png";

        gameBoxNode.append(this.node);

        this.x = posX;
        this.y = 0;
        this.w = 95;
        this.h = 350;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.node.style.position = "absolute";
    
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.node.style.filter = "drop-shadow(0px 0px 10px #ff0000)"
    }
}