class Zone {
    constructor(game, posX, posY, width, height, initColor = 0xADADAD) {
        this.rect = game.game.add.graphics(0, 0);
    
        this.rect.lineStyle(0);
        this.color = initColor;
        this.rect.drawRect(posX, posY, width, height);

        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

        this.rect.beginFill(this.color, 1);
        this.rect.drawRect(this.posX, this.posY, this.width, this.height);

        this.isOccupied = false;

        this.calcActualPos();
    }

    update() {

    }

    drawRect() {
        this.rect.beginFill(this.color, 1);
        this.rect.drawRect(this.posX, this.posY, this.width, this.height);
    }

    render() {
    }

    isOccupiedByPlayer(player) { 
        return this.color == player.zoneColor
    }

    calcActualPos() {
        this.actualPosX = this.posX + this.width / 2;
        this.actualPosY = this.posY + this.height / 2;
    }
}