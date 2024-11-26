class Eddie {

    constructor() {
        this.node = document.createElement("img");
        this.node.src = "../Resources/personajes/epic-guitar-moment-eddie-stranger-things-canal-alpha.png";

        gameBoxNode.append(this.node);

        this.x = 170;
        this.y = 165;
        this.w = 150;
        this.h = 150;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.node.style.position = "absolute";
    
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    
        this.speed = 12;

    }
}