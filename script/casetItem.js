class CasetItem {

    constructor() {
        this.node = document.createElement("img");
        this.node.src = "./Resources/img/casset-pixel-art-obj-removebg.png";

        gameBoxNode.append(this.node);

        const max = 400;
        const min = 0;
        let randomPosX = Math.floor(Math.random() * (max - min +1)) + min;

        this.x = randomPosX;
        this.y = 125;
        this.w = 45;
        this.h = 40;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;
    
        this.node.style.position = "absolute";
    
        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.node.style.filter = "drop-shadow(0px 0px 5px #ff0000)"
    }
}