(() => {

    Utils.createArrayPairsFunction();

    var ctf = new CTFGame(create)

    function create() {
        createZones()
        createColors()
        createPlayers()
    }
    
    function createColors() {
        ctf.colors = {
            red: {
                sprite: ctf.game.add.sprite(-9000, -9000, 'red_player'), 
                hex: 0xd32828},
            green: {
                sprite: ctf.game.add.sprite(-9000, -9000, 'green_player'), 
                hex: 0x47c15c}
        }
        for(var c in ctf.colors) {
            ctf.colors[c].sprite.scale.setTo(0.25,0.25);
        }
    }

    function createZones() {
        ctf.addZone(100, 400)
        ctf.addZone(780, 20)
        ctf.addZone(50, 50)
        ctf.addZone(900, 600)
        ctf.addZone(450, 450)
        ctf.addZone(300,640)
        ctf.addZone(550, 10)
        ctf.addZone(850, 400)
        ctf.addZone(200, 300)
        ctf.addZone(600, 300)
    }

    function createPlayers() {

        // player1 input
        var cursors = ctf.game.input.keyboard.createCursorKeys();

        // player2 input
        WKey = ctf.game.input.keyboard.addKey(Phaser.Keyboard.W);
        SKey = ctf.game.input.keyboard.addKey(Phaser.Keyboard.S);
        AKey = ctf.game.input.keyboard.addKey(Phaser.Keyboard.A);
        DKey = ctf.game.input.keyboard.addKey(Phaser.Keyboard.D);

        var text = ctf.game.add.text(400, 20, 'Capture The Flag!', { fill: '#ffffff' });

        ctf.addHumanPlayer("ofek", "red", WKey, SKey, AKey, DKey, 950, 50)
        ctf.addAIPlayer("benny", "hard", "green", 20, 525)
    }
})();