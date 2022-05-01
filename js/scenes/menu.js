class MenuScene extends Phaser.Scene {
    constructor (){
        super('MenuScene');
    }

    preload (){	
		this.load.image('boto_normal', '../resources/blue_button00.png');
	}
    create (){
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        var boto_start=this.add.image(0, 0, 'boto_normal');
        var text_start =this.add.text(-20, 0, 'Start', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var boto_opcions=this.add.image(0, 0, 'boto_normal');
        var text_opcions =this.add.text(-30, 0, 'Options', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var boto_puntuacions=this.add.image(0, 0, 'boto_normal');
        var text_puntuacions =this.add.text(-30, 0, 'Ranking', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var boto_carregar=this.add.image(0, 0, 'boto_normal');
        var text_carregar =this.add.text(-17, 0, 'Load', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var boto_sortir=this.add.image(0, 0, 'boto_normal');
        var text_sortir =this.add.text(-17, 0, 'Exit', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var container1 = this.add.container(400, 140, [ boto_start, text_start ]);
        var container2 = this.add.container(400, 220, [ boto_opcions, text_opcions ]);
        var container3 = this.add.container(400, 300, [ boto_puntuacions, text_puntuacions ]);
        var container4 = this.add.container(400, 380, [ boto_carregar, text_carregar ]);
        var container4 = this.add.container(400, 460, [ boto_sortir, text_sortir ]);

        boto_start.setInteractive();
        boto_start.on('pointerup', () => {
            this.scene.start('GameScene');
        }, this);

        boto_opcions.setInteractive();
        boto_opcions.on('pointerup', () => {
            this.scene.start('OptionsScene');
        }, this);

        boto_puntuacions.setInteractive();
        boto_puntuacions.on('pointerup', () => {
            this.scene.start('RankingScene');
        }, this);

        boto_carregar.setInteractive();
        boto_carregar.on('pointerup', () => {
            this.scene.start('LoadScene');
        }, this);

        boto_sortir.setInteractive();
        boto_sortir.on('pointerup', () => {
            loadpage("../");
        }, this);
    }
}