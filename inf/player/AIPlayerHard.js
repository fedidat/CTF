class AIPlayerHard extends AIStrategy {
    
        constructor(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor) {
            var updateKeydownsIntervalMilli = 500;
            super(game, name, sprite, posX, posY, pointsTextPosX, pointsTextPosY, zoneColor, updateKeydownsIntervalMilli)
        }
        strategyInit() {
        }
    
        updateKeydowns() {

            this.closestZoneOrOponentKeyDowns();
        }
    
        closestZoneOrOponentKeyDowns() {
            var zone = Utils.getClosestZone(this.game.zones, this)
            var player = Utils.getClosestPlayer(this.game.players, this)

            if(!zone) {
                Utils.changeDirectionTowards(this, player.actualPosX, player.actualPosY)
            } else {
                var x = this.game.zones.map(z => {
                    if(z.isOccupiedByPlayer(this)) {
                        return 1
                    }
                    return 0
                })
                var y = x.reduce((x,y) => x + y)

                if(y > this.game.zones.length / 2) {
                    Utils.changeDirectionTowards(this, player.actualPosX, player.actualPosY)
                } else {
                    Utils.changeDirectionTowards(this, zone.actualPosX, zone.actualPosY)
                }
            }
            //console.log("v : " + this.downKey.isDown + ", ^ : " + this.upKey.isDown + ", < : " + this.leftKey.isDown + ", > : " + this.rightKey.isDown)
        }
    }