const init_acc = 0.5;
const max_vel = 7.5;
const min_vel = 0.2;
const friction = 0.2;

class PlayerStrategy {
    constructor(game, name, sprite, upKey, downKey, leftKey, rightKey, posX, posY, zoneColor) {
        this.game = game;        

        this.name = name;
        this.sprite = sprite;
        this.init_acc = init_acc;

        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;

        this.sprite.x = posX;
        this.sprite.y = posY;

        this.pointsText = game.game.add.text(-5000, 5000, "", { fill: '#ffffff' });

        this.zoneColor = zoneColor;

        this.points = 0;

        this.velX = 0.0;
        this.velY = 0.0;

        this.calcActualPos();
    }

    updatePointsText() {
        this.pointsText.setText(this.name + ' : ' + this.points)
    }


    update() {
        this.isUpDownPressed = false;
        this.isRightLeftPressed = false;

        if (this.upKey.isDown)
        {
            this.isUpDownPressed = true;
            if(this.sprite.y > 0 + this.velY) {
                this.velY -= init_acc;
            }
        }
        if (this.downKey.isDown)
        {
            this.isUpDownPressed = true;
            if(this.sprite.y < this.game.height - 45 - this.velY) {
                this.velY += init_acc;
            }
        }
        if (this.leftKey.isDown)
        {
            this.isRightLeftPressed = true;
            if(this.sprite.x > 0 + this.velX) {
                this.velX -= init_acc;
            }
        }
        if (this.rightKey.isDown)
        {
            this.isRightLeftPressed = true;
                this.velX += init_acc;
            if(this.sprite.x < this.game.width - 45 - this.velX) {
                this.velX += init_acc;
            }
        }

        this.applyFriction();
        this.applyMinVelocityStop();
        this.applyMaxVelocityStop();
        //this.adjustAngleSpeed();
        this.updatePosition();

        this.updatePointsText();

        this.calcActualPos();
    }

    adjustAngleSpeed() {
        if(Math.pow(this.velX,2) + Math.pow(this.velY,2) > Math.pow(max_vel,2)) {
            if(Math.pow(this.velX,2) > Math.pow(this.velY,2)) {
                if(this.velX > 0) {
                    this.velX -= init_acc * 1.5
                }
                if(this.velX < 0) {
                    this.velX += init_acc * 1.5
                }
            }
            if(Math.pow(this.velY,2) > Math.pow(this.velX,2)) {
                if(this.velY > 0) {
                    this.velY -= init_acc * 2
                }
                if(this.velY < 0) {
                    this.velY += init_acc * 2
                }
            }
            if(Math.pow(this.velY,2) == Math.pow(this.velX,2)) {
                this.velY -= init_acc;
                this.velX -= init_acc;
            }
        }
    }

    applyFriction() {
        if(this.isRightLeftPressed == false) {
            if(this.velX > min_vel) {
                this.velX -= friction
            }
            if(this.velX < -min_vel) {
                this.velX += friction
            }
        }
        if(this.isUpDownPressed == false) {
            if(this.velY > min_vel) {
                this.velY -= friction
            }
            if(this.velY < -min_vel) {
                this.velY += friction
            }
        }
    }

    applyMinVelocityStop() {
        if(this.velX > -min_vel && this.velX < min_vel) {
            this.velX = 0;
        }
        if(this.velY > -min_vel && this.velY < min_vel) {
            this.velY = 0;
        }
    }

    applyMaxVelocityStop() {
        var actualMaxVel = max_vel;
        if(this.isRightLeftPressed && this.isUpDownPressed) {
            actualMaxVel = 1 * max_vel;
        }
        if(this.velX > actualMaxVel) {
            this.velX = actualMaxVel;
        }
        if(this.velY > actualMaxVel) {
            this.velY = actualMaxVel
        }
        if(this.velX < -actualMaxVel) {
            this.velX = -actualMaxVel;
        }
        if(this.velY < -actualMaxVel) {
            this.velY = -actualMaxVel
        }
    }

    updatePosition() {
        this.sprite.x += this.velX;
        this.sprite.y += this.velY;

        this.applyBoundaries();
    }

    applyBoundaries() {
        if(this.sprite.y < 0 + this.velY) {
            this.sprite.y = 0 + this.velY;
        }
        if(this.sprite.y > this.game.height - 45 - this.velY) {
            this.sprite.y = this.game.height - 45 - this.velY
        }
        if(this.sprite.x < 0 + this.velX) {
            this.sprite.x = 0 + this.velX;
        }
        if(this.sprite.x > this.game.width - 45 - this.velX) {
            this.sprite.x = this.game.width - 45 - this.velX;
        }

    }

    calcActualPos() {
        this.actualPosX = this.sprite.x + this.sprite.width / 2;
        this.actualPosY = this.sprite.y + this.sprite.height / 2;
    }

    render() {

    }
}