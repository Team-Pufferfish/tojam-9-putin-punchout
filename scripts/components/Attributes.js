var attributeHolder = {};

Crafty.c("Attributes",{
    init: function(){
        this.requires("Delay");

    },

    autoIncrementors: [],

    assignAttribute: function(ID,attributeName, attributeValue){
        var component = this;
        if (!attributeHolder[ID]){
            attributeHolder[ID] = {};
        }

        if (!attributeHolder[ID][attributeName]){
            component.trigger(ID + ".attribute.created",
                {
                    name: attributeName,
                    value: attributeValue
                });
            attributeHolder[ID][attributeName] = attributeValue;
        } else {

            var oldVal = attributeHolder[ID][attributeName];
            var newVal = attributeHolder[ID][attributeName] = attributeValue;
            component.trigger(ID + ".attribute.changed",{
                name: attributeName,
                oldValue: oldVal,
                newValue: newVal

            });
        }
    },

    getAttribute: function(ID,attributeName) {
        if (attributeHolder[ID] && attributeHolder[ID][attributeName] !== null) {
            return attributeHolder[ID][attributeName];
        } else {
            throw new Error("attribute does not exist: " + ID + "." + attributeName);
        }
    },


    runAutoIncrementorLoop: function(delay){
        var component = this;
        component.delay(function(){
            for (var i = 0; i < component.autoIncrementors.length; i++){
                var inc = component.autoIncrementors[i];
                if (!inc.pause){
                    var currentValue = component.getAttribute(inc.ID,inc.attributeName);
                    var finalValue = currentValue + inc.incrementValue;
                    console.log(finalValue);
                    component.assignAttribute(inc.ID,inc.attributeName,finalValue);
                }


            }
        },delay,-1);
    },

    createAttributeAutoIncrementor: function(ID,attributeName,incrementValue){
        this.autoIncrementors.push({
            ID: ID,
            attributeName: attributeName,
            incrementValue: incrementValue,
            pause:false
        });

    },


    pauseAutoIncrementor: function(ID,attributeName){
        var incrementor = _.find(this.autoIncrementors,function(inc){return inc.ID === ID && inc.attributeName === attributeName});

        if (incrementor !== undefined){
            incrementor.pause = true;
        }

    }



});