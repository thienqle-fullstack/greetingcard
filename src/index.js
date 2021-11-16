import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import mainImg from './assets/Christmas.png';
import flarePNG from './assets/flares.png';
import flareJSON from './assets/flares.json';
import bgMusic from './assets/A_Happy_Christmas_David_Fesliyan.mp3';

const imgWidth = 3730;
const imgHeight = 3487;
const WIDTH = imgWidth/4;
const HEIGHT = imgHeight/4;


class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('mainImg', mainImg);
        this.load.atlas('flares', flarePNG, flareJSON);
        this.load.audio('music',bgMusic)
        this.music = null;
    }
      
    create ()
    {
        // this.cameras.main.backgroundColor.setTo(211,211,211)
        this.cameras.main.backgroundColor.setTo(200,200,200)
        const logo = this.add.image(WIDTH/2, HEIGHT/2, 'mainImg');
        logo.setScale(0.25);
     
        let particles = this.add.particles('flares');
        this.music = this.sound.add(`music`,{volume: 0.5});
        this.music.play();

        // particles.createEmitter({
        //     frame: { frames: [ 'red', 'blue', 'green', 'yellow' ], cycle: true },
        //     x: 64,
        //     y: { start: 500, end: 100, steps: 16 },
        //     lifespan: 4000,
        //     accelerationX: 200,
        //     scale: 0.4,
        //     frequency: 100
        // });

        // let contuour = new Phaser.Curves.Spline([ 50, 300, 164, 246, 274, 342, 412, 257, 522, 341, 664, 264 ]);
        let shapeRec = new Phaser.Geom.Rectangle(-380,-280,WIDTH-60,HEIGHT-70);
        console.log(shapeRec)
        
        // particles.createEmitter({
        //     frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
        //     x: 400,
        //     y: 300,
        //     speed: 0,
        //     scale: { start: 0.5, end: 0 },
        //     blendMode: 'ADD',
        //     emitZone: { type: 'edge', source: shapeRec, quantity: 50, yoyo: false }
        // });
    

        particles.createEmitter({
            frame: [ 'red', 'green', 'blue' ],
            x: 400, y: 300,
            speed: 0,
            lifespan: 2000,
            delay: 2000,
            quantity: 48,
            frequency: 2000,
            delay: 500,
            scale: { start: 0.4, end: 0.1 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: shapeRec, quantity: 48 }
        });

       let cirButton = this.add.circle(820+25, 750, 30, 0xffffff).setInteractive();
       let tri1 = this.add.triangle(820+25+5, 750+2, 0, 0, 30, 10, 0, 30, 0xcccff);
       

       /* Button events */
       cirButton.on('pointerdown', this.onclick,this); // Start game on click.

        // let rec1 = this.add.rectangle(200, 200,148, 148 ,0x6666ff);
    }


    onclick(){
        console.log(this.music)
        this.music.stop();
        this.music.play();
    } 
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: WIDTH,
    height: HEIGHT,
    scene: MyGame
};

const game = new Phaser.Game(config);
