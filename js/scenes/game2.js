class Game2Scene extends Phaser.Scene {
    constructor (){
        super('Game2Scene');
		this.arraycards= [];
		this.username="";
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.num_cards=2;
        this.nivell=1;
        this.puntuacio=0;
		this.difficulty="normal";
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
		this.load.image('buto', '../resources/blue_button00.png');
	}
	
    create (){	

        this.nivell=sessionStorage.nivell;
        this.puntuacio=sessionStorage.puntuacio;
        this.username=sessionStorage.username_phaser;
        if(this.nivell<6) this.num_cards=this.nivell;
        else this.num_cards=6;
        if (this.nivell>4 && this.nivell<=6) this.difficulty="normal"
        else if(this.nivell>6) this.difficulty="hard"
        else this.difficulty="easy"
		this.score = 100;
		this.correct = 0;
		this.cards = null;
		this.firstClick = null;

		this.arraycards=['cb', 'co', 'sb', 'so', 'tb', 'to']
		this.arraycards.sort(function(){return Math.random() - 0.5});
		this.arraycards = this.arraycards.slice(0, this.num_cards);
		this.arraycards = this.arraycards.concat(this.arraycards);
		this.arraycards.sort(function(){return Math.random() - 0.5});
		this.cameras.main.setBackgroundColor(0xBFFCFF);
			
		for (let i=0; i<this.num_cards*2; i++){
            if(i<6) this.add.image(150+i*100, 200, this.arraycards[i]);
            else this.add.image(150+(i-6)*100, 400, this.arraycards[i]);
		}
		
		this.cards = this.physics.add.staticGroup();
			
		for (let i=0; i<this.num_cards*2; i++){
			if(i<6) this.cards.create(150+i*100, 200, 'back');
            else this.cards.create(150+(i-6)*100, 400, 'back');
		}

		

		var girar_cartes = (array_imatges) => {
			console.log("sisissi")
			for (let i=0; i<this.num_cards*2; i++){
				array_imatges[i].destroy()
			}
		}

		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = this.arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
                        if (this.difficulty=="easy") this.score -= 10;
                        else if (this.difficulty=="normal") this.score -= 20;
						else this.score -= 30;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);

						if (this.score <= 0){
							alert("Game Over, you made " + this.puntuacio + " Pairs");
                            if(localStorage.ranking){
                                var arrayRanking = JSON.parse(localStorage.ranking);
                                if(!Array.isArray(arrayRanking)) arrayRanking = [];
                                var jugnivell=this.nivell;
                                var jugpuntuacio=this.puntuacio;
                                var jugnom=this.username;
                                var Jugador = {
                                    nivell:jugnivell,
                                    puntuacio:jugpuntuacio,
                                    username:jugnom
                                };
                                arrayRanking.push(Jugador);
                                localStorage.ranking = JSON.stringify(arrayRanking);

                            }
                            else {
                                var arrayRanking = [];
                                var jugnivell=this.nivell;
                                var jugpuntuacio=this.puntuacio;
                                var jugnom=this.username;
                                var Jugador = {
                                    nivell:jugnivell,
                                    puntuacio:jugpuntuacio,
                                    username:jugnom
                                };
                                arrayRanking.push(Jugador);
                                localStorage.ranking = JSON.stringify(arrayRanking);
                            }
                            
						    this.scene.start('MenuScene');
						}
						else{
							var array_imatges=[]
							for (let i=0; i<this.num_cards*2; i++){
                                if(i<6) var imatge=this.add.image(150+i*100, 200, this.arraycards[i]);
                                else var imatge=this.add.image(150+(i-6)*100, 400, this.arraycards[i]);
								array_imatges.push(imatge);
							}
							const myTimeout = setTimeout(girar_cartes(array_imatges), 1000); 
						}
					}
					else{
						this.correct++;
                        this.puntuacio++;
						if (this.correct >= this.num_cards){
                            this.nivell++;
                            console.log(this.nivell);
							alert("You won this level! Next level: " + this.nivell + " You made:" + this.puntuacio + " Pairs");
                            sessionStorage.nivell=this.nivell;
                            sessionStorage.puntuacio=this.puntuacio;
							this.scene.start('Game2Scene');
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

