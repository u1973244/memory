class RankingScene extends Phaser.Scene {
    constructor (){
        super('RankingScene');
    }
    preload (){
        this.load.image('boto_normal', '../resources/blue_button00.png');
    }
    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);

        var boto=this.add.image(0, 0, 'boto_normal');
        var text =this.add.text(-15, 0, 'Exit', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var container1 = this.add.container(400, 550, [ boto, text ]);

        boto.setInteractive();
        boto.on('pointerup', () => {
            this.scene.start('MenuScene');
        }, this);

        if(localStorage.ranking){
            var arrayRanking = JSON.parse(localStorage.ranking);
            console.log(arrayRanking[0]);
            if(!Array.isArray(arrayRanking)) arrayRanking = [];
            for (let i=0; i<arrayRanking.length; i++){
                var text =this.add.text(280, i*30+50, (arrayRanking[i].username + ":     Nivell: " + arrayRanking[i].nivell + "   Parelles: " + arrayRanking[i].puntuacio), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000', fontSize: '20px' });
            }
        }
    }
}