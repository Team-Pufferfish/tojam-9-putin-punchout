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

    var bodysprite = Crafty.e("2D, Canvas, Image, Tween, Defense").attr({rotation:0,x: 0, y: 0, width: 300, height: 500}).origin("center").image("vladimir_test002");
    bodysprite.setCallbacks();

    var lefty = Crafty.e('2D, Canvas, Color,Image, Tween').attr({punch_out:0,rotation:0,x:gameSettings.width/2-350, y: gameSettings.height - 150, w: 150, h: 300}).image("punch_test001.png")
        .bind("TweenEnd", function(props){
            console.log("lefty complete" + props.tweenName);
            if (props.tweenName === "leftPunch") {
                this.tween({tweenName:"leftReturn",rotation: 0, x: gameSettings.width/2-350, y: gameSettings.height - 150}, 200);
            }else if (props.tweenName === "leftReturn"){
                this.punch_out = 0;
            }
        }).origin("center");
    var righty = Crafty.e('2D, Canvas, Color, Image, Tween').attr({punch_out:0,rotation:0,x: gameSettings.width/2+100, y: gameSettings.height - 150, w: 150, h: 300}).image("punch_test001.png")
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
            lefty.tween({tweenName:"leftPunch",rotation:25,x: gameSettings.width/2-50, y: 50}, 200);
        } else if (change.button === attackerControler.RIGHT_BUTTON && righty.punch_out != 1) {
            righty.punch_out = 1;
            righty.tween({tweenName:"rightPunch",rotation:-25,x: gameSettings.width/2-50, y: 50}, 200);
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

});