/**
 * Created by myabko on 2014-04-21.
 */

Crafty.scene('newTesting',function(){
    var player1 = Crafty.e("Player").setup({
        ID: "Player1",
        opponentID: "Player2",
        LeftControl: 'A',
        RightControl: 'D',
        BodySpriteName: 'PutinSprite',
        GloveSpriteName: 'PutinFist',
        role: 1 //0 is attack
    });



    var player2 = Crafty.e("Player").setup({
        ID: "Player2",
        opponentID: "Player1",
        LeftControl: 'J',
        RightControl: 'L',
        BodySpriteName: 'HarperSprite',
        GloveSpriteName: 'HarperFist',
        role: 0 //0 is attack
    });




});

Crafty.scene('test', function(){
    var attackerControler = Crafty.e('LRController')
        .assignControls({
            ID: 'attacko',
            LeftControl: 'A',
            RightControl: 'D'
        });

    var defenderControler = Crafty.e('LRController')
        .assignControls({
            ID: 'defendo',
            LeftControl: 'J',
            RightControl: 'L'
        });

    //temp controller to show britt stuf
    var gameController = Crafty.e('LRController')
        .assignControls({
            ID: 'gamecontrol',
            LeftControl: '1',
            RightControl: '2'
        });



    //Background Layer
    Crafty.e("Graphics").image("background_test.png");

    var bodysprite = Crafty.e("Graphics,Zonable, Defense, PutinSprite, Boxer").attr({rotation:0,x: gameSettings.width/2 - 500/2, y:60}).origin("center")
        .animate("IdleAnimate",-1);
    bodysprite.setCallbacks();
    bodysprite.attr("playerID","dID");

    var lefty = Crafty.e('Graphics, Punch, fist1, BoxingGlove').attr({punch_out:0,rotation:0,x:-50, y: gameSettings.height - 450}).flip("X")
        .origin("center");
    lefty.setPunchAnimation(true);
    lefty.setCallbacks();

    var righty = Crafty.e('Graphics, Punch, fist1, BoxingGlove').attr({punch_out:0,rotation:0,x: gameSettings.width-400, y: gameSettings.height - 450})
        .origin("center");
    righty.setPunchAnimation(true);
    righty.setCallbacks();

    //Command Support
    attackerControler.bind("attacko.ButtonComplete",function(change) {
        console.log("attacker  " + JSON.stringify(change));
        if (change.button === attackerControler.LEFT_BUTTON  && lefty.punch_out === 0 && righty.punch_out != 2) {
            if (change.timeHeld <= 500) {
                console.log("jab:" + change.timeHeld );
                lefty.ThrowPunch("pID","dID",lefty.STRAIGHT,lefty.LEFT_PUNCH,0,100);
            }else{
                console.log("hook:" +  change.timeHeld);
                lefty.ThrowPunch("pID","dID",lefty.HOOK,lefty.LEFT_PUNCH,0,100);
            }
        } else if (change.button === attackerControler.RIGHT_BUTTON && righty.punch_out === 0 && lefty.punch_out != 2) {
            if (change.timeHeld <= 500) {
               righty.ThrowPunch("pID","dID",righty.STRAIGHT,righty.RIGHT_PUNCH,0,100);
            }else{
                console.log("hook:" +  change.timeHeld);
                righty.ThrowPunch("pID","dID",righty.HOOK,righty.RIGHT_PUNCH,0,100);
            }
        }
    });

    defenderControler.bind("defendo.ButtonChange",function(change) {
        console.log("defender  " + JSON.stringify(change));
        if (change.newButtons === defenderControler.LEFT_BUTTON) {
            console.log("go left");
            bodysprite.Dodge(1,"left",200);
        } else if (change.newButtons === defenderControler.RIGHT_BUTTON) {
            console.log("go right");
            bodysprite.Dodge(1,"right",200);
        }else if (change.newButtons === defenderControler.BOTH_BUTTONS){
            console.log("go block");
            bodysprite.Block(1, 200)
        }else if (change.newButtons === defenderControler.NO_BUTTON){
            console.log("no block");
            bodysprite.GoNeutral(1,200);
        }else{
            console.log("Is this real life?!");
        }
    });


    gameController.bind("gamecontrol.ButtonComplete",function(change) {
        if (change.button === gameController.LEFT_BUTTON) {
            console.log("Swap players");
            SwapPlayers("left", 1000, bodysprite, lefty, righty, body2sprite, lefty2, righty2);
        }else if (change.button === gameController.RIGHT_BUTTON){
            console.log("Swap players");
            SwapPlayers("right", 1000, bodysprite, lefty, righty, body2sprite, lefty2, righty2);
        }
        });

    //Draw UI
    Crafty.e("Graphics").image("gui_layout_test.png");
    Crafty.e("2D, DOM, Text").attr({ x: gameSettings.width/2-(41), y: 8 }).text('00:00')
        .textColor('#FFFFFF', 1.0)
        .textFont({ size: '32px', family:"Arial", weight: 'bold' });

});