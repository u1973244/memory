var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game_area',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false
		}
	},
    scene: [  MenuScene, GameScene, OptionsScene, RankingScene, LoadScene, Game2Scene ]
};

var game = new Phaser.Game(config);

