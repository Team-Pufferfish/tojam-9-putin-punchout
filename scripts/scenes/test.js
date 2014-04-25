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
    Crafty.sprite(800,600,"vladimir_test002", {putinbody:[0,0]});
    Crafty.sprite(240,436,"punch_test001.png", {fist1:[0,0]});
    //animations
    Crafty.sprite(500,540, "putin_testanimation.png", {PunchAnimate: [0,0]});

    Crafty.e("Graphics").image("background_test.png");

    var bodysprite = Crafty.e("Graphics,Zonable, Defense,SpriteAnimation,PunchAnimate").attr({rotation:0,x: gameSettings.width/2 - 500/2, y:60})
        .reel('PunchAnimating',18, 0, 0, 2);
    bodysprite.setCallbacks();

    var lefty = Crafty.e('Graphics, fist1').attr({punch_out:0,rotation:0,x:gameSettings.width/2-350, y: gameSettings.height - 150}).flip("X")
        .bind("TweenEnd", function(props){
            console.log("lefty complete" + props.tweenName);
            if (props.tweenName === "leftPunch") {
                this.tween({tweenName:"leftReturn",rotation: 0, x: gameSettings.width/2-350, y: gameSettings.height - 150}, 200);
            }else if (props.tweenName === "leftReturn"){
                this.punch_out = 0;
            }
        }).origin("center");
    var righty = Crafty.e('Graphics, fist1').attr({punch_out:0,rotation:0,x: gameSettings.width/2+100, y: gameSettings.height - 150})
        .bind("TweenEnd", function(props) {
            console.log("righty complete" + props.tweenName);
            if (props.tweenName === "rightPunch") {
                this.tween({tweenName:"rightReturn",rotation: 0, x: gameSettings.width/2+100, y: gameSettings.height - 150}, 200);
            }else if (props.tweenName === "rightReturn"){
                this.punch_out = 0;
            }
        }).origin("center");

    attackerControler.bind("attacko.ButtonComplete",function(change) {
        if (change.button === attackerControler.LEFT_BUTTON && lefty.punch_out != 1) {
            lefty.punch_out = 1;
            if (change.timeHeld <= 500) {
                console.log("jab:" + change.timeHeld );
                lefty.tween({tweenName: "leftPunch", rotation: 25, x: gameSettings.width / 2 - 50, y: 50}, 200);
            }else{
                console.log("hook:" +  change.timeHeld);
                lefty.tween({tweenName: "leftPunch", rotation: 45, x: gameSettings.width / 2 + 50, y: 50}, 200);
            }
        } else if (change.button === attackerControler.RIGHT_BUTTON && righty.punch_out != 1) {
            righty.punch_out = 1;
            if (change.timeHeld <= 500) {
                righty.tween({tweenName:"rightPunch",rotation:-25,x: gameSettings.width/2-150, y: 50}, 200);
            }else{
                console.log("hook:" +  change.timeHeld);
                righty.tween({tweenName: "rightPunch", rotation: -45, x: gameSettings.width / 2 - 250, y: 50}, 200);
            }
        }
    });

    defenderControler.bind("defendo.ButtonChange",function(change) {
        if (change.newButtons === defenderControler.LEFT_BUTTON) {
            console.log("go left");
            bodysprite.Dodge(1,"left",200);
            //bodysprite.tween({tweenName:"dodgeLeft",rotation:-10,x: gameSettings.width/8, y: 100}, 200);
        } else if (change.newButtons === defenderControler.RIGHT_BUTTON) {
            console.log("go right");
            bodysprite.Dodge(1,"right",200);
           // bodysprite.tween({tweenName:"rightPunch",rotation:10,x: gameSettings.width - gameSettings.width/8 -300, y: 100}, 200);
        }else if (change.newButtons === defenderControler.BOTH_BUTTONS){
            console.log("go block");
            bodysprite.Block(1, 200)
            //bodysprite.tween({tweenName:"midDodge", rotation:0,x: gameSettings.width/2-150, y: 100});
        }else if (change.newButtons === defenderControler.NO_BUTTON){
            console.log("no block");
            bodysprite.GoNeutral(1,200);
        }else{
            console.log("Is this real life?!");
        }
    });

    Crafty.e("Graphics").image("gui_layout_test.png");

});