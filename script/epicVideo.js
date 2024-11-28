class EpicVideo {

    constructor() {
        this.node = document.createElement("video");
        this.node.src = "./Resources/animaciones/epic-final.mp4";

        gameBoxNode.append(this.node);

        this.x = 40;
        this.y = -15;
        this.w = 420;
        this.h = 380;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.node.style.position = "absolute";
    
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.node.volume = 0.2;
        this.node.play();

        this.node.style.filter = "drop-shadow(5px 5px 10px #ff0000)";
    }
}