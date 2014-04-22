/**
 * Created by myabko on 2014-04-21.
 */
Crafty.scene('test', function(){
    var element = Crafty.e('LRController')
        .assignControls({
            ID: 'testID',
            LeftControl: 'A',
            RightControl: 'D'
        });

    var lefty = Crafty.e('2D, Canvas, Color, Tween').attr({punch_out:0,rotation:0,x: 100, y: 380, w: 100, h: 300})
        .color('#F00')
        .bind("TweenEnd", function(props){
            console.log("lefty complete" + props.tweenName);
            if (props.tweenName === "leftPunch") {
                this.tween({tweenName:"leftReturn",rotation: 0, x: 100, y: 380}, 200);
            }else if (props.tweenName === "leftReturn"){
                this.punch_out = 0;
            }
        });
    var righty = Crafty.e('2D, Canvas, Color, Tween').attr({punch_out:0,rotation:0,x: 440, y: 380, w: 100, h: 300})
        .color('#F00')
        .bind("TweenEnd", function(props) {
            console.log("righty complete" + props.tweenName);
            if (props.tweenName === "rightPunch") {
                this.tween({tweenName:"rightReturn",rotation: 0, x: 440, y: 380}, 200);
            }else if (props.tweenName === "rightReturn"){
                this.punch_out = 0;
            }
        });

    element.bind("testID.ButtonChange",function(change) {
        if (change.newControls === element.BOTH_BUTTONS) {
            console.log("you pushed both buttons!");
        } else if (change.newControls === element.LEFT_BUTTON && lefty.punch_out != 1) {
            lefty.punch_out = 1;
            lefty.tween({tweenName:"leftPunch",rotation:25,x: 320, y: 50}, 200);
        } else if (change.newControls === element.RIGHT_BUTTON && righty.punch_out != 1) {
            righty.punch_out = 1;
            righty.tween({tweenName:"rightPunch",rotation:-25,x: 220, y: 100}, 200);
        }
    })
});