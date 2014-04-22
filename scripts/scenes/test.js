/**
 * Created by myabko on 2014-04-21.
 */
Crafty.scene('test', function(){
    var element = Crafty.e('MenuController')
        .assignMenuControls({
            ID: 'testID',
            LeftControl: 'A',
            RightControl: 'D'
        });


    element.bind("testID.MenuButtonChange",function(change){
        if (change === this.MENU_SELECTION){
            console.log('you selected this option');
        }
        if (change === this.MENU_LEFT_ACTION){
            console.log('you moved left');
        }
        if (change === this.MENU_RIGHT_ACTION){
            console.log('you moved right');
        }
    })
});