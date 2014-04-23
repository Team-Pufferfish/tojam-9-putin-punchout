Crafty.c('LRController',{
    init: function(){
        this.requires('Keyboard');

    },

    NO_BUTTON: 0,
    LEFT_BUTTON: 1,
    RIGHT_BUTTON: 2,
    BOTH_BUTTONS: 3,

    assignControls: function(attr){

        var component = this;

        var Controls = function(){
            this.left = false;
            this.right = false;
            this.leftTimer = null;
            this.rightTimer = null;
        };

        Controls.prototype.convertToButton = function(){
            if (this.left){
                if (this.right){
                    return component.BOTH_BUTTONS;
                }
                return component.LEFT_BUTTON;
            }
            else {
                if (this.right){
                    return component.RIGHT_BUTTON;
                }
                return component.NO_BUTTON;
            }
        };

        component.attr("controls",new Controls());


        assignToButtons();



        function checkForEventsToTrigger(new_controls){

            component.trigger(attr.ID + ".ButtonChange",{
                oldButtons: component.controls.convertToButton(),
                newButtons: new_controls.convertToButton()
            });

            console.log("old: "+component.controls.convertToButton() + " new:"+ new_controls.convertToButton())

        }

        function assignToButtons(){

            component.bind('KeyDown',function(){

                var old_controls = component.controls;
                var new_controls = new Controls();
                new_controls.left = old_controls.left;
                new_controls.right = old_controls.right;
                new_controls.leftTimer = old_controls.leftTimer;
                new_controls.rightTimer = old_controls.rightTimer;

                if (component.isDown(attr.LeftControl)){
                    new_controls.left = true;
                    if (!old_controls.leftTimer) {
                        component.trigger(attr.ID + ".ButtonStart",{
                            button: component.LEFT_BUTTON
                        });
                        new_controls.leftTimer = new Date();
                    }
                }
                if (component.isDown(attr.RightControl)){
                    new_controls.right = true;
                    if (!old_controls.rightTimer) {
                        new_controls.rightTimer = new Date();
                        component.trigger(attr.ID + ".ButtonStart",{
                            button: component.LEFT_BUTTON
                        });
                    }
                }
                checkForEventsToTrigger(new_controls);
                component.attr("controls",new_controls);
            });

            component.bind('KeyUp',function(){

                var old_controls = component.controls;
                var triggerTime = new Date();
                var new_controls = new Controls();
                new_controls.left = old_controls.left;
                new_controls.right = old_controls.right;
                new_controls.leftTimer = old_controls.leftTimer;
                new_controls.rightTimer = old_controls.rightTimer;

                if (!this.isDown(attr.LeftControl)){
                    new_controls.left = false;
                    if (old_controls.leftTimer > 0){

                        component.trigger(attr.ID + ".ButtonComplete",{
                            button: component.LEFT_BUTTON,
                            timeHeld: triggerTime - old_controls.leftTimer
                        });
                        console.log('left' + (triggerTime - old_controls.leftTimer));

                        new_controls.leftTimer = null;

                    }
                }

                if (!this.isDown(attr.RightControl)){
                    new_controls.right = false;

                    if (old_controls.rightTimer > 0){

                        component.trigger(attr.ID + ".ButtonComplete",{
                            button: component.RIGHT_BUTTON,
                            timeHeld: triggerTime - old_controls.rightTimer
                        });
                        console.log('right' + (triggerTime - old_controls.rightTimer));

                        new_controls.rightTimer = null;

                    }

                }
                checkForEventsToTrigger(new_controls);
                component.attr("controls",new_controls);
            });
        }

        return component;
    }
});