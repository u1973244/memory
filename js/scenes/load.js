class LoadScene extends Phaser.Scene {
    constructor (){
        super('LoadScene');
        this.saves=[]
    }
    preload (){	
		this.load.image('boto_normal', '../resources/blue_button00.png');
	}
    create (){
        let arrayPartides = [];
		if(localStorage.partides_phaser){
			arrayPartides = JSON.parse(localStorage.partides_phaser);
			if(!Array.isArray(arrayPartides)) arrayPartides = [];
		}
		this.saves = arrayPartides;

        this.saves.forEach((partida, index) => {
            var boto=this.add.image(0, 0, 'boto_normal');
            var text=this.add.text(-20, 0, partida.username, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            var container = this.add.container(400, 100+index*60, [ boto, text ]);
            boto.setInteractive();
            boto.on('pointerup', (index) => {
                sessionStorage.idPartida_phaser = index;
                this.scene.start('GameScene');
            }, this);
        });
    }
}