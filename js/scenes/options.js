




class OptionsScene extends Phaser.Scene {
    constructor (){
        super('OptionsScene');
        this.num_cards=2;
        this.difficulty="normal"
    }
    preload (){	
		this.load.image('boto_dreta', '../resources/blue_sliderRight.png');
        this.load.image('boto_esquerra', '../resources/blue_sliderLeft.png');
        this.load.image('boto_normal', '../resources/blue_button00.png');
        this.load.image('boto_seleccio_buit', '../resources/grey_circle.png');
        this.load.image('boto_seleccio_ple', '../resources/blue_boxTick.png');
	}
    create (){	
        var options_data = {
            num_cards:2, dificulty:"normal"
        };
        var load = () =>{
            var json = localStorage.getItem("config_phaser") || '{"num_cards":2,"dificulty":"normal"}';
            options_data = JSON.parse(json);
            if(options_data){
                console.log("sdaasd")
                this.num_cards=options_data.num_cards;
                this.difficulty=options_data.dificulty;
            }
        };
        var save = () =>{
            options_data.num_cards=this.num_cards;
            options_data.dificulty=this.difficulty;
            localStorage.setItem("config_phaser", JSON.stringify(options_data));
        };
        load();

		this.cameras.main.setBackgroundColor(0xBFFCFF);
        var boto_save=this.add.image(0, 0, 'boto_normal');
        var text_save =this.add.text(-15, 0, 'Save', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var boto_discard=this.add.image(0, 0, 'boto_normal');
        var text_discard =this.add.text(-25, 0, 'Discard', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        var boto_esquerra=this.add.image(-50, 0, 'boto_esquerra');
        var boto_dreta=this.add.image(45, 0, 'boto_dreta');
        var text_titol_num_cards=this.add.text(-80, -70, "Numero de cartes", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000', fontSize: '20px'  });
        var text_num_cards=this.add.text(-5, -10, this.num_cards, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
        var boto_easy
        var boto_normal
        var boto_hard
        if (this.difficulty=="easy"){
            boto_easy=this.add.image(-120, 0, 'boto_seleccio_ple');
            boto_normal=this.add.image(50, 0, 'boto_seleccio_buit');
            boto_hard=this.add.image(200, 0, 'boto_seleccio_buit');
        }
        else if (this.difficulty=="normal") {
            boto_easy=this.add.image(-120, 0, 'boto_seleccio_buit');
            boto_normal=this.add.image(50, 0, 'boto_seleccio_ple');
            boto_hard=this.add.image(200, 0, 'boto_seleccio_buit');
        }
        else{
            boto_easy=this.add.image(-120, 0, 'boto_seleccio_buit');
            boto_normal=this.add.image(50, 0, 'boto_seleccio_buit');
            boto_hard=this.add.image(200, 0, 'boto_seleccio_ple');
        }
        var text_easy=this.add.text(-200, -10, "Easy", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
        var text_normal=this.add.text(-50, -10, "Normal", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
        var text_hard=this.add.text(120, -10, "Hard", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
        var titol_dificultat=this.add.text(-40, -70, "Difficulty", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000', fontSize: '20px'  });
        
        var container1 = this.add.container(400, 400, [ boto_save, text_save ]);
        var container2 = this.add.container(400, 480, [ boto_discard, text_discard ]);
        var container3 = this.add.container(400, 280, [ boto_esquerra, boto_dreta, text_titol_num_cards, text_num_cards, ]);
        var container4 = this.add.container(400, 140, [ boto_easy, boto_normal, boto_hard, text_easy, text_normal, text_hard, titol_dificultat ]);

        boto_dreta.setInteractive();
        boto_dreta.on('pointerup', () => {
            if (this.num_cards<6){
                this.num_cards+=1;
                var nou_text=this.add.text(-5, -10, this.num_cards, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
                container3.removeAt(3,true);
                container3.add(nou_text);
            }
        }, this);
        boto_esquerra.setInteractive();
        boto_esquerra.on('pointerup', () => {
            if (this.num_cards>2){
                this.num_cards=this.num_cards-1;
                var nou_text=this.add.text(-5, -10, this.num_cards, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
                container3.removeAt(3,true);
                container3.add(nou_text);
            }
        }, this);

        const normal_clicat = () => {
            if(this.difficulty!="normal"){
                if (this.difficulty=="easy"){
                    container4.remove(boto_easy,true);
                    var boto_easy=this.add.image(-120, 0, 'boto_seleccio_buit');
                    container4.add(boto_easy);
                    boto_easy.setInteractive();
                    boto_easy.on('pointerup', easy_clicat, this);
                }
                else{ //hard
                    container4.remove(boto_hard,true);
                    var boto_hard=this.add.image(200, 0, 'boto_seleccio_buit');
                    container4.add(boto_hard);
                    boto_hard.setInteractive();
                    boto_hard.on('pointerup', hard_clicat, this);
                }
                this.difficulty="normal";
                container4.remove(boto_normal,true);
                var boto_normal=this.add.image(50, 0, 'boto_seleccio_ple');
                container4.add(boto_normal);
                boto_normal.setInteractive();
                boto_normal.on('pointerup', normal_clicat, this);
            }
        }

        const easy_clicat = () =>{
            if(this.difficulty!="easy"){
                if (this.difficulty=="normal"){
                    container4.remove(boto_normal,true);
                    var boto_normal=this.add.image(50, 0, 'boto_seleccio_buit');
                    container4.add(boto_normal);
                    boto_normal.setInteractive();
                    boto_normal.on('pointerup', normal_clicat, this);
                }
                else{ //hard
                    container4.remove(boto_hard,true);
                    var boto_hard=this.add.image(200, 0, 'boto_seleccio_buit');
                    container4.add(boto_hard);
                    boto_hard.setInteractive();
                    boto_hard.on('pointerup', hard_clicat, this);
                }
                this.difficulty="easy";
                container4.remove(boto_easy,true);
                var boto_easy=this.add.image(-120, 0, 'boto_seleccio_ple');
                container4.add(boto_easy);
                boto_easy.setInteractive();
                boto_easy.on('pointerup', easy_clicat, this);
            }
        }

        const hard_clicat = () =>{
            if(this.difficulty!="hard"){
                if (this.difficulty=="normal"){
                    container4.remove(boto_normal,true);
                    var boto_normal=this.add.image(50, 0, 'boto_seleccio_buit');
                    container4.add(boto_normal);
                    boto_normal.setInteractive();
                    boto_normal.on('pointerup', normal_clicat, this);
                }
                else{ //easy
                    container4.remove(boto_easy,true);
                    var boto_easy=this.add.image(-120, 0, 'boto_seleccio_buit');
                    container4.add(boto_easy);
                    boto_easy.setInteractive();
                    boto_easy.on('pointerup', easy_clicat, this);
                }
                this.difficulty="hard";
                container4.remove(boto_hard,true);
                var boto_hard=this.add.image(200, 0, 'boto_seleccio_ple');
                container4.add(boto_hard);
                boto_hard.setInteractive();
                boto_hard.on('pointerup', hard_clicat, this);
            }
        }

        boto_easy.setInteractive();
        boto_easy.on('pointerup', easy_clicat, this);

        boto_normal.setInteractive();
        boto_normal.on('pointerup', normal_clicat, this);

        boto_hard.setInteractive();
        boto_hard.on('pointerup', hard_clicat, this);

        boto_save.setInteractive();
        boto_save.on('pointerup', () => {
            save()
            this.scene.start('MenuScene');
        }, this);

        boto_discard.setInteractive();
        boto_discard.on('pointerup', () => {
            this.num_cards = options_data.cards;
            console.log(options_data.num_cards)
            var nou_text=this.add.text(-5, -10, this.num_cards, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#000000' });
            container3.removeAt(3,true);
            container3.add(nou_text);
            if (options_data.dificulty=="hard") hard_clicat();
            else if (options_data.dificulty=="normal") normal_clicat();
            else easy_clicat();
        }, this);
	}
	
	update (){
        
    }
}