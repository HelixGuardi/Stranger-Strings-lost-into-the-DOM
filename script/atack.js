class Atack {

    constructor(posX) {
        this.node = document.createElement("img");
        this.node.src = "../Resources/animaciones/fast-slash-no-color-pixel-art copia.webp"

        gameBoxNode.append(this.node);

        this.x = posX + 10;
        this.y = 250;
        this.w = 60;
        this.h = 65;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
        
        this.node.style.position = "absolute";
        
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}