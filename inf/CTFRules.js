class CTFRules {
    static checkAllPlayersCollision(game) {
        game.players.pairs((p1, p2) => {
            Utils.checkPlayersCollision(p1, p2, game)
        })
    }
    
    static updatePlayersPoints(game) {
        game.zones.forEach(function(z) {
            game.players.forEach(function(p) {
                if(p.zoneColor == z.color) {
                    p.points++;
                }
            });
        });
    }

    static renderZoneColor(player, zone) {
        if(zone.isOccupied == false && player.zoneColor != zone.color && player.sprite.overlap(zone.rect)) {
            zone.color = player.zoneColor;
            zone.isOccupied = true;
            zone.drawRect();
        }
        if(player.zoneColor == zone.color && !player.sprite.overlap(zone.rect)) {
            zone.isOccupied = false;
        }
    }
}