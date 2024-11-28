class Eddie {

    constructor() {
        this.node = document.createElement("img");
        this.node.src = "./Resources/personajes/epic-guitar-moment-eddie-stranger-things-canal-alpha.png";

        gameBoxNode.append(this.node);

        this.x = 210;
        this.y = 240;
        this.w = 70;
        this.h = 70;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.node.style.position = "absolute";
    
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;
    }
}