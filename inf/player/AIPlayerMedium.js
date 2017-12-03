class AIPlayerMedium extends AIStrategy {

    constructor(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor) {
        var updateKeydownsIntervalMilli = 250;
        super(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor, updateKeydownsIntervalMilli)
    }
    strategyInit() {
    }

    updateKeydowns() {
        this.closestZoneKeyDowns();
    }

    closestZoneKeyDowns() {
        var zone = Utils.getClosestZone(this.game.zones, this)
        if(!zone) {
            return
        }

        Utils.changeDirectionTowards(this, zone.actualPosX, zone.actualPosY)

        //console.log("v : " + this.downKey.isDown + ", ^ : " + this.upKey.isDown + ", < : " + this.leftKey.isDown + ", > : " + this.rightKey.isDown)
    }

    strategyUpdate() {
    }


}