/**
 * Created by myabko on 2014-04-22.
 */
Crafty.c('MenuController',{
   init: function(){
       this.requires('LRController');

   },
    NO_MENU_ACTION: -1,
    MENU_SELECTION: 0,
    MENU_LEFT_ACTION: 1,
    MENU_RIGHT_ACTION: 2,

    assignMenuControls: function(attr){

        var component = this;
        var triggeredEventName = attr.ID + '.MenuButtonChange';
        component.attr('queuedEvent',this.NO_MENU_ACTION);


        var lrController = Crafty.e('LRController')
            .assignControls({
                ID: attr.ID,
                LeftControl: attr.LeftControl,
                RightControl: attr.RightControl
            });

        lrController.bind(attr.ID + '.ButtonChange',function(controls){

            if (controls.newButtons === this.BOTH_BUTTONS){
                component.attr('queuedEvent',this.MENU_SELECTION);
            }

            //if both were pushed but now only 1 or 0 buttons are pushed
            else if (controls.oldButtons === this.BOTH_BUTTONS){
                component.attr('queuedEvent',this.MENU_SELECTION);
                component.trigger(triggeredEventName,component.MENU_SELECTION);
            }
            else if (controls.oldButtons === this.NO_BUTTON){
                if (controls.newButtons === this.LEFT_BUTTON){
                    component.attr('queuedEvent',component.MENU_LEFT_ACTION);
                    component.timeout(function(){
                        if (component.queuedEvent === component.MENU_LEFT_ACTION){
                            component.trigger(triggeredEventName,component.MENU_LEFT_ACTION);
                        }
                    },140);

                } else if (controls.newButtons === this.RIGHT_BUTTON){
                    component.attr('queuedEvent',component.MENU_RIGHT_ACTION);
                    component.timeout(function(){
                        if (component.queuedEvent === component.MENU_RIGHT_ACTION){
                            component.trigger(triggeredEventName,component.MENU_RIGHT_ACTION);
                        }
                    },140);
                }
            }

        });

        return component;
    }

});