class CTFGame {
    constructor(createCallBack, screenWidth = 1200, screenHeight = 800) {
        this.game = new Phaser.Game(
            screenWidth, 
            screenHeight, 
            Phaser.CANVAS, 
            'phaser-game', 
            { preload: () => this.preload(), 
                create: createCallBack, 
                update: () => this.update(), 
                render: () => this.render() });

        this.width = screenWidth
        this.height = screenHeight

        this.players = []
        this.zones = []

        this.collideInterval = 350

        this.updateIntervalMilli = 30
        this.drawIntervalMilli = 30
        this.updateNextInterval = 0;
        this.drawNextInterval = 0;

        var updatePlayersPointsInterval = setInterval(() => CTFRules.updatePlayersPoints(this), 1000);

        this.nextCollideTime = 0;
    }

    preload() {
        this.game.stage.backgroundColor = '#d0d8d6';
        this.game.load.image('red_player', 'resources/images/red_player.png');
        this.game.load.image('green_player', 'resources/images/green_player.png');
        this.game.time.advancedTiming = true;

        this.aiTypes = {
            easy: AIPlayerEasy,
            medium: AIPlayerMedium,
            hard: AIPlayerHard
        }
    }

    update() {
        if(this.game.time.time > this.updateNextInterval) {
            this.updateNextInterval = this.game.time.time + this.updateIntervalMilli;

            this.players.forEach(function(p) {
                p.update();
            });
            CTFRules.checkAllPlayersCollision(this);
        }
    }

    render() {
        if(this.game.time.time > this.drawNextInterval) {
            this.drawNextInterval = this.game.time.time + this.drawIntervalMilli;

            this.players.forEach(p => {
                p.render();

                this.zones.forEach(z => {
                    CTFRules.renderZoneColor(p, z);
                });
            });
        }
    }

    addHumanPlayer(name, color, upKey, downKey, leftKey, rightKey, posX, posY) {
        var player = new HumanPlayer(this, name, this.colors[color].sprite, upKey, downKey, leftKey, rightKey, posX, posY, this.colors[color].hex)
        this.players.push(player)
    }

    addAIPlayer(name, level, color, posX, posY) {
        var player = new this.aiTypes[level](this, name, this.colors[color].sprite, posX, posY, this.colors[color].hex)
        this.players.push(player)
    }

    addZone(posX, posY, width=50, height=50) {
        var zone = new Zone(this, posX, posY, width, height)
        this.zones.push(zone)
    }
    
}