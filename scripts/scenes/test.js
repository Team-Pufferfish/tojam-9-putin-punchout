/**
 * Created by myabko on 2014-04-21.
 */

Crafty.scene('newTesting',function(){
    //temp controller to show britt stuf
    var gameController = Crafty.e('LRController')
        .assignControls({
            ID: 'gamecontrol',
            LeftControl: '1',
            RightControl: '2'
        });


    //Background Layer
    Crafty.e("Graphics").image("background_day.png");

    //Initialize Players
    var player1 = Crafty.e("Player").setup({
        ID: "Player1",
        opponentID: "Player2",
        LeftControl: 'A',
        RightControl: 'D',
        BodySpriteName: 'PutinSprite',
        GloveSpriteName: 'PutinFist',
        role: 1 //0 is attack
    });
        player1.setZone("Player1",0);

    var player2 = Crafty.e("Player").setup({
        ID: "Player2",
        opponentID: "Player1",
        LeftControl: 'J',
        RightControl: 'L',
        BodySpriteName: 'HarperSprite',
        GloveSpriteName: 'HarperFist',
        role: 0 //0 is attack
    });

    player2.setZone("Player2",0);

    gameController.bind("gamecontrol.ButtonComplete",function(change) {
        player1.swapRole(1000);
        player2.swapRole(1000);
    });

    Crafty.bind("combo.change",function(e){
        console.log(JSON.stringify(e));
    })


    //Draw UI
    //Crafty.e("Graphics").image("gui_layout_test.png");
    //Crafty.e("RoundTimer").attr({ x: gameSettings.width/2-(41), y: 8 }).text('00:00')
    //    .textColor('#FFFFFF', 1.0)
      //  .textFont({ size: '32px', family:"Arial", weight: 'bold' });

    Crafty.e("StaminaBar").setup({
        playerID: "Player1",
        topX: 50,
        topY: 20,
        colour: "#FF0000"
    });

    Crafty.e("StaminaBar").setup({
        playerID: "Player2",
        topX: gameSettings.width - 250,
        topY: 20,
        colour: "#FFFFFF"
    });

    Crafty.e("ComboBar").setup({
        topX: 20,
        topY: 60,
        colourP2: "#FFFFFF",
        colourP1: "#FF0000"
    });
});
