class AIStrategy extends PlayerStrategy {

    constructor(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor, updateKeydownsIntervalMilli = 5000) {
        super(game, name, sprite, new AIKey(), new AIKey(), new AIKey(), new AIKey(), posX, posY, pointsTextPosX, pointsTextPosY, zoneColor)
        this.strategyInit();
        this.updateKeyDownsInterval = setInterval(() => this.updateKeydowns(), updateKeydownsIntervalMilli);
    }

    strategyUpdate() {

    }

    strategyInit() {
    }

    updateKeydowns () {
    }

    update() {
        this.strategyUpdate();
        super.update();
    }

}