class RankingScene extends Phaser.Scene {
    constructor (){
        super('RankingScene');
    }
    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);
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