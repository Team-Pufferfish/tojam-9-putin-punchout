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

    element.bind("testID.ButtonChange",function(change){
        if (change.newControls === element.BOTH_BUTTONS){
            console.log("you pushed both buttons!");
        }
    })
});