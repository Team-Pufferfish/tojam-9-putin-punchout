/**
 * Created by myabko on 2014-04-21.
 */

Crafty.scene('winScene',function(attr){
    //Background Layer
    var bg = Crafty.e("Graphics").image("backgroundlayout.png");


    var t = Crafty.e("2D, DOM,Text").
        attr({ x: gameSettings.width/2 - 35, y: 50 })
        .textColor('#AAA', 1.0)
        .textFont({ size: '60px', family:"Arial", weight: 'bold' });

    if (attr.deadPlayer === "Player1"){
        t.text("Harper WINS!");
    } else {
        t.text("Putin WINS!");
    }

    Crafty.e("Delay").delay(function(){
        Crafty.scene("IntroScene");
    },3000,1);


});

Crafty.scene('IntroScene',function(attr){

    var t = Crafty.e("2D, DOM,Text").
        attr({ x: gameSettings.width/2 - 35, y: 50 })
        .textColor('#AAA', 1.0)
        .textFont({ size: '60px', family:"Arial", weight: 'bold' })
        .text("PUTIN PUNCHOUT");
});

Crafty.scene('newTesting',function(){
    //temp controller to show britt stuf
    var gameController = Crafty.e('LRController')
        .assignControls({
            ID: 'gamecontrol',
            LeftControl: '1',
            RightControl: '2'
        });


    //Background Layer
    var bg = Crafty.e("Graphics").image("backgroundlayout.png");

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
    player1.assignAttribute("game","gameover",false);

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

    var splatEffectRight = Crafty.e("Splat");
    splatEffectRight.setUp(-1);
    var splatEffectLeft = Crafty.e("Splat").flip("X");
    splatEffectLeft.setUp(1);





    //Draw UI
    //Crafty.e("Graphics").image("gui_layout_test.png");
    //Crafty.e("RoundTimer").attr({ x: gameSettings.width/2-(41), y: 8 }).text('00:00')
    //    .textColor('#FFFFFF', 1.0)
      //  .textFont({ size: '32px', family:"Arial", weight: 'bold' });

    var roundTime = 15;

    var roundTimer = Crafty.e("RoundTimer")
        .initRoundTimer()
        .resetRoundTimer(roundTime);

    Crafty.bind("RoundEnd",function() {

        roundTimer.resetRoundTimer(roundTime + 1);

        player1.swapRole(1000);
        player2.swapRole(1000);
        SwapBackground(bg);
        //uncomment this at some point for round bells.
        //Crafty.audio.play('roundBell',1,0.7);

    });


    Crafty.bind("gameEnd",function(e){
        player1.input_locked = true;
        player1.assignAttribute("game","gameover",true);
        player2.input_locked = true;



        Crafty.e('Delay')
            .delay(function(){
                player1.destroy();
                player2.destroy();
                Crafty.e('Attributes').clearAttributes();
                Crafty.scene('winScene',e);
            },2000,1);





    });
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
