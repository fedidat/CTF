class AIPlayerEasy extends AIStrategy {
    
    constructor(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor) {
        var updateKeydownsIntervalMilli = 600;
        super(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor, updateKeydownsIntervalMilli)
    }

    strategyInit() {
    }

    strategyUpdate() {

    }

    updateKeydowns() {
        this.updateRandomKeydowns();
    }

    updateRandomKeydowns() {
        this.downKey.isDown = Utils.setRandomBooleanState();
        this.upKey.isDown = Utils.setRandomBooleanState();
        this.leftKey.isDown = Utils.setRandomBooleanState();
        this.rightKey.isDown = Utils.setRandomBooleanState();

        if(this.downKey.isDown && this.upKey.isDown) {
            Utils.setRandomBooleanState() ? (this.downKey.isDown = false) : (this.upKey.isDown = false);
        }

        if(this.leftKey.isDown && this.rightKey.isDown) {
            Utils.setRandomBooleanState() ? (this.rightKey.isDown = false) : (this.leftKey.isDown = false);
        }

        this.avoidWalls(200)
    }

    avoidWalls(safetyFactor) {
        if(this.sprite.y < 0 + this.velY + safetyFactor) {
            this.downKey.isDown = true;
            this.upKey.isDown =false;
        }
        if(this.sprite.y > this.game.height - 45 - this.velY - safetyFactor) {
            this.upKey.isDown =true;
            this.downKey.isDown = false;
        }
        if(this.sprite.x < 0 + this.velX + safetyFactor) {
            this.rightKey.isDown = true;
            this.leftKey.isDown = false;
        }
        if(this.sprite.x > this.game.width - 45 - this.velX - safetyFactor) {
            this.leftKey.isDown = true;
            this.rightKey.isDown = false;
        }
    }
}