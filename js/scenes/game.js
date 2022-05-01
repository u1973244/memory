class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.arraycards= [];
		this.username="";
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.num_cards=2;
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

		let l_partida = null;
		if (sessionStorage.idPartida_phaser && localStorage.partides_phaser){
			let arrayPartides = JSON.parse(localStorage.partides_phaser);
			if (sessionStorage.idPartida_phaser < arrayPartides.length)
				l_partida = arrayPartides[sessionStorage.idPartida_phaser];
		}

		if (l_partida){
			this.arraycards= l_partida.arraycards
			this.username = l_partida.username;
			this.cards = l_partida.cards;
			this.firstClick = l_partida.firstClick;
			this.score = l_partida.score;
			this.correct = l_partida.correct;
			this.num_cards=l_partida.num_cards;
			this.difficulty=l_partida.difficulty;
		}

		else{
			var options_data = {
				num_cards:2, dificulty:"normal"
			};
			var load = () =>{
				var json = localStorage.getItem("config_phaser") || '{"num_cards":2,"dificulty":"normal"}';
				options_data = JSON.parse(json);
				if(options_data){
					this.num_cards=options_data.num_cards;
					this.difficulty=options_data.dificulty;
				}
			};
			load();
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
		}
		
		var boto_save=this.add.image(0, 0, 'buto')
		var text_save=this.add.text(-15, 0, 'Save', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
		var container1 = this.add.container(400, 550, [ boto_save, text_save ]);
		boto_save.setInteractive();
		boto_save.on('pointerup', () => {
			console.log("sdads")
			let partida = {
				arraycards: this.arraycards,
				username: this.username,
				cards: this.cards,
				firstClick: this.firstClick,
				score: this.score,
				correct: this.correct,
				num_cards: this.num_cards,
				difficulty: this.difficulty
			}
			let arrayPartides = [];
			if(localStorage.partides_phaser){
				arrayPartides = JSON.parse(localStorage.partides_phaser);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			arrayPartides.push(partida);
			localStorage.partides_phaser = JSON.stringify(arrayPartides);
			this.scene.start('MenuScene');
        }, this);

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
							alert("Game Over");
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
						if (this.correct >= this.num_cards){
							alert("You Win with " + this.score + " points.");
							this.scene.start('MenuScene');
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

