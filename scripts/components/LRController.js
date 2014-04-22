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
                oldButton: component.controls.convertToButton(),
                newControls: new_controls.convertToButton()
            });

            console.log("old: "+component.controls.convertToButton() + " new:"+ new_controls.convertToButton())

        }

        function assignToButtons(){

            component.bind('KeyDown',function(){

                var old_controls = component.controls;
                var new_controls = new Controls();
                new_controls.left = old_controls.left;
                new_controls.right = old_controls.right;

                if (component.isDown(attr.LeftControl)){
                    new_controls.left = true;
                }
                if (component.isDown(attr.RightControl)){
                    new_controls.right = true;
                }
                checkForEventsToTrigger(new_controls);
                component.attr("controls",new_controls);
            });

            component.bind('KeyUp',function(){

                var old_controls = component.controls;
                var new_controls = new Controls();
                new_controls.left = old_controls.left;
                new_controls.right = old_controls.right;

                if (!this.isDown(attr.LeftControl)){
                    new_controls.left = false;
                }
                if (!this.isDown(attr.RightControl)){
                    new_controls.right = false;
                }
                checkForEventsToTrigger(new_controls);
                component.attr("controls",new_controls);
            });
        }

        return component;
    }
});