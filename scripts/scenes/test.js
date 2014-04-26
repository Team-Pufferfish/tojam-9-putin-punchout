/**
 * Created by myabko on 2014-04-21.
 */
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

    //Graphics
    //Crafty.sprite(800,600,"vladimir_test002", {putinbody:[0,0]});
    //Crafty.sprite(240,436,"punch_test001.png", {fist1:[0,0]});
    Crafty.sprite(480,450,"./animations/punch_jab.png", {fist1:[0,0]});
    //animations
    //Crafty.sprite(500,540, "putin_testanimation.png", {PunchAnimate: [0,0]});
    Crafty.sprite(500,540, "./animations/putin_fullset.png", {PutinSprite: [0,0]});

    //Background Layer
    Crafty.e("Graphics").image("background_test.png");

    var bodysprite = Crafty.e("Graphics,Zonable, Defense,PutinSprite").attr({rotation:0,x: gameSettings.width/2 - 500/2, y:60}).origin("center")
        .reel('PutinIdleAnimate',1000, [[0, 0], [1, 0], [2, 0], [3, 0],[0,1]])
        .reel('PutinBlockAnimate',400, [[1, 1], [2, 1], [3, 1]])
        .reel('PutinUnBlockAnimate',-400, [[3, 1], [2, 1], [1, 1]])
        .reel('PutinDodge',200, [[0, 2], [1, 2], [2, 2],[3,2]])
        .animate("PutinIdleAnimate",-1);
     //   .reel('PutinBlockAnimation',1000,0, 2)
    bodysprite.setCallbacks();
    bodysprite.setZone("dID",1);

    var lefty = Crafty.e('Graphics, Punch, fist1').attr({punch_out:0,rotation:0,x:-50, y: gameSettings.height - 450}).flip("X")
        .reel('PunchOutAnimate',200, [[0, 0], [1, 0], [2, 0]])
        .reel('PunchInAnimate',200, [[2, 0], [1, 0], [0, 0]])
        .origin("center");
    lefty.setPunchAnimation(true);
    lefty.setCallbacks();

    var righty = Crafty.e('Graphics, Punch, fist1').attr({punch_out:0,rotation:0,x: gameSettings.width-400, y: gameSettings.height - 450})
        .reel('PunchOutAnimate',200, [[0, 0], [1, 0], [2, 0]])
        .reel('PunchInAnimate',200, [[2, 0], [1, 0], [0, 0]])
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

    //Draw UI
    Crafty.e("Graphics").image("gui_layout_test.png");

});