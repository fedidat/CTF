class Utils {
    static setRandomBooleanState() {
        return Math.random() < 0.50 ? true : false;
    }

    static getClosestZone(zones, player) {
        var closestZone = null;
        var minDistance = 999999;

        zones.forEach(z => {
            var currDistance = Utils.distanceBetween(z.actualPosX, z.actualPosY, player.actualPosX, player.actualPosY);
            if(!z.isOccupiedByPlayer(player) && currDistance < minDistance) {
                closestZone = z;
                minDistance = currDistance;
            }
        });

        return closestZone
    }

    static getClosestPlayer(players, player) {
        var closestPlayer = null;
        var minDistance = 999999;

        players.forEach(p => {
            var currDistance = Utils.distanceBetween(p.actualPosX, p.actualPosY, player.actualPosX, player.actualPosY);
            if(player !== p && currDistance < minDistance) {
                closestPlayer = p;
                minDistance = currDistance;
            }
        });

        return closestPlayer
    }

    static distanceBetween(aX, aY, bX, bY) {
        return Math.hypot(aX - bX, aY - bY)
    }

    static changeDirectionTowards(player, destX, destY) {
        if(player.actualPosX > destX) {
            player.leftKey.isDown = true;
            player.rightKey.isDown = false;
        } else {
            player.rightKey.isDown = true;
            player.leftKey.isDown = false;
        }

        if(player.actualPosY > destY) {
            player.upKey.isDown = true;
            player.downKey.isDown = false;
        } else {
            player.downKey.isDown = true;
            player.upKey.isDown = false;
        }
    }

    static createArrayPairsFunction() {
        Array.prototype.pairs = function (func) {
            for (var i = 0; i < this.length - 1; i++) {
                for (var j = i; j < this.length - 1; j++) {
                    func(this[i], this[j+1]);
                }
            }
        }
        
    }

    static checkPlayersCollision(player1, player2, game) {
        if(game.game.time.time > game.nextCollideTime && player2.sprite.overlap(player1.sprite)) {
            player2.velX *= -2;
            player1.velX *= -2;
            player2.velY *= -2;
            player1.velY *= -2;

            player2.velX -= player1.velX;
            player2.velY -= player1.velY;
            player1.velX -= player2.velX;
            player1.velY -= player2.velY;

            player2.posX -= 2 * player1.velX;
            player2.posY -= 2 * player1.velY;
            player1.posX -= 2 * player2.velX;
            player1.posY -= 2 * player2.velY;
            game.nextCollideTime = game.game.time.time + game.collideInterval;

        }
    }
}